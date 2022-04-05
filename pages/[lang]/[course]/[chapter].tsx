import Image from 'next/image'
import CodeEditor from '../../../components/CodeEditor'
import { useEffect, useState } from 'react'
import iCustomCharacter from '/public/images/character_build/skin/skin_1.png'
import { useRouter } from 'next/router'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import { ref, getDatabase, get, child, onValue } from 'firebase/database'
import { auth } from '../../../firebase/config'

function Markdown() {
  return <section className="body-font text-gray-600"></section>
}

/**
 * Get the chapter data from the database and set it to the state
 * @returns The chapter data.
 */
function getChapterData() {
  const [data, setData] = useState<any>('')
  const [isLoading, setLoading] = useState(false)
  const router = useRouter()

  const { lang, course, chapter } = router.query

  const database = getDatabase()
  useEffect(() => {
    const user = auth.currentUser
    setLoading(true)
    const courseChapterPath = ref(
      database,
      'courses/' + lang + '/' + course + '/chapters/' + chapter + '/'
    )
    if (user) {
      const userWrittenCodePath = ref(
        database,
        'users/' + user.uid + '/save/' + course + '/' + chapter + '/writtencode'
      )
      get(userWrittenCodePath).then((snapshot) => {
        let val = ''
        if (snapshot.exists()) {
          val = snapshot.val()
        }
        get(courseChapterPath).then((snapshot) => {
          if (snapshot.exists()) {
            if (!val) setData(snapshot.val())
            else setData({ ...snapshot.val(), given_code: val })
            setLoading(false)
          }
        })
      })
    } else {
      get(courseChapterPath).then((snapshot) => {
        if (snapshot.exists()) {
          setData(snapshot.val())
          setLoading(false)
        }
      })
    }
  }, [router])
  if (isLoading) return 'loading'
  return data
}

const Chapter = () => {
  const router = useRouter()

  useEffect(() => {
    const user = auth.currentUser
    if (!user) {
      router.push('/EN/course')
    }
  }, [])

  const chapterData = getChapterData()
  const database = getDatabase()
  const [lastChapter, setLastChapter] = useState('')
  useEffect(() => {
    const user = auth.currentUser
    const { lang, course, chapter } = router.query
    if (user) {
      return onValue(
        ref(
          database,
          'users/' + user.uid + '/save/' + course + '/last_chapter'
        ),
        (snapshot) => {
          if (snapshot.exists()) setLastChapter(snapshot.val())
        }
      )
    }
  }, [auth.currentUser])

  const [showCongrats, setShowCongrats] = useState(false)

  const handleClickClose = () => {
    setShowCongrats(false)
  }

  const handleNextRoute = () => {
    router.push(nextRoute)
    setShowCongrats(false)
  }

  const [currLang, currCourse, currChapter] = useRouter()
    .asPath.substring(1)
    .split(/[/]/)

  const chapterNum = Number(currChapter.replace(/\D/g, '')) + 1
  const nextChapter = 'chapter_' + chapterNum

  const nextRoute = '/' + currLang + '/' + currCourse + '/' + nextChapter
  const { width, height } = useWindowSize()

  return (
    <>
      <section
        id="content"
        className="body-font mb-20 mt-20 overflow-hidden text-gray-600 md:mt-0 "
      >
        <div className=" mx-full py">
          <div className="m-4 flex flex-col place-content-center xl:flex-row">
            <div className="w-full xl:ml-10 xl:w-[40%]">
              <div className="h-full rounded-[50px] bg-gray-100 p-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="mb-4 block h-5 w-5 text-gray-400"
                  viewBox="0 0 975.036 975.036"
                >
                  <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                </svg>
                <h1 className="text-3xl text-black">{chapterData.title}</h1>

                <h2 className="text-xl">{chapterData.author}</h2>
                <br />
                <div />
                {chapterData.content}
              </div>
            </div>

            <div className="xl-mt-0  w-full xl:ml-10 xl:w-[60%]">
              <Markdown />
              {/* TODO: Add dynamic links */}
              {chapterData.expected_code && (
                <CodeEditor
                  showCongrats={setShowCongrats}
                  course={currCourse}
                  chapter={currChapter}
                  lastChapter={lastChapter}
                  lang="typescript"
                  value={chapterData.given_code}
                  expectedValue={chapterData.expected_code}
                />
              )}
            </div>

            {showCongrats && (
              <>
                <Confetti width={width} height={height} />
                <div
                  id="defaultModal"
                  aria-hidden="true"
                  className="h-modal fixed right-0 left-0 top-4 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0 md:h-full"
                >
                  <div className="relative m-auto h-full w-full max-w-2xl px-4 md:h-auto">
                    {/* <!-- Modal content --> */}
                    <div className="relative rounded-lg bg-white shadow">
                      {/* <!-- Modal header --> */}
                      <div className="flex items-start justify-between rounded-t border-b p-5">
                        <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl">
                          Congrats
                        </h3>
                        <button
                          onClick={handleClickClose}
                          type="button"
                          className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
                          data-modal-toggle="defaultModal"
                        >
                          <svg
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </button>
                      </div>
                      {/* <!-- Modal body --> */}
                      <div className="grid grid-cols-2 space-y-6 p-6">
                        <div className="px-4">
                          <div className="relative overflow-hidden rounded-lg bg-bone-frame bg-contain bg-center bg-no-repeat px-8 pt-16 pb-24 text-center">
                            <h1 className="title-font mb-30 text-xl font-medium text-gray-900 sm:text-2xl">
                              Character
                            </h1>
                            <Image src={iCustomCharacter} />
                          </div>
                        </div>
                        <div className="text-justify">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Proin sagittis efficitur eros, ut porttitor eros
                          ullamcorper eget. Duis vitae tempus erat, a faucibus
                          sapien. Nunc magna purus, cursus vitae lectus sed,
                          ultricies rutrum nunc. Quisque rhoncus, sapien nec
                          interdum semper, massa nisl accumsan tortor, vitae
                          egestas tellus mi in enim. Maecenas placerat ac nunc
                          non bibendum. Maecenas feugiat neque at arcu faucibus
                          efficitur nec eu nisi. Quisque non luctus enim.
                          Maecenas feugiat neque at arcu faucibus efficitur nec
                          eu nisi. Quisque non luctus enim. Maecenas feugiat
                          neque at arcu faucibus efficitur nec eu nisi. Quisque
                          non luctus enim. Maecenas feugiat neque at arcu
                          faucibus efficitur nec eu nisi. Quisque non luctus
                          enim.
                        </div>
                      </div>
                      {/* <!-- Modal footer --> */}
                      <div className="grid items-center space-x-2 rounded-b border-t border-gray-200 p-6 ">
                        <button
                          onClick={handleNextRoute}
                          className="rounded bg-gray-500 py-2 px-20 text-lg text-white hover:bg-gray-700 focus:outline-none"
                        >
                          Next Course
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      <div className=" mt-10 h-32 bg-bg-footer bg-cover bg-bottom bg-no-repeat" />
    </>
  )
}
export default Chapter
