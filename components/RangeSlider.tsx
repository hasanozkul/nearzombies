import Link from 'next/link'
import Image from 'next/image'
import { ChangeEvent, useState } from 'react'

const RangeSlider = (props: any) => {
  const [range, setRange] = useState(props.value)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    setRange(value)
    props.setNameValueTo(props.name, value)
  }

  return (
    <div className="flex">
      <input
        type="range"
        min="0"
        max={props.max}
        value={range}
        className="w-[100%] accent-black"
        onChange={handleChange}
      />
    </div>
  )
}
export default RangeSlider
