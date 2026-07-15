import { useFluidCursor } from '@/hooks/useFluidCursor'

export function FluidCursor() {
  const cursorRef = useFluidCursor()

  return (
    <>
      <div
        ref={cursorRef}
        className="fluid-cursor w-4 h-4 bg-rose-400/60 rounded-full mix-blend-difference"
        style={{ opacity: 0 }}
      />
      <style>{`
        @media (hover: none) and (pointer: coarse) {
          .fluid-cursor { display: none !important; }
          body { cursor: auto !important; }
        }
      `}</style>
    </>
  )
}
