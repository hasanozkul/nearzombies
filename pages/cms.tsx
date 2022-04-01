import { languages } from 'monaco-editor'
import {
  ReactChild,
  ReactFragment,
  ReactPortal,
  useEffect,
  useState,
} from 'react'
import { getDatabase, ref, set, get, child, remove } from 'firebase/database'
import { checkPrimeSync } from 'crypto'
import { countReset } from 'console'
import { initializeApp } from 'firebase/app'
import { language } from 'gray-matter'

const firebaseConfig = {
  apiKey: 'AIzaSyDOH3reAi4V7n0KC7sEWPGFsYLc7Bntrvg',
  authDomain: 'impaytel.firebaseapp.com',
  databaseURL: 'https://impaytel.firebaseio.com',
  projectId: 'impaytel',
  storageBucket: 'impaytel.appspot.com',
  messagingSenderId: '1078239380727',
  appId: '1:1078239380727:web:d7574b8b8d69d8186cbff2',
}

// Course Chapter Relation Bug

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const db = getDatabase()

export const getStaticProps = async () => {
  let courses = {}

  const dbRef = ref(getDatabase())
  await get(child(dbRef, `courses`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        courses = snapshot.val()
      } else {
        console.log('No data available')
      }
    })
    .catch((error) => {
      console.error(error)
    })
  return {
    props: {
      courses,
    },
  }
}

const Home = ({ courses }: any) => {
  /* A way to set the initial state of the chapter data. */
  const [chapterData, setChapterData] = useState({
    language: 'EN',
    course: 'course_1',
    chapter: 'New Chapter',
    title: '',
    author: '',
    date: '',
    coin_reward: '',
    content: '',
    expected_code: '',
    given_code: '',
  })

  const langList = Object.keys(courses)
  const courseList = Object.keys(courses[chapterData.language])
  const chapterList = Object.keys(
    courses[chapterData.language][chapterData.course]['chapters']
  )

  /* A way to set the initial state of the chapter data. */
  useEffect(() => {
    if (chapterData.chapter == 'New Chapter') {
      // update chapter number !!
      setChapterData(
        Object.assign(
          {
            title: '',
            author: '',
            date: '',
            coin_reward: '',
            content: '',
            expected_code: '',
            given_code: '',
          },
          { language: chapterData.language },
          { course: chapterData.course },
          { chapter: chapterData.chapter }
        )
      )
    } else {
      const temp =
        courses[chapterData.language][chapterData.course]['chapters'][
          chapterData.chapter
        ]
      const temp2 = Object.assign(
        temp,
        { language: chapterData.language },
        { course: chapterData.course },
        { chapter: chapterData.chapter }
      )
      setChapterData(temp)
    }
  }, [chapterData.chapter])

  /**
   * It takes an event and sets the chapterData object to the value of the event's target.name property
   * @param {any} event - The event that triggered the function.
   */
  const handleChange = (event: any) => {
    setChapterData({ ...chapterData, [event.target.name]: event.target.value })
  }

  /**
   * It takes the form data and stores it in the database
   * @param {any} event - The event that was triggered.
   */
  const handleSubmit = (event: any) => {
    event.preventDefault()

    /* Checking if the chapter is new. If it is new, it will set the chapter number to the length of the
chapter list plus 1. */
    let chapterID = chapterData.chapter
    if (chapterData.chapter == 'New Chapter') {
      chapterID = 'chapter_' + (chapterList.length + 1).toString()
    }
    console.log(chapterID)
    const chapterInfo = {
      title: chapterData.title,
      author: chapterData.author,
      date: chapterData.date,
      reward: chapterData.coin_reward,
      content: chapterData.content,
      expected_code: chapterData.expected_code,
      given_code: chapterData.given_code,
    }
    const pathRef = ref(
      db,
      'courses/' +
        chapterData.language +
        '/' +
        chapterData.course +
        '/chapters/' +
        chapterID
    )
    set(pathRef, chapterInfo)
  }

  /**
   * It takes the chapter data and deletes the chapter from the database
   * @param {any} event - The event that triggered the function.
   */
  const handleDeleteUser = (event: any) => {
    const pathRef = ref(
      db,
      'courses/' +
        chapterData.language +
        '/' +
        chapterData.course +
        '/chapters/' +
        chapterData.chapter
    )
    remove(pathRef).then(() => {
      window.location.reload()
    })
  }

  return (
    <div className="">
      <div className="bg-violet-500 py-12 pl-24">
        <h1 className="text-3xl">Content Management</h1>
      </div>

      <form
        className="mt-6 ml-24 flex flex-col space-y-4"
        onSubmit={handleSubmit}
      >
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Language</span>
          </label>
          <select
            name="language"
            onChange={handleChange}
            className="select-bordered select"
          >
            {langList.map((lang) => (
              <option>{lang}</option>
            ))}
          </select>
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Course</span>
          </label>
          <select
            name="course"
            onChange={handleChange}
            className="select-bordered select"
          >
            {courseList.map((course) => (
              <option>{course}</option>
            ))}
          </select>
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Chapter</span>
          </label>
          <select
            name="chapter"
            onChange={handleChange}
            className="select-bordered select"
          >
            <option className="font-bold text-emerald-600">New Chapter</option>
            {chapterList.map((chapter) => (
              <option>{chapter}</option>
            ))}
          </select>
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            name="title"
            value={chapterData.title}
            onChange={handleChange}
            type="text"
            placeholder="Type here"
            className="input-bordered input w-full max-w-xs"
          />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Author</span>
          </label>
          <input
            name="author"
            value={chapterData.author}
            onChange={handleChange}
            type="text"
            placeholder="Type here"
            className="input-bordered input w-full max-w-xs"
          />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Date</span>
          </label>
          <input
            name="date"
            value={chapterData.date}
            onChange={handleChange}
            type="text"
            placeholder="Type here"
            className="input-bordered input w-full max-w-xs"
          />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Coin Rewared</span>
          </label>
          <input
            name="coin_reward"
            value={chapterData.coin_reward}
            onChange={handleChange}
            type="text"
            placeholder="Type here"
            className="input-bordered input w-full max-w-xs"
          />
        </div>

        <div className="form-control w-1/3">
          <label className="label">
            <span className="label-text">Content</span>
          </label>
          <textarea
            name="content"
            value={chapterData.content}
            onChange={handleChange}
            className="textarea-bordered textarea h-24"
            placeholder="Bio"
          ></textarea>
        </div>

        <div className="form-control w-1/3">
          <label className="label">
            <span className="label-text">Given code</span>
          </label>
          <textarea
            name="given_code"
            value={chapterData.given_code}
            onChange={handleChange}
            className="textarea-bordered textarea h-24"
            placeholder="Bio"
          ></textarea>
        </div>

        <div className="form-control w-1/3">
          <label className="label">
            <span className="label-text">Expected code</span>
          </label>
          <textarea
            name="expected_code"
            value={chapterData.expected_code}
            onChange={handleChange}
            className="textarea-bordered textarea h-24"
            placeholder="Bio"
          ></textarea>
        </div>

        <div className="mt-6 flex w-64 gap-4 pb-12">
          <input type="submit" value="Submit" className="btn"></input>
          <button
            type="button"
            onClick={handleDeleteUser}
            className="btn btn-error"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  )
}

export default Home

Home.getLayout = function PageLayout(page: any) {
  return <>{page}</>
}
