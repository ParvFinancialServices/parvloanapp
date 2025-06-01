import { CheckCheckIcon } from "lucide-react";
import React from "react";


const Content = {
    title: 'Empowering Your Dreams with Easy Loans!',
    // title: 'Parv Financial Services — We make finance simple, so you can focus on building your dreams.',
    subTitle: "Affordable Home Loans, Vehicle Loans, and Gold Loans – All in One Place. Fast Approvals, Flexible EMI Plans, and Low Interest Rates.",
    // subTitle: "Your journey to success begins with the right financial solutions",
    // desc: "Turn your dreams into reality with affordable loans designed to suit your lifestyle. Whether it’s your dream home, a new vehicle, or leveraging your gold, we’re here to help with quick approvals and low-interest rates.",
    desc: "Your journey to success begins with the right financial solutions",
    ul: [
        {
            li: "Instant Approval for Eligible Applicants",
        },
        {
            li: "Personal, Home, and Business Loans Available",
        },
        {
            li: "Transparent Processes | No Hidden Charges",
        },
    ]

}

const Banner = () => {
    return (
        <div className="mt-10 mx-auto px-6 md:px-16 lg:px-20">
            <div class="items-center max-w-7xl w-full grid-cols-2 mx-auto overflow-x-hidden lg:grid md:py-14 lg:py-24 xl:py-14 lg:mt-3 xl:mt-5" data-aos="fade-right" data-aos-duration="800">
                <div class="pr-2 md:mb-14 py-14 md:py-0">
                    <h1 class="text-3xl font-semibold text-blue-900 xl:text-4xl leading-10 lg:text-3xl">{Content?.title}</h1>
                    <p class=" py-2 text-lg text-gray-500 2xl:pr-5">
                        {Content?.subTitle}
                    </p>
                    <div className="mb-10">
                        {
                            Content?.ul?.map((item, index) => {
                                return (
                                    <div className="flex justify-start items-center" key={index}>
                                        <CheckCheckIcon className="text-orange-600 mr-2" size={18} />
                                        <span className="text-sm py-2 text-gray-500">{item?.li}</span>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className="mt-4">
                        <a href="/services" className="px-5 py-3 tracking-wider text-white bg-blue-500 rounded-lg md:px-8 hover:bg-blue-600 group">
                            <span>Explore More Services</span>
                        </a>
                    </div>
                </div>

                <div className="pb-10 overflow-hidden md:p-10 lg:p-0 sm:pb-0">
                    <img id="heroImg1" className="transition-all duration-300 ease-in-out hover:scale-105 lg:w-full sm:mx-auto sm:w-4/6 sm:pb-12 lg:pb-0" src="https://bootstrapmade.com/demo/templates/FlexStart/assets/img/hero-img.png" alt="Awesome hero page image" width="500" height="488" />
                </div>
            </div>
        </div>
    )
}


export default Banner;