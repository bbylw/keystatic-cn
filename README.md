# Keystatic 中文站

[Keystatic](https://github.com/thinkmill/keystatic) 的非官方中文介绍网站 ——
让代码库中的 Markdown、JSON 与 YAML 内容人人可编辑的 Git 优先 CMS。

内容参考并翻译自 [Keystatic 官方文档](https://keystatic.com/docs/introduction)，
版权归 Thinkmill 所有；本站点代码以学习交流为目的。

## 技术栈（均为当前最新发行版）

| 依赖 | 版本 |
| --- | --- |
| [Bun](https://bun.sh) | 1.4 |
| [Vite](https://vite.dev) | 8.2 |
| [React](https://react.dev) | 19.2 |
| react-router-dom | 7.18 |
| TypeScript（原生编译器） | 7.0 |

## 快速开始

```bash
# 安装依赖
bun install

# 启动开发服务器（http://127.0.0.1:5173）
bun run dev

# 生产构建（含 tsc 类型检查）
bun run build

# 本地预览生产构建（http://127.0.0.1:4173）
bun run preview
```

## 站点结构

```
src/
├── main.tsx               # 入口：BrowserRouter + 全局样式
├── App.tsx                # 路由表
├── styles/global.css      # 设计系统（色板 / 字体 / 组件 / 动效）
├── content/docs.ts        # 文档侧边栏与上一篇/下一篇数据
├── components/
│   ├── Header.tsx         # 吸顶导航
│   ├── Footer.tsx         # 页脚
│   ├── CodeBlock.tsx      # 轻量语法高亮 + 一键复制
│   ├── TerminalDemo.tsx   # CLI 打字动画
│   ├── AdminMock.tsx      # 管理界面模型
│   ├── CliPill.tsx        # 命令复制条
│   ├── Reveal.tsx         # 进入视口淡入
│   └── Logo.tsx           # 品牌标记
└── pages/
    ├── Home.tsx           # 首页
    ├── NotFound.tsx       # 404
    └── docs/
        ├── DocsLayout.tsx # 文档布局（侧边栏）
        ├── DocShell.tsx   # 文档页外壳（面包屑 + 翻页）
        ├── DocsOverview.tsx   # 文档总览
        ├── Introduction.tsx   # 介绍
        ├── QuickStart.tsx     # 快速开始
        ├── InstallAstro.tsx   # Astro 集成指南
        ├── InstallNextJs.tsx  # Next.js 集成指南
        ├── Collections.tsx    # 集合
        ├── Singletons.tsx     # 单例
        └── ReaderApi.tsx      # Reader API
```

## 设计说明

- **方向**：温纸墨色（editorial-industrial）—— 纸 `#faf9f5`、墨 `#141413`、橙 `#d97757`，
  呼应 Keystatic / Thinkmill 的品牌气质。
- **字体**：拉丁字符使用 Space Grotesk（可变字重，本地打包），中文回退到系统字体栈。
- **动效**：仅 transform/opacity 的 GPU 友好动画；全部包裹 `prefers-reduced-motion` 检查。
- **无障碍**：语义化标签、可见焦点、装饰性元素 `aria-hidden`。
