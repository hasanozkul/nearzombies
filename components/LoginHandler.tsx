import { signOut, onAuthStateChanged } from "firebase/auth";
import { ref, get, getDatabase } from "firebase/database";
import { useState, useEffect } from "react";
import ConnectWallet from "./ConnectWallet";
import { auth } from "./firebase-config";
import Register from "./Register";
import ShowVerification from "./ShowVerification";
import SignIn from "./SignIn";
import iNearCoin from '/public/near-coin.png';
import Image from "next/image";
import PasswordReset from './PasswordReset'

export default function LoginHandler() {

  // default values
  const [loggedIn, setLoggedIn] = useState(false);
  const [show, setShow] = useState({ sign: false, register: false, coin: false });
  const [coin, setCoin] = useState(0);
  const database = getDatabase();

  // button visibility handler
  const handleSignClick = () => setShow({ sign: !show.sign, register: false, coin: false })
  const handleCoinClick = () => setShow({ ...show, coin: !show.coin })
  const handleRegisterClick = () => setShow({ sign: false, register: !show.register, coin: false })

  const setCoinOfUser = () => {
    const user = auth.currentUser;
    if (user) {
      const pathRef = ref(database, "users/" + user.uid + "/coin");
      get(pathRef).then((snapshot) => {
        if (snapshot.exists()) {
          setCoin(snapshot.val());
        }
      });
    }
  }

  // creates button with given 
  const Button = (props: any) => {
    return (
      <button onClick={props.onClick} className="mt-4 inline-flex text-lg items-center rounded border-0 bg-gray-200 py-1 px-3 mr-2 focus:outline-none hover:shadow-md md:mt-0 hover:shadow-white">
        {props.children}
      </button>
    )
  }


  // 
  const NearCoin = () => {

    const user = auth.currentUser; 


    return (
      <div className='w-[100vw] h-[100vw] sticky z-50'>
        <div className="lg:w-1/4 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          
          <ShowVerification/>
          
          <ConnectWallet/>
          <PasswordReset/>
        </div>
      </div>
    )
  }

  const handleLogut = () => {
    signOut(auth);
    window.location.reload();
    setLoggedIn(false);
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        setShow({ ...show, coin: false });
        setCoinOfUser();
      } else {
        setLoggedIn(false);
        setShow({ ...show, register: false, sign: false })
      }
    })
  }, []);

  if (!loggedIn) {
    return <>
      <Button onClick={handleSignClick}>Sign In</Button>
      <Button onClick={handleRegisterClick}>Register</Button>
      {show.sign && <SignIn />}
      {show.register && <Register />}
    </>
  } else {
    return <>
      <button onClick={handleCoinClick} className="mt-4 inline-flex items-center rounded bg-gray-200 border-0 px-3 mr-2 text-base focus:outline-none hover:shadow-md md:mt-0 hover:shadow-white">
        <Image
          src={iNearCoin}
          width="36px"
          height="36px"
        />
        <p className='ml-2 mt-0.5 text-xl font-mono'>{coin.toFixed(2)}</p>
      </button>
      <Button onClick={handleLogut}>Logout</Button>
      {show.coin && <NearCoin />}
    </>
  }
}
