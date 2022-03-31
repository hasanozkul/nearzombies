import { RefreshIcon } from '@heroicons/react/outline'
import { auth } from '../../firebase/config'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'

function ResetPassword() {
  if (auth.currentUser?.email) {
    sendPasswordResetEmail(auth, auth.currentUser.email)
      .then(() => {
        alert('Reset Email has been Send')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        // ..
      })
  }
}

function Main() {
  const user = auth.currentUser

  if (user?.emailVerified) {
    return (
      <div className="mt-4">
        <div className="mr-2 flex items-center rounded border-0 bg-gray-200 py-1 px-3 text-lg hover:shadow-md hover:shadow-white focus:outline-none md:mt-0">
          <RefreshIcon className="mr-4 h-6 text-green-500" />
          <button onClick={ResetPassword}>Reset Password</button>
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default Main
