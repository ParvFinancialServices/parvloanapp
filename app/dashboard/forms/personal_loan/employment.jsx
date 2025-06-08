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
import { cn } from "@/lib/utils"; // Assuming you have a utility for `cn`

const Employment = ({ formData, setFormData, errors }) => { // Added errors prop
  const handleChange = (e) => {
    const { id, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "file" ? files[0] : value,
    }));
  };

  const handleSelectChange = (id, value) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleRadioChange = (id, value) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value === "true", // Convert string 'true'/'false' to boolean
    }));
  };

  return (
    <div className="flex flex-col p-4">
      {/* Income Details Section */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <h3 className="text-xl font-medium tracking-tight mb-4">
          Income Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Changed sm:grid-cols-2 to md:grid-cols-2 for consistency with other components */}
          <div className="space-y-2">
            <Label htmlFor="current_company_name">Current Company Name<span className='text-red-500'>*</span></Label>
            <Input
              type="text"
              id="current_company_name"
              value={formData.current_company_name || ""}
              onChange={handleChange}
              className={cn(errors.current_company_name && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.current_company_name && <p className="text-red-500 text-xs mt-1">{errors.current_company_name}</p>}
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
              onChange={handleChange}
              className={cn(errors.salary_account_bank && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.salary_account_bank && <p className="text-red-500 text-xs mt-1">{errors.salary_account_bank}</p>}
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
              onChange={handleChange}
              className={cn(errors.savings_account_bank && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.savings_account_bank && <p className="text-red-500 text-xs mt-1">{errors.savings_account_bank}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="job_tenure">Job tenure in current company<span className='text-red-500'>*</span></Label>
            <Select
              onValueChange={(value) => handleSelectChange("job_tenure", value)}
              value={formData.job_tenure || ""}
            >
              <SelectTrigger id="job_tenure" className={cn("w-full", errors.job_tenure && "border-red-500 focus-visible:ring-red-500")}>
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
            {errors.job_tenure && <p className="text-red-500 text-xs mt-1">{errors.job_tenure}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="job_experience">Experience<span className='text-red-500'>*</span></Label>
            <Select
              onValueChange={(value) =>
                handleSelectChange("job_experience", value)
              }
              value={formData.job_experience || ""}
            >
              <SelectTrigger id="job_experience" className={cn("w-full", errors.job_experience && "border-red-500 focus-visible:ring-red-500")}>
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
            {errors.job_experience && <p className="text-red-500 text-xs mt-1">{errors.job_experience}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="monthly_income">Your Monthly Income<span className='text-red-500'>*</span></Label>
            <Select
              onValueChange={(value) =>
                handleSelectChange("monthly_income", value)
              }
              value={formData.monthly_income || ""}
            >
              <SelectTrigger id="monthly_income" className={cn("w-full", errors.monthly_income && "border-red-500 focus-visible:ring-red-500")}>
                <SelectValue placeholder="Select income" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="less than 12,000">
                  less than 12,000
                </SelectItem>
                <SelectItem value="15,000 - 20,000">15,000 - 20,000</SelectItem>
                <SelectItem value="20,000 - 25,000">20,000 - 25,000</SelectItem>
                <SelectItem value="25-000 - 30,000">25,000 - 30,000</SelectItem>
                <SelectItem value="30,000 - 35,000">30,000 - 35,000</SelectItem>
                <SelectItem value="35,000 - 45,000">35,000 - 45,000</SelectItem>
                <SelectItem value="above 45,000">above 45,000</SelectItem>
              </SelectContent>
            </Select>
            {errors.monthly_income && <p className="text-red-500 text-xs mt-1">{errors.monthly_income}</p>}
          </div>
        </div>
      </div>

      {/* Office Address Section */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <h3 className="text-xl font-medium tracking-tight mb-4">
          Office Address
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="office_building_name">Building/House Name<span className='text-red-500'>*</span></Label>
            <Input
              type="text"
              id="office_building_name"
              value={formData.office_building_name || ""}
              onChange={handleChange}
              className={cn(errors.office_building_name && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.office_building_name && <p className="text-red-500 text-xs mt-1">{errors.office_building_name}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="office_street_name">Street/Road Name<span className='text-red-500'>*</span></Label>
            <Input
              type="text"
              id="office_street_name"
              value={formData.office_street_name || ""}
              onChange={handleChange}
              className={cn(errors.office_street_name && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.office_street_name && <p className="text-red-500 text-xs mt-1">{errors.office_street_name}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="office_landmark">Landmark</Label>
            <Input
              type="text"
              id="office_landmark"
              value={formData.office_landmark || ""}
              onChange={handleChange}
              className={cn(errors.office_landmark && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.office_landmark && <p className="text-red-500 text-xs mt-1">{errors.office_landmark}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="office_city">City<span className='text-red-500'>*</span></Label>
            <Input
              type="text"
              id="office_city"
              value={formData.office_city || ""}
              onChange={handleChange}
              className={cn(errors.office_city && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.office_city && <p className="text-red-500 text-xs mt-1">{errors.office_city}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="office_district">District<span className='text-red-500'>*</span></Label>
            <Input
              type="text"
              id="office_district"
              value={formData.office_district || ""}
              onChange={handleChange}
              className={cn(errors.office_district && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.office_district && <p className="text-red-500 text-xs mt-1">{errors.office_district}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="office_state">State<span className='text-red-500'>*</span></Label>
            <Input
              type="text"
              id="office_state"
              value={formData.office_state || ""}
              onChange={handleChange}
              className={cn(errors.office_state && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.office_state && <p className="text-red-500 text-xs mt-1">{errors.office_state}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="office_pincode">Pincode<span className='text-red-500'>*</span></Label>
            <Input
              type="text"
              id="office_pincode"
              value={formData.office_pincode || ""}
              onChange={handleChange}
              className={cn(errors.office_pincode && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.office_pincode && <p className="text-red-500 text-xs mt-1">{errors.office_pincode}</p>}
          </div>
        </div>
      </div>

      {/* Documents related query Section */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <h3 className="text-xl font-medium tracking-tight mb-4">
          Documents related query
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Changed sm:grid-cols-2 to md:grid-cols-2 for consistency */}
          <div className="space-y-2">
            <Label>Do you have job offer letter of current job?<span className='text-red-500'>*</span></Label>
            <RadioGroup
              onValueChange={(value) =>
                handleRadioChange("have_offer_letter", value)
              }
              value={String(formData.have_offer_letter)} // Convert boolean to string for RadioGroup
              className={cn("flex items-center space-x-4", errors.have_offer_letter && "border border-red-500 p-2 rounded-md")}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="have_offer_letter_yes" />
                <Label htmlFor="have_offer_letter_yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="have_offer_letter_no" />
                <Label htmlFor="have_offer_letter_no">No</Label>
              </div>
            </RadioGroup>
            {errors.have_offer_letter && <p className="text-red-500 text-xs mt-1">{errors.have_offer_letter}</p>}

            {formData.have_offer_letter && (
              <div className="space-y-2 mt-4">
                <Label htmlFor="offer_letter">Upload your offer letter<span className='text-red-500'>*</span></Label>
                <Input
                  type="file"
                  id="offer_letter"
                  onChange={handleChange}
                  className={cn(errors.offer_letter && "border-red-500 focus-visible:ring-red-500")}
                />
                {errors.offer_letter && <p className="text-red-500 text-xs mt-1">{errors.offer_letter}</p>}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label>Do you have form-16 or TAN number?<span className='text-red-500'>*</span></Label>
            <RadioGroup
              onValueChange={(value) => handleRadioChange("have_tan_no", value)}
              value={String(formData.have_tan_no)}
              className={cn("flex items-center space-x-4", errors.have_tan_no && "border border-red-500 p-2 rounded-md")}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="have_tan_no_yes" />
                <Label htmlFor="have_tan_no_yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="have_tan_no_no" />
                <Label htmlFor="have_tan_no_no">No</Label>
              </div>
            </RadioGroup>
            {errors.have_tan_no && <p className="text-red-500 text-xs mt-1">{errors.have_tan_no}</p>}

            {formData.have_tan_no && (
              <div className="space-y-2 mt-4">
                <Label htmlFor="tan_no">Enter your TAN Number<span className='text-red-500'>*</span></Label>
                <Input
                  type="text"
                  id="tan_no"
                  value={formData.tan_no || ""}
                  onChange={handleChange}
                  className={cn(errors.tan_no && "border-red-500 focus-visible:ring-red-500")}
                />
                {errors.tan_no && <p className="text-red-500 text-xs mt-1">{errors.tan_no}</p>}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label>
              Can you provide bank statement of last 6 or 12 months in Net
              banking formate?
              <span className='text-red-500'>*</span>
            </Label>
            <RadioGroup
              onValueChange={(value) =>
                handleRadioChange("has_bank_statement", value)
              }
              value={String(formData.has_bank_statement)}
              className={cn("flex items-center space-x-4", errors.has_bank_statement && "border border-red-500 p-2 rounded-md")}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="has_bank_statement_yes" />
                <Label htmlFor="has_bank_statement_yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="has_bank_statement_no" />
                <Label htmlFor="has_bank_statement_no">No</Label>
              </div>
            </RadioGroup>
            {errors.has_bank_statement && <p className="text-red-500 text-xs mt-1">{errors.has_bank_statement}</p>}

            {formData.has_bank_statement && (
              <div className="space-y-2 mt-4">
                <Label htmlFor="bank_statement">
                  Upload your bank statement
                </Label>
                <Input
                  type="file"
                  id="bank_statement"
                  onChange={handleChange}
                  className={cn(errors.bank_statement && "border-red-500 focus-visible:ring-red-500")}
                />
                {errors.bank_statement && <p className="text-red-500 text-xs mt-1">{errors.bank_statement}</p>}
              </div>
            )}
          </div>


        </div>
      </div>

      {/* Past Loans Section */}

      <div>
        <div className="space-y-2">
          <Label>Do you have any current loan?<span className='text-red-500'>*</span></Label>
          <RadioGroup
            onValueChange={(value) =>
              handleRadioChange("has_current_loan", value)
            }
            value={String(formData.has_current_loan)}
            className={cn("flex items-center space-x-4", errors.has_current_loan && "border border-red-500 p-2 rounded-md")}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="true" id="has_current_loan_yes" />
              <Label htmlFor="has_current_loan_yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="false" id="has_current_loan_no" />
              <Label htmlFor="has_current_loan_no">No</Label>
            </div>
          </RadioGroup>
          {errors.has_current_loan && <p className="text-red-500 text-xs mt-1">{errors.has_current_loan}</p>}
        </div>
        {formData.has_current_loan && (
          <div className="mb-8 pb-6">
            <h3 className="text-xl font-medium tracking-tight mb-4">Loan history</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Changed sm:grid-cols-2 to md:grid-cols-2 for consistency */}
              <div className="space-y-2">
                <Label htmlFor="total_loan_amount">Total loan amount</Label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange("total_loan_amount", value)
                  }
                  value={formData.total_loan_amount || ""}
                >
                  <SelectTrigger id="total_loan_amount" className={cn("w-full", errors.total_loan_amount && "border-red-500 focus-visible:ring-red-500")}>
                    <SelectValue placeholder="Select amount" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="less than 50,000">
                      less than 50,000
                    </SelectItem>
                    <SelectItem value="50,000 - 1 lakh">
                      50,000 - 1 lakh
                    </SelectItem>
                    <SelectItem value="1 lakh - 3 lakh">1 lakh - 3 lakh</SelectItem>
                    <SelectItem value="3 lakh - 5 lakh">3 lakh - 5 lakh</SelectItem>
                    <SelectItem value="5 lakh - 10 lakh">
                      5 lakh - 10 lakh
                    </SelectItem>
                    <SelectItem value="10 lakh - 20 lakh">
                      10 lakh - 20 lakh
                    </SelectItem>
                    <SelectItem value="above 20 lakh">above 20 lakh</SelectItem>
                  </SelectContent>
                </Select>
                {errors.total_loan_amount && <p className="text-red-500 text-xs mt-1">{errors.total_loan_amount}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="loan_start_date">When you took loan</Label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange("loan_start_date", value)
                  }
                  value={formData.loan_start_date || ""}
                >
                  <SelectTrigger id="loan_start_date" className={cn("w-full", errors.loan_start_date && "border-red-500 focus-visible:ring-red-500")}>
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
                {errors.loan_start_date && <p className="text-red-500 text-xs mt-1">{errors.loan_start_date}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="loan_provider_bank">
                  Name the bank which provides loan to you.
                </Label>
                <Input
                  type="text"
                  id="loan_provider_bank"
                  value={formData.loan_provider_bank || ""}
                  onChange={handleChange}
                  placeholder="Bank name which provides loan"
                  className={cn(errors.loan_provider_bank && "border-red-500 focus-visible:ring-red-500")}
                />
                {errors.loan_provider_bank && <p className="text-red-500 text-xs mt-1">{errors.loan_provider_bank}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthly_emi">
                  what is monthly EMI currently you are paying
                </Label>
                <Input
                  type="text"
                  id="monthly_emi"
                  value={formData.monthly_emi || ""}
                  onChange={handleChange}
                  placeholder="Monthly EMI"
                  className={cn(errors.monthly_emi && "border-red-500 focus-visible:ring-red-500")}
                />
                {errors.monthly_emi && <p className="text-red-500 text-xs mt-1">{errors.monthly_emi}</p>}
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default Employment;
