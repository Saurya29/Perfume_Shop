import { useNavigate } from 'react-router-dom'
import { inr } from '../utils/format'

export default function ProductCard({ product }){
  const navigate = useNavigate()
  const cover = product.images?.[0]
  const isSale = (product.labels||[]).includes('Sale') || (product.mrp && product.mrp > product.price)
  const isNew  = (product.labels||[]).includes('New')
  const save = product.mrp ? Math.max(0, Number(product.mrp) - Number(product.price)) : 0

  return (
    <div className="card" role="button" onClick={()=>navigate(`/product/${product._id}`)}>
      {cover && <img src={cover} alt={product.name} loading="lazy" />}
      <div className="badges">
        {isSale && <span className="badge sale">SALE</span>}
        {isNew && <span className="badge new">NEW</span>}
      </div>
      <div className="content">
        {product.brand && <div className="brand">{product.brand}</div>}
        <h3 style={{margin:0}}>{product.name}</h3>
        <div className="row">
          <div>
            <span className="price">{inr(product.price)}</span>
            {product.mrp && product.mrp>product.price && (
              <>
                <span className="mrp">{inr(product.mrp)}</span>
                {save>0 && <span className="save">Save {inr(save)}</span>}
              </>
            )}
          </div>
        </div>
        <div className="quick">
          <button className="btn" onClick={(e)=>{e.stopPropagation();}}>♡ Wishlist</button>
          <button className="btn primary" onClick={(e)=>{e.stopPropagation();}}>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}
