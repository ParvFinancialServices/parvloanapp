import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";

const Section = ({ title, children }) => (
    <Card className="mb-6 shadow-md">
        <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">{title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
        </CardContent>
    </Card>
);
const DocumentSection = ({ title, children }) => (
    <Card className="mb-6 shadow-md">
        <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">{title}</h2>
            <div className="grid grid-cols-1 gap-4">{children}</div>
        </CardContent>
    </Card>
);

const Field = ({ label, value }) => (
    <div>
        <Label className="text-sm text-muted-foreground mb-1 block">{label}</Label>
        <div className="text-sm text-gray-900 font-medium bg-gray-50 p-2 rounded-md border">{value || "-"}</div>
    </div>
);

const DocumentPreview = ({ label, src }) => (
    <div>
        <Label className="text-sm text-muted-foreground mb-1 block">{label}</Label>
        {src ? (
            <Link href={src}>
                <img
                    src={src}
                    alt={label}
                    width={100}
                    height={100}
                    className="rounded-md w-32 h-32 border object-cover"
                />
            </Link>
        ) : (
            <div className="text-sm w-32 h-32 rounded-md bg-gray-100 flex justify-center items-center text-gray-500">Not uploaded</div>
        )}
    </div>
);

const LoanDetailsView = ({ data }) => {
    return (
        <div className="container mx-auto px-4 py-6">

            {/* Vehicle Details */}
            {
                (data.which_vehicle || data.when_purchase || data.estimated_cost || data.loan_you_need || data?.profession)
                &&
                <Section title="Vehicle Details">
                    {data.which_vehicle && <Field label="Which Vehicle" value={data.which_vehicle} />}
                    {data.when_purchase && <Field label="When Purchased" value={data.when_purchase} />}
                    {data.estimated_cost && <Field label="Estimated Cost" value={data.estimated_cost} />}
                    {data.loan_you_need && <Field label="Loan You Need" value={data.loan_you_need} />}
                    {data.profession && <Field label="Profession" value={data.profession} />}
                </Section>
            }


            {/* Co-applicant Details */}
            {
                (data.co_applicant_name || data.co_applicant_dob || data.co_occupation)
                &&
                <Section title="Co-applicant Details">
                    {data.co_applicant_name && <Field label="Co-applicant Name" value={data.co_applicant_name} />}
                    {data.co_applicant_dob && <Field label="DOB" value={data.co_applicant_dob} />}
                    {data.co_occupation && <Field label="Occupation" value={data.co_occupation} />}
                </Section>
            }


            {/* Personal Details */}
            <Section title="Personal Details">
                {data.applicant_name && <Field label="Applicant Name" value={data.applicant_name} />}
                {data.fathers_name && <Field label="Father's Name" value={data.fathers_name} />}
                {data.mothers_name && <Field label="Mother's Name" value={data.mothers_name} />}
                {data.phone_no && <Field label="Phone No" value={data.phone_no} />}
                {data.alt_phone_no && <Field label="Alternate Phone No" value={data.alt_phone_no} />}
                {data.pan && <Field label="PAN" value={data.pan} />}
                {data.dob && <Field label="Date of Birth" value={data.dob} />}
                {data.marital_status && <Field label="Marital Status" value={data.marital_status} />}
                {data.spouse_name && <Field label="Spouse Name" value={data.spouse_name} />}
                {data.id_of_connector && <Field label="Connector ID" value={data.id_of_connector} />}
                {data.name_of_connector && <Field label="Connector Name" value={data.name_of_connector} />}
            </Section>

            {/* Permanent Address */}
            <Section title="Permanent Address">
                {data.permanent_building_name && <Field label="Building" value={data.permanent_building_name} />}
                {data.permanent_street_name && <Field label="Street" value={data.permanent_street_name} />}
                {data.permanent_landmark && <Field label="Landmark" value={data.permanent_landmark} />}
                {data.permanent_city && <Field label="City" value={data.permanent_city} />}
                {data.permanent_district && <Field label="District" value={data.permanent_district} />}
                {data.permanent_state && <Field label="State" value={data.permanent_state} />}
                {data.permanent_pincode && <Field label="Pincode" value={data.permanent_pincode} />}
            </Section>

            {/* Present Address */}
            <Section title="Present Address">
                {data.present_building_name && <Field label="Building" value={data.present_building_name} />}
                {data.present_street_name && <Field label="Street" value={data.present_street_name} />}
                {data.present_landmark && <Field label="Landmark" value={data.present_landmark} />}
                {data.present_city && <Field label="City" value={data.present_city} />}
                {data.present_district && <Field label="District" value={data.present_district} />}
                {data.present_state && <Field label="State" value={data.present_state} />}
                {data.present_pincode && <Field label="Pincode" value={data.present_pincode} />}
            </Section>

            {/* Job Details */}
            <Section title="Job Details">
                {data.current_company_name && <Field label="Current Company" value={data.current_company_name} />}
                {data.salary_account_bank && <Field label="Salary Account Bank" value={data.salary_account_bank} />}
                {data.savings_account_bank && <Field label="Savings Account Bank" value={data.savings_account_bank} />}
                {data.job_tenure && <Field label="Job Tenure" value={data.job_tenure} />}
                {data.job_experience && <Field label="Job Experience" value={data.job_experience} />}
                {data.monthly_income && <Field label="Monthly Income" value={data.monthly_income} />}
            </Section>

            {/* Business Details */}
            <Section title="Business Details">
                {data.company_name && <Field label="Company Name" value={data.company_name} />}
                {data.company_age && <Field label="Company Age" value={data.company_age} />}
                {data.registration_paper?.length > 0 && (
                    <Field label="Registration Paper" value={data.registration_paper.join(", ")} />
                )}
            </Section>

            {/* Loan History */}
            <Section title="Loan History">
                {data.loan_provider_bank && <Field label="Loan Provider Bank" value={data.loan_provider_bank} />}
                {data.total_loan_amount_prev && <Field label="Previous Loan Amount" value={data.total_loan_amount_prev} />}
                {data.current_emi && <Field label="Current EMI" value={data.current_emi} />}
                {data.remaining_amount && <Field label="Remaining Loan Amount" value={data.remaining_amount} />}
            </Section>

            {/* Property Info */}
            <Section title="Property Information">
                {data.have_property_for_mortage && <Field label="Have Property for Mortgage" value={data.have_property_for_mortage} />}
                {data.property_location && <Field label="Property Location" value={data.property_location} />}
                {data.who_own_property && <Field label="Who Owns Property" value={data.who_own_property} />}
                {data.have_17_kahta_agri_land && <Field label="17 Kahta Agri Land" value={data.have_17_kahta_agri_land} />}
                {data.needs_of_documents?.length > 0 && (
                    <Field label="Needs of Documents" value={data.needs_of_documents.join(", ")} />
                )}
            </Section>

            {/* Bank Account Info */}
            <Section title="Bank Accounts">
                {data.have_current_account && <Field label="Have Current Account" value={data.have_current_account} />}
                {data.current_account_bank_name && <Field label="Current Account Bank" value={data.current_account_bank_name} />}
                {data.name_in_current_account && <Field label="Name in Account" value={data.name_in_current_account} />}
                {data.current_account_age && <Field label="Account Age" value={data.current_account_age} />}
                {data.current_account_turnover && <Field label="Account Turnover" value={data.current_account_turnover} />}
                {data.saving_account_bank_name && <Field label="Saving Account Bank" value={data.saving_account_bank_name} />}
                {data.saving_account_turnover && <Field label="Saving Account Turnover" value={data.saving_account_turnover} />}
            </Section>

            <DocumentSection title={"Uploaded Documents"}>
                <div className="grid lg:grid-cols-5 w-full space-y-6 p-6 ">
                    <DocumentPreview label="Applicant Selfie" src={data?.applicant_selfie} />
                    <DocumentPreview label="Aadhar Front" src={data.aadhar_front} />
                    <DocumentPreview label="Aadhar Back" src={data.aadhar_back} />
                    <DocumentPreview label="PAN" src={data.personal_pan} />
                    <DocumentPreview label="Coapplicant Aadhar Front" src={data.coapplicant_aadhar_front} />
                    <DocumentPreview label="Coapplicant Aadhar Back" src={data.coapplicant_aadhar_back} />
                    <DocumentPreview label="Coapplicant PAN" src={data.coapplicant_pan} />
                    <DocumentPreview label="Salary Slip 1" src={data.salary_slip_1} />
                    <DocumentPreview label="Form 16 / ITR 1" src={data.form_16_itr_1} />
                    <DocumentPreview label="Electricity Bill" src={data.electricity_bill} />
                    <DocumentPreview label="Business Images" src={data.business_images} />
                    <DocumentPreview label="Sale Deed" src={data.sale_deed} />
                    <DocumentPreview label="Mutation" src={data.mutation} />
                    <DocumentPreview label="LPC" src={data.lpc} />
                </div>
            </DocumentSection>
        </div>
    );
};

export default LoanDetailsView;
