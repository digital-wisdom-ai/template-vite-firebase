import { User } from 'firebase/auth'
import { createContext } from 'react'

interface AuthContextType {
  user: User
}

export const AuthContext = createContext<AuthContextType>({
  user: {} as User,
})
