import DocShell from './DocShell'
import CodeBlock from '../../components/CodeBlock'

export default function Configuration() {
  return (
    <DocShell
      slug="configuration"
      group="参考"
      title="配置"
      en="Configuration"
      lead="每个 Keystatic 项目都需要导出一个 config。可以从 @keystatic/core 包导入 config 函数："
    >
      <CodeBlock
        lang="ts"
        code={`// keystatic.config.ts
import { config } from '@keystatic/core'

export default config({
  // ...
})`}
      />

      <h2 id="example">示例</h2>
      <p>
        下面这份配置会创建一个 <code>posts</code> 集合，保存在本地 <code>src/content/posts</code>{' '}
        目录下。每篇文章包含一个标题字段与一个所见即所得的正文字段。
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

      <h2 id="options">选项</h2>

      <table className="option-table">
        <thead>
          <tr>
            <th>选项</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>branchPrefix</code>
            </td>
            <td>
              限定 Keystatic 交互的 GitHub 分支范围（用于 <code>github</code> 或{' '}
              <code>cloud</code> 存储模式）。
              <CodeBlock lang="ts" code={`storage: {
  kind: 'github',
  repo: 'Thinkmill/keystatic',
  branchPrefix: 'my-prefix/'
}`} />
              管理界面里只会列出以此前缀开头的分支，新建分支也会强制加此前缀。
            </td>
          </tr>
          <tr>
            <td>
              <code>cloud</code>
            </td>
            <td>
              当 <code>storage.kind</code> 为 <code>cloud</code> 时，用于配置{' '}
              <a href="#/docs/cloud">Keystatic Cloud</a> 项目。
            </td>
          </tr>
          <tr>
            <td>
              <code>collections</code>
            </td>
            <td>
              定义可重复的内容结构，比如博客文章、客户评价。详见
              <a href="#/docs/collections">集合</a>。
            </td>
          </tr>
          <tr>
            <td>
              <code>locale</code>
            </td>
            <td>定义项目的语言环境（locale）。</td>
          </tr>
          <tr>
            <td>
              <code>singletons</code>
            </td>
            <td>
              定义一次性内容结构，比如站点设置或联系页。详见
              <a href="#/docs/singletons">单例</a>。
            </td>
          </tr>
          <tr>
            <td>
              <code>storage</code>
            </td>
            <td>
              必填。定义 Keystatic 的存储策略，<code>kind</code> 可以是：
              <ul style={{ marginTop: 8 }}>
                <li>
                  <a href="#/docs/local-mode">local</a>：直接读写本地文件系统；
                </li>
                <li>
                  <a href="#/docs/github-mode">github</a>：读写一个 GitHub 仓库；
                </li>
                <li>
                  <a href="#/docs/cloud">cloud</a>：借助
                  <a href="https://keystatic.cloud/" target="_blank" rel="noreferrer">
                    Keystatic Cloud ↗
                  </a>
                  的鉴权与图床。
                </li>
              </ul>
              <CodeBlock lang="ts" code={`export default config({
  storage: { kind: 'local' }
})`} />
            </td>
          </tr>
          <tr>
            <td>
              <code>ui</code>
            </td>
            <td>
              对 Keystatic 管理界面的部分内容进行定制。详见
              <a href="#/docs/user-interface">界面定制</a>。
            </td>
          </tr>
        </tbody>
      </table>

      <div className="callout">
        <span className="co-icon" aria-hidden="true">
          i
        </span>
        <span>
          <code>config</code> 类型最新签名：
          <a href="https://docsmill.dev/npm/@keystatic/core@latest#/.config" target="_blank" rel="noreferrer">
            docsmill ↗
          </a>
        </span>
      </div>
    </DocShell>
  )
}
