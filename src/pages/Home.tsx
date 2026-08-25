import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import AdminMock from '../components/AdminMock'
import TerminalDemo from '../components/TerminalDemo'
import CliPill from '../components/CliPill'

const CONFIG_SNIPPET = `// keystatic.config.ts
import { config, collection, fields } from '@keystatic/core';

export default config({
  storage: { kind: 'local' },
  collections: {
    posts: collection({
      label: '文章',
      slugField: 'title',
      schema: {
        title: fields.slug({ name: { label: '标题' } }),
        content: fields.markdoc({ label: '内容' }),
      },
    }),
  },
});`

function Arrow() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

export default function Home() {
  return (
    <>
      {/* ============ Hero ============ */}
      <section className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />

        <div className="container hero-grid">
          <div>
            <p className="hero-eyebrow">开源 · Git 优先的内容管理</p>
            <h1>
              让代码库里的内容，
              <br />
              <span className="accent-word">人人可编辑</span>
            </h1>

            <p className="hero-sub">
              Keystatic 是 Thinkmill 出品的开源 CMS：把代码库中的 Markdown、JSON 与 YAML
              变成可视化编辑的内容。改动直接落在本地文件系统或 GitHub
              仓库里，不打乱你现有的代码与工作流。
            </p>

            <div className="hero-cta">
              <Link to="/docs/quick-start" className="btn btn-primary">
                阅读快速开始
                <Arrow />
              </Link>
              <CliPill />
            </div>

            <div className="hero-meta">
              <span className="chip">
                <i />
                TypeScript API
              </span>
              <span className="chip">
                <i />
                无需数据库
              </span>
              <span className="chip">
                <i />
                Git 双向同步
              </span>
              <span className="chip">
                <i />
                Markdoc & MDX
              </span>
            </div>
          </div>

          <AdminMock />
        </div>
      </section>

      {/* ============ 双向编辑 ============ */}
      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <Reveal>
            <div className="section-head">
              <p className="kicker">
                TWO-WAY EDITING · <b>双向编辑</b>
              </p>
              <h2>
                改配置，或者动鼠标
                <br />
                —— 两条路都通
              </h2>
              <p>
                同一份内容，两个入口：开发者继续在熟悉的代码编辑器里工作；
                内容创作者在 Keystatic 管理界面里点选、拖拽、写作。
                双方改动的都是同一批文件。
              </p>
            </div>
          </Reveal>

          <div className="duo">
            <Reveal delay={60}>
              <article className="duo-card">
                <span className="tagline">FOR DEVELOPERS</span>
                <div className="duo-inner">
                  <h3>在代码编辑器里</h3>
                  <p>用一个 TypeScript 配置文件声明集合与字段，Keystatic 据此生成管理界面和存储格式。</p>
                </div>
                <div className="code-window">
                  <div className="cw-bar" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </div>
                  <pre>
                    <code>{CONFIG_SNIPPET}</code>
                  </pre>
                </div>
              </article>
            </Reveal>

            <Reveal delay={140}>
              <article className="duo-card">
                <span className="tagline">FOR EDITORS</span>
                <div className="duo-inner">
                  <h3>在管理界面里</h3>
                  <p>非技术同事通过表单和富文本编辑器创作内容，保存后自动写回仓库中的 Markdown 文件。</p>
                </div>
                <div className="editor-window">
                  <div className="editor-toolbar" aria-hidden="true">
                    <span>B</span>
                    <span>I</span>
                    <span>H2</span>
                    <span>❝</span>
                    <span>⌘K</span>
                  </div>
                  <div className="editor-block">
                    <span className="eb-label">标题</span>
                    我的第一篇文章
                  </div>
                  <div className="editor-block">
                    <span className="eb-label">内容</span>
                    大家好，这是在 Keystatic 里写下的第一段内容 **欢迎** 来玩。
                  </div>
                  <div className="editor-block">
                    <span className="eb-label">封面图</span>
                    cover.png · 已上传至 public/images
                  </div>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ 特性 Bento ============ */}
      <section className="section" style={{ paddingTop: 30 }}>
        <div className="container">
          <Reveal>
            <div className="section-head">
              <p className="kicker">
                FEATURES · <b>核心特性</b>
              </p>
              <h2>
                为「内容住在代码库里」
                <br />
                的团队而生
              </h2>
            </div>
          </Reveal>

          <div className="bento">
            <Reveal className="bento-card-wrapper span-7" delay={40}>
              <article className="bento-card span-7 tone-orange">
                <div className="bento-icon" aria-hidden="true">
                  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <path d="m7 10 5 5 5-5" />
                    <path d="M12 15V3" />
                  </svg>
                </div>
                <h3>双向编辑，轻松自如</h3>
                <p>
                  在 Admin UI 中保存的内容会变成仓库里的文件；反过来，你在编辑器里的手动修改也会出现在
                  Admin UI 中。内容与代码同仓同源，随分支演进。
                </p>
                <div className="tree bento-art" aria-hidden="true">
                  <span className="dir">posts/</span>
                  {'\n'}├─ my-first-post/
                  {'\n'}│{'  '}├─ index.yaml{'        '}
                  <span className="file-note">← 条目元数据</span>
                  {'\n'}│{'  '}└─ content.mdoc{'       '}
                  <span className="hl">← 管理界面保存后自动生成</span>
                  {'\n'}└─ hello-world/
                  {'\n'}{'   '}└─ index.yaml
                </div>
              </article>
            </Reveal>

            <Reveal className="bento-card-wrapper span-5" delay={110}>
              <article className="bento-card span-5 tone-green">
                <div className="bento-icon" aria-hidden="true">
                  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="3" />
                    <path d="M8 8.5c1-.9 2.4-.6 2.8.3.4 1-.3 1.8-1.4 2.7-1 .8-1.4 1.5-1.4 2.5" />
                    <path d="M12 17h4" />
                  </svg>
                </div>
                <h3>一流的 CMS 体验</h3>
                <p>
                  为内容创作者打造的表单、富文本（Markdoc / MDX）编辑器、图片上传与实时预览，
                  而不只是「能用的表单生成器」。
                </p>
                <div className="editor-window" style={{ marginInline: 0, borderRadius: 12 }}>
                  <div className="editor-block" style={{ marginTop: 0 }}>
                    <span className="eb-label">标题</span>
                    我的第一篇文章
                  </div>
                  <div className="editor-block">
                    <span className="eb-label">作者</span>
                    小凯 · 发布于 2026-02-14
                  </div>
                </div>
              </article>
            </Reveal>

            <Reveal className="bento-card-wrapper span-4" delay={40}>
              <article className="bento-card span-4">
                <div className="bento-icon" aria-hidden="true">
                  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
                    <ellipse cx="12" cy="5" rx="8" ry="3" />
                    <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
                    <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
                  </svg>
                </div>
                <h3>无需数据库</h3>
                <p>Git 就是数据库：没有服务器要运维，没有数据要迁移，clone 仓库即拥有全部内容。</p>
              </article>
            </Reveal>

            <Reveal className="bento-card-wrapper span-4" delay={100}>
              <article className="bento-card span-4 tone-blue">
                <div className="bento-icon" aria-hidden="true">
                  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m16 18 6-6-6-6" />
                    <path d="m8 6-6 6 6 6" />
                  </svg>
                </div>
                <h3>全链路 TypeScript</h3>
                <p>配置即类型：从字段定义到 Reader API 读取结果，全程类型安全，重构有底气。</p>
                <div className="bento-art">
                  <span className="tok-k">const</span> slugs ={' '}
                  <span className="tok-k">await</span> reader.
                  <span className="tok-f">collections.posts.list()</span>
                </div>
              </article>
            </Reveal>

            <Reveal className="bento-card-wrapper span-4" delay={160}>
              <article className="bento-card span-4 tone-orange">
                <div className="bento-icon" aria-hidden="true">
                  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6" />
                    <path d="m9 13 2 2 4-4" />
                  </svg>
                </div>
                <h3>Markdoc 与 MDX</h3>
                <p>长文内容支持 Markdoc 或 MDX 格式存储，组件化的写作体验与现有生态完全兼容。</p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ 三步上手 ============ */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <p className="kicker">
                WORKFLOW · <b>工作流</b>
              </p>
              <h2>从定义结构到发布内容，只需三步</h2>
            </div>
          </Reveal>

          <div className="steps">
            <Reveal delay={0}>
              <div className="step">
                <span className="step-no">STEP 01</span>
                <h3>定义内容结构</h3>
                <p>
                  用 TypeScript 声明集合、单例与字段。Keystatic 会据此生成管理界面，
                  并约定内容在仓库中的存放格式与路径。
                </p>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <div className="step">
                <span className="step-no">STEP 02</span>
                <h3>在 Admin UI 中创作</h3>
                <p>
                  启动开发服务器并访问 /admin，内容团队通过表单与可视化编辑器写作，
                  完全不需要接触代码或命令行。
                </p>
              </div>
            </Reveal>
            <Reveal delay={180}>
              <div className="step">
                <span className="step-no">STEP 03</span>
                <h3>内容回归代码库</h3>
                <p>
                  每次保存都是一次对 Markdown / YAML / JSON 文件的写入：
                  可以提交、评审、回滚，也可以推送到 GitHub 远程编辑。
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ 终端演示 ============ */}
      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container split-two">
          <Reveal>
            <div>
              <p className="kicker">
                CLI · <b>秒级起步</b>
              </p>
              <h2 style={{ fontSize: 'clamp(26px, 3vw, 36px)', letterSpacing: '-0.03em' }}>
                一条命令，创建集成 Keystatic 的项目
              </h2>
              <p style={{ color: 'var(--mid)', marginTop: 16, lineHeight: 1.9 }}>
                Keystatic CLI 会帮你初始化一个 Next.js 或 Astro 项目，装好依赖、写好配置，
                并内置一个可以直接打开的管理界面。
              </p>
              <div className="hero-cta" style={{ marginTop: 26 }}>
                <Link to="/docs/quick-start" className="btn btn-accent btn-sm">
                  查看快速开始指南
                  <Arrow />
                </Link>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <TerminalDemo />
          </Reveal>
        </div>
      </section>

      {/* ============ 框架支持 ============ */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <p className="kicker">
                FRAMEWORKS · <b>框架集成</b>
              </p>
              <h2>与主流框架无缝协作</h2>
              <p>官方提供 Next.js、Astro 与 Remix 集成指南；已有项目只需安装两个包即可接入。</p>
            </div>
          </Reveal>

          <div className="frameworks">
            <Reveal delay={0}>
              <Link to="/docs/installation-next-js" className="frame-card">
                <span className="go-arrow">
                  <Arrow />
                </span>
                <span className="fw-logo">N</span>
                <h3>Next.js</h3>
                <p>App Router 一等公民支持：管理界面作为路由注入，API 路由处理保存与鉴权。</p>
                <code>bun add @keystatic/core @keystatic/next</code>
              </Link>
            </Reveal>
            <Reveal delay={90}>
              <Link to="/docs/installation-astro" className="frame-card">
                <span className="go-arrow">
                  <Arrow />
                </span>
                <span className="fw-logo">A</span>
                <h3>Astro</h3>
                <p>内容站首选：以官方集成的方式接入，配合 Content Collections 渲染 Markdoc 内容。</p>
                <code>bun add @keystatic/core @keystatic/astro</code>
              </Link>
            </Reveal>
            <Reveal delay={180}>
              <a
                href="https://keystatic.com/docs/installation-remix"
                target="_blank"
                rel="noreferrer"
                className="frame-card"
              >
                <span className="go-arrow">
                  <Arrow />
                </span>
                <span className="fw-logo">R</span>
                <h3>Remix</h3>
                <p>官方指南同样覆盖 Remix 项目，loader 与 action 即是内容的出入口。</p>
                <code>npx create @keystatic@latest</code>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ 文档精选 ============ */}
      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <Reveal>
            <div className="section-head">
              <p className="kicker">
                DOCS · <b>文档精选</b>
              </p>
              <h2>从这里开始阅读文档</h2>
            </div>
          </Reveal>

          <div className="learn-grid">
            <Reveal delay={0}>
              <Link to="/docs/introduction" className="learn-card">
                <span className="lc-index">01 / INTRODUCTION</span>
                <h3>介绍</h3>
                <p>了解 Keystatic 的定位：既适合从零开始的新项目，也适合为现有代码库引入内容管理。</p>
                <span className="lc-link">阅读介绍
                  <Arrow />
                </span>
              </Link>
            </Reveal>
            <Reveal delay={70}>
              <Link to="/docs/collections" className="learn-card">
                <span className="lc-index">02 / COLLECTIONS</span>
                <h3>集合 Collections</h3>
                <p>把博客文章、菜谱、客户评价定义为可复用的内容集合，每个条目共享同一套字段结构。</p>
                <span className="lc-link">了解集合
                  <Arrow />
                </span>
              </Link>
            </Reveal>
            <Reveal delay={140}>
              <Link to="/docs/singletons" className="learn-card">
                <span className="lc-index">03 / SINGLETONS</span>
                <h3>单例 Singletons</h3>
                <p>站点设置、首页文案这类「全局唯一」的内容，用单例来建模再合适不过。</p>
                <span className="lc-link">了解单例
                  <Arrow />
                </span>
              </Link>
            </Reveal>
            <Reveal delay={210}>
              <Link to="/docs/reader-api" className="learn-card">
                <span className="lc-index">04 / READER API</span>
                <h3>Reader API</h3>
                <p>用类型安全的读取接口，把本地目录或 GitHub 仓库中的内容渲染到你的前端页面。</p>
                <span className="lc-link">阅读 Reader API
                  <Arrow />
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <Reveal>
            <div className="cta-band">
              <h2>准备好让内容回归代码库了吗？</h2>
              <p>
                五分钟内为你的项目接入 Keystatic：先在本地体验，需要时再连接 GitHub
                与团队协作。所有内容始终留在你自己的仓库里。
              </p>
              <div className="hero-cta">
                <Link to="/docs/quick-start" className="btn btn-primary">
                  开始快速开始
                  <Arrow />
                </Link>
                <CliPill />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
