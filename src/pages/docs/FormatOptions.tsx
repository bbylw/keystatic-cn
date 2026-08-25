import DocShell from './DocShell'
import CodeBlock from '../../components/CodeBlock'

export default function FormatOptions() {
  return (
    <DocShell
      slug="format-options"
      group="核心概念"
      title="格式选项"
      en="Format options"
      lead="Keystatic 可以把数据存为多种格式：YAML、JSON、Markdoc 与 MDX。默认情况下，条目会以 YAML 文件保存。"
    >
      <p>
        如果集合里包含 <code>document</code>、<code>markdoc</code> 或 <code>mdx</code>{' '}
        字段，会为这些字段的内容再单独生成一个 <code>.mdoc</code> 或 <code>.mdx</code>{' '}
        文件。文件名与目录结构同时受 <code>path</code> 配置影响 —— 详见
        <a href="#/docs/content-organisation">内容组织</a>。
      </p>

      <h2 id="default">默认格式示例</h2>

      <CodeBlock
        lang="ts"
        code={`blog: collection({
  label: 'Blog',
  slugField: 'title',
  schema: {
    title: fields.slug({ name: { label: 'Title' } }),
    publishedDate: fields.date({ label: 'Published date' }),
    body: fields.markdoc({ label: 'Body' })
  }
})`}
      />

      <p>用上面这份配置创建一条 slug 为 <code>what-a-day</code> 的条目，会生成：</p>

      <CodeBlock
        lang="bash"
        title="目录结构"
        code={`blog/what-a-day
├── index.yaml
└── body.mdoc`}
      />

      <p>其中 <code>index.yaml</code> 内容大致是：</p>

      <CodeBlock
        lang="bash"
        title="index.yaml"
        code={`title: What a day
publishedDate: 2023-07-27`}
      />

      <p><code>body.mdoc</code> 内容大致是：</p>

      <CodeBlock
        lang="bash"
        title="body.mdoc"
        code={`What a **beautiful** day!

## Let's go to the beach

I say we pack our swimmers and towels and head to the beach.

Who's with me?`}
      />

      <h2 id="json">改用 JSON 数据</h2>
      <p>用 <code>format.data</code> 选项把数据格式改为 JSON：</p>

      <CodeBlock
        lang="ts"
        code={`blog: collection({
  label: 'Blog',
  slugField: 'title',
  format: { data: 'json' },
  schema: { /* ... */ }
})`}
      />

      <p>生成的文件会变成：</p>

      <CodeBlock
        lang="bash"
        title="目录结构"
        code={`blog/what-a-day
├── index.json
└── body.mdoc`}
      />

      <CodeBlock
        lang="bash"
        title="index.json"
        code={`{
  "title": "What a day",
  "publishedDate": "2023-07-27"
}`}
      />

      <h2 id="single-file">合并到单文件</h2>
      <p>
        很多时候你会希望把全部字段合并到一个文件里，把「元数据」字段写到 frontmatter 中 —
        这可以通过 <code>format.contentField</code> 来实现。你需要把一个{' '}
        <code>markdoc</code>、<code>mdx</code> 或 <code>document</code> 字段指定为
        <code>contentField</code>：
      </p>

      <CodeBlock
        lang="ts"
        code={`blog: collection({
  label: 'Blog',
  slugField: 'title',
  format: { contentField: 'body' },
  schema: {
    title: fields.slug({ name: { label: 'Title' } }),
    publishedDate: fields.date({ label: 'Published date' }),
    body: fields.markdoc({ label: 'Body' })
  }
})`}
      />

      <p>现在不再有单独的 body 文件，而是合并到 <code>index.mdoc</code>：</p>

      <CodeBlock
        lang="bash"
        title="目录结构"
        code={`blog/what-a-day
└── index.mdoc`}
      />

      <CodeBlock
        lang="bash"
        title="index.mdoc"
        code={`---
title: What a day
publishedDate: 2023-07-27
---

What a **beautiful** day!

## Let's go to the beach

I say we pack our swimmers and towels and head to the beach.

Who's with me?`}
      />

      <div className="callout">
        <span className="co-icon" aria-hidden="true">
          i
        </span>
        <span>
          <code>Format</code> 类型的最新签名见
          <a href="https://docsmill.dev/npm/@keystatic/core@latest#/.Format" target="_blank" rel="noreferrer">
            docsmill ↗
          </a>
          。
        </span>
      </div>
    </DocShell>
  )
}
