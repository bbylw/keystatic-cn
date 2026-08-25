import DocShell from './DocShell'
import CodeBlock from '../../components/CodeBlock'

export default function EntryLayout() {
  return (
    <DocShell
      slug="entry-layout"
      group="核心概念"
      title="编辑页布局"
      en="Entry layout"
      lead="集合与单例都支持 entryLayout 选项，可以设置为 form（默认）或 content。"
    >
      <p>
        默认的 <code>form</code> 布局会把所有字段堆叠起来；<code>content</code>{' '}
        布局则会把选中的 <code>document</code>、<code>markdoc</code> 或 <code>mdx</code>{' '}
        字段放到中央位置，其他字段移到侧边栏。
      </p>

      <div className="callout">
        <span className="co-icon" aria-hidden="true">
          i
        </span>
        <span>
          <code>entryLayout</code> 只在 <code>format.contentField</code> 指向{' '}
          <code>document</code>、<code>markdoc</code> 或 <code>mdx</code>{' '}
          字段时才会生效。详见
          <a href="#/docs/format-options">格式选项</a>。
        </span>
      </div>

      <h2 id="example">示例</h2>

      <CodeBlock
        lang="ts"
        code={`blog: collection({
  label: 'Blog posts',
  path: 'src/content/blog/**',
  entryLayout: 'content',
  format: {
    contentField: 'body',
  },
  schema: {}
})`}
      />

      <p>
        启用后，<code>body</code> 字段会占据编辑区的主要位置，其余字段被收纳到右侧的边栏。
        你可以把 <code>entryLayout: 'content'</code> 看作 Keystatic 的「专注写作」模式。
      </p>

      <div className="callout">
        <span className="co-icon" aria-hidden="true">
          i
        </span>
        <span>
          <code>EntryLayout</code> 类型签名：
          <a href="https://docsmill.dev/npm/@keystatic/core@latest#/.EntryLayout" target="_blank" rel="noreferrer">
            docsmill ↗
          </a>
        </span>
      </div>
    </DocShell>
  )
}
