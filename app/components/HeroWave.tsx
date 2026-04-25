export default function HeroWave() {
  return (
    <svg className="w-full h-32 mb-0" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ opacity: 0.7 }}>
      <path
        d="M0,50 Q75,0 150,50 T300,50 T450,50 T600,50 T750,50 T900,50 T1050,50 T1200,50 L1200,120 L0,120 Z"
        fill="url(#waveGradient)"
        opacity="0.9"
      />
      <path
        d="M0,70 Q75,40 150,70 T300,70 T450,70 T600,70 T750,70 T900,70 T1050,70 T1200,70 L1200,120 L0,120 Z"
        fill="url(#waveGradient2)"
        opacity="0.6"
      />
      <path
        d="M0,90 Q75,70 150,90 T300,90 T450,90 T600,90 T750,90 T900,90 T1050,90 T1200,90 L1200,120 L0,120 Z"
        fill="url(#waveGradient3)"
        opacity="0.35"
      />
      <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient id="waveGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
      </defs>
    </svg>
  )
}
