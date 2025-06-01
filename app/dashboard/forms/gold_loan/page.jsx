"use client";

import React, { useState, useEffect } from "react";
import Instruction from "./instructions"; // Re-using the existing Instruction component
import PersonalDetails from "./personal_details"; // Updated for Gold Loan
import Employment from "./employment"; // Updated for Gold Loan (previously Profession for HomeLoan)
import Documents from "./documents"; // Updated for Gold Loan
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
    loanApplicationSchema, // This schema will be updated for Gold Loan
} from "./formValidation";
import FormStepIndicator from "@/components/common/form_step_indicator";
import { renderDialogField } from "@/components/common/render_dialog_field";
import { upload_doc } from "@/lib/actions/file";
import { setLoanData } from "@/lib/actions/loan";
import { useUserState } from "../../store";
import { cn } from "@/lib/utils";

const App = () => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        // Personal Details (Gold Loan Specific)
        loan_amount: "",
        id_of_connector: "",
        name_of_connector: "",
        applicant_name: "",
        fathers_name: "",
        mothers_name: "",
        phone_no: "",
        alt_phone_no: "",
        pan: "",
        dob: "",
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

        // Employment & Loans (Gold Loan Specific)
        saving_account_bank_name: "",
        saving_account_turnover: "Less than 10 lakhs", // Default value
        total_loan_amount: "less than 50,000", // Default value
        loan_start_date: "0-12 months before", // Default value
        loan_provider_bank: "",
        monthly_emi: "",

        // Documents (File objects - Gold Loan Specific)
        aadhar_front: undefined,
        aadhar_back: undefined,
        personal_pan_upload: undefined, // Renamed from Personal_pan for consistency and clarity
        house_electricity: undefined,
    });

    const [errors, setErrors] = useState({});
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const userState = useUserState();

    const formSteps = [
        { id: "instructions", title: "Instruction" },
        { id: "personal_details", title: "Personal Details" },
        { id: "employment", title: "Employment & Loans" }, // Changed from 'profession'
        { id: "documents", title: "Documents" },
    ];

    const totalSteps = formSteps.length;

    // Define fields for each step for step-specific validation for Gold Loan
    const stepFields = {
        0: [], // Instructions
        1: [ // Personal Details
            "loan_amount", "id_of_connector", "name_of_connector",
            "applicant_name", "fathers_name", "mothers_name", "phone_no", "alt_phone_no",
            "pan", "dob",
            "present_building_name", "present_street_name", "present_landmark", "present_city",
            "present_district", "present_state", "present_pincode",
            "permanent_building_name", "permanent_street_name", "permanent_landmark", "permanent_city",
            "permanent_district", "permanent_state", "permanent_pincode",
            "same_as_permanent_address",
        ],
        2: [ // Employment & Loans
            "saving_account_bank_name", "saving_account_turnover",
            "total_loan_amount", "loan_start_date", "loan_provider_bank", "monthly_emi",
        ],
        3: [ // Documents
            "aadhar_front", "aadhar_back", "personal_pan_upload", "house_electricity",
        ],
    };

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
            case 'instructions':
                return <Instruction />;
            case 'personal_details':
                return <PersonalDetails formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />;
            case 'employment':
                return <Employment formData={formData} setFormData={setFormData} errors={errors} />;
            case 'documents':
                return <Documents formData={formData} setFormData={setFormData} errors={errors} />;
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

        // File fields for Gold Loan
        const fileFields = [
            "aadhar_front",
            "aadhar_back",
            "personal_pan_upload",
            "house_electricity",
        ];

        const uploadPromises = fileFields.map(async (fieldName) => {
            const file = formData[fieldName];
            if (file instanceof File) {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = async (result) => {
                        try {
                            const uploadedUrl = await upload_doc({
                                file: result.target.result,
                                folder: "Rishab", // Assuming a folder for uploads
                            });
                            dataToSubmit[fieldName] = uploadedUrl.secure_url;
                            resolve();
                        } catch (error) {
                            console.error(`Error uploading ${fieldName}:`, error);
                            reject(error);
                        }
                    };
                    reader.onerror = (error) => {
                        console.error(`FileReader error for ${fieldName}:`, error);
                        reject(error);
                    };
                    reader.readAsDataURL(file);
                });
            }
            return Promise.resolve();
        });

        try {
            await Promise.all(uploadPromises);
            console.log("Final form data submitted to backend:", dataToSubmit);

            const token = await userState.user.getIdToken();
            userState.setShowLoader(true);
            const res = await setLoanData(token, dataToSubmit, "Gold"); // Changed loan type to "Gold"

            alert("success");
            console.log(res);
            // userState.setInfo({
            //   desc: `You have successfully applied for Gold Loan with loan ID`,
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
                    "Employment & Loans", // Updated step title
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
