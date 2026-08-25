export interface DocMeta {
  slug: string
  cn: string
  en: string
}

export interface DocGroup {
  title: string
  items: DocMeta[]
}

/** 文档侧边栏结构（顺序即阅读顺序，也用于上一篇/下一篇） */
export const docGroups: DocGroup[] = [
  {
    title: '入门',
    items: [
      { slug: 'introduction', cn: '介绍', en: 'Introduction' },
      { slug: 'quick-start', cn: '快速开始', en: 'Quick start' },
    ],
  },
  {
    title: '安装指南',
    items: [
      { slug: 'installation-astro', cn: 'Astro 集成', en: 'Astro' },
      { slug: 'installation-next-js', cn: 'Next.js 集成', en: 'Next.js' },
    ],
  },
  {
    title: '核心概念',
    items: [
      { slug: 'collections', cn: '集合', en: 'Collections' },
      { slug: 'singletons', cn: '单例', en: 'Singletons' },
      { slug: 'reader-api', cn: 'Reader API', en: 'Reader API' },
    ],
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
