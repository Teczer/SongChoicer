import { useState } from 'react'

function useClipboard() {
  const [clipboardSuccess, setClipboardSuccess] = useState<boolean>(false)
  const [clipboardError, setClipboardError] = useState<string | null>(null)

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setClipboardSuccess(true)
      setClipboardError(null)
    } catch (err) {
      setClipboardSuccess(false)
      setClipboardError('Failed to copy to clipboard.')
    }
  }

  return { copyToClipboard, clipboardSuccess, clipboardError }
}

export default useClipboard
