import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

interface AppState {
  isCartOpen: boolean
  isMenuOpen: boolean
  cartCount: number
}

interface AppContextValue extends AppState {
  toggleCart: () => void
  toggleMenu: () => void
  closeCart: () => void
  closeMenu: () => void
  setCartCount: (count: number) => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    isCartOpen: false,
    isMenuOpen: false,
    cartCount: 0,
  })

  const toggleCart = useCallback(() => {
    setState((prev) => ({ ...prev, isCartOpen: !prev.isCartOpen }))
  }, [])

  const toggleMenu = useCallback(() => {
    setState((prev) => ({ ...prev, isMenuOpen: !prev.isMenuOpen }))
  }, [])

  const closeCart = useCallback(() => {
    setState((prev) => ({ ...prev, isCartOpen: false }))
  }, [])

  const closeMenu = useCallback(() => {
    setState((prev) => ({ ...prev, isMenuOpen: false }))
  }, [])

  const setCartCount = useCallback((count: number) => {
    setState((prev) => ({ ...prev, cartCount: count }))
  }, [])

  return (
    <AppContext.Provider
      value={{ ...state, toggleCart, toggleMenu, closeCart, closeMenu, setCartCount }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext(): AppContextValue {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
