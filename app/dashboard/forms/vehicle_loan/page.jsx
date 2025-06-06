"use client";

import React, { useState, useEffect } from "react";
import Instruction from "./instructions"; // Re-using the existing Instruction component
import VehicleDetails from "./vehicle_details"; // New component for Vehicle Loan
import PersonalDetails from "./personal_details"; // Updated for Vehicle Loan
import Employment from "./employment"; // Updated for Vehicle Loan
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
  loanApplicationSchema, // This schema will be updated for Vehicle Loan
} from "./formValidation";
import FormStepIndicator from "@/components/common/form_step_indicator";
import { renderDialogField } from "@/components/common/render_dialog_field";
import { upload_doc } from "@/lib/actions/file"; // Keep if file uploads are needed
import { setLoanData } from "@/lib/actions/loan";
import { useUserState } from "../../store";
import { cn, get_upload_promises } from "@/lib/utils";
import { cn } from "@/lib/utils";
import Documents from "./documents";

const App = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    // Instructions (no direct form fields)

    // Vehicle Details
    which_vehicle: "",
    when_purchase: "",
    estimated_cost: "",
    loan_you_need: "",
    profession: "", // "Job", "Business", "Others"

    // co-applicant details
    co_applicant_dob:"",
    co_applicant_name:"",
    co_occupation:"",

    // Personal Details
    loan_amount: "", // Note: This is also in Vehicle Details, but keeping it flat here for simplicity
    id_of_connector: "",
    name_of_connector: "",
    applicant_name: "", // Renamed from 'Name' for consistency
    fathers_name: "",
    mothers_name: "",
    phone_no: "",
    alt_phone_no: "",
    pan: "",
    dob: "",
    marital_status: "Unmarried", // Default for binary
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

    // Employment & Loans -> Income Details (Business)
    company_name: "",
    company_age: "",
    registration_paper: [], // Multi-select checkbox values

    // Employment & Loans -> Income Details (Job)
    current_company_name: "",
    salary_account_bank: "",
    savings_account_bank: "",
    job_tenure: "",
    job_experience: "",
    monthly_income: "",

    // Employment & Loans -> Current Account's
    have_current_account: "No", // Binary
    current_account_bank_name: "",
    name_in_current_account: "",
    current_account_age: "",
    current_account_turnover: "",

    // Employment & Loans -> Saving account
    saving_account_bank_name: "",
    saving_account_turnover: "",

    // Employment & Loans -> Previous Loan History
    loan_provider_bank: "", // Note: This is also in Gold Loan, but context is different
    total_loan_amount_prev: "", // Renamed to avoid conflict with initial loan_amount
    current_emi: "",
    remaining_amount: "",

    // Employment & Loans -> Property Information
    have_property_for_mortage: "No", // Binary
    property_location: "",
    who_own_property: "",
    have_17_kahta_agri_land: "No", // Binary
    needs_of_documents: [], // Multi-select checkbox values

    // Documents (No explicit document section in config, assuming no file uploads for now)
    applicant_selfie:"",
    aadhar_front:"",
    aadhar_back:"",
    personal_pan:"",
    address_prooof:"",
    coapplicant_aadhar_front:"",
    coapplicant_aadhar_back:"",
    coapplicant_pan:"",
    salary_slip_1:"",
    salary_slip_2:"",
    salary_slip_3:"",
    form_16_itr_1:"",
    form_16_itr_2:"",
    electricity_bill:"",
    business_images:"",
    business_proof:"",
    itr_1:"",
    itr_2:"",
    another_1:"",
    another_2:"",
    another_3:"",

    sale_deed:"",
    mutation:"",
    rashid:"",
    lpc:"",
    property_pic:"",
    property_map:"",
    chain_deed:"",

  });

  const [errors, setErrors] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userState = useUserState();

  const formSteps = [
    { id: "instructions", title: "Instruction" },
    { id: "vehicle_details", title: "Vehicle Details" },
    { id: "personal_details", title: "Personal Details" },
    { id: "employment", title: "Employment & Loans" },
    { id: "documents", title: "Documents" },
  ];

  const totalSteps = formSteps.length;

  // Define fields for each step for step-specific validation for Vehicle Loan
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

  // No file uploads explicitly defined in VehicleLoan config, so this array is empty
  const fileFields = [];

  const handleNext = () => {
    const fieldsToValidate = stepFields[step];
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

  const renderCurrentStepComponent = () => {
    const currentSectionId = formSteps[step].id;

    switch (currentSectionId) {
      case "instructions":
        return <Instruction />;
      case "vehicle_details":
        return (
          <VehicleDetails
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
        );
      case "personal_details":
        return (
          <PersonalDetails
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
          />
        );
      case "employment":
        return (
          <Employment
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
        );
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
      const res = await setLoanData(token, dataToSubmit, "Vehicle"); // Changed loan type to "Vehicle"

      alert("success");
      console.log(res);
      // userState.setInfo({
      //   desc: `You have successfully applied for Vehicle Loan with loan ID`,
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
          "Vehicle Details",
          "Personal Details",
          "Employment & Loans",
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
