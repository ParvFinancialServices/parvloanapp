import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import NavbarNew from "@/components/common/Navbar";
import VehicleLoanPage from "@/components/Services/pages/VehicleLoanPage";

const VehicleLoan = () => {
    return (
        <div>
            <NavbarNew />
            <main className="mt-[4.5rem] bg-gray-50 w-full">
                <Header
                    title={"Vehicle Loan"}
                    subTitle={'Your Partner in Success: Customized Business Loans Designed to Meet Your Unique Needs, Helping You Scale New Heights and Achieve Long-Term Stability.'}
                    img={'/services/vehicle-loan.png'}
                />
                <VehicleLoanPage />
            </main>
            <Footer />
        </div>
    )
};

export default VehicleLoan;