/*
| Edit Buttons
""
|--- If not Loged User
|    |--- Sign In
|    |--- Sign Up
|
|--- If User Loged In
|    |--- Logout
|    |--- Near Coin
|
|
*/
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { browserLocalPersistence, createUserWithEmailAndPassword, onAuthStateChanged, setPersistence, signInWithEmailAndPassword, signOut, getAuth, sendEmailVerification } from 'firebase/auth'
import { auth } from './firebase-config';
import iNearCoin from '/public/near-coin.png';
import { get, ref, getDatabase, set } from 'firebase/database';
import { userInfo } from 'os';
import { WalletConnection } from 'near-api-js';
const database = getDatabase();

const Button = (props: any) => {
  return (
    <button onClick={props.onClick} className="mt-4 inline-flex text-xl items-center rounded border-0 bg-gray-200 py-1 px-3 mr-2 focus:outline-none hover:shadow-md md:mt-0 hover:shadow-white">
      {props.children}
    </button>
  )
}

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [passwd, setPasswd] = useState('');
  const [signInError, setSignInError] = useState<string|null>(null);

  const signInAuth = async (email: string, password: string) => {
    let errorMessage:string|null = null;
    setPersistence(auth, browserLocalPersistence)
      .then(() => signInWithEmailAndPassword(auth, email, password))
      .catch((error) => errorMessage = error.message);
      
    return errorMessage;
  }

  

  const handleSignIn = async () => {
    setSignInError(await signInAuth(email, passwd));
  }



  return (
    <div className='w-[100vw] h-[100vw] sticky z-50'>
      <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
        <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Sign In</h2>
        <div className="relative mb-4">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
          <input autoComplete='email' onChange={e => setEmail(e.target.value)} type="text" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div className="relative mb-4">
          <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
          <input autoComplete='password' onChange={e => setPasswd(e.target.value)} type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
  
        <button onClick={handleSignIn} className="text-white bg-gray-600 border-0 py-2 px-8 focus:outline-none hover:bg-black rounded text-lg">Sign In</button>
        {signInError !== null && <p className="text-xs text-gray-500 mt-3">{signInError}</p>}
      </div>
    </div>
  )
}

const Register = () => {
  const [email, setEmail] = useState('');
  const [passwd, setPasswd] = useState('');
  const [rePasswd, setRePasswd] = useState('');
  const [referral, setReferral] = useState('');
  const [registerError, setRegisterError] = useState<string|null>(null);

  const pushReferralToFirebase = (referral: string) => {
    console.log(referral);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const pathRef = ref(database, "user/" + user.uid + "/referral");
        set(pathRef, referral);

        //----------- change location of this code
        sendEmailVerification(user)
      }
    })
  }


  const registerAuth = async (email: string, password: string, referrance: string) => {
    let errorMessage:string|null = null;
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        pushReferralToFirebase(referrance);

        createUserWithEmailAndPassword(auth, email, password);
      })
      .catch((error) => errorMessage = error.message);
      
    return errorMessage;
  }

  const handleRegister = async () => {
    if (passwd !== rePasswd) {
      setRegisterError('Passwords does not match!');
    } else {
      setRegisterError(await registerAuth(email, passwd, referral));
    }
  }

  return (
    <div className='w-[100vw] h-[100vw] sticky z-50'>
      <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
        <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Register</h2>
        <div className="relative mb-4">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
          <input autoComplete='email' onChange={e => setEmail(e.target.value)} type="text" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div className="relative mb-4">
          <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
          <input autoComplete='password' onChange={e => setPasswd(e.target.value)} type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div className="relative mb-4">
          <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
          <input autoComplete='password' onChange={e => setRePasswd(e.target.value)} type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div className="relative mb-4">
          <label htmlFor="text" className="leading-7 text-sm text-gray-600">Referral Email</label>
          <input autoComplete='referrance' onChange={e => setReferral(e.target.value)} type="text" id="text" name="text" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <button onClick={handleRegister} className="text-white bg-gray-600 border-0 py-2 px-8 focus:outline-none hover:bg-black rounded text-lg">Register</button>
        {registerError !== null && <p className="text-xs text-gray-500 mt-3">{registerError}</p>}
      </div>
    </div>
  )
}

const ShowSignButtons = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [show, setShow] = useState({sign: false, register: false, coin: false});
    const [coin, setCoin] = useState(0);

    const handleSignClick     = () => setShow({sign: !show.sign, register: false, coin: false})
    const handleCoinClick     = () => setShow({...show, coin: !show.coin})
    const handleRegisterClick = () => setShow({sign: false, register: !show.register, coin: false})

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

    const showVerification = () => {
      const user = auth.currentUser;
      if (user) {
        if (user.emailVerified){
          return (
            <>
              <h2 className="text-gray-900 bg-green-300 text-lg font-medium title-font mb-5">Email Verified</h2>
            </>
          )
        }else{
          return(
            <>
            <h2 className="text-gray-900 bg-red-300 text-lg font-medium title-font mb-5">Email Not Verified</h2>
            </>
          )
        }
      }
    }


    const NearCoin = () => {

  
      return (
        <div className='w-[100vw] h-[100vw] sticky z-50'>
          <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
      
            {showVerification()}
            <Button onClick={WalletConnection}>Connect Wallet</Button>
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
          setShow({...show, coin: false});
          setCoinOfUser();
        } else {
          setLoggedIn(false);
          setShow({...show, register: false, sign: false})
        }
      })
    }, []);

    if (!loggedIn) {
      return  <>
        <Button onClick={handleSignClick}>Sign In</Button>
        <Button onClick={handleRegisterClick}>Register</Button>
        {show.sign && <SignIn />}
        {show.register && <Register />}
      </>
    } else {
        return  <>
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

const Navbar = () => {
  return (
    <header className="bg-bg-navbar bg-no-repeat bg-cover body-font h-[11vh] text-gray-600 ">
      <div className="container mx-auto flex flex-col flex-wrap items-center p-5 md:flex-row">
        <a className="title-font mb-4 flex items-center font-medium text-gray-900 md:mb-0">
          <Link href="/">
            <div className="flex items-center">
              <Image alt="logo" src="/nearzombiehead.png" height={60} width={60}/>
              <span className="ml-3 text-xl text-white">NearZombies</span>
            </div>
          </Link>
        </a>
        <nav className="flex flex-wrap items-center justify-center text-base md:ml-auto">
          {/* <a className="mr-5 hover:text-gray-900">About Near</a> */}
        </nav>
        {<ShowSignButtons />}
      </div>
    </header>
  )
}

export default Navbar
