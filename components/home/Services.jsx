import React from "react";
import { BriefcaseBusiness, Building2Icon, BusIcon, Car, CastleIcon, Check, HandCoinsIcon, HomeIcon, icons, User2Icon } from "lucide-react";
import { BigHeading, Heading } from "../common/Common";

const loanDetails = [
    {
        type: "Home Loan",
        header: "Own Your Dream Home with Ease",
        subheader: "Affordable Home Loans for Every Aspiration",
        icon: CastleIcon,
        content: [
            "Flexible repayment options available.",
            "Loan tenure up to 30 years.",
            "Quick approvals and minimal documentation.",
            "Loans for purchases or renovations."
        ]
    },
    {
        type: "Vehicle Loan",
        header: "Drive Your Dreams Today",
        subheader: "Hassle-Free Loans for Two-Wheelers and Four-Wheelers",
        icon: BusIcon,
        content: [
            "Finance up to 90% cost.",
            "Flexible repayment tenures offered.",
            "Fast approvals for quick disbursement.",
            "Loans for new or used vehicles."
        ]
    },
    {
        type: "Personal Loan",
        header: "Instant Funds for Your Personal Needs",
        subheader: "Quick Approval, No Collateral Required",
        icon: User2Icon,
        content: [
            "Funds for emergencies or travel.",
            "Loans up to ₹25 lakh available.",
            "Repayment tenure up to 60 months.",
            "Easy online applications, instant approval."
        ]
    },
    {
        type: "Business Loan",
        header: "Empower Your Business Growth",
        subheader: "Customized Loans for Small and Large Businesses",
        icon: BriefcaseBusiness,
        content: [
            "Loans up to ₹50 lakh available.",
            "Flexible EMIs tailored to business needs.",
            "Pre-approved offers for quick access.",
            "Minimal paperwork, fast processing guaranteed."
        ]
    },
    {
        type: "Gold Loan",
        header: "Unlock the Value of Your Gold",
        subheader: "Instant Funds with Gold as Security",
        icon: HandCoinsIcon,
        content: [
            "Quick loans against gold ornaments.",
            "High loan-to-value ratio offered.",
            "No credit score requirements needed.",
            "Instant disbursement, secure gold storage."
        ]
    },
    {
        type: "Loan Against Property",
        header: "Invest in Your Future",
        subheader: "Affordable Loans for Quality Education",
        icon: Building2Icon,
        content: [
            "Covers tuition fees and expenses.",
            "Loans for studying in India or abroad.",
            "Flexible repayment with moratorium period.",
            "Special offers for higher education courses."
        ]
    }
];


const Card = ({ data }) => {
    return (
        <div className="text-left bg-white p-6 rounded-md cursor-pointer hover:shadow-md ">
            <div className="p-2 bg-blue-100 rounded-lg w-fit">
                <data.icon size={19} className="text-blue-500" />
            </div>
            <h3 className="text-gray-800 text-xl font-semibold mb-3">{data?.type}</h3>
            <p className="text-gray-600 text-sm">{data?.subheader}</p>
            <ul className="space-y-3 mt-6">
                {
                    data?.content?.map((item, index) => {
                        return (
                            <li className="flex items-center text-sm text-gray-600" key={index}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height={17} className="mr-4 bg-blue-500 fill-white rounded-full p-[3px]" viewBox="0 0 24 24">
                                    <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
                                </svg>
                                {item}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}


const Services = () => {
    return (
        <div className=" px-4 py-4 md:py-10 space-y-6 mx-auto font-[sans-serif] ">
            <div className="text-start md:text-center w-full md:max-w-2xl mx-auto">
                <div className="flex justify-center my-6">
                    <Heading text={'Services'} />
                </div>
                <BigHeading text="Simplify Your Success Today" />
                <p className="text-sm text-gray-600 mt-6">Discover innovative solutions designed to streamline your journey. Our exceptional services provide the tools and support you need to unlock potential, achieve goals, and excel effortlessly.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5 max-md:max-w-lg mx-auto">
                {
                    loanDetails?.map((item, index) => {
                        return (
                            <Card data={item} key={index} />
                        )
                    })
                }
            </div>
        </div>
    )
};

export default Services;