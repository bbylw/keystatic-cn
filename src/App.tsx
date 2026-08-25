import { Link, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import DocsLayout from './pages/docs/DocsLayout'
import DocsOverview from './pages/docs/DocsOverview'
import Introduction from './pages/docs/Introduction'
import QuickStart from './pages/docs/QuickStart'
import InstallAstro from './pages/docs/InstallAstro'
import InstallNextJs from './pages/docs/InstallNextJs'
import Collections from './pages/docs/Collections'
import Singletons from './pages/docs/Singletons'
import ReaderApi from './pages/docs/ReaderApi'
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
            <Route path="introduction" element={<Introduction />} />
            <Route path="quick-start" element={<QuickStart />} />
            <Route path="installation-astro" element={<InstallAstro />} />
            <Route path="installation-next-js" element={<InstallNextJs />} />
            <Route path="collections" element={<Collections />} />
            <Route path="singletons" element={<Singletons />} />
            <Route path="reader-api" element={<ReaderApi />} />
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
