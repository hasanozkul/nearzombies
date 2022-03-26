import { signOut, onAuthStateChanged } from 'firebase/auth'
import { ref, get, getDatabase } from 'firebase/database'
import { useState, useEffect } from 'react'
import ConnectWallet from './ConnectWallet'
import { auth } from '../firebase/config'
import Register from './Register'
import ShowVerification from './ShowVerification'
import SignIn from './SignIn'
import iNearCoin from '/public/images/nav_coin_logo.png'
import Image from 'next/image'
import PasswordReset from './PasswordReset'

export default function LoginHandler() {
  // default values
  const [loggedIn, setLoggedIn] = useState(false)
  const [show, setShow] = useState({
    sign: false,
    register: false,
    coin: false,
  })
  const [coin, setCoin] = useState(0)
  const database = getDatabase()

  // button visibility handler
  const handleSignClick = () =>
    setShow({ sign: !show.sign, register: false, coin: false })
  const handleCoinClick = () => setShow({ ...show, coin: !show.coin })
  const handleRegisterClick = () =>
    setShow({ sign: false, register: !show.register, coin: false })

  const setCoinOfUser = () => {
    const user = auth.currentUser
    if (user) {
      const pathRef = ref(database, 'users/' + user.uid + '/coin')
      get(pathRef).then((snapshot) => {
        if (snapshot.exists()) {
          setCoin(snapshot.val())
        }
      })
    }
  }

  // creates button with given
  const Button = (props: any) => {
    return (
      <button
        onClick={props.onClick}
        className="mt-4 mr-2 inline-flex items-center rounded border-0 bg-gray-200 py-1 px-3 text-lg hover:shadow-md hover:shadow-white focus:outline-none md:mt-0"
      >
        {props.children}
      </button>
    )
  }

  //
  const NearCoin = () => {
    const user = auth.currentUser

    return (
      <div className="sticky z-50 h-[100vw] w-[100vw]">
        <div className="mt-10 flex w-full flex-col rounded-lg bg-gray-100 p-8 md:ml-auto md:mt-0 md:w-1/2 lg:w-1/4">
          <ShowVerification />

          <ConnectWallet />
          <PasswordReset />
        </div>
      </div>
    )
  }

  const handleLogut = () => {
    signOut(auth)
    window.location.reload()
    setLoggedIn(false)
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true)
        setShow({ ...show, coin: false })
        setCoinOfUser()
      } else {
        setLoggedIn(false)
        setShow({ ...show, register: false, sign: false })
      }
    })
  }, [])

  if (!loggedIn) {
    return (
      <>
        <Button onClick={handleSignClick}>Sign In</Button>
        <Button onClick={handleRegisterClick}>Register</Button>
        {show.sign && <SignIn />}
        {show.register && <Register />}
      </>
    )
  } else {
    return (
      <>
        <button
          onClick={handleCoinClick}
          className="mt-4 mr-2 inline-flex items-center rounded border-0 bg-gray-200 px-3 text-base hover:shadow-md hover:shadow-white focus:outline-none md:mt-0"
        >
          <Image src={iNearCoin} width="36px" height="36px" />
          <p className="ml-2 mt-0.5 font-mono text-xl">{coin.toFixed(2)}</p>
        </button>
        <Button onClick={handleLogut}>Logout</Button>
        {show.coin && <NearCoin />}
      </>
    )
  }
}
