'use client'

import { motion, useReducedMotion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  variant?: 'fade-up' | 'mask' | 'blur-in' | 'scale'
}

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = '',
  variant = 'fade-up',
}: RevealProps) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  const variants: Record<string, Variants> = {
    'fade-up': {
      hidden: { opacity: 0, y, filter: 'blur(6px)' },
      visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
          duration: 0.85,
          delay,
          ease: [0.16, 1, 0.3, 1],
        },
      },
    },
    'mask': {
      hidden: { y: '100%', opacity: 0 },
      visible: {
        y: '0%',
        opacity: 1,
        transition: {
          duration: 0.9,
          delay,
          ease: [0.16, 1, 0.3, 1],
        },
      },
    },
    'blur-in': {
      hidden: { opacity: 0, filter: 'blur(16px)', scale: 0.96 },
      visible: {
        opacity: 1,
        filter: 'blur(0px)',
        scale: 1,
        transition: {
          duration: 0.9,
          delay,
          ease: [0.16, 1, 0.3, 1],
        },
      },
    },
    'scale': {
      hidden: { opacity: 0, scale: 0.92, y: 20 },
      visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          duration: 0.8,
          delay,
          ease: [0.16, 1, 0.3, 1],
        },
      },
    },
  }

  if (variant === 'mask') {
    return (
      <div className={`overflow-hidden ${className}`}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
          variants={variants.mask}
        >
          {children}
        </motion.div>
      </div>
    )
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
      variants={variants[variant] || variants['fade-up']}
    >
      {children}
    </motion.div>
  )
}
