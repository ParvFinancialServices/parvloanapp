"use client";

import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Removed Dialog imports as they are no longer needed
import { cn } from "@/lib/utils";
import { validateAllFields } from "./formValidation";
import { useUserState } from "../../store"; // Assuming useUserState is available for global state/loading
import { upload_doc } from "@/lib/actions/file";
import { createAccount } from "@/lib/actions/account";

const UserCreationForm = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    guardian_name: "",
    dob: "",
    gender: "",
    marital_status: "",
    phone_no: "",
    alt_phone_no: "",
    email: "",
    aadhar_no: "",
    pan_no: "",
    present_address: "",
    permanent_address: "",
    designation: "",
    date_of_joining: new Date().toISOString().split("T")[0],
    work_location: "",
    bank_account_no: "",
    bank_branch: "",
    aadhar: undefined,
    pan: undefined,
    photo: undefined,
    bank_doc: undefined,
    education_certificate: undefined,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Removed isSuccessDialogOpen and dialogMessage states as they are no longer needed

  const userState = useUserState(); // Access global user state for loader/info

  // Generic handler for text inputs
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Handler for Shadcn Select components
  const handleSelectChange = (id, value) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Handler for Date inputs with age validation
  const handleDateChange = (e) => {
    const dateValue = e.target.value;
    setFormData((prev) => ({
      ...prev,
      dob: dateValue,
    }));

    // Basic age validation for DOB
    if (dateValue) {
      const birthDate = new Date(dateValue);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 18) {
        setErrors((prev) => ({
          ...prev,
          dob: "Applicant must be at least 18 years old.",
        }));
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.dob;
          return newErrors;
        });
      }
    }
  };

  // Handler for file inputs
  const handleFileChange = (e) => {
    const { id, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: files[0], // Store the File object
    }));
  };

  // Function to handle the final submission logic, including API calls and alerts
  const handleFinalSubmit = async () => {
    const allFormErrors = validateAllFields(formData);

    if (Object.keys(allFormErrors).length > 0) {
      setErrors(allFormErrors);
      const firstErrorField = Object.keys(allFormErrors)[0];
      document.getElementById(firstErrorField)?.focus();
      return;
    }

    setIsSubmitting(true);
    setErrors({}); // Clear previous errors

    const dataToSubmit = { ...formData };

    // Define file fields for this form
    const fileFields = [
      "aadhar",
      "pan",
      "photo",
      "bank_doc",
      "education_certificate",
    ];

    // Handle file uploads
    const uploadPromises = fileFields.map(async (fieldName) => {
      const file = formData[fieldName];
      if (file instanceof File) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = async (result) => {
            try {
              const uploadedUrl = await upload_doc({
                file: result.target.result,
                folder: "user_creation_documents", // Specific folder for user docs
              });
              dataToSubmit[fieldName] = uploadedUrl.secure_url;
              resolve();
            } catch (error) {
              console.error(`Error uploading ${fieldName}:`, error);
              reject(error);
            }
          };
          reader.onerror = (error) => {
            console.error(`FileReader error for ${fieldName}:`, error);
            reject(error);
          };
          reader.readAsDataURL(file);
        });
      }
      return Promise.resolve();
    });

    try {
      await Promise.all(uploadPromises);
      console.log(
        "All files uploaded. Final form data for user creation:",
        dataToSubmit
      );

      const token = await userState.user.getIdToken(); // Get auth token
      userState.setShowLoader(true); // Show global loader

      const res = await createAccount(token, dataToSubmit); // Call the account creation API

      if (res && res.msg) {
        alert(
          `Account Created Successfully! ${res.msg} Your User ID is: ${
            res.userId || "N/A"
          }`
        );
        // Optionally clear form data after successful submission
        setFormData({
          full_name: "",
          guardian_name: "",
          dob: "",
          gender: "",
          marital_status: "",
          phone_no: "",
          alt_phone_no: "",
          email: "",
          aadhar_no: "",
          pan_no: "",
          present_address: "",
          permanent_address: "",
          designation: "",
          date_of_joining: "",
          work_location: "",
          bank_account_no: "",
          bank_branch: "",
          aadhar: undefined,
          pan: undefined,
          photo: undefined,
          bank_doc: undefined,
          education_certificate: undefined,
        });
      } else {
        alert(
          res.error ||
            "An unknown error occurred during account creation. Please try again."
        );
      }
    } catch (error) {
      console.error("Account creation failed:", error);
      alert(
        "An unexpected error occurred during account creation. Please check the console for details."
      );
    } finally {
      userState.setShowLoader(false); // Hide global loader
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col p-4">
      <CardHeader>
        <CardTitle className="text-2xl font-extrabold tracking-tight">
          Create New Account
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleFinalSubmit();
          }}
          className="space-y-8"
        >
          {/* Basic Info Section */}
          <div className="mb-8 pb-6">
            <h3 className="text-xl font-medium tracking-tight mb-4">
              Basic Info
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="full_name">
                  Full Name<span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  id="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className={cn(
                    errors.full_name &&
                      "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                {errors.full_name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.full_name}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="guardian_name">
                  Guardian's Name<span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  id="guardian_name"
                  value={formData.guardian_name}
                  onChange={handleChange}
                  className={cn(
                    errors.guardian_name &&
                      "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                {errors.guardian_name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.guardian_name}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">
                  Date of Birth<span className="text-red-500">*</span>
                </Label>
                <Input
                  type="date"
                  id="dob"
                  value={formData.dob}
                  onChange={handleDateChange}
                  className={cn(
                    errors.dob && "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                {errors.dob && (
                  <p className="text-red-500 text-xs mt-1">{errors.dob}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">
                  Gender<span className="text-red-500">*</span>
                </Label>
                <Select
                  onValueChange={(value) => handleSelectChange("gender", value)}
                  value={formData.gender}
                >
                  <SelectTrigger
                    id="gender"
                    className={cn(
                      "w-full",
                      errors.gender &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  >
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && (
                  <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="marital_status">
                  Marital Status<span className="text-red-500">*</span>
                </Label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange("marital_status", value)
                  }
                  value={formData.marital_status}
                >
                  <SelectTrigger
                    id="marital_status"
                    className={cn(
                      "w-full",
                      errors.marital_status &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  >
                    <SelectValue placeholder="Select Marital Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Married">Married</SelectItem>
                    <SelectItem value="Unmarried">Unmarried</SelectItem>
                  </SelectContent>
                </Select>
                {errors.marital_status && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.marital_status}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone_no">
                  Phone Number<span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  id="phone_no"
                  value={formData.phone_no}
                  onChange={handleChange}
                  className={cn(
                    errors.phone_no &&
                      "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                {errors.phone_no && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone_no}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="alt_phone_no">
                  Alternate Phone Number<span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  id="alt_phone_no"
                  value={formData.alt_phone_no}
                  onChange={handleChange}
                  className={cn(
                    errors.alt_phone_no &&
                      "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                {errors.alt_phone_no && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.alt_phone_no}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email<span className="text-red-500">*</span>
                </Label>
                <Input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={cn(
                    errors.email && "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="aadhar_no">
                  Aadhar Number<span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  id="aadhar_no"
                  value={formData.aadhar_no}
                  onChange={handleChange}
                  className={cn(
                    errors.aadhar_no &&
                      "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                {errors.aadhar_no && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.aadhar_no}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="pan_no">
                  PAN Number<span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  id="pan_no"
                  value={formData.pan_no}
                  onChange={handleChange}
                  className={cn(
                    errors.pan_no && "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                {errors.pan_no && (
                  <p className="text-red-500 text-xs mt-1">{errors.pan_no}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="present_address">
                  Present Address<span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  id="present_address"
                  value={formData.present_address}
                  onChange={handleChange}
                  className={cn(
                    errors.present_address &&
                      "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                {errors.present_address && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.present_address}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="permanent_address">
                  Permanent Address<span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  id="permanent_address"
                  value={formData.permanent_address}
                  onChange={handleChange}
                  className={cn(
                    errors.permanent_address &&
                      "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                {errors.permanent_address && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.permanent_address}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Job Specific Section */}
          <div className="mb-8 pb-6 border-b border-gray-200">
            <h3 className="text-xl font-medium tracking-tight mb-4">
              Job Specific
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="designation">
                  Designation<span className="text-red-500">*</span>
                </Label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange("designation", value)
                  }
                  value={formData.designation}
                >
                  <SelectTrigger
                    id="designation"
                    className={cn(
                      "w-full",
                      errors.designation &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  >
                    <SelectValue placeholder="Select Designation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RM">RM</SelectItem>
                    <SelectItem value="Telecaller">Telecaller</SelectItem>
                    <SelectItem value="Field Staff">Field Staff</SelectItem>
                  </SelectContent>
                </Select>
                {errors.designation && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.designation}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="date_of_joining">
                  Date of Joining<span className="text-red-500">*</span>
                </Label>
                <Input
                  type="date"
                  id="date_of_joining"
                  value={formData.date_of_joining}
                  onChange={handleChange}
                  disabled={true} // As per config
                  className={cn(
                    errors.date_of_joining &&
                      "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                {errors.date_of_joining && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.date_of_joining}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="work_location">
                  Work Location<span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  id="work_location"
                  value={formData.work_location}
                  onChange={handleChange}
                  className={cn(
                    errors.work_location &&
                      "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                {errors.work_location && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.work_location}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="bank_account_no">
                  Bank Account Number<span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  id="bank_account_no"
                  value={formData.bank_account_no}
                  onChange={handleChange}
                  className={cn(
                    errors.bank_account_no &&
                      "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                {errors.bank_account_no && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.bank_account_no}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="bank_branch">
                  Bank Branch Name<span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  id="bank_branch"
                  value={formData.bank_branch}
                  onChange={handleChange}
                  className={cn(
                    errors.bank_branch &&
                      "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                {errors.bank_branch && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.bank_branch}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Documents Section */}
          <div className="mb-8 pb-6">
            <h3 className="text-xl font-medium tracking-tight mb-4">
              Documents
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="aadhar">
                  Aadhar<span className="text-red-500">*</span>
                </Label>
                <Input
                  type="file"
                  id="aadhar"
                  onChange={handleFileChange}
                  className={cn(
                    errors.aadhar && "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                {errors.aadhar && (
                  <p className="text-red-500 text-xs mt-1">{errors.aadhar}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="pan">
                  PAN<span className="text-red-500">*</span>
                </Label>
                <Input
                  type="file"
                  id="pan"
                  onChange={handleFileChange}
                  className={cn(
                    errors.pan && "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                {errors.pan && (
                  <p className="text-red-500 text-xs mt-1">{errors.pan}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="photo">
                  Photo<span className="text-red-500">*</span>
                </Label>
                <Input
                  type="file"
                  id="photo"
                  onChange={handleFileChange}
                  className={cn(
                    errors.photo && "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                {errors.photo && (
                  <p className="text-red-500 text-xs mt-1">{errors.photo}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="bank_doc">
                  Passbook photo/Cancelled Cheque
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="file"
                  id="bank_doc"
                  onChange={handleFileChange}
                  className={cn(
                    errors.bank_doc &&
                      "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                {errors.bank_doc && (
                  <p className="text-red-500 text-xs mt-1">{errors.bank_doc}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="education_certificate">
                  Education Certificate<span className="text-red-500">*</span>
                </Label>
                <Input
                  type="file"
                  id="education_certificate"
                  onChange={handleFileChange}
                  className={cn(
                    errors.education_certificate &&
                      "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                {errors.education_certificate && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.education_certificate}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full py-2" disabled={isSubmitting}>
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
      </CardContent>
    </div>
  );
};

export default UserCreationForm;
