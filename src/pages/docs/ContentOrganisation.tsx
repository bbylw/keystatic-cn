import DocShell from './DocShell'
import CodeBlock from '../../components/CodeBlock'

export default function ContentOrganisation() {
  return (
    <DocShell
      slug="content-organisation"
      group="核心概念"
      title="内容组织"
      en="Content organisation"
      lead="Keystatic 用两个概念来组织数据：collection（集合）和 singleton（单例）。它们在 Keystatic 配置文件中声明，让你精确控制内容存放在哪里。"
    >
      <h2 id="path">Path 配置</h2>
      <p>
        通过 <code>collection</code> 或 <code>singleton</code> 顶层的 <code>path</code> 属性，
        可以决定 Keystatic 把集合条目与单例数据存放在哪里：
      </p>

      <CodeBlock
        lang="ts"
        code={`// keystatic.config.ts
export default config({
  collections: {
    posts: collection({
      label: 'Posts',
      path: 'content/posts/*/',
      // ...
    })
  },
  singletons: {
    settings: singleton({
      label: 'Settings',
      path: 'content/posts/',
      // ...
    })
  }
})`}
      />

      <p>
        路径末尾可选的斜杠 <code>/</code> 会影响最终生成的内容结构 —— 下面分别介绍
        collection 与 singleton 的不同行为。
      </p>

      <div className="callout">
        <span className="co-icon" aria-hidden="true">
          !
        </span>
        <span>
          <code>collection</code> 的 <code>path</code> 必须包含一个 <code>*</code> 通配符，
          Keystatic 会用它替换为条目的 slug。详见
          <a href="#/docs/path-wildcard">路径通配</a>。
        </span>
      </div>

      <h2 id="collections">集合 Collections</h2>
      <p>
        如果没有显式指定 <code>path</code>，集合的默认 <code>path</code> 为{' '}
        <code>{'{collection-name}/*/'}</code>。
      </p>

      <h3>带末尾斜杠的 collection 路径</h3>
      <p>如果路径以 <code>/</code> 结尾，每条条目都会存放在以其 slug 命名的子目录里：</p>

      <CodeBlock
        lang="bash"
        title="目录结构"
        code={`collection-name
└── slug
    ├── index.yaml
    └── other.mdoc`}
      />

      <p>
        例如把 <code>posts</code> 集合的 <code>path</code> 设为 <code>'content/posts/*/'</code>，
        新建两条条目后：
      </p>

      <CodeBlock
        lang="bash"
        title="目录结构"
        code={`content
└── posts
    ├── my-first-post
    │   ├── index.yaml
    │   └── other.mdoc
    └── my-second-post
        ├── index.yaml
        └── other.mdoc`}
      />

      <h3>不带末尾斜杠的 collection 路径</h3>
      <p>如果路径不以 <code>/</code> 结尾，条目的 index 文件会直接放在集合目录里：</p>

      <CodeBlock
        lang="bash"
        title="目录结构"
        code={`collection-name
├── slug.yaml
└── slug
    └── other.mdoc`}
      />

      <CodeBlock
        lang="bash"
        title="目录结构"
        code={`content
└── posts
    ├── my-first-post.yaml
    ├── my-first-post
    │   └── other.mdoc
    ├── my-second-post.yaml
    └── my-second-post
        └── other.mdoc`}
      />

      <h2 id="singletons">单例 Singletons</h2>
      <p>
        单例的 <code>path</code> 不包含 <code>*</code> 通配符。默认 <code>path</code> 为{' '}
        <code>{'{singleton-name}/'}</code>。
      </p>

      <h3>带末尾斜杠的 singleton 路径</h3>
      <p>
        如果路径以 <code>/</code> 结尾，单例的内容会保存在<strong>以单例名命名的目录</strong>中：
      </p>

      <CodeBlock
        lang="bash"
        title="目录结构"
        code={`singleton-name
├── index.yaml
└── other.mdoc`}
      />

      <h3>不带末尾斜杠的 singleton 路径</h3>
      <p>如果路径不以 <code>/</code> 结尾，内容会保存在<strong>以单例名命名的文件</strong>里。</p>

      <CodeBlock
        lang="bash"
        title="目录结构"
        code={`singleton-name.yaml
singleton-name
└── other.mdoc`}
      />

      <h2 id="images">图片输出路径</h2>
      <p>
        可以独立于 collection / singleton 的 <code>path</code> 配置，单独指定图片的存放位置 —
        这在你希望把图片放到 <code>public</code> 或 <code>assets</code> 这类特定目录以满足框架约定时非常有用：
      </p>

      <CodeBlock
        lang="ts"
        code={`// 在 posts 集合中...
coverImage: fields.image({
  label: "封面图",
  directory: "public/images/posts",
}),`}
      />

      <p>
        无论 <code>posts</code> 的条目存放在哪里，<code>coverImage</code> 都会生成到{' '}
        <code>public/images/posts/{'{post-slug}'}</code>。
      </p>

      <h2 id="path-prefix">路径前缀 Path prefix</h2>
      <p>
        如果你在 monorepo 中工作，可以用 <code>storage.pathPrefix</code> 把 Keystatic 的范围限定到某个目录，
        而不必在每个 <code>path</code> 里都写前缀：
      </p>

      <CodeBlock
        lang="ts"
        code={`export default config({
  storage: {
    kind: 'github',
    repo: 'my-org/my-repo',
    pathPrefix: 'somewhere/my-site'
  },
  collections: {
    posts: collection({
      label: 'Posts',
      path: 'content/posts/*/',
      // ...
    })
  },
})`}
      />

      <p>
        上面这份配置会在 <code>somewhere/my-site/content/posts</code> 下寻找文章。
      </p>
    </DocShell>
  )
}
