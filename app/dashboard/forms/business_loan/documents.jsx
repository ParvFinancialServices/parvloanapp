import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const Documents = ({ formData, setFormData, errors }) => {
    // Modified handleFileChange to directly update the flat formData
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
                        <Label htmlFor="photo">Upload Photo</Label>
                        <Input
                            type="file"
                            id="photo"
                            onChange={handleFileChange}
                            className={cn(errors.photo && "border-red-500 focus-visible:ring-red-500")}
                        />
                        {errors.photo && <p className="text-red-500 text-xs mt-1">{errors.photo}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="aadhar_front">Upload aadhar front image</Label>
                        <Input
                            type="file"
                            id="aadhar_front"
                            onChange={handleFileChange}
                            className={cn(errors.aadhar_front && "border-red-500 focus-visible:ring-red-500")}
                        />
                        {errors.aadhar_front && <p className="text-red-500 text-xs mt-1">{errors.aadhar_front}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="aadhar_back">Upload aadhar back image</Label>
                        <Input
                            type="file"
                            id="aadhar_back"
                            onChange={handleFileChange}
                            className={cn(errors.aadhar_back && "border-red-500 focus-visible:ring-red-500")}
                        />
                        {errors.aadhar_back && <p className="text-red-500 text-xs mt-1">{errors.aadhar_back}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="personal_pan_upload">Upload personal PAN image</Label>
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

            {/* Business Documents Section */}
            <div className="mb-8 pb-6">
                <h3 className="text-xl font-medium tracking-tight mb-4">Business Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="company_image">Upload company / firm image?</Label>
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
                        <Label htmlFor="itr_2023_2024">Upload ITR 2023-24 (if available)</Label>
                        <Input
                            type="file"
                            id="itr_2023_2024"
                            onChange={handleFileChange}
                            className={cn(errors.itr_2023_2024 && "border-red-500 focus-visible:ring-red-500")}
                        />
                        {errors.itr_2023_2024 && <p className="text-red-500 text-xs mt-1">{errors.itr_2023_2024}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="itr_2024_2025">Upload ITR 2024-25 (if available)</Label>
                        <Input
                            type="file"
                            id="itr_2024_2025"
                            onChange={handleFileChange}
                            className={cn(errors.itr_2024_2025 && "border-red-500 focus-visible:ring-red-500")}
                        />
                        {errors.itr_2024_2025 && <p className="text-red-500 text-xs mt-1">{errors.itr_2024_2025}</p>}
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
                        <Label htmlFor="shop_front">Upload Shop front picture</Label>
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
        </div>
    );
};

export default Documents;
