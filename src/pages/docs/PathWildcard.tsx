import DocShell from './DocShell'
import CodeBlock from '../../components/CodeBlock'

export default function PathWildcard() {
  return (
    <DocShell
      slug="path-wildcard"
      group="核心概念"
      title="路径通配"
      en="Path wildcard"
      lead="Keystatic collection 的 path 通配符让你灵活控制内容的输出位置，是一个能覆盖大多数场景的 glob 模式。"
    >
      <h2 id="nested-folder">嵌套目录输出</h2>
      <p>
        <strong>示例：</strong>
        <code>path: 'packages/design-system/*/docs/'</code>
      </p>
      <p>
        设想一个位于 monorepo 中的 Design System：
      </p>

      <CodeBlock
        lang="bash"
        title="目录结构"
        code={`root
├── packages
│   └── design-system
│       ├── button
│       │   └── src
│       └── dropdown
│           └── src
└── apps
    └── docs (keystatic)`}
      />

      <p>
        你的 Keystatic 站点位于 <code>apps/docs</code>，但你希望文档条目与每个组件放在一起
        （即 <code>packages/design-system/&lt;component-name&gt;/docs/</code>）。
        用下面这段配置就能做到：
      </p>

      <CodeBlock
        lang="ts"
        code="path: 'packages/design-system/*/docs/'"
      />

      <h2 id="nested-slug">嵌套 slug</h2>
      <p>
        <strong>示例：</strong>
        <code>path: 'content/posts/**'</code>
      </p>
      <p>
        有时你希望条目的 slug 自身携带多级目录结构。比如你希望同一个集合同时支持下面的多语言目录布局：
      </p>

      <CodeBlock
        lang="bash"
        title="目录结构"
        code={`content
└── posts
    ├── en
    │   └── post-1.mdoc
    └── fr
        └── post-1.mdoc`}
      />

      <p>这时可以用 <code>**</code> 通配符：</p>

      <CodeBlock lang="ts" code="path: 'content/posts/**'" />

      <p>
        由于 Keystatic 的 <code>slug</code> 字段可以包含 <code>/</code>，
        你只要把 <code>slug</code> 的值设为 <code>en/post-1</code>、<code>fr/post-1</code>{' '}
        这种带斜杠的字符串，就能自然地形成多级目录。
      </p>
    </DocShell>
  )
}
