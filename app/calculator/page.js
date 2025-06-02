import EmiAccordion from '@/components/calculator/Content';
import EMINote from '@/components/calculator/EMINote';
import LoanCalculator from '@/components/calculator/LoanCalculator';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import NavbarNew from '@/components/common/Navbar';
import Head from 'next/head';
import React from "react";

function Connector() {
    return (
        <>
            <Head>
                <title>EMI Calculator | Parv Financial Services</title>
                <meta name="description" content="Use our EMI Calculator to estimate your loan repayments with ease. Plan your finances with Parv Financial Services and make informed decisions." />
                <meta name="keywords" content="EMI calculator, loan calculator, financial planning, loan EMI, Parv Financial Services" />
                <meta name="author" content="Parv Financial Services" />
                <meta property="og:title" content="EMI Calculator | Parv Financial Services" />
                <meta property="og:description" content="Calculate your loan EMI easily with Parv Financial Services' EMI Calculator. Plan your loan repayments effectively!" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.parvfinancialservices.com/calculator" />
                <meta property="og:image" content="/About/calculator.png" />
                <meta name="robots" content="index, follow" />
            </Head>
            <div>
                <NavbarNew />
                <main className="mt-[4.5rem]">
                    <Header title={"EMI Calculator"} subTitle={"Your trusted financial Partner"} img={'/About/calculator.png'} />
                    <LoanCalculator />
                    <EMINote />
                    <EmiAccordion />
                </main>
                <Footer />
            </div>
        </>
    );
};

export default Connector;
