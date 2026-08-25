import { Link } from 'react-router-dom'
import { docGroups } from '../../content/docs'

export default function DocsOverview() {
  return (
    <article>
      <p className="doc-crumb">
        文档 <span aria-hidden="true">/</span> <b>OVERVIEW</b>
      </p>
      <div className="prose">
        <h1>文档总览</h1>
        <p className="lead">
          Keystatic 让代码库中的内容变得人人可编辑。这里是从入门到核心概念的中文指南 ——
          想直接动手？先看<Link to="/docs/quick-start">快速开始</Link>。
        </p>

        <div style={{ display: 'grid', gap: 14, marginTop: 34 }}>
          {docGroups.map((group) => (
            <section
              key={group.title}
              style={{
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-lg)',
                background: '#fffdf8',
                padding: '24px 26px',
              }}
            >
              <p
                style={{
                  margin: '0 0 12px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11.5,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-deep)',
                  fontWeight: 600,
                }}
              >
                {group.title}
              </p>
              <ul style={{ display: 'grid', gap: 4 }}>
                {group.items.map((item) => (
                  <li key={item.slug} style={{ padding: 0 }}>
                    <Link
                      to={`/docs/${item.slug}`}
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        justifyContent: 'space-between',
                        gap: 12,
                        textDecoration: 'none',
                        padding: '9px 12px',
                        borderRadius: 10,
                      }}
                    >
                      <span style={{ fontWeight: 600, color: 'var(--ink)' }}>{item.cn}</span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 12,
                          color: 'var(--mid)',
                        }}
                      >
                        {item.en} →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="callout">
          <span className="co-icon" aria-hidden="true">
            i
          </span>
          <span>
            本站为社区维护的中文介绍站点，覆盖官方文档最常用的部分。完整英文文档请访问{' '}
            <a href="https://keystatic.com/docs" target="_blank" rel="noreferrer">
              keystatic.com/docs ↗
            </a>
            。
          </span>
        </div>
      </div>
    </article>
  )
}
