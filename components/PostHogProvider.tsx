'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import posthog from 'posthog-js';
import { PostHogProvider as PHProvider, usePostHog } from 'posthog-js/react';
import { Suspense, useEffect } from 'react';

function SuspendedPostHogPageView() {
  const posthogReact = usePostHog();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (posthogReact) {
      posthogReact.capture('$pageview', {
        path: pathname + searchParams.toString(),
      });
    }
  }, [posthogReact, pathname, searchParams]);

  return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init('phc_mCmrWoLHM7ythUqN1ennfq7ctB1MYYKs36kZjiegw78', {
      api_host: '/ingest',
      capture_exceptions: true,
      capture_pageleave: true,
      capture_pageview: 'history_change',
      debug: process.env.NODE_ENV === 'development',
      ui_host: 'https://eu.posthog.com',
    });
  }, []);

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <SuspendedPostHogPageView />
      </Suspense>
      {children}
    </PHProvider>
  );
}
