"use client";

import { ViberButton } from "@/components/contact/viber-button";

export function FloatingViber() {
  return (
    <div className="fixed right-5 bottom-5 z-40 sm:right-8 sm:bottom-8">
      <ViberButton
        size="lg"
        label="Viber"
        className="rounded-full shadow-2xl shadow-black/40"
      />
    </div>
  );
}
