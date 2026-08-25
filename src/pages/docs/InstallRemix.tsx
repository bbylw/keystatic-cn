import DocShell from './DocShell'
import CodeBlock from '../../components/CodeBlock'

export default function InstallRemix() {
  return (
    <DocShell
      slug="installation-remix"
      group="安装指南"
      title="在 Remix 项目中使用 Keystatic"
      en="Remix"
      lead="本指南假设你已经有一个现成的 Remix 项目。如果还没有，先用 npx create-remix@latest 创建一个。"
    >
      <h2 id="installing">安装依赖</h2>
      <p>安装 Keystatic 官方的 core 与 remix 包，以及 @markdoc/markdoc：</p>

      <CodeBlock lang="bash" code={'npm install @keystatic/core @keystatic/remix @markdoc/markdoc'} />

      <h2 id="creating-config">创建 Keystatic 配置文件</h2>
      <p>在项目根目录创建 <code>keystatic.config.ts</code>：</p>

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
      path: 'app/content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
  },
});`}
      />

      <h2 id="admin-ui">设置管理界面</h2>
      <p>
        创建 <code>app/routes/keystatic.$.tsx</code> 文件，用于承载管理界面的所有路由：
      </p>

      <CodeBlock
        lang="ts"
        title="app/routes/keystatic.$.tsx"
        code={`// app/routes/keystatic.$.tsx
import { makePage } from '@keystatic/remix/ui';
import config from '../../keystatic.config';

export default makePage(config);`}
      />

      <p>
        接着创建 <code>app/routes/api.keystatic.$.tsx</code>，处理管理界面发起的 API 请求：
      </p>

      <CodeBlock
        lang="ts"
        title="app/routes/api.keystatic.$.tsx"
        code={`// app/routes/api.keystatic.$.tsx
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { handleLoader } from '@keystatic/remix/api';
import config from '../../keystatic.config';

export const loader: LoaderFunction = args => handleLoader({ config }, args);
export const action: ActionFunction = args => handleLoader({ config }, args);`}
      />

      <h2 id="server-deps">配置服务端依赖</h2>
      <p>因为 Keystatic 只提供 ESM 构建，需要配置服务端把相关依赖打进 bundle。</p>

      <h3>传统 Remix</h3>
      <p>如果你使用传统的（非 Vite 版）Remix，可以在 <code>remix.config.js</code> 中配置：</p>

      <CodeBlock
        lang="ts"
        code={`/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ['**/.*'],
  serverDependenciesToBundle: [/^@keystatic\//, 'minimatch'],
};`}
      />

      <h3>Remix + Vite</h3>
      <p>如果你用的是
        <a href="https://remix.run/docs/en/main/future/vite" target="_blank" rel="noreferrer">
          Remix + Vite ↗
        </a>
        ，需要改在 Vite 的 <code>ssr.noExternal</code> 里配置：
      </p>

      <CodeBlock
        lang="ts"
        title="vite.config.js"
        code={`export default defineConfig({
  plugins: [remix()],
  ssr: {
    noExternal: [/^@keystatic\//, 'minimatch'],
  },
})`}
      />

      <h2 id="running">运行 Keystatic</h2>
      <p>启动 Remix 开发服务器：</p>

      <CodeBlock lang="bash" code={'npm run dev'} />

      <p>
        在浏览器中用 <code>localhost</code> 或 <code>127.0.0.1</code> 访问 <code>/keystatic</code>{' '}
        即可看到 Keystatic 管理界面。
      </p>

      <h2 id="creating">创建第一篇文章</h2>
      <p>
        我们在配置中把 <code>posts</code> 集合的 <code>path</code> 设为了{' '}
        <code>app/content/posts/*</code>。在管理界面新建文章后，文件会出现在{' '}
        <code>app/content/posts</code> 目录下：
      </p>

      <CodeBlock
        lang="bash"
        title="目录结构"
        code={`app
└── content
    └── posts
        └── my-first-post.mdoc`}
      />

      <h2 id="rendering">渲染 Keystatic 内容</h2>
      <p>
        Keystatic 提供
        <a href="#/docs/reader-api">Reader API</a>，
        它是一个 Node API，必须在服务端运行。
      </p>

      <h3>展示集合列表</h3>

      <CodeBlock
        lang="ts"
        title="app/routes/posts._index.tsx"
        code={`import { createReader } from '@keystatic/core/reader'
import { Link, useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/node'

import keystaticConfig from '../../keystatic.config'

export async function loader() {
  // 1. 创建 reader
  const reader = createReader(process.cwd(), keystaticConfig)
  // 2. 读取 "posts" 集合
  const posts = await reader.collections.posts.all()
  return json({ posts })
}

export default function Page() {
  const { posts } = useLoaderData<typeof loader>()

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug}>
          <Link to={\`/posts/\${post.slug}\`}>{post.entry.title}</Link>
        </li>
      ))}
    </ul>
  )
}`}
      />

      <h3>展示单篇内容</h3>
      <p>使用 Markdoc 的 <code>transform</code> 与 <code>renderers.react</code> 渲染单篇文章：</p>

      <CodeBlock
        lang="ts"
        title="app/routes/posts.$slug.tsx"
        code={`import React from 'react';
import Markdoc from '@markdoc/markdoc'
import { createReader } from '@keystatic/core/reader'
import { type LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import keystaticConfig from '../../keystatic.config'

export async function loader({ params }: LoaderFunctionArgs) {
  const reader = createReader(process.cwd(), keystaticConfig)
  const slug = params.slug
  if (!slug) throw json('Not Found', { status: 404 })
  const post = await reader.collections.posts.read(
    slug,
    { resolveLinkedFiles: true }
  )
  if (!post) throw json('Not Found', { status: 404 })
  const errors = Markdoc.validate(post.content.node)
  if (errors.length) {
    console.error(errors)
    throw new Error('Invalid content')
  }
  const content = Markdoc.transform(post.content.node)
  return json({
    post: {
      title: post.title,
      content,
    },
  })
}

export default function Post() {
  const { post } = useLoaderData<typeof loader>()
  return (
    <>
      <h1>{post.title}</h1>
      {Markdoc.renderers.react(post.content, React)}
    </>
  )
}`}
      />

      <h2 id="deploying">部署</h2>
      <div className="callout warn">
        <span className="co-icon" aria-hidden="true">
          !
        </span>
        <span>Remix 部署相关文档正在编写中。生产环境通常还需要把 Keystatic 连接到 GitHub —— 详见
          <a href="#/docs/github-mode">GitHub 模式</a>。
        </span>
      </div>
    </DocShell>
  )
}
