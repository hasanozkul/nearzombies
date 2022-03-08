/*
| Edit Buttons
""
|--- If not Loged User
|    |--- Sign In
|    |--- Sign Up
|
|--- If User Loged In
|    |--- Logout
|    |--- Near Coin
|
|
*/
import Link from 'next/link'
import Image from 'next/image'

import Sign from './LoginHandler'




const Navbar = () => {
  return (
    <header className="bg-bg-navbar bg-no-repeat bg-cover body-font h-[11vh] text-gray-600 ">
      <div className="container mx-auto flex flex-col flex-wrap items-center p-5 md:flex-row">
        <a className="title-font mb-4 flex items-center font-medium text-gray-900 md:mb-0">
          <Link href="/">
            <div className="flex items-center">
              <Image alt="logo" src="/nearzombiehead.png" height={60} width={60}/>
              <span className="ml-3 text-xl text-white">NearZombies</span>
            </div>
          </Link>
        </a>
        <div className="flex flex-wrap items-center justify-center text-base md:ml-auto">
          
          {/* for additional links in navbar*/}
          {/*
            <Link href="/">
          <h2 className="mr-5 text-gray-200 hover:text-gray-300">About Near</h2> 
          </Link>
          */}
        </div>
        <Sign />
      </div>
    </header>
  )
}

export default Navbar
