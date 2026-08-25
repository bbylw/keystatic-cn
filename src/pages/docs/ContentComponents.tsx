import DocShell from './DocShell'
import CodeBlock from '../../components/CodeBlock'

export default function ContentComponents() {
  return (
    <DocShell
      slug="content-components"
      group="核心概念"
      title="内容组件"
      en="Content components"
      lead="内容组件是一类新一代的富文本积木，可以配合 Markdoc 与 MDX 字段使用。"
    >
      <p>
        通过给 Markdoc 或 MDX 字段传入 <code>components</code> 对象即可定义内容组件：
      </p>

      <CodeBlock
        lang="ts"
        code={`// 在 collection / singleton 内...
schema: {
  // ...
  richText: fields.mdx({
    label: 'Rich text',
    components: {
      // 在这里声明内容组件
    }
  })
}`}
      />

      <p>一共有 <strong>5</strong> 种内容组件类型，详见下节。</p>

      <h2 id="wrapper">Wrapper（包裹型）</h2>
      <p>
        <code>wrapper</code> 组件有开始和结束标签，<code>children</code> 内容被包裹在中间。
        children 可以是自由富文本，也可以是其他内容组件的组合。
      </p>

      <h3>示例：客户评价 Testimonial</h3>

      <CodeBlock
        lang="ts"
        code={`import { wrapper } from '@keystatic/core/content-components'

Testimonial: wrapper({
  label: 'Testimonial',
  schema: {
    author: fields.text({ label: 'Author' }),
    role: fields.text({ label: 'Role' }),
  }
})`}
      />

      <p>使用效果（MDX 输出）：</p>

      <CodeBlock
        lang="bash"
        code={`<Testimonial author="Jina Dawkins" role="Head of Product Design">

  I've been very impressed with the work done by the team in such a short period
  of time. I'm really proud of everyone's effort and dedication!

</Testimonial>`}
      />

      <h2 id="block">Block（自闭合型）</h2>
      <p>
        <code>block</code> 组件是自闭合标签，因此没有 <code>children</code>。
      </p>

      <CodeBlock
        lang="ts"
        code={`import { block } from '@keystatic/core/content-components'

Playlist: block({
  label: 'Playlist',
  schema: {
    id: fields.text({ label: 'Playlist ID' }),
  }
})`}
      />

      <p>MDX 输出：</p>

      <CodeBlock lang="bash" code={`<Playlist id="5f8a3b3e3f3e4d001f3e4d00" />`} />

      <h2 id="inline">Inline（行内型）</h2>
      <p>
        <code>inline</code> 组件与 <code>block</code> 类似，但可以放在段落或行内文本里。
      </p>

      <CodeBlock
        lang="ts"
        code={`import { inline } from '@keystatic/core/content-components'

StatusBadge: inline({
  label: 'StatusBadge',
  schema: {
    status: fields.select({
      label: 'Status',
      options: [
        { label: 'To do', value: 'todo' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Ready for review', value: 'ready-for-review' },
        { label: 'Done', value: 'done' },
      ],
      defaultValue: 'todo'
    }),
  }
})`}
      />

      <p>MDX 输出：</p>

      <CodeBlock
        lang="bash"
        code={`This task is currently <StatusBadge status="in-progress" /> but has no blocker on the rest of the team.`}
      />

      <h2 id="mark">Mark（高亮型）</h2>
      <p>
        <code>mark</code> 组件可以对一段文本进行高亮处理。
        在富文本编辑器中选中文字并应用 <code>mark</code> 即可，就像加粗、斜体一样。
      </p>

      <CodeBlock
        lang="ts"
        code={`import { mark } from '@keystatic/core/content-components'

Highlight: mark({
  label: 'Highlight',
  schema: {
    variant: fields.select({
      label: 'Variant',
      options: [
        { label: 'Fluro', value: 'fluro' },
        { label: 'Minimal', value: 'minimal' },
        { label: 'Brutalist', value: 'brutalist' },
      ],
      defaultValue: 'fluro'
    }),
  }
})`}
      />

      <p>被选中的文字会被包裹为：</p>

      <CodeBlock
        lang="bash"
        code={`This is a <Highlight variant="fluro">highlighted</Highlight> word.`}
      />

      <h2 id="repeating">Repeating（重复型）</h2>
      <p>
        <code>repeating</code> 组件用于表达「零到多个」由显式指定组件组成的列表，
        常用于实现父 / 子组件组合模式 —— 子组件负责自己的数据与 props：
      </p>

      <CodeBlock
        lang="bash"
        code={`<Parent>
  <Child title="Repeating" data={} />
  <Child title="List" data={} />
  <Child title="Of" data={} />
  <Child title="Things" data={} />
</Parent>`}
      />

      <p><code>repeating</code> 接受一个 <code>children</code> 数组来指定允许插入的组件：</p>

      <CodeBlock
        lang="ts"
        code={`import { repeating } from '@keystatic/core/content-components'

TestimonialGrid: repeating({
  label: 'Testimonial Grid',
  // 只允许插入 Testimonial 组件
  children: ['Testimonial'],
  schema: {
    columns: fields.integer({
      label: 'Columns',
      validation: { min: 1, max: 6 }
    })
  }
}),
Testimonial: wrapper({
  label: 'Testimonial',
  schema: {
    author: fields.text({ label: 'Author' }),
    role: fields.text({ label: 'Role' }),
  }
})`}
      />

      <p>MDX 输出：</p>

      <CodeBlock
        lang="bash"
        code={`<TestimonialGrid columns={2}>
  <Testimonial author="Jina Dawkins" role="Head of Product Design">

    I've been very impressed with the work done by the team in such a short
    period of time. I'm really proud of everyone's effort and dedication!

  </Testimonial>
  <Testimonial author="Leesa Edwards" role="CMO">

    The team makes my job easy. I'm just here to amplify the amazing work
    everyone here is doing!

  </Testimonial>
</TestimonialGrid>`}
      />

      <div className="callout">
        <span className="co-icon" aria-hidden="true">
          i
        </span>
        <span>
          <code>content-components</code> 类型签名：
          <a href="https://docsmill.dev/npm/@keystatic/core@latest#/content-components" target="_blank" rel="noreferrer">
            docsmill ↗
          </a>
        </span>
      </div>
    </DocShell>
  )
}
