"use client";

import { useEffect, useState } from "react";
import { Preloader } from "@/components/motion/preloader";

const SESSION_KEY = "michalex-preloaded";

export function SiteExperience({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [showPreloader, setShowPreloader] = useState<boolean | null>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      seen = false;
    }
    if (seen) {
      setShowPreloader(false);
      setReady(true);
    } else {
      setShowPreloader(true);
    }
  }, []);

  const handleComplete = () => {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // private mode — preloader will simply show again next visit
    }
    setReady(true);
  };

  return (
    <>
      {showPreloader === true && !ready && <Preloader onComplete={handleComplete} />}
      <div className={ready ? undefined : "pointer-events-none"}>{children}</div>
    </>
  );
}
