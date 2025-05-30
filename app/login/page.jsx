"use client";

import { login } from "@/lib/actions/login.js"; 
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useUserState } from "../dashboard/store/index"; 
import { useRouter } from "next/navigation";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import app from "@/lib/firebaseConfig";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Loader2Icon } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // State for displaying error messages

  const router = useRouter();
  const userState = useUserState(); // Your global user state

  // No need for a cleanup useEffect for isLoading in this specific case,
  // as it's directly tied to the submission lifecycle.

  // Renamed to handleSubmit for clarity, as it's the form's submission handler.
  async function handleSubmit(e) {
    e.preventDefault(); // Prevent default browser form submission
    setIsLoading(true); // Start loading
    setError(null); // Clear any previous errors

    try {
      // 1. Call your login API/server action
      const res = await login(username, password);
      console.log("Login API response:", res);

      if (res.error) {
        // If your API returns an error message
        setError(res.error);
      } else {
        // 2. Sign in with Firebase Custom Token
        const auth = getAuth(app);
        const userCredentials = await signInWithCustomToken(auth, res.token);
        const user = userCredentials.user;

        // 3. Store token in localStorage (safely checking window object for SSR compatibility)
        if (typeof window !== "undefined" && window.localStorage) {
          localStorage.setItem("token", res.token);
        }

        // 4. Update global user state
        userState.setUser(user);
        // userState.setProfile(res.profile); // Uncomment if you need to store profile details too

        // 5. Redirect based on user role
        console.log("User role:", res?.role);
        switch (res.role) {
          case "Admin":
            router.push("/dashboard/forms/personal_loan");
            break;
          case "DSA":
            router.push("/dashboard/connector");
            break;
          case "Telecaller":
            router.push("/dashboard/telecaller");
            break;
          case "Field Staff": // Corrected from duplicate "DSA"
            router.push("/dashboard/field-staff");
            break;
          default:
            // Fallback for unhandled roles, or a default dashboard
            router.push("/dashboard/connector");
            break;
        }
      }
    } catch (error) {
      // Catch any unexpected errors during the process (e.g., network issues, Firebase errors)
      console.error("Login process error:", error);
      // Firebase specific error handling can be more granular here
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading regardless of success or failure
    }
  }

  // Removed the redundant useEffect for console logging username/password

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/auth/login.jpeg" // Ensure this path is correct
          alt="Login Background"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <form
            className="flex flex-col gap-4 w-full max-w-xs items-start"
            onSubmit={handleSubmit} // Use the new handleSubmit function
          >
            <h1 className="text-3xl font-bold">Login</h1>{" "}
            {/* Added font-bold for better heading */}
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username} // Controlled input
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password} // Controlled input
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && (
              <p className="text-red-500 text-sm">{error}</p> // Display error message
            )}
            <Link
              href="/forget-password"
              className="text-blue-900 underline text-sm"
            >
              forget password?
            </Link>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </div>
      </div>

      {/* Loading Dialog */}
      <Dialog open={isLoading}>
        <DialogContent className="sm:max-w-md flex flex-col items-center justify-center py-8">
          <Loader2Icon
            color="black"
            className="animate-spin h-10 w-10 text-blue-600"
          />
          <p className="mt-4 text-lg font-medium text-gray-700">
            Signing in...
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
