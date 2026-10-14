'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    gtag?: (command: string, action: string, params: Record<string, unknown>) => void;
  }
}

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Record privacy-friendly page view without collecting personal data
    const pageViewData: Record<string, unknown> = {
      path: pathname,
      referrer: typeof document !== 'undefined' ? document.referrer : '',
      timestamp: new Date().toISOString(),
    };

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', pageViewData);
    }

    // Listen to custom store events
    const handleStoreEvent = (e: Event) => {
      const customEvent = e as CustomEvent;
      const detail = customEvent.detail;
      console.log(`[Store Analytics Event]: ${detail.eventType}`, detail);
    };

    window.addEventListener('the_inner_method_event', handleStoreEvent);
    return () => {
      window.removeEventListener('the_inner_method_event', handleStoreEvent);
    };
  }, [pathname]);

  return null;
}
