import React, { useEffect, useRef, useState } from 'react'
import Editor, { DiffEditor } from '@monaco-editor/react'
import * as monaco from 'monaco-editor';
import { auth } from './firebase-config';
import { ref, get, getDatabase, set } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import Router, { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import useWindowSize from 'react-use/lib/useWindowSize';
const database = getDatabase();

function CodeEditor(props: any) {
  const router = useRouter();
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor|null>(null);
  const diffEditorRef = useRef<monaco.editor.IStandaloneDiffEditor|null>(null);
  const [submitErr, setSubmitErr] = useState(false);
  const [openDiff, setOpenDiff] = useState(false);
  const {width, height} = useWindowSize();

  const SubmitErr = () => {
    setTimeout(() => {
      setSubmitErr(false);
    }, 2500)

    return (
      <div className="inline-flex text-red border-4 border-red-700 text-bold bg-red-50 pt-1 px-20 focus:outline-none hover:bg-gray-200 rounded text-lg">
        Invalid Try Again
      </div>
    )
  }

  function handleEditorDidMount(editor: monaco.editor.IStandaloneCodeEditor, Monaco: typeof monaco) {
    editorRef.current = editor;
  }
  
  function getValue() {
    try {
      return editorRef!.current!.getValue();
    } catch (error) {
      return props.value;
    }
  }

  function handleDiffEditorDidMount(editor: monaco.editor.IStandaloneDiffEditor, Monaco: typeof monaco) {
    diffEditorRef.current = editor;
  }

  function getModifiedValue() {
    try {
      return diffEditorRef!.current!.getModifiedEditor().getValue()
    } catch (error) {
      return props.value;
    }
  }

  function sendTrueDataToFirebase() {
    const user = auth.currentUser;
    if (user) {
      const pathRef = ref(database, "users/" + user.uid + "/save/course-" + props.course + "/chapter-" + props.chapter);
      set(pathRef, true);
      const lastRef = ref(database, "users/" + user.uid + "/save/course-" + props.course + "/last-chapter");
      set(lastRef, parseInt(props.chapter));
    }
  }

  function handleSubmitClick() {
    let value: string;
    let expected: string = props.expectedValue;
    const regex = /\s/g;


    if (openDiff) {
      value = getModifiedValue();
    } else {
      value = getValue();
    }
    value = value.replace(regex, '');
    expected = expected.replace(regex, '');

    if (value === expected) {
      console.log("Finished course-" + props.course + ", chapter-" + props.chapter);
      sendTrueDataToFirebase();
      props.showCongrats(true);
    } else {
      setSubmitErr(true);
    }
  }

  function handleShowAnswerClick() {
    setOpenDiff(!openDiff);
  }
  
  return (
    <div>
      <div className='h-[70vh]'>
        {openDiff && <DiffEditor
          language={props.lang}
          original={props.expectedValue}
          modified={getValue()}
          onMount={handleDiffEditorDidMount}
          theme="vs-dark"
        />}
        {!openDiff && <Editor
          defaultLanguage={props.lang}
          defaultValue={getModifiedValue()}
          onMount={handleEditorDidMount}
          theme="vs-dark"
        />}
      </div>
      
      <div className='flex mt-5'>
        <button onClick={handleSubmitClick} className="mr-auto inline-flex text-white bg-gray-500 py-2 px-20 focus:outline-none hover:bg-gray-700 rounded text-lg">
          Submit
        </button>
        {submitErr && <SubmitErr />}
        <button onClick={handleShowAnswerClick} className="ml-auto inline-flex text-white bg-gray-500 py-2 px-20 focus:outline-none hover:bg-gray-700 rounded text-lg">
          Show Answer
        </button>
      </div>
    </div>
  )
}

export default CodeEditor
