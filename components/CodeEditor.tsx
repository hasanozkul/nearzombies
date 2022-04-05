/*
| Firebase remainingLife
|--- Users' remaining life information should be retrieved from firebase and saved in firebase.
|
| Editor Reset Button
|--- The reset button should make the editor revert to its original state
|
| User Passed Chapter
|---  Users should be able to see the correct answers to the chapters if they have already passed the chapter.
|
|
*/

import React, { useEffect, useRef, useState } from 'react'
import Editor, { DiffEditor } from '@monaco-editor/react'
import * as monaco from 'monaco-editor'
import { auth } from '../firebase/config'
import { ref, get, getDatabase, set } from 'firebase/database'
import { HeartIcon } from '@heroicons/react/solid'
import { XCircleIcon, CheckCircleIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'

const database = getDatabase()

/**
 * This function is responsible for rendering the code editor.
 *
 * It has a bunch of props that are passed from the parent component.
 *
 * The props are:
 *
 * - value: The value of the code editor.
 * - expectedValue: The expected value of the code editor.
 * - lang: The language of the code editor.
 * - showCongrats: A function that is responsible for showing the congrats message.
 *
 * The function has a bunch of states that are responsible for showing the error message, the success
 * message, the answer, and the remaining life.
 *
 * The states are:
 *
 * - showError: A boolean that is responsible for showing the error message.
 * - showSuccess: A boolean that is responsible for showing the success message.
 * - showAnswer: A boolean that is responsible for showing the answer.
 * - remainingLife: A number that is responsible for showing the remaining life
 * @param editor - monaco.editor.IStandaloneCodeEditor,
 * @param Monaco - typeof monaco
 */
function CodeEditor(props: any) {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  let chapterNum = props.chapter.split('_')[1]
  const router = useRouter()
  const { lang, course, chapter } = router.query
  const [value, setValue] = useState(props.value)
  const diffEditorRef = useRef<monaco.editor.IStandaloneDiffEditor | null>(null)
  const [showError, setShowError] = useState(false)
  const [openDiff, setOpenDiff] = useState(false)
  const [remainingLife, setRemainingLife] = useState<Number>(3)
  const [showAnswer, setShowAnswer] = useState<boolean>(false)
  const [showSuccess, setShowSuccess] = useState<boolean>(false)
  const [showSolved, setShowSolved] = useState(false)
  /* It's a function that shows an error message when the user submit the code and it's wrong. */

  function handleEditorDidMount(
    editor: monaco.editor.IStandaloneCodeEditor,
    Monaco: typeof monaco
  ) {
    editorRef.current = editor
  }

  function getValue() {
    return value
  }

  function handleDiffEditorDidMount(
    editor: monaco.editor.IStandaloneDiffEditor,
    Monaco: typeof monaco
  ) {
    diffEditorRef.current = editor
  }

  function getModifiedValue() {
    try {
      setValue(diffEditorRef!.current!.getModifiedEditor().getValue())
      return diffEditorRef!.current!.getModifiedEditor().getValue()
    } catch (error) {
      return props.value
    }
  }

  function sendSaveDataToFirebase(value: string) {
    const user = auth.currentUser
    if (user) {
      const userChapterStatusPath = ref(
        database,
        'users/' +
          user.uid +
          '/save/' +
          props.course +
          '/' +
          props.chapter +
          '/status'
      )
      const userCoinPath = ref(database, 'users/' + user.uid + '/coin/')
      get(userChapterStatusPath).then((snapshot) => {
        if (!snapshot.exists()) {
          get(userCoinPath).then((snapshot) => {
            let val = 0
            if (snapshot.exists()) {
              console.log()
              val = snapshot.val()
            }
            if (remainingLife > 0) {
              set(userChapterStatusPath, 'completed')

              set(userCoinPath, val + 10)
            } else {
              set(userChapterStatusPath, 'answer_shown')
            }
            const lastRef = ref(
              database,
              'users/' + user.uid + '/save/' + props.course + '/last_chapter'
            )
            set(lastRef, props.chapter.replace(/\D/g, ''))
          })
        }
        const userChapterWrittenCodePath = ref(
          database,
          'users/' +
            user.uid +
            '/save/' +
            props.course +
            '/' +
            props.chapter +
            '/writtencode'
        )
        set(userChapterWrittenCodePath, value)
      })
    }
  }

  function handleSubmitClick() {
    let value: string
    let expected: string = props.expectedValue
    const regex = /\s/g
    if (openDiff) {
      value = getModifiedValue()
    } else value = getValue()
    let sendValue = value
    value = value.replace(regex, '')
    expected = expected.replace(regex, '')

    if (value === expected) {
      setShowError(false)
      sendSaveDataToFirebase(sendValue)
      if (chapter === 'chapter_5') props.showCongrats(true)
      else {
        setShowSuccess(true)
      }
    } else {
      setShowSuccess(false)
      setShowError(true)
      setTimeout(() => {
        setShowError(false)
      }, 2500)
      if (remainingLife > 0) {
        // get life count from firebase and decrease
        setRemainingLife(Number(remainingLife) - 1)
      }
      if (remainingLife <= 1) {
        setShowAnswer(true)
      }
    }
  }

  useEffect(() => {
    const user = auth.currentUser
    if (user) {
      const userCourseChapterRemainingLifePath = ref(
        database,
        'users/' +
          user.uid +
          '/save/' +
          course +
          '/' +
          chapter +
          '/remainingLife'
      )
      get(userCourseChapterRemainingLifePath).then((snapshot) => {
        if (snapshot.exists()) {
          setRemainingLife(snapshot.val())
        } else {
          set(userCourseChapterRemainingLifePath, 3)
        }
      })
      const userSolvedCoursePath = ref(
        database,
        'users/' + user.uid + '/save/' + course + '/' + chapter + '/status'
      )
      get(userSolvedCoursePath).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val())

          setShowSolved(true)
        } else {
          setShowSolved(false)
        }
      })
    }
  }, [])

  useEffect(() => {
    const user = auth.currentUser
    if (user) {
      const userCourseChapterRemainingLifePath = ref(
        database,
        'users/' +
          user.uid +
          '/save/' +
          course +
          '/' +
          chapter +
          '/remainingLife'
      )
      set(userCourseChapterRemainingLifePath, remainingLife)
    }
  }, [remainingLife])

  function handleShowAnswerClick() {
    setOpenDiff(!openDiff)
  }

  function handleResetCode(setValue: any) {
    setOpenDiff(false)
    setValue(props.value)
  }

  return (
    <div className="relative ">
      {auth.currentUser && (
        <div className="mb-5 mt-5 flex xl:mt-0 ">
          {chapterNum > 1 && (
            <Link
              href={
                '/' +
                lang +
                '/' +
                course +
                '/chapter_' +
                (Number(chapterNum) - 1)
              }
            >
              <button
                onClick={handleResetCode.bind(null, setValue)}
                className="mr-auto inline-flex w-1/4 place-content-center items-center rounded-xl bg-gray-200 p-1 text-sm  text-gray-500 hover:bg-gray-300 focus:outline-none sm:text-base md:p-3 md:text-xl"
              >
                Previous Chapter
              </button>
            </Link>
          )}
          {showSuccess && (
            <div className="alert mx-2 w-full animate-withOpacity place-content-center bg-emerald-600 p-1 text-sm text-white shadow-lg  sm:text-base md:p-3 md:text-xl">
              <div>
                <CheckCircleIcon className="w-8" />
                <span>Great job! You can move on to the next chapter.</span>
              </div>
            </div>
          )}
          {showSolved && !showSuccess && (
            <div className="alert mx-2 w-full animate-withOpacity place-content-center bg-gray-200  p-1 text-sm text-gray-500 text-white shadow-lg  sm:text-base md:p-3 md:text-xl">
              <div>
                <CheckCircleIcon className="w-8" />
                <span>You already solved this chapter!</span>
              </div>
            </div>
          )}
          {chapterNum < 5 &&
            props.lastChapter &&
            props.lastChapter + 1 >= chapterNum && (
              <Link
                href={
                  '/' +
                  lang +
                  '/' +
                  course +
                  '/chapter_' +
                  (Number(chapterNum) + 1)
                }
              >
                <button
                  onClick={handleResetCode.bind(null, setValue)}
                  className={
                    'ml-auto inline-flex w-1/4 place-content-center items-center rounded-xl bg-gray-200 py-3  text-sm text-gray-500 hover:bg-gray-300 focus:outline-none sm:text-base md:text-xl  ' +
                    (showSuccess ? 'animate-bounce' : '')
                  }
                >
                  Next Chapter
                </button>
              </Link>
            )}
        </div>
      )}
      <div className="h-[70vh]">
        {openDiff && (
          <DiffEditor
            language={props.lang}
            original={props.expectedValue}
            modified={value}
            onMount={handleDiffEditorDidMount}
            theme="vs-dark"
          />
        )}
        {!openDiff && (
          <Editor
            defaultLanguage={props.lang}
            value={value}
            onChange={(e) => setValue(e)}
            onMount={handleEditorDidMount}
            theme="vs-dark"
          />
        )}
      </div>

      <div className="mt-5 flex">
        <div className="flex flex-grow flex-wrap">
          <div className="mr-0 inline-flex w-1/6 max-w-fit place-content-center items-center rounded-xl bg-gray-200 px-1 py-2 text-sm  sm:mr-4 sm:text-lg md:text-xl">
            <HeartIcon className="w-2/3 max-w-[2.5rem]  text-red-500 sm:w-10" />
            <div className="ml-1 w-1/3">
              <a>{remainingLife}</a>
            </div>
          </div>
          <button
            onClick={handleSubmitClick}
            className="mr-auto inline-flex w-1/3 place-content-center items-center rounded-xl bg-emerald-600 py-2 text-sm text-white hover:bg-emerald-700 focus:outline-none sm:text-lg"
          >
            Submit
          </button>

          <button
            onClick={handleResetCode.bind(null, setValue)}
            className="mr-auto inline-flex w-1/4 place-content-center items-center rounded-xl bg-gray-200 py-2 text-sm text-gray-500 hover:bg-gray-300 focus:outline-none sm:text-lg"
          >
            Reset
          </button>

          {showAnswer ? (
            <button
              onClick={handleShowAnswerClick}
              className="mr-auto inline-flex w-1/4 place-content-center items-center rounded-xl bg-gray-500 py-2 text-sm text-white hover:bg-gray-600 focus:outline-none sm:text-lg"
            >
              {openDiff ? 'Hide' : 'Show'} Answer
            </button>
          ) : (
            <div className="place-content-centerpy-2 mr-auto inline-flex w-1/4 " />
          )}
        </div>
      </div>

      {showError && (
        <div className="alert alert-error absolute right-0 top-2 w-[70%] animate-fromLeft place-content-center p-2 text-sm  shadow-lg sm:p-4 sm:text-lg md:top-8 md:w-1/2">
          <div>
            <XCircleIcon className="w-6 md:w-8" />
            <span>Upps... Something went wrong </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default CodeEditor
