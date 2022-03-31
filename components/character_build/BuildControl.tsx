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
    <div className="mx-auto max-w-full  p-0 sm:p-4 lg:h-auto lg:w-1/2 2xl:w-1/3">
      <div className="relative h-full min-w-fit overflow-hidden rounded-lg bg-gray-300 bg-opacity-75 px-0 pt-3 pb-4 text-center sm:pt-6 sm:pb-8 md:px-8 md:pt-10 md:pb-12">
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
                  <ul className="steps mx-auto  sm:translate-x-0">
                    {[1, 2, 3, 4, 5, 6].map((i) => {
                      return (
                        <li
                          key={i}
                          data-content={''}
                          className={
                            ' step cursor-pointer ' +
                            ({ ...props.zombieProps }[key] == i
                              ? 'step-primary'
                              : '')
                          }
                          onClick={() => {
                            handleChangeZombie(key, i)
                          }}
                        />
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
              className=" mx-auto h-16 border-0 bg-bone-button bg-contain bg-no-repeat py-2 px-20 text-lg text-black transition focus:outline-none active:translate-y-1"
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
