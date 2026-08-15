"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/auth";

function Header({ title }: { title?: string }) {
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
