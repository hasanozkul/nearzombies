import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/router"



const NotFound = () => {
    const router = useRouter()
  
    useEffect(() => {
      setTimeout(() => {
        router.push('/')
      }, 3000)
    }, [])
  
    return (
        <>
        <Navbar/>
      <div>
        <h1>Ooops...</h1>
        <h2>That page cannot be found :(</h2>
        <p>Going back to the <Link href="/"><a>Homepage</a></Link> is 3 seconds...</p>
      </div>
      <Footer/>
      </>
    );
  }
   
  export default NotFound;

  
  