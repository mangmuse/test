"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";

const LogInPage = () => {
  const handleLogIn = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/api/log-in/callback`,
      },
    });
    if (error) console.log("Error logging in:", error.message);
  };

  return (
    <>
      <p>로그인페이지에요</p>
      <button onClick={handleLogIn}>로그인 버튼이에요</button>
    </>
  );
};

export default LogInPage;
