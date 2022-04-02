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
    <div className="relative  h-full overflow-hidden rounded-lg bg-contain bg-center bg-no-repeat px-8 pt-16 pb-24 text-center">
      {/* adding images one by one in a row */}
      {['background', 'skin', 'eyes', 'hat', 'bottom', 'top'].map((key, i) => {
        return (
          <Image
            key={i}
            src={`/images/character_build/${key}/${key}_${
              { ...props.zombieProps }[key]
            }.png`}
            layout="fill"
            objectFit="contain"
            className="absolute"
          />
        )
      })}
    </div>
  )
}

export default Character
