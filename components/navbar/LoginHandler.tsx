import { signOut, onAuthStateChanged } from 'firebase/auth'
import { ref, get, getDatabase } from 'firebase/database'
import { useState, useEffect } from 'react'
import { auth } from '../../firebase/config'
import Register from './Register'
import SignIn from './SignIn'
import iNearCoin from '/public/images/nav_coin_logo.png'
import Image from 'next/image'
import { NearCoin } from '../near_coin/NearCoin'

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
        <div className="z-50">
          <button className="navbar_button" onClick={handleSignClick}>
            Sign In
          </button>
          <button className="navbar_button" onClick={handleRegisterClick}>
            Register
          </button>
        </div>
        {show.sign && <SignIn />}
        {show.register && <Register />}
      </>
    )
  } else {
    return (
      <>
        <div className="flex flex-row">
          <button
            onClick={handleCoinClick}
            className="mt-4 mr-2 inline-flex items-center rounded border-0 bg-gray-200 px-3 text-base duration-200 hover:shadow-md focus:outline-none md:mt-0 md:hover:shadow-white "
          >
            <Image src={iNearCoin} width="36px" height="36px" />
            <p className="ml-2 mt-0.5 font-mono text-xl">{coin.toFixed(2)}</p>
          </button>
          <button className="navbar_button" onClick={handleLogut}>
            Logout
          </button>
        </div>
        {show.coin && <NearCoin />}
      </>
    )
  }
}
