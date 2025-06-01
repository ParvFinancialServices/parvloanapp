// "use client";

// // import { createDSAAccount } from "@/api/file_action";
// // import Footer from "@/comp/Home/Footer";
// // import NavbarNew from "@/comp/Navbar/Navbar";
// // import { StepForm } from "@/comp/StepForm";
// import { Button } from "@/components/ui/button";
// // import {
// //   AccountCreationSchema,
// //   DSAAccountCreation,
// // } from "@/config/forms/AccountCreation";
// import { removeProperty, updateErrors } from "@/lib/utils";
// import { cloneDeep } from "lodash";
// import { useEffect } from "react";
// import { useState } from "react";
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import { Loader2Icon } from "lucide-react";
// import NavbarNew from "@/components/common/Navbar";
// import Footer from "@/components/common/Footer";

// const ApplyForDSA = () => {
//   const [state, setState] = useState(DSAAccountCreation);
//   const [validationErrors, setValidationErrors] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     return () => {
//       setIsLoading(false);
//     };
//   }, []);

//   // const onSubmit = async (e) => {
//   //   if (process.env.NEXT_PUBLIC_TEST_MODE == "true") {
//   //     setIsLoading(true);
//   //     let data = cloneDeep(state);
//   //     // removeProperty(data, "type");
//   //     // removeProperty(data, "options");
//   //     setTimeout(() => {
//   //       createDSAAccount(state);
//   //     }, 4000);
//   //   } else {
//   //     AccountCreationSchema.validate(state, { abortEarly: false })
//   //       .then(async () => {
//   //         let data = cloneDeep(state);
//   //         // removeProperty(data, "type");
//   //         // removeProperty(data, "options");
//   //         createDSAAccount(state);
//   //       })
//   //       .catch((e) => {
//   //         let newState = updateErrors(state, validationErrors, e);

//   //         // we are storing the reference of the current error so that on next submission of form we can remove it
//   //         setValidationErrors(e.inner);

//   //         // finally we are updating the state
//   //         setState(newState);
//   //       });
//   //   }
//   // };
//   return (
//     <div>
//       <NavbarNew />
//       <section className="flex flex-col p-4 items-center mt-[100px]">
//         <header className="font-semibold text-2xl p-4">Create Account</header>
//         <div className="p-4 max-w-[60vw] min-w-[300px] flex items-center justify-center flex-col">
//           {/* <StepForm state={state} setState={setState} step={0} /> */}
//           <div className="flex items-center justify-end p-4 w-full">
//             <Button type="button" onClick={onSubmit}>
//               submit
//             </Button>
//           </div>
//         </div>
//       </section>
//       <Footer />
//       <Dialog open={isLoading}>
//         <DialogContent className="sm:max-w-md">
//           <div className="flex items-center justify-center">
//             <Loader2Icon color="black" className="animate-spin" />
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default ApplyForDSA;









'use client'

import Footer from "@/components/common/Footer";
import NavbarNew from "@/components/common/Navbar";
import { useState } from "react";
// import { submitDSAForm } from "./firebaseActions";

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
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   await submitDSAForm(form);
  //   alert("Form submitted!");
  // };

  return (
    <>
    <NavbarNew/>
      <form
      // onSubmit={handleSubmit}
      >
        <h2>Create New Account</h2>

        <input name="full_name" placeholder="Full Name" required onChange={handleChange} />
        <input name="guardian_name" placeholder="Guardian's Name" required onChange={handleChange} />
        <input name="dob" type="date" required onChange={handleChange} />

        <select name="gender" onChange={handleChange}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Others">Others</option>
        </select>

        <select name="marital_status" onChange={handleChange}>
          <option value="Married">Married</option>
          <option value="Unmarried">Unmarried</option>
        </select>

        <input name="phone_no" placeholder="Phone Number" required onChange={handleChange} />
        <input name="alt_phone_no" placeholder="Alternate Phone Number" required onChange={handleChange} />
        <input name="email" placeholder="Email" required onChange={handleChange} />
        <input name="aadhar_no" placeholder="Aadhar Number" required onChange={handleChange} />
        <input name="pan_no" placeholder="PAN Number" required onChange={handleChange} />
        <input name="present_address" placeholder="Present Address" required onChange={handleChange} />
        <input name="permanent_address" placeholder="Permanent Address" required onChange={handleChange} />

        <input name="date_of_joining" type="date" required onChange={handleChange} />
        <input name="work_location" placeholder="Work Location" required onChange={handleChange} />
        <input name="bank_account_no" placeholder="Bank Account Number" required onChange={handleChange} />
        <input name="bank_branch" placeholder="Bank Branch Name" required onChange={handleChange} />

        <button type="submit">Submit</button>
      </form>
      <Footer/>
    </>

  );
};

export default SimpleDSAForm;

