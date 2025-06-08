import React from "react";
import { ListChecks } from "lucide-react"; // A relevant icon for instructions

const Instructions = () => {
  return (
    <div className="w-full mx-auto my-8 p-6 border rounded-2xl  bg-white dark:bg-zinc-900">
      <div className="flex items-center space-x-3 mb-4">
        <ListChecks className="h-7 w-7 text-primary" />
        <h2 className="text-2xl font-extrabold tracking-tight">Instructions</h2>
      </div>
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-foreground leading-snug">
          Instructions for Filling Out the Loan Application Form
        </h3>
        <ul className="list-disc ml-6 space-y-2 text-muted-foreground text-base">
          <li>
            <strong className="text-foreground">Read Carefully:</strong> Please go through all the
            sections of the form before filling it out.
          </li>
          <li>
            <strong className="text-foreground">Use Clear and Correct Information:</strong> Ensure that
            all details provided are accurate and match your official
            documents. Any false information may lead to rejection.
          </li>
          <li>
            <strong className="text-foreground">Required Documents:</strong> Keep necessary documents (ID
            proof, income proof, address proof, and bank statements) ready
            before starting.
          </li>
          <li>
            <strong className="text-foreground">Mandatory Fields:</strong> Fields marked with{" "}
            <strong className="text-destructive">(*) are mandatory</strong> and must be filled in to avoid
            processing delays.
          </li>
          <li>
            <strong className="text-foreground">For Assistance:</strong> If you have any questions while
            filling out the form, contact our support team at{" "}
            <a
              href="mailto:support@parvfinancial.com"
              className="text-primary hover:underline font-medium"
            >
              support@parvfinancial.com
            </a>
            .
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Instructions;

