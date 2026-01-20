"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSessionStore } from "@/entities/session/session-store";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Logo } from "@/shared/ui/logo";
import { authService } from "@/features/auth/api/auth-service";

export default function LoginPage() {
  const router = useRouter();
  const login = useSessionStore((state) => state.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const user = await authService.login({ email, password });
    if (!user) {
      setError("Invalid email or password.");
      setIsLoading(false);
      return;
    }

    login(user);
    setIsLoading(false);
    router.push("/account");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-brand-cream">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Logo className="mx-auto" />
        <h2 className="mt-6 text-center text-3xl font-bold font-montserrat text-brand-teal">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-brand-charcoal/60">
          Or{" "}
          <Link href="/register" className="font-medium text-brand-gold hover:text-brand-gold/80">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-brand-teal/5">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-brand-charcoal">
                Email address
              </label>
              <div className="mt-1">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-brand-charcoal">
                Password
              </label>
              <div className="mt-1">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-brand-gold focus:ring-brand-gold border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-brand-charcoal/80">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-brand-gold hover:text-brand-gold/80">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full flex justify-center bg-brand-teal hover:bg-brand-teal/90 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </div>
            {error ? <p className="text-sm text-red-500">{error}</p> : null}
          </form>
        </div>
      </div>
    </div>
  );
}
