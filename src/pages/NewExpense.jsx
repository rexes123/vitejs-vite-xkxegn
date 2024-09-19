import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import { useState } from "react";

export default function NewExpense() {
    const navigate = useNavigate();

    const navToExpense = () => {
        navigate('/expense');
    };

    const [subject, setSubject] = useState('');
    const [merchant, setMerchant] = useState('');
    const [date, setDate] = useState('');
    const [total, setTotal] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [employee, setEmployee] = useState('');

    const handleSubmit = async () => {
        const obj = {
            subject,
            merchant,
            date,
            total,
            category,
            description,
            employee
        };

        console.log(obj);

        try {
            const response = await fetch('https://backend-2txi.vercel.app/expenses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Expense saved successfully:', data);
                navToExpense();
            } else {
                console.error('Error saving expense:', response.statusText);
            }
        } catch (error) {
            console.error('Network error:', error);
        }

        navigate('/expense')
    };

    return (
        <div style={{ display: "flex" }} className="container">
            <Nav />
            <div className="container">
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button type="button" className="btn-close" aria-label="Close" onClick={navToExpense}></button>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ width: "45%" }}>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Subject</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" onChange={(e) => setSubject(e.target.value)} />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Merchant</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" onChange={(e) => setMerchant(e.target.value)} />
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Date*</label>
                            <div className="col-sm-10">
                                <input type="date" className="form-control" onChange={(e) => setDate(e.target.value)} />
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Total*</label>
                            <div className="col-sm-10">
                                <input type="number" className="form-control" onChange={(e) => setTotal(e.target.value)} />
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Category*</label>
                            <div className="col-sm-10">
                                <select className="form-select" aria-label="Default select example" onChange={(e) => setCategory(e.target.value)}>
                                    <option value="" disabled selected>Select Type</option>
                                    <option value="trip">Trip</option>
                                    <option value="services">Services</option>
                                    <option value="catering">Catering</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Description</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" onChange={(e) => setDescription(e.target.value)} />
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Employee*</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" onChange={(e) => setEmployee(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <label style={{ width: "45%", border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center" }} htmlFor="file-upload">
                        <input type="file" id="file-upload" style={{ display: 'none' }} />
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                            <i className="bi bi-plus"></i>
                            <p>Upload an invoice</p>
                        </div>
                    </label>
                </div>

                <button onClick={handleSubmit}>Save</button>
            </div>
        </div>
    );
}
