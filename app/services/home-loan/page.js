import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import NavbarNew from "@/components/common/Navbar";
import HomeLoanPage from "@/components/Services/pages/HomeLoanPage";


const Page= () => {
    return (
        <div className="mt-[4.5rem] bg-gray-100">
            <NavbarNew />
            <main className="bg-gray-50 mx-auto">
                <Header
                    title={'Home Loans'}
                    subTitle={'Get financing for whatever you need now. Achieve all your goals and aspirations with the right kind of help, exactly when you need it.'}
                    img={'/About/home_loan_header.png'}
                />
                <HomeLoanPage />
            </main>
            <Footer />
        </div>
    )
};

export default Page;