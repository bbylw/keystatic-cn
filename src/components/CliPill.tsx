import { useEffect, useRef, useState } from 'react'

interface CliPillProps {
  command?: string
}

/** 终端风格的命令复制条 */
export default function CliPill({ command = 'npm create @keystatic@latest' }: CliPillProps) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | null>(null)

  useEffect(
    () => () => {
      if (timer.current !== null) window.clearTimeout(timer.current)
    },
    [],
  )

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      if (timer.current !== null) window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 1800)
    } catch {
      /* 忽略剪贴板失败 */
    }
  }

  return (
    <span className="cli-pill">
      <span className="dollar">$</span>
      <span>{command}</span>
      <button type="button" className="copy-btn" onClick={copy}>
        {copied ? '已复制 ✓' : '复制'}
      </button>
    </span>
  )
}
