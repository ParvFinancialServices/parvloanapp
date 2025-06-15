"use client";
import Footer from "@/components/common/Footer";
import NavbarNew from "@/components/common/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Import Select components
import { createDSAAccount, submitDSAForm } from "@/lib/actions/dsa";
import { useState } from "react";
import { validateAllFields } from "./formValidation"; // Import the new validation file
import { cn, get_upload_promises } from "@/lib/utils"; // Import cn for conditional classnames
import { redirect, useRouter } from "next/navigation";

const SimpleDSAForm = () => {
  const [form, setForm] = useState({
    full_name: "",
    guardian_name: "",
    dob: "",
    gender: "Male", // Default value
    marital_status: "Unmarried", // Default value
    phone_no: "",
    alt_phone_no: "",
    email: "",
    aadhar_no: "",
    pan_no: "",
    present_address: "",
    permanent_address: "",
    date_of_joining: "",
    work_location: "",
    bank_account_no: "",
    bank_branch: "",

    // documents
    aadhar: undefined,
    pan: undefined,
    photo: undefined,
    bank_doc: undefined,
    education_certificate: undefined,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router=useRouter();

  // Generic handler for text/date/tel inputs
  const handleChange = (e) => {
    const { id, files, value, type } = e.target;
    const inputValue = type === "file" ? files[0] : value;

    setForm((prev) => ({
      ...prev,
      [id]: inputValue,
    }));

    // Clear error for the current field as user types
    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  // Handler for Shadcn Select components (gender, marital_status)
  const handleSelectChange = (id, value) => {
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));

    // Clear error for the current field
    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const submitForm = async () => {
    setIsSubmitting(true); // Indicate submission in progress

    // Validate all fields before submission
    const allFormErrors = validateAllFields(form);

    if (Object.keys(allFormErrors).length > 0) {
      setErrors(allFormErrors);
      setIsSubmitting(false); // Stop submission if errors found
      // Optional: Scroll to the first error
      const firstErrorField = Object.keys(allFormErrors)[0];
      document.getElementById(firstErrorField)?.focus();
      return;
    }

    setErrors({}); // Clear all errors if validation passes

    // In a real application, you would handle file uploads here first
    // For demonstration, we'll simulate the submission
    try {
      // Mocking file uploads (replace with actual upload logic if needed)
      const dataToSubmit = { ...form };
      const fileFields = [
        "aadhar",
        "pan",
        "photo",
        "bank_doc",
        "education_certificate",
      ];

      const uploadPromises = get_upload_promises(
        fileFields,
        form,
        dataToSubmit
      );

      await Promise.all(uploadPromises);

      const result = await createDSAAccount(dataToSubmit); // Call your actual submission action

      // const result2=await submitDSAForm(dataToSubmit);\
      if(result?.err){
        alert(result?.err);
        setIsSubmitting(false);
        return;
      }


      console.log(result);
      alert("Form submitted successfully!");
      // Optionally clear form after successful submission
      setForm({
        full_name: "",
        guardian_name: "",
        dob: "",
        gender: "Male",
        marital_status: "Unmarried",
        phone_no: "",
        alt_phone_no: "",
        email: "",
        aadhar_no: "",
        pan_no: "",
        present_address: "",
        permanent_address: "",
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
    } catch (error) {
      console.log("Submission failed:", error);
      // alert("Form submission failed. Please try again.");
    } finally {
      setIsSubmitting(false); // End submission process
      // router?.push("/login");
      redirect("/login")
    }
  };

  return (
    <div className="my-20">
      <NavbarNew />
      <div className="max-w-7xl border my-6 p-6 gap-4 rounded-2xl mx-auto shadow-lg">
        <h2 className="text-center text-2xl font-bold pb-6">
          Create New Account
        </h2>
        <form >
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3 ">
            {/* Full Name */}
            <div className="space-y-2 w-full">
              <Label htmlFor="full_name">
                Full Name<span className="text-red-500">*</span>
              </Label>
              <Input
                id="full_name"
                name="full_name"
                type="text"
                value={form.full_name}
                onChange={handleChange}
                className={cn(
                  errors.full_name && "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.full_name && (
                <p className="text-red-500 text-xs mt-1">{errors.full_name}</p>
              )}
            </div>

            {/* Guardian Name */}
            <div className="space-y-2">
              <Label htmlFor="guardian_name">
                Guardian Name<span className="text-red-500">*</span>
              </Label>
              <Input
                id="guardian_name"
                name="guardian_name"
                type="text"
                value={form.guardian_name}
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

            {/* Date of Birth */}
            <div className="space-y-2">
              <Label htmlFor="dob">
                Date of Birth<span className="text-red-500">*</span>
              </Label>
              <Input
                id="dob"
                name="dob"
                type="date"
                value={form.dob}
                onChange={handleChange}
                className={cn(
                  errors.dob && "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.dob && (
                <p className="text-red-500 text-xs mt-1">{errors.dob}</p>
              )}
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label htmlFor="gender">
                Gender<span className="text-red-500">*</span>
              </Label>
              <Select
                onValueChange={(value) => handleSelectChange("gender", value)}
                value={form.gender}
              >
                <SelectTrigger
                  id="gender"
                  className={cn(
                    "w-full",
                    errors.gender && "border-red-500 focus-visible:ring-red-500"
                  )}
                >
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
              )}
            </div>

            {/* Marital Status */}
            <div className="space-y-2">
              <Label htmlFor="marital_status">
                Marital Status<span className="text-red-500">*</span>
              </Label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("marital_status", value)
                }
                value={form.marital_status}
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
                  <SelectItem value="Unmarried">Unmarried</SelectItem>
                  <SelectItem value="Married">Married</SelectItem>
                </SelectContent>
              </Select>
              {errors.marital_status && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.marital_status}
                </p>
              )}
            </div>

            {/* Phone No */}
            <div className="space-y-2">
              <Label htmlFor="phone_no">
                Phone No<span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone_no"
                name="phone_no"
                type="tel"
                value={form.phone_no}
                onChange={handleChange}
                className={cn(
                  errors.phone_no && "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.phone_no && (
                <p className="text-red-500 text-xs mt-1">{errors.phone_no}</p>
              )}
            </div>

            {/* Alternate Phone No */}
            <div className="space-y-2">
              <Label htmlFor="alt_phone_no">
                Alternate Phone No<span className="text-red-500">*</span>
              </Label>
              <Input
                id="alt_phone_no"
                name="alt_phone_no"
                type="tel"
                value={form.alt_phone_no}
                onChange={handleChange}
                className={cn(
                  errors.alt_phone_no &&
                  "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.alt_phone_no && (
                <p className="text-red-500 text-xs mt-1">{errors.alt_phone_no}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">
                Email<span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className={cn(
                  errors.email && "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Aadhar No */}
            <div className="space-y-2">
              <Label htmlFor="aadhar_no">
                Aadhar No<span className="text-red-500">*</span>
              </Label>
              <Input
                id="aadhar_no"
                name="aadhar_no"
                type="text"
                value={form.aadhar_no}
                onChange={handleChange}
                className={cn(
                  errors.aadhar_no && "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.aadhar_no && (
                <p className="text-red-500 text-xs mt-1">{errors.aadhar_no}</p>
              )}
            </div>

            {/* PAN No */}
            <div className="space-y-2">
              <Label htmlFor="pan_no">
                PAN No<span className="text-red-500">*</span>
              </Label>
              <Input
                id="pan_no"
                name="pan_no"
                type="text"
                value={form.pan_no}
                onChange={handleChange}
                className={cn(
                  errors.pan_no && "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.pan_no && (
                <p className="text-red-500 text-xs mt-1">{errors.pan_no}</p>
              )}
            </div>

            {/* Present Address */}
            <div className="space-y-2 col-span-full">
              <Label htmlFor="present_address">
                Present Address<span className="text-red-500">*</span>
              </Label>
              <Input
                id="present_address"
                name="present_address"
                type="text"
                value={form.present_address}
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

            {/* Permanent Address */}
            <div className="space-y-2 col-span-full">
              <Label htmlFor="permanent_address">
                Permanent Address<span className="text-red-500">*</span>
              </Label>
              <Input
                id="permanent_address"
                name="permanent_address"
                type="text"
                value={form.permanent_address}
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

            {/* Date of Joining */}
            <div className="space-y-2">
              <Label htmlFor="date_of_joining">
                Date of Joining<span className="text-red-500">*</span>
              </Label>
              <Input
                id="date_of_joining"
                name="date_of_joining"
                type="date"
                value={form.date_of_joining}
                onChange={handleChange}
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

            {/* Work Location */}
            <div className="space-y-2">
              <Label htmlFor="work_location">
                Work Location<span className="text-red-500">*</span>
              </Label>
              <Input
                id="work_location"
                name="work_location"
                type="text"
                value={form.work_location}
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

            {/* Bank Account No */}
            <div className="space-y-2">
              <Label htmlFor="bank_account_no">
                Bank Account No<span className="text-red-500">*</span>
              </Label>
              <Input
                id="bank_account_no"
                name="bank_account_no"
                type="text"
                value={form.bank_account_no}
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

            {/* Bank Branch */}
            <div className="space-y-2">
              <Label htmlFor="bank_branch">
                Bank Branch<span className="text-red-500">*</span>
              </Label>
              <Input
                id="bank_branch"
                name="bank_branch"
                type="text"
                value={form.bank_branch}
                onChange={handleChange}
                className={cn(
                  errors.bank_branch &&
                  "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.bank_branch && (
                <p className="text-red-500 text-xs mt-1">{errors.bank_branch}</p>
              )}
            </div>

            {/* --- Documents Section --- */}
            <div className="col-span-full">
              <h2 className="text-lg font-semibold mt-6 mb-2">Documents</h2>
            </div>

            {/* Aadhar */}
            <div className="space-y-2">
              <Label htmlFor="aadhar">
                Aadhar<span className="text-red-500">*</span>
              </Label>
              <Input
                id="aadhar"
                name="aadhar"
                type="file"
                onChange={handleChange}
                className={cn(
                  errors.aadhar && "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.aadhar && (
                <p className="text-red-500 text-xs mt-1">{errors.aadhar}</p>
              )}
            </div>

            {/* PAN */}
            <div className="space-y-2">
              <Label htmlFor="pan">
                PAN<span className="text-red-500">*</span>
              </Label>
              <Input
                id="pan"
                name="pan"
                type="file"
                onChange={handleChange}
                className={cn(
                  errors.pan && "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.pan && (
                <p className="text-red-500 text-xs mt-1">{errors.pan}</p>
              )}
            </div>

            {/* Photo */}
            <div className="space-y-2">
              <Label htmlFor="photo">
                Photo<span className="text-red-500">*</span>
              </Label>
              <Input
                id="photo"
                name="photo"
                type="file"
                onChange={handleChange}
                className={cn(
                  errors.photo && "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.photo && (
                <p className="text-red-500 text-xs mt-1">{errors.photo}</p>
              )}
            </div>

            {/* Bank Document */}
            <div className="space-y-2">
              <Label htmlFor="bank_doc">
                Passbook Photo / Cancelled Cheque
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="bank_doc"
                name="bank_doc"
                type="file"
                onChange={handleChange}
                className={cn(
                  errors.bank_doc && "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.bank_doc && (
                <p className="text-red-500 text-xs mt-1">{errors.bank_doc}</p>
              )}
            </div>

            {/* Education Certificate */}
            <div className="space-y-2">
              <Label htmlFor="education_certificate">
                Education Certificate<span className="text-red-500">*</span>
              </Label>
              <Input
                id="education_certificate"
                name="education_certificate"
                type="file"
                onChange={handleChange}
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

          <div className="w-full mx-auto flex justify-center my-5">
            <Button
              type="submit"
              className={cn(
                "bg-primary text-white mx-auto cursor-pointer",
                isSubmitting && "opacity-70 cursor-not-allowed"
              )}
              onClick={submitForm}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>



      </div>
      <Footer />
    </div>
  );
};

export default SimpleDSAForm;
