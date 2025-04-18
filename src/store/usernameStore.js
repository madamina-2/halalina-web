import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useUsernameStore = create(
  persist(
    (set) => ({
      username: null,
      setUsername: (userData) => set({ user: userData }),
      clearUsername: () => set({ user: null }),
    }),
    {
      name: 'username-storage', // nama key di localStorage atau AsyncStorage (React Native)
      // opsional: kustom storage
      // storage: createJSONStorage(() => sessionStorage),
    }
  )
)
