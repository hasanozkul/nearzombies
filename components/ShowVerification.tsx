import * as nearAPI from 'near-api-js'
import Image from 'next/image'
import iNotVerified from '../public/images/not-verified.svg'
import iVerified from '../public/images/verified.svg'
const { connect, keyStores, WalletConnection } = nearAPI
const CLIENT_URL = 'https://www.nearzombies.io/'
import {
  BadgeCheckIcon,
  ExclamationIcon,
  MailIcon,
} from '@heroicons/react/outline'
import { auth } from '../firebase/config'
import { sendEmailVerification } from 'firebase/auth'

function sendVerification() {
  const user = auth.currentUser
  if (user) {
    sendEmailVerification(user)
    alert('Email Verification has been Send')
  }
}

function ShowVerification() {
  const user = auth.currentUser
  if (user) {
    if (user.emailVerified) {
      return (
        <div className="my-4 mr-2 flex items-center rounded border-0 py-1 px-3 text-xl md:mt-0">
          <BadgeCheckIcon className="mr-4 h-6 text-green-500" />
          <h2>Email Verified</h2>
        </div>
      )
    } else {
      return (
        <div>
          <div className="my-4 mr-2 flex items-center rounded border-0 py-1 px-3 text-xl md:mt-0">
            <ExclamationIcon className="mr-4 h-6 text-red-500" />
            <h2>Email Not Verified</h2>
          </div>
          <div className="my-4 mr-2 flex items-center rounded border-0 bg-gray-200 py-1 px-3 text-lg hover:shadow-md hover:shadow-white focus:outline-none md:mt-0">
            <MailIcon className="mr-4 h-6 text-green-500" />
            <button onClick={sendVerification}>Send Verification</button>
          </div>
        </div>
      )
    }
  }
  return null
}
export default ShowVerification
