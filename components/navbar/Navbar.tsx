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

import LoginHandler from './LoginHandler'

const Navbar = () => {
  return (
    <header className="body-font h-[11vh] bg-bg-navbar bg-cover bg-no-repeat text-gray-600 ">
      <div className="container mx-auto flex flex-col flex-wrap items-center sm:py-2 md:flex-row md:items-start md:py-6">
        <a className="title-font   flex items-center font-medium text-gray-900 md:mb-0">
          <Link href="/">
            <div className="flex cursor-pointer items-center">
              <Image
                alt="logo"
                src="/images/nav_logo.png"
                height={122}
                width={213}
              />
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
        <LoginHandler />
      </div>
    </header>
  )
}

export default Navbar
