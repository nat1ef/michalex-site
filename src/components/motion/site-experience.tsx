"use client";

import { useState } from "react";
import { Preloader } from "@/components/motion/preloader";
import { CustomCursor } from "@/components/motion/custom-cursor";

export function SiteExperience({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  return (
    <>
      {!ready && <Preloader onComplete={() => setReady(true)} />}
      <CustomCursor />
      <div className={ready ? undefined : "pointer-events-none"}>{children}</div>
    </>
  );
}
