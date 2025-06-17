'use client'
import { useUserState } from '@/app/dashboard/store';
import Spinners from '@/components/common/Spinners';
import { getLoanByID, updateLoanStatus } from '@/lib/actions/loan';
import { useParams } from 'next/navigation'
import React, { useEffect, useState, useTransition } from 'react'
import LoanDetailsView from './LoanDetailsView';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useToaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import ConnectorIncomeModal from '@/components/Admin/ConnectorIncomeModal';
import { Toaster } from 'react-hot-toast';


function LoanStatusSelect({
    loanId,
    token,
    defaultStatus = "Application Received",
    // openIncomeModal,
    setOpenIncomeModal,
}) {
    const [status, setStatus] = useState(defaultStatus);
    const [isLoading, setIsLoading] = useState(false);


    const handleStatusChange = async (val) => {
        setStatus(val);
        setIsLoading(true);

        try {
            const result = await updateLoanStatus(token, loanId, val);
            if (result?.success) {
                toast.success("Status updated successfully!");
                if (val === "Disbursed") {
                    setOpenIncomeModal(true);
                }
            } else {
                toast.error("Failed to update status");
                console.error("Update failed:", result.message);
            }
        } catch (err) {
            toast.error("Something went wrong");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="my-6">
            <Toaster/>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Status
            </label>
            <Select value={status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-64 border rounded-md p-2 shadow-sm">
                    <SelectValue placeholder="Select loan status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Application Received">Application Received</SelectItem>
                    <SelectItem value="In Progress at PARV">In Progress at PARV</SelectItem>
                    <SelectItem value="Applied to Bank">Applied to Bank</SelectItem>
                    <SelectItem value="Pendency">Pendency</SelectItem>
                    <SelectItem value="Sanctioned">Sanctioned</SelectItem>
                    <SelectItem value="Disbursed">Disbursed</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
            </Select>
            {isLoading && <p className="text-sm text-gray-500 mt-2">Updating status...</p>}
        </div>
    );
}


const LoanDetails = () => {

    const { loanId } = useParams();
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [openIncomeModal, setOpenIncomeModal] = useState(false);
    const userState = useUserState();

    let token;
    userState.user.getIdToken().then((res) => {
        token = res;
    }).catch((err) => {
        console.error("Failed to get token:", err);
    });

    const fetchLoanData = async () => {
        try {
            const res = await getLoanByID(token, loanId);
            console.log(res);
            if (res) {
                setData(res);
            }
        } catch (error) {
            console.log("Error :", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchLoanData();
    }, [loanId])

    if (loading) return <Spinners />

    return (
        <div>
            <div className='w-full px-6 flex justify-between items-center'>
                <h3 className='text-lg font-bold'>Application Details</h3>
                <div className=''>
                    {/* <Button>Edit</Button> */}
                    <LoanStatusSelect
                        loanId={loanId}
                        defaultStatus={data?.data?.status}
                        token={token}
                        openIncomeModal={openIncomeModal}
                        setOpenIncomeModal={setOpenIncomeModal}
                    />
                </div>
            </div>
            <Separator />
            <ConnectorIncomeModal
                open={openIncomeModal}
                setOpen={setOpenIncomeModal}
                connectorId={data?.data?.id_of_connector}
                token={token}
            />
            <LoanDetailsView data={data?.data} />
        </div>
    )
}

export default LoanDetails