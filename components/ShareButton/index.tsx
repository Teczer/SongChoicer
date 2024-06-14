'use client'
import { Button } from '@/components/ui/button'
import useClipboard from '@/hooks/useClipboard'
import useWebShare from '@/hooks/useWebShare'
import React from 'react'

export default function ShareButton({
  title,
  text,
  url,
  children,
}: ShareData & { children: React.ReactNode }) {
  const { isSupported, share, error } = useWebShare()
  const { copyToClipboard, clipboardSuccess, clipboardError } = useClipboard()

  const handleShare = async () => {
    share({
      title,
      text,
      url,
    })

    if (url) {
      await copyToClipboard(url)
    }
  }

  if (error) {
    console.log(error)
    // toast.error(`Une erreur est survenu pour le partage de ${url}, : ${error}`)
  }

  if (clipboardSuccess) {
    // toast.success(`Copie de ${url}`)
  }

  if (!isSupported) {
    return <p className="hidden">Not Supported Device</p>
  }

  return (
    <Button size={'icon'} variant={'outline'} onClick={handleShare}>
      {children}
    </Button>
  )
}
