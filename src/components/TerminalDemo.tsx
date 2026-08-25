import { useEffect, useState } from 'react'

type Entry = { text: string; cls: string; delay?: number }

const COMMAND = 'bun create @keystatic@latest'

/** 命令之后逐行出现的输出 */
const OUTPUT: Entry[] = [
  { text: '', cls: '', delay: 380 },
  { text: '▸ Keystatic — 让我们开始设置', cls: 't-dim', delay: 430 },
  { text: '', cls: '', delay: 180 },
  { text: '? 选择要与 Keystatic 搭配的框架：', cls: 't-q', delay: 560 },
  { text: '   Next.js', cls: 't-dim', delay: 320 },
  { text: ' ❯ Astro', cls: 't-hl', delay: 360 },
  { text: '', cls: '', delay: 220 },
  { text: '✔ 项目创建完成 — 运行 bun run dev 启动开发服务器', cls: 't-ok', delay: 520 },
]

export default function TerminalDemo() {
  const [typed, setTyped] = useState('')
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTyped(COMMAND)
      setShown(OUTPUT.length)
      return
    }

    let cancelled = false
    const timers: number[] = []
    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(window.setTimeout(resolve, ms))
      })

    void (async () => {
      while (!cancelled) {
        setTyped('')
        setShown(0)
        await sleep(600)

        for (let i = 1; i <= COMMAND.length; i++) {
          if (cancelled) return
          setTyped(COMMAND.slice(0, i))
          await sleep(52)
        }

        await sleep(340)
        for (let s = 1; s <= OUTPUT.length; s++) {
          if (cancelled) return
          setShown(s)
          await sleep(OUTPUT[s - 1].delay ?? 300)
        }

        await sleep(4400)
      }
    })()

    return () => {
      cancelled = true
      timers.forEach((id) => window.clearTimeout(id))
    }
  }, [])

  return (
    <div className="term-demo" role="img" aria-label="Keystatic CLI 创建新项目的终端演示">
      <div className="td-bar">
        <i />
        <i />
        <i />
        <span>终端 · zsh</span>
      </div>
      <pre>
        <span className="t-dollar">$ </span>
        <span>{typed}</span>
        <span className="caret-blink" aria-hidden="true" />
        {OUTPUT.slice(0, shown).map((line, i) => (
          <span key={i} className={line.cls}>
            {'\n'}
            {line.text}
          </span>
        ))}
      </pre>
    </div>
  )
}
