import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import Image from "next/image"
import iCrossBone from "/public/cross-bone.png"
import Link from "next/link"
import { useEffect, useState } from "react"
import { auth } from "../../components/firebase-config"
import { getDatabase, get, ref } from "firebase/database"
import { onAuthStateChanged } from "firebase/auth"
import ProgressBar from "@ramonak/react-progress-bar"
const database = getDatabase();

export default function Home() {
  const [courseNames, setCourseNames] = useState(["Course 1", "Course 2", "Course 3", "Course 4", "Course 5"])
  const [descriptions, setDescriptions] = useState([
    "Desc 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed egestas magna augue, et luctus est placerat eget. In eu odio eu sapien tincidunt interdum. Praesent tortor nisl, accumsan et laoreet ut, blandit ut arcu. Praesent blandit ut diam a semper. Aenean vitae ultrices purus. Nulla consectetur risus ullamcorper nibh iaculis faucibus. Ut felis dui, ultricies sed varius dictum, ullamcorper nec diam. Phasellus ornare non eros sed dignissim. Nulla eget sollicitudin nisi, et dignissim quam. Aliquam erat volutpat. Morbi scelerisque sem pellentesque est semper tempor. In volutpat lorem id lacus facilisis, vitae accumsan ligula dictum. Nullam vel nisl nisl. Vestibulum turpis lectus, dictum id lectus ut, finibus interdum tellus. Proin a magna arcu.",
    "Desc 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed egestas magna augue, et luctus est placerat eget. In eu odio eu sapien tincidunt interdum. Praesent tortor nisl, accumsan et laoreet ut, blandit ut arcu. Praesent blandit ut diam a semper. Aenean vitae ultrices purus. Nulla consectetur risus ullamcorper nibh iaculis faucibus. Ut felis dui, ultricies sed varius dictum, ullamcorper nec diam. Phasellus ornare non eros sed dignissim. Nulla eget sollicitudin nisi, et dignissim quam. Aliquam erat volutpat. Morbi scelerisque sem pellentesque est semper tempor. In volutpat lorem id lacus facilisis, vitae accumsan ligula dictum. Nullam vel nisl nisl. Vestibulum turpis lectus, dictum id lectus ut, finibus interdum tellus. Proin a magna arcu.",
    "Desc 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed egestas magna augue, et luctus est placerat eget. In eu odio eu sapien tincidunt interdum. Praesent tortor nisl, accumsan et laoreet ut, blandit ut arcu. Praesent blandit ut diam a semper. Aenean vitae ultrices purus. Nulla consectetur risus ullamcorper nibh iaculis faucibus. Ut felis dui, ultricies sed varius dictum, ullamcorper nec diam. Phasellus ornare non eros sed dignissim. Nulla eget sollicitudin nisi, et dignissim quam. Aliquam erat volutpat. Morbi scelerisque sem pellentesque est semper tempor. In volutpat lorem id lacus facilisis, vitae accumsan ligula dictum. Nullam vel nisl nisl. Vestibulum turpis lectus, dictum id lectus ut, finibus interdum tellus. Proin a magna arcu.",
    "Desc 4. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed egestas magna augue, et luctus est placerat eget. In eu odio eu sapien tincidunt interdum. Praesent tortor nisl, accumsan et laoreet ut, blandit ut arcu. Praesent blandit ut diam a semper. Aenean vitae ultrices purus. Nulla consectetur risus ullamcorper nibh iaculis faucibus. Ut felis dui, ultricies sed varius dictum, ullamcorper nec diam. Phasellus ornare non eros sed dignissim. Nulla eget sollicitudin nisi, et dignissim quam. Aliquam erat volutpat. Morbi scelerisque sem pellentesque est semper tempor. In volutpat lorem id lacus facilisis, vitae accumsan ligula dictum. Nullam vel nisl nisl. Vestibulum turpis lectus, dictum id lectus ut, finibus interdum tellus. Proin a magna arcu.",
    "Desc 5. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed egestas magna augue, et luctus est placerat eget. In eu odio eu sapien tincidunt interdum. Praesent tortor nisl, accumsan et laoreet ut, blandit ut arcu. Praesent blandit ut diam a semper. Aenean vitae ultrices purus. Nulla consectetur risus ullamcorper nibh iaculis faucibus. Ut felis dui, ultricies sed varius dictum, ullamcorper nec diam. Phasellus ornare non eros sed dignissim. Nulla eget sollicitudin nisi, et dignissim quam. Aliquam erat volutpat. Morbi scelerisque sem pellentesque est semper tempor. In volutpat lorem id lacus facilisis, vitae accumsan ligula dictum. Nullam vel nisl nisl. Vestibulum turpis lectus, dictum id lectus ut, finibus interdum tellus. Proin a magna arcu.",
  ]);



  const [completions, setCompletions] = useState([0, 0, 0, 0, 0])

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        for (let i = 0; i < completions.length; i++) {
          if (user) {
            const pathRef = ref(database, "users/" + user.uid + "/save/course-" + (i+1) + "/last-chapter");
            get(pathRef).then((snapshot) => {
              setCompletions(prev => {
                let copy = [...prev];
                if (snapshot.exists()) {
                  copy[i] = snapshot.val();
                } else {
                  copy[i] = 0;
                }
                return copy;
              })
            });
          }
        }
      }
    )
  }, []);

  const [descIdx, setDescIdx] = useState(0);

  const styleOnClick = (i: number) => {
    if (descIdx === i) {
      return "flex relative cursor-pointer bg-gray-300 rounded-[15px]"
    } else {
      return "flex relative cursor-pointer"
    }
  }

  return (

<>
<Navbar/>

<section className="text-gray-600 body-font bg-bg-courses bg-cover">
  <div className="container py-24 mx-auto flex flex-wrap">
    <div className="flex flex-wrap w-full">

      
      <div className="lg:w-2/5 lg:ml-48 md:w-1/2 py-6 px-6 bg-gray-100 bg-opacity-90 rounded-[20px] ">
        <> {courseNames.map((name, i) =>
            <div onClick={() => setDescIdx(i)} className={styleOnClick(i)}>
              <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
              </div>
              <div className="flex-shrink-0 w-10 h-10 mt-auto mb-auto mx-5 items-center justify-center text-white">
                <Image src={iCrossBone}/>
              </div>
              <div className="flex-grow mr-5 mt-2 mb-2">
                <h2 className="font-medium title-font text-lg text-gray-900 mb-1 tracking-wider">{name}</h2>
                <p className="leading-relaxed text-justify">{descriptions[i].substring(0, 100) + "..."}</p>
                <ProgressBar className='my-2' height=".5em" bgColor="#6b7280" baseBgColor="#9ca3af" completed={completions[i]} maxCompleted={10} isLabelVisible={false}/>
              </div>
            </div>
          )}
        </>
      </div>

      <div className="lg:w-1/3 md:w-1/2 object-cover object-center rounded-lg md:mt-0 mt-12 ml-4">
        <div className="h-full bg-gray-100 bg-opacity-90 px-8 pt-16 pb-24 rounded-[20px] overflow-hidden text-center relative">
        <h1 className="title-font sm:text-2xl text-xl font-medium text-black mb-3">
          Description
        </h1>
        <p className="leading-relaxed mb-3 text-justify text-black"> 
          {descriptions[descIdx]}
        </p>
        <Link href={"/course-" + (descIdx + 1) + "/chapter-" + (completions[descIdx]+1)}>
          <button className="inline-flex text-white bg-black border-0 py-2 px-20 focus:outline-none hover:bg-gray-700 rounded text-lg">Start Now</button>
        </Link>
      </div>
      </div>
    </div>
  </div>
  <div className="bg-bg-footer bg-no-repeat bg-cover bg-bottom h-32"/>

</section>

  <Footer/>
</>
    )
  }
  