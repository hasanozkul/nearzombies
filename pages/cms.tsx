import { languages } from "monaco-editor"
import { useState } from "react"
import { getDatabase, ref, set, get } from 'firebase/database';
import { checkPrimeSync } from "crypto";
import { countReset } from "console";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCmBoILl7w-Nzb44B8LK7fntP0rnuYPNW0",
    authDomain: "nearzombies-71d86.firebaseapp.com",
    databaseURL: "https://nearzombies-71d86-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "nearzombies-71d86",
    storageBucket: "nearzombies-71d86.appspot.com",
    messagingSenderId: "429312208945",
    appId: "1:429312208945:web:633fc280d2c912b57b2510"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
const database = getDatabase();

export default function(){


    const [contentLanguages, setcontentLanguages] = useState([
        {language:'TR'},
        {language:'EN'},
        {language:'FR' }
      ])

      const [contentCourse, setContentCourse] = useState([
        {course:'Course-1'},
        {course:'Course-2'},
        {course:'Course-3' }
      ])

      const [contentChapter, setContentChapter] = useState([
        {chapter:'Chapter-1'},
        {chapter:'Chapter-2'},
        {chapter:'Chapter-3'}
      ])

      const [chapter, setChapter] = useState({language: "", course: "", chapter: "", title: "", author: "",date: "", coin_reward: "",content: "", expected_code: "",});

      
      const handleChange = (event:any) => {
        setChapter({ ...chapter, [event.target.name]: event.target.value });
      };
      const handleSubmit = (event:any) => {
        event.preventDefault();
        console.log("chapter created");
        
        const chapterInfo = {number:chapter.course, chapter:chapter.chapter, title:chapter.title, author:chapter.author, date:chapter.date, reward:chapter.coin_reward, content:chapter.content, expected_code:chapter.expected_code}
        const pathRef =  ref( database, 'courses/'+chapter.language +'/'+ chapter.course +'/'+ chapter.chapter)
        set(pathRef, chapterInfo);
        //console.log(pathRef)
      };




    return(
        <div className="">
            <div className="pl-24 py-12 bg-violet-500">
            <h1 className="text-3xl">Content Management</h1>
            </div>

            <form className='mt-6 ml-24 flex flex-col space-y-4' onSubmit={handleSubmit}>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Language</span>
                    </label>
                    <select name="language" onChange={handleChange} className="select select-bordered">
                        <option disabled selected>Select</option>
                        {contentLanguages.map(lang => (
                            <option>{lang.language}</option>
                        ))}
                    </select>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Course</span>
                    </label>
                    <select name="course" onChange={handleChange} className="select select-bordered">
                    <option disabled selected>Select</option>
                    {contentCourse.map(course => (
                        <option>{course.course}</option>
                    ))}
                    </select>
                </div>

                
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Chapter</span>
                    </label>
                    <select name="chapter" onChange={handleChange} className="select select-bordered">
                        <option disabled selected>Select</option>
                        <option className="text-emerald-600 font-bold">New Chapter</option>
                        {contentChapter.map(chapter => (
                            <option>{chapter.chapter}</option>
                    ))}
                    </select>
                </div>


                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Title</span>
                    </label>
                    <input name="title" onChange={handleChange} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs"/>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Author</span>
                    </label>
                    <input name="author" onChange={handleChange} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs"/>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Date</span>
                    </label>
                    <input name="date" onChange={handleChange} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs"/>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Coin Rewared</span>
                    </label>
                    <input name="coin_reward" onChange={handleChange} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs"/>
                </div>

                <div className="form-control w-1/3">
                    <label className="label">
                        <span className="label-text">Content</span>
                    </label> 
                    <textarea name="content" onChange={handleChange} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
                </div>

                <div className="form-control w-1/3">
                    <label className="label">
                        <span className="label-text">Expected code</span>
                    </label> 
                    <textarea name="expected_code" onChange={handleChange} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
                </div>

                <div className="mt-6 w-64 pb-12">
                <input type="submit" value="Submit" className="btn"></input>
            </div>

            </form>

            
        </div>
    )
}