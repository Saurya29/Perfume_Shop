export default function ShareButton({ title, text }){
  const share = async () => {
    const url = window.location.href
    if (navigator.share){
      try { await navigator.share({ title, text, url }) } 
      catch (e) { console.log('Share canceled', e) }
    } else {
      try {
        await navigator.clipboard.writeText(url)
        alert('Link copied to clipboard!')
      } catch {
        prompt('Copy this product link:', url)
      }
    }
  }
  return <button className="primary" onClick={share}>Share</button>
}
