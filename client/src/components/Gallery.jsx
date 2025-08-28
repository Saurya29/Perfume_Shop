import { useState } from 'react'

export default function Gallery({ images=[] }){
  const [active, setActive] = useState(0)
  const main = images[active]
  return (
    <div className="gallery">
      {main && <img className="main" src={main} alt="Product" />}
      <div className="thumbs">
        {images.map((src,idx)=>(
          <img key={src} src={src} className={idx===active ? 'active': ''} onClick={()=>setActive(idx)} alt={`thumb-${idx}`} />
        ))}
      </div>
    </div>
  )
}
