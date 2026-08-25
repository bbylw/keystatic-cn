import { Link, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import DocsLayout from './pages/docs/DocsLayout'
import DocsOverview from './pages/docs/DocsOverview'
import Introduction from './pages/docs/Introduction'
import QuickStart from './pages/docs/QuickStart'
import Cloud from './pages/docs/Cloud'
import InstallAstro from './pages/docs/InstallAstro'
import InstallNextJs from './pages/docs/InstallNextJs'
import InstallRemix from './pages/docs/InstallRemix'
import ContentOrganisation from './pages/docs/ContentOrganisation'
import PathWildcard from './pages/docs/PathWildcard'
import LocalMode from './pages/docs/LocalMode'
import GitHubMode from './pages/docs/GitHubMode'
import FormatOptions from './pages/docs/FormatOptions'
import EntryLayout from './pages/docs/EntryLayout'
import UserInterface from './pages/docs/UserInterface'
import ContentComponents from './pages/docs/ContentComponents'
import Configuration from './pages/docs/Configuration'
import Collections from './pages/docs/Collections'
import Singletons from './pages/docs/Singletons'
import ReaderApi from './pages/docs/ReaderApi'
import FieldPage from './pages/docs/FieldPage'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<DocsLayout />}>
            <Route index element={<DocsOverview />} />

            {/* 入门 */}
            <Route path="introduction" element={<Introduction />} />
            <Route path="quick-start" element={<QuickStart />} />
            <Route path="cloud" element={<Cloud />} />

            {/* 安装指南 */}
            <Route path="installation-astro" element={<InstallAstro />} />
            <Route path="installation-next-js" element={<InstallNextJs />} />
            <Route path="installation-remix" element={<InstallRemix />} />

            {/* 核心概念 */}
            <Route path="content-organisation" element={<ContentOrganisation />} />
            <Route path="path-wildcard" element={<PathWildcard />} />
            <Route path="local-mode" element={<LocalMode />} />
            <Route path="github-mode" element={<GitHubMode />} />
            <Route path="format-options" element={<FormatOptions />} />
            <Route path="entry-layout" element={<EntryLayout />} />
            <Route path="user-interface" element={<UserInterface />} />
            <Route path="content-components" element={<ContentComponents />} />
            <Route path="reader-api" element={<ReaderApi />} />

            {/* 参考 */}
            <Route path="configuration" element={<Configuration />} />
            <Route path="collections" element={<Collections />} />
            <Route path="singletons" element={<Singletons />} />

            {/* 字段 API（动态路由） */}
            <Route path="fields/:name" element={<FieldPage />} />

            <Route
              path="*"
              element={
                <div className="notfound">
                  <div className="code-404">404</div>
                  <p>这篇文档不存在。</p>
                  <Link className="btn btn-ghost btn-sm" to="/docs">
                    返回文档总览
                  </Link>
                </div>
              }
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
