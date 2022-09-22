export function ENFTexture({ material, field }) {
  let texture = material[field]

  let image = texture?.image

  let width = image?.width
  let height = image?.height

  //
  // console.log(width, height)

  return (
    <div>
      {field}
      {/*  */}
      {/*  */}
    </div>
  )
}

//

//
