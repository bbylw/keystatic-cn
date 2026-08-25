import { useEffect, useRef, useState } from 'react'

/* ---------- 轻量语法高亮 ---------- */

type Token = { text: string; cls?: string }

const TS_KEYWORDS = new Set([
  'import',
  'from',
  'export',
  'default',
  'const',
  'let',
  'var',
  'return',
  'await',
  'async',
  'function',
  'type',
  'new',
  'if',
  'else',
  'for',
  'of',
  'in',
  'as',
  'extends',
  'true',
  'false',
  'null',
  'undefined',
])

function tokenizeTs(code: string): Token[] {
  const tokens: Token[] = []
  const re =
    /(\/\/.*|\/\*[\s\S]*?\*\/)|('[^'\n]*'|"[^"\n]*"|`[^`\n]*`)|(\b\d[\d._]*\b)|([A-Za-z_$][\w$]*)|([\s\S])/g
  let m: RegExpExecArray | null
  while ((m = re.exec(code)) !== null) {
    const [full, com, str, num, word, ch] = m
    if (com) tokens.push({ text: full, cls: 'tk-com' })
    else if (str) tokens.push({ text: full, cls: 'tk-str' })
    else if (num) tokens.push({ text: full, cls: 'tk-num' })
    else if (word) {
      if (TS_KEYWORDS.has(word)) tokens.push({ text: full, cls: 'tk-key' })
      else if (/^[A-Z]/.test(word)) tokens.push({ text: full, cls: 'tk-typ' })
      else tokens.push({ text: full })
    } else if (ch) tokens.push({ text: full, cls: /[(){}[\];,.:=>|&+\-*]/.test(full) ? 'tk-pct' : undefined })
  }
  return tokens
}

function tokenizeBash(code: string): Token[] {
  const tokens: Token[] = []
  for (const line of code.split('\n')) {
    if (line.trimStart().startsWith('#')) {
      tokens.push({ text: line, cls: 'tk-com' })
      tokens.push({ text: '\n' })
      continue
    }
    const re = /(\s+)|("[^"\n]*"|'[^'\n]*')|([^\s"']+)/g
    let isFirstWord = true
    let m: RegExpExecArray | null
    while ((m = re.exec(line)) !== null) {
      const [, ws, str, word] = m
      if (ws) tokens.push({ text: ws })
      else if (str) tokens.push({ text: str, cls: 'tk-str' })
      else if (word) {
        if (isFirstWord && !word.startsWith('-')) tokens.push({ text: word, cls: 'tk-cmd' })
        else if (word.startsWith('--') || word.startsWith('-')) tokens.push({ text: word, cls: 'tk-flag' })
        else tokens.push({ text: word })
        isFirstWord = false
      }
    }
    tokens.push({ text: '\n' })
  }
  return tokens
}

export interface CodeBlockProps {
  code: string
  lang?: 'ts' | 'bash'
  title?: string
}

export default function CodeBlock({ code, lang = 'ts', title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | null>(null)

  useEffect(() => () => {
    if (timer.current !== null) window.clearTimeout(timer.current)
  }, [])

  const tokens = lang === 'bash' ? tokenizeBash(code) : tokenizeTs(code)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = code
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setCopied(true)
    if (timer.current !== null) window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <figure className="codeblock">
      <div className="cb-bar">
        <span className="cb-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="cb-lang">{title ?? (lang === 'bash' ? '终端' : 'TypeScript')}</span>
        <button type="button" className="copy-btn" onClick={copy}>
          {copied ? '已复制 ✓' : '复制'}
        </button>
      </div>
      <pre>
        <code>
          {tokens.map((t, i) =>
            t.text === '\n' ? (
              '\n'
            ) : (
              <span key={i} className={t.cls}>
                {t.text}
              </span>
            ),
          )}
        </code>
      </pre>
    </figure>
  )
}
