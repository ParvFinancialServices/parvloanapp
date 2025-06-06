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
import { cn } from "@/lib/utils";

const VehicleDetails = ({ formData, setFormData, errors }) => {
  const handleFieldChange = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <div className="mb-8 pb-6 border-b border-gray-200">
      {/* Vehicle Details Section */}
      <div className="mb-8 pb-6">
        <h3 className="text-xl font-medium tracking-tight mb-4">
          Vehicle Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="which_vehicle">Select vehicle loan type?<span className='text-red-500'>*</span></Label>
            <Select
              onValueChange={(value) =>
                handleFieldChange("which_vehicle", value)
              }
              value={formData.which_vehicle || ""}
            >
              <SelectTrigger
                id="which_vehicle"
                className={cn(
                  "w-full",
                  errors.which_vehicle &&
                    "border-red-500 focus-visible:ring-red-500"
                )}
              >
                <SelectValue placeholder="Select vehicle type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="two_wheeler_loan">
                  Two wheeler loan
                </SelectItem>
                <SelectItem value="new_car_loan">New car loan</SelectItem>
                <SelectItem value="light_commercial_vehicle_loan">
                  Light commercial vehicle loan
                </SelectItem>
                <SelectItem value="heavy_commercial_vehicle_loan">
                  Heavy commercial vehicle loan
                </SelectItem>
                <SelectItem value="tractor_loan">Tractor Loan</SelectItem>
                <SelectItem value="old_vehicle_purchase">
                  Old vehicle purchase
                </SelectItem>
                <SelectItem value="vehicle_refinance">
                  Vehicle Refinance
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.which_vehicle && (
              <p className="text-red-500 text-xs mt-1">
                {errors.which_vehicle}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="when_purchase">
              When you have to purchase vehicle?
              <span className='text-red-500'>*</span>
            </Label>
            <Select
              onValueChange={(value) =>
                handleFieldChange("when_purchase", value)
              }
              value={formData.when_purchase || ""}
            >
              <SelectTrigger
                id="when_purchase"
                className={cn(
                  "w-full",
                  errors.when_purchase &&
                    "border-red-500 focus-visible:ring-red-500"
                )}
              >
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="within 7 days">within 7 days</SelectItem>
                <SelectItem value="10-15 days">10-15 days</SelectItem>
                <SelectItem value="15-30 days">15-30 days</SelectItem>
                <SelectItem value="30-90 days">30-90 days</SelectItem>
                <SelectItem value="later">later</SelectItem>
              </SelectContent>
            </Select>
            {errors.when_purchase && (
              <p className="text-red-500 text-xs mt-1">
                {errors.when_purchase}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="estimated_cost">
              What is estimated cost of vehicle?
              <span className='text-red-500'>*</span>
            </Label>
            <Select
              onValueChange={(value) =>
                handleFieldChange("estimated_cost", value)
              }
              value={formData.estimated_cost || ""}
            >
              <SelectTrigger
                id="estimated_cost"
                className={cn(
                  "w-full",
                  errors.estimated_cost &&
                    "border-red-500 focus-visible:ring-red-500"
                )}
              >
                <SelectValue placeholder="Select cost" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5-10 lakhs">5-10 lakhs</SelectItem>
                <SelectItem value="10-15 lakhs">10-15 lakhs</SelectItem>
                <SelectItem value="15-20 lakhs">15-20 lakhs</SelectItem>
                <SelectItem value="20-30 lakhs">20-30 lakhs</SelectItem>
                <SelectItem value="30-50 lakhs">30-50 lakhs</SelectItem>
                <SelectItem value="more than 50 lakhs">
                  more than 50 lakhs
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.estimated_cost && (
              <p className="text-red-500 text-xs mt-1">
                {errors.estimated_cost}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="loan_you_need">How much loan you need?<span className='text-red-500'>*</span></Label>
            <Select
              onValueChange={(value) =>
                handleFieldChange("loan_you_need", value)
              }
              value={formData.loan_you_need || ""}
            >
              <SelectTrigger
                id="loan_you_need"
                className={cn(
                  "w-full",
                  errors.loan_you_need &&
                    "border-red-500 focus-visible:ring-red-500"
                )}
              >
                <SelectValue placeholder="Select loan amount" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3-5 lakhs">3-5 lakhs</SelectItem>
                <SelectItem value="5-10 lakhs">5-10 lakhs</SelectItem>
                <SelectItem value="10-12 lakhs">10-12 lakhs</SelectItem>
                <SelectItem value="12-20 lakhs">12-20 lakhs</SelectItem>
                <SelectItem value="20-30 lakhs">20-30 lakhs</SelectItem>
                <SelectItem value="30-50 lakhs">30-50 lakhs</SelectItem>
                <SelectItem value="more than 50 lakhs">
                  more than 50 lakhs
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.loan_you_need && (
              <p className="text-red-500 text-xs mt-1">
                {errors.loan_you_need}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="profession">Select Profession type<span className='text-red-500'>*</span></Label>
            <Select
              onValueChange={(value) => handleFieldChange("profession", value)}
              value={formData.profession || ""}
            >
              <SelectTrigger
                id="profession"
                className={cn(
                  "w-full",
                  errors.profession &&
                    "border-red-500 focus-visible:ring-red-500"
                )}
              >
                <SelectValue placeholder="Select profession" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Job">Job</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Others">Others</SelectItem>
              </SelectContent>
            </Select>
            {errors.profession && (
              <p className="text-red-500 text-xs mt-1">{errors.profession}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
