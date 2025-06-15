'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { db } from '@/lib/firebaseConfig';
// import { Timestamp } from '@firebase/firestore';
// import { collection } from '@firebase/firestore';
// import { addDoc } from '@firebase/firestore';
import { useState } from 'react';
import { useUserState } from '../../store';
import { collection, addDoc, Timestamp } from '@firebase/firestore';
import { submitTelecallerSummary } from '@/lib/actions/file_action';
// import { submitTelecallerSummary } from '@/api/file_action';

const TelecallerSummaryForm = () => {
    const { profile, user,setInfo,setShowInfo } = useUserState();
    console.log(profile);

    const [formData, setFormData] = useState({
        username: profile?.username || "",
        telecallerName: '',
        totalCalls: '',
        totalCustomers: '',
        casesClosed: '',
        casesRunning: '',
        notes: '',
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const token = await user.getIdToken();
            const currentDate = new Date().toLocaleString(); // Capture submission date

            const result = await submitTelecallerSummary(token, {
                ...formData,
                formSubmitDate: currentDate,
                totalCalls: Number(formData.totalCalls),
                totalCustomers: Number(formData.totalCustomers),
                casesClosed: Number(formData.casesClosed),
                casesRunning: Number(formData.casesRunning),
            });

            console.log(result);
            if (result?.success) {
                setFormData({
                    telecallerName: '',
                    totalCalls: '',
                    totalCustomers: '',
                    casesClosed: '',
                    casesRunning: '',
                    notes: '',
                });
                // setInfo({
                //     desc: `Work Report submitted successfully!`,
                //     highlight: result.id,
                // });
                toast.success('Summary submitted successfully!');
                setShowInfo(true);
            }
        } catch (error) {
            console.error('Error submitting summary:', error);
            setMessage('Error submitting summary.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl w-full border mx-auto bg-white p-6  rounded-md mt-10">
            <h3 className="pb-6 font-bold text-lg">Telecaller Daily Summary</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <Label className="block mb-1 font-medium">Username</Label>
                        <Input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <div>
                        <Label className="block mb-1 font-medium">Telecaller Name</Label>
                        <Input
                            type="text"
                            name="telecallerName"
                            value={formData.telecallerName}
                            onChange={handleChange}
                            required
                            className="w-full border p-2 rounded"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label className="block mb-1 font-medium">Total Calls</Label>
                        <Input
                            type="number"
                            name="totalCalls"
                            value={formData.totalCalls}
                            onChange={handleChange}
                            required
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    <div>
                        <Label className="block mb-1 font-medium">Total Customers</Label>
                        <Input
                            type="number"
                            name="totalCustomers"
                            value={formData.totalCustomers}
                            onChange={handleChange}
                            required
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    <div>
                        <Label className="block mb-1 font-medium">Cases Closed</Label>
                        <Input
                            type="number"
                            name="casesClosed"
                            value={formData.casesClosed}
                            onChange={handleChange}
                            required
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    <div>
                        <Label className="block mb-1 font-medium">Cases Running</Label>
                        <Input
                            type="number"
                            name="casesRunning"
                            value={formData.casesRunning}
                            onChange={handleChange}
                            required
                            className="w-full border p-2 rounded"
                        />
                    </div>
                </div>

                <div>
                    <Label className="block mb-1 font-medium">Additional Notes (Optional)</Label>
                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    ></textarea>
                </div>

                <Button
                    type="submit"
                    disabled={loading}
                    className=" float-end"
                >
                    {loading ? 'Submitting...' : 'Submit Summary'}
                </Button>
            </form>

            {message && <p className="mt-4 text-green-600">{message}</p>}
        </div>
    );
};

export default TelecallerSummaryForm;
