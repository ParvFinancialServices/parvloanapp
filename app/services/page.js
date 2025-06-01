
"use client";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import NavbarNew from "@/components/common/Navbar";
import BusinessLoanSection from "@/components/Services/BusinessLoanSection";
import GoldLoanSection from "@/components/Services/GoldLoanSection";
import HomeLoanSection from "@/components/Services/HomeLoanSection";
import PersonalLoanSection from "@/components/Services/PersoanlLoan";
import VehicleLoanSection from "@/components/Services/VehicleLoan";
import Head from "next/head";
import React from "react";

function Services() {
    return (
        <>
            <Head>
                <title>Our Loan Services | Parv Financial Services</title>
                <meta name="description" content="Explore a range of loan services at Parv Financial Services, including home loans, business loans, vehicle loans, personal loans, and gold loans. Apply now for flexible and low-interest options!" />
                <meta name="keywords" content="home loan, business loan, vehicle loan, personal loan, gold loan, financial services, low interest loans" />
                <meta name="author" content="Parv Financial Services" />
                <meta property="og:title" content="Our Loan Services | Parv Financial Services" />
                <meta property="og:description" content="Parv Financial Services offers customized loan solutions to meet your financial needs. Choose from home, business, vehicle, personal, and gold loans." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.parvfinancialservices.com/services" />
                <meta property="og:image" content="/services/services_banner.png" />
                <meta name="robots" content="index, follow" />
            </Head>
            <div className="">
                <NavbarNew />
                <main className="mt-[4.5rem]">
                    <Header
                        title={'Services'}
                        subTitle={'Helping Individuals and Businesses Make Smart Financial Decisions for a Prosperous and Secure Tomorrow.'}
                        img={'/services/services_banner.png'}
                    />
                    <HomeLoanSection />
                    <BusinessLoanSection />
                    <VehicleLoanSection />
                    <PersonalLoanSection />
                    <GoldLoanSection />
                </main>
                <Footer />
            </div>
        </>
    );
}

export default Services;
