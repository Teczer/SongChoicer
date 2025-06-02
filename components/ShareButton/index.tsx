'use client';
import React from 'react';

import { Button } from '@/components/ui/button';
import useClipboard from '@/hooks/useClipboard';
import useWebShare from '@/hooks/useWebShare';

export default function ShareButton({ children, text, title, url }: ShareData & { children: React.ReactNode }) {
  const { error, isSupported, share } = useWebShare();
  const { clipboardError, clipboardSuccess, copyToClipboard } = useClipboard();

  const handleShare = async () => {
    share({
      text,
      title,
      url,
    });

    if (url) {
      await copyToClipboard(url);
    }
  };

  if (error) {
    console.log(error);
    // toast.error(`Une erreur est survenu pour le partage de ${url}, : ${error}`)
  }

  if (clipboardSuccess) {
    // toast.success(`Copie de ${url}`)
  }

  if (!isSupported) {
    return <p className="hidden">Not Supported Device</p>;
  }

  return (
    <Button size={'icon'} variant={'outline'} onClick={handleShare}>
      {children}
    </Button>
  );
}
