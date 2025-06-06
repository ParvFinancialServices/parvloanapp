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
          Vehicle Loan Documents
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="applicant_selfie">Upload Applicant Selfie <span className='text-red-500'>*</span></Label>
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
            <Label htmlFor="personal_pan">Upload Personal PAN image<span className='text-red-500'>*</span></Label>
            <Input
              type="file"
              id="personal_pan"
              onChange={handleFileChange}
              className={cn(errors.personal_pan && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.personal_pan && <p className="text-red-500 text-xs mt-1">{errors.personal_pan}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="address_prooof">Address Proof (electricity bill)</Label>
            <Input
              type="file"
              id="address_prooof"
              onChange={handleFileChange}
              className={cn(errors.address_prooof && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.address_prooof && <p className="text-red-500 text-xs mt-1">{errors.address_prooof}</p>}
          </div>
        </div>
      </div>

      {/* Co-Applicant Documents */}
      <div className="mb-8 pb-6">
        <h3 className="text-xl font-medium tracking-tight mb-4">
          Co-Applicant Documents
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="coapplicant_aadhar_front">Co-Applicant Aadhar Front</Label>
            <Input
              type="file"
              id="coapplicant_aadhar_front"
              onChange={handleFileChange}
              className={cn(errors.coapplicant_aadhar_front && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.coapplicant_aadhar_front && <p className="text-red-500 text-xs mt-1">{errors.coapplicant_aadhar_front}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="coapplicant_aadhar_back">Co-Applicant Aadhar Back</Label>
            <Input
              type="file"
              id="coapplicant_aadhar_back"
              onChange={handleFileChange}
              className={cn(errors.coapplicant_aadhar_back && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.coapplicant_aadhar_back && <p className="text-red-500 text-xs mt-1">{errors.coapplicant_aadhar_back}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="coapplicant_pan">Co-Applicant PAN</Label>
            <Input
              type="file"
              id="coapplicant_pan"
              onChange={handleFileChange}
              className={cn(errors.coapplicant_pan && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.coapplicant_pan && <p className="text-red-500 text-xs mt-1">{errors.coapplicant_pan}</p>}
          </div>
        </div>
      </div>


      {/* Employment (if job) Documents Section */}
      <div className="mb-8 pb-6">
        <h3 className="text-xl font-medium tracking-tight mb-4">
          Employment Documents
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="salary_slip_1">Salary slip-1 </Label>
            <Input
              type="file"
              id="salary_slip_1"
              onChange={handleFileChange}
              className={cn(errors.salary_slip_1 && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.salary_slip_1 && <p className="text-red-500 text-xs mt-1">{errors.salary_slip_1}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="salary_slip_2">Salary slip-2</Label>
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
            <Label htmlFor="form_16_itr_1">Form-16  ITR-1</Label>
            <Input
              type="file"
              id="form_16_itr_1"
              onChange={handleFileChange}
              className={cn(errors.form_16_itr_1 && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.form_16_itr_1 && <p className="text-red-500 text-xs mt-1">{errors.form_16_itr_1}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="form_16_itr_2">Form-16  ITR-2</Label>
            <Input
              type="file"
              id="form_16_itr_2"
              onChange={handleFileChange}
              className={cn(errors.form_16_itr_2 && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.form_16_itr_2 && <p className="text-red-500 text-xs mt-1">{errors.form_16_itr_2}</p>}
          </div>
        </div>
      </div>


      {/* if (business) Business documents */}
      <div className="mb-8 pb-6">
        <h3 className="text-xl font-medium tracking-tight mb-4">
          Business and Utility Documents
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="electricity_bill">House Electricity Bill</Label>
            <Input
              type="file"
              id="electricity_bill"
              onChange={handleFileChange}
              className={cn(errors.electricity_bill && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.electricity_bill && <p className="text-red-500 text-xs mt-1">{errors.electricity_bill}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="business_images">Your Business Images</Label>
            <Input
              type="file"
              id="business_images"
              onChange={handleFileChange}
              className={cn(errors.business_images && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.business_images && <p className="text-red-500 text-xs mt-1">{errors.business_images}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="business_proof">Business Registration Proof</Label>
            <Input
              type="file"
              id="business_proof"
              onChange={handleFileChange}
              className={cn(errors.business_proof && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.business_proof && <p className="text-red-500 text-xs mt-1">{errors.business_proof}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="itr_1">ITR-1</Label>
            <Input
              type="file"
              id="itr_1"
              onChange={handleFileChange}
              className={cn(errors.itr_1 && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.itr_1 && <p className="text-red-500 text-xs mt-1">{errors.itr_1}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="itr_2">ITR-2</Label>
            <Input
              type="file"
              id="itr_2"
              onChange={handleFileChange}
              className={cn(errors.itr_2 && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.itr_2 && <p className="text-red-500 text-xs mt-1">{errors.itr_2}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="another_1">Another-1</Label>
            <Input
              type="file"
              id="another_1"
              onChange={handleFileChange}
              className={cn(errors.another_1 && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.another_1 && <p className="text-red-500 text-xs mt-1">{errors.another_1}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="another_2">Another-2</Label>
            <Input
              type="file"
              id="another_2"
              onChange={handleFileChange}
              className={cn(errors.another_2 && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.another_2 && <p className="text-red-500 text-xs mt-1">{errors.another_2}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="another_3">Another-3</Label>
            <Input
              type="file"
              id="another_3"
              onChange={handleFileChange}
              className={cn(errors.another_3 && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.another_3 && <p className="text-red-500 text-xs mt-1">{errors.another_3}</p>}
          </div>
        </div>
      </div>

      {/* property section */}

      <div className="mb-8 pb-6">
        <h3 className="text-xl font-medium tracking-tight mb-4">
          Property Documents
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="sale_deed">Sale Deed / Khatiyan</Label>
            <Input
              type="file"
              id="sale_deed"
              onChange={handleFileChange}
              className={cn(errors.sale_deed && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.sale_deed && <p className="text-red-500 text-xs mt-1">{errors.sale_deed}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="mutation">Mutation / Dakhil-Kharij</Label>
            <Input
              type="file"
              id="mutation"
              onChange={handleFileChange}
              className={cn(errors.mutation && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.mutation && <p className="text-red-500 text-xs mt-1">{errors.mutation}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="rashid">Current Rashid</Label>
            <Input
              type="file"
              id="rashid"
              onChange={handleFileChange}
              className={cn(errors.rashid && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.rashid && <p className="text-red-500 text-xs mt-1">{errors.rashid}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="lpc">LPC</Label>
            <Input
              type="file"
              id="lpc"
              onChange={handleFileChange}
              className={cn(errors.lpc && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.lpc && <p className="text-red-500 text-xs mt-1">{errors.lpc}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="property_pic">Property Front Picture</Label>
            <Input
              type="file"
              id="property_pic"
              onChange={handleFileChange}
              className={cn(errors.property_pic && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.property_pic && <p className="text-red-500 text-xs mt-1">{errors.property_pic}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="property_map">Property Map</Label>
            <Input
              type="file"
              id="property_map"
              onChange={handleFileChange}
              className={cn(errors.property_map && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.property_map && <p className="text-red-500 text-xs mt-1">{errors.property_map}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="chain_deed">Chain Deed</Label>
            <Input
              type="file"
              id="chain_deed"
              onChange={handleFileChange}
              className={cn(errors.chain_deed && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.chain_deed && <p className="text-red-500 text-xs mt-1">{errors.chain_deed}</p>}
          </div>
        </div>
      </div>



      {/* Vehicle details section */}
      <div className="mb-8 pb-6">
        <h3 className="text-xl font-medium tracking-tight mb-4">
          Financial & Vehicle Documents
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="itr_1">ITR-1</Label>
            <Input
              type="file"
              id="itr_1"
              onChange={handleFileChange}
              className={cn(errors.itr_1 && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.itr_1 && <p className="text-red-500 text-xs mt-1">{errors.itr_1}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="itr_2">ITR-2</Label>
            <Input
              type="file"
              id="itr_2"
              onChange={handleFileChange}
              className={cn(errors.itr_2 && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.itr_2 && <p className="text-red-500 text-xs mt-1">{errors.itr_2}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="guarantor_aadhar_front">Guarantor Aadhar Front</Label>
            <Input
              type="file"
              id="guarantor_aadhar_front"
              onChange={handleFileChange}
              className={cn(errors.guarantor_aadhar_front && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.guarantor_aadhar_front && <p className="text-red-500 text-xs mt-1">{errors.guarantor_aadhar_front}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="guarantor_aadhar_back">Guarantor Aadhar Back</Label>
            <Input
              type="file"
              id="guarantor_aadhar_back"
              onChange={handleFileChange}
              className={cn(errors.guarantor_aadhar_back && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.guarantor_aadhar_back && <p className="text-red-500 text-xs mt-1">{errors.guarantor_aadhar_back}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="guarantor_pan">Guarantor PAN</Label>
            <Input
              type="file"
              id="guarantor_pan"
              onChange={handleFileChange}
              className={cn(errors.guarantor_pan && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.guarantor_pan && <p className="text-red-500 text-xs mt-1">{errors.guarantor_pan}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="vehicle_quotation">Vehicle Quotation</Label>
            <Input
              type="file"
              id="vehicle_quotation"
              onChange={handleFileChange}
              className={cn(errors.vehicle_quotation && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.vehicle_quotation && <p className="text-red-500 text-xs mt-1">{errors.vehicle_quotation}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="owner_book">Owner Book (Previous Vehicle)</Label>
            <Input
              type="file"
              id="owner_book"
              onChange={handleFileChange}
              className={cn(errors.owner_book && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.owner_book && <p className="text-red-500 text-xs mt-1">{errors.owner_book}</p>}
          </div>
        </div>
      </div>



    </div>
  );
};

export default Documents;
