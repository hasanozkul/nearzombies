import * as nearAPI from "near-api-js";
import Image from "next/image";
import iNotVerified from '../public/not-verified.svg';
import iVerified from '../public/verified.svg';
const { connect, keyStores, WalletConnection } = nearAPI;
const CLIENT_URL = "https://www.nearzombies.io/"
import {
  BadgeCheckIcon,
  ExclamationIcon,
  MailIcon,
} from '@heroicons/react/outline'
import { auth } from "./firebase-config";
import { sendEmailVerification } from "firebase/auth";


function sendVerification(){
  const user = auth.currentUser
  if (user){
    sendEmailVerification(user)
    alert('Email Verification has been Send')
  }
}


function ShowVerification() {
  const user = auth.currentUser;
  if (user) {
    
    
    if (user.emailVerified) {
      return (
        <div className="my-4 flex text-xl items-center rounded border-0 py-1 px-3 mr-2 md:mt-0">
          <BadgeCheckIcon className="h-6 text-green-500 mr-4" />
          <h2 >Email Verified</h2>
        </div>
      )
    } 
    
    else {
      return (
        <div>
            <div className="my-4 flex text-xl items-center rounded border-0 py-1 px-3 mr-2 md:mt-0">
              <ExclamationIcon className="h-6 text-red-500 mr-4" />
              <h2>Email Not Verified</h2>
            </div>
            <div className="my-4 flex text-lg items-center rounded border-0 bg-gray-200 py-1 px-3 mr-2 focus:outline-none hover:shadow-md md:mt-0 hover:shadow-white">
              <MailIcon className="h-6 mr-4 text-green-500" />
              <button onClick={sendVerification}>Send Verification</button>

            </div>
        </div>
      )
    }
  }
  return null
}
export default ShowVerification