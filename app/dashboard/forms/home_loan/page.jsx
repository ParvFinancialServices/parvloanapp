"use client";

import React, { useState, useEffect } from "react";
import Instruction from "./instructions";
import PersonalDetails from "./personal_details.jsx";
import Profession from "./profession"; // New component for profession details
import Documents from "./documents.jsx";
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
import { upload_doc } from "@/lib/actions/file";
import { setLoanData } from "@/lib/actions/loan";
import { useUserState } from "../../store";
import { cn, get_upload_promises } from "@/lib/utils";

const App = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    // Personal Details (Home Loan Specific)
    loan_amount: "",
    id_of_connector: "",
    name_of_connector: "",
    purpose_of_loan: "To purchase property", // Default from HomeLoan config
    loan_type: "", // New for Home Loan
    applicant_name: "",
    fathers_name: "",
    mothers_name: "",
    phone_no: "",
    email: "",
    alt_phone_no: "",
    pan: "",
    dob: "",
    marital_status: "Unmarried",
    spouse_name: "",
    // Present Address (using prefixes to avoid conflict with permanent)
    present_building_name: "",
    present_street_name: "",
    present_landmark: "",
    present_city: "",
    present_district: "",
    present_state: "",
    present_pincode: "",
    // Permanent Address (using prefixes)
    permanent_building_name: "",
    permanent_street_name: "",
    permanent_landmark: "",
    permanent_city: "",
    permanent_district: "",
    permanent_state: "",
    permanent_pincode: "",
    // Checkbox for same address
    same_as_permanent_address: false,

    // Profession Details (Home Loan Specific)
    current_company_name: "", // Job Details
    salary_account_bank: "", // Job Details
    savings_account_bank: "", // Job Details
    job_tenure: "0-12 months", // Job Details
    job_experience: "less than 1 year", // Job Details
    monthly_income: "less than 12,000", // Job Details
    company_name: "", // Business Details (re-used field name, but context is different)
    company_age: "", // Business Details
    registration_paper: [], // Business Details (multi-select)
    have_offer_letter: "No", // Documents (binary)
    have_tan_no: "No", // Documents (binary)
    has_salary_slip: "No", // Documents (binary)
    has_bank_statement: "No", // Documents (binary)
    has_current_loan: "No", // Documents (binary)
    total_loan_amount: "less than 50,000", // Current Loans
    loan_start_date: "0-12 months before", // Current Loans
    loan_provider_bank: "", // Current Loans
    monthly_emi: "", // Current Loans
    have_property_for_mortage: "No", // Property Information (binary)
    property_location: "", // Property Information (conditional)
    who_own_property: "", // Property Information (conditional)
    have_17_kahta_agri_land: "No", // Property Information (binary)
    needs_of_documents: [], // Property Information (multi-select)

    // Documents (File objects - Home Loan Specific)
    applicant_selfie: undefined,
    aadhar_front: undefined,
    aadhar_back: undefined,
    personal_pan_upload: undefined, // Corrected from 'persoanl_pan'
    company_image: undefined, // Corrected from 'comapny_image'
    gst_certificate: undefined,
    udyam_registration: undefined,
    form_3: undefined,
    itr_1: undefined, // ITR 2023-24
    itr_2: undefined, // ITR 2024-25
    bank_statement: undefined,
    shop_front: undefined,
    house_electricity: undefined,
    other_doc: undefined,
    rashid: undefined, // New for Home Loan Property Documents
  });

  const [errors, setErrors] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userState = useUserState();

  const formSteps = [
    { id: "instructions", title: "Instruction" },
    { id: "personal_details", title: "Personal Details" },
    { id: "profession", title: "Profession" }, // Changed from 'employment' to 'profession'
    { id: "documents", title: "Documents" },
  ];

  const totalSteps = formSteps.length;

  // Define fields for each step for step-specific validation
  const stepFields = {
    0: [], // Instructions
    1: [
      // Personal Details
      "loan_amount",
      "id_of_connector",
      "name_of_connector",
      "purpose_of_loan",
      "loan_type",
      "applicant_name",
      "fathers_name",
      "mothers_name",
      "phone_no",
      "email",
      "alt_phone_no",
      "pan",
      "dob",
      "marital_status",
      "spouse_name",
      "present_building_name",
      "present_street_name",
      "present_landmark",
      "present_city",
      "present_district",
      "present_state",
      "present_pincode",
      "permanent_building_name",
      "permanent_street_name",
      "permanent_landmark",
      "permanent_city",
      "permanent_district",
      "permanent_state",
      "permanent_pincode",
      "same_as_permanent_address",
    ],
    2: [
      // Profession
      "current_company_name",
      "salary_account_bank",
      "savings_account_bank",
      "job_tenure",
      "job_experience",
      "monthly_income",
      "company_name",
      "company_age",
      "registration_paper",
      "have_offer_letter",
      "have_tan_no",
      "has_salary_slip",
      "has_bank_statement",
      "has_current_loan",
      "total_loan_amount",
      "loan_start_date",
      "loan_provider_bank",
      "monthly_emi",
      "have_property_for_mortage",
      "property_location",
      "who_own_property",
      "have_17_kahta_agri_land",
      "needs_of_documents",
    ],
    3: [
      // Documents
      "applicant_selfie",
      "aadhar_front",
      "aadhar_back",
      "personal_pan_upload",
      "company_image",
      "gst_certificate",
      "udyam_registration",
      "form_3",
      "itr_1",
      "itr_2",
      "bank_statement",
      "shop_front",
      "house_electricity",
      "other_doc",
      "rashid",
    ],
  };

  const handleNext = () => {
    const fieldsToValidate = stepFields[step];
    const stepErrors = validateFields(formData, fieldsToValidate);
    // const stepErrors = {};

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

  const renderCurrentStepComponent = () => {
    const currentSectionId = formSteps[step].id;

    switch (currentSectionId) {
      case "instructions":
        return <Instruction />;
      case "personal_details":
        return (
          <PersonalDetails
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
          />
        );
      case "profession":
        return (
          <Profession
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
        ); // Render Profession component
      case "documents":
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
  };

  useEffect(() => {
    console.log("Current FormData:", formData);
  }, [formData]);

  const handleFinalSubmit = async () => {
    const allFormErrors = validateAllFields(formData);

    if (Object.keys(allFormErrors).length > 0) {
      setErrors(allFormErrors);
      setIsDialogOpen(false);
      const firstErrorStep = formSteps.findIndex((s) =>
        stepFields[formSteps.indexOf(s)]?.some((field) => allFormErrors[field])
      );
      if (firstErrorStep !== -1) {
        setStep(firstErrorStep);
      }
      const firstErrorField = Object.keys(allFormErrors)[0];
      document.getElementById(firstErrorField)?.focus();
      return;
    }

    setIsSubmitting(true);
    setIsDialogOpen(false);

    const dataToSubmit = { ...formData };

    // Updated fileFields for Home Loan
    const fileFields = [
      "applicant_selfie",
      "aadhar_front",
      "aadhar_back",
      "personal_pan_upload",
      "company_image",
      "gst_certificate",
      "udyam_registration",
      "form_3",
      "itr_1",
      "itr_2",
      "bank_statement",
      "shop_front",
      "house_electricity",
      "other_doc",
      "rashid", // New file field for Home Loan
    ];

    const uploadPromises = get_upload_promises(
      fileFields,
      formData,
      dataToSubmit
    );

    try {
      await Promise.all(uploadPromises);
      console.log("Final form data submitted to backend:", dataToSubmit);

      const token = await userState.user.getIdToken();
      userState.setShowLoader(true);
      const res = await setLoanData(token, dataToSubmit, "Home"); // Changed loan type to "Home"

      alert("success");
      console.log(res);
      // userState.setInfo({
      //   desc: `You have successfully applied for Home Loan with loan ID`,
      //   highlight: res.loanID,
      // });
      // userState.setShowInfo(true);
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Submission failed. Please check console for details.");
    } finally {
      userState.setShowLoader(false);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app-container px-8 py-4 rounded-md w-full flex flex-col gap-8">
      <FormStepIndicator
        keys={[
          "Instruction",
          "Personal Details",
          "Profession", // Updated step title
          "Documents",
        ]}
        step={step}
      />

      {renderCurrentStepComponent()}

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
