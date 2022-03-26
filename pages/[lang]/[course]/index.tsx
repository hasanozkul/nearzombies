import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import Image from 'next/image'
import iCrossBone from '/public/images/cross-bone.png'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { auth } from '../../../firebase/config'
import { getDatabase, get, ref } from 'firebase/database'
import { onAuthStateChanged } from 'firebase/auth'
import ProgressBar from '@ramonak/react-progress-bar'
const database = getDatabase()

export default function Home() {
  const [courseNames, setCourseNames] = useState([
    'Course 1',
    'Course 2',
    'Course 3',
    'Course 4',
    'Course 5',
  ])
  const [descriptions, setDescriptions] = useState([
    'Desc 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed egestas magna augue, et luctus est placerat eget. In eu odio eu sapien tincidunt interdum. Praesent tortor nisl, accumsan et laoreet ut, blandit ut arcu. Praesent blandit ut diam a semper. Aenean vitae ultrices purus. Nulla consectetur risus ullamcorper nibh iaculis faucibus. Ut felis dui, ultricies sed varius dictum, ullamcorper nec diam. Phasellus ornare non eros sed dignissim. Nulla eget sollicitudin nisi, et dignissim quam. Aliquam erat volutpat. Morbi scelerisque sem pellentesque est semper tempor. In volutpat lorem id lacus facilisis, vitae accumsan ligula dictum. Nullam vel nisl nisl. Vestibulum turpis lectus, dictum id lectus ut, finibus interdum tellus. Proin a magna arcu.',
    'Desc 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed egestas magna augue, et luctus est placerat eget. In eu odio eu sapien tincidunt interdum. Praesent tortor nisl, accumsan et laoreet ut, blandit ut arcu. Praesent blandit ut diam a semper. Aenean vitae ultrices purus. Nulla consectetur risus ullamcorper nibh iaculis faucibus. Ut felis dui, ultricies sed varius dictum, ullamcorper nec diam. Phasellus ornare non eros sed dignissim. Nulla eget sollicitudin nisi, et dignissim quam. Aliquam erat volutpat. Morbi scelerisque sem pellentesque est semper tempor. In volutpat lorem id lacus facilisis, vitae accumsan ligula dictum. Nullam vel nisl nisl. Vestibulum turpis lectus, dictum id lectus ut, finibus interdum tellus. Proin a magna arcu.',
    'Desc 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed egestas magna augue, et luctus est placerat eget. In eu odio eu sapien tincidunt interdum. Praesent tortor nisl, accumsan et laoreet ut, blandit ut arcu. Praesent blandit ut diam a semper. Aenean vitae ultrices purus. Nulla consectetur risus ullamcorper nibh iaculis faucibus. Ut felis dui, ultricies sed varius dictum, ullamcorper nec diam. Phasellus ornare non eros sed dignissim. Nulla eget sollicitudin nisi, et dignissim quam. Aliquam erat volutpat. Morbi scelerisque sem pellentesque est semper tempor. In volutpat lorem id lacus facilisis, vitae accumsan ligula dictum. Nullam vel nisl nisl. Vestibulum turpis lectus, dictum id lectus ut, finibus interdum tellus. Proin a magna arcu.',
    'Desc 4. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed egestas magna augue, et luctus est placerat eget. In eu odio eu sapien tincidunt interdum. Praesent tortor nisl, accumsan et laoreet ut, blandit ut arcu. Praesent blandit ut diam a semper. Aenean vitae ultrices purus. Nulla consectetur risus ullamcorper nibh iaculis faucibus. Ut felis dui, ultricies sed varius dictum, ullamcorper nec diam. Phasellus ornare non eros sed dignissim. Nulla eget sollicitudin nisi, et dignissim quam. Aliquam erat volutpat. Morbi scelerisque sem pellentesque est semper tempor. In volutpat lorem id lacus facilisis, vitae accumsan ligula dictum. Nullam vel nisl nisl. Vestibulum turpis lectus, dictum id lectus ut, finibus interdum tellus. Proin a magna arcu.',
    'Desc 5. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed egestas magna augue, et luctus est placerat eget. In eu odio eu sapien tincidunt interdum. Praesent tortor nisl, accumsan et laoreet ut, blandit ut arcu. Praesent blandit ut diam a semper. Aenean vitae ultrices purus. Nulla consectetur risus ullamcorper nibh iaculis faucibus. Ut felis dui, ultricies sed varius dictum, ullamcorper nec diam. Phasellus ornare non eros sed dignissim. Nulla eget sollicitudin nisi, et dignissim quam. Aliquam erat volutpat. Morbi scelerisque sem pellentesque est semper tempor. In volutpat lorem id lacus facilisis, vitae accumsan ligula dictum. Nullam vel nisl nisl. Vestibulum turpis lectus, dictum id lectus ut, finibus interdum tellus. Proin a magna arcu.',
  ])

  const [completions, setCompletions] = useState([0, 0, 0, 0, 0])

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      for (let i = 0; i < completions.length; i++) {
        if (user) {
          const pathRef = ref(
            database,
            'users/' + user.uid + '/save/course-' + (i + 1) + '/last-chapter'
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
      <Navbar />

      <section className="body-font bg-bg-courses bg-cover text-gray-600">
        <div className="container mx-auto flex flex-wrap py-24">
          <div className="flex w-full flex-wrap">
            <div className="rounded-[20px] bg-gray-100 bg-opacity-90 py-6 px-6 md:w-1/2 lg:ml-48 lg:w-2/5 ">
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
                      <ProgressBar
                        className="my-2"
                        height=".5em"
                        bgColor="#6b7280"
                        baseBgColor="#9ca3af"
                        completed={completions[i]}
                        maxCompleted={10}
                        isLabelVisible={false}
                      />
                    </div>
                  </div>
                ))}
              </>
            </div>

            <div className="mt-12 ml-4 rounded-lg object-cover object-center md:mt-0 md:w-1/2 lg:w-1/3">
              <div className="relative h-full overflow-hidden rounded-[20px] bg-gray-100 bg-opacity-90 px-8 pt-16 pb-24 text-center">
                <h1 className="title-font mb-3 text-xl font-medium text-black sm:text-2xl">
                  Description
                </h1>
                <p className="mb-3 text-justify leading-relaxed text-black">
                  {descriptions[descIdx]}
                </p>
                <Link
                  href={
                    '/EN/course_' +
                    (descIdx + 1) +
                    '/chapter_' +
                    (completions[descIdx] + 1)
                  }
                >
                  <button className="inline-flex rounded border-0 bg-black py-2 px-20 text-lg text-white hover:bg-gray-700 focus:outline-none">
                    Start Now
                  </button>
                </Link>
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
