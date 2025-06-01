import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import NavbarNew from "@/components/common/Navbar";
import GoldLoanPage from "@/components/Services/pages/GoldLoanPage";


const GoldLoan = () => {
    return (
        <div>
            <NavbarNew />
            <main className="mt-[4.5rem] bg-gray-50">
                <Header
                    title={"Gold Loan"}
                    subTitle={'Your Partner in Success: Customized Business Loans Designed to Meet Your Unique Needs, Helping You Scale New Heights and Achieve Long-Term Stability.'}
                    img={'/services/gold-loan.png'}
                />
                <GoldLoanPage />
            </main>
            <Footer />
        </div>
    )
};

export default GoldLoan;