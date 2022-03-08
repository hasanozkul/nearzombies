import * as nearAPI from "near-api-js";
import { useEffect, useState } from "react";
import { auth } from "./firebase-config";
import SignIn from "./SignIn";
import {
  LinkIcon
} from '@heroicons/react/outline'
import { Near } from "near-api-js";

const { connect, keyStores, WalletConnection } = nearAPI;
const CLIENT_URL = "https://www.nearzombies.io/"

export default function App() {
  const [near, setNear] = useState<Near>();
  const [wallet, setWallet] = useState<any>();
  const [user, setUser] = useState<any>();

  useEffect(() => {
    initNear(null);
  }, []);

  const initNear = async (data: any) => {

    const config = {
      headers: {},
      networkId: "mainnet",
      keyStore: new keyStores.BrowserLocalStorageKeyStore(),
      nodeUrl: "https://rpc.mainnet.near.org",
      walletUrl: "https://wallet.mainnet.near.org",
      helperUrl: "https://helper.mainnet.near.org",
      explorerUrl: "https://explorer.mainnet.near.org",
    };

    const near = await connect(config);
    const wallet = new WalletConnection(near, 'NearZombies');
    setNear(near);
    setWallet(wallet);

    if (wallet.isSignedIn()) {
      setUser(wallet.getAccountId());
    }

  };

  const signOut = () => {
    wallet.signOut();
    setUser(null);
  };

  const signIn = () => {
    wallet.requestSignIn(
      "near", // contract requesting access
      "NearZombies", // optional
      CLIENT_URL);
  };


  function showError() {

    return (
      alert('Please Verify Your Email First')
    )
  }

  const fire_user = auth.currentUser
  if (fire_user) {
    if (fire_user.emailVerified) {
      return (
        <div>
          <div className="mt-4 flex text-lg items-center rounded border-0 bg-gray-200 py-1 px-3 mr-2 focus:outline-none hover:shadow-md md:mt-0 hover:shadow-white">
            <LinkIcon className="h-6 mr-4 text-black" />
            <button onClick={signIn} >Connect Wallet</button>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div className="mt-4 flex text-lg items-center rounded border-0 bg-gray-200 py-1 px-3 mr-2 focus:outline-none hover:shadow-md md:mt-0 hover:shadow-white">
            <LinkIcon className="h-6 mr-4 text-black" />
            <button onClick={showError} >Connect Wallet</button>
          </div>
        </div>
      )
    }
  }
  return null

}