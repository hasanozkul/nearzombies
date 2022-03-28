import {
  setPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { useState } from 'react'
import { auth } from '../firebase/config'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [passwd, setPasswd] = useState('')
  const [signInError, setSignInError] = useState<string | null>(null)

  const signInAuth = async (email: string, password: string) => {
    let errorMessage: string | null = 'Email or password is incorrect'
    setPersistence(auth, browserLocalPersistence)
      .then(() => signInWithEmailAndPassword(auth, email, password))
      .catch((error) => (errorMessage = error.message))

    return errorMessage
  }

  const handleSignIn = async () => {
    setSignInError(await signInAuth(email, passwd))
  }

  return (
    <div className="z-50z sticky w-[100vw]">
      <div className="mt-10 flex w-full flex-col rounded-lg bg-gray-100 p-8 md:ml-auto md:mt-0 md:w-1/2 lg:w-2/6">
        <h2 className="title-font mb-5 text-lg font-medium text-gray-900">
          Sign In
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

        <button
          onClick={handleSignIn}
          className="rounded border-0 bg-gray-600 py-2 px-8 text-lg text-white hover:bg-black focus:outline-none"
        >
          Sign In
        </button>
        {signInError !== null && (
          <p
            onClick={handleSignIn}
            className=" mt-4 rounded border-0 bg-red-500 py-2 px-8 text-center text-lg text-white focus:outline-none"
          >
            {signInError}
          </p>
        )}
      </div>
    </div>
  )
}
