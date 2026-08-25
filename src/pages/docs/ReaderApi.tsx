import DocShell from './DocShell'
import CodeBlock from '../../components/CodeBlock'

export default function ReaderApi() {
  return (
    <DocShell
      slug="reader-api"
      group="核心概念"
      title="Reader API"
      en="Reader API"
      lead="Reader API 是一组 Node.js API，让你从任意存储中读取 Keystatic 内容——可以是本地目录，也可以是 GitHub 仓库，而且不必与 Keystatic 配置中的存储保持一致。"
    >
      <div className="callout warn">
        <span className="co-icon" aria-hidden="true">
          !
        </span>
        <span>Reader API 的代码应运行在服务端，而不是浏览器里。请务必按此约定使用。</span>
      </div>

      <h2 id="usage">基本用法</h2>

      <h3>读取本地目录</h3>
      <p>
        导入 <code>createReader</code> 函数与你的 Keystatic 配置文件：
      </p>

      <CodeBlock
        lang="ts"
        code={`import { createReader } from '@keystatic/core/reader';
import keystaticConfig from 'relative/path/to/your/keystatic.config';`}
      />

      <p>
        调用 <code>createReader</code> 并传入两个参数来创建 reader：
      </p>
      <ol>
        <li>内容仓库根目录的路径；</li>
        <li>Keystatic 配置。</li>
      </ol>

      <CodeBlock lang="ts" code={`const reader = createReader(process.cwd(), keystaticConfig);`} />

      <h3 id="github">读取 GitHub 仓库</h3>
      <p>
        从 GitHub 读取时，改用 <code>createGitHubReader</code>：
      </p>

      <CodeBlock
        lang="ts"
        code={`import { createGitHubReader } from '@keystatic/core/reader/github';
import keystaticConfig from 'relative/path/to/your/keystatic.config';

const reader = createGitHubReader(keystaticConfig, {
    repo: 'Thinkmill/keystatic-data',
    token: process.env.GITHUB_PAT,
});`}
      />

      <div className="callout">
        <span className="co-icon" aria-hidden="true">
          i
        </span>
        <span>
          这里的 <code>token</code> 是具备仓库读取权限的 Personal Access Token，
          与 GitHub App 的 Client ID / Secret 不同。
        </span>
      </div>

      <h2 id="collections">读取集合</h2>
      <p>获取某个集合全部条目的 slug 数组：</p>

      <CodeBlock
        lang="ts"
        code={`const slugs = await reader.collections.posts.list();
// → ['my-first-post', 'hello-world']`}
      />

      <p>读取指定条目的数据：</p>

      <CodeBlock
        lang="ts"
        code={`const post = await reader.collections.posts.read(slug);`}
      />

      <p>一次拿到 slug 与数据的组合数组：</p>

      <CodeBlock
        lang="ts"
        code={`const posts = await reader.collections.blog.all();`}
      />

      <h2 id="singletons">读取单例</h2>

      <CodeBlock
        lang="ts"
        code={`const navigation = await reader.singletons.navigation.read();`}
      />

      <h2 id="linked-files">document 字段的数据</h2>
      <p>
        如果集合或单例包含 document 字段（如 <code>fields.markdoc</code> 或{' '}
        <code>fields.mdx</code>），该字段会返回一个异步函数，需要调用它才能取得内容：
      </p>

      <CodeBlock
        lang="ts"
        code={`// posts 集合有一个名为 content 的 document 字段
const post = await reader.collections.posts.read(slug);

// 获取内容数据
const content = await post.content();`}
      />

      <p>如果希望读取条目时就直接解析这些字段，可以传入选项：</p>

      <CodeBlock
        lang="ts"
        code={`await reader.collections.posts.read(slug, { resolveLinkedFiles: true });`}
      />

      <h2 id="typescript">配合 TypeScript</h2>
      <p>
        Reader API 导出了 <code>Entry</code> 类型，适合为 UI 组件声明 props：
      </p>

      <CodeBlock
        lang="ts"
        code={`import { Entry } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';

type MovieProps = Entry<typeof keystaticConfig['collections']['movies']>

export function Movie(props: MovieProps) {
  // ...
}`}
      />

      <h2 id="rendering">渲染 document 字段</h2>
      <p>
        document 字段返回结构化的 JSON 数据，手动转成 HTML 会相当繁琐。
        Keystatic 为此提供了高度可定制的 <code>DocumentRenderer</code>{' '}
        组件，替你完成全部渲染工作。
      </p>

      <div className="callout">
        <span className="co-icon" aria-hidden="true">
          i
        </span>
        <span>
          Reader API 的最佳落点：Next.js（Pages Router）的 <code>getStaticProps</code>、
          Astro 文件的 frontmatter、Remix 的 <code>loader()</code>，以及 React Server Components。
        </span>
      </div>
    </DocShell>
  )
}
