import { onAuthStateChanged, User } from 'firebase/auth'
import { ReactNode, useEffect, useState } from 'react'
import Login from '../components/Login'
import { auth } from '../lib/firebase'
import { AuthContext } from './auth'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (user === null || loading) {
    return <Login />
  }

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}
