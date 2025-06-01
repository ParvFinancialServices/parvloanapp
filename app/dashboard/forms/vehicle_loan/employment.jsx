import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

const Employment = ({ formData, setFormData, errors }) => {
    const handleFieldChange = (fieldName, value) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: value
        }));
    };

    const handleMultiOptionChange = (id, optionValue, isChecked) => {
        setFormData(prev => {
            const currentValues = prev[id] || [];
            let newValues;
            if (isChecked) {
                newValues = [...currentValues, optionValue];
            } else {
                newValues = currentValues.filter(val => val !== optionValue);
            }
            return {
                ...prev,
                [id]: newValues
            };
        });
    };

    return (
         <div className="mb-8 pb-6 border-b border-gray-200">

            {/* Income Details Section - Conditional based on profession */}
            {(formData.profession === "Business" || formData.profession === "Job") && (
                <div className="mb-8 pb-6 border-b border-gray-200">
                    <h3 className="text-xl font-medium tracking-tight mb-4">Income Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {formData.profession === "Business" && (
                            <>
                                <div className="space-y-2">
                                    <Label htmlFor="company_name">Company / firm Name</Label>
                                    <Input
                                        type="text"
                                        id="company_name"
                                        value={formData.company_name || ''}
                                        onChange={(e) => handleFieldChange('company_name', e.target.value)}
                                        className={cn(errors.company_name && "border-red-500 focus-visible:ring-red-500")}
                                    />
                                    {errors.company_name && <p className="text-red-500 text-xs mt-1">{errors.company_name}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="company_age">How old your business?</Label>
                                    <Select
                                        onValueChange={(value) => handleFieldChange('company_age', value)}
                                        value={formData.company_age || ''}
                                    >
                                        <SelectTrigger id="company_age" className={cn("w-full", errors.company_age && "border-red-500 focus-visible:ring-red-500")}>
                                            <SelectValue placeholder="Select age" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="0-1 years">0-1 years</SelectItem>
                                            <SelectItem value="1-3 years">1-3 years</SelectItem>
                                            <SelectItem value="3-5 years">3-5 years</SelectItem>
                                            <SelectItem value="more than 5 years">more than 5 years</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.company_age && <p className="text-red-500 text-xs mt-1">{errors.company_age}</p>}
                                </div>
                                <div className="space-y-2 col-span-full">
                                    <Label>Select registration paper you have for your business?</Label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {[
                                            "GST registration",
                                            "UDYOG AAdhar registration",
                                            "Form-3 or trade licence",
                                            "any other",
                                            "I don't have any registartion",
                                        ].map((optionLabel) => (
                                            <div key={optionLabel} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`registration_paper_${optionLabel.replace(/\s+/g, "_").replace(/[\(\)]/g, "")}`}
                                                    checked={formData.registration_paper?.includes(optionLabel) || false}
                                                    onCheckedChange={(checked) => handleMultiOptionChange("registration_paper", optionLabel, checked)}
                                                />
                                                <Label htmlFor={`registration_paper_${optionLabel.replace(/\s+/g, "_").replace(/[\(\)]/g, "")}`}>
                                                    {optionLabel}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                    {errors.registration_paper && <p className="text-red-500 text-xs mt-1">{errors.registration_paper}</p>}
                                </div>
                            </>
                        )}

                        {formData.profession === "Job" && (
                            <>
                                <div className="space-y-2">
                                    <Label htmlFor="current_company_name">Current Company Name</Label>
                                    <Input
                                        type="text"
                                        id="current_company_name"
                                        value={formData.current_company_name || ''}
                                        onChange={(e) => handleFieldChange('current_company_name', e.target.value)}
                                        className={cn(errors.current_company_name && "border-red-500 focus-visible:ring-red-500")}
                                    />
                                    {errors.current_company_name && <p className="text-red-500 text-xs mt-1">{errors.current_company_name}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="salary_account_bank">Salary Account Bank Name</Label>
                                    <Input
                                        type="text"
                                        id="salary_account_bank"
                                        value={formData.salary_account_bank || ''}
                                        onChange={(e) => handleFieldChange('salary_account_bank', e.target.value)}
                                        className={cn(errors.salary_account_bank && "border-red-500 focus-visible:ring-red-500")}
                                    />
                                    {errors.salary_account_bank && <p className="text-red-500 text-xs mt-1">{errors.salary_account_bank}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="savings_account_bank">Savings Account Bank Name</Label>
                                    <Input
                                        type="text"
                                        id="savings_account_bank"
                                        value={formData.savings_account_bank || ''}
                                        onChange={(e) => handleFieldChange('savings_account_bank', e.target.value)}
                                        className={cn(errors.savings_account_bank && "border-red-500 focus-visible:ring-red-500")}
                                    />
                                    {errors.savings_account_bank && <p className="text-red-500 text-xs mt-1">{errors.savings_account_bank}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="job_tenure">Job tenure in current company</Label>
                                    <Select
                                        onValueChange={(value) => handleFieldChange('job_tenure', value)}
                                        value={formData.job_tenure || ''}
                                    >
                                        <SelectTrigger id="job_tenure" className={cn("w-full", errors.job_tenure && "border-red-500 focus-visible:ring-red-500")}>
                                            <SelectValue placeholder="Select tenure" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="0-12 months">0-12 months</SelectItem>
                                            <SelectItem value="12-24 months">12-24 months</SelectItem>
                                            <SelectItem value="24-60 months">24-60 months</SelectItem>
                                            <SelectItem value="more than 60 months">more than 60 months</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.job_tenure && <p className="text-red-500 text-xs mt-1">{errors.job_tenure}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="job_experience">Experience</Label>
                                    <Select
                                        onValueChange={(value) => handleFieldChange('job_experience', value)}
                                        value={formData.job_experience || ''}
                                    >
                                        <SelectTrigger id="job_experience" className={cn("w-full", errors.job_experience && "border-red-500 focus-visible:ring-red-500")}>
                                            <SelectValue placeholder="Select experience" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="less than 1 year">less than 1 year</SelectItem>
                                            <SelectItem value="1-2 years">1-2 years</SelectItem>
                                            <SelectItem value="2-3 years">2-3 years</SelectItem>
                                            <SelectItem value="3-5 years">3-5 years</SelectItem>
                                            <SelectItem value="more than 5 years">more than 5 years</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.job_experience && <p className="text-red-500 text-xs mt-1">{errors.job_experience}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="monthly_income">Your Monthly Income</Label>
                                    <Select
                                        onValueChange={(value) => handleFieldChange('monthly_income', value)}
                                        value={formData.monthly_income || ''}
                                    >
                                        <SelectTrigger id="monthly_income" className={cn("w-full", errors.monthly_income && "border-red-500 focus-visible:ring-red-500")}>
                                            <SelectValue placeholder="Select income" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="less than 12,000">less than 12,000</SelectItem>
                                            <SelectItem value="15,000 - 20,000">15,000 - 20,000</SelectItem>
                                            <SelectItem value="20,000 - 25,000">20,000 - 25,000</SelectItem>
                                            <SelectItem value="25-000 - 30,000">25-000 - 30,000</SelectItem>
                                            <SelectItem value="30,000 - 35,000">30,000 - 35,000</SelectItem>
                                            <SelectItem value="35,000 - 45,000">35,000 - 45,000</SelectItem>
                                            <SelectItem value="above 45,000">above 45,000</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.monthly_income && <p className="text-red-500 text-xs mt-1">{errors.monthly_income}</p>}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}


            {/* Current Account's Section */}
            <div className="mb-8 pb-6 border-b border-gray-200">
                <h3 className="text-xl font-medium tracking-tight mb-4">Current Account's</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 col-span-full">
                        <Label>Do you have current account?</Label>
                        <RadioGroup
                            onValueChange={(value) => handleFieldChange('have_current_account', value)}
                            value={formData.have_current_account || 'No'}
                            className={cn("flex items-center space-x-4", errors.have_current_account && "border border-red-500 p-2 rounded-md")}
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Yes" id="have_current_account_yes" />
                                <Label htmlFor="have_current_account_yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="No" id="have_current_account_no" />
                                <Label htmlFor="have_current_account_no">No</Label>
                            </div>
                        </RadioGroup>
                        {errors.have_current_account && <p className="text-red-500 text-xs mt-1">{errors.have_current_account}</p>}
                    </div>

                    {formData.have_current_account === "Yes" && (
                        <>
                            <div className="space-y-2">
                                <Label htmlFor="current_account_bank_name">Bank name in which your current account.</Label>
                                <Input
                                    type="text"
                                    id="current_account_bank_name"
                                    value={formData.current_account_bank_name || ''}
                                    onChange={(e) => handleFieldChange('current_account_bank_name', e.target.value)}
                                    className={cn(errors.current_account_bank_name && "border-red-500 focus-visible:ring-red-500")}
                                />
                                {errors.current_account_bank_name && <p className="text-red-500 text-xs mt-1">{errors.current_account_bank_name}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="name_in_current_account">In whose name is the current account?</Label>
                                <Select
                                    onValueChange={(value) => handleFieldChange('name_in_current_account', value)}
                                    value={formData.name_in_current_account || ''}
                                >
                                    <SelectTrigger id="name_in_current_account" className={cn("w-full", errors.name_in_current_account && "border-red-500 focus-visible:ring-red-500")}>
                                        <SelectValue placeholder="Select name" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="My business">My business</SelectItem>
                                        <SelectItem value="Myself">Myself</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.name_in_current_account && <p className="text-red-500 text-xs mt-1">{errors.name_in_current_account}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="current_account_age">How old is your current account?</Label>
                                <Select
                                    onValueChange={(value) => handleFieldChange('current_account_age', value)}
                                    value={formData.current_account_age || ''}
                                >
                                    <SelectTrigger id="current_account_age" className={cn("w-full", errors.current_account_age && "border-red-500 focus-visible:ring-red-500")}>
                                        <SelectValue placeholder="Select age" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Less than 1 year">Less than 1 year</SelectItem>
                                        <SelectItem value="1-3 years">1-3 years</SelectItem>
                                        <SelectItem value="3-5 years">3-5 years</SelectItem>
                                        <SelectItem value="more than years">more than years</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.current_account_age && <p className="text-red-500 text-xs mt-1">{errors.current_account_age}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="current_account_turnover">What is the turnover of your current account?</Label>
                                <Select
                                    onValueChange={(value) => handleFieldChange('current_account_turnover', value)}
                                    value={formData.current_account_turnover || ''}
                                >
                                    <SelectTrigger id="current_account_turnover" className={cn("w-full", errors.current_account_turnover && "border-red-500 focus-visible:ring-red-500")}>
                                        <SelectValue placeholder="Select turnover" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Below 10 lakhs">Below 10 lakhs</SelectItem>
                                        <SelectItem value="10-20 lakhs">10-20 lakhs</SelectItem>
                                        <SelectItem value="20-30 lakhs">20-30 lakhs</SelectItem>
                                        <SelectItem value="30-50 lakhs">30-50 lakhs</SelectItem>
                                        <SelectItem value="50-70 lakhs">50-70 lakhs</SelectItem>
                                        <SelectItem value="70-1 crore">70-1 crore</SelectItem>
                                        <SelectItem value="above 1 crore">above 1 crore</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.current_account_turnover && <p className="text-red-500 text-xs mt-1">{errors.current_account_turnover}</p>}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Saving Account Section */}
            <div className="mb-8 pb-6 border-b border-gray-200">
                <h3 className="text-xl font-medium tracking-tight mb-4">Saving account</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="saving_account_bank_name">Bank name in which your saving account.</Label>
                        <Input
                            type="text"
                            id="saving_account_bank_name"
                            value={formData.saving_account_bank_name || ''}
                            onChange={(e) => handleFieldChange('saving_account_bank_name', e.target.value)}
                            className={cn(errors.saving_account_bank_name && "border-red-500 focus-visible:ring-red-500")}
                        />
                        {errors.saving_account_bank_name && <p className="text-red-500 text-xs mt-1">{errors.saving_account_bank_name}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="saving_account_turnover">Turnover of your saving account</Label>
                        <Select
                            onValueChange={(value) => handleFieldChange('saving_account_turnover', value)}
                            value={formData.saving_account_turnover || ''}
                        >
                            <SelectTrigger id="saving_account_turnover" className={cn("w-full", errors.saving_account_turnover && "border-red-500 focus-visible:ring-red-500")}>
                                <SelectValue placeholder="Select turnover" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Less than 10 lakhs">Less than 10 lakhs</SelectItem>
                                <SelectItem value="10-20 lakhs">10-20 lakhs</SelectItem>
                                <SelectItem value="20-50 lakhs">20-50 lakhs</SelectItem>
                                <SelectItem value="50-1 crore">50-1 crore</SelectItem>
                                <SelectItem value="above 1 crore">above 1 crore</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.saving_account_turnover && <p className="text-red-500 text-xs mt-1">{errors.saving_account_turnover}</p>}
                    </div>
                </div>
            </div>

            {/* Previous Loan History Section */}
            <div className="mb-8 pb-6 border-b border-gray-200">
                <h3 className="text-xl font-medium tracking-tight mb-4">Previous Loan History</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="loan_provider_bank">Bank name which provides you loan?</Label>
                        <Input
                            type="text"
                            id="loan_provider_bank"
                            value={formData.loan_provider_bank || ''}
                            onChange={(e) => handleFieldChange('loan_provider_bank', e.target.value)}
                            className={cn(errors.loan_provider_bank && "border-red-500 focus-visible:ring-red-500")}
                        />
                        {errors.loan_provider_bank && <p className="text-red-500 text-xs mt-1">{errors.loan_provider_bank}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="total_loan_amount_prev">Total loan amount</Label>
                        <Input
                            type="text"
                            id="total_loan_amount_prev"
                            value={formData.total_loan_amount_prev || ''}
                            onChange={(e) => handleFieldChange('total_loan_amount_prev', e.target.value)}
                            className={cn(errors.total_loan_amount_prev && "border-red-500 focus-visible:ring-red-500")}
                        />
                        {errors.total_loan_amount_prev && <p className="text-red-500 text-xs mt-1">{errors.total_loan_amount_prev}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="current_emi">Current EMI</Label>
                        <Input
                            type="text"
                            id="current_emi"
                            value={formData.current_emi || ''}
                            onChange={(e) => handleFieldChange('current_emi', e.target.value)}
                            className={cn(errors.current_emi && "border-red-500 focus-visible:ring-red-500")}
                        />
                        {errors.current_emi && <p className="text-red-500 text-xs mt-1">{errors.current_emi}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="remaining_amount">Remaining amount</Label>
                        <Input
                            type="text"
                            id="remaining_amount"
                            value={formData.remaining_amount || ''}
                            onChange={(e) => handleFieldChange('remaining_amount', e.target.value)}
                            className={cn(errors.remaining_amount && "border-red-500 focus-visible:ring-red-500")}
                        />
                        {errors.remaining_amount && <p className="text-red-500 text-xs mt-1">{errors.remaining_amount}</p>}
                    </div>
                </div>
            </div>

            {/* Property Information Section */}
            <div className="mb-8 pb-6">
                <h3 className="text-xl font-medium tracking-tight mb-4">Property Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 col-span-full">
                        <Label>Do you have any property which you can give for mortgage?</Label>
                        <RadioGroup
                            onValueChange={(value) => handleFieldChange('have_property_for_mortage', value)}
                            value={formData.have_property_for_mortage || 'No'}
                            className={cn("flex items-center space-x-4", errors.have_property_for_mortage && "border border-red-500 p-2 rounded-md")}
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Yes" id="have_property_for_mortage_yes" />
                                <Label htmlFor="have_property_for_mortage_yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="No" id="have_property_for_mortage_no" />
                                <Label htmlFor="have_property_for_mortage_no">No</Label>
                            </div>
                        </RadioGroup>
                        {errors.have_property_for_mortage && <p className="text-red-500 text-xs mt-1">{errors.have_property_for_mortage}</p>}

                        {formData.have_property_for_mortage === "Yes" && (
                            <>
                                <div className="space-y-2 mt-4">
                                    <Label htmlFor="property_location">Your property is located in :-</Label>
                                    <Select
                                        onValueChange={(value) => handleFieldChange('property_location', value)}
                                        value={formData.property_location || ''}
                                    >
                                        <SelectTrigger id="property_location" className={cn("w-full", errors.property_location && "border-red-500 focus-visible:ring-red-500")}>
                                            <SelectValue placeholder="Select location" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Gram panchayat">Gram panchayat</SelectItem>
                                            <SelectItem value="Nagar panchayat">Nagar panchayat</SelectItem>
                                            <SelectItem value="Nagar Parishad">Nagar Parishad</SelectItem>
                                            <SelectItem value="Nagar Nigam">Nagar Nigam</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.property_location && <p className="text-red-500 text-xs mt-1">{errors.property_location}</p>}
                                </div>
                                <div className="space-y-2 mt-4">
                                    <Label htmlFor="who_own_property">Who is the owner of property?</Label>
                                    <Select
                                        onValueChange={(value) => handleFieldChange('who_own_property', value)}
                                        value={formData.who_own_property || ''}
                                    >
                                        <SelectTrigger id="who_own_property" className={cn("w-full", errors.who_own_property && "border-red-500 focus-visible:ring-red-500")}>
                                            <SelectValue placeholder="Select owner" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Myself">Myself</SelectItem>
                                            <SelectItem value="Father">Father</SelectItem>
                                            <SelectItem value="Mother">Mother</SelectItem>
                                            <SelectItem value="Spouse">Spouse</SelectItem>
                                            <SelectItem value="Grand father">Grand father</SelectItem>
                                            <SelectItem value="Grand mother">Grand mother</SelectItem>
                                            <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.who_own_property && <p className="text-red-500 text-xs mt-1">{errors.who_own_property}</p>}
                                </div>
                            </>
                        )}
                    </div>
                    <div className="space-y-2 col-span-full">
                        <Label>Do you have 17 khata agriculture land?</Label>
                        <RadioGroup
                            onValueChange={(value) => handleFieldChange('have_17_kahta_agri_land', value)}
                            value={formData.have_17_kahta_agri_land || 'No'}
                            className={cn("flex items-center space-x-4", errors.have_17_kahta_agri_land && "border border-red-500 p-2 rounded-md")}
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Yes" id="have_17_kahta_agri_land_yes" />
                                <Label htmlFor="have_17_kahta_agri_land_yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="No" id="have_17_kahta_agri_land_no" />
                                <Label htmlFor="have_17_kahta_agri_land_no">No</Label>
                            </div>
                        </RadioGroup>
                        {errors.have_17_kahta_agri_land && <p className="text-red-500 text-xs mt-1">{errors.have_17_kahta_agri_land}</p>}
                    </div>
                    <div className="space-y-2 col-span-full">
                        <Label>We need the following documents of property, select which are available?</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {[
                                "Khatiyan (In case of inherited property)",
                                "Sale deed (If you have purchase property)",
                                "LPC certificate",
                                "Current rashid of property",
                            ].map((optionLabel) => (
                                <div key={optionLabel} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`needs_of_documents_${optionLabel.replace(/\s+/g, "_").replace(/[\(\)]/g, "")}`}
                                        checked={formData.needs_of_documents?.includes(optionLabel) || false}
                                        onCheckedChange={(checked) => handleMultiOptionChange("needs_of_documents", optionLabel, checked)}
                                    />
                                    <Label htmlFor={`needs_of_documents_${optionLabel.replace(/\s+/g, "_").replace(/[\(\)]/g, "")}`}>
                                        {optionLabel}
                                    </Label>
                                </div>
                            ))}
                        </div>
                        {errors.needs_of_documents && <p className="text-red-500 text-xs mt-1">{errors.needs_of_documents}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Employment;
