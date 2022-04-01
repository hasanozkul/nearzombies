import Link from 'next/link'
import { NextPage } from 'next'
import { auth } from '../../firebase/config'
import { Database, ref, set } from 'firebase/database'

type ZombieProps = {
  hat: number
  eyes: number
  top: number
  bottom: number
  skin: number
  background: number
}

interface Props {
  zombieProps: ZombieProps
  database: Database
  setZombieProps: (value: any) => void
}

const BuildControl: NextPage<Props> = (props) => {
  const pushZombieProps = () => {
    const user = auth.currentUser
    if (user === null) {
      writeToLocalStorage(props.zombieProps)
      return
    }

    const pathRef = ref(props.database, 'users/' + user.uid + '/zombie/')
    console.log('firebase: set')
    set(pathRef, props.zombieProps)
  }

  const writeToLocalStorage = (zombieProps: ZombieProps) => {
    localStorage.setItem('zombieProps', JSON.stringify(zombieProps))
  }

  const handleChangeZombie = (key: string, value: number) => {
    props.setZombieProps((prev: any) => ({ ...prev, [key]: value }))
  }

  /* send firebase information if user clicks the 'start now' button */
  return (
    <div className="mx-auto min-w-[240px]  max-w-full p-1 sm:p-4 lg:h-auto lg:w-1/2 2xl:w-1/3">
      <div className="relative h-full  overflow-hidden rounded-lg bg-gray-300 bg-opacity-75  px-4 pt-6 pb-4 text-center sm:px-6 sm:pt-6 sm:pb-8 md:px-8 md:pt-10 md:pb-12">
        <h1 className="title-font mb-1 text-xl font-medium text-gray-900 sm:mb-2 sm:text-2xl md:mb-3">
          Build Control
        </h1>
        <div className="grid grid-rows-1 gap-1 p-0 sm:gap-2 md:gap-4">
          {['hat', 'eyes', 'top', 'bottom', 'skin', 'background'].map(
            (key, idx) => (
              <div key={idx}>
                <h2 className="title-font mb-1 text-sm font-medium tracking-widest text-gray-400 md:mb-3">
                  {key.toUpperCase()}
                </h2>
                <div className="mb-3 flex ">
                  <ul className="after:content-[' '] relative mx-auto  w-fit translate-x-0 after:absolute  after:right-0 after:-z-10  after:h-full after:w-full after:-translate-y-[47%] after:border-b-4  after:border-[#9ca3af]  after:sm:-translate-y-[43%] after:sm:border-b-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => {
                      return (
                        <button
                          key={i}
                          onClick={handleChangeZombie.bind(null, key, i)}
                          className={
                            'z-500 mx-2  my-1 h-4 w-4 rounded-full first:ml-0 last:mr-0 only:bg-black sm:h-7 sm:w-7 md:h-8 md:w-8 lg:mx-4  xl:h-9 xl:w-9 ' +
                            ({ ...props.zombieProps }[key] == i
                              ? 'bg-[#5B0A91]'
                              : 'bg-[#9ca3af]')
                          }
                        >
                          {' '}
                        </button>
                      )
                    })}
                  </ul>
                </div>
              </div>
            )
          )}
        </div>
        <div className="mt-3 flex justify-end sm:mt-6 md:mt-10">
          <Link href="/EN/course">
            <button
              onClick={pushZombieProps}
              className=" mx-auto h-16 translate-y-2 border-0 bg-bone-button bg-contain bg-no-repeat px-16 pb-2 text-sm text-black transition duration-200 focus:outline-none active:translate-y-1 sm:py-2 sm:px-20 sm:text-lg"
            >
              Start Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BuildControl
