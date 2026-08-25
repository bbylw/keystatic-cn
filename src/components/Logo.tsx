interface LogoProps {
  size?: number
}

/** 自绘 Keystatic 风格「钥匙」标记 */
export default function Logo({ size = 30 }: LogoProps) {
  return (
    <svg
      className="brand-mark"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="60" height="60" rx="16" fill="#141413" />
      <g fill="none" stroke="#d97757" strokeWidth="7" strokeLinecap="round">
        <path d="M32 14v36" />
        <path d="M32 32l17-10" />
        <path d="M32 32L15 22" />
        <path d="M32 46l12 7" />
        <path d="M32 46l-12 7" />
      </g>
      <circle cx="32" cy="32" r="7.5" fill="#faf9f5" />
    </svg>
  )
}
