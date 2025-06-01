import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const Employment = ({ formData, setFormData, errors }) => {
    const handleFieldChange = (fieldName, value) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: value
        }));
    };

    return (
      <div className="flex flex-col p-4">

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

            {/* Current Loans Section */}
            <div className="mb-8 pb-6">
                <h3 className="text-xl font-medium tracking-tight mb-4">Current Loans</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="total_loan_amount">Total loan amount</Label>
                        <Select
                            onValueChange={(value) => handleFieldChange('total_loan_amount', value)}
                            value={formData.total_loan_amount || ''}
                        >
                            <SelectTrigger id="total_loan_amount" className={cn("w-full", errors.total_loan_amount && "border-red-500 focus-visible:ring-red-500")}>
                                <SelectValue placeholder="Select amount" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="less than 50,000">less than 50,000</SelectItem>
                                <SelectItem value="50,000 - 1 lakh">50,000 - 1 lakh</SelectItem>
                                <SelectItem value="1 lakh - 3 lakh">1 lakh - 3 lakh</SelectItem>
                                <SelectItem value="3 lakh - 5 lakh">3 lakh - 5 lakh</SelectItem>
                                <SelectItem value="5 lakh - 10 lakh">5 lakh - 10 lakh</SelectItem>
                                <SelectItem value="10 lakh - 20 lakh">10 lakh - 20 lakh</SelectItem>
                                <SelectItem value="above 20 lakh">above 20 lakh</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.total_loan_amount && <p className="text-red-500 text-xs mt-1">{errors.total_loan_amount}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="loan_start_date">When you took loan</Label>
                        <Select
                            onValueChange={(value) => handleFieldChange('loan_start_date', value)}
                            value={formData.loan_start_date || ''}
                        >
                            <SelectTrigger id="loan_start_date" className={cn("w-full", errors.loan_start_date && "border-red-500 focus-visible:ring-red-500")}>
                                <SelectValue placeholder="Select date" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="0-12 months before">0-12 months before</SelectItem>
                                <SelectItem value="12-24 months before">12-24 months before</SelectItem>
                                <SelectItem value="24-36 months before">24-36 months before</SelectItem>
                                <SelectItem value="36-48 months before">36-48 months before</SelectItem>
                                <SelectItem value="48-60 months before">48-60 months before</SelectItem>
                                <SelectItem value="more than 60 months">more than 60 months</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.loan_start_date && <p className="text-red-500 text-xs mt-1">{errors.loan_start_date}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="loan_provider_bank">Name the bank which provides loan to you.</Label>
                        <Input
                            type="text"
                            id="loan_provider_bank"
                            value={formData.loan_provider_bank || ''}
                            onChange={(e) => handleFieldChange('loan_provider_bank', e.target.value)}
                            placeholder="Bank name which provides loan"
                            className={cn(errors.loan_provider_bank && "border-red-500 focus-visible:ring-red-500")}
                        />
                        {errors.loan_provider_bank && <p className="text-red-500 text-xs mt-1">{errors.loan_provider_bank}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="monthly_emi">what is monthly EMI currently you are paying</Label>
                        <Input
                            type="text"
                            id="monthly_emi"
                            value={formData.monthly_emi || ''}
                            onChange={(e) => handleFieldChange('monthly_emi', e.target.value)}
                            placeholder="Monthly EMI"
                            className={cn(errors.monthly_emi && "border-red-500 focus-visible:ring-red-500")}
                        />
                        {errors.monthly_emi && <p className="text-red-500 text-xs mt-1">{errors.monthly_emi}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Employment;
