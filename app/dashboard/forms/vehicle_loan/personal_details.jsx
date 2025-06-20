import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

const PersonalDetails = ({ formData, setFormData, errors, setErrors }) => {
    const handleFieldChange = (fieldName, value) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: value
        }));
    };

    const handleDateChange = (e) => {
        const dateValue = e.target.value;
        let age = null;
        if (dateValue) {
            const birthDate = new Date(dateValue);
            const today = new Date();
            age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
        }

        if (age !== null && age < 21) {
            setErrors(prev => ({ ...prev, dob: "Applicant's age must be more than 21 years" }));
            return;
        }

        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors.dob;
            return newErrors;
        });
        handleFieldChange('dob', dateValue);
    };

    const handleCheckboxChange = (id, checked) => {
        setFormData(prev => {
            const updatedFormData = {
                ...prev,
                [id]: checked
            };

            if (id === 'same_as_permanent_address') {
                if (checked) {
                    updatedFormData.present_building_name = prev.permanent_building_name || '';
                    updatedFormData.present_street_name = prev.permanent_street_name || '';
                    updatedFormData.present_landmark = prev.permanent_landmark || '';
                    updatedFormData.present_city = prev.permanent_city || '';
                    updatedFormData.present_district = prev.permanent_district || '';
                    updatedFormData.present_state = prev.permanent_state || '';
                    updatedFormData.present_pincode = prev.permanent_pincode || '';
                } else {
                    updatedFormData.present_building_name = '';
                    updatedFormData.present_street_name = '';
                    updatedFormData.present_landmark = '';
                    updatedFormData.present_city = '';
                    updatedFormData.present_district = '';
                    updatedFormData.present_state = '';
                    updatedFormData.present_pincode = '';
                }
            }

            return updatedFormData;
        });
    };

    return (
        <div className="mb-8 pb-6 border-b border-gray-200">

            {/* Prerequisits Section */}
            <div className="mb-8 pb-6 border-b border-gray-200">
                <h3 className="text-xl font-medium tracking-tight mb-4">Prerequisits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="loan_amount">Loan Amount<span className='text-red-500'>*</span></Label>
                        <Input
                            type="text"
                            id="loan_amount"
                            value={formData.loan_amount || ''}
                            onChange={(e) => handleFieldChange('loan_amount', e.target.value)}
                            className={cn(errors.loan_amount && "border-red-500 focus-visible:ring-red-500")}
                        />
                        {errors.loan_amount && <p className="text-red-500 text-xs mt-1">{errors.loan_amount}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="id_of_connector">ID of Connector<span className='text-red-500'>*</span></Label>
                        <Input
                            type="text"
                            id="id_of_connector"
                            value={formData.id_of_connector || ''}
                            onChange={(e) => handleFieldChange('id_of_connector', e.target.value)}
                            className={cn(errors.id_of_connector && "border-red-500 focus-visible:ring-red-500")}
                        />
                        {errors.id_of_connector && <p className="text-red-500 text-xs mt-1">{errors.id_of_connector}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="name_of_connector">Name of Connector<span className='text-red-500'>*</span></Label>
                        <Input
                            type="text"
                            id="name_of_connector"
                            value={formData.name_of_connector || ''}
                            onChange={(e) => handleFieldChange('name_of_connector', e.target.value)}
                            className={cn(errors.name_of_connector && "border-red-500 focus-visible:ring-red-500")}
                        />
                        {errors.name_of_connector && <p className="text-red-500 text-xs mt-1">{errors.name_of_connector}</p>}
                    </div>
                </div>
            </div>

            {/* Personal Information Section */}
            <div className="mb-8 pb-6 border-b border-gray-200">
                <h3 className="text-xl font-medium tracking-tight mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="applicant_name">Name<span className='text-red-500'>*</span></Label>
                        <Input
                            type="text"
                            id="applicant_name"
                            value={formData.applicant_name || ''}
                            onChange={(e) => handleFieldChange('applicant_name', e.target.value)}
                            className={cn(errors.applicant_name && "border-red-500 focus-visible:ring-red-500")}
                        />
                        {errors.applicant_name && <p className="text-red-500 text-xs mt-1">{errors.applicant_name}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="fathers_name">Father's Name<span className='text-red-500'>*</span></Label>
                        <Input
                            type="text"
                            id="fathers_name"
                            value={formData.fathers_name || ''}
                            onChange={(e) => handleFieldChange('fathers_name', e.target.value)}
                            className={cn(errors.fathers_name && "border-red-500 focus-visible:ring-red-500")}
                        />
                        {errors.fathers_name && <p className="text-red-500 text-xs mt-1">{errors.fathers_name}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="mothers_name">Mother's Name<span className='text-red-500'>*</span></Label>
                        <Input
                            type="text"
                            id="mothers_name"
                            value={formData.mothers_name || ''}
                            onChange={(e) => handleFieldChange('mothers_name', e.target.value)}
                            className={cn(errors.mothers_name && "border-red-500 focus-visible:ring-red-500")}
                        />
                        {errors.mothers_name && <p className="text-red-500 text-xs mt-1">{errors.mothers_name}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone_no">Phone Number<span className='text-red-500'>*</span></Label>
                        <Input
                            type="text"
                            id="phone_no"
                            value={formData.phone_no || ''}
                            onChange={(e) => handleFieldChange('phone_no', e.target.value)}
                            className={cn(errors.phone_no && "border-red-500 focus-visible:ring-red-500")}
                        />
                        {errors.phone_no && <p className="text-red-500 text-xs mt-1">{errors.phone_no}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="alt_phone_no">Alternate Phone Number</Label>
                        <Input
                            type="text"
                            id="alt_phone_no"
                            value={formData.alt_phone_no || ''}
                            onChange={(e) => handleFieldChange('alt_phone_no', e.target.value)}
                            className={cn(errors.alt_phone_no && "border-red-500 focus-visible:ring-red-500")}
                        />
                        {errors.alt_phone_no && <p className="text-red-500 text-xs mt-1">{errors.alt_phone_no}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="pan">PAN Number<span className='text-red-500'>*</span></Label>
                        <Input
                            type="text"
                            id="pan"
                            value={formData.pan || ''}
                            onChange={(e) => handleFieldChange('pan', e.target.value)}
                            className={cn(errors.pan && "border-red-500 focus-visible:ring-red-500")}
                        />
                        {errors.pan && <p className="text-red-500 text-xs mt-1">{errors.pan}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="dob">Date of Birth<span className='text-red-500'>*</span></Label>
                        <Input
                            type="date"
                            id="dob"
                            value={formData.dob || ''}
                            onChange={handleDateChange}
                            className={cn(errors.dob && "border-red-500 focus-visible:ring-red-500")}
                        />
                        {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label>Marital Status<span className='text-red-500'>*</span></Label>
                        <RadioGroup
                            onValueChange={(value) => handleFieldChange('marital_status', value)}
                            value={formData.marital_status || 'Unmarried'}
                            className={cn("flex items-center space-x-4", errors.marital_status && "border border-red-500 p-2 rounded-md")}
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Married" id="marital_status_married" />
                                <Label htmlFor="marital_status_married">Married</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Unmarried" id="marital_status_unmarried" />
                                <Label htmlFor="marital_status_unmarried">Unmarried</Label>
                            </div>
                        </RadioGroup>
                        {errors.marital_status && <p className="text-red-500 text-xs mt-1">{errors.marital_status}</p>}

                        {formData.marital_status === 'Married' && (
                            <div className="space-y-2 mt-4">
                                <Label htmlFor="spouse_name">Enter your spouse name</Label>
                                <Input
                                    type="text"
                                    id="spouse_name"
                                    value={formData.spouse_name || ''}
                                    onChange={(e) => handleFieldChange('spouse_name', e.target.value)}
                                    className={cn(errors.spouse_name && "border-red-500 focus-visible:ring-red-500")}
                                />
                                {errors.spouse_name && <p className="text-red-500 text-xs mt-1">{errors.spouse_name}</p>}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* co-applicant information section */}
            <div className="mb-8 pb-6 border-b border-gray-200">
                <h3 className="text-xl font-medium tracking-tight mb-4">Co-applicant's Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="co_applicant_name">Co-applicant's Name</Label>
                        <Input
                            type="text"
                            id="co_applicant_name"
                            value={formData.applicant_name || ''}
                            onChange={(e) => handleFieldChange('co_applicant_name', e.target.value)}
                            className={cn(errors.co_applicant_name && "border-red-500 focus-visible:ring-red-500")}
                        />
                        {errors.co_applicant_name && <p className="text-red-500 text-xs mt-1">{errors.co_applicant_name}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="co_applicant_dob">Co-applicant's Date of Birth</Label>
                        <Input
                            type="date"
                            id="co_applicant_dob"
                            value={formData.co_applicant_dob || ''}
                            onChange={(e) => handleFieldChange('co_applicant_dob', e.target.value)}
                            className={cn(errors.co_applicant_dob && "border-red-500 focus-visible:ring-red-500")}
                        />
                        {errors.co_applicant_dob && <p className="text-red-500 text-xs mt-1">{errors.co_applicant_dob}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="co_occupation">Occupation</Label>
                        <Select
                            onValueChange={(value) => handleFieldChange("co_occupation", value)}
                            value={formData.co_occupation || ""}
                        >
                            <SelectTrigger
                                id="co_occupation"
                                className={cn(
                                    "w-full",
                                    errors.co_occupation &&
                                    "border-red-500 focus-visible:ring-red-500"
                                )}
                            >
                                <SelectValue placeholder="Select profession" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Job">Job</SelectItem>
                                <SelectItem value="Business">Business</SelectItem>
                                <SelectItem value="Others">Others</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.co_occupation && (
                            <p className="text-red-500 text-xs mt-1">{errors.co_occupation}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="relation_with_applicant">Relation with Applicant</Label>
                        <Select
                            onValueChange={(value) => handleFieldChange("relation_with_applicant", value)}
                            value={formData.relation_with_applicant || ""}
                        >
                            <SelectTrigger
                                id="relation_with_applicant"
                                className={cn(
                                    "w-full",
                                    errors.relation_with_applicant &&
                                    "border-red-500 focus-visible:ring-red-500"
                                )}
                            >
                                <SelectValue placeholder="Select profession" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Mother">Mother</SelectItem>
                                <SelectItem value="Father">Father</SelectItem>
                                <SelectItem value="Spouse">Spouse</SelectItem>
                                <SelectItem value="Brother">Brother</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.relation_with_applicant && (
                            <p className="text-red-500 text-xs mt-1">{errors.relation_with_applicant}</p>
                        )}
                    </div>
                    
                </div>
            </div>

            {/* Permanent Address Section */}
            <div className="mb-8 pb-6 border-b border-gray-200">
                <h3 className="text-xl font-medium tracking-tight mb-4">
                    Permanent Address <span className='text-sm text-black/80 font-light'>(Permanent address should be addressed as mentioned
                        on your aadhar card)</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {" "}
                    {/* Changed sm:grid-cols-2 to md:grid-cols-2 for consistency */}
                    <div className="space-y-2">
                        <Label htmlFor="permanent_building_name">Building/House Name<span className='text-red-500'>*</span></Label>
                        <Input
                            type="text"
                            id="permanent_building_name"
                            value={formData.permanent_building_name || ""}
                            onChange={(e) => handleFieldChange('permanent_building_name', e.target.value)}
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
                        <Label htmlFor="permanent_street_name">Street/Road Name<span className='text-red-500'>*</span></Label>
                        <Input
                            type="text"
                            id="permanent_street_name"
                            value={formData.permanent_street_name || ""}
                            onChange={(e) => handleFieldChange('permanent_street_name', e.target.value)}
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
                            onChange={(e) => handleFieldChange('permanent_landmark', e.target.value)}
                            className={cn(
                                errors.permanent_landmark &&
                                "border-red-500 focus-visible:ring-red-500"
                            )}
                        />
                        {errors.permanent_landmark && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.permanent_landmark}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="permanent_city">City<span className='text-red-500'>*</span></Label>
                        <Input
                            type="text"
                            id="permanent_city"
                            value={formData.permanent_city || ""}
                            onChange={(e) => handleFieldChange('permanent_city', e.target.value)}
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
                        <Label htmlFor="permanent_district">District<span className='text-red-500'>*</span></Label>
                        <Input
                            type="text"
                            id="permanent_district"
                            value={formData.permanent_district || ""}
                            onChange={(e) => handleFieldChange('permanent_district', e.target.value)}
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
                        <Label htmlFor="permanent_state">State<span className='text-red-500'>*</span></Label>
                        <Input
                            type="text"
                            id="permanent_state"
                            value={formData.permanent_state || ""}
                            onChange={(e) => handleFieldChange('permanent_state', e.target.value)}
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
                        <Label htmlFor="permanent_pincode">Pincode<span className='text-red-500'>*</span></Label>
                        <Input
                            type="text"
                            id="permanent_pincode"
                            value={formData.permanent_pincode || ""}
                            onChange={(e) => handleFieldChange('permanent_pincode', e.target.value)}
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
                    <div className="flex items-center space-x-2 mt-2 md:col-span-2">
                        <Checkbox
                            id="same_as_permanent_address"
                            checked={formData.same_as_permanent_address}
                            onCheckedChange={(checked) => {
                                setFormData((prev) => ({
                                    ...prev,
                                    same_as_permanent_address: checked,
                                    ...(checked && {
                                        present_building_name: prev.permanent_building_name,
                                        present_street_name: prev.permanent_street_name,
                                        present_landmark: prev.permanent_landmark,
                                        present_city: prev.permanent_city,
                                        present_district: prev.permanent_district,
                                        present_state: prev.permanent_state,
                                        present_pincode: prev.permanent_pincode,
                                    }),
                                }));
                                // Clear errors for present address fields if checkbox is checked
                                if (checked) {
                                    // eslint-disable-next-line no-undef
                                    setErrors((prevErrors) => {
                                        // Assuming setErrors is available via context or prop from parent
                                        const newErrors = { ...prevErrors };
                                        const presentAddressFields = [
                                            "present_building_name",
                                            "present_street_name",
                                            "present_landmark",
                                            "present_city",
                                            "present_district",
                                            "present_state",
                                            "present_pincode",
                                        ];
                                        presentAddressFields.forEach(
                                            (field) => delete newErrors[field]
                                        );
                                        return newErrors;
                                    });
                                }
                            }}
                        />
                        <Label htmlFor="same_as_permanent_address">
                            Same as Permanent Address
                        </Label>
                    </div>
                </div>
            </div>

            {/* Present Address Section */}
            <div className="mb-8 pb-6">
                <h3 className="text-xl font-medium tracking-tight mb-4">
                    Present Address <span className='text-sm text-black/80 font-light'> (Fill the address where you are staying currently)</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {" "}
                    {/* Changed sm:grid-cols-2 to md:grid-cols-2 for consistency */}
                    <div className="space-y-2">
                        <Label htmlFor="present_building_name">Building/House Name<span className='text-red-500'>*</span></Label>
                        <Input
                            type="text"
                            id="present_building_name"
                            value={formData.present_building_name || ""}
                            // onChange={handleChange}
                            onChange={(e) => handleFieldChange('present_building_name', e.target.value)}
                            disabled={formData.same_as_permanent_address}
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
                        <Label htmlFor="present_street_name">Street/Road Name<span className='text-red-500'>*</span></Label>
                        <Input
                            type="text"
                            id="present_street_name"
                            value={formData.present_street_name || ""}
                            // onChange={handleChange}
                            onChange={(e) => handleFieldChange('present_street_name', e.target.value)}
                            disabled={formData.same_as_permanent_address}
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
                            // onChange={handleChange}
                            onChange={(e) => handleFieldChange('present_landmark', e.target.value)}
                            disabled={formData.same_as_permanent_address}
                            className={cn(
                                errors.present_landmark &&
                                "border-red-500 focus-visible:ring-red-500"
                            )}
                        />
                        {errors.present_landmark && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.present_landmark}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="present_city">City<span className='text-red-500'>*</span></Label>
                        <Input
                            type="text"
                            id="present_city"
                            value={formData.present_city || ""}
                            // onChange={handleChange}
                            onChange={(e) => handleFieldChange('present_city', e.target.value)}
                            disabled={formData.same_as_permanent_address}
                            className={cn(
                                errors.present_city &&
                                "border-red-500 focus-visible:ring-red-500"
                            )}
                        />
                        {errors.present_city && (
                            <p className="text-red-500 text-xs mt-1">{errors.present_city}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="present_district">District<span className='text-red-500'>*</span></Label>
                        <Input
                            type="text"
                            id="present_district"
                            value={formData.present_district || ""}
                            // onChange={handleChange}
                            onChange={(e) => handleFieldChange('present_district', e.target.value)}
                            disabled={formData.same_as_permanent_address}
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
                        <Label htmlFor="present_state">State<span className='text-red-500'>*</span></Label>
                        <Input
                            type="text"
                            id="present_state"
                            value={formData.present_state || ""}
                            // onChange={handleChange}
                            onChange={(e) => handleFieldChange('present_state', e.target.value)}
                            disabled={formData.same_as_permanent_address}
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
                        <Label htmlFor="present_pincode">Pincode<span className='text-red-500'>*</span></Label>
                        <Input
                            type="text"
                            id="present_pincode"
                            value={formData.present_pincode || ""}
                            // onChange={handleChange}
                            onChange={(e) => handleFieldChange('present_pincode', e.target.value)}
                            disabled={formData.same_as_permanent_address}
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
        </div>
    );
};

export default PersonalDetails;
