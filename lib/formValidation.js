// lib/formValidation.js
import { z } from "zod";

// Helper functions (still useful for custom Zod refinements or transformations)
const isValidPhone = (phone) => /^\d{10}$/.test(phone); // 10 digits
const isValidPan = (pan) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan); // Standard PAN format

// Function to calculate age from DOB
const calculateAge = (dobString) => {
    if (!dobString) return null;
    const birthDate = new Date(dobString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

// Define the Zod schema for the entire form
export const loanApplicationSchema = z.object({
    // Personal Details
    loan_amount: z.string()
        .min(1, "Loan Amount is required.")
        .refine(val => !isNaN(parseFloat(val)) && parseFloat(val) > 0, "Loan Amount must be a positive number."),
    id_of_connector: z.string().min(1, "ID of Connector is required."),
    name_of_connector: z.string().min(1, "Name of Connector is required."),
    purpose_of_loan: z.string().min(1, "Purpose of Loan is required."),
    Name: z.string()
        .min(1, "Name is required.")
        .min(2, "Name must be at least 2 characters."),
    fathers_name: z.string().min(1, "Father's Name is required."),
    mothers_name: z.string().min(1, "Mother's Name is required."),
    phone_no: z.string()
        .min(1, "Phone Number is required.")
        .refine(isValidPhone, "Invalid Phone Number (10 digits required)."),
    alt_phone_no: z.string().optional().refine(val => !val || isValidPhone(val), "Invalid Alternate Phone Number (10 digits required)."),
    pan: z.string()
        .min(1, "PAN Number is required.")
        .refine(isValidPan, "Invalid PAN Number format."),
    dob: z.string()
        .min(1, "Date of Birth is required.")
        .refine(val => calculateAge(val) !== null && calculateAge(val) >= 21, "Applicant must be at least 21 years old."),
    marital_status: z.string().min(1, "Marital Status is required."),
    spouse_name: z.string().optional(), // Now optional at this level, conditional logic in superRefine

    permanent_building_name: z.string().min(1, "Permanent Building/House Name is required."),
    permanent_street_name: z.string().min(1, "Permanent Street/Road Name is required."),
    permanent_landmark: z.string().optional(), // Assuming landmark is optional
    permanent_city: z.string().min(1, "Permanent City is required."),
    permanent_district: z.string().min(1, "Permanent District is required."),
    permanent_state: z.string().min(1, "Permanent State is required."),
    permanent_pincode: z.string()
        .min(1, "Permanent Pincode is required.")
        .refine(val => /^\d{6}$/.test(val), "Pincode must be 6 digits."),
    same_as_permanent_address: z.boolean(),

    present_building_name: z.string().optional(), // Conditional logic in superRefine
    present_street_name: z.string().optional(), // Conditional logic in superRefine
    present_landmark: z.string().optional(), // Still optional
    present_city: z.string().optional(), // Conditional logic in superRefine
    present_district: z.string().optional(), // Conditional logic in superRefine
    present_state: z.string().optional(), // Conditional logic in superRefine
    present_pincode: z.string().optional(), // Conditional logic in superRefine


    // Employment Details
    current_company_name: z.string().min(1, "Current Company Name is required."),
    salary_account_bank: z.string().min(1, "Salary Account Bank Name is required."),
    savings_account_bank: z.string().min(1, "Savings Account Bank Name is required."),
    job_tenure: z.string().min(1, "Job Tenure is required."),
    job_experience: z.string().min(1, "Job Experience is required."),
    monthly_income: z.string().min(1, "Monthly Income is required."),
    office_building_name: z.string().min(1, "Office Building/House Name is required."),
    office_street_name: z.string().min(1, "Office Street/Road Name is required."),
    office_landmark: z.string().optional(), // Assuming landmark is optional
    office_city: z.string().min(1, "Office City is required."),
    office_district: z.string().min(1, "Office District is required."),
    office_state: z.string().min(1, "Office State is required."),
    office_pincode: z.string()
        .min(1, "Office Pincode is required.")
        .refine(val => /^\d{6}$/.test(val), "Pincode must be 6 digits."),
    have_offer_letter: z.boolean(),
    offer_letter: z.any().optional(), // Conditional logic in superRefine
    have_tan_no: z.boolean(),
    tan_no: z.string().optional(), // Conditional logic in superRefine
    has_bank_statement: z.boolean(),
    bank_statement: z.any().optional(), // Conditional logic in superRefine
    has_current_loan: z.boolean(),
    existing_loans: z.string().optional(), // Conditional logic in superRefine
    total_loan_amount: z.string().optional(), // Conditional logic in superRefine
    loan_start_date: z.string().optional(), // Conditional logic in superRefine
    loan_provider_bank: z.string().optional(), // Conditional logic in superRefine
    monthly_emi: z.string().optional(), // Conditional logic in superRefine

    // Document Uploads
    applicant_selfie: z.any().refine(val => val instanceof File, "Applicant Selfie is required."),
    aadhar_front: z.any().refine(val => val instanceof File, "Aadhar Front image is required."),
    aadhar_back: z.any().refine(val => val instanceof File, "Aadhar Back image is required."),
    Personal_pan: z.any().refine(val => val instanceof File, "Personal PAN image is required."),
    salary_slip_1: z.any().refine(val => val instanceof File, "Salary Slip 1 is required."),
    salary_slip_2: z.any().refine(val => val instanceof File, "Salary Slip 2 is required."),
    salary_slip_3: z.any().refine(val => val instanceof File, "Salary Slip 3 is required."),
    other_doc: z.any().optional(), // Optional file upload
}).superRefine((data, ctx) => {
    // Conditional validations using superRefine
    if (data.marital_status === 'Married' && !data.spouse_name) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Spouse Name is required if married.",
            path: ['spouse_name'],
        });
    }

    if (!data.same_as_permanent_address) {
        if (!data.present_building_name) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Present Building/House Name is required.", path: ['present_building_name'] });
        if (!data.present_street_name) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Present Street/Road Name is required.", path: ['present_street_name'] });
        if (!data.present_city) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Present City is required.", path: ['present_city'] });
        if (!data.present_district) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Present District is required.", path: ['present_district'] });
        if (!data.present_state) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Present State is required.", path: ['present_state'] });
        if (!data.present_pincode) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Present Pincode is required.", path: ['present_pincode'] });
        } else if (!/^\d{6}$/.test(data.present_pincode)) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Pincode must be 6 digits.", path: ['present_pincode'] });
        }
    }

    if (data.have_offer_letter && !(data.offer_letter instanceof File)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Offer Letter is required.",
            path: ['offer_letter'],
        });
    }

    if (data.have_tan_no && !data.tan_no) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "TAN Number is required.",
            path: ['tan_no'],
        });
    }

    if (data.has_bank_statement && !(data.bank_statement instanceof File)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Bank Statement is required.",
            path: ['bank_statement'],
        });
    }

    if (data.has_current_loan) {
        if (!data.existing_loans || isNaN(parseInt(data.existing_loans)) || parseInt(data.existing_loans) < 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Number of existing loans is required and must be a non-negative number.",
                path: ['existing_loans'],
            });
        }
        if (!data.total_loan_amount) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Total loan amount is required.",
                path: ['total_loan_amount'],
            });
        }
        if (!data.loan_start_date) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Loan start date is required.",
                path: ['loan_start_date'],
            });
        }
        if (!data.loan_provider_bank) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Loan provider bank is required.",
                path: ['loan_provider_bank'],
            });
        }
        if (!data.monthly_emi || isNaN(parseFloat(data.monthly_emi)) || parseFloat(data.monthly_emi) <= 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Monthly EMI is required and must be a positive number.",
                path: ['monthly_emi'],
            });
        }
    }
});


// Define fields for each step for step-specific validation
export const stepFields = {
    0: [], // Instructions step has no input fields to validate for submission
    1: [ // Personal Details
        "loan_amount", "id_of_connector", "name_of_connector", "purpose_of_loan",
        "Name", "fathers_name", "mothers_name", "phone_no", "alt_phone_no",
        "pan", "dob", "marital_status", "spouse_name",
        "permanent_building_name", "permanent_street_name", "permanent_landmark",
        "permanent_city", "permanent_district", "permanent_state", "permanent_pincode",
        "present_building_name", "present_street_name", "present_landmark",
        "present_city", "present_district", "present_state", "present_pincode",
    ],
    2: [ // Employment & Loans
        "current_company_name", "salary_account_bank", "savings_account_bank",
        "job_tenure", "job_experience", "monthly_income",
        "office_building_name", "office_street_name", "office_landmark",
        "office_city", "office_district", "office_state", "office_pincode",
        "have_offer_letter", "offer_letter", "have_tan_no", "tan_no",
        "has_bank_statement", "bank_statement", "has_current_loan", "existing_loans",
        "total_loan_amount", "loan_start_date", "loan_provider_bank", "monthly_emi",
    ],
    3: [ // Documents
        "applicant_selfie", "aadhar_front", "aadhar_back", "Personal_pan",
        "salary_slip_1", "salary_slip_2", "salary_slip_3", "other_doc",
    ],
};

/**
 * Validates a subset of the form data using the Zod schema.
 * @param {object} formData - The current form data state.
 * @param {string[]} fieldNames - An array of field names to validate.
 * @returns {object} An object where keys are field names and values are error messages (or null).
 */
export const validateFields = (formData, fieldNames) => {

    const shape = fieldNames.reduce((acc, key) => {
         console.log(loanApplicationSchema._def.schema.shape[key]);
        // Ensure the key exists in the original schema to pick it
        if (loanApplicationSchema._def.schema.shape[key]) {
            acc[key] = loanApplicationSchema._def.schema.shape[key];
        }
        return acc;
    }, {});

    const subsetSchema = z.object(shape);

    const result = subsetSchema.safeParse(formData);
    const errors = {};
    if (!result.success) {
        result.error.errors.forEach(err => {
            if (err.path && err.path.length > 0) {
                errors[err.path[0]] = err.message;
            }
        });
    }
    return errors;
};

/**
 * Validates all fields in the form using the full Zod schema.
 * @param {object} formData - The current form data state.
 * @returns {object} An object where keys are field names and values are error messages (or null).
 */
export const validateAllFields = (formData) => {
    const result = loanApplicationSchema.safeParse(formData);
    const errors = {};
    if (!result.success) {
        result.error.errors.forEach(err => {
            if (err.path && err.path.length > 0) {
                errors[err.path[0]] = err.message;
            }
        });
    }
    return errors;
};
