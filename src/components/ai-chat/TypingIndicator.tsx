import { motion } from 'framer-motion'

export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 mb-4">
      {/* Avatar */}
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary mt-0.5">
        AI
      </div>

      {/* Bubble */}
      <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-white border border-border/60 shadow-sm px-4 py-3">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block h-2 w-2 rounded-full bg-slate-400"
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 0.7,
              repeat: Infinity,
              delay: i * 0.15,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  )
}
