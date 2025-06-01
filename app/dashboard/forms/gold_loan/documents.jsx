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
            <div className="mb-8 pb-6">
                <h3 className="text-xl font-medium tracking-tight mb-4">Personal Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        <Label htmlFor="personal_pan_upload">Upload Personal PAN image</Label>
                        <Input
                            type="file"
                            id="personal_pan_upload" // Corrected ID
                            onChange={handleFileChange}
                            className={cn(errors.personal_pan_upload && "border-red-500 focus-visible:ring-red-500")}
                        />
                        {errors.personal_pan_upload && <p className="text-red-500 text-xs mt-1">{errors.personal_pan_upload}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="house_electricity">Present address proof (electricity bill)</Label>
                        <Input
                            type="file"
                            id="house_electricity"
                            onChange={handleFileChange}
                            className={cn(errors.house_electricity && "border-red-500 focus-visible:ring-red-500")}
                        />
                        {errors.house_electricity && <p className="text-red-500 text-xs mt-1">{errors.house_electricity}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Documents;
