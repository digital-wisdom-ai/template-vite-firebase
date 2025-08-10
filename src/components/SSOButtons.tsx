import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'

import GoogleIcon from '../assets/icons/google.svg'
import styles from './SSOButtons.module.css'

export function GoogleButton({ disabled }: { disabled?: boolean }) {
  const auth = getAuth()

  const provider = new GoogleAuthProvider()

  function signInWithGoogle() {
    return signInWithPopup(auth, provider)
  }

  return (
    <button
      className={styles.materialButton}
      onClick={signInWithGoogle}
      disabled={disabled}
    >
      <div className={styles.materialButtonState}></div>
      <div className={styles.materialButtonContentWrapper}>
        <div className={styles.materialButtonIcon}>
          <img src={GoogleIcon} alt='Google' style={{ display: 'block' }} />
        </div>
        <span className={styles.materialButtonContents}>
          Sign in with Google
        </span>
        <span style={{ display: 'none' }}>Sign in with Google</span>
      </div>
    </button>
  )
}

function SSOButtons() {
  return (
    <>
      <div className={styles.container}>
        <GoogleButton />
      </div>
    </>
  )
}

export default SSOButtons
