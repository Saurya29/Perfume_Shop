import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api'
import StarRating from '../components/StarRating.jsx'
import ShareButton from '../components/ShareButton.jsx'
import Gallery from '../components/Gallery.jsx'
import { inr } from '../utils/format'   // <-- add this

export default function Product(){
  const { id } = useParams()
  const [data, setData] = useState({ product:null, reviews:[] })
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState(null)

  useEffect(()=>{
    (async () => {
      try{
        const { data } = await api.get(`/api/products/${id}`)
        setData(data)
        setSelectedSize(data.product?.sizes?.[1] || data.product?.sizes?.[0] || null)
      } catch(e){
        console.error(e)
      } finally {
        setLoading(false)
      }
    })()
  }, [id])

  const avgRating = useMemo(()=>{
    if (!data.reviews?.length) return 0
    const s = data.reviews.reduce((acc,r)=> acc + (r.rating || 0), 0)
    return Math.round((s / data.reviews.length) * 10) / 10
  }, [data.reviews])

  async function handleAddReview(e){
    e.preventDefault()
    const form = new FormData(e.target)
    const payload = {
      authorName: form.get('authorName'),
      rating: Number(form.get('rating')),
      comment: form.get('comment')
    }
    try{
      const { data: created } = await api.post(`/api/products/${id}/reviews`, payload)
      setData(d => ({ ...d, reviews: [created, ...d.reviews] }))
      e.target.reset()
    }catch(e){
      alert('Failed to add review')
      console.error(e)
    }
  }

  if (loading) return <main className="container"><p>Loading…</p></main>
  if (!data.product) return <main className="container"><p>Product not found.</p></main>

  const p = data.product

  return (
    <main className="container">
      <div className="product-wrap">
        <Gallery images={p.images} />
        <div className="product-panel">
          <h1 style={{marginTop:0}}>{p.name}</h1>
          <div style={{display:'flex', alignItems:'center', gap:'.6rem'}}>
            <StarRating value={Math.round(avgRating)} />
            <span className="muted">{data.reviews.length} reviews</span>
          </div>
          <p className="muted" style={{marginTop:'.6rem'}}>{p.shortDescription}</p>
          <div style={{display:'flex', alignItems:'baseline', gap:'1rem'}}>
            <div className="price" style={{fontSize:'1.6rem'}}>{inr(p.price)}</div>
            <span className="muted">incl. taxes</span>
          </div>

          <div>
            <label className="muted">Choose size:</label>
            <div className="sizes">
              {p.sizes?.map(s => (
                <button key={s} className={`size-btn ${selectedSize===s ? 'active':''}`} onClick={()=>setSelectedSize(s)}>{s}</button>
              ))}
            </div>
          </div>

          <div style={{display:'flex', gap:'.6rem'}}>
            <button className="primary">Add to Cart</button>
            <ShareButton title={p.name} text={p.shortDescription} />
          </div>

          <div style={{marginTop:'1rem'}}>
            <h3>Details</h3>
            <p>{p.description}</p>
          </div>
        </div>
      </div>

      <section style={{margin:'1rem 0 2rem'}}>
        <h3>Reviews</h3>
        {data.reviews.length === 0 && <p className="muted">No reviews yet. Be the first!</p>}
        {data.reviews.map(r => (
          <div className="review" key={r._id}>
            <div style={{display:'flex', alignItems:'center', gap:'.6rem'}}>
              <strong>{r.authorName}</strong>
              <StarRating value={r.rating} />
              <span className="muted">{new Date(r.createdAt).toLocaleDateString()}</span>
            </div>
            <p style={{margin:'.3rem 0 0'}}>{r.comment}</p>
          </div>
        ))}
        <form className="review-form" onSubmit={handleAddReview}>
          <h4>Add a review</h4>
          <input name="authorName" placeholder="Your name" required />
          <select name="rating" defaultValue="5">
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Good</option>
            <option value="3">3 - Okay</option>
            <option value="2">2 - Poor</option>
            <option value="1">1 - Bad</option>
          </select>
          <textarea name="comment" rows="3" placeholder="What did you think?" required></textarea>
          <button className="primary" type="submit">Submit Review</button>
        </form>
      </section>
    </main>
  )
}
