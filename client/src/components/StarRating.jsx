export default function StarRating({ value=0 }){
  const stars = Array.from({length:5}).map((_,i)=> i < value ? '★' : '☆')
  return <div className="stars" aria-label={`Rating ${value} out of 5`}>{stars.join(' ')}</div>
}
