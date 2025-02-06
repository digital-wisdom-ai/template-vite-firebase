import { CssBaseline, ThemeProvider } from '@mui/material'
import Profile from './components/Profile'
import { theme } from './theme'

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div data-testid='app-root'>
        <Profile />
      </div>
    </ThemeProvider>
  )
}
