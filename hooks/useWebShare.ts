import { useEffect, useState } from 'react'

export interface ShareData {
  title?: string
  text?: string
  url?: string
}

function useWebShare() {
  const [isSupported, setIsSupported] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // Check if navigator share is supported
  useEffect(() => {
    // @ts-ignore
    if (navigator?.share) {
      setIsSupported(true)
    }
  }, [])

  const share = async ({ title, text, url }: ShareData) => {
    if (isSupported) {
      try {
        await navigator.share({ title, text, url })
        setError(null)
      } catch (err) {
        console.log(err)
        setError((err as Error).message)
      }
    } else {
      setError('Web Share API not supported in this browser.')
    }
  }

  return { isSupported, share, error }
}

export default useWebShare
