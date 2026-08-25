import DocShell from './DocShell'
import CodeBlock from '../../components/CodeBlock'
import { Link } from 'react-router-dom'

export default function InstallNextJs() {
  return (
    <DocShell
      slug="installation-next-js"
      group="安装指南"
      title="在 Next.js 项目中使用 Keystatic"
      en="Next.js"
      lead="本指南假设你已有一个使用 app 目录的 Next.js 项目。如果还没有，先用 npx create-next-app@latest 创建一个。"
    >
      <h2 id="installing-dependencies">安装依赖</h2>
      <p>安装两个 Keystatic 官方包和 Markdoc：</p>

      <CodeBlock lang="bash" code={'npm install @keystatic/core @keystatic/next @markdoc/markdoc'} />

      <h2 id="creating-a-keystatic-config-file">创建 Keystatic 配置文件</h2>
      <p>
        Keystatic 需要一个配置文件来定义内容结构；之后如果要连接 GitHub 仓库，也在这份文件里完成。
        在项目根目录创建 <code>keystatic.config.ts</code>：
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

      <p>至此，Keystatic 已按你的 schema 配置完毕。</p>

      <h2 id="setting-up-the-admin-ui">设置管理界面</h2>

      <p>第一步，创建 <code>src/app/keystatic/keystatic.ts</code>：</p>

      <CodeBlock
        lang="ts"
        title="src/app/keystatic/keystatic.ts"
        code={`"use client";

import { makePage } from "@keystatic/next/ui/app";
import config from "../../../keystatic.config";

export default makePage(config);`}
      />

      <p>第二步，创建布局文件 <code>src/app/keystatic/layout.tsx</code>：</p>

      <CodeBlock
        lang="ts"
        title="src/app/keystatic/layout.tsx"
        code={`import KeystaticApp from "./keystatic";

export default function Layout() {
  return (
    <KeystaticApp />
  );
}`}
      />

      <p>第三步，创建页面 <code>src/app/keystatic/[[...params]]/page.tsx</code>：</p>

      <CodeBlock
        lang="ts"
        title="src/app/keystatic/[[...params]]/page.tsx"
        code={`export default function Page() {
  return null;
}`}
      />

      <p>最后，创建 API 路由 <code>src/app/api/keystatic/[...params]/route.ts</code>：</p>

      <CodeBlock
        lang="ts"
        title="src/app/api/keystatic/[...params]/route.ts"
        code={`import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../../keystatic.config';

export const { POST, GET } = makeRouteHandler({
  config,
});`}
      />

      <p>启动开发服务器：</p>

      <CodeBlock lang="bash" code={'npm run dev'} />

      <p>
        访问 <code>http://127.0.0.1:3000/admin</code> 即可看到 Keystatic 管理界面运行起来。
      </p>

      <h2 id="creating-a-new-post">创建第一篇文章</h2>
      <p>
        由于配置中把 <code>posts</code> 的 <code>path</code> 设为{' '}
        <code>src/content/posts/*</code>，在管理界面新建文章并保存后，
        文件会出现在 <code>src/content/posts</code> 目录下：
      </p>

      <CodeBlock
        lang="bash"
        title="目录结构"
        code={`src
└── content
    └── posts
        └── my-first-post.mdoc`}
      />

      <h2 id="displaying-a-collection-list">展示集合列表</h2>
      <p>
        Keystatic 提供了 <Link to="/docs/reader-api">Reader API</Link>{' '}
        把内容带到前端 —— 它是 Node.js API，必须在服务端运行（例如 Server Components 中）：
      </p>

      <CodeBlock
        lang="ts"
        title="src/app/posts/page.tsx"
        code={`import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../../keystatic.config';

import Link from 'next/link';

// 1. 创建 reader
const reader = createReader(process.cwd(), keystaticConfig);

export default async function Page() {
  // 2. 读取 "posts" 集合
  const posts = await reader.collections.posts.all();
  return (
    <ul>
      {posts.map(post => (
        <li key={post.slug}>
          <Link href={\`/posts/\${post.slug}\`}>{post.entry.title}</Link>
        </li>
      ))}
    </ul>
  );
}`}
      />

      <h2 id="displaying-a-single-entry">展示单篇内容</h2>
      <p>使用 Markdoc 的 transform 与 renderers.react 渲染单篇文章：</p>

      <CodeBlock
        lang="ts"
        title="src/app/posts/[slug]/page.tsx"
        code={`import { createReader } from "@keystatic/core/reader";
import React from "react";
import Markdoc from "@markdoc/markdoc";

import keystaticConfig from "../../../../keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await reader.collections.posts.read(slug);
  if (!post) {
    return <div>No Post Found</div>;
  }
  const { node } = await post.content();
  const errors = Markdoc.validate(node);
  if (errors.length) {
    console.error(errors);
    throw new Error('Invalid content');
  }
  const renderable = Markdoc.transform(node);
  return (
    <>
      <h1>{post.title}</h1>
      {Markdoc.renderers.react(renderable, React)}
      <hr />
      <a href="/posts">Back to Posts</a>
    </>
  );
}`}
      />

      <h2 id="deploying">部署 Keystatic + Next.js</h2>
      <p>
        Keystatic 依赖服务端代码与 Next.js API 路由，请确保你的托管平台支持 Node.js。
        上线后若想直接在部署实例上管理内容，需要把 Keystatic 连接到 GitHub ——
        参见官方文档{' '}
        <a href="https://keystatic.com/docs/github-mode" target="_blank" rel="noreferrer">
          Connect to GitHub ↗
        </a>
        。
      </p>
    </DocShell>
  )
}
