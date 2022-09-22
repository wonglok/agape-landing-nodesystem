import { ChromePicker } from 'react-color'
import { Color } from 'three140'

export function ENFColor({ object, field }) {
  object[field] = object[field] || new Color('#ffffff')
  return (
    <ChromePicker
      color={object[field]}
      onChange={(ev) => {
        // // console.log(ev)
        // object[field].set(ev.hex)
      }}
    ></ChromePicker>
  )
}
