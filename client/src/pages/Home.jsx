import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import api from '../api'
import HeroCarousel from '../components/HeroCarousel.jsx'
import PromoTiles from '../components/PromoTiles.jsx'
import ProductCard from '../components/ProductCard.jsx'

export default function Home(){
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { search } = useLocation()
  const q = new URLSearchParams(search).get('q')?.toLowerCase().trim() || ''

  useEffect(()=>{
    (async () => {
      try{
        const { data } = await api.get('/api/products')
        setProducts(Array.isArray(data) ? data : (data?.items ?? []))
      } catch(e){
        console.error(e)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const filtered = useMemo(()=>{
    if (!q) return products
    return products.filter(p =>
      [p.name, p.brand, p.shortDescription, ...(p.labels||[])].join(' ').toLowerCase().includes(q)
    )
  }, [products, q])

  const bestSellers = [...filtered].sort((a,b)=>(b.rating||0)-(a.rating||0)).slice(0,8)
  const newArrivals = [...filtered].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).slice(0,8)

  return (
    <main>
      <div className="container" style={{padding:'1rem 0'}}>
        <HeroCarousel/>
        <PromoTiles/>
      </div>

      <section className="container" style={{padding:'1rem 0 2rem'}}>
        <div className="section-head">
          <h2>Best Sellers</h2>
          <a href="/?q=bestseller" className="muted">View all →</a>
        </div>
        {loading ? <p>Loading products…</p> : (
          <div className="grid grid-cols-4">
            {bestSellers.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        )}
      </section>

      <section className="container" style={{padding:'0 0 2rem'}}>
        <div className="section-head">
          <h2>New Arrivals</h2>
          <a href="/?q=new" className="muted">View all →</a>
        </div>
        {loading ? <p>Loading products…</p> : (
          <div className="grid grid-cols-4">
            {newArrivals.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        )}
      </section>
    </main>
  )
}
