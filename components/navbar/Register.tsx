import {
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { getDatabase, ref, set } from 'firebase/database'
import { useState } from 'react'
import { auth } from '../../firebase/config'

export default function Register() {
  const [email, setEmail] = useState('')
  const [passwd, setPasswd] = useState('')
  const [rePasswd, setRePasswd] = useState('')
  const [referral, setReferral] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [registerError, setRegisterError] = useState<string | null>(null)
  const database = getDatabase()

  const pushReferralToFirebase = (referral: string) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const pathRef = ref(database, 'users/' + user.uid + '/referral')
        set(pathRef, referral)
      }
    })
  }

  const registerAuth = async (
    email: string,
    password: string,
    referrance: string
  ) => {
    if (!email || !password) {
      setRegisterError('Email and password required!')
      setIsLoading(false)
      return
    }
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        pushReferralToFirebase(referrance)

        createUserWithEmailAndPassword(auth, email, password)
          .catch((error) => {
            if (
              error.message ===
              'Firebase: Password should be at least 6 characters (auth/weak-password).'
            )
              setRegisterError('Password should be at least 6 characters')
            else if (
              error.message === 'Firebase: Error (auth/email-already-in-use).'
            )
              setRegisterError('Email already in use')
            else setRegisterError(error.message)
            setIsLoading(false)
          })
          .then(() => setIsLoading(false))
      })
      .catch((error) => setRegisterError(error.message))
  }

  const handleRegister = async () => {
    setIsLoading(true)
    if (passwd !== rePasswd) {
      setRegisterError('Passwords does not match!')
    } else {
      await registerAuth(email, passwd, referral)
    }
  }

  return (
    <div className="sticky z-50 w-[90vw] animate-withClipPath sm:w-[100vw]">
      <div
        onClick={(e) => e.stopPropagation()}
        className="mt-5 flex w-full flex-col rounded-lg bg-gray-100 p-8 md:-mt-16 md:ml-auto md:w-1/2 lg:w-2/6"
      >
        <h2 className="title-font mb-5 text-lg font-medium text-gray-900">
          Register
        </h2>
        <div className="relative mb-4">
          <label htmlFor="email" className="text-sm leading-7 text-gray-600">
            Email
          </label>
          <input
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            id="email"
            name="email"
            className="w-full rounded border border-gray-300 bg-white py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </div>
        <div className="relative mb-4">
          <label htmlFor="password" className="text-sm leading-7 text-gray-600">
            Password
          </label>
          <input
            autoComplete="password"
            onChange={(e) => setPasswd(e.target.value)}
            type="password"
            id="password"
            name="password"
            className="w-full rounded border border-gray-300 bg-white py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </div>
        <div className="relative mb-4">
          <label
            htmlFor="confirmpassword"
            className="text-sm leading-7 text-gray-600"
          >
            Password
          </label>
          <input
            autoComplete="password"
            onChange={(e) => setRePasswd(e.target.value)}
            type="password"
            id="confirmpassword"
            name="confirmpassword"
            className="w-full rounded border border-gray-300 bg-white py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </div>
        <div className="relative mb-4">
          <label htmlFor="text" className="text-sm leading-7 text-gray-600">
            Referral Email
          </label>
          <input
            autoComplete="referrance"
            onChange={(e) => setReferral(e.target.value)}
            type="text"
            id="text"
            name="text"
            className="w-full rounded border border-gray-300 bg-white py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </div>
        <button
          disabled={isLoading}
          onClick={handleRegister}
          className="cursor-pointer rounded  border-0 bg-gray-600 py-2 px-8 text-lg text-white duration-200 hover:bg-black/90 focus:outline-none disabled:cursor-wait disabled:opacity-70 "
        >
          Register
        </button>
        {registerError !== null && (
          <p className="mt-4 rounded border-0 bg-red-500 py-2 px-8 text-center text-lg text-white focus:outline-none">
            {registerError}
          </p>
        )}
      </div>
    </div>
  )
}
