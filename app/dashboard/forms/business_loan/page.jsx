"use client";

import React, { useState, useEffect } from "react";
import Instruction from "./instructions";
import PersonalDetails from "./personal_details";
import Employment from "./employment";
import Documents from "./documents";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  validateFields,
  validateAllFields,
  loanApplicationSchema,
} from "./formValidation"; // Corrected path to formValidation
import FormStepIndicator from "@/components/common/form_step_indicator";
import { renderDialogField } from "@/components/common/render_dialog_field";
// Removed import { Toaster } from "@/components/ui/toaster";
import { upload_doc } from "@/lib/actions/file"; // Assuming this is your file upload server action
import { setLoanData } from "@/lib/actions/loan"; // Assuming this is your loan data submission server action
import { useUserState } from "../../store"; // Assuming your user state management store
import { cn, get_upload_promises } from "@/lib/utils"; // Import cn for conditional classnames

const App = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    // Personal Details
    loan_amount: "",
    id_of_connector: "",
    name_of_connector: "",
    purpose_of_loan: "",
    applicant_name: "",
    fathers_name: "",
    mothers_name: "",
    phone_no: "",
    alt_phone_no: "",
    pan: "",
    dob: "",
    marital_status: "Unmarried",
    spouse_name: "",
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
    company_name: "",
    company_age: "",
    registration_paper: [],
    have_current_account: "No",
    current_account_bank_name: "",
    name_in_current_account: "",
    current_account_age: "",
    current_account_turnover: "",
    saving_account_bank_name: "",
    saving_account_turnover: "",
    loan_provider_bank: "",
    total_loan_amount: "",
    current_emi: "",
    remaining_amount: "",
    file_income_tax: "No",
    itr_1_upload: undefined,
    itr_2_upload: undefined,
    is_family_files_income_tax: "No",
    have_property_for_mortgage: "No",
    property_location: "",
    who_own_property: "",
    have_17_kahta_agri_land: "No",
    needs_of_documents: [],

    // Documents (File objects)
    aadhar_front: undefined,
    aadhar_back: undefined,
    personal_pan_upload: undefined,
    company_image: undefined,
    gst_certificate: undefined,
    udyam_registration: undefined,
    form_3: undefined,
    itr_2023_2024: undefined,
    itr_2024_2025: undefined,
    bank_statement: undefined,
    shop_front: undefined,
    house_electricity: undefined,
    other_doc: undefined,
  });

  const [errors, setErrors] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userState = useUserState(); // Initialize userState

  const formSteps = [
    { id: "instructions", title: "Instruction" },
    { id: "personal_details", title: "Personal Details" },
    { id: "employment", title: "Employment & Loans" },
    { id: "documents", title: "Documents" },
  ];

  const totalSteps = formSteps.length;

  // Define fields for each step for step-specific validation
  const stepFields = {
    0: [], // Instructions step has no input fields to validate for submission
    1: [
      // Personal Details
      "loan_amount",
      "id_of_connector",
      "name_of_connector",
      "purpose_of_loan",
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
    2: [
      // Employment & Loans
      "company_name",
      "company_age",
      "registration_paper",
      "have_current_account",
      "current_account_bank_name",
      "name_in_current_account",
      "current_account_age",
      "current_account_turnover",
      "saving_account_bank_name",
      "saving_account_turnover",
      "loan_provider_bank",
      "total_loan_amount",
      "current_emi",
      "remaining_amount",
      "file_income_tax",
      "itr_1_upload",
      "itr_2_upload",
      "is_family_files_income_tax",
      "have_property_for_mortgage",
      "property_location",
      "who_own_property",
      "have_17_kahta_agri_land",
      "needs_of_documents",
    ],
    3: [
      // Documents
      "aadhar_front",
      "aadhar_back",
      "personal_pan_upload",
      "company_image",
      "gst_certificate",
      "udyam_registration",
      "form_3",
      "itr_2023_2024",
      "itr_2024_2025",
      "bank_statement",
      "shop_front",
      "house_electricity",
      "other_doc",
    ],
  };

  const handleNext = () => {
    const fieldsToValidate = stepFields[step];
    // Validate only fields relevant to the current step
    const stepErrors = validateFields(formData, fieldsToValidate);

    if (Object.keys(stepErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...stepErrors }));
      const firstErrorField = Object.keys(stepErrors)[0];
      document.getElementById(firstErrorField)?.focus();
      return;
    }

    setErrors((prev) => {
      const newErrors = { ...prev };
      fieldsToValidate.forEach((field) => delete newErrors[field]);
      return newErrors;
    });

    if (step < totalSteps - 1) {
      setStep((prevStep) => prevStep + 1);
    } else {
      setIsDialogOpen(true);
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep((prevStep) => prevStep - 1);
      setErrors({});
    }
  };

  useEffect(() => {
    console.log("Current FormData:", formData);
  }, [formData]);

  // Final submission handler from the dialog
  const handleFinalSubmit = async () => {
    // Validate all fields before final submission
    const allFormErrors = validateAllFields(formData);

    if (Object.keys(allFormErrors).length > 0) {
      setErrors(allFormErrors);
      setIsDialogOpen(false); // Close dialog to allow user to fix errors
      // Optionally, navigate to the first step with errors
      const firstErrorStep = formSteps.findIndex((s) =>
        stepFields[formSteps.indexOf(s)]?.some((field) => allFormErrors[field])
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

    // Identify file fields to process based on the flat formData structure
    const fileFields = [
      "aadhar_front",
      "aadhar_back",
      "personal_pan_upload",
      "company_image",
      "gst_certificate",
      "udyam_registration",
      "form_3",
      "itr_2023_2024",
      "itr_2024_2025",
      "bank_statement",
      "shop_front",
      "house_electricity",
      "other_doc",
      "itr_1_upload", // From employment section
      "itr_2_upload", // From employment section
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
      const res = await setLoanData(token, dataToSubmit, "Business"); // Changed "Personal" to "Business"

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
      {/* A simple step indicator, replace with your FormStepIndicator if available */}
      <FormStepIndicator
        keys={[
          "Instruction",
          "Personal Details",
          "Employment & Loans",
          "Documents",
        ]}
        step={step}
      />

      {(() => {
        // Pass setFormData directly, and child components will update the flat state
        switch (step) {
          case 0:
            return <Instruction />;
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
            return <div>Form Section Not Found</div>;
        }
      })()}

      <div className="flex w-full items-center justify-end gap-4">
        <Button
          onClick={handlePrevious}
          disabled={step === 0 || isSubmitting}
          className="px-6 py-2 rounded-md transition-colors duration-200"
        >
          Previous
        </Button>
        {step < totalSteps - 1 ? (
          <Button
            onClick={handleNext}
            disabled={isSubmitting}
            className="px-6 py-2 rounded-md transition-colors duration-200"
          >
            Next
          </Button>
        ) : (
          <Button
            onClick={() => setIsDialogOpen(true)}
            disabled={isSubmitting}
            className="px-6 py-2 rounded-md transition-colors duration-200 bg-green-600 hover:bg-green-700"
          >
            Submit
          </Button>
        )}
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Confirm Your Application</DialogTitle>
            <DialogDescription>
              Please review your details before final submission.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            {Object.entries(formData).map(([key, value]) =>
              renderDialogField(key, value)
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              onClick={handleFinalSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Confirm & Submit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
    </div>
  );
};

export default App;
