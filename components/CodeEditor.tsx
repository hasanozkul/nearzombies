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
import { ref, get, getDatabase, set, onValue } from 'firebase/database'
import Router, { useRouter } from 'next/router'
import useWindowSize from 'react-use/lib/useWindowSize'
import { HeartIcon } from '@heroicons/react/solid'
import {
  XCircleIcon,
  CheckCircleIcon,
  UsersIcon,
} from '@heroicons/react/outline'

const database = getDatabase()

function CodeEditor(props: any) {
  const router = useRouter()
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const diffEditorRef = useRef<monaco.editor.IStandaloneDiffEditor | null>(null)
  const [showError, setShowError] = useState(false)
  const [openDiff, setOpenDiff] = useState(false)
  const { width, height } = useWindowSize()
  const [remainingLife, setRemainingLife] = useState<Number>(3)
  const [showAnswer, setShowAnswer] = useState<boolean>(false)
  const [showSuccess, setShowSuccess] = useState<boolean>(false)
  const [resetCode, setResetCode] = useState<boolean>(false)
  const [userTotalCoin, setUserTotalCoin] = useState<number>(0)

  /* It's a function that shows an error message when the user submit the code and it's wrong. */
  const SubmitErr = () => {
    {
      /**
    setTimeout(() => {
      setShowError(false)
    }, 2500)
 */
    }

    return (
      <div className="alert alert-error mt-4 place-content-center shadow-lg">
        <div>
          <XCircleIcon className="w-8" />
          <span>Upps... Something went wrong </span>
        </div>
      </div>
    )
  }
  const ShowSuccess = () => {
    return (
      <div className="alert mt-4 place-content-center bg-emerald-600 text-xl text-white shadow-lg">
        <div>
          <CheckCircleIcon className="w-10" />
          <span>Great job</span>
        </div>
      </div>
    )
  }

  const showAnswerButton = () => {
    return (
      <button
        onClick={handleShowAnswerClick}
        className="mr-auto inline-flex w-1/4 place-content-center items-center rounded-xl bg-gray-500 py-2 text-lg text-white hover:bg-gray-600 focus:outline-none"
      >
        Show Answer
      </button>
    )
  }

  function handleEditorDidMount(
    editor: monaco.editor.IStandaloneCodeEditor,
    Monaco: typeof monaco
  ) {
    editorRef.current = editor
  }

  function getValue() {
    try {
      return editorRef!.current!.getValue()
    } catch (error) {
      return props.value
    }
  }

  function handleDiffEditorDidMount(
    editor: monaco.editor.IStandaloneDiffEditor,
    Monaco: typeof monaco
  ) {
    diffEditorRef.current = editor
  }

  function getModifiedValue() {
    try {
      return diffEditorRef!.current!.getModifiedEditor().getValue()
    } catch (error) {
      return props.value
    }
  }

  function sendSaveDataToFirebase() {
    const user = auth.currentUser
    if (user) {
      const userChapterSavePath = ref(
        database,
        'users/' + user.uid + '/save/' + props.course + '/' + props.chapter
      )
      const userCoinPath = ref(database, 'users/' + user.uid + '/coin/')

      get(userCoinPath)
        .then((snapshot) => {
          if (snapshot.exists()) {
            // wont update !!
            setUserTotalCoin(snapshot.val())
          }
        })
        .then(() => {
          if (remainingLife > 0) {
            set(userChapterSavePath, 'completed')
            // change with chpater reward
            set(userCoinPath, userTotalCoin + 10)
          } else {
            set(userChapterSavePath, 'answer_shown')
          }
          const lastRef = ref(
            database,
            'users/' + user.uid + '/save/' + props.course + '/last_chapter'
          )
          set(lastRef, props.chapter.replace(/\D/g, ''))
        })
    }
  }

  function handleSubmitClick() {
    let value: string
    let expected: string = props.expectedValue
    const regex = /\s/g

    if (openDiff) {
      value = getModifiedValue()
    } else {
      value = getValue()
    }
    value = value.replace(regex, '')
    expected = expected.replace(regex, '')

    if (value === expected) {
      setShowError(false)
      setShowSuccess(true)
      sendSaveDataToFirebase()
      props.showCongrats(true)
    } else {
      setShowError(true)
      if (remainingLife > 0) {
        // get life count from firebase and decrease
        setRemainingLife(Number(remainingLife) - 1)
      }
      if (remainingLife <= 1) {
        setShowAnswer(true)
      }
    }
  }

  function handleShowAnswerClick() {
    setOpenDiff(!openDiff)
  }

  function showRemainingLife() {
    return (
      <div className="mr-4 inline-flex w-1/12 place-content-center items-center rounded-xl bg-gray-200 py-2 text-xl">
        <HeartIcon className="w-10 text-red-500" />
        <div className="ml-1 w-2">
          <a>{remainingLife}</a>
        </div>
      </div>
    )
  }

  function handleResetCode() {
    return null
  }

  return (
    <div>
      <div className="h-[70vh]">
        {openDiff && (
          <DiffEditor
            language={props.lang}
            original={props.expectedValue}
            modified={getValue()}
            onMount={handleDiffEditorDidMount}
            theme="vs-dark"
          />
        )}
        {!openDiff && (
          <Editor
            defaultLanguage={props.lang}
            defaultValue={getModifiedValue()}
            onMount={handleEditorDidMount}
            theme="vs-dark"
          />
        )}
      </div>

      <div className="mt-5 flex">
        <div className="flex flex-grow flex-wrap">
          {showRemainingLife()}
          <button
            onClick={handleSubmitClick}
            className="mr-auto inline-flex w-1/3 place-content-center items-center rounded-xl bg-emerald-600 py-2 text-lg text-white hover:bg-emerald-700 focus:outline-none"
          >
            Submit
          </button>

          <button
            onClick={handleResetCode}
            className="mr-auto inline-flex w-1/4 place-content-center items-center rounded-xl bg-gray-200 py-2 text-lg text-gray-500 hover:bg-gray-300 focus:outline-none"
          >
            Reset
          </button>

          {showAnswer ? (
            showAnswerButton()
          ) : (
            <div className="place-content-centerpy-2 mr-auto inline-flex w-1/4 " />
          )}
        </div>
      </div>
      {showSuccess && <ShowSuccess />}
      {showError && <SubmitErr />}
    </div>
  )
}

export default CodeEditor
