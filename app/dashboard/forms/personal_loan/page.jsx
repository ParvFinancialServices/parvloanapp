"use client";

import React, { useState, useEffect } from "react";
import Instructions from "./instructions";
import PersonalDetails from "./personal_details";
import Employment from "./employment";
import Documents from "./documents";
import FormStepIndicator from "../../../../components/common/form_step_indicator"; // Assuming this is your custom progress indicator
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { upload_doc } from "@/lib/actions/file"; // Assuming this is your file upload server action
import { setLoanData } from "@/lib/actions/loan"; // Assuming this is your loan data submission server action
import { useUserState } from "../../store"; // Assuming your user state management store
import { renderDialogField } from "@/components/common/render_dialog_field"; // Assuming this utility exists

// Import validation utilities (now using Zod)
import {
  validateFields,
  validateAllFields,
  stepFields,
} from "./formValidation";
import { get_upload_promises } from "@/lib/utils";

function Page() {
  // Define the steps of your loan application
  const loanSteps = [
    { id: "instructions", title: "Instruction", Component: Instructions },
    {
      id: "personal_details",
      title: "Personal Details",
      Component: PersonalDetails,
    },
    { id: "employment", title: "Employment & Loans", Component: Employment },
    { id: "documents", title: "Documents", Component: Documents },
  ];

  // State to manage the current step index
  const [step, setStep] = useState(0);
  // State to control the submission dialog's open/close status
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // State to store validation errors
  const [errors, setErrors] = useState({});
  // State for showing a global loading indicator during final submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // user Data
  let userState = useUserState();

  // State to manage all form data
  const [formData, setFormData] = useState({
    // Personal Details
    loan_amount: "",
    id_of_connector: "",
    name_of_connector: "",
    purpose_of_loan: "To purchase property", // Default from config
    Name: "",
    fathers_name: "",
    mothers_name: "",
    phone_no: "",
    alt_phone_no: "",
    pan: "",
    dob: "",
    marital_status: "Unmarried", // Default
    spouse_name: "", // Conditional
    // co-applicant details
    co_applicant_dob:"",
    co_applicant_name:"",
    co_occupation:"",
    
    permanent_building_name: "",
    permanent_street_name: "",
    permanent_landmark: "",
    permanent_city: "",
    permanent_district: "",
    permanent_state: "",
    permanent_pincode: "",
    same_as_permanent_address: false,
    present_building_name: "",
    present_street_name: "",
    present_landmark: "",
    present_city: "",
    present_district: "",
    present_state: "",
    present_pincode: "",

    // Employment
    current_company_name: "",
    salary_account_bank: "",
    savings_account_bank: "",
    job_tenure: "0-12 months", // Default from config
    job_experience: "less than 1 year", // Default from config
    monthly_income: "less than 12,000", // Default from config
    office_building_name: "",
    office_street_name: "",
    office_landmark: "",
    office_city: "",
    office_district: "",
    office_state: "",
    office_pincode: "",
    have_offer_letter: false, // Conditional
    offer_letter: null, // File object
    have_tan_no: false, // Conditional
    tan_no: "",
    has_bank_statement: false, // Conditional
    bank_statement: null, // File object
    has_current_loan: false, // Conditional
    existing_loans: "",
    total_loan_amount: "less than 50,000", // Default from config
    loan_start_date: "0-12 months before", // Default from config
    loan_provider_bank: "",
    monthly_emi: "",

    // Documents (File objects)
    applicant_selfie: null,
    aadhar_front: null,
    aadhar_back: null,
    Personal_pan: null,
    salary_slip_1: null,
    salary_slip_2: null,
    salary_slip_3: null,
    other_doc: null,
  });

  // Get the current component to render based on the step index
  const CurrentStepComponent = loanSteps[step].Component;

  // Handler for moving to the next step or opening dialog
  const handleNext = () => {
    // Validate fields for the current step
    const currentStepFieldNames = stepFields[step];
    // const stepErrors = validateFields(formData, currentStepFieldNames);
    const stepErrors = {};

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      // Scroll to the first error if needed
      const firstErrorField = Object.keys(stepErrors)[0];
      document.getElementById(firstErrorField)?.focus();
      return; // Prevent moving to next step if there are errors
    }

    // Clear errors for the current step if validation passes
    setErrors({});

    if (step < loanSteps.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      // Last step, open the confirmation dialog
      setIsDialogOpen(true);
    }
  };

  // Handler for moving to the previous step
  const handlePrevious = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
      setErrors({}); // Clear errors when moving back
    }
  };

   const stepFields = {
    0: [], // Instructions
    1: [
      // Vehicle Details
      "which_vehicle",
      "when_purchase",
      "estimated_cost",
      "loan_you_need",
      "profession",
    ],
    2: [
      // Personal Details
      "loan_amount",
      "id_of_connector",
      "name_of_connector",
      "applicant_name",
      "fathers_name",
      "mothers_name",
      "phone_no",
      "alt_phone_no",
      "pan",
      "dob",
      "marital_status",
      "spouse_name",
      "permanent_building_name",
      "permanent_street_name",
      "permanent_landmark",
      "permanent_city",
      "permanent_district",
      "permanent_state",
      "permanent_pincode",
      "same_as_permanent_address",
      "present_building_name",
      "present_street_name",
      "present_landmark",
      "present_city",
      "present_district",
      "present_state",
      "present_pincode",
    ],
    3: [
      // Employment & Loans
      "company_name",
      "company_age",
      "registration_paper", // Business
      "current_company_name",
      "salary_account_bank",
      "savings_account_bank",
      "job_tenure",
      "job_experience",
      "monthly_income", // Job
      "have_current_account",
      "current_account_bank_name",
      "name_in_current_account",
      "current_account_age",
      "current_account_turnover", // Current Account
      "saving_account_bank_name",
      "saving_account_turnover", // Saving Account
      "loan_provider_bank",
      "total_loan_amount_prev",
      "current_emi",
      "remaining_amount", // Previous Loan History
      "have_property_for_mortage",
      "property_location",
      "who_own_property",
      "have_17_kahta_agri_land",
      "needs_of_documents", // Property Information
    ],
    4:[
      "abhisel"
    ]
  };
  // Final submission handler from the dialog
  const handleFinalSubmit = async () => {
    // Validate all fields before final submission
    const fieldsToValidate = stepFields[step];
    const allFormErrors = validateAllFields(formData,fieldsToValidate);

    if (Object.keys(allFormErrors).length > 0) {
      setErrors(allFormErrors);
      setIsDialogOpen(false); // Close dialog to allow user to fix errors
      // Optionally, navigate to the first step with errors
      const firstErrorStep = loanSteps.findIndex((s) =>
        stepFields[loanSteps.indexOf(s)]?.some((field) => allFormErrors[field])
      );
      if (firstErrorStep !== -1) {
        setStep(firstErrorStep);
      }
      // Scroll to the first error if needed
      const firstErrorField = Object.keys(allFormErrors)[0];
      document.getElementById(firstErrorField)?.focus();
      return;
    }

    setIsSubmitting(true); // Show global loading indicator
    setIsDialogOpen(false); // Close the dialog

    const dataToSubmit = { ...formData }; // Create a mutable copy

    // Identify file fields to process
    const fileFields = [
      "offer_letter",
      "bank_statement",
      "applicant_selfie",
      "aadhar_front",
      "aadhar_back",
      "Personal_pan",
      "salary_slip_1",
      "salary_slip_2",
      "salary_slip_3",
      "other_doc",
    ];

    const uploadPromises = get_upload_promises(
      fileFields,
      formData,
      dataToSubmit
    );

    try {
      await Promise.all(uploadPromises); // Wait for all uploads to complete
      console.log("Final form data submitted to backend:", dataToSubmit);

      // Get ID token and submit loan data
      const token = await userState.user.getIdToken();
      userState.setShowLoader(true); // Assuming setShowLoader exists in your userState
      const res = await setLoanData(token, dataToSubmit, "Personal");

      alert("success");
      console.log(res);
      // userState.setInfo({ // Uncomment and implement if you have this logic
      //   desc: `You have successfully applied for Personal Loan with loan ID`,
      //   highlight: res.loanID,
      // });
      // userState.setShowInfo(true); // Uncomment and implement if you have this logic
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Submission failed. Please check console for details.");
    } finally {
      userState.setShowLoader(false); // Assuming setShowLoader exists in your userState
      setIsSubmitting(false); // Hide global loading indicator
    }
  };

  return (
    <div className="app-container px-8 py-4 rounded-md w-full flex flex-col gap-8">
      {/* Form Step Indicator */}
      <FormStepIndicator
        keys={[
          "Instruction",
          "Personal Details",
          "Employment & Loans",
          "Documents",
        ]}
        step={step}
      />

      {/* Render current form step component */}
      {(() => {
        switch (step) {
          case 0:
            return (
              <Instructions
                formData={formData}
                setFormData={setFormData}
                errors={errors}
              />
            );
          case 1:
            return (
              <PersonalDetails
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                setErrors={setErrors}
              />
            );
          case 2:
            return (
              <Employment
                formData={formData}
                setFormData={setFormData}
                errors={errors}
              />
            );
          case 3:
            return (
              <Documents
                formData={formData}
                setFormData={setFormData}
                errors={errors}
              />
            );
          default:
            return null;
        }
      })()}

      {/* Navigation Buttons */}
      <div className="flex w-full items-center justify-end gap-4">
        <Button
          className=""
          onClick={handlePrevious}
          disabled={step === 0 || isSubmitting}
        >
          Prev
        </Button>
        <Button
          className=""
          onClick={handleNext}
          disabled={step === loanSteps.length - 1 || isSubmitting}
        >
          Next
        </Button>
        {/* DialogTrigger wraps the Next/Submit button */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          {step === loanSteps.length - 1 ? (
            <DialogTrigger asChild>
              <Button className="" onClick={handleNext} disabled={isSubmitting}>
                Submit
              </Button>
            </DialogTrigger>
          ) : null}
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Confirm Your Application</DialogTitle>
              <DialogDescription>
                Please review your details before final submission. All fields
                are disabled for review.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              {Object.entries(formData).map(([key, value]) =>
                // Assuming renderDialogField is a utility that also handles errors if needed
                renderDialogField(key, value)
              )}
            </div>
            <DialogFooter>
              <Button
                type="button"
                onClick={handleFinalSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Final Submit"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Global Loading Dialog for submission */}
      <Dialog open={isSubmitting}>
        <DialogContent className="sm:max-w-md flex flex-col items-center justify-center py-8">
          <svg
            className="animate-spin h-10 w-10 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="mt-4 text-lg font-medium text-gray-700">
            Processing your application...
          </p>
        </DialogContent>
      </Dialog>

      {/* Display current form data for debugging purposes */}
      {/* <div className="mt-8 p-4 bg-gray-100 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold mb-3">
                    Current Form Data (for demonstration):
                </h3>
                <pre className="whitespace-pre-wrap text-sm text-gray-800">
                    {JSON.stringify(formData, null, 2)}
                </pre>
            </div> */}
    </div>
  );
}

export default Page;
