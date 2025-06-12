"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, get_upload_promises } from "@/lib/utils"; // Assuming cn utility is available
import { useUserState } from "@/app/dashboard/store";
import { setLoanByID } from "@/lib/actions/loan";
import { validateAllFields } from "@/app/dashboard/forms/personal_loan/formValidation";

const PersonalLoan = ({ id, initialData }) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userState = useUserState();

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    setFormData((prev) => {
      const updatedData = { ...prev };
      if (type === "checkbox") {
        updatedData[id] = checked;
        if (id === "same_as_permanent_address" && checked) {
          updatedData.present_building_name =
            prev.permanent_building_name || "";
          updatedData.present_street_name = prev.permanent_street_name || "";
          updatedData.present_landmark = prev.permanent_landmark || "";
          updatedData.present_city = prev.permanent_city || "";
          updatedData.present_district = prev.permanent_district || "";
          updatedData.present_state = prev.permanent_state || "";
          updatedData.present_pincode = prev.permanent_pincode || "";
        } else if (id === "same_as_permanent_address" && !checked) {
          updatedData.present_building_name = "";
          updatedData.present_street_name = "";
          updatedData.present_landmark = "";
          updatedData.present_city = "";
          updatedData.present_district = "";
          updatedData.present_state = "";
          updatedData.present_pincode = "";
        }
      } else {
        updatedData[id] = value;
      }
      return updatedData;
    });

    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (id, value) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const handleRadioChange = (id, value) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e) => {
    const { id, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: files[0],
    }));

    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const handleUpdateSubmit = async () => {
    setIsSubmitting(true);
    const allFormErrors = validateAllFields(formData);

    console.log(allFormErrors);
    if (Object.keys(allFormErrors).length > 0) {
      setErrors(allFormErrors);
      setIsSubmitting(false);
      const firstErrorField = Object.keys(allFormErrors)[0];
      document.getElementById(firstErrorField)?.focus();
      alert("Please fix the errors in the form before updating.");
      return;
    }

    setErrors({});

    const dataToSubmit = { ...formData };

    const fileFields = [
      "offer_letter",
      "bank_statement",
      "applicant_selfie",
      "aadhar_front",
      "aadhar_back",
      "personal_pan_upload",
      "salary_slip_1",
      "salary_slip_2",
      "salary_slip_3",
      "other_doc",
    ];

    try {
      const uploadPromises = get_upload_promises(
        fileFields,
        formData,
        dataToSubmit
      );
      await Promise.all(uploadPromises);

      console.log(
        "Final form data with uploaded URLs for Personal Loan update:",
        dataToSubmit
      );

      const token = await userState.user.getIdToken();
      userState.setShowLoader(true);

      dataToSubmit.loanId = "PERSONAL_LOAN_ID_FROM_ROUTE_OR_PROPS"; // IMPORTANT: Replace with actual loan ID

      const res = await setLoanByID(token, id, dataToSubmit);

      if (res && res.msg) {
        alert(`Personal Loan Update successful: ${res.msg}`);
      } else {
        alert("Personal Loan update failed. Please check console for details.");
      }
    } catch (error) {
      console.error("Personal Loan update failed:", error);
      alert(
        `An error occurred during update: ${error.message || "Unknown error"}`
      );
    } finally {
      userState.setShowLoader(false);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-4xl mx-auto my-8 border-2 shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight text-center">
            Edit Personal Loan Application
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateSubmit();
            }}
            className="space-y-8"
          >
            {/* Personal Details Section */}
            <div className="mb-8 pb-6 border-b border-gray-200">
              <h3 className="text-xl font-medium tracking-tight mb-4">
                Personal Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="loan_amount">
                    Loan Amount<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="loan_amount"
                    value={formData.loan_amount || ""}
                    onChange={handleChange}
                    className={cn(
                      errors.loan_amount &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.loan_amount && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.loan_amount}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="id_of_connector">
                    ID of Connector<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="id_of_connector"
                    value={formData.id_of_connector || ""}
                    onChange={handleChange}
                    className={cn(
                      errors.id_of_connector &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.id_of_connector && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.id_of_connector}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name_of_connector">
                    Name of Connector<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="name_of_connector"
                    value={formData.name_of_connector || ""}
                    onChange={handleChange}
                    className={cn(
                      errors.name_of_connector &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.name_of_connector && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name_of_connector}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="purpose_of_loan">
                    Purpose of Loan<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="purpose_of_loan"
                    value={formData.purpose_of_loan || ""}
                    onChange={handleChange}
                    className={cn(
                      errors.purpose_of_loan &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.purpose_of_loan && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.purpose_of_loan}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="applicant_name">
                    Applicant Name<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="applicant_name"
                    value={formData.applicant_name || ""}
                    onChange={handleChange}
                    className={cn(
                      errors.applicant_name &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.applicant_name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.applicant_name}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fathers_name">
                    Father's Name<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="fathers_name"
                    value={formData.fathers_name || ""}
                    onChange={handleChange}
                    className={cn(
                      errors.fathers_name &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.fathers_name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.fathers_name}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mothers_name">
                    Mother's Name<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="mothers_name"
                    value={formData.mothers_name || ""}
                    onChange={handleChange}
                    className={cn(
                      errors.mothers_name &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.mothers_name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.mothers_name}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone_no">
                    Phone Number<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="tel"
                    id="phone_no"
                    value={formData.phone_no || ""}
                    onChange={handleChange}
                    className={cn(
                      errors.phone_no &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.phone_no && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.phone_no}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alt_phone_no">Alternate Phone Number</Label>
                  <Input
                    type="tel"
                    id="alt_phone_no"
                    value={formData.alt_phone_no || ""}
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
                    value={formData.email || ""}
                    onChange={handleChange}
                    className={cn(
                      errors.email &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pan">
                    PAN<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="pan"
                    value={formData.pan || ""}
                    onChange={handleChange}
                    className={cn(
                      errors.pan && "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.pan && (
                    <p className="text-red-500 text-xs mt-1">{errors.pan}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">
                    Date of Birth<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="date"
                    id="dob"
                    value={formData.dob || ""}
                    onChange={handleChange}
                    className={cn(
                      errors.dob && "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.dob && (
                    <p className="text-red-500 text-xs mt-1">{errors.dob}</p>
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
                    value={formData.marital_status || "Unmarried"}
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
                {formData.marital_status === "Married" && (
                  <div className="space-y-2">
                    <Label htmlFor="spouse_name">
                      Spouse Name<span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="spouse_name"
                      value={formData.spouse_name || ""}
                      onChange={handleChange}
                      className={cn(
                        errors.spouse_name &&
                          "border-red-500 focus-visible:ring-red-500"
                      )}
                    />
                    {errors.spouse_name && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.spouse_name}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Co-applicant Details Section */}
            <div className="mb-8 pb-6 border-b border-gray-200">
              <h3 className="text-xl font-medium tracking-tight mb-4">
                Co-Applicant Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="co_applicant_name">
                    Co-Applicant Name<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="co_applicant_name"
                    value={formData.co_applicant_name || ""}
                    onChange={handleChange}
                    className={cn(
                      errors.co_applicant_name &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.co_applicant_name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.co_applicant_name}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="co_applicant_dob">
                    Co-Applicant Date of Birth
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="date"
                    id="co_applicant_dob"
                    value={formData.co_applicant_dob || ""}
                    onChange={handleChange}
                    className={cn(
                      errors.co_applicant_dob &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.co_applicant_dob && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.co_applicant_dob}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="co_occupation">
                    Co-Applicant Occupation
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="co_occupation"
                    value={formData.co_occupation || ""}
                    onChange={handleChange}
                    className={cn(
                      errors.co_occupation &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.co_occupation && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.co_occupation}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Permanent Address Section */}
            <div className="mb-8 pb-6 border-b border-gray-200">
              <h3 className="text-xl font-medium tracking-tight mb-4">
                Permanent Address (as on Aadhar)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="permanent_building_name">
                    Building/House Name<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="permanent_building_name"
                    value={formData.permanent_building_name || ""}
                    onChange={handleChange}
                    className={cn(
                      errors.permanent_building_name &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.permanent_building_name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.permanent_building_name}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="permanent_street_name">
                    Street/Road Name<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="permanent_street_name"
                    value={formData.permanent_street_name || ""}
                    onChange={handleChange}
                    className={cn(
                      errors.permanent_street_name &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.permanent_street_name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.permanent_street_name}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="permanent_landmark">Landmark</Label>
                  <Input
                    type="text"
                    id="permanent_landmark"
                    value={formData.permanent_landmark || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="permanent_city">
                    City<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="permanent_city"
                    value={formData.permanent_city || ""}
                    onChange={handleChange}
                    className={cn(
                      errors.permanent_city &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.permanent_city && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.permanent_city}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="permanent_district">
                    District<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="permanent_district"
                    value={formData.permanent_district || ""}
                    onChange={handleChange}
                    className={cn(
                      errors.permanent_district &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.permanent_district && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.permanent_district}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="permanent_state">
                    State<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="permanent_state"
                    value={formData.permanent_state || ""}
                    onChange={handleChange}
                    className={cn(
                      errors.permanent_state &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.permanent_state && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.permanent_state}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="permanent_pincode">
                    Pincode<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="permanent_pincode"
                    value={formData.permanent_pincode || ""}
                    onChange={handleChange}
                    className={cn(
                      errors.permanent_pincode &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.permanent_pincode && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.permanent_pincode}
                    </p>
                  )}
                </div>

                <div className="space-y-2 col-span-full">
                  <Label
                    htmlFor="same_as_permanent_address"
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id="same_as_permanent_address"
                      checked={formData.same_as_permanent_address}
                      onCheckedChange={(checked) =>
                        handleChange({
                          target: {
                            id: "same_as_permanent_address",
                            checked,
                            type: "checkbox",
                          },
                        })
                      }
                    />
                    <span>Same as Permanent Address</span>
                  </Label>
                </div>
              </div>
            </div>

            {/* Present Address Section (Conditional) */}
            {!formData.same_as_permanent_address && (
              <div className="mb-8 pb-6 border-b border-gray-200">
                <h3 className="text-xl font-medium tracking-tight mb-4">
                  Present Address (Current Staying Address)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="present_building_name">
                      Building/House Name<span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="present_building_name"
                      value={formData.present_building_name || ""}
                      onChange={handleChange}
                      className={cn(
                        errors.present_building_name &&
                          "border-red-500 focus-visible:ring-red-500"
                      )}
                    />
                    {errors.present_building_name && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.present_building_name}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="present_street_name">
                      Street/Road Name<span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="present_street_name"
                      value={formData.present_street_name || ""}
                      onChange={handleChange}
                      className={cn(
                        errors.present_street_name &&
                          "border-red-500 focus-visible:ring-red-500"
                      )}
                    />
                    {errors.present_street_name && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.present_street_name}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="present_landmark">Landmark</Label>
                    <Input
                      type="text"
                      id="present_landmark"
                      value={formData.present_landmark || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="present_city">
                      City<span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="present_city"
                      value={formData.present_city || ""}
                      onChange={handleChange}
                      className={cn(
                        errors.present_city &&
                          "border-red-500 focus-visible:ring-red-500"
                      )}
                    />
                    {errors.present_city && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.present_city}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="present_district">
                      District<span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="present_district"
                      value={formData.present_district || ""}
                      onChange={handleChange}
                      className={cn(
                        errors.present_district &&
                          "border-red-500 focus-visible:ring-red-500"
                      )}
                    />
                    {errors.present_district && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.present_district}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="present_state">
                      State<span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="present_state"
                      value={formData.present_state || ""}
                      onChange={handleChange}
                      className={cn(
                        errors.present_state &&
                          "border-red-500 focus-visible:ring-red-500"
                      )}
                    />
                    {errors.present_state && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.present_state}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="present_pincode">
                      Pincode<span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="present_pincode"
                      value={formData.present_pincode || ""}
                      onChange={handleChange}
                      className={cn(
                        errors.present_pincode &&
                          "border-red-500 focus-visible:ring-red-500"
                      )}
                    />
                    {errors.present_pincode && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.present_pincode}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Employment Details Section */}
            <div className="mb-8 pb-6 border-b border-gray-200">
              <h3 className="text-xl font-medium tracking-tight mb-4">
                Employment Details (Job Specific)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="current_company_name">
                    Current Company Name<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="current_company_name"
                    value={formData.current_company_name || ""}
                    onChange={handleChange}
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
                    Salary Account Bank<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="salary_account_bank"
                    value={formData.salary_account_bank || ""}
                    onChange={handleChange}
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
                    Savings Account Bank<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="savings_account_bank"
                    value={formData.savings_account_bank || ""}
                    onChange={handleChange}
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
                  <Label htmlFor="job_tenure">
                    Job Tenure<span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("job_tenure", value)
                    }
                    value={formData.job_tenure || "0-12 months"}
                  >
                    <SelectTrigger
                      id="job_tenure"
                      className={cn(
                        "w-full",
                        errors.job_tenure &&
                          "border-red-500 focus-visible:ring-red-500"
                      )}
                    >
                      <SelectValue placeholder="Select Job Tenure" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-12 months">0-12 months</SelectItem>
                      <SelectItem value="12-24 months">12-24 months</SelectItem>
                      <SelectItem value="24-60 months">24-60 months</SelectItem>
                      <SelectItem value="more than 60 months">
                        More than 60 months
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.job_tenure && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.job_tenure}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="job_experience">
                    Job Experience<span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("job_experience", value)
                    }
                    value={formData.job_experience || "less than 1 year"}
                  >
                    <SelectTrigger
                      id="job_experience"
                      className={cn(
                        "w-full",
                        errors.job_experience &&
                          "border-red-500 focus-visible:ring-red-500"
                      )}
                    >
                      <SelectValue placeholder="Select Job Experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="less than 1 year">
                        Less than 1 year
                      </SelectItem>
                      <SelectItem value="1-2 years">1-2 years</SelectItem>
                      <SelectItem value="2-3 years">2-3 years</SelectItem>
                      <SelectItem value="3-5 years">3-5 years</SelectItem>
                      <SelectItem value="more than 5 years">
                        More than 5 years
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
                  <Label htmlFor="monthly_income">
                    Monthly Income<span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("monthly_income", value)
                    }
                    value={formData.monthly_income || "less than 12,000"}
                  >
                    <SelectTrigger
                      id="monthly_income"
                      className={cn(
                        "w-full",
                        errors.monthly_income &&
                          "border-red-500 focus-visible:ring-red-500"
                      )}
                    >
                      <SelectValue placeholder="Select Monthly Income" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="less than 12,000">
                        Less than 12,000
                      </SelectItem>
                      <SelectItem value="15,000 - 20,000">
                        15,000 - 20,000
                      </SelectItem>
                      <SelectItem value="20,000 - 25,000">
                        20,000 - 25,000
                      </SelectItem>
                      <SelectItem value="25-000 - 30,000">
                        25,000 - 30,000
                      </SelectItem>
                      <SelectItem value="30,000 - 35,000">
                        30,000 - 35,000
                      </SelectItem>
                      <SelectItem value="35,000 - 45,000">
                        35,000 - 45,000
                      </SelectItem>
                      <SelectItem value="above 45,000">Above 45,000</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.monthly_income && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.monthly_income}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="office_building_name">
                    Office Building Name<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="office_building_name"
                    value={formData.office_building_name || ""}
                    onChange={handleChange}
                    className={cn(
                      errors.office_building_name &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.office_building_name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.office_building_name}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="office_street_name">
                    Office Street Name<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="office_street_name"
                    value={formData.office_street_name || ""}
                    onChange={handleChange}
                    className={cn(
                      errors.office_street_name &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.office_street_name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.office_street_name}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="office_landmark">Office Landmark</Label>
                  <Input
                    type="text"
                    id="office_landmark"
                    value={formData.office_landmark || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="office_city">
                    Office City<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="office_city"
                    value={formData.office_city || ""}
                    onChange={handleChange}
                    className={cn(
                      errors.office_city &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.office_city && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.office_city}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="office_district">
                    Office District<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="office_district"
                    value={formData.office_district || ""}
                    onChange={handleChange}
                    className={cn(
                      errors.office_district &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.office_district && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.office_district}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="office_state">
                    Office State<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="office_state"
                    value={formData.office_state || ""}
                    onChange={handleChange}
                    className={cn(
                      errors.office_state &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.office_state && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.office_state}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="office_pincode">
                    Office Pincode<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="office_pincode"
                    value={formData.office_pincode || ""}
                    onChange={handleChange}
                    className={cn(
                      errors.office_pincode &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.office_pincode && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.office_pincode}
                    </p>
                  )}
                </div>

                <div className="space-y-2 col-span-full">
                  <Label
                    htmlFor="have_offer_letter"
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id="have_offer_letter"
                      checked={formData.have_offer_letter}
                      onCheckedChange={(checked) =>
                        handleChange({
                          target: {
                            id: "have_offer_letter",
                            checked,
                            type: "checkbox",
                          },
                        })
                      }
                    />
                    <span>Have Offer Letter</span>
                  </Label>
                </div>
                {formData.have_offer_letter && (
                  <div className="space-y-2">
                    <Label htmlFor="offer_letter">
                      Offer Letter<span className="text-red-500">*</span>
                    </Label>
                    {formData.offer_letter &&
                      typeof formData.offer_letter === "string" && (
                        <p className="text-sm text-gray-600">
                          Existing:{" "}
                          <a
                            href={formData.offer_letter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            View Current
                          </a>
                        </p>
                      )}
                    <Input
                      type="file"
                      id="offer_letter"
                      onChange={handleFileChange}
                      className={cn(
                        errors.offer_letter &&
                          "border-red-500 focus-visible:ring-red-500"
                      )}
                    />
                    {errors.offer_letter && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.offer_letter}
                      </p>
                    )}
                  </div>
                )}

                <div className="space-y-2 col-span-full">
                  <Label
                    htmlFor="have_tan_no"
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id="have_tan_no"
                      checked={formData.have_tan_no}
                      onCheckedChange={(checked) =>
                        handleChange({
                          target: {
                            id: "have_tan_no",
                            checked,
                            type: "checkbox",
                          },
                        })
                      }
                    />
                    <span>Have TAN No.</span>
                  </Label>
                </div>
                {formData.have_tan_no && (
                  <div className="space-y-2">
                    <Label htmlFor="tan_no">
                      TAN No.<span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="tan_no"
                      value={formData.tan_no || ""}
                      onChange={handleChange}
                      className={cn(
                        errors.tan_no &&
                          "border-red-500 focus-visible:ring-red-500"
                      )}
                    />
                    {errors.tan_no && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.tan_no}
                      </p>
                    )}
                  </div>
                )}

                <div className="space-y-2 col-span-full">
                  <Label
                    htmlFor="has_bank_statement"
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id="has_bank_statement"
                      checked={formData.has_bank_statement}
                      onCheckedChange={(checked) =>
                        handleChange({
                          target: {
                            id: "has_bank_statement",
                            checked,
                            type: "checkbox",
                          },
                        })
                      }
                    />
                    <span>Has Bank Statement</span>
                  </Label>
                </div>
                {formData.has_bank_statement && (
                  <div className="space-y-2">
                    <Label htmlFor="bank_statement">
                      Bank Statement<span className="text-red-500">*</span>
                    </Label>
                    {formData.bank_statement &&
                      typeof formData.bank_statement === "string" && (
                        <p className="text-sm text-gray-600">
                          Existing:{" "}
                          <a
                            href={formData.bank_statement}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            View Current
                          </a>
                        </p>
                      )}
                    <Input
                      type="file"
                      id="bank_statement"
                      onChange={handleFileChange}
                      className={cn(
                        errors.bank_statement &&
                          "border-red-500 focus-visible:ring-red-500"
                      )}
                    />
                    {errors.bank_statement && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.bank_statement}
                      </p>
                    )}
                  </div>
                )}

                <div className="space-y-2 col-span-full">
                  <Label
                    htmlFor="has_current_loan"
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id="has_current_loan"
                      checked={formData.has_current_loan}
                      onCheckedChange={(checked) =>
                        handleChange({
                          target: {
                            id: "has_current_loan",
                            checked,
                            type: "checkbox",
                          },
                        })
                      }
                    />
                    <span>Has Current Loan</span>
                  </Label>
                </div>
                {formData.has_current_loan && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="existing_loans">
                        Existing Loans Details
                        <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="text"
                        id="existing_loans"
                        value={formData.existing_loans || ""}
                        onChange={handleChange}
                        className={cn(
                          errors.existing_loans &&
                            "border-red-500 focus-visible:ring-red-500"
                        )}
                      />
                      {errors.existing_loans && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.existing_loans}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="total_loan_amount">
                        Total Loan Amount<span className="text-red-500">*</span>
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          handleSelectChange("total_loan_amount", value)
                        }
                        value={formData.total_loan_amount || "less than 50,000"}
                      >
                        <SelectTrigger
                          id="total_loan_amount"
                          className={cn(
                            "w-full",
                            errors.total_loan_amount &&
                              "border-red-500 focus-visible:ring-red-500"
                          )}
                        >
                          <SelectValue placeholder="Select Loan Amount" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="less than 50,000">
                            Less than 50,000
                          </SelectItem>
                          <SelectItem value="50,000 - 1 lakh">
                            50,000 - 1 Lakh
                          </SelectItem>
                          <SelectItem value="1-3 lakhs">1-3 Lakhs</SelectItem>
                          <SelectItem value="3-5 lakhs">3-5 Lakhs</SelectItem>
                          <SelectItem value="above 5 lakhs">
                            Above 5 Lakhs
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.total_loan_amount && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.total_loan_amount}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="loan_start_date">
                        Loan Start Date (Duration Before)
                        <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          handleSelectChange("loan_start_date", value)
                        }
                        value={formData.loan_start_date || "0-12 months before"}
                      >
                        <SelectTrigger
                          id="loan_start_date"
                          className={cn(
                            "w-full",
                            errors.loan_start_date &&
                              "border-red-500 focus-visible:ring-red-500"
                          )}
                        >
                          <SelectValue placeholder="Select Duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-12 months before">
                            0-12 months before
                          </SelectItem>
                          <SelectItem value="12-24 months before">
                            12-24 months before
                          </SelectItem>
                          <SelectItem value="more than 24 months before">
                            More than 24 months before
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
                        Loan Provider Bank
                        <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="text"
                        id="loan_provider_bank"
                        value={formData.loan_provider_bank || ""}
                        onChange={handleChange}
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
                        Monthly EMI<span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="text"
                        id="monthly_emi"
                        value={formData.monthly_emi || ""}
                        onChange={handleChange}
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
                  </>
                )}
              </div>
            </div>

            {/* Documents Section */}
            <div className="mb-8 pb-6">
              <h3 className="text-xl font-medium tracking-tight mb-4">
                Documents
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="applicant_selfie">
                    Upload Applicant Selfie
                    <span className="text-red-500">*</span>
                  </Label>
                  {formData.applicant_selfie &&
                    typeof formData.applicant_selfie === "string" && (
                      <p className="text-sm text-gray-600">
                        Existing:{" "}
                        <a
                          href={formData.applicant_selfie}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View Current
                        </a>
                      </p>
                    )}
                  <Input
                    type="file"
                    id="applicant_selfie"
                    onChange={handleFileChange}
                    className={cn(
                      errors.applicant_selfie &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.applicant_selfie && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.applicant_selfie}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aadhar_front">
                    Aadhar Front<span className="text-red-500">*</span>
                  </Label>
                  {formData.aadhar_front &&
                    typeof formData.aadhar_front === "string" && (
                      <p className="text-sm text-gray-600">
                        Existing:{" "}
                        <a
                          href={formData.aadhar_front}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View Current
                        </a>
                      </p>
                    )}
                  <Input
                    type="file"
                    id="aadhar_front"
                    onChange={handleFileChange}
                    className={cn(
                      errors.aadhar_front &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.aadhar_front && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.aadhar_front}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aadhar_back">
                    Aadhar Back<span className="text-red-500">*</span>
                  </Label>
                  {formData.aadhar_back &&
                    typeof formData.aadhar_back === "string" && (
                      <p className="text-sm text-gray-600">
                        Existing:{" "}
                        <a
                          href={formData.aadhar_back}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View Current
                        </a>
                      </p>
                    )}
                  <Input
                    type="file"
                    id="aadhar_back"
                    onChange={handleFileChange}
                    className={cn(
                      errors.aadhar_back &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.aadhar_back && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.aadhar_back}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="personal_pan_upload">
                    Personal PAN Upload<span className="text-red-500">*</span>
                  </Label>
                  {formData.personal_pan_upload &&
                    typeof formData.personal_pan_upload === "string" && (
                      <p className="text-sm text-gray-600">
                        Existing:{" "}
                        <a
                          href={formData.personal_pan_upload}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View Current
                        </a>
                      </p>
                    )}
                  <Input
                    type="file"
                    id="personal_pan_upload"
                    onChange={handleFileChange}
                    className={cn(
                      errors.personal_pan_upload &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.personal_pan_upload && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.personal_pan_upload}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary_slip_1">
                    Salary slip-1<span className="text-red-500">*</span>
                  </Label>
                  {formData.salary_slip_1 &&
                    typeof formData.salary_slip_1 === "string" && (
                      <p className="text-sm text-gray-600">
                        Existing:{" "}
                        <a
                          href={formData.salary_slip_1}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View Current
                        </a>
                      </p>
                    )}
                  <Input
                    type="file"
                    id="salary_slip_1"
                    onChange={handleFileChange}
                    className={cn(
                      errors.salary_slip_1 &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.salary_slip_1 && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.salary_slip_1}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary_slip_2">Salary slip-2</Label>
                  {formData.salary_slip_2 &&
                    typeof formData.salary_slip_2 === "string" && (
                      <p className="text-sm text-gray-600">
                        Existing:{" "}
                        <a
                          href={formData.salary_slip_2}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View Current
                        </a>
                      </p>
                    )}
                  <Input
                    type="file"
                    id="salary_slip_2"
                    onChange={handleFileChange}
                    className={cn(
                      errors.salary_slip_2 &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.salary_slip_2 && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.salary_slip_2}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary_slip_3">Salary slip-3</Label>
                  {formData.salary_slip_3 &&
                    typeof formData.salary_slip_3 === "string" && (
                      <p className="text-sm text-gray-600">
                        Existing:{" "}
                        <a
                          href={formData.salary_slip_3}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View Current
                        </a>
                      </p>
                    )}
                  <Input
                    type="file"
                    id="salary_slip_3"
                    onChange={handleFileChange}
                    className={cn(
                      errors.salary_slip_3 &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.salary_slip_3 && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.salary_slip_3}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="other_doc">Upload any other documents</Label>
                  {formData.other_doc &&
                    typeof formData.other_doc === "string" && (
                      <p className="text-sm text-gray-600">
                        Existing:{" "}
                        <a
                          href={formData.other_doc}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View Current
                        </a>
                      </p>
                    )}
                  <Input
                    type="file"
                    id="other_doc"
                    onChange={handleFileChange}
                    className={cn(
                      errors.other_doc &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.other_doc && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.other_doc}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex w-full items-center justify-center pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 rounded-md text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              >
                {isSubmitting
                  ? "Updating..."
                  : "Update Personal Loan Application"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Global Loading Indicator (optional, but good practice) */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-xl">
            <svg
              className="animate-spin h-10 w-10 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p className="mt-4 text-lg font-medium text-gray-700">
              Updating your application...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalLoan;
