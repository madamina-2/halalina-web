import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useResultStore = create(
  persist(
    (set) => ({
      result: null,
      setResult: (resultData) => set({ result: resultData }),
      clearResult: () => set({ result: null }),
    }),
    {
      name: 'result-storage', // nama key di localStorage atau AsyncStorage (React Native)
      // opsional: kustom storage
      // storage: createJSONStorage(() => sessionStorage),
    }
  )
)