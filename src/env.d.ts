/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_FIREBASE_CLIENT_CONFIG: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
