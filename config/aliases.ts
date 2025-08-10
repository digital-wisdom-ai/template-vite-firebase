import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const aliases = {
  '@': path.resolve(__dirname, '../src'),
  '@components': path.resolve(__dirname, '../src/components'),
  '@context': path.resolve(__dirname, '../src/context'),
  '@gen': path.resolve(__dirname, '../src/gen'),
  '@hooks': path.resolve(__dirname, '../src/hooks'),
  '@layouts': path.resolve(__dirname, '../src/layouts'),
  '@lib': path.resolve(__dirname, '../src/lib'),
  '@pages': path.resolve(__dirname, '../src/pages'),
  '@routes': path.resolve(__dirname, '../src/routes'),
  '@store': path.resolve(__dirname, '../src/store'),
}
