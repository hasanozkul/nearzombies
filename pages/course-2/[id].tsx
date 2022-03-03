import { getAllPostIds, getPostData } from '../../lib/posts-c2'
import Head from 'next/head'
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import Image from "next/image"
import CodeEditor from '../../components/CodeEditor'
import { useState } from "react";
import Link from "next/link";
import iCustomCharacter from '/public/custom_char_base.png'
import { useRouter } from 'next/router'
import next from 'next'

export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
      paths,
      fallback: false
    }
  }


  export async function getStaticProps({ params }: any) {
    const postData = await getPostData(params.id)
    
    return {
      props: {
        postData
      }
    }
  }
  function Markdown() {
    return (
      <section className="body-font text-gray-600">
        
      </section>
    );
  }

  export default function Post({ postData }: any) {

  const [showCongrats, setShowCongrats] = useState(false);
  const value = `console.log(1 + 2)
  console.log(1 + 3)
  `
  const expectedValue = `console.log(1+2)
  console.log(1+3)
  console.log(1+3)
  console.log(1+3)
  `
  const handleClickClose = () => {
    setShowCongrats(false);
  }


  const route = useRouter().asPath.substring(1).split(/[-/]/)
  const nextChapter = +route[3] + 1
  const nextRoute = '/' + route[0] + '-' + route[1] + '/' + route[2] + '-' + nextChapter 



    return (

  <>
  <Head>
    <title>{postData.title}</title>
  </Head>
  <Navbar/>


  <section id="content" className="text-gray-600 body-font mb-20">
    <div className=" mx-full py">
      <h1 className="text-3xl font-medium title-font text-gray-900 mb-12 mt-12 text-center ">{route[2].toUpperCase() + ' ' + route[3] }</h1>
      <div className="flex place-content-center m-4">

          <div className="md:w-1/2 w-full ml-10 ">
              <div className="h-full bg-gray-100 p-8 rounded-[50px]">
              
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="block w-5 h-5 text-gray-400 mb-4" viewBox="0 0 975.036 975.036">
                  <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
              </svg>
              
                  <h1>{postData.title}</h1>
                  <br/>
                  <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
                    postData.prize
              </div>
          </div>


      
          <div className="md:w-1/2 w-full ml-10">
              <Markdown />
              {/* TODO: Add dynamic links */}
              <CodeEditor showCongrats={setShowCongrats} course="1" chapter="1" lang="typescript" value={value} expectedValue={expectedValue}/>
          </div>

          {showCongrats &&
          <div id="defaultModal" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0 flex">
          <div className="relative px-4 w-full max-w-2xl h-full md:h-auto m-auto">
              {/* <!-- Modal content --> */}
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  {/* <!-- Modal header --> */}
                  <div className="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
                      <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
                          Congrats
                      </h3>
                      <button onClick={handleClickClose} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                      </button>
                  </div>
                  {/* <!-- Modal body --> */}
                  <div className="p-6 space-y-6 grid grid-cols-2">
                    <div className="px-4">
                      <div className="px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative bg-bone-frame bg-no-repeat bg-center bg-contain">
                        <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-30">Character</h1>
                        <Image src={iCustomCharacter}/>
                      </div>
                    </div>
                    <div className="text-justify">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sagittis efficitur eros, ut porttitor eros ullamcorper eget. Duis vitae tempus erat, a faucibus sapien. Nunc magna purus, cursus vitae lectus sed, ultricies rutrum nunc. Quisque rhoncus, sapien nec interdum semper, massa nisl accumsan tortor, vitae egestas tellus mi in enim. Maecenas placerat ac nunc non bibendum. Maecenas feugiat neque at arcu faucibus efficitur nec eu nisi. Quisque non luctus enim. Maecenas feugiat neque at arcu faucibus efficitur nec eu nisi. Quisque non luctus enim. Maecenas feugiat neque at arcu faucibus efficitur nec eu nisi. Quisque non luctus enim. Maecenas feugiat neque at arcu faucibus efficitur nec eu nisi. Quisque non luctus enim.
                    </div>
                  </div>
                  {/* <!-- Modal footer --> */}
                  <div className="grid items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                    <Link href={nextRoute}>
                      <button className="text-white bg-gray-500 py-2 px-20 focus:outline-none hover:bg-gray-700 rounded text-lg">
                        Next Course
                      </button>
                    </Link>
                  </div>
              </div>
          </div>
      </div>
          }
          
      </div>
    </div>
  </section>
    <Footer/>

  </>
          



    )
  }