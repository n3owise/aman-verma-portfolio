"use client";

import { useEffect } from "react";
import { loaderState } from "@/lib/loader-state";

export default function Loader() {
  useEffect(() => {
    loaderState.complete();
  }, []);

  return null;
}
