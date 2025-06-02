"use client";

import {
  changePassword,
  sendOTPMail,
  setCanReset,
  verifyOTP,
} from "@/api/file_action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useEffect } from "react";

const EmailInput = ({ username, setUsername, setStep, setOTP, setError }) => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Password Reset</CardTitle>
        <CardDescription>
          Enter your email to reset password and click next
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={() => {
            sendOTPMail(username).then((res) => {
              if (res?.type) {
                console.log(res.type);
                setError(res.err);
                if (res.type == "UNAUTHORISED") {
                  setStep(5);
                }
              } else {
                setOTP(res.value);
                setStep((val) => val + 1);
              }
            });
          }}
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
};

const PasswordInput = ({
  username,
  password,
  setPassword,
  otp,
  setStep,
  setError,
}) => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Password Reset</CardTitle>
        <CardDescription>Enter new password</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="username">Password</Label>
          <Input
            type="password"
            id="username"
            placeholder="Username"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={() => {
            changePassword(username, password, otp).then((res) => {
              if (res.type) {
                setError(res.err);
                setStep(5);

                return 0;
              }
              setStep(4);
            });
          }}
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
};

const OTPInput = ({ username, setOTP, otp, setStep, setError }) => {
  const [tryCount, setTryCount] = useState(0);

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Password Reset</CardTitle>
        <CardDescription>
          Enter your email to reset password and click next
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="otp">OTP</Label>
          <Input
            id="otp"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={() => {
            verifyOTP(otp, username).then((res) => {
              console.log(res);
              if (res?.type) {
                setError(res.err);
                if (tryCount > 2) {
                  setCanReset(username, false).then((res) => {
                    if (res.msg) {
                      setStep(5);
                      setError(res.msg);
                      return 0;
                    }

                    setError(res.err);
                  });
                  // prevent user from password reset
                  return 0;
                } else if (res.type == "UNAUTHORISED") {
                  setStep(5);
                  return 0;
                } else if (res.type == "INCORRECT") {
                  setTryCount((val) => val + 1);
                }
              } else {
                setStep(3);
              }
            });
          }}
        >
          Verify
        </Button>
      </CardFooter>
    </Card>
  );
};

const SuccessMessage = ({ setError }) => {
  useEffect(() => {
    setError("");
  });

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Password Reset</CardTitle>
        <CardDescription>Password Reset Successful</CardDescription>
      </CardHeader>
    </Card>
  );
};

const ErrorMessage = () => {
  return <></>;
};

export default function Page() {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [otp, setOTP] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    console.log(otp, step);
  }, [otp, step]);

  const steps = {
    1: () => (
      <EmailInput
        setStep={setStep}
        setUsername={setUsername}
        username={username}
        setError={setError}
        setOTP={setOTP}
      />
    ),
    2: () => (
      <OTPInput
        username={username}
        setStep={setStep}
        otp={otp}
        setError={setError}
        setOTP={setOTP}
      />
    ),
    3: () => (
      <PasswordInput
        otp={otp}
        username={username}
        password={password}
        setPassword={setPassword}
        setStep={setStep}
        setError={setError}
      />
    ),
    4: () => <SuccessMessage setError={setError} />,
    5: () => <ErrorMessage />,
  };
  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col gap-4">
      {error ? (
        <Alert variant="destructive" className="w-[350px]">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      {steps[step]()}
    </div>
  );
}
