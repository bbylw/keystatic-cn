import { useEffect } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { docGroups } from '../../content/docs'

export default function DocsLayout() {
  const { pathname } = useLocation()

  // 路由变化时回到页面顶部
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])

  return (
    <div className="container docs-shell">
      <aside className="docs-sidebar">
        {docGroups.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <p className="nav-group-title">{group.title}</p>
            <ul>
              {group.items.map((item) => (
                <li key={item.slug}>
                  <NavLink to={`/docs/${item.slug}`}>{item.cn}</NavLink>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </aside>

      <div className="docs-content">
        <Outlet />
      </div>
    </div>
  )
}
