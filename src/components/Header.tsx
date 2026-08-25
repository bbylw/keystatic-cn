import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from './Logo'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container header-inner">
        <Link to="/" className="brand">
          <Logo />
          <span>
            Keystatic<span className="brand-cn"> 中文站</span>
          </span>
        </Link>

        <nav className="main-nav" aria-label="主导航">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            首页
          </NavLink>
          <NavLink to="/docs" className={({ isActive }) => (isActive ? 'active' : '')}>
            文档
          </NavLink>
          <a href="https://keystatic.cloud/" target="_blank" rel="noreferrer">
            Keystatic Cloud ↗
          </a>
        </nav>

        <div className="header-spacer" />

        <div className="header-actions">
          <a
            className="btn btn-ghost btn-sm"
            href="https://github.com/thinkmill/keystatic"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
          <Link className="btn btn-primary btn-sm" to="/docs/quick-start">
            快速开始
          </Link>
        </div>
      </div>
    </header>
  )
}
