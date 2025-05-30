"use client"

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {useEffect} from "react";
// Component to revoke Object URLs when unmounted
const RevokeObjectURL = ({ url }) => {
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(url);
    };
  }, []);
  return null;
};

// Helper to render form fields in the dialog
export const renderDialogField = (key, value) => {
  // Skip rendering functions or non-primitive values that aren't files
  if (
    typeof value === "function" ||
    (typeof value === "object" && value !== null && !(value instanceof File))
  ) {
    return null;
  }

  // Handle file inputs as images
  if (value instanceof File) {
    const imageUrl = URL.createObjectURL(value);
    return (
      <div key={key} className="space-y-2">
        <Label htmlFor={`dialog-${key}`}>
          {key
            .replace(/_/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase())}
        </Label>
        {value.type.startsWith("image/") ? (
          <img
            src={imageUrl}
            alt={key}
            className="w-32 h-32 object-cover rounded-md border"
          />
        ) : (
          <p className="text-sm text-gray-600">
            File: {value.name} ({value.type})
          </p>
        )}
        {/* Revoke object URL on unmount or dialog close to prevent memory leaks */}
        {/* <RevokeObjectURL url={imageUrl} /> */}
      </div>
    );
  }

  // Handle boolean values for display
  let displayValue = value;
  if (typeof value === "boolean") {
    displayValue = value ? "Yes" : "No";
  }

  return (
    <div key={key} className="space-y-2">
      <Label htmlFor={`dialog-${key}`}>
        {key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}
      </Label>
      <Input
        id={`dialog-${key}`}
        value={displayValue ? displayValue : ""}
        disabled
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
};
