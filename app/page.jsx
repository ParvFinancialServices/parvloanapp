

import Footer from '@/components/common/Footer';
import NavbarNew from '@/components/common/Navbar';
import About from '@/components/home/About';
import LoanApplicationProcess from '@/components/home/Application';
import Banner from '@/components/home/Banner';
import ContactUs from '@/components/home/ContactUs';
import FAQ from '@/components/home/FAQ';
import LoanCalculatorSection from '@/components/home/LoanCalculatorSection';
import Services from '@/components/home/Services';
import TestimonialSection from '@/components/home/TestimonialSection';
import Head from 'next/head';


export default function Home() {
  return (
    <>
      <Head>
        <title>Parv Financial Services | Personal & Business Loans</title>
        <meta name="description" content="Discover competitive personal and business loans at Parv Financial Services. Flexible terms, easy application process, and expert financial advice. Apply now!" />
        <meta name="keywords" content="loans, personal loans, business loans, financial services, easy loan application, low interest rates" />
        <meta name="author" content="Parv Financial Services" />
        <meta property="og:title" content="Parv Financial Services | Personal & Business Loans" />
        <meta property="og:description" content="Get hassle-free personal and business loans with flexible repayment options. Apply now with Parv Financial Services." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.parvfinancialservices.com" />
        <meta property="og:image" content="/images/parv-logo.png" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FinancialService",
            "name": "Parv Financial Services",
            "url": "https://www.parvfinancialservices.com",
            "logo": "/images/parv-logo.png",
            "description": "Parv Financial Services provides personal and business loans with flexible repayment options and expert financial guidance.",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-XXXXXXXXXX",
              "contactType": "customer service"
            }
          })}
        </script>
      </Head>
      <div className="w-screen min-h-screen h-fit flex flex-col bg-blue-100/75 relative">
        <NavbarNew />
        <main className="flex flex-col w-full h-fit">
          <Banner />
          <About />
          <Services />
          <LoanCalculatorSection />
          <LoanApplicationProcess />
          <TestimonialSection />
          <FAQ />
          <ContactUs />
        </main>
        <Footer />
      </div>
    </>
  );
}

