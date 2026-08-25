import DocShell from './DocShell'
import CodeBlock from '../../components/CodeBlock'

export default function Collections() {
  return (
    <DocShell
      slug="collections"
      group="核心概念"
      title="集合"
      en="Collections"
      lead="凡是想要「多个实例」的内容，都可以建模为一个 collection：一系列博客文章、烹饪菜谱，或者来自满意客户的评价，都是典型的集合。"
    >
      <h2 id="example">示例</h2>
      <p>
        集合定义在 Keystatic <code>config</code> 的 <code>collections</code> 键下。
        每个集合拥有自己的键名，并使用 <code>collection()</code> 函数包裹配置。
      </p>
      <p>
        下面定义了一个 <code>testimonials</code>（客户评价）集合，每个条目包含{' '}
        <code>author</code> 与 <code>quote</code> 两个字段：
      </p>

      <CodeBlock
        lang="ts"
        code={`// keystatic.config.ts
import { config, collection, fields } from '@keystatic/core';

export default config({
  // ...
  collections: {
    testimonials: collection({
      label: '客户评价',
      slugField: 'author',
      schema: {
        author: fields.slug({ name: { label: '作者' } }),
        quote: fields.text({ label: '评价', multiline: true }),
      },
    }),
  },
});`}
      />

      <h2 id="options">选项</h2>
      <p>
        集合的完整选项如下。大多数情况下，你只会用到其中的 <code>label</code>、
        <code>slugField</code> 和 <code>schema</code>。
      </p>

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
            <td>集合的显示名称，会在管理界面中用作该集合的标签。</td>
          </tr>
          <tr>
            <td>
              <code>slugField</code>
            </td>
            <td>
              指定 schema 中的哪个字段作为条目的 slug。建议搭配{' '}
              <a href="https://keystatic.com/docs/fields/slug" target="_blank" rel="noreferrer">
                slug 字段 ↗
              </a>{' '}
              使用，让用户可以在管理界面中自定义或重新生成 slug。
            </td>
          </tr>
          <tr>
            <td>
              <code>schema</code>
            </td>
            <td>定义集合中每个条目应包含的字段。</td>
          </tr>
          <tr>
            <td>
              <code>columns</code>
            </td>
            <td>
              在集合列表视图中显示更多字段。默认只显示每条的 slug，
              传入字段键数组即可扩展，例如：
              <CodeBlock lang="ts" code="columns: ['title', 'publishedOn']" />
            </td>
          </tr>
          <tr>
            <td>
              <code>entryLayout</code>
            </td>
            <td>
              更改管理界面中集合条目的编辑布局。详见官方文档
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
              配置条目的数据格式（如 content 字段、YAML frontmatter 等）。详见官方文档
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
              指定该集合条目的存放位置：
              <CodeBlock lang="ts" code="path: 'custom/content/path/testimonials/*'" />
              默认情况下，Keystatic 会把条目存储在项目根目录下与集合键同名的文件夹里。
            </td>
          </tr>
          <tr>
            <td>
              <code>parseSlugForSort</code>
            </td>
            <td>一个函数，把每条的 slug 转换成用于列表视图排序的值。</td>
          </tr>
          <tr>
            <td>
              <code>previewURL</code>
            </td>
            <td>
              用于配置内容的实时预览（Real-time Previews）。详见官方文档
              {' '}
              <a href="https://keystatic.com/docs/recipes/real-time-previews" target="_blank" rel="noreferrer">
                Real-time Previews ↗
              </a>
              。
            </td>
          </tr>
          <tr>
            <td>
              <code>template</code>
            </td>
            <td>指向某个内容文件（现有条目或「模板」）的路径，作为新建条目的起点。</td>
          </tr>
        </tbody>
      </table>

      <div className="callout">
        <span className="co-icon" aria-hidden="true">
          i
        </span>
        <span>
          <code>Collection</code> 类型的最新签名可在 docsmill 上查看：
          <a
            href="https://docsmill.dev/npm/@keystatic/core@latest#/.Collection"
            target="_blank" rel="noreferrer"
          >
            @keystatic/core#/.Collection ↗
          </a>
        </span>
      </div>
    </DocShell>
  )
}
