import DocShell from './DocShell'
import CodeBlock from '../../components/CodeBlock'

export default function GitHubMode() {
  return (
    <DocShell
      slug="github-mode"
      group="核心概念"
      title="GitHub 模式"
      en="GitHub mode"
      lead="Keystatic 的 github 模式可以解锁更强大的团队协作能力。使用前请先把项目放到一个 GitHub 仓库里，并给协作者 write 权限。"
    >
      <h2 id="setup">启用 GitHub 模式</h2>
      <p>把 <code>storage</code> 选项的 <code>kind</code> 改成 <code>github</code>：</p>

      <CodeBlock
        lang="ts"
        code={`storage: {
  kind: 'github',
  repo: {
    owner: REPO_OWNER,
    name: REPO_NAME
  }
}`}
      />

      <p>你也可以把 <code>repo</code> 直接写成一个 <code>owner/name</code> 字符串：</p>

      <CodeBlock
        lang="ts"
        code={`storage: {
   kind: 'github',
   repo: \`\${REPO_OWNER}/\${REPO_NAME}\`
}`}
      />

      <h2 id="connecting">连接 GitHub</h2>
      <p>
        启用 <code>github</code> 模式后访问 <code>/keystatic</code>，按提示用 GitHub 登录。
        第一次会引导你完成 GitHub App 的创建：
      </p>

      <ol>
        <li>为这个 App 命名（已知部署 URL 或仓库属于组织时，可一并填入）；</li>
        <li>让新创建的 App 对你的仓库具有写权限；</li>
        <li>完成后会回到运行在 <code>github</code> 模式下的 Keystatic 管理界面。</li>
      </ol>

      <p>
        当 Keystatic 跑在 GitHub 模式时，你会在管理界面里看到多出来的控件，例如分支下拉框。
      </p>

      <h2 id="env">新增的环境变量</h2>
      <p>完成后，项目下会生成一份 <code>.env</code> 文件，里面包含：</p>

      <CodeBlock
        lang="bash"
        title=".env"
        code={`# Keystatic
KEYSTATIC_GITHUB_CLIENT_ID=...
KEYSTATIC_GITHUB_CLIENT_SECRET=...
KEYSTATIC_SECRET=...
NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=... # Next.js
PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=...      # Astro`}
      />

      <p>
        这些变量用于基于 GitHub 仓库访问权限来认证用户。具备该仓库 write 权限的成员访问{' '}
        <code>/keystatic</code> 时即可登录使用。
      </p>

      <h2 id="branch-prefix">分支前缀</h2>
      <p>
        用 <code>branchPrefix</code> 把 Keystatic 限制在指定的分支前缀内：
      </p>

      <CodeBlock
        lang="ts"
        code={`storage: {
   kind: 'github',
   repo: 'Thinkmill/keystatic',
   branchPrefix: 'my-prefix/'
}`}
      />

      <p>
        管理界面里只会列出以 <code>my-prefix/</code> 开头的分支，新建分支时也会强制加上此前缀。
      </p>

      <h2 id="redirect">添加 redirect_uri</h2>
      <p>
        在 GitHub 上完成授权时，如果遇到「The <code>redirect_uri</code> is not associated with this
        application.」这类错误，需要回到 GitHub App 的设置中加上回调 URL：
      </p>
      <ol>
        <li>
          打开
          <a href="https://docs.github.com/en/apps/using-github-apps/reviewing-and-modifying-installed-github-apps" target="_blank" rel="noreferrer">
            「Installed GitHub Apps」列表 ↗
          </a>
          （用户：<code>https://github.com/settings/installations</code>，
          组织：<code>https://github.com/organizations/&lt;org&gt;/settings/installations</code>）；
        </li>
        <li>选择该 App →「App settings」；</li>
        <li>在「Add Callback URL」中加入部署站点对应的回调 URL，保存后重新尝试登录。</li>
      </ol>

      <h2 id="deploying">部署</h2>
      <div className="callout warn">
        <span className="co-icon" aria-hidden="true">
          !
        </span>
        <span>Keystatic 部署文档仍在编写中。简而言之：把上面这些环境变量复制到你的部署环境，并确保托管平台能运行 Node.js 来支撑 Keystatic 的 API 路由。</span>
      </div>
    </DocShell>
  )
}
