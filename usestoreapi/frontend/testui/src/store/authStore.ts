import { create } from 'zustand'
import { persist } from 'zustand/middleware'
type Store = {
  token: string | null
}

type Action = {
  setToken: (token: string) => void
  logout: () => void
}

const useAuthStore = create<Store & Action>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
      logout: () => set({ token: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
)

export default useAuthStore
