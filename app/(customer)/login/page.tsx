"use client";

import { useRouter } from "next/navigation";
import { AuthModal } from "@/components/ui/AuthModal";

export default function LoginPage() {
  const router = useRouter();

  return (
    <AuthModal
      isOpen={true}
      onClose={() => router.push("/")}
      initialView="patient_login"
    />
  );
}
