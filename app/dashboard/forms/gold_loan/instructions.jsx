import React from "react";

// Import Shadcn UI components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListChecks } from "lucide-react"; // A relevant icon for instructions
import { cn } from "@/lib/utils"; // Assuming you have this utility for conditional classnames

const Instructions = () => { // Removed unused formData, setFormData props

  return (
    // Wrap the entire content in a Shadcn Card for a clean, contained look
    <Card className="w-full max-w-3xl mx-auto my-8 border-2 shadow-lg"> {/* Added max-width, margin, border, and shadow */}
      <CardHeader className="flex flex-row items-center space-x-3 pb-4"> {/* Added flex for icon and title alignment, adjusted padding */}
        {/* Added a relevant icon next to the title */}
        <ListChecks className="h-7 w-7 text-primary" />
        <CardTitle className="text-2xl font-extrabold tracking-tight">Instructions</CardTitle>
      </CardHeader>
      <CardContent className="pt-0"> {/* Adjusted padding to avoid double padding with header */}
        <div className="space-y-6"> {/* Increased vertical spacing between sections */}
          <h3 className="text-xl font-semibold text-foreground leading-snug"> {/* Adjusted font size and line height */}
            Instructions for Filling Out the Loan Application Form
          </h3>
          <ul className="list-disc ml-6 space-y-2 text-muted-foreground text-base"> {/* Improved spacing, consistent text color, and base font size */}
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
      </CardContent>
    </Card>
  );
};

export default Instructions;
