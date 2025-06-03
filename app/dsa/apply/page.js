'use client'
import Footer from "@/components/common/Footer";
import NavbarNew from "@/components/common/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitDSAForm } from "@/lib/actions/dsa";
import { useState } from "react";

const SimpleDSAForm = () => {
  const [form, setForm] = useState({
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

    // documents
    aadhar: undefined,
    pan: undefined,
    photo: undefined,
    bank_doc: undefined,
    education_certificate: undefined,
  });


  const handleChange = (e) => {
    const { id, files, value, type } = e.target;
    const inputValue = type === "file" ? files[0] : value;

    setForm((prev) => ({
      ...prev,
      [id]: inputValue,
    }));
  };

  const submitForm = async() => {
    try {
      const result = await submitDSAForm(form);
      console.log(result);
      alert("submitted")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="my-20">
      <NavbarNew />
      {/* <form> */}
        <div className="max-w-7xl border my-6 p-6 gap-4 rounded-2xl mx-auto">
          <h2 className="text-center text-2xl font-bold pb-6">Create New Account</h2>
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3 ">
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> */}
            {/* Full Name */}
            <div className="space-y-2 w-full">
              <Label htmlFor="full_name">Full Name</Label>
              <Input id="full_name" name="full_name" type="text" onChange={handleChange} />
            </div>

            {/* Guardian Name */}
            <div className="space-y-2">
              <Label htmlFor="guardian_name">Guardian Name</Label>
              <Input id="guardian_name" name="guardian_name" type="text" onChange={handleChange} />
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input id="dob" name="dob" type="date" onChange={handleChange} />
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <select
                id="gender"
                name="gender"
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Marital Status */}
            <div className="space-y-2">
              <Label htmlFor="marital_status">Marital Status</Label>
              <select
                id="marital_status"
                name="marital_status"
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="Unmarried">Unmarried</option>
                <option value="Married">Married</option>
              </select>
            </div>

            {/* Phone No */}
            <div className="space-y-2">
              <Label htmlFor="phone_no">Phone No</Label>
              <Input id="phone_no" name="phone_no" type="tel" onChange={handleChange} />
            </div>

            {/* Alternate Phone No */}
            <div className="space-y-2">
              <Label htmlFor="alt_phone_no">Alternate Phone No</Label>
              <Input id="alt_phone_no" name="alt_phone_no" type="tel" onChange={handleChange} />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" onChange={handleChange} />
            </div>

            {/* Aadhar No */}
            <div className="space-y-2">
              <Label htmlFor="aadhar_no">Aadhar No</Label>
              <Input id="aadhar_no" name="aadhar_no" type="text" onChange={handleChange} />
            </div>

            {/* PAN No */}
            <div className="space-y-2">
              <Label htmlFor="pan_no">PAN No</Label>
              <Input id="pan_no" name="pan_no" type="text" onChange={handleChange} />
            </div>

            {/* Present Address */}
            <div className="space-y-2 col-span-full">
              <Label htmlFor="present_address">Present Address</Label>
              <Input id="present_address" name="present_address" type="text" onChange={handleChange} />
            </div>

            {/* Permanent Address */}
            <div className="space-y-2 col-span-full">
              <Label htmlFor="permanent_address">Permanent Address</Label>
              <Input id="permanent_address" name="permanent_address" type="text" onChange={handleChange} />
            </div>

            {/* Date of Joining */}
            <div className="space-y-2">
              <Label htmlFor="date_of_joining">Date of Joining</Label>
              <Input id="date_of_joining" name="date_of_joining" type="date" onChange={handleChange} />
            </div>

            {/* Work Location */}
            <div className="space-y-2">
              <Label htmlFor="work_location">Work Location</Label>
              <Input id="work_location" name="work_location" type="text" onChange={handleChange} />
            </div>

            {/* Bank Account No */}
            <div className="space-y-2">
              <Label htmlFor="bank_account_no">Bank Account No</Label>
              <Input id="bank_account_no" name="bank_account_no" type="text" onChange={handleChange} />
            </div>

            {/* Bank Branch */}
            <div className="space-y-2">
              <Label htmlFor="bank_branch">Bank Branch</Label>
              <Input id="bank_branch" name="bank_branch" type="text" onChange={handleChange} />
            </div>
            {/* </div> */}

            {/* --- Documents Section --- */}
            <div className="col-span-full">
              <h2 className="text-lg font-semibold mt-6 mb-2">Documents</h2>
            </div>

            {/* Aadhar */}
            <div className="space-y-2">
              <Label htmlFor="aadhar">Aadhar</Label>
              <Input id="aadhar" name="aadhar" type="file" onChange={handleChange} />
            </div>

            {/* PAN */}
            <div className="space-y-2">
              <Label htmlFor="pan">PAN</Label>
              <Input id="pan" name="pan" type="file" onChange={handleChange} />
            </div>

            {/* Photo */}
            <div className="space-y-2">
              <Label htmlFor="photo">Photo</Label>
              <Input id="photo" name="photo" type="file"  onChange={handleChange} />
            </div>

            {/* Bank Document */}
            <div className="space-y-2">
              <Label htmlFor="bank_doc">Passbook Photo / Cancelled Cheque</Label>
              <Input id="bank_doc" name="bank_doc" type="file"  onChange={handleChange} />
            </div>

            {/* Education Certificate (optional) */}
            <div className="space-y-2">
              <Label htmlFor="education_certificate">Education Certificate</Label>
              <Input id="education_certificate" name="education_certificate" type="file" onChange={handleChange} />
            </div>
          </div>

          <div className="w-full mx-auto flex justify-center my-5">
            <Button className={'bg-primary text-white mx-auto cursor-pointer'} onClick={submitForm} >Submit</Button>
          </div>
        </div>
      {/* </form> */}
      <Footer />
    </div>

  );
};

export default SimpleDSAForm;

