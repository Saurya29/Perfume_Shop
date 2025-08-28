import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

export default function Navbar(){
  const navigate = useNavigate()
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const [q, setQ] = useState(params.get('q') || '')

  const submit = (e) => {
    e.preventDefault()
    const p = new URLSearchParams(search)
    if (q) p.set('q', q); else p.delete('q')
    navigate({ pathname: '/', search: p.toString() })
  }

  return (
    <>
      <header className="header">
        <div className="container row">
          <Link to="/" className="logo">Perfume<span style={{color:'#c9a76a'}}>Shop</span></Link>
          <form className="search" onSubmit={submit}>
            <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search perfumes, brands, notes…" />
            <button type="submit">Search</button>
          </form>
          <div className="icons">
            <button className="icon-btn" title="Account">👤</button>
            <button className="icon-btn" title="Wishlist">♡</button>
            <button className="icon-btn" title="Cart">🛒</button>
          </div>
        </div>
      </header>

      <nav className="navbar">
        <div className="container nav-inner">
          <Link to="/?q=men">Men</Link>
          <Link to="/?q=women">Women</Link>
          <Link to="/?q=unisex">Unisex</Link>
          <Link to="/?q=new">New Arrivals</Link>
          <Link to="/?q=sale">Sale</Link>
          <Link to="/?q=gift">Gifting</Link>
          <Link to="/?q=attar">Attar</Link>
          <Link to="/?q=oud">Oud</Link>
          <Link to="/?q=aqua">Aqua</Link>
          <Link to="/?q=citrus">Citrus</Link>
        </div>
      </nav>
    </>
  )
}
