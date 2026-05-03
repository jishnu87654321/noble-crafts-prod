'use client'

import React from "react";
import { BrowserRouter } from "react-router-dom";
import { SignupPage } from "@/components/ui/sign-up-page";

export default function SignupDemo() {
  return (
    <BrowserRouter>
      <SignupPage />
    </BrowserRouter>
  );
}
