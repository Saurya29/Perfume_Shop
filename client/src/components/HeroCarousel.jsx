import { useEffect, useState } from 'react'

const slides = [
  { id:1, bg:'/images/aurora_2.png', text:'New Arrivals' },
  { id:2, bg:'/images/ember_2.png', text:'Bestsellers for Evenings' },
  { id:3, bg:'/images/marine_2.png', text:'Fresh & Aqua' }
]

export default function HeroCarousel(){
  const [i, setI] = useState(0)
  useEffect(()=>{
    const t = setInterval(()=> setI(v => (v+1)%slides.length), 4000)
    return ()=>clearInterval(t)
  },[])
  return (
    <div className="hero">
      {slides.map((s, idx)=>(
        <div key={s.id}
          className="hero-slide"
          style={{ display: idx===i?'grid':'none', background:`center/cover url(${s.bg})` }}>
          <div style={{background:'rgba(0,0,0,.35)',padding:'6px 10px',borderRadius:10}}>{s.text}</div>
        </div>
      ))}
      <div className="hero-dots">
        {slides.map((s, idx)=>(
          <button key={s.id} className={idx===i?'active':''} onClick={()=>setI(idx)} />
        ))}
      </div>
    </div>
  )
}
