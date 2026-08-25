import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { getDocNeighbours } from '../../content/docs'

interface DocShellProps {
  slug: string
  group: string
  title: string
  en: string
  lead: string
  children: ReactNode
}

/** 文档页统一外壳：面包屑、标题、正文与上一篇/下一篇 */
export default function DocShell({ slug, group, title, en, lead, children }: DocShellProps) {
  const { prev, next } = getDocNeighbours(slug)

  return (
    <article>
      <p className="doc-crumb">
        文档 <span aria-hidden="true">/</span> {group} <span aria-hidden="true">/</span> <b>{en}</b>
      </p>

      <div className="prose">
        <h1>{title}</h1>
        <p className="lead">{lead}</p>

        {children}
      </div>

      <nav className="doc-pager" aria-label="上一篇下一篇">
        {prev ? (
          <Link to={`/docs/${prev.slug}`}>
            <span className="dir-hint">← 上一篇</span>
            <span className="pg-title">{prev.cn}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={`/docs/${next.slug}`} className="next">
            <span className="dir-hint">下一篇 →</span>
            <span className="pg-title">{next.cn}</span>
          </Link>
        ) : (
          <Link to="/" className="next">
            <span className="dir-hint">返回 →</span>
            <span className="pg-title">首页</span>
          </Link>
        )}
      </nav>
    </article>
  )
}
