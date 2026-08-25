import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container notfound">
      <div className="code-404">404</div>
      <h1 style={{ fontSize: 26 }}>页面走丢了</h1>
      <p>你要找的页面不存在或已被移动。</p>
      <div className="hero-cta" style={{ justifyContent: 'center' }}>
        <Link className="btn btn-primary btn-sm" to="/">
          回到首页
        </Link>
        <Link className="btn btn-ghost btn-sm" to="/docs">
          浏览文档
        </Link>
      </div>
    </div>
  )
}
