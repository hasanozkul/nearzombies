import Image from 'next/image'
import iCrossBone from '/public/images/cross-bone.png'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { auth } from '../../../firebase/config'
import { getDatabase, get, ref } from 'firebase/database'
import { onAuthStateChanged } from 'firebase/auth'
import Character from '../../../components/character_build/Character'
const database = getDatabase()

export default function Home() {
  const [courseNames, setCourseNames] = useState([
    'Course 1',
    'Course 2',
    'Course 3',
  ])
  const [descriptions, setDescriptions] = useState([
    'Desc 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    'Desc 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    'Desc 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  ])

  const [completions, setCompletions] = useState([0, 0, 0, 0, 0])
  const [zombieProps, setZombieProps] = useState({
    hat: 1,
    eyes: 1,
    top: 1,
    bottom: 1,
    skin: 1,
    background: 1,
  })

  /* A callback function that will be called when the user sign in or sign out. */
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      for (let i = 0; i < completions.length; i++) {
        if (user) {
          const pathRef = ref(
            database,
            'users/' + user.uid + '/save/course_' + (i + 1) + '/last_chapter'
          )
          get(pathRef).then((snapshot) => {
            setCompletions((prev) => {
              let copy = [...prev]
              if (snapshot.exists()) {
                copy[i] = snapshot.val()
              } else {
                copy[i] = 0
              }
              return copy
            })
          })
          const pathRef_2 = ref(database, 'users/' + user.uid + '/zombie')
          get(pathRef_2).then((snapshot) => {
            if (snapshot.exists()) {
              setZombieProps(snapshot.val())
            }
          })
        }
      }
    })
  }, [])

  const [descIdx, setDescIdx] = useState(0)

  const styleOnClick = (i: number) => {
    if (descIdx === i) {
      return 'flex relative cursor-pointer bg-gray-300 rounded-[15px]'
    } else {
      return 'flex relative cursor-pointer'
    }
  }

  return (
    <>
      <section className="body-font bg-bg-courses bg-cover text-gray-600 ">
        <div className=" mx-auto flex flex-wrap md:py-12 xl:py-24 ">
          <div className="mt-32 flex w-full flex-col md:mt-0 lg:flex-row lg:justify-center  ">
            <div className="mx-auto w-[90%] rounded-[20px] bg-gray-100 bg-opacity-90 py-6 px-6 sm:w-3/4 lg:mx-2 lg:w-2/5  xl:w-1/3  ">
              <>
                {' '}
                {courseNames.map((name, i) => (
                  <div
                    onClick={() => setDescIdx(i)}
                    className={styleOnClick(i)}
                  >
                    <div className="absolute inset-0 flex h-full w-10 items-center justify-center"></div>
                    <div className="mx-5 mt-auto mb-auto h-10 w-10 flex-shrink-0 items-center justify-center text-white">
                      <Image src={iCrossBone} />
                    </div>
                    <div className="mr-5 mt-2 mb-2 flex-grow">
                      <h2 className="title-font mb-1 text-lg font-medium tracking-wider text-gray-900">
                        {name}
                      </h2>
                      <p className="text-justify leading-relaxed">
                        {descriptions[i].substring(0, 100) + '...'}
                      </p>

                      <progress
                        className="progress progress-primary my-2"
                        value={completions[i]}
                        max="5"
                      ></progress>
                    </div>
                  </div>
                ))}
              </>
            </div>

            <div className="mx-auto mt-8 w-[90%] rounded-lg object-cover object-center sm:w-3/4 lg:mx-2 lg:mt-0 lg:w-2/5  xl:w-1/3">
              <div className="relative h-full overflow-hidden rounded-[20px] bg-gray-100 bg-opacity-90 px-8 pt-8 pb-16 text-center">
                <div className="my-0 mx-auto mb-5 h-[16rem] p-0 ">
                  {/* Custom Character*/}
                  <Character zombieProps={zombieProps} />
                </div>
                <h1 className="title-font mb-3 text-xl font-medium text-black sm:text-2xl">
                  Description
                </h1>
                <p className="mb-3 px-4  text-center leading-relaxed text-black">
                  {descriptions[descIdx]}
                </p>

                <Link
                  href={
                    '/EN/course_' +
                    (descIdx + 1) +
                    '/chapter_' +
                    (Number(completions[descIdx]) +
                      (Number(completions[descIdx]) === 5 ? 0 : 1))
                  }
                >
                  <button className="itmes-center inline-flex bg-bone-button bg-contain bg-center bg-no-repeat py-4 px-20 text-lg text-black  transition focus:translate-y-1 ">
                    Start Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="h-32 bg-bg-footer bg-cover bg-bottom bg-no-repeat" />
      </section>
    </>
  )
}
