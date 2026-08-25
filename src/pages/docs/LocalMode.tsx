import DocShell from './DocShell'
import CodeBlock from '../../components/CodeBlock'

export default function LocalMode() {
  return (
    <DocShell
      slug="local-mode"
      group="核心概念"
      title="本地模式"
      en="Local mode"
      lead="大多数项目都从 Keystatic 的 local 存储模式起步：内容直接保存在本地文件系统中。"
    >
      <CodeBlock
        lang="ts"
        code={`// keystatic.config.ts
export default config({
   storage: {
      kind: 'local'
   }
})`}
      />

      <p>
        这种方式让项目初期的开发体验最简单 —— 改动就是本地的文件，你可以用熟悉的 Git
        工作流把内容提交、推送、评审。
      </p>

      <div className="callout">
        <span className="co-icon" aria-hidden="true">
          i
        </span>
        <span>
          通过 <a href="#/docs/quick-start">Keystatic CLI</a> 创建的新项目默认就是 local 模式。
        </span>
      </div>

      <h2 id="github-collaboration">与 GitHub 协作</h2>
      <p>
        Keystatic 还提供 <a href="#/docs/github-mode">GitHub 模式</a>，
        在那种模式下可以解锁更丰富的团队协作能力。
      </p>
    </DocShell>
  )
}
