/** 首页 Hero 右侧的 Keystatic 管理界面模型（纯展示） */
export default function AdminMock() {
  return (
    <div className="hero-visual">
      <div className="admin-mock" role="img" aria-label="Keystatic 管理界面模型：正在编辑一篇文章">
        <div className="admin-titlebar">
          <i />
          <i />
          <i />
          <span>你的项目 /admin — Keystatic</span>
        </div>

        <div className="admin-body">
          <aside className="admin-side">
            <span className="side-label">集合</span>
            <a className="on" href="#/" onClick={(e) => e.preventDefault()}>
              <i />
              文章 Posts
            </a>
            <a href="#/" onClick={(e) => e.preventDefault()}>
              <i />
              页面 Pages
            </a>
            <a href="#/" onClick={(e) => e.preventDefault()}>
              <i />
              评价 Testimonials
            </a>
            <span className="side-label">单例</span>
            <a href="#/" onClick={(e) => e.preventDefault()}>
              <i />
              站点设置
            </a>
            <a href="#/" onClick={(e) => e.preventDefault()}>
              <i />
              导航菜单
            </a>
          </aside>

          <div className="admin-main">
            <div className="field">
              <label>标题</label>
              <div className="input focus-ring">
                我的第一篇文章
                <span className="caret-blink" />
              </div>
            </div>

            <div className="field">
              <label>内容（Markdoc）</label>
              <div className="input">
                大家好，这是通过 Keystatic 可视化编辑器写下的第一段内容…
              </div>
            </div>

            <div className="field">
              <label>封面图</label>
              <div className="input">cover.png · 已上传</div>
            </div>

            <button type="button" className="admin-save" tabIndex={-1}>
              <i />
              保存到 Git
            </button>
          </div>
        </div>
      </div>

      <div className="hero-badge-float">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 6L9 17l-5-5" />
        </svg>
        已写入 src/content/posts/first-post.mdoc
      </div>
    </div>
  )
}
