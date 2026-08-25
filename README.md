# Keystatic

> **Git 优先、基于文件的内容管理** —— 让你的代码库里的 Markdown、JSON、YAML 内容人人可编辑。

Keystatic 是 [Thinkmill](https://www.thinkmill.com.au/) 出品的开源内容管理系统（CMS）。它把内容当作代码库里的普通文件来管理，同时提供一套友好的可视化管理界面，让开发者、内容创作者和团队成员能各取所需。

---

## 为什么是 Keystatic？

传统 CMS 把内容锁在数据库里，要另外运维数据库、同步数据、做迁移。而 Keystatic 的不同之处在于：

- **Git 就是数据库** —— 内容以 Markdown / JSON / YAML 文件的形式，直接存放在你的仓库里。没有单独的内容数据库需要部署和维护。
- **内容与代码同仓同源** —— 文章、配置、文档跟着代码一起进行版本管理，可以走代码评审（PR）、回滚、分叉与协作。
- **双向编辑** —— 你既可以在 Keystatic 管理界面里可视化编辑，也可以在熟悉的代码编辑器里手写文件，两边的改动互相可见。
- **全链路 TypeScript** —— 从字段定义、管理界面到读取内容的 Reader API，全程类型安全。

## 核心特性

- 一流的 CMS 体验（富文本编辑、图片上传、实时预览）
- 基于 Markdown 与 YAML/JSON，无内容数据库
- TypeScript 优先的配置与 API
- 支持 **Markdoc** 与 **MDX**
- 本地存储或 **GitHub 模式**（直接写回 GitHub，可多人协作文档）

## 核心概念

| 概念 | 说明 |
| --- | --- |
| **Collection（集合）** | 需要多个实例的内容，例如博客文章、菜谱、客户评价。 |
| **Singleton（单例）** | 全局唯一的数据，例如站点设置、导航菜单、首页文案。 |
| **Fields（字段）** | 定义单个条目的数据结构，如文本、slug、日期、图片、富文本等。 |
| **Reader API** | 在服务端读取内容并渲染到前端，支持本地目录与 GitHub 仓库。 |

## 支持的框架

官方提供针对以下框架的集成指南，供你在现有项目中接入：

- [Next.js](https://keystatic.com/docs/installation-next-js)
- [Astro](https://keystatic.com/docs/installation-astro)
- [Remix](https://keystatic.com/docs/installation-remix)

## 快速开始

在终端运行 Keystatic CLI，它会创建已集成 Keystatic 的新项目：

```bash
npm create @keystatic@latest
```

使用 Bun：

```bash
bun create @keystatic@latest
```

已有项目？为你选择的框架安装对应包即可接入，例如：

```bash
# Astro
bun add @keystatic/core @keystatic/astro

# Next.js
bun add @keystatic/core @keystatic/next
```

## 学习资源

- 官方文档：<https://keystatic.com/docs/introduction>
- GitHub 仓库：<https://github.com/thinkmill/keystatic>
- Keystatic Cloud：<https://keystatic.cloud/>
