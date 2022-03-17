import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Image from 'next/image'
import RangeSlider from '../components/RangeSlider'
import iCustomCharacter from '/public/custom_char_base.png'
import iCharLeft from '/public/main_char_left.png';
import iCharRight from '/public/main_char_right.png';
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { auth } from '../components/firebase-config'
import { getDatabase, ref, set, get } from 'firebase/database';
import { onAuthStateChanged, User } from 'firebase/auth'
const database = getDatabase();



export default function Home() {
  const [zombieProps, setZombieProps] = useState({hat: 0, eyes: 0, top: 0, bottom: 0, skin: 0, background: 0});

  const handleChangeZombie = (key: string, value: number) => {
    setZombieProps(prev => ({...prev, [key]: value}))
  }

  /* fetch zombie properties from firebase only once */
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const pathRef = ref(database, "users/" + user.uid + "/zombie");
        get(pathRef).then((snapshot) => {
          if (snapshot.exists()) {
            setZombieProps(snapshot.val());
          }
        });
      }
    })
  });

  /* send firebase information if user clicks the 'start now' button */
  const pushZombieProps = () => {
    const user = auth.currentUser;
    if (user === null) {
      console.error("Error: not logged in.");
      return;
    }

    const pathRef = ref(database, "users/" + user.uid + "/zombie/");
    console.log("firebase: set");
    set(pathRef, zombieProps);
  }

  return (
    <>

<Navbar />
<section className="text-gray-600 body-font h-[90vh]">
    <div className='flex absolute w-[100%] h-[90vh] z-[-1]'>
      <div className='w-[calc(90vh*696/1606)] relative'>
        <Image
          src={iCharLeft}
          layout="fill"
        />
      </div>
      <div className='ml-auto w-[calc(90vh*696/1606)] relative'>
        <Image
          src={iCharRight}
          layout="fill"
        />
      </div>
    </div>
  <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
    <div className="md:w-1/6 w-3/6 mb-10 object-cover object-center  rounded">
    <Image
            src="/near_logo.svg" // Route of the image file
            height={500} // Desired size with correct aspect ratio
            width={500} // Desired size with correct aspect ratio
            
        />
        </div>
    <div className="text-center lg:w-2/3 w-full">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Earn while learning</h1>
      <p className="mb-8 leading-relaxed">Learn about Near, a sustainable protocol that is growing in popularity every day. NearZombies.io offers a new way of learning. While learning the subjects in an interactive way, you also earn coins.</p>
      <p className="mb-8 leading-relaxed">Our site is currently under development. See you in the "Near" future :)</p>
      <div className="flex justify-center">
        <Link 
        href="/#character-build">
        <button className="inline-flex text-white bg-[#5B0A91] border-0 py-2 px-20 focus:outline-none hover:shadow-lg hover:shadow-violet-200 rounded text-lg">Let's Begin</button>
        </Link>
      </div>
    </div>
  </div>
</section>


<section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="inline-block w-8 h-8 text-gray-400 mb-8" viewBox="0 0 975.036 975.036">
        <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
      </svg>
      <p className="leading-relaxed text-lg">Near Protocol is a project with a very bright future. At NearZombies.io we support the expansion of the Near Protocol. We offer a fun educational experience on this platform.</p>
      <span className="inline-block h-1 w-10 rounded bg-[#5B0A91] mt-8 mb-6"></span>
      <h2 className="text-gray-900 font-bold title-font tracking-wider text-sm">NearZombies.io Team</h2>
    </div>
  </div>
</section>




<section id="character-build" className='bg-home-2-bg bg-no-repeat bg-cover'>

<div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap m-10">


      {/* Description*/}
      <div className="p-4 lg:w-1/3">
        <div className="h-full bg-gray-300 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
        <h1 className="title-font sm:text-2xl text-xl font-medium text-black mb-3">Description</h1>

          <p className="leading-relaxed mb-3 text-justify text-black"> 
          This is your character. As you are learning near protocol, you'll be able to use your character with courses. Your character will be given to you as a unique NFT. You can configure its eye color, skin color and many more. Go ahead try one and earn your NFT.
          </p>

        </div>
      </div>

      {/* Custom Character*/}
      <div className="p-4 lg:w-1/3 ">
        <div className="h-full  px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative bg-bone-frame bg-no-repeat bg-center bg-contain">
        <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-30"></h1>
          <Image
          src={iCustomCharacter}
          />
        </div>
      </div>

      {/* Build Control*/}
      <div className="p-4 lg:w-1/3">
        <div className="h-full bg-gray-300 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
        <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">Build Control</h1>
        <div className="grid grid-rows-1 gap-4 ">
          {/* Fetching Customization From Firebase */}
          <>
          {['hat', 'eyes', 'top', 'bottom', 'skin', 'background'].map((key, idx) => 
            <div>
              <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-3">{key.toUpperCase()}</h2>
              <div className="flex mb-3" >
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={{...zombieProps}[key]}
                  className="w-[100%] accent-black cursor-cell"
                  onChange={(e) => handleChangeZombie(key, parseInt(e.target.value))}
                />
              </div>
            </div>
          )}
          </>
        </div>
        <div className="flex justify-end mt-10">
          <Link
          href='/courses'>
          <button onClick={pushZombieProps} className=" h-16 text-black mx-auto border-0 py-2 px-20 focus:outline-none text-lg bg-bone-button bg-contain bg-no-repeat">Start Now</button>
          </Link>
        </div>
        </div>
      </div>
    </div>
  </div>
</section>
<div className="bg-bg-footer bg-no-repeat bg-cover bg-bottom h-32"/>
<Footer/>
</>
  )
}
