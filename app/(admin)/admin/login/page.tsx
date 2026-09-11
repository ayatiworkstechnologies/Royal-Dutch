"use client";

import { useRouter } from "next/navigation";
import { AuthModal } from "@/components/ui/AuthModal";

export default function AdminLoginPage() {
  const router = useRouter();

  return (
    <AuthModal
      isOpen={true}
      onClose={() => router.push("/")}
      initialView="staff_login"
    />
  );
}
