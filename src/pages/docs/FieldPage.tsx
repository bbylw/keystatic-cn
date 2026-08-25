import { Link, useParams } from 'react-router-dom'
import DocShell from './DocShell'
import CodeBlock from '../../components/CodeBlock'
import { fields } from '../../content/fields'

export default function FieldPage() {
  const { name = '' } = useParams()
  const doc = fields[name]

  if (!doc) {
    return (
      <div className="notfound">
        <div className="code-404">404</div>
        <p>没有找到名为 <code>{name}</code> 的字段文档。</p>
        <Link className="btn btn-ghost btn-sm" to="/docs">
          返回文档总览
        </Link>
      </div>
    )
  }

  return (
    <DocShell
      slug={`fields/${doc.name}`}
      group="字段 API"
      title={doc.cn}
      en={doc.en}
      lead={doc.intro}
    >
      {doc.deprecated && (
        <div className="callout warn">
          <span className="co-icon" aria-hidden="true">
            !
          </span>
          <span>
            <strong>已弃用。</strong>请使用更现代的替代字段。
          </span>
        </div>
      )}

      <h2 id="example">示例</h2>
      {doc.example.map((ex, i) => (
        <CodeBlock
          key={i}
          lang={ex.lang}
          code={ex.code}
        />
      ))}

      {doc.notes?.map((n, i) => (
        <div className={n.kind === 'warn' ? 'callout warn' : 'callout'} key={i}>
          <span className="co-icon" aria-hidden="true">
            {n.kind === 'warn' ? '!' : 'i'}
          </span>
          <span>{n.text}</span>
        </div>
      ))}

      <h2 id="signature">类型签名</h2>
      <p>
        完整类型签名见
        <a href={doc.signature} target="_blank" rel="noreferrer">
          docsmill ↗
        </a>
        。
      </p>
    </DocShell>
  )
}
