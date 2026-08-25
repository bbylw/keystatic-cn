import { Link } from 'react-router-dom'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="brand">
              <Logo size={28} />
              <span>
                Keystatic<span className="brand-cn"> 中文站</span>
              </span>
            </Link>
            <p>
              让 Markdown、JSON 与 YAML 内容在你的代码库里可被所有人编辑。
              Git 优先、无数据库、全链路 TypeScript。
            </p>
          </div>

          <div className="footer-col">
            <h4>文档</h4>
            <ul>
              <li>
                <Link to="/docs/introduction">介绍</Link>
              </li>
              <li>
                <Link to="/docs/quick-start">快速开始</Link>
              </li>
              <li>
                <Link to="/docs/collections">集合 Collections</Link>
              </li>
              <li>
                <Link to="/docs/singletons">单例 Singletons</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>安装指南</h4>
            <ul>
              <li>
                <Link to="/docs/installation-astro">Astro 集成</Link>
              </li>
              <li>
                <Link to="/docs/installation-next-js">Next.js 集成</Link>
              </li>
              <li>
                <Link to="/docs/reader-api">Reader API</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>相关链接</h4>
            <ul>
              <li>
                <a href="https://github.com/thinkmill/keystatic" target="_blank" rel="noreferrer">
                  GitHub 仓库 ↗
                </a>
              </li>
              <li>
                <a href="https://keystatic.com/docs" target="_blank" rel="noreferrer">
                  官方英文文档 ↗
                </a>
              </li>
              <li>
                <a href="https://keystatic.cloud/" target="_blank" rel="noreferrer">
                  Keystatic Cloud ↗
                </a>
              </li>
              <li>
                <a href="https://www.thinkmill.com.au/" target="_blank" rel="noreferrer">
                  Thinkmill ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-base">
          <span>Keystatic 中文站 · 非官方社区翻译项目 · 原项目版权归 Thinkmill 所有</span>
          <span>Built with React 19 · Vite 8 · Bun 1.4</span>
        </div>
      </div>
    </footer>
  )
}
