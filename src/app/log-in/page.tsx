"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const LogInPage = () => {
  const handleLogIn = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `https://test-one-zeta-77.vercel.app/api/log-in/callback`,
        scopes: "https://www.googleapis.com/auth/calendar",
      },
    });
    if (error) console.log("Error logging in:", error.message);
  };

  return (
    <>
      <p>로그인인페이지에요</p>
      <button onClick={handleLogIn}>로그인 버튼이에요</button>
    </>
  );
};

export default LogInPage;
