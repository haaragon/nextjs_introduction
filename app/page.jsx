"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LikeButton from "@/like-button.jsx";
import { isLoggedIn } from "@/auth.js";

function Header({ title }) {
  return <div>{title ? title : "Default title"}</div>;
}

export default function HomePage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (isLoggedIn()) {
      setChecked(true);
    } else {
      router.replace("/login");
    }
  }, [router]);

  if (!checked) {
    return null;
  }

  return (
    <>
    </>
  );
}
