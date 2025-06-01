import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import NavbarNew from "@/components/common/Navbar";
import PersonalLoanPage from "@/components/Services/pages/PersonalLoan";


const PersoanlLoan = () => {
    return (
        <div className="mt-[4.5rem]">
            <NavbarNew />
            <main className="bg-gray-50">
                <Header
                    title={"Personal Loan"}
                    subTitle={'Achieve Your Goals and Fulfill Your Dreams with a Personal Loan Designed to Meet Your Every Financial Need—Fast Approvals, Flexible Tenures, and Minimal Documentation!'}
                    img={'/services/persoanl_loan2.jpg'}
                />
                <PersonalLoanPage />
            </main>
            <Footer />
        </div>
    )
}

export default PersoanlLoan;