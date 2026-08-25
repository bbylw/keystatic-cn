import DocShell from './DocShell'
import CodeBlock from '../../components/CodeBlock'
import { Link } from 'react-router-dom'

export default function Singletons() {
  return (
    <DocShell
      slug="singletons"
      group="核心概念"
      title="单例"
      en="Singletons"
      lead="当你需要一份「独一无二」的数据时——比如「站点设置」页面，或是网站「首页」的一组特定字段——就应该使用 singleton。"
    >
      <h2 id="example">示例</h2>
      <p>下面定义了一个 <code>settings</code>（站点设置）单例：</p>

      <CodeBlock
        lang="ts"
        code={`// keystatic.config.ts
import { config, singleton, fields } from '@keystatic/core';

export default config({
  // ...
  singletons: {
    settings: singleton({
      label: '站点设置',
      schema: {
        siteName: fields.text({ label: '站点名称' }),
        icp: fields.text({ label: '备案号' }),
      },
    }),
  },
});`}
      />

      <p>
        与集合不同，单例在管理界面中只有一个条目：没有列表、没有新建按钮，
        打开即是编辑。非常适合导航菜单、页脚文案、SEO 默认配置这类全局内容。
      </p>

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
              <code>label</code>
            </td>
            <td>单例的显示名称，会在管理界面中使用。</td>
          </tr>
          <tr>
            <td>
              <code>schema</code>
            </td>
            <td>定义该单例应包含的字段。</td>
          </tr>
          <tr>
            <td>
              <code>entryLayout</code>
            </td>
            <td>
              更改管理界面中该单例的编辑布局。详见官方文档
              {' '}
              <a href="https://keystatic.com/docs/entry-layout" target="_blank" rel="noreferrer">
                Entry Layout ↗
              </a>
              。
            </td>
          </tr>
          <tr>
            <td>
              <code>format</code>
            </td>
            <td>
              配置单例的数据格式。详见官方文档
              {' '}
              <a href="https://keystatic.com/docs/format-options" target="_blank" rel="noreferrer">
                Format Options ↗
              </a>
              。
            </td>
          </tr>
          <tr>
            <td>
              <code>path</code>
            </td>
            <td>
              指定单例数据的存放位置：
              <CodeBlock lang="ts" code="path: 'custom/content/path/settings'" />
              更多说明见官方文档 Content Organisation 页面。
            </td>
          </tr>
          <tr>
            <td>
              <code>previewURL</code>
            </td>
            <td>
              用于配置内容的实时预览。详见官方文档
              {' '}
              <a href="https://keystatic.com/docs/recipes/real-time-previews" target="_blank" rel="noreferrer">
                Real-time Previews ↗
              </a>
              。
            </td>
          </tr>
        </tbody>
      </table>

      <div className="callout">
        <span className="co-icon" aria-hidden="true">
          i
        </span>
        <span>
          <code>Singleton</code> 类型的最新签名可在 docsmill 上查看：
          <a
            href="https://docsmill.dev/npm/@keystatic/core@latest#/.Singleton"
            target="_blank"
            rel="noreferrer"
          >
            @keystatic/core#/.Singleton ↗
          </a>
        </span>
      </div>

      <h2 id="read">在前端读取单例</h2>
      <p>
        使用 <Link to="/docs/reader-api">Reader API</Link> 读取单例数据只需一行：
      </p>

      <CodeBlock
        lang="ts"
        code={`const navigation = await reader.singletons.navigation.read();`}
      />
    </DocShell>
  )
}
