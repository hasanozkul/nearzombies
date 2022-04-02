import Image from 'next/image'

import iCharLeft from '/public/images/home_char_left.png'
import iCharRight from '/public/images/home_char_right.png'
import Link from 'next/link'
import { getDatabase } from 'firebase/database'

export default function Home() {
  return (
    <>
      <section className="body-font h-[80vh] text-gray-600 md:h-[90vh]">
        <div className="absolute flex h-[70vh] w-[100%] sm:h-[80vh] md:h-[90vh] ">
          <div className="relative  hidden w-[calc(70vh*696/1606)] sm:block sm:w-[calc(80vh*696/1606)] md:w-[calc(90vh*696/1606)]">
            <Image src={iCharLeft} layout="fill" />
          </div>
          <div className="relative ml-auto w-[calc(70vh*696/1606)] sm:w-[calc(80vh*696/1606)] md:w-[calc(90vh*696/1606)]">
            <Image src={iCharRight} layout="fill" />
          </div>
        </div>
        <div className="container sticky mx-auto mt-36 flex w-[85%] flex-col items-center justify-center bg-white/80 py-6 px-5 md:my-0 md:bg-transparent md:py-24">
          <div className="relative mb-10 h-32 w-2/6 animate-fromTop rounded object-cover object-center  md:h-56 md:w-1/6">
            <Image
              src="/images/near_logo.svg" // Route of the image file
              layout="fill"
            />
          </div>
          <div className="w-full text-center lg:w-2/3">
            <h1 className="title-font mb-4 text-xl font-medium text-gray-900 sm:text-2xl md:text-3xl">
              Earn while learning
            </h1>
            <p className="mb-8 text-sm leading-relaxed md:text-base">
              Learn about Near, a sustainable protocol that is growing in
              popularity every day. NearZombies.io offers a new way of learning.
              While learning the subjects in an interactive way, you also earn
              coins.
            </p>
            <p className="mb-8 text-sm leading-relaxed md:text-base">
              Our site is currently under development. See you in the "Near"
              future :)
            </p>
            <div className="flex justify-center">
              <Link href="/character-build">
                <button className="inline-flex animate-withOpacity rounded border-0 bg-primary py-2 px-8 text-base text-white duration-200  hover:shadow-xl hover:shadow-violet-200 focus:outline-none active:translate-y-1 sm:px-20 sm:text-lg">
                  Let's Begin
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="body-font text-gray-600">
        <div className="container mx-auto px-5 py-24">
          <div className="mx-auto w-full text-center lg:w-3/4 xl:w-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="mb-8 inline-block h-8 w-8 text-gray-400"
              viewBox="0 0 975.036 975.036"
            >
              <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
            </svg>
            <p className="text-base leading-relaxed sm:text-lg">
              Near Protocol is a project with a very bright future. At
              NearZombies.io we support the expansion of the Near Protocol. We
              offer a fun educational experience on this platform.
            </p>
            <span className="mt-8 mb-6 inline-block h-1 w-10 rounded bg-primary"></span>
            <h2 className="title-font text-sm font-bold tracking-wider text-gray-900">
              NearZombies.io Team
            </h2>
          </div>
        </div>
      </section>

      <div className="h-32 bg-bg-footer bg-cover bg-bottom bg-no-repeat" />
    </>
  )
}
