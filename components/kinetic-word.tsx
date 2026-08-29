'use client'

import { motion, useReducedMotion } from 'motion/react'

type Props = {
  text: string
  className?: string
  outlineIndices?: number[]
}

/** Letters reveal with elegant masked stagger on entrance without twitching. */
export function KineticWord({ text, className = '', outlineIndices = [] }: Props) {
  const reduce = useReducedMotion()

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
  }

  const letterVariants = {
    hidden: { y: '115%', opacity: 0, filter: 'blur(8px)' },
    visible: {
      y: '0%',
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <motion.span
      className={`inline-flex overflow-hidden ${className}`}
      aria-label={text}
      initial={reduce ? undefined : "hidden"}
      whileInView={reduce ? undefined : "visible"}
      viewport={{ once: true, margin: '-5%' }}
      variants={reduce ? undefined : containerVariants}
    >
      {text.split('').map((ch, i) => (
        <span key={i} className="inline-block overflow-hidden py-1">
          <motion.span
            data-letter
            aria-hidden
            variants={reduce ? undefined : letterVariants}
            className={`inline-block ${
              outlineIndices.includes(i) ? 'text-outline-electric-thin' : ''
            }`}
          >
            {ch === ' ' ? '\u00A0' : ch}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
