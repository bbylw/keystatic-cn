export interface DocMeta {
  slug: string
  cn: string
  en: string
}

export interface DocGroup {
  title: string
  items: DocMeta[]
}

const fields: DocMeta[] = [
  { slug: 'fields/array', cn: '数组 Array', en: 'Array' },
  { slug: 'fields/blocks', cn: '块 Blocks', en: 'Blocks' },
  { slug: 'fields/checkbox', cn: '复选框 Checkbox', en: 'Checkbox' },
  { slug: 'fields/child', cn: '子项 Child', en: 'Child' },
  { slug: 'fields/cloud-image', cn: '云图 Cloud Image', en: 'Cloud Image' },
  { slug: 'fields/conditional', cn: '条件 Conditional', en: 'Conditional' },
  { slug: 'fields/date', cn: '日期 Date', en: 'Date' },
  { slug: 'fields/datetime', cn: '日期时间 Datetime', en: 'Datetime' },
  { slug: 'fields/document', cn: '文档 Document（已弃用）', en: 'Document (Deprecated)' },
  { slug: 'fields/empty', cn: '占位 Empty', en: 'Empty' },
  { slug: 'fields/empty-content', cn: '空内容 Empty Content', en: 'Empty Content' },
  { slug: 'fields/empty-document', cn: '空文档 Empty Document（已弃用）', en: 'Empty Document (Deprecated)' },
  { slug: 'fields/file', cn: '文件 File', en: 'File' },
  { slug: 'fields/image', cn: '图片 Image', en: 'Image' },
  { slug: 'fields/integer', cn: '整数 Integer', en: 'Integer' },
  { slug: 'fields/markdoc', cn: 'Markdoc', en: 'Markdoc' },
  { slug: 'fields/mdx', cn: 'MDX', en: 'MDX' },
  { slug: 'fields/multiselect', cn: '多选 Multiselect', en: 'Multiselect' },
  { slug: 'fields/number', cn: '数字 Number', en: 'Number' },
  { slug: 'fields/object', cn: '对象 Object', en: 'Object' },
  { slug: 'fields/path-reference', cn: '路径引用 Path Reference', en: 'Path Reference' },
  { slug: 'fields/relationship', cn: '关联 Relationship', en: 'Relationship' },
  { slug: 'fields/select', cn: '选择 Select', en: 'Select' },
  { slug: 'fields/slug', cn: 'Slug', en: 'Slug' },
  { slug: 'fields/text', cn: '文本 Text', en: 'Text' },
  { slug: 'fields/url', cn: 'URL', en: 'URL' },
  { slug: 'fields/ignored', cn: '忽略 Ignored', en: 'Ignored' },
]

/** 文档侧边栏结构（顺序即阅读顺序，也用于上一篇/下一篇） */
export const docGroups: DocGroup[] = [
  {
    title: '入门',
    items: [
      { slug: 'introduction', cn: '介绍', en: 'Introduction' },
      { slug: 'quick-start', cn: '快速开始', en: 'Quick start' },
      { slug: 'cloud', cn: 'Keystatic Cloud', en: 'Keystatic Cloud' },
    ],
  },
  {
    title: '安装指南',
    items: [
      { slug: 'installation-astro', cn: 'Astro 集成', en: 'Astro' },
      { slug: 'installation-next-js', cn: 'Next.js 集成', en: 'Next.js' },
      { slug: 'installation-remix', cn: 'Remix 集成', en: 'Remix' },
    ],
  },
  {
    title: '核心概念',
    items: [
      { slug: 'content-organisation', cn: '内容组织', en: 'Content organisation' },
      { slug: 'path-wildcard', cn: '路径通配', en: 'Path wildcard' },
      { slug: 'local-mode', cn: '本地模式', en: 'Local mode' },
      { slug: 'github-mode', cn: 'GitHub 模式', en: 'GitHub mode' },
      { slug: 'reader-api', cn: 'Reader API', en: 'Reader API' },
      { slug: 'format-options', cn: '格式选项', en: 'Format options' },
      { slug: 'entry-layout', cn: '编辑页布局', en: 'Entry layout' },
      { slug: 'user-interface', cn: '界面定制', en: 'User interface' },
      { slug: 'content-components', cn: '内容组件', en: 'Content components' },
    ],
  },
  {
    title: '参考',
    items: [
      { slug: 'configuration', cn: '配置', en: 'Configuration' },
      { slug: 'collections', cn: '集合', en: 'Collections' },
      { slug: 'singletons', cn: '单例', en: 'Singletons' },
    ],
  },
  {
    title: '字段 API',
    items: fields,
  },
]

/** 扁平化后的文档列表 */
export const docOrder: DocMeta[] = docGroups.flatMap((g) => g.items)

export function getDocNeighbours(slug: string): { prev?: DocMeta; next?: DocMeta } {
  const index = docOrder.findIndex((d) => d.slug === slug)
  if (index === -1) return {}
  return {
    prev: index > 0 ? docOrder[index - 1] : undefined,
    next: index < docOrder.length - 1 ? docOrder[index + 1] : undefined,
  }
}
