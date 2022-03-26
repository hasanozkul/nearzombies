import * as nearAPI from 'near-api-js'
import { useEffect, useState } from 'react'
import { auth } from '../firebase/config'
import SignIn from './SignIn'
import { LinkIcon } from '@heroicons/react/outline'
import { Near } from 'near-api-js'

const { connect, keyStores, WalletConnection } = nearAPI
const CLIENT_URL = 'https://www.nearzombies.io/'

export default function App() {
  const [near, setNear] = useState<Near>()
  const [wallet, setWallet] = useState<any>()
  const [user, setUser] = useState<any>()

  useEffect(() => {
    initNear(null)
  }, [])

  const initNear = async (data: any) => {
    const config = {
      headers: {},
      networkId: 'mainnet',
      keyStore: new keyStores.BrowserLocalStorageKeyStore(),
      nodeUrl: 'https://rpc.mainnet.near.org',
      walletUrl: 'https://wallet.mainnet.near.org',
      helperUrl: 'https://helper.mainnet.near.org',
      explorerUrl: 'https://explorer.mainnet.near.org',
    }

    const near = await connect(config)
    const wallet = new WalletConnection(near, 'NearZombies')
    setNear(near)
    setWallet(wallet)

    if (wallet.isSignedIn()) {
      setUser(wallet.getAccountId())
    }
  }

  const signOut = () => {
    wallet.signOut()
    setUser(null)
  }

  const signIn = () => {
    wallet.requestSignIn(
      'near', // contract requesting access
      'NearZombies', // optional
      CLIENT_URL
    )
  }

  function showError() {
    return alert('Please Verify Your Email First')
  }

  const fire_user = auth.currentUser
  if (fire_user) {
    return (
      <div>
        <div className="mt-4 mr-2 flex items-center rounded border-0 bg-gray-200 py-1 px-3 text-lg hover:shadow-md hover:shadow-white focus:outline-none md:mt-0">
          <LinkIcon className="mr-4 h-6 text-black" />
          <button onClick={fire_user.emailVerified ? signIn : showError}>
            Connect Wallet
          </button>
        </div>
      </div>
    )
  }
  return null
}
