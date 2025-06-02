"use client";

import { useState } from "react";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Yup schema for form validation
const signUpSchema = yup.object().shape({
    fullName: yup.string().required("Full name is required"),
    mobileNo: yup
        .string()
        .matches(/^\d{10}$/, "Mobile number must be 10 digits")
        .required("Mobile number is required"),
    whatsappNo: yup
        .string()
        .matches(/^\d{10}$/, "WhatsApp number must be 10 digits")
        .required("WhatsApp number is required"),
    email: yup.string().email("Invalid email address").required("Email is required"),
    profession: yup.string().required("Profession is required"),
    companyName: yup.string().required("Company name is required"),
    address: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    landmark: yup.string().required("Landmark is required"),
    district: yup.string().required("District is required"),
    state: yup.string().required("State is required"),
    pincode: yup
        .string()
        .matches(/^\d{6}$/, "Pincode must be 6 digits")
        .required("Pincode is required"),
    workExperience: yup.string().required("Work experience is required"),
});

export default function SignUpForm() {
    const [formData, setFormData] = useState({
        fullName: "",
        mobileNo: "",
        whatsappNo: "",
        email: "",
        profession: "",
        companyName: "",
        address: "",
        city: "",
        landmark: "",
        district: "",
        state: "",
        pincode: "",
        workExperience: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSelectChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Validate the form data
            await signUpSchema.validate(formData, { abortEarly: false });
            setErrors({}); // Clear errors if validation passes

            // Submit logic here
            console.log("Form Data:", formData);
            alert("Form submitted successfully! Confirmation sent to your email and WhatsApp.");
        } catch (validationErrors) {
            // Map Yup errors to field-specific error messages
            const newErrors = {};
            validationErrors.inner.forEach((error) => {
                newErrors[error.path] = error.message;
            });
            setErrors(newErrors);
        }
    };

    return (
        <div className=" bg-gray-50 rounded-lg md:p-8">
            <form onSubmit={handleSubmit} className="container mx-auto mb-8">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                        <Input
                            name="fullName"
                            value={formData?.fullName}
                            onChange={handleChange}
                            placeholder="Full Name"
                        />
                        {errors.fullName && <p className="text-red-500">{errors.fullName}</p>}

                    </div>

                    <div>
                        <Input
                            name="mobileNo"
                            value={formData?.mobileNo}
                            onChange={handleChange}
                            placeholder="Mobile Number"
                        />
                        {errors.mobileNo && <p className="text-red-500">{errors.mobileNo}</p>}
                    </div>

                    <div>
                        <Input
                            name="whatsappNo"
                            value={formData.whatsappNo}
                            onChange={handleChange}
                            placeholder="WhatsApp Number"
                        />
                        {errors.whatsappNo && <p className="text-red-500">{errors.whatsappNo}</p>}
                    </div>
                    <div>
                        <Input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email ID"
                        />
                        {errors.email && <p className="text-red-500">{errors.email}</p>}

                    </div>

                    <div>
                        <Select
                            onValueChange={(value) => handleSelectChange("profession", value)}
                            placeholder="Current Profession"
                        >
                            <SelectTrigger>
                                <SelectValue placeholder={formData.profession || "Select Profession"} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Job">Job</SelectItem>
                                <SelectItem value="Business">Business</SelectItem>
                                <SelectItem value="Self-employed">Self-employed</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.profession && <p className="text-red-500">{errors.profession}</p>}
                    </div>

                    <div>
                        <Input
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            placeholder="Company/Business/Firm Name"
                        />
                        {errors.companyName && <p className="text-red-500">{errors.companyName}</p>}
                    </div>
                    <div>
                        <Input
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Road/Street Name"
                        />
                        {errors.address && <p className="text-red-500">{errors.address}</p>}

                    </div>

                    <div>
                        <Input
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="Town/City"
                        />
                        {errors.city && <p className="text-red-500">{errors.city}</p>}
                    </div>
                    <div>
                        <Input
                            name="landmark"
                            value={formData.landmark}
                            onChange={handleChange}
                            placeholder="Landmark"
                        />
                        {errors.landmark && <p className="text-red-500">{errors.landmark}</p>}

                    </div>
                    <div>
                        <Input
                            name="district"
                            value={formData.district}
                            onChange={handleChange}
                            placeholder="District"
                        />
                        {errors.district && <p className="text-red-500">{errors.district}</p>}
                    </div>
                    <div>
                        <Input
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            placeholder="State"
                        />
                        {errors.state && <p className="text-red-500">{errors.state}</p>}

                    </div>
                    <div>
                        <Input
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            placeholder="Pincode"
                        />
                        {errors.pincode && <p className="text-red-500">{errors.pincode}</p>}
                    </div>

                    <div>
                        <Input
                            name="workExperience"
                            value={formData.workExperience}
                            onChange={handleChange}
                            placeholder="Total Work Experience"
                        />
                        {errors.workExperience && <p className="text-red-500">{errors.workExperience}</p>}
                    </div>

                </div>

                <div className="w-full flex justify-center mt-8">
                    <Button type="submit" className="mx-auto bg-blue-500">
                        Apply for DSA
                    </Button>
                </div>


            </form>
        </div>

    );
}
