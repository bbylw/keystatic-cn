import DocShell from './DocShell'
import CodeBlock from '../../components/CodeBlock'
import { Link } from 'react-router-dom'

export default function Introduction() {
  return (
    <DocShell
      slug="introduction"
      group="入门"
      title="介绍"
      en="Introduction"
      lead="无论你是要创建一个全新的站点，还是想为现有代码库引入内容管理，Keystatic 都能胜任。它可以把数据保存在本地，直接保存到 GitHub，或者两者兼顾。"
    >
      <h2 id="overview">概述</h2>
      <p>
        Keystatic 是一款<strong>Git 优先</strong>的内容管理工具：内容以 Markdown、JSON 或 YAML
        的形式存放在你自己的仓库里，同时通过一套友好的管理界面（Admin UI）进行编辑。
        它不依赖任何数据库，也不要求你改变现有的部署方式或开发流程。
      </p>

      <h2 id="quick-start">两种起步方式</h2>

      <h3>方式一 · 创建新项目</h3>
      <p>
        <strong>适合：</strong>
      </p>
      <ul>
        <li>第一次接触 Keystatic，想快速感受一下；</li>
        <li>从零开始一个全新项目；</li>
        <li>做一个快速原型。</li>
      </ul>
      <p>
        <strong>你会得到：</strong>
      </p>
      <ul>
        <li>一个本地运行的 Keystatic 项目（基于 Next.js 或 Astro）；</li>
        <li>所有改动都保存在你的本地文件系统中。</li>
      </ul>
      <p>
        跟随<Link to="/docs/quick-start">快速开始指南</Link>即可上手，最简单的方式是在终端运行：
      </p>

      <CodeBlock lang="bash" code={'npm create @keystatic@latest'} />

      <h3>方式二 · 接入现有项目</h3>
      <p>
        <strong>适合：</strong>让现有项目的内容变得可编辑！只需少量工作即可把 Keystatic 加入你的项目。
      </p>
      <p>
        <strong>你会得到：</strong>在现有项目中就绪的 Keystatic 内容管理能力。按框架选择集成指南：
      </p>
      <ul>
        <li>
          <Link to="/docs/installation-astro">Astro 集成指南</Link>
        </li>
        <li>
          <Link to="/docs/installation-next-js">Next.js 集成指南</Link>
        </li>
        <li>
          <a href="https://keystatic.com/docs/installation-remix" target="_blank" rel="noreferrer">
            Remix 集成指南 ↗
          </a>
        </li>
      </ul>

      <div className="callout">
        <span className="co-icon" aria-hidden="true">
          i
        </span>
        <span>
          官方还在持续为更多框架编写集成指南。如果你在用别的框架，
          可以关注 GitHub 仓库的动态，或在社区讨论中提出需求。
        </span>
      </div>

      <h2 id="next-steps">下一步</h2>
      <p>
        完成安装后，建议依次了解：
        <Link to="/docs/collections">集合（Collections）</Link>与
        <Link to="/docs/singletons">单例（Singletons）</Link>
        如何组织内容、<Link to="/docs/reader-api">Reader API</Link> 如何在前端读取内容，
        以及如何把存储模式从本地切换到{' '}
        <a href="https://keystatic.com/docs/github-mode" target="_blank" rel="noreferrer">
          GitHub 模式 ↗
        </a>
        。
      </p>
    </DocShell>
  )
}
