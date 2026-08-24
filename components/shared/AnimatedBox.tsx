// components/AnimatedBox.jsx
'use client' // এটি আবশ্যিক
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export default function AnimatedBox({ children }: { children: ReactNode }) {
  return (
     <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.4 }}
           className="w-full max-w-5xl relative z-10"
         >
     {children}
    </motion.div>
  )
}