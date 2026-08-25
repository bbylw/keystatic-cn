import DocShell from './DocShell'
import CodeBlock from '../../components/CodeBlock'
import { Link } from 'react-router-dom'

export default function QuickStart() {
  return (
    <DocShell
      slug="quick-start"
      group="入门"
      title="快速开始"
      en="Quick start"
      lead="上手 Keystatic 最快的方式，就是在终端里运行 Keystatic CLI。它会创建一个已集成 Keystatic 的新项目（支持 Next.js、Astro 或 Remix）。"
    >
      <h2 id="keystatic-cli">Keystatic CLI</h2>
      <p>在终端中运行以下命令，CLI 会引导你完成全部设置：</p>

      <CodeBlock lang="bash" code={'npm create @keystatic@latest'} />

      <p>CLI 会依次询问：</p>
      <ol>
        <li>要使用的框架（Next.js / Astro / Remix）；</li>
        <li>项目名称与目录；</li>
        <li>随后自动安装依赖并生成初始的 <code>keystatic.config.ts</code> 配置。</li>
      </ol>

      <div className="callout">
        <span className="co-icon" aria-hidden="true">
          i
        </span>
        <span>
          使用 Bun？把命令换成 <code>bun create @keystatic@latest</code>，
          安装依赖时用 <code>bun install</code>、启动开发服务器用 <code>bun run dev</code> 即可。
        </span>
      </div>

      <h3>启动管理界面</h3>
      <p>
        项目创建完成后，进入项目目录并启动开发服务器：
      </p>

      <CodeBlock lang="bash" code={'cd my-keystatic-project\nnpm run dev'} />

      <p>
        打开浏览器访问 <code>/admin</code> 路径（例如 Next.js 项目是{' '}
        <code>http://localhost:3000/admin</code>），即可看到 Keystatic 管理界面。
        创建一篇文章并保存 —— 对应的 Markdown 文件会立刻出现在项目的文件树里。
      </p>

      <h2 id="bring-your-own-project">已有项目？</h2>
      <p>
        如果你已经有一个现成的项目，我们为{' '}
        <Link to="/docs/installation-astro">Astro</Link>、
        <Link to="/docs/installation-next-js">Next.js</Link> 和{' '}
        <a href="https://keystatic.com/docs/installation-remix" target="_blank" rel="noreferrer">
          Remix ↗
        </a>{' '}
        提供了集成指南，通常只需安装两个包、加两个路由文件和一个配置文件。
      </p>
    </DocShell>
  )
}
