import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface LiquidMaskProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
}

const MORPH_PATHS = [
  'M42.5,-64.1C56.3,-58.9,69.7,-50.2,77.4,-37.6C85.1,-25,87.1,-8.4,83.1,6.3C79.1,21,69.1,33.8,58.2,46.1C47.3,58.4,35.5,70.3,21.5,74.9C7.5,79.5,-8.7,76.8,-22.4,69.9C-36.1,63,-47.3,52,-55.7,38.8C-64.1,25.6,-69.7,10.3,-69.6,-5C-69.5,-20.3,-63.7,-35.6,-53.6,-46.4C-43.5,-57.2,-29.2,-63.5,-14.9,-66.3C-0.6,-69.1,13.7,-68.4,28.7,-69.3C43.7,-70.2,59.4,-72.4,42.5,-64.1Z',
  'M34.7,-53.2C45.1,-48.6,53.8,-38,60.1,-25.8C66.4,-13.6,70.3,0.2,66.7,12.4C63.1,24.6,52,35.2,40.1,44.2C28.2,53.2,15.5,60.6,1.3,59.4C-12.9,58.2,-27.8,48.4,-39.6,37.6C-51.4,26.8,-60.1,15,-63.3,1.1C-66.5,-12.8,-64.2,-28.6,-55.4,-40.1C-46.6,-51.6,-31.3,-58.8,-16.5,-61.5C-1.7,-64.2,12.6,-62.4,24.3,-57.8C36,-53.2,34.7,-53.2,34.7,-53.2Z',
  'M52.3,-67.8C67.3,-60.2,78.4,-44.4,81.2,-27.6C84,-10.8,78.5,7,68.6,20.9C58.7,34.8,44.4,44.8,29.2,53.1C14,61.4,-2.1,68,-16.9,66.1C-31.7,64.2,-45.2,53.8,-55.5,40.5C-65.8,27.2,-72.9,11,-73.2,-5.4C-73.5,-21.8,-67,-38.4,-55.2,-48.6C-43.4,-58.8,-26.3,-62.6,-9,-65.1C8.3,-67.6,25.6,-68.8,37.3,-63.5C49,-58.2,52.3,-67.8,52.3,-67.8Z',
]

export function LiquidMask({ src, alt, className, width, height }: LiquidMaskProps) {
  const [pathIndex, setPathIndex] = useState(0)

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <motion.div
        className="w-full h-full"
        onMouseEnter={() => setPathIndex((prev) => (prev + 1) % MORPH_PATHS.length)}
        style={{
          clipPath: `path('${MORPH_PATHS[pathIndex]}')`,
        }}
        animate={{
          clipPath: [
            `path('${MORPH_PATHS[pathIndex]}')`,
            `path('${MORPH_PATHS[(pathIndex + 1) % MORPH_PATHS.length]}')`,
            `path('${MORPH_PATHS[(pathIndex + 2) % MORPH_PATHS.length]}')`,
          ],
        }}
        transition={{
          duration: 2.5,
          ease: [0.22, 1, 0.36, 1],
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-full object-cover"
          draggable={false}
        />
      </motion.div>
    </div>
  )
}
