import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

const Profession = ({ formData, setFormData, errors }) => {
  const handleFieldChange = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleMultiOptionChange = (id, optionValue, isChecked) => {
    setFormData((prev) => {
      const currentValues = prev[id] || [];
      let newValues;
      if (isChecked) {
        newValues = [...currentValues, optionValue];
      } else {
        newValues = currentValues.filter((val) => val !== optionValue);
      }
      return {
        ...prev,
        [id]: newValues,
      };
    });
  };

  return (
    <div className="flex  flex-col p-4">
      <div className="space-y-2 mb-8 pb-6">
        {/* <Label>Profession<span className='text-red-500'>*</span></Label>
         */}
          <h3 className="text-xl font-medium tracking-tight mb-4">
            Your Profession
          </h3>
        <RadioGroup
          onValueChange={(value) =>
            handleFieldChange("profession", value)
          }
          value={formData.profession || "Business"}
          className={cn(
            "flex items-center space-x-4",
            errors.profession && "border border-red-500 p-2 rounded-md"
          )}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Business" id="Business" />
            <Label htmlFor="Business">Business</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="Job"
              id="Job"
            />
            <Label htmlFor="Job">Job </Label>
          </div>
        </RadioGroup>
        {errors.profession && (
          <p className="text-red-500 text-xs mt-1">
            {errors.profession}
          </p>
        )}
      </div>
      {/* Job Details Section */}
      {
        formData?.profession === 'Job' &&
        <div className="mb-8 pb-6 border-b border-gray-200">
          <h3 className="text-xl font-medium tracking-tight mb-4">
            Job Details (If you have job)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="current_company_name">Current Company Name<span className='text-red-500'>*</span></Label>
              <Input
                type="text"
                id="current_company_name"
                value={formData.current_company_name || ""}
                onChange={(e) =>
                  handleFieldChange("current_company_name", e.target.value)
                }
                className={cn(
                  errors.current_company_name &&
                  "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.current_company_name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.current_company_name}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="salary_account_bank">
                Salary Account Bank Name
                <span className='text-red-500'>*</span>
              </Label>
              <Input
                type="text"
                id="salary_account_bank"
                value={formData.salary_account_bank || ""}
                onChange={(e) =>
                  handleFieldChange("salary_account_bank", e.target.value)
                }
                className={cn(
                  errors.salary_account_bank &&
                  "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.salary_account_bank && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.salary_account_bank}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="savings_account_bank">
                Savings Account Bank Name
                <span className='text-red-500'>*</span>
              </Label>
              <Input
                type="text"
                id="savings_account_bank"
                value={formData.savings_account_bank || ""}
                onChange={(e) =>
                  handleFieldChange("savings_account_bank", e.target.value)
                }
                className={cn(
                  errors.savings_account_bank &&
                  "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.savings_account_bank && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.savings_account_bank}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="job_tenure">Job tenure in current company<span className='text-red-500'>*</span></Label>
              <Select
                onValueChange={(value) => handleFieldChange("job_tenure", value)}
                value={formData.job_tenure || ""}
              >
                <SelectTrigger
                  id="job_tenure"
                  className={cn(
                    "w-full",
                    errors.job_tenure &&
                    "border-red-500 focus-visible:ring-red-500"
                  )}
                >
                  <SelectValue placeholder="Select tenure" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-12 months">0-12 months</SelectItem>
                  <SelectItem value="12-24 months">12-24 months</SelectItem>
                  <SelectItem value="24-60 months">24-60 months</SelectItem>
                  <SelectItem value="more than 60 months">
                    more than 60 months
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.job_tenure && (
                <p className="text-red-500 text-xs mt-1">{errors.job_tenure}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="job_experience">Experience<span className='text-red-500'>*</span></Label>
              <Select
                onValueChange={(value) =>
                  handleFieldChange("job_experience", value)
                }
                value={formData.job_experience || ""}
              >
                <SelectTrigger
                  id="job_experience"
                  className={cn(
                    "w-full",
                    errors.job_experience &&
                    "border-red-500 focus-visible:ring-red-500"
                  )}
                >
                  <SelectValue placeholder="Select experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="less than 1 year">
                    less than 1 year
                  </SelectItem>
                  <SelectItem value="1-2 years">1-2 years</SelectItem>
                  <SelectItem value="2-3 years">2-3 years</SelectItem>
                  <SelectItem value="3-5 years">3-5 years</SelectItem>
                  <SelectItem value="more than 5 years">
                    more than 5 years
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.job_experience && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.job_experience}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthly_income">Your Monthly Income<span className='text-red-500'>*</span></Label>
              <Select
                onValueChange={(value) =>
                  handleFieldChange("monthly_income", value)
                }
                value={formData.monthly_income || ""}
              >
                <SelectTrigger
                  id="monthly_income"
                  className={cn(
                    "w-full",
                    errors.monthly_income &&
                    "border-red-500 focus-visible:ring-red-500"
                  )}
                >
                  <SelectValue placeholder="Select income" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="less than 12,000">
                    less than 12,000
                  </SelectItem>
                  <SelectItem value="15,000 - 20,000">15,000 - 20,000</SelectItem>
                  <SelectItem value="20,000 - 25,000">20,000 - 25,000</SelectItem>
                  <SelectItem value="25,000 - 30,000">25,000 - 30,000</SelectItem>
                  <SelectItem value="30,000 - 35,000">30,000 - 35,000</SelectItem>
                  <SelectItem value="35,000 - 45,000">35,000 - 45,000</SelectItem>
                  <SelectItem value="above 45,000">above 45,000</SelectItem>
                </SelectContent>
              </Select>
              {errors.monthly_income && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.monthly_income}
                </p>
              )}
            </div>
          </div>
        </div>
      }


      {/* Business Details Section */}

      {
        formData?.profession === 'Business'
        && <div className="mb-8 pb-6 border-b border-gray-200">
          <h3 className="text-xl font-medium tracking-tight mb-4">
            Business Details (if you have Business)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="company_name">Company / firm Name<span className='text-red-500'>*</span></Label>
              <Input
                type="text"
                id="company_name"
                value={formData.company_name || ""}
                onChange={(e) =>
                  handleFieldChange("company_name", e.target.value)
                }
                className={cn(
                  errors.company_name &&
                  "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.company_name && (
                <p className="text-red-500 text-xs mt-1">{errors.company_name}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="company_age">How old your business?<span className='text-red-500'>*</span></Label>
              <Select
                onValueChange={(value) => handleFieldChange("company_age", value)}
                value={formData.company_age || ""}
              >
                <SelectTrigger
                  id="company_age"
                  className={cn(
                    "w-full",
                    errors.company_age &&
                    "border-red-500 focus-visible:ring-red-500"
                  )}
                >
                  <SelectValue placeholder="Select age" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-1 years">0-1 years</SelectItem>
                  <SelectItem value="1-3 years">1-3 years</SelectItem>
                  <SelectItem value="3-5 years">3-5 years</SelectItem>
                  <SelectItem value="more than 5 years">
                    more than 5 years
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.company_age && (
                <p className="text-red-500 text-xs mt-1">{errors.company_age}</p>
              )}
            </div>
            <div className="space-y-2 col-span-full">
              <Label>Select registration paper you have for your business?<span className='text-red-500'>*</span></Label>
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
                      id={`registration_paper_${optionLabel
                        .replace(/\s+/g, "_")
                        .replace(/[\(\)]/g, "")}`}
                      checked={
                        formData.registration_paper?.includes(optionLabel) ||
                        false
                      }
                      onCheckedChange={(checked) =>
                        handleMultiOptionChange(
                          "registration_paper",
                          optionLabel,
                          checked
                        )
                      }
                    />
                    <Label
                      htmlFor={`registration_paper_${optionLabel
                        .replace(/\s+/g, "_")
                        .replace(/[\(\)]/g, "")}`}
                    >
                      {optionLabel}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.registration_paper && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.registration_paper}
                </p>
              )}
            </div>
          </div>
        </div>
      }


      {/* Documents related query Section (Binary Questions) */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <h3 className="text-xl font-medium tracking-tight mb-4">
          Documents related query
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 col-span-full">
            <Label>Do you have job offer letter of current job?<span className='text-red-500'>*</span></Label>
            <RadioGroup
              onValueChange={(value) =>
                handleFieldChange("have_offer_letter", value)
              }
              value={formData.have_offer_letter || "No"}
              className={cn(
                "flex items-center space-x-4",
                errors.have_offer_letter &&
                "border border-red-500 p-2 rounded-md"
              )}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Yes" id="have_offer_letter_yes" />
                <Label htmlFor="have_offer_letter_yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="No" id="have_offer_letter_no" />
                <Label htmlFor="have_offer_letter_no">No</Label>
              </div>
            </RadioGroup>
            {errors.have_offer_letter && (
              <p className="text-red-500 text-xs mt-1">
                {errors.have_offer_letter}
              </p>
            )}
          </div>

          <div className="space-y-2 col-span-full">
            <Label>Do you have form-16 or TAN number?<span className='text-red-500'>*</span></Label>
            <RadioGroup
              onValueChange={(value) => handleFieldChange("have_tan_no", value)}
              value={formData.have_tan_no || "No"}
              className={cn(
                "flex items-center space-x-4",
                errors.have_tan_no && "border border-red-500 p-2 rounded-md"
              )}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Yes" id="have_tan_no_yes" />
                <Label htmlFor="have_tan_no_yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="No" id="have_tan_no_no" />
                <Label htmlFor="have_tan_no_no">No</Label>
              </div>
            </RadioGroup>
            {errors.have_tan_no && (
              <p className="text-red-500 text-xs mt-1">{errors.have_tan_no}</p>
            )}
          </div>

          <div className="space-y-2 col-span-full">
            <Label>Do you have salary slip of last 3 months?<span className='text-red-500'>*</span></Label>
            <RadioGroup
              onValueChange={(value) =>
                handleFieldChange("has_salary_slip", value)
              }
              value={formData.has_salary_slip || "No"}
              className={cn(
                "flex items-center space-x-4",
                errors.has_salary_slip && "border border-red-500 p-2 rounded-md"
              )}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Yes" id="has_salary_slip_yes" />
                <Label htmlFor="has_salary_slip_yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="No" id="has_salary_slip_no" />
                <Label htmlFor="has_salary_slip_no">No</Label>
              </div>
            </RadioGroup>
            {errors.has_salary_slip && (
              <p className="text-red-500 text-xs mt-1">
                {errors.has_salary_slip}
              </p>
            )}
          </div>

          <div className="space-y-2 col-span-full">
            <Label>
              Can you provide bank statement of last 6 or 12 months in Net
              banking formate?
              <span className='text-red-500'>*</span>
            </Label>
            <RadioGroup
              onValueChange={(value) =>
                handleFieldChange("has_bank_statement", value)
              }
              value={formData.has_bank_statement || "No"}
              className={cn(
                "flex items-center space-x-4",
                errors.has_bank_statement &&
                "border border-red-500 p-2 rounded-md"
              )}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Yes" id="has_bank_statement_yes" />
                <Label htmlFor="has_bank_statement_yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="No" id="has_bank_statement_no" />
                <Label htmlFor="has_bank_statement_no">No</Label>
              </div>
            </RadioGroup>
            {errors.has_bank_statement && (
              <p className="text-red-500 text-xs mt-1">
                {errors.has_bank_statement}
              </p>
            )}
          </div>

          <div className="space-y-2 col-span-full">
            <Label>Do you have any current loan?<span className='text-red-500'>*</span></Label>
            <RadioGroup
              onValueChange={(value) =>
                handleFieldChange("has_current_loan", value)
              }
              value={formData.has_current_loan || "No"}
              className={cn(
                "flex items-center space-x-4",
                errors.has_current_loan &&
                "border border-red-500 p-2 rounded-md"
              )}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Yes" id="has_current_loan_yes" />
                <Label htmlFor="has_current_loan_yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="No" id="has_current_loan_no" />
                <Label htmlFor="has_current_loan_no">No</Label>
              </div>
            </RadioGroup>
            {errors.has_current_loan && (
              <p className="text-red-500 text-xs mt-1">
                {errors.has_current_loan}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Current Loans Section */}
      {formData.has_current_loan === "Yes" && (
        <div className="mb-8 pb-6 border-b border-gray-200">
          <h3 className="text-xl font-medium tracking-tight mb-4">
            Current Loans
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="total_loan_amount">Total loan amount</Label>
              <Select
                onValueChange={(value) =>
                  handleFieldChange("total_loan_amount", value)
                }
                value={formData.total_loan_amount || ""}
              >
                <SelectTrigger
                  id="total_loan_amount"
                  className={cn(
                    "w-full",
                    errors.total_loan_amount &&
                    "border-red-500 focus-visible:ring-red-500"
                  )}
                >
                  <SelectValue placeholder="Select amount" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="less than 50,000">
                    less than 50,000
                  </SelectItem>
                  <SelectItem value="50,000 - 1 lakh">
                    50,000 - 1 lakh
                  </SelectItem>
                  <SelectItem value="1 lakh - 3 lakh">
                    1 lakh - 3 lakh
                  </SelectItem>
                  <SelectItem value="3 lakh - 5 lakh">
                    3 lakh - 5 lakh
                  </SelectItem>
                  <SelectItem value="5 lakh - 10 lakh">
                    5 lakh - 10 lakh
                  </SelectItem>
                  <SelectItem value="10 lakh - 20 lakh">
                    10 lakh - 20 lakh
                  </SelectItem>
                  <SelectItem value="above 20 lakh">above 20 lakh</SelectItem>
                </SelectContent>
              </Select>
              {errors.total_loan_amount && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.total_loan_amount}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="loan_start_date">When you took loan</Label>
              <Select
                onValueChange={(value) =>
                  handleFieldChange("loan_start_date", value)
                }
                value={formData.loan_start_date || ""}
              >
                <SelectTrigger
                  id="loan_start_date"
                  className={cn(
                    "w-full",
                    errors.loan_start_date &&
                    "border-red-500 focus-visible:ring-red-500"
                  )}
                >
                  <SelectValue placeholder="Select date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-12 months before">
                    0-12 months before
                  </SelectItem>
                  <SelectItem value="12-24 months before">
                    12-24 months before
                  </SelectItem>
                  <SelectItem value="24-36 months before">
                    24-36 months before
                  </SelectItem>
                  <SelectItem value="36-48 months before">
                    36-48 months before
                  </SelectItem>
                  <SelectItem value="48-60 months before">
                    48-60 months before
                  </SelectItem>
                  <SelectItem value="more than 60 months">
                    more than 60 months
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.loan_start_date && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.loan_start_date}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="loan_provider_bank">
                Name the bank which provides loan to you.
              </Label>
              <Input
                type="text"
                id="loan_provider_bank"
                value={formData.loan_provider_bank || ""}
                onChange={(e) =>
                  handleFieldChange("loan_provider_bank", e.target.value)
                }
                placeholder="Bank name which provides loan"
                className={cn(
                  errors.loan_provider_bank &&
                  "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.loan_provider_bank && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.loan_provider_bank}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthly_emi">
                what is monthly EMI currently you are paying
              </Label>
              <Input
                type="text"
                id="monthly_emi"
                value={formData.monthly_emi || ""}
                onChange={(e) =>
                  handleFieldChange("monthly_emi", e.target.value)
                }
                placeholder="Monthly EMI"
                className={cn(
                  errors.monthly_emi &&
                  "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.monthly_emi && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.monthly_emi}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Property Information Section */}
      <div className="mb-8 pb-6">
        <h3 className="text-xl font-medium tracking-tight mb-4">
          Property Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 col-span-full">
            <Label>
              Do you have any property which you can give for mortgage?
            </Label>
            <RadioGroup
              onValueChange={(value) =>
                handleFieldChange("have_property_for_mortage", value)
              }
              value={formData.have_property_for_mortage || "No"}
              className={cn(
                "flex items-center space-x-4",
                errors.have_property_for_mortage &&
                "border border-red-500 p-2 rounded-md"
              )}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="Yes"
                  id="have_property_for_mortage_yes"
                />
                <Label htmlFor="have_property_for_mortage_yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="No" id="have_property_for_mortage_no" />
                <Label htmlFor="have_property_for_mortage_no">No</Label>
              </div>
            </RadioGroup>
            {errors.have_property_for_mortage && (
              <p className="text-red-500 text-xs mt-1">
                {errors.have_property_for_mortage}
              </p>
            )}

            {formData.have_property_for_mortage === "Yes" && (
              <>
                <div className="space-y-2 mt-4">
                  <Label htmlFor="property_location">
                    Your property is located in :-
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleFieldChange("property_location", value)
                    }
                    value={formData.property_location || ""}
                  >
                    <SelectTrigger
                      id="property_location"
                      className={cn(
                        "w-full",
                        errors.property_location &&
                        "border-red-500 focus-visible:ring-red-500"
                      )}
                    >
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Gram panchayat">
                        Gram panchayat
                      </SelectItem>
                      <SelectItem value="Nagar panchayat">
                        Nagar panchayat
                      </SelectItem>
                      <SelectItem value="Nagar Parishad">
                        Nagar Parishad
                      </SelectItem>
                      <SelectItem value="Nagar Nigam">Nagar Nigam</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.property_location && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.property_location}
                    </p>
                  )}
                </div>
                <div className="space-y-2 mt-4">
                  <Label htmlFor="who_own_property">
                    Who is the owner of property?
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleFieldChange("who_own_property", value)
                    }
                    value={formData.who_own_property || ""}
                  >
                    <SelectTrigger
                      id="who_own_property"
                      className={cn(
                        "w-full",
                        errors.who_own_property &&
                        "border-red-500 focus-visible:ring-red-500"
                      )}
                    >
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
                  {errors.who_own_property && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.who_own_property}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="space-y-2 col-span-full">
            <Label>Do you have 17 khata agriculture land?</Label>
            <RadioGroup
              onValueChange={(value) =>
                handleFieldChange("have_17_kahta_agri_land", value)
              }
              value={formData.have_17_kahta_agri_land || "No"}
              className={cn(
                "flex items-center space-x-4",
                errors.have_17_kahta_agri_land &&
                "border border-red-500 p-2 rounded-md"
              )}
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
            {errors.have_17_kahta_agri_land && (
              <p className="text-red-500 text-xs mt-1">
                {errors.have_17_kahta_agri_land}
              </p>
            )}
          </div>
          <div className="space-y-2 col-span-full">
            <Label>
              We need the following documents of property, select which are
              available?
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                "Khatiyan (In case of inherited property)",
                "Sale deed (If you have purchase property)",
                "LPC certificate",
                "Current rashid of property",
              ].map((optionLabel) => (
                <div key={optionLabel} className="flex items-center space-x-2">
                  <Checkbox
                    id={`needs_of_documents_${optionLabel
                      .replace(/\s+/g, "_")
                      .replace(/[\(\)]/g, "")}`}
                    checked={
                      formData.needs_of_documents?.includes(optionLabel) ||
                      false
                    }
                    onCheckedChange={(checked) =>
                      handleMultiOptionChange(
                        "needs_of_documents",
                        optionLabel,
                        checked
                      )
                    }
                  />
                  <Label
                    htmlFor={`needs_of_documents_${optionLabel
                      .replace(/\s+/g, "_")
                      .replace(/[\(\)]/g, "")}`}
                  >
                    {optionLabel}
                  </Label>
                </div>
              ))}
            </div>
            {errors.needs_of_documents && (
              <p className="text-red-500 text-xs mt-1">
                {errors.needs_of_documents}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profession;
