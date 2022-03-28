import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'
import { auth } from '../firebase/config'
import { getDatabase, get, ref } from 'firebase/database'
import { onAuthStateChanged } from 'firebase/auth'
import Description from '../components/character_build/Description'
import Character from '../components/character_build/Character'
import BuildControl from '../components/character_build/BuildControl'

const database = getDatabase()

type ZombieProps = {
  hat: number
  eyes: number
  top: number
  bottom: number
  skin: number
  background: number
}

export default function Home() {
  const [zombieProps, setZombieProps] = useState({
    hat: 1,
    eyes: 1,
    top: 1,
    bottom: 1,
    skin: 1,
    background: 1,
  })

  /* fetch zombie properties from firebase only once */
  useEffect(() => {
    if (!auth.currentUser) {
      readFromLocalStorage()
    }
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const pathRef = ref(database, 'users/' + user.uid + '/zombie')
        get(pathRef).then((snapshot) => {
          if (snapshot.exists()) {
            setZombieProps(snapshot.val())
          }
        })
      }
    })
  }, [])

  const readFromLocalStorage = () => {
    var zombiePropsStorage = JSON.parse(
      localStorage.getItem('zombieProps') || ''
    )
    if (zombiePropsStorage != '') {
      setZombieProps(zombiePropsStorage)
    }
  }

  return (
    <div className=" overflow-auto text-ellipsis">
      <Navbar />
      <section
        id="character-build"
        className="min-w-fit bg-bg-courses bg-cover"
      >
        <div className="container mx-auto py-24 md:px-3 lg:px-5">
          <div className="m-2 flex flex-wrap ">
            {/* Description*/}
            <Description />

            {/* Custom Character*/}
            <Character zombieProps={zombieProps} />

            {/* Build Control*/}
            <BuildControl
              zombieProps={zombieProps}
              database={database}
              setZombieProps={setZombieProps}
            />
          </div>
        </div>
        <div className="h-32 bg-bg-footer bg-cover bg-bottom bg-no-repeat" />
      </section>

      <Footer />
    </div>
  )
}
