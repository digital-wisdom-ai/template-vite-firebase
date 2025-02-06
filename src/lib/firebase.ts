import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

export const FIREBASE_CONFIG = getFirebaseClientConfig()

function getFirebaseClientConfig() {
  const config = base64Decode(
    import.meta.env.VITE_PUBLIC_FIREBASE_CLIENT_CONFIG,
  )
  console.log(config)
  return config
}

export function base64Decode(toDecode: string | undefined) {
  if (!toDecode) return {}

  try {
    const decoded = new TextDecoder().decode(
      Uint8Array.from(atob(toDecode), (c) => c.charCodeAt(0)),
    )
    return JSON.parse(decoded)
  } catch {
    return {}
  }
}

const app = initializeApp(FIREBASE_CONFIG)
const auth = getAuth(app)

export { auth }
