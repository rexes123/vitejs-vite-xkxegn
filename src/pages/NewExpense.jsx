import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function NewExpense() {
    const navigate = useNavigate();

    // State variables for form inputs
    const [subject, setSubject] = useState('');
    const [merchant, setMerchant] = useState('');
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [employee, setEmployee] = useState('');
    const [invoiceFile, setInvoiceFile] = useState(null);
    const [invoiceUrl, setInvoiceUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showModal, setShowModal] = useState(false); // New state for modal visibility


    const handleFileChange = (e) => {
        setInvoiceFile(e.target.files[0]);
    };

    const validateForm = () => {
        if (!subject || !merchant || !date || !amount || !category || !employee) {
            setErrorMessage("Please fill in all required fields.");
            return false;
        }
        if (amount <= 0) {
            setErrorMessage("Amount must be greater than zero.");
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        const obj = {
            subject,
            merchant,
            date,
            amount,
            category,
            description,
            employee,
        };

        if (invoiceFile) {
            const fileRef = ref(storage, `invoice/${invoiceFile.name}`);
            await uploadBytes(fileRef, invoiceFile);
            console.log('Invoice uploaded successfully');

            const downloadUrl = await getDownloadURL(fileRef);
            setInvoiceUrl(downloadUrl);
            //This is what you will send to your backend
            obj.invoiceUrl = downloadUrl;
        }

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
                navigate('/expense');
            } else {
                console.error('Error saving expense:', response.statusText);
                setErrorMessage('Failed to save expense. Please try again.');
            }
        } catch (error) {
            console.error('Network error:', error);
            setErrorMessage('Network error. Please try again later.');
        }
    };

    return (
        <div className="container" style={{ display: "flex" }}>
            <div className="container">
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button type="button" className="btn-close" aria-label="Close" onClick={() => navigate('/expense')}></button>
                </div>

                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ width: "45%" }}>
                        {/* Form fields */}
                        {[
                            { label: "Subject", value: subject, setter: setSubject },
                            { label: "Merchant", value: merchant, setter: setMerchant },
                            { label: "Date*", value: date, setter: setDate, type: "date" },
                            { label: "Total*", value: amount, setter: setAmount, type: "number" },
                            { label: "Category*", value: category, setter: setCategory, select: true, options: ["Select Type", "Trip", "Services", "Catering"] },
                            { label: "Description", value: description, setter: setDescription },
                            { label: "Employee*", value: employee, setter: setEmployee },
                        ].map(({ label, value, setter, type, select, options }, index) => (
                            <div className="mb-3 row" key={index}>
                                <label className="col-sm-2 col-form-label">{label}</label>
                                <div className="col-sm-10">
                                    {select ? (
                                        <select className="form-select" onChange={(e) => setter(e.target.value)}>
                                            {options.map((option, idx) => (
                                                <option key={idx} value={option === "Select Type" ? "" : option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type={type || "text"}
                                            className="form-control"
                                            value={value}
                                            onChange={(e) => setter(e.target.value)}
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <label style={{ width: "45%", border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center" }} htmlFor="file-upload">
                        <input type="file" id="file-upload" style={{ display: 'none' }} onChange={handleFileChange} />
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                            <i className="bi bi-plus"></i>
                            <p>Upload an invoice</p>
                        </div>
                    </label>
                </div>

                {invoiceUrl && (
                    <div style={{ marginTop: '20px' }}>
                        <h5>Uploaded Invoice:</h5>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={invoiceUrl} alt="Uploaded Invoice" style={{ maxWidth: '100%', border: '1px solid black', marginRight: '10px' }} />
                            <button onClick={() => setShowModal(true)} className="btn btn-link">
                                <i className="bi bi-eye"></i>
                            </button>
                        </div>
                    </div>
                )}

                <button onClick={handleSubmit} className="btn btn-primary">Save</button>

                {/* Modal for image preview */}
                {showModal && (
                    <div className="modal" style={{ display: 'block', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1050 }}>
                        <div className="modal-dialog" style={{ margin: '10% auto', maxWidth: '600px' }}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Invoice Preview</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <img src={invoiceUrl} alt="Uploaded Invoice" style={{ maxWidth: '100%' }} />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
