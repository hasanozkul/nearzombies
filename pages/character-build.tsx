import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Image from 'next/image'
import iCrossBone from '/public/images/cross-bone.png'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { auth } from '../firebase/config'
import { getDatabase, get, ref, set } from 'firebase/database'
import { onAuthStateChanged } from 'firebase/auth'
import ProgressBar from '@ramonak/react-progress-bar'
import iCustomCharacter from '/public/images/character_build/skin/skin_1.png'
const database = getDatabase()

export default function Home() {
  const [zombieProps, setZombieProps] = useState({
    hat: 0,
    eyes: 0,
    top: 0,
    bottom: 0,
    skin: 0,
    background: 0,
  })

  const handleChangeZombie = (key: string, value: number) => {
    setZombieProps((prev) => ({ ...prev, [key]: value }))
  }

  /* fetch zombie properties from firebase only once */
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const pathRef = ref(database, 'users/' + user.uid + '/zombie')
        get(pathRef).then((snapshot) => {
          if (snapshot.exists()) {
            setZombieProps(snapshot.val())
          }
        })
      }
    })
  }, [])

  /* send firebase information if user clicks the 'start now' button */
  const pushZombieProps = () => {
    const user = auth.currentUser
    if (user === null) {
      console.error('Error: not logged in.')
      return
    }

    const pathRef = ref(database, 'users/' + user.uid + '/zombie/')
    console.log('firebase: set')
    set(pathRef, zombieProps)
  }

  return (
    <>
      <Navbar />
      <section id="character-build" className="bg-bg-courses bg-cover">
        <div className="container mx-auto px-5 py-24">
          <div className="m-10 flex flex-wrap">
            {/* Description*/}
            <div className="p-4 lg:w-1/3">
              <div className="relative h-full overflow-hidden rounded-lg bg-gray-300 bg-opacity-75 px-8 pt-16 pb-24 text-center">
                <h1 className="title-font mb-3 text-xl font-medium text-black sm:text-2xl">
                  Description
                </h1>

                <p className="mb-3 text-justify leading-relaxed text-black">
                  This is your character. As you are learning near protocol,
                  you'll be able to use your character with courses. Your
                  character will be given to you as a unique NFT. You can
                  configure its eye color, skin color and many more. Go ahead
                  try one and earn your NFT.
                </p>
              </div>
            </div>

            {/* Custom Character*/}
            <div className="p-4 lg:w-1/3 ">
              <div className="relative  h-full overflow-hidden rounded-lg bg-bone-frame bg-contain bg-center bg-no-repeat px-8 pt-16 pb-24 text-center">
                <h1 className="title-font mb-30 text-xl font-medium text-gray-900 sm:text-2xl"></h1>
                <Image src={iCustomCharacter} />
              </div>
            </div>

            {/* Build Control*/}
            <div className="p-4 lg:w-1/3">
              <div className="relative h-full overflow-hidden rounded-lg bg-gray-300 bg-opacity-75 px-8 pt-16 pb-24 text-center">
                <h1 className="title-font mb-3 text-xl font-medium text-gray-900 sm:text-2xl">
                  Build Control
                </h1>
                <div className="grid grid-rows-1 gap-4 ">
                  {/* Fetching Customization From Firebase */}
                  <>
                    {['hat', 'eyes', 'top', 'bottom', 'skin', 'background'].map(
                      (key, idx) => (
                        <div>
                          <h2 className="title-font mb-3 text-xs font-medium tracking-widest text-gray-400">
                            {key.toUpperCase()}
                          </h2>
                          <div className="mb-3 flex">
                            <input
                              type="range"
                              min="0"
                              max="5"
                              value={{ ...zombieProps }[key]}
                              className="range w-[100%] cursor-cell accent-black"
                              onChange={(e) =>
                                handleChangeZombie(
                                  key,
                                  parseInt(e.target.value)
                                )
                              }
                            />
                          </div>
                        </div>
                      )
                    )}
                  </>
                </div>
                <div className="mt-10 flex justify-end">
                  <Link href="/EN/course">
                    <button
                      onClick={pushZombieProps}
                      className=" mx-auto h-16 border-0 bg-bone-button bg-contain bg-no-repeat py-2 px-20 text-lg text-black focus:outline-none"
                    >
                      Start Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-32 bg-bg-footer bg-cover bg-bottom bg-no-repeat" />
      </section>

      <Footer />
    </>
  )
}
