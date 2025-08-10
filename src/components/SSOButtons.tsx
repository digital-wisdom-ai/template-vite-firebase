/** @jsxImportSource @emotion/react */
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { useDesignTokens } from '@hooks/useDesignTokens'
import { TOKENS } from '@gen/tokenConstants'
import GoogleIcon from '../assets/icons/google.svg'

export function GoogleButton({ disabled }: { disabled?: boolean }) {
  const auth = getAuth()
  const { getClasses } = useDesignTokens()
  const provider = new GoogleAuthProvider()

  function signInWithGoogle() {
    return signInWithPopup(auth, provider)
  }

  const buttonClasses = getClasses(TOKENS.googleButton.base)
  const iconClasses = getClasses(TOKENS.googleButton.icon)
  const contentWrapperClasses = getClasses(TOKENS.googleButton.contentWrapper)
  const contentsClasses = getClasses(TOKENS.googleButton.contents)

  return (
    <button css={buttonClasses} onClick={signInWithGoogle} disabled={disabled}>
      <div css={contentWrapperClasses}>
        <div css={iconClasses}>
          <img src={GoogleIcon} alt='Google' />
        </div>
        <span css={contentsClasses}>Sign in with Google</span>
      </div>
    </button>
  )
}

function SSOButtons() {
  const { getClasses, getValue } = useDesignTokens()

  const containerClasses = getClasses(TOKENS.spacing.container)

  return (
    <div
      css={[
        containerClasses,
        {
          backgroundColor: getValue(TOKENS.color.neutral[100]),
          display: getValue(TOKENS.layout.container.centerPage.display),
          flexDirection: getValue(
            TOKENS.layout.container.centerPage.flexDirection,
          ),
          alignItems: getValue(TOKENS.layout.container.centerPage.alignItems),
          justifyContent: getValue(
            TOKENS.layout.container.centerPage.justifyContent,
          ),
          minHeight: getValue(TOKENS.layout.container.centerPage.minHeight),
        },
      ]}
    >
      <GoogleButton />
    </div>
  )
}

export default SSOButtons
