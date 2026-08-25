export interface FieldDoc {
  /** 路由名：与路径段一致 */
  name: string
  cn: string
  en: string
  deprecated?: boolean
  intro: string
  example: { lang: 'ts' | 'bash'; code: string }[]
  notes?: { kind: 'info' | 'warn'; text: string }[]
  signature: string
  /** 额外小节：标题 + 代码/正文节点 */
  extra?: { title: string; body: string }[]
}

const sig = (n: string) =>
  `https://docsmill.dev/npm/@keystatic/core@latest#/.fields.${n}`

export const fields: Record<string, FieldDoc> = {
  array: {
    name: 'array',
    cn: '数组 Array',
    en: 'Array',
    intro:
      'array 字段用于「再添加一个」的场景——需要某段字段 schema 出现一个或多个实例时使用。只能向 array 字段传入单个字段（这个字段可以是 object 字段来表达复杂结构）。',
    example: [
      {
        lang: 'ts',
        code: `tags: fields.array(
  fields.text({ label: 'Tag' }),
  // 标签选项
  {
    label: 'Tag',
    itemLabel: props => props.value
  }
)`,
      },
    ],
    notes: [
      {
        kind: 'info',
        text: '可以通过 slugField 选项把数组中元素的某个字段作为「路径中索引的替代」，类似 collection 的 slugField 行为，但仍会写入 YAML/JSON。',
      },
    ],
    signature: sig('array'),
  },

  blocks: {
    name: 'blocks',
    cn: '块 Blocks',
    en: 'Blocks',
    intro:
      'blocks 字段和 array 字段类似，都是「再添加一个」的场景，但可以为每条实例指定不同的字段 schema。',
    example: [
      {
        lang: 'ts',
        code: `links: fields.blocks(
  {
    // 第一种块：关联到某个 Page
    page: {
      label: 'Page',
      schema: fields.relationship({
        label: 'Page',
        collection: 'pages',
      }),
    },
    // 第二种块：一个 URL
    url: {
      label: 'URL',
      schema: fields.text({ label: 'URL' }),
    },
  },
  { label: 'Links' }
),`,
      },
    ],
    signature: sig('blocks'),
  },

  checkbox: {
    name: 'checkbox',
    cn: '复选框 Checkbox',
    en: 'Checkbox',
    intro: 'checkbox 字段用于存储布尔值。',
    example: [
      {
        lang: 'ts',
        code: `draft: fields.checkbox({ label: 'Draft', defaultValue: true })`,
      },
    ],
    signature: sig('checkbox'),
  },

  child: {
    name: 'child',
    cn: '子项 Child',
    en: 'Child',
    intro:
      'child 字段允许在 document 字段的 component block 预览里嵌入一块可编辑区域。',
    example: [
      {
        lang: 'ts',
        code: `document: fields.document({
  label: 'Document',
  formatting: true,
  links: true,
  componentBlocks: {
    quote: component({
      preview: () => null,
      label: 'Quote',
      schema: {
        content: fields.child({
          kind: 'block',
          placeholder: 'Quote...',
          formatting: { inlineMarks: 'inherit', softBreaks: 'inherit' },
          links: 'inherit',
        }),
        attribution: fields.child({ kind: 'inline', placeholder: 'Attribution...' }),
      },
    }),
  },
}),`,
      },
    ],
    notes: [
      {
        kind: 'info',
        text: '通过给 child 字段设置 componentBlocks: "inherit"，可以在 component block 里嵌套使用其他 component block。',
      },
    ],
    signature: sig('child'),
  },

  'cloud-image': {
    name: 'cloud-image',
    cn: '云图 Cloud Image',
    en: 'Cloud Image',
    intro:
      'cloudImage 字段是 image 字段的云端版本，配合 Keystatic Cloud 使用时由 Cloud Images 服务承载图片；需要把 storage 设为 cloud，并在项目设置里启用 Image Library。',
    example: [
      {
        lang: 'ts',
        code: `cover: fields.cloudImage({
  label: '封面',
}),`,
      },
    ],
    signature: sig('cloudImage'),
  },

  conditional: {
    name: 'conditional',
    cn: '条件 Conditional',
    en: 'Conditional',
    intro:
      'conditional 字段用于「根据某个条件显示完全不同的字段」的场景。第一个参数是用 checkbox 或 select 定义的条件；第二个参数是每个条件对应的字段 schema——key 为 true/false（checkbox）或每个 select 取值。',
    example: [
      {
        lang: 'ts',
        code: `seo: fields.conditional(
  fields.checkbox({ label: 'Define custom SEO tags', defaultValue: false }),
  {
    true: fields.object({
      title: fields.text({ label: 'Title' }),
      description: fields.text({ label: 'Description' }),
    }),
    false: fields.empty(),
  }
)`,
      },
    ],
    signature: sig('conditional'),
  },

  date: {
    name: 'date',
    cn: '日期 Date',
    en: 'Date',
    intro: 'date 字段用于存储日期（不含时间）。',
    example: [
      {
        lang: 'ts',
        code: `publishedOn: fields.date({ label: '发布日期' }),`,
      },
    ],
    signature: sig('date'),
  },

  datetime: {
    name: 'datetime',
    cn: '日期时间 Datetime',
    en: 'Datetime',
    intro: 'datetime 字段用于存储日期与时间。',
    example: [
      {
        lang: 'ts',
        code: `publishedAt: fields.datetime({ label: '发布时间' }),`,
      },
    ],
    signature: sig('datetime'),
  },

  document: {
    name: 'document',
    cn: '文档 Document',
    en: 'Document',
    deprecated: true,
    intro:
      'document 字段是 Keystatic 早期的富文本字段，内建 component block 等能力。已被新一代的 markdoc 字段取代，建议改用 markdoc 字段。',
    example: [
      {
        lang: 'ts',
        code: `body: fields.document({
  label: '正文',
  formatting: true,
  links: true,
}),`,
      },
    ],
    notes: [
      { kind: 'warn', text: '已弃用。推荐改用 fields.markdoc，功能与编辑体验更现代。' },
    ],
    signature: sig('document'),
  },

  empty: {
    name: 'empty',
    cn: '占位 Empty',
    en: 'Empty',
    intro: 'empty 字段不渲染任何 UI，只返回一个常量值。常用在 conditional 字段里表达「这个分支没有额外字段」。',
    example: [
      {
        lang: 'ts',
        code: `false: fields.empty(),`,
      },
    ],
    signature: sig('empty'),
  },

  'empty-content': {
    name: 'empty-content',
    cn: '空内容 Empty Content',
    en: 'Empty Content',
    intro: '在 document 字段的 component block 中使用，表示这个子区域刻意留空。',
    example: [
      {
        lang: 'ts',
        code: `schema: {
  gap: fields.emptyContent(),
},`,
      },
    ],
    signature: sig('emptyContent'),
  },

  'empty-document': {
    name: 'empty-document',
    cn: '空文档 Empty Document',
    en: 'Empty Document',
    deprecated: true,
    intro: '已弃用的占位字段。请改用 empty-content。',
    example: [
      { lang: 'ts', code: `body: fields.emptyDocument(),` },
    ],
    notes: [{ kind: 'warn', text: '已弃用，请改用 fields.emptyContent。' }],
    signature: sig('emptyDocument'),
  },

  file: {
    name: 'file',
    cn: '文件 File',
    en: 'File',
    intro:
      'file 字段用于存储任意文件。在管理界面渲染为文件选择器；在 local 模式下保存在仓库里，在 github 模式下会作为提交写回仓库。',
    example: [
      {
        lang: 'ts',
        code: `resume: fields.file({
  label: '简历',
  description: 'Summary of qualifications for this job applicant',
  directory: 'public/files/resumes',
  publicPath: '/files/resumes/',
})`,
      },
    ],
    notes: [
      {
        kind: 'info',
        text: '可以用 directory 指定仓库内的存放目录，用 publicPath 控制读取字段值时返回的访问路径。',
      },
    ],
    signature: sig('file'),
  },

  image: {
    name: 'image',
    cn: '图片 Image',
    en: 'Image',
    intro:
      'image 字段用于存储图片，在管理界面渲染为图片选择器。默认行为是创建与条目 slug 同名的目录并以字段名作为文件名存放。',
    example: [
      {
        lang: 'ts',
        code: `avatar: fields.image({
  label: '头像',
  directory: 'public/images/avatars',
  publicPath: '/images/avatars/',
})`,
      },
    ],
    notes: [
      {
        kind: 'info',
        text: 'directory 指定仓库内的存放目录，publicPath 控制读取字段值时返回的访问路径。',
      },
      {
        kind: 'info',
        text: '需要云端版本时可以使用 cloudImage 字段，对应 Keystatic Cloud。',
      },
    ],
    signature: sig('image'),
  },

  integer: {
    name: 'integer',
    cn: '整数 Integer',
    en: 'Integer',
    intro: 'integer 字段用于存储整数值。',
    example: [
      {
        lang: 'ts',
        code: `year: fields.integer({
  label: 'Year',
  validation: { min: 1900, max: 2100 },
}),`,
      },
    ],
    signature: sig('integer'),
  },

  markdoc: {
    name: 'markdoc',
    cn: 'Markdoc',
    en: 'Markdoc',
    intro:
      'markdoc 字段是 document 字段的下一代演化，使用了新的编辑器，外观与 document 类似但能力更强。Keystatic 负责存取内容，但渲染由你负责（可以借助社区工具或自行实现）。',
    example: [
      {
        lang: 'ts',
        code: `richText: fields.markdoc({
  label: 'Rich text',
  // 还可以传 components: { ... } 来自定义内容组件
})`,
      },
    ],
    notes: [
      {
        kind: 'info',
        text: '把 extension 设为 "md" 可以把 .mdoc 改为 .md。',
      },
      {
        kind: 'info',
        text: '通过 fields.markdoc.inline(...) 可以让内容与其他字段写在同一文件里。',
      },
      {
        kind: 'info',
        text: '完整编辑器配置见 MarkdocEditorOptions 类型签名。',
      },
    ],
    signature: sig('markdoc'),
  },

  mdx: {
    name: 'mdx',
    cn: 'MDX',
    en: 'MDX',
    intro:
      'mdx 字段以 MDX 格式读写内容。Keystatic 负责存取，渲染由你完成（可以使用社区工具或自行实现）。',
    example: [
      {
        lang: 'ts',
        code: `richText: fields.mdx({
  label: 'Rich text',
  // 还可以传 components: { ... } 来自定义内容组件
})`,
      },
    ],
    notes: [
      { kind: 'warn', text: 'MDX 中不能写 import 语句，需要由渲染组件注入；也不支持 HTML 标签，请用对应的 Markdown 语法替代。' },
      { kind: 'info', text: '通过 fields.mdx.inline(...) 可以让内容与其他字段写在同一文件里。' },
    ],
    signature: sig('mdx'),
  },

  multiselect: {
    name: 'multiselect',
    cn: '多选 Multiselect',
    en: 'Multiselect',
    intro: 'multiselect 字段允许从一组预定义选项中多选。',
    example: [
      {
        lang: 'ts',
        code: `tags: fields.multiselect({
  label: '标签',
  options: [
    { label: 'React', value: 'react' },
    { label: 'Astro', value: 'astro' },
    { label: 'Remix', value: 'remix' },
  ],
  defaultValue: [],
}),`,
      },
    ],
    signature: sig('multiselect'),
  },

  number: {
    name: 'number',
    cn: '数字 Number',
    en: 'Number',
    intro: 'number 字段用于存储数字（可含小数）。',
    example: [
      {
        lang: 'ts',
        code: `rating: fields.number({
  label: '评分',
  validation: { min: 0, max: 5 },
}),`,
      },
    ],
    signature: sig('number'),
  },

  object: {
    name: 'object',
    cn: '对象 Object',
    en: 'Object',
    intro:
      'object 字段用于把任意其他字段组合成一个对象结构。在 array、conditional 或 blocks 字段中需要给每个条目定义一套字段时尤其有用。',
    example: [
      {
        lang: 'ts',
        code: `address: fields.object({
  street: fields.text({ label: 'Street' }),
  city: fields.text({ label: 'City' }),
  postcode: fields.text({ label: 'Postcode' }),
  country: fields.text({ label: 'Country' }),
},
{
  label: 'Address',
  description: 'The address of the user',
  layout: [12, 6, 3, 3],
})`,
      },
    ],
    notes: [
      { kind: 'info', text: '可以通过 options.layout 数组为每个字段指定 12 栏栅格里占据的列数。' },
    ],
    signature: sig('object'),
  },

  'path-reference': {
    name: 'path-reference',
    cn: '路径引用 Path Reference',
    en: 'Path Reference',
    intro: 'path-reference 字段用于引用仓库里的某个路径。',
    example: [
      { lang: 'ts', code: `related: fields.pathReference({ label: 'Related' }),` },
    ],
    signature: sig('pathReference'),
  },

  relationship: {
    name: 'relationship',
    cn: '关联 Relationship',
    en: 'Relationship',
    intro:
      'relationship 字段是对某个集合条目 slug 的引用，在管理界面渲染为下拉选择器。collection 字符串必须与 collections 配置里的 key 一致。如需一对多关联，把它包在 array 字段中即可。',
    example: [
      {
        lang: 'ts',
        code: `// 一对一
country: fields.relationship({
  label: 'Country',
  collection: 'countries',
}),
// 一对多
authors: fields.array(
  fields.relationship({
    label: 'Authors',
    collection: 'posts',
  }), { label: 'Authors' }
)`,
      },
    ],
    notes: [
      {
        kind: 'warn',
        text: 'relationship 字段只存储所选条目 slug 的字符串。如果条目 slug 后续被修改，关系不会被自动更新。',
      },
    ],
    signature: sig('relationship'),
  },

  select: {
    name: 'select',
    cn: '选择 Select',
    en: 'Select',
    intro: 'select 字段从一组预定义选项中单选。',
    example: [
      {
        lang: 'ts',
        code: `status: fields.select({
  label: 'Status',
  options: [
    { label: 'Draft', value: 'draft' },
    { label: 'Published', value: 'published' },
  ],
  defaultValue: 'draft',
}),`,
      },
    ],
    signature: sig('select'),
  },

  slug: {
    name: 'slug',
    cn: 'Slug',
    en: 'Slug',
    intro:
      'slug 字段既是字段值，也是条目 URL 的来源。推荐把它与 collection 的 slugField 配合，让用户可以在管理界面自定义并重新生成 slug。',
    example: [
      {
        lang: 'ts',
        code: `title: fields.slug({
  name: { label: 'Title' },
}),`,
      },
    ],
    notes: [
      { kind: 'info', text: '在 collection 里一般配合 slugField 使用。' },
    ],
    signature: sig('slug'),
  },

  text: {
    name: 'text',
    cn: '文本 Text',
    en: 'Text',
    intro:
      'text 字段用于存储字符串，默认渲染为单行 input。设置 multiline: true 后会改为多行 textarea。',
    example: [
      {
        lang: 'ts',
        code: `quote: fields.text({
  label: 'Quote',
  multiline: true,
}),`,
      },
    ],
    signature: sig('text'),
  },

  url: {
    name: 'url',
    cn: 'URL',
    en: 'URL',
    intro: 'url 字段用于存储 URL，在管理界面提供专门的输入校验。',
    example: [
      {
        lang: 'ts',
        code: `homepage: fields.url({ label: 'Homepage' }),`,
      },
    ],
    signature: sig('url'),
  },

  ignored: {
    name: 'ignored',
    cn: '忽略 Ignored',
    en: 'Ignored',
    intro: 'ignored 字段不参与存储与读取，仅在 schema 里占用一个 key，方便前后端字段命名保持一致。',
    example: [
      { lang: 'ts', code: `placeholder: fields.ignored(),` },
    ],
    signature: sig('ignored'),
  },
}

export const fieldNames = Object.keys(fields)
