import {
    RefreshIcon
    } from '@heroicons/react/outline'
import { auth } from './firebase-config';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";


function ResetPassword(){
    
    if (auth.currentUser?.email){
    sendPasswordResetEmail(auth, auth.currentUser.email)
      .then(() => {
        alert('Reset Email has been Send')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
    }
}

function Main(){
    const user = auth.currentUser

    if (user?.emailVerified){
        return(
            <div className='mt-4'>
                <div className="flex text-lg items-center rounded border-0 bg-gray-200 py-1 px-3 mr-2 focus:outline-none hover:shadow-md md:mt-0 hover:shadow-white">
                <RefreshIcon className="h-6 mr-4 text-green-500" />
                <button onClick={ResetPassword}>Reset Password</button>

                </div>
            </div>
        )
    }else{
        return null
    }
}

export default Main;