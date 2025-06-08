import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils"; // Assuming you have a utility for `cn`

const Documents = ({ formData, setFormData, errors }) => {
  const handleFileChange = (e) => {
    const { id, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: files[0], // Store the File object
    }));
  };

  return (
    <div className="flex flex-col p-4">

      {/* Personal Documents Section */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <h3 className="text-xl font-medium tracking-tight mb-4">
          Personal Documents
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="applicant_selfie">Upload Applicant Selfie<span className='text-red-500'>*</span></Label>
            <Input
              type="file"
              id="applicant_selfie"
              onChange={handleFileChange}
              className={cn(errors.applicant_selfie && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.applicant_selfie && <p className="text-red-500 text-xs mt-1">{errors.applicant_selfie}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="aadhar_front">Upload aadhar front image<span className='text-red-500'>*</span></Label>
            <Input
              type="file"
              id="aadhar_front"
              onChange={handleFileChange}
              className={cn(errors.aadhar_front && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.aadhar_front && <p className="text-red-500 text-xs mt-1">{errors.aadhar_front}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="aadhar_back">Upload aadhar back image<span className='text-red-500'>*</span></Label>
            <Input
              type="file"
              id="aadhar_back"
              onChange={handleFileChange}
              className={cn(errors.aadhar_back && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.aadhar_back && <p className="text-red-500 text-xs mt-1">{errors.aadhar_back}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="Personal_pan">Upload Personal PAN image<span className='text-red-500'>*</span></Label>
            <Input
              type="file"
              id="Personal_pan"
              onChange={handleFileChange}
              className={cn(errors.Personal_pan && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.Personal_pan && <p className="text-red-500 text-xs mt-1">{errors.Personal_pan}</p>}
          </div>
        </div>
      </div>

      {/* Employment Documents Section */}
      <div className="mb-8 pb-6">
        <h3 className="text-xl font-medium tracking-tight mb-4">
          Employment Documents
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="salary_slip_1">Salary slip-1<span className='text-red-500'>*</span> </Label>
            <Input
              type="file"
              id="salary_slip_1"
              onChange={handleFileChange}
              className={cn(errors.salary_slip_1 && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.salary_slip_1 && <p className="text-red-500 text-xs mt-1">{errors.salary_slip_1}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="salary_slip_2">Salary slip-2<span className='text-red-500'>*</span></Label>
            <Input
              type="file"
              id="salary_slip_2"
              onChange={handleFileChange}
              className={cn(errors.salary_slip_2 && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.salary_slip_2 && <p className="text-red-500 text-xs mt-1">{errors.salary_slip_2}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="salary_slip_3">Salary slip-3</Label>
            <Input
              type="file"
              id="salary_slip_3"
              onChange={handleFileChange}
              className={cn(errors.salary_slip_3 && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.salary_slip_3 && <p className="text-red-500 text-xs mt-1">{errors.salary_slip_3}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="other_doc">Upload any other documents</Label>
            <Input
              type="file"
              id="other_doc"
              onChange={handleFileChange}
              className={cn(errors.other_doc && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.other_doc && <p className="text-red-500 text-xs mt-1">{errors.other_doc}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
