import DocShell from './DocShell'
import CodeBlock from '../../components/CodeBlock'

export default function InstallAstro() {
  return (
    <DocShell
      slug="installation-astro"
      group="安装指南"
      title="在 Astro 项目中使用 Keystatic"
      en="Astro"
      lead="本指南假设你已经有一个现成的 Astro 项目。如果还没有，可以用 npx create astro@latest 快速创建一个。"
    >
      <h2 id="installing-dependencies">安装依赖</h2>
      <p>先用 <code>astro add</code> 命令添加 Astro 的 Markdoc 与 React 集成：</p>

      <CodeBlock lang="bash" code={'npx astro add react markdoc'} />

      <p>然后安装两个 Keystatic 官方包：</p>

      <CodeBlock lang="bash" code={'npm install @keystatic/core @keystatic/astro'} />

      <div className="callout">
        <span className="co-icon" aria-hidden="true">
          i
        </span>
        <span>
          Bun 用户对应：<code>bun add @keystatic/core @keystatic/astro</code>
        </span>
      </div>

      <h2 id="updating-the-astro-config">更新 Astro 配置</h2>
      <p>
        在 <code>astro.config.mjs</code> 中注册 <code>keystatic</code> 集成：
      </p>

      <CodeBlock
        lang="ts"
        title="astro.config.mjs"
        code={`import { defineConfig } from 'astro/config'

import react from '@astrojs/react'
import markdoc from '@astrojs/markdoc'
import keystatic from '@keystatic/astro'

// https://astro.build/config
export default defineConfig({
  integrations: [react(), markdoc(), keystatic()],
})`}
      />

      <h2 id="creating-a-keystatic-config-file">创建 Keystatic 配置文件</h2>
      <p>
        在项目根目录创建 <code>keystatic.config.ts</code>，声明存储类型（<code>local</code>）
        以及一个内容集合（<code>posts</code>）：
      </p>

      <CodeBlock
        lang="ts"
        code={`// keystatic.config.ts
import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
  },
});`}
      />

      <p>至此，Keystatic 已按你的 schema 配置完毕，可以管理内容了。</p>

      <h2 id="running-keystatic">运行 Keystatic</h2>
      <p>启动 Astro 开发服务器：</p>

      <CodeBlock lang="bash" code={'npm run dev'} />

      <p>
        访问 <code>http://127.0.0.1:4321/admin</code> 即可看到 Keystatic 管理界面运行起来。
      </p>

      <div className="callout">
        <span className="co-icon" aria-hidden="true">
          i
        </span>
        <span>
          过去 Keystatic 要求修改 <code>dev</code> 脚本，现在这一切都由集成自动接管，
          可以放心把脚本简化回 <code>&quot;dev&quot;: &quot;astro dev&quot;</code>。
        </span>
      </div>

      <h2 id="creating-a-new-post">创建第一篇文章</h2>
      <p>
        我们在配置中把 <code>posts</code> 集合的 <code>path</code> 设为了{' '}
        <code>src/content/posts/*</code>。因此在管理界面里新建文章时，
        会在 <code>src/content</code> 目录下生成新的文章文件夹与 <code>.mdoc</code> 文件。
      </p>
      <p>现在就去管理界面创建一篇文章并保存，然后你会在文件树里看到：</p>

      <CodeBlock
        lang="bash"
        title="目录结构"
        code={`src
└── content
    └── posts
        └── my-first-post.mdoc`}
      />

      <p>用编辑器打开它，就能看到刚才输入的 Markdown 内容：</p>

      <CodeBlock
        lang="bash"
        title="my-first-post.mdoc"
        code={`---
title: My First Post
---

This is my very first post. I am **super** excited.`}
      />

      <h2 id="rendering-keystatic-content">渲染 Keystatic 内容</h2>
      <p>
        下面的例子展示如何列出所有文章标题，并链接到单篇文章页面（这里使用 Astro 内建的
        Content Collections，而不是 Reader API）：
      </p>

      <CodeBlock
        lang="ts"
        title="src/pages/posts/index.astro"
        code={`---
import { getCollection } from 'astro:content'

const posts = await getCollection('posts')
---
<ul>
  {posts.map(post => (
    <li>
      <a href={\`/posts/\${post.slug}\`}>{post.data.title}</a>
    </li>
  ))}
</ul>`}
      />

      <p>要展示单篇文章的内容，可以使用 Astro 的 <code>&lt;Content /&gt;</code> 组件：</p>

      <CodeBlock
        lang="ts"
        title="src/pages/posts/[slug].astro"
        code={`---
import { getEntry } from 'astro:content'

const post = await getEntry('posts', 'my-first-post')
const { Content } = await post.render()
---

<main>
  <h1>{post.data.title}</h1>
  <Content />
</main>`}
      />

      <h2 id="deploying">部署 Keystatic + Astro</h2>
      <p>
        由于 Keystatic 需要运行服务端代码并调用 Node.js API，部署时需要为 Astro 添加一个
        SSR adapter。同时建议把 Keystatic 连接到 GitHub，这样在线上实例也能直接管理内容 ——
        参见官方文档{' '}
        <a href="https://keystatic.com/docs/github-mode" target="_blank" rel="noreferrer">
          Connect to GitHub ↗
        </a>
        。
      </p>
    </DocShell>
  )
}
