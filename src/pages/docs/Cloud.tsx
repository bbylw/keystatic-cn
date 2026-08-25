import DocShell from './DocShell'
import CodeBlock from '../../components/CodeBlock'

export default function Cloud() {
  return (
    <DocShell
      slug="cloud"
      group="入门"
      title="Keystatic Cloud"
      en="Keystatic Cloud"
      lead="Keystatic Cloud 简化了与 GitHub 的认证流程 —— 无需再手动管理环境变量和 GitHub App。"
    >
      <p>
        Keystatic Cloud 还提供可选的增值能力，例如
        <a href="#/docs/cloud#cloud-images">Cloud Images</a>（图片存储、优化与分发服务）和多人协同编辑。
      </p>

      <h2 id="authentication">认证 Authentication</h2>
      <p>
        Keystatic Cloud 让你能为一个或多个项目连接到 GitHub 并完成认证。
        它跳过了较繁琐的
        <a href="#/docs/github-mode">GitHub 模式</a>
        配置，同时允许团队成员在没有 GitHub 账号的情况下编辑内容。
      </p>

      <h2 id="teams-and-projects">团队与项目</h2>
      <p>
        Keystatic Cloud 把项目按团队组织。一个团队可以拥有多个项目，
        每个项目连接到具体的 GitHub 仓库。访问权限在团队层面控制 ——
        团队中的所有成员都能访问该团队下的所有项目。
      </p>

      <h2 id="free-vs-pro">免费版与 Pro 版</h2>
      <p>
        <a href="https://keystatic.cloud/" target="_blank" rel="noreferrer">创建 Keystatic Cloud 账号 ↗</a>{' '}
        是免费的，可以按需创建任意数量的团队和项目。免费版每个团队最多支持 3 名用户。
        如果需要更多用户，可以在对应团队的「Billing」标签页升级为 Pro。
      </p>
      <p>
        Keystatic Cloud Pro 起步价 $10/月，超过 3 名用户后按 $5/月·人计费。
        Pro 计划只影响启用它的那个团队。
      </p>

      <h2 id="pro-features">Pro 版特性</h2>
      <ul>
        <li>
          <strong>多人协同编辑</strong>（实验中）：实时与其他人共同编辑同一份文档；
        </li>
        <li>
          <strong>Cloud Images</strong>：上传、转换与分发优化后的图片，
          而不把这些图片塞进 GitHub 仓库。
        </li>
      </ul>
      <p>订阅 Pro 之后，可以在对应团队的设置页里启用以上特性。</p>

      <h2 id="cloud-images">Cloud Images</h2>
      <p>
        Cloud Images 是一项可选的图床与分发服务，会为你的图片做 Web 端优化。
        每个 Keystatic Cloud 项目都有自己的 Image Library，可以在里面上传图片并复制 URL 引用到内容里。
      </p>

      <h3>通过 URL 参数优化图片</h3>
      <p>在 Cloud Images 的 URL 上追加以下可选查询参数，可以显著提升图片性能：</p>
      <ul>
        <li>
          <code>fit</code>：缩放策略，<code>scale-down</code> / <code>contain</code> /{' '}
          <code>cover</code> / <code>crop</code>。
        </li>
        <li>
          <code>format</code>（<code>f</code>）：图片格式，<code>png</code> / <code>avif</code> /{' '}
          <code>webp</code> / <code>jpeg</code>。未指定时 Keystatic Cloud 会自动检测浏览器能力并返回最优格式。
        </li>
        <li>
          <code>quality</code>（<code>q</code>）：1 – 100 之间的质量。
        </li>
        <li>
          <code>height</code>（<code>h</code>）：1 – 10240 的高度。
        </li>
        <li>
          <code>width</code>（<code>w</code>）：1 – 10240 的宽度。
        </li>
      </ul>

      <CodeBlock
        lang="bash"
        code={`https://[IMAGE_URL]?width=240&height=480&fit=crop`}
      />

      <h3>Cloud image 字段</h3>
      <p>
        Keystatic 提供一个
        <a href="#/docs/fields/cloud-image">cloudImage 字段</a>，
        配合 Keystatic Cloud 的 Image Library 使用时可以替代普通的 image 字段。
      </p>

      <h2 id="configure">在项目里启用 Keystatic Cloud</h2>
      <p>
        把 <code>storage</code> 设为 <code>cloud</code>，并通过 <code>cloud.project</code>{' '}
        指定 Keystatic Cloud 上的团队与项目名：
      </p>

      <CodeBlock
        lang="ts"
        code={`import { config } from '@keystatic/core'

export default config({
  storage: {
    kind: 'cloud',
  },
  cloud: {
    project: '[TEAM_NAME]/[PROJECT_NAME]',
  },
  // ...
})`}
      />

      <p>
        每个 Keystatic Cloud 项目的设置页都提供一段可以直接复制粘贴到 config 文件里的代码片段。
      </p>
    </DocShell>
  )
}
