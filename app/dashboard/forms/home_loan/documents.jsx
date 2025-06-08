import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const Documents = ({ formData, setFormData, errors }) => {
    const handleFileChange = (e) => {
        const { id, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: files[0] // Store the File object directly in the flat state
        }));
    };

    return (
        <div className="flex flex-col p-4">

            {/* Personal Documents Section */}
            <div className="mb-8 pb-6 border-b border-gray-200">
                <h3 className="text-xl font-medium tracking-tight mb-4">Personal Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        <Label htmlFor="personal_pan_upload">Upload personal PAN image<span className='text-red-500'>*</span></Label>
                        <Input
                            type="file"
                            id="personal_pan_upload"
                            onChange={handleFileChange}
                            className={cn(errors.personal_pan_upload && "border-red-500 focus-visible:ring-red-500")}
                        />
                        {errors.personal_pan_upload && <p className="text-red-500 text-xs mt-1">{errors.personal_pan_upload}</p>}
                    </div>
                </div>
            </div>


            {/* Employment Documents Section */}
            {
                formData?.profession === "Job"
                &&
                <div className="mb-8 pb-6">
                    <h3 className="text-xl font-medium tracking-tight mb-4">
                        Employment Documents
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="salary_slip_1">Salary slip-1 <span className='text-red-500'>*</span></Label>
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
            }


            {/* Business Documents Section */}
            {
                formData?.profession === "Business"
                &&
                <div className="mb-8 pb-6 border-b border-gray-200">
                    <h3 className="text-xl font-medium tracking-tight mb-4">Business Documents</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="company_image">Upload company / firm image?<span className='text-red-500'>*</span></Label>
                            <Input
                                type="file"
                                id="company_image"
                                onChange={handleFileChange}
                                className={cn(errors.company_image && "border-red-500 focus-visible:ring-red-500")}
                            />
                            {errors.company_image && <p className="text-red-500 text-xs mt-1">{errors.company_image}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="gst_certificate">Upload GST certificate (if available)</Label>
                            <Input
                                type="file"
                                id="gst_certificate"
                                onChange={handleFileChange}
                                className={cn(errors.gst_certificate && "border-red-500 focus-visible:ring-red-500")}
                            />
                            {errors.gst_certificate && <p className="text-red-500 text-xs mt-1">{errors.gst_certificate}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="udyam_registration">Upload UDYAM registration (if available)</Label>
                            <Input
                                type="file"
                                id="udyam_registration"
                                onChange={handleFileChange}
                                className={cn(errors.udyam_registration && "border-red-500 focus-visible:ring-red-500")}
                            />
                            {errors.udyam_registration && <p className="text-red-500 text-xs mt-1">{errors.udyam_registration}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="form_3">Upload Form-3 (if available)</Label>
                            <Input
                                type="file"
                                id="form_3"
                                onChange={handleFileChange}
                                className={cn(errors.form_3 && "border-red-500 focus-visible:ring-red-500")}
                            />
                            {errors.form_3 && <p className="text-red-500 text-xs mt-1">{errors.form_3}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="itr_1">Upload ITR 2023-24 (if available)</Label>
                            <Input
                                type="file"
                                id="itr_1"
                                onChange={handleFileChange}
                                className={cn(errors.itr_1 && "border-red-500 focus-visible:ring-red-500")}
                            />
                            {errors.itr_1 && <p className="text-red-500 text-xs mt-1">{errors.itr_1}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="itr_2">Upload ITR 2024-25 (if available)</Label>
                            <Input
                                type="file"
                                id="itr_2"
                                onChange={handleFileChange}
                                className={cn(errors.itr_2 && "border-red-500 focus-visible:ring-red-500")}
                            />
                            {errors.itr_2 && <p className="text-red-500 text-xs mt-1">{errors.itr_2}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bank_statement">Upload bank statement of last 12 months in net banking format</Label>
                            <Input
                                type="file"
                                id="bank_statement"
                                onChange={handleFileChange}
                                className={cn(errors.bank_statement && "border-red-500 focus-visible:ring-red-500")}
                            />
                            {errors.bank_statement && <p className="text-red-500 text-xs mt-1">{errors.bank_statement}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="shop_front">Upload Shop front picture<span className='text-red-500'>*</span></Label>
                            <Input
                                type="file"
                                id="shop_front"
                                onChange={handleFileChange}
                                className={cn(errors.shop_front && "border-red-500 focus-visible:ring-red-500")}
                            />
                            {errors.shop_front && <p className="text-red-500 text-xs mt-1">{errors.shop_front}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="house_electricity">Upload house electricity bill</Label>
                            <Input
                                type="file"
                                id="house_electricity"
                                onChange={handleFileChange}
                                className={cn(errors.house_electricity && "border-red-500 focus-visible:ring-red-500")}
                            />
                            {errors.house_electricity && <p className="text-red-500 text-xs mt-1">{errors.house_electricity}</p>}
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
            }


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
        </div>
    );
};

export default Documents;
