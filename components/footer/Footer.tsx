/*
| Edit Social Media Icons and Links
|--- Twitter
|--- GitHub
|--- Near Protocol
|
| Edit Referacne Links
|--- TBD
|--- TBD
|--- TBD
|
|
*/

import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="body-font h-50  text-gray-200">
      <div className=" w-full bg-primary">
        <div className="container mx-auto  flex flex-col items-center  px-8 pb-6 sm:flex-row">
          <a className="title-font flex items-center justify-center md:justify-start">
            <Image
              alt="logo"
              src="/images/nav_logo.png" // Route of the image file
              height={90} // Desired size with correct aspect ratio
              width={152} // Desired size with correct aspect ratio
            />
          </a>

          <p className="mt-4 text-gray-200 sm:ml-4 sm:mt-0 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:pl-4">
            © 2022 NearZombies
          </p>

          <span className="mt-4 flex flex-grow flex-wrap place-content-center text-center">
            <h2 className="title-font mb-3 w-full px-4 text-sm font-medium tracking-widest text-white md:w-1/2 lg:w-1/4">
              LINK 1
            </h2>

            <h2 className="title-font mb-3 w-full px-4 text-sm font-medium tracking-widest text-white md:w-1/2 lg:w-1/4">
              LINK 2
            </h2>

            <h2 className="title-font mb-3 w-full px-4 text-sm font-medium tracking-widest text-white md:w-1/2 lg:w-1/4">
              LINK 3
            </h2>
          </span>

          <span className="mt-4 inline-flex justify-center sm:ml-auto sm:mt-0 sm:justify-start">
            <a className="text-gray-200">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-7 w-7"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-200">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-7 w-7"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-200">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-7 w-7"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-200">
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0"
                className="h-7 w-7"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="none"
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                ></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
