import { onAuthStateChanged, sendEmailVerification, setPersistence, browserLocalPersistence, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { useState } from "react";
import { auth } from "./firebase-config";

export default function Register (){
    const [email, setEmail] = useState('');
    const [passwd, setPasswd] = useState('');
    const [rePasswd, setRePasswd] = useState('');
    const [referral, setReferral] = useState('');
    const [registerError, setRegisterError] = useState<string|null>(null);
    const database = getDatabase();

    const pushReferralToFirebase = (referral: string) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const pathRef = ref(database, "user/" + user.uid + "/referral");
          set(pathRef, referral);
        }
      })
    }
  
  
    const registerAuth = async (email: string, password: string, referrance: string) => {
      let errorMessage:string|null = null;
      setPersistence(auth, browserLocalPersistence)
        .then(() => {
          pushReferralToFirebase(referrance);
  
          createUserWithEmailAndPassword(auth, email, password);
        })
        .catch((error) => errorMessage = error.message);
        
      return errorMessage;
    }
  
    const handleRegister = async () => {
      if (passwd !== rePasswd) {
        setRegisterError('Passwords does not match!');
      } else {
        setRegisterError(await registerAuth(email, passwd, referral))
      }
    }
  
    return (
      <div className='w-[100vw] h-[100vw] sticky z-50'>
        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Register</h2>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
            <input autoComplete='email' onChange={e => setEmail(e.target.value)} type="text" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="relative mb-4">
            <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
            <input autoComplete='password' onChange={e => setPasswd(e.target.value)} type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="relative mb-4">
            <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
            <input autoComplete='password' onChange={e => setRePasswd(e.target.value)} type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="relative mb-4">
            <label htmlFor="text" className="leading-7 text-sm text-gray-600">Referral Email</label>
            <input autoComplete='referrance' onChange={e => setReferral(e.target.value)} type="text" id="text" name="text" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <button onClick={handleRegister} className="text-white bg-gray-600 border-0 py-2 px-8 focus:outline-none hover:bg-black rounded text-lg">Register</button>
          {registerError !== null && <p className="text-xs text-gray-500 mt-3">{registerError}</p>}
        </div>
      </div>
    )
  }