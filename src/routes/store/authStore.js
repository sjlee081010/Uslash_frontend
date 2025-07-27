import { create } from 'zustand'

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  email: '',
  setLogin: (email) => set({ isLoggedIn: true, email }),
  logout: () => set({ isLoggedIn: false, email: '' })
}))

export default useAuthStore