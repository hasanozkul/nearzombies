import { setPersistence, browserLocalPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase/config";

export default function SignIn(){
    const [email, setEmail] = useState('');
    const [passwd, setPasswd] = useState('');
    const [signInError, setSignInError] = useState<string|null>(null);
    
    const signInAuth = async (email: string, password: string) => {
        let errorMessage:string|null = 'Email or password is incorrect';
        setPersistence(auth, browserLocalPersistence)
        .then(() => signInWithEmailAndPassword(auth, email, password))
        .catch((error) => errorMessage = error.message);
        
        return errorMessage;
    }
    
    
    const handleSignIn = async () => {
        setSignInError(await signInAuth(email, passwd));
    }
    
    
    return (
        <div className='w-[100vw] h-[100vw] sticky z-50z'>
        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Sign In</h2>
            <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
            <input autoComplete='email' onChange={e => setEmail(e.target.value)} type="text" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="relative mb-4">
            <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
            <input autoComplete='password' onChange={e => setPasswd(e.target.value)} type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
    
            <button onClick={handleSignIn} className="text-white bg-gray-600 border-0 py-2 px-8 focus:outline-none hover:bg-black rounded text-lg">Sign In</button>
            {signInError !== null && <p onClick={handleSignIn} className=" mt-4 text-white bg-red-500 border-0 py-2 px-8 focus:outline-none rounded text-lg text-center">{signInError}</p>}
        </div>
        </div>
    )
    }