"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { useAdminLogin } from "@/features/admin-auth/api/use-admin-login";
import { useAdminSessionStore } from "@/entities/admin-session/admin-session-store";

export default function AdminLoginPage() {
  const router = useRouter();
  const loginMutation = useAdminLogin();
  const login = useAdminSessionStore((state) => state.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await loginMutation.mutateAsync({ email, password });
      login(response.token, response.user);
      router.push("/admin");
    } catch {
      return;
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white p-8 rounded-sm border border-brand-teal/10 shadow-sm">
        <h1 className="text-2xl font-montserrat font-bold text-brand-teal mb-6">Admin Sign In</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-brand-charcoal">Email</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-brand-charcoal">Password</label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {loginMutation.isError ? (
            <p className="text-sm text-red-500">Invalid credentials. Please try again.</p>
          ) : null}
          <Button className="w-full bg-brand-teal hover:bg-brand-teal/90 text-white" disabled={loginMutation.isPending}>
            {loginMutation.isPending ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}
