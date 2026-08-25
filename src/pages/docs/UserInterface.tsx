import DocShell from './DocShell'
import CodeBlock from '../../components/CodeBlock'

export default function UserInterface() {
  return (
    <DocShell
      slug="user-interface"
      group="核心概念"
      title="界面定制"
      en="User interface"
      lead="对管理界面做一些定制可以让内容创作者更快上手、感觉更熟悉。"
    >
      <h2 id="example">示例</h2>
      <p>
        默认情况下，Keystatic 会根据 storage 模式为品牌名称选择合适的默认值。可以通过{' '}
        <code>ui</code> 下的 <code>brand</code> 对象覆盖它：
      </p>

      <CodeBlock
        lang="ts"
        code={`// keystatic.config.ts
import { config } from '@keystatic/core'

export default config({
  // ...
  ui: {
    brand: { name: 'Your brand' },
  },
})`}
      />

      <h2 id="brand">品牌 Brand</h2>
      <p>
        上面的 <code>name</code> 会被作为管理界面的应用标题。还可以通过 <code>mark</code>{' '}
        传入一个 React 组件，用来渲染自己的 logo 或任何喜欢的元素。建议最大高度不超过{' '}
        <code>24px</code>，以与其他 UI 元素协调。
      </p>
      <p>
        该组件只有一个 <code>colorScheme</code> 属性，值为 <code>light</code> 或{' '}
        <code>dark</code>，可以基于此渲染不同资源或样式：
      </p>

      <CodeBlock
        lang="ts"
        code={`// keystatic.config.tsx
import { config } from '@keystatic/core'

export default config({
  // ...
  ui: {
    brand: {
      name: 'Your brand',
      mark: ({ colorScheme }) => {
        const path = colorScheme === 'dark'
          ? '//your-brand.com/path/to/dark-logo.png'
          : '//your-brand.com/path/to/light-logo.png';

        return <img src={path} height={24} />
      },
    },
  },
})`}
      />

      <p>
        使用内联 SVG 时，可以把 <code>fill</code> 和 <code>stroke</code> 设为{' '}
        <code>currentColor</code>，从而继承前景色。
      </p>

      <h2 id="navigation">导航 Navigation</h2>
      <p>
        默认情况下，Keystatic 会把导航分成「集合」和「单例」两组。可以通过 <code>ui</code>{' '}
        下的 <code>navigation</code> 字段覆盖，把内容排成一个简单列表或任意数量的组：
      </p>

      <CodeBlock
        lang="ts"
        code={`// keystatic.config.ts
import { config } from '@keystatic/core'

export default config({
  // ...
  ui: {
    navigation: {
      'Content': ['pages', 'posts'],
      'Settings': ['site', 'seo'],
    },
  },
})`}
      />

      <p>用 <code>---</code> 这个特殊 key 在列表中插入分隔线：</p>

      <CodeBlock
        lang="ts"
        code={`// keystatic.config.ts
import { config } from '@keystatic/core'

export default config({
  // ...
  ui: {
    navigation: [
      'pages',
      'posts',
      '---',
      'site',
      'seo',
    ],
  },
})`}
      />

      <p>「Dashboard」始终位于导航列表的第一位。</p>

      <div className="callout">
        <span className="co-icon" aria-hidden="true">
          i
        </span>
        <span>
          <code>UserInterface</code> 类型签名：
          <a href="https://docsmill.dev/npm/@keystatic/core@latest#/.UserInterface" target="_blank" rel="noreferrer">
            docsmill ↗
          </a>
        </span>
      </div>
    </DocShell>
  )
}
