"use client";

import { login } from "@/lib/actions/login.js";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import app from "@/lib/firebaseConfig";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Loader2Icon } from "lucide-react";
import { EyeOff } from "lucide-react";
import { Eye } from "lucide-react";
import { useUserState } from "../dashboard/store";
import { ChevronLeft } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null); 

  const router = useRouter();
  const userState = useUserState();
  async function handleSubmit(e) {
    e.preventDefault(); // Prevent default browser form submission
    setIsLoading(true); // Start loading
    setError(null); // Clear any previous errors

    try {
      // 1. Call your login API/server action
      const res = await login(username, password);
      console.log("Login API response:", res);

      if (res.error) {
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
            // router.push("/dashboard/connector");
            router.push("/dashboard/dsa/profile");
            break;
          case "Telecaller":
            router.push("/dashboard/telecaller");
            break;
          case "Field Staff": // Corrected from duplicate "DSA"
            router.push("/dashboard/field-staff");
            break;
          default:
            // Fallback for unhandled roles, or a default dashboard
            router.push("/dashboard/rm");
            break;
        }
      }
    } catch (error) {
      console.error("Login process error:", error);
      // Firebase specific error handling can be more granular here
      setError("An unexpected error occurred. Please try again.");
    }
    //  finally {
    //   setIsLoading(false); // Stop loading regardless of success or failure
    // }
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
        <Link href={"/"} className="flex text-blue-500 hover:underline items-center"><ChevronLeft size={19}/>Back</Link>
        <div className="flex flex-1 items-center justify-center">
          <form
            className="flex flex-col border p-10 rounded-2xl w-[30rem] max-w-md items-start"
            onSubmit={handleSubmit} // Use the new handleSubmit function
          >
            {/* logo */}
            <div className="flex items-center justify-center w-full pb-3 space-x-1 rtl:space-x-reverse">
              <img src={'/logo/PAR2.png'} className="h-10" alt="Logo" />
              <div className="flex flex-col justify-start">
                <span className=" text-2xl text-slate-600 font-semibold whitespace-nowrap leading-5 dark:text-white">PARV</span>
                <span className="text-[0.6rem] text-blue-600">Financial Services</span>
              </div>
            </div>
            <div className="mb-6 w-full">
              <h1 className="text-3xl text-center w-full font-bold">Welcome</h1>{" "}
              <p className="text-center w-full">Login to your account</p>
            </div>

            {/* Added font-bold for better heading */}
            <div className="w-full gap-4 space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username} // Controlled input
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your user Id"
                required
              />
              {/* password */}
              <div className="relative space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type={showPassword?"text":"password"}
                  value={password} // Controlled input
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="***********"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-9 transform -translate-y-1/4 cursor-pointer text-gray-500 hover:text-gray-700 focus:outline-none"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                {error && (
                  <p className="text-red-500 text-sm">{error}</p> // Display error message
                )}
              </div>

              <Link
                href="/forget-password"
                className="text-blue-900 hover:underline text-sm text-center w-full"
              >
                Forgot your password?
              </Link>
              <Button type="submit" className="w-full mt-4" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </div>
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
