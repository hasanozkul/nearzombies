import {
  onAuthStateChanged,
  sendEmailVerification,
  setPersistence,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { getDatabase, ref, set } from 'firebase/database'
import { useState } from 'react'
import { auth } from '../firebase/config'

export default function Register() {
  const [email, setEmail] = useState('')
  const [passwd, setPasswd] = useState('')
  const [rePasswd, setRePasswd] = useState('')
  const [referral, setReferral] = useState('')
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
    let errorMessage: string | null = null
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        pushReferralToFirebase(referrance)

        createUserWithEmailAndPassword(auth, email, password)
      })
      .catch((error) => (errorMessage = error.message))

    return errorMessage
  }

  const handleRegister = async () => {
    if (passwd !== rePasswd) {
      setRegisterError('Passwords does not match!')
    } else {
      setRegisterError(await registerAuth(email, passwd, referral))
    }
  }

  return (
    <div className="sticky  z-50 w-[100vw]">
      <div className="mt-10 flex w-full flex-col rounded-lg bg-gray-100 p-8 md:ml-auto md:mt-0 md:w-1/2 lg:w-2/6">
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
          <label htmlFor="password" className="text-sm leading-7 text-gray-600">
            Password
          </label>
          <input
            autoComplete="password"
            onChange={(e) => setRePasswd(e.target.value)}
            type="password"
            id="password"
            name="password"
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
          onClick={handleRegister}
          className="rounded border-0 bg-gray-600 py-2 px-8 text-lg text-white hover:bg-black focus:outline-none"
        >
          Register
        </button>
        {registerError !== null && (
          <p className="mt-3 text-xs text-gray-500">{registerError}</p>
        )}
      </div>
    </div>
  )
}
