import Image from 'next/image'
import { NextPage } from 'next'

interface Props {
  zombieProps: {
    hat: number
    eyes: number
    top: number
    bottom: number
    skin: number
    background: number
  }
}
const Character: NextPage<Props> = (props) => {
  return (
    <div className=" my-5 h-96 w-full p-4 lg:h-auto lg:w-1/2 2xl:w-1/3 ">
      <div className="relative  h-full overflow-hidden rounded-lg bg-contain bg-center bg-no-repeat px-8 pt-16 pb-24 text-center">
        {/* adding images one by one in a row */}
        {['background', 'skin', 'hat', 'eyes', 'top', 'bottom'].map(
          (key, i) => {
            return (
              <Image
                src={`/images/character_build/${key}/${key}_${
                  { ...props.zombieProps }[key]
                }.png`}
                // placeholder="blur"
                // blurDataURL={`/images/character_build/${key}/${key}_1}.png`}
                layout="fill"
                objectFit="contain"
                className="absolute"
              />
            )
          }
        )}
      </div>
    </div>
  )
}

export default Character
