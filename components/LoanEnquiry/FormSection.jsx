'use client'
import React from 'react';
import { useState } from 'react';

const TextInput = ({ type, placeholder, value, onChange }) => {
    return (
        <div className="relative flex items-center">
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="px-2 py-3 bg-white w-full text-sm text-gray-800 border-b border-gray-300 focus:border-blue-500 outline-none"
            />
        </div>
    );
};


const TextArea = ({ placeholder, value, onChange }) => {
    return (
        <div className="relative flex items-center sm:col-span-2">
            <textarea
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="px-2 pt-3 bg-white w-full text-sm text-gray-800 border-b border-gray-300 focus:border-blue-500 outline-none"
            />
        </div>
    );
};


const RadioGroup = ({ selectedOption, onChange }) => {
    return (
        <div className="col-span-full">
            <h6 className="text-sm text-gray-800">Select Subject</h6>
            <div className="flex max-lg:flex-col gap-6 mt-4">
                {['General Inquiry', 'Technical Support', 'Website Feedback'].map((label, index) => (
                    <div key={index} className="flex items-center">
                        <input
                            id={`radio${index}`}
                            type="radio"
                            name="subject"
                            value={label}
                            className="hidden peer"
                            checked={selectedOption === label}
                            onChange={() => onChange(label)}
                        />
                        <label
                            htmlFor={`radio${index}`}
                            className="relative p-0.5 flex items-center justify-center shrink-0 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-5 h-5 cursor-pointer border-2 border-[#011c2b] rounded-full overflow-hidden"
                        >
                            <span className="border-[4px] border-[#011c2b] rounded-full w-full h-full"></span>
                        </label>
                        <p className="text-sm text-gray-500 ml-4">{label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

// import TextInput from './TextInput';
// import TextArea from './TextArea';
// import RadioGroup from './RadioGroup';

const EnquiryForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        message: '',
        subject: 'General Inquiry',
        loanAmount: '',
        loanPurpose: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        // Here you can make an API call or perform form submission
    };

    return (
        <div className="p-4 lg:col-span-2">
            <form onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-8">
                    <TextInput
                        type="text"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        name="firstName"
                    />
                    <TextInput
                        type="text"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        name="lastName"
                    />
                    <TextInput
                        type="number"
                        placeholder="Phone No."
                        value={formData.phone}
                        onChange={handleChange}
                        name="phone"
                    />
                    <TextInput
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        name="email"
                    />
                    <TextInput
                        type="number"
                        placeholder="Loan Amount"
                        value={formData.loanAmount}
                        onChange={handleChange}
                        name="loanAmount"
                    />
                    <TextInput
                        type="text"
                        placeholder="Purpose of Loan"
                        value={formData.loanPurpose}
                        onChange={handleChange}
                        name="loanPurpose"
                    />
                    <TextArea
                        placeholder="Write Message"
                        value={formData.message}
                        onChange={handleChange}
                        name="message"
                    />
                    {/* <RadioGroup
                        selectedOption={formData.subject}
                        onChange={(value) => setFormData({ ...formData, subject: value })}
                    /> */}
                </div>

                <button
                    type="submit"
                    className="mt-12 flex items-center justify-center text-sm lg:ml-auto max-lg:w-full rounded-lg px-4 py-3 tracking-wide text-white bg-blue-600 hover:bg-blue-700"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill='#fff' className="mr-2" viewBox="0 0 548.244 548.244">
                        <path fill-rule="evenodd" d="M392.19 156.054 211.268 281.667 22.032 218.58C8.823 214.168-.076 201.775 0 187.852c.077-13.923 9.078-26.24 22.338-30.498L506.15 1.549c11.5-3.697 24.123-.663 32.666 7.88 8.542 8.543 11.577 21.165 7.879 32.666L390.89 525.906c-4.258 13.26-16.575 22.261-30.498 22.338-13.923.076-26.316-8.823-30.728-22.032l-63.393-190.153z" clip-rule="evenodd" />
                    </svg>
                    Send Message
                </button>
            </form>
        </div>
    );
};

export default EnquiryForm;


