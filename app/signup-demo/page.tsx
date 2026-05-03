'use client'

import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { SignupPage } from "@/components/ui/sign-up-page";

export default function SignupDemo() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <BrowserRouter>
      <SignupPage />
    </BrowserRouter>
  );
}
