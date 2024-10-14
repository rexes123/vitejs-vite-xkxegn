import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useContext } from "react";
import { AuthContext } from "../components/AuthProvider";

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
    const [showModal, setShowModal] = useState(false);
    const [team, setTeam] = useState('')
    const [userEmail, setUserEmail] = useState(null);


    const user = useContext(AuthContext);
    console.log(user);

    const handleFileChange = (e) => {
        setInvoiceFile(e.target.files[0]);
    };

    const validateForm = () => {
        if (!subject || !merchant || !date || !amount || !category || !employee) {
            setErrorMessage("Please fill in all required fields.");
            return false;
        }
        if (isNaN(amount) || amount <= 0) {
            setErrorMessage("Amount must be a positive number.");
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
            team,
            uid: user.user.uid
        };

        console.log(obj);

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

                <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "column" }}>
                    <div>
                        {/* Form fields */}
                        {[
                            { label: "Subject", value: subject, setter: setSubject },
                            { label: "Merchant", value: merchant, setter: setMerchant },
                            { label: "Date*", value: date, setter: setDate, type: "date" },
                            { label: "Total*", value: amount, setter: setAmount, type: "number" },
                            { label: "Category*", value: category, setter: setCategory, select: true, options: ["Select Type", "Trip", "Services", "Catering"] },
                            { label: "Description", value: description, setter: setDescription },
                            { label: "Employee Name*", value: employee, setter: setEmployee },
                            { label: "Team*", value: team, setter: setTeam, select: true, options: ["Select team", "Project management", "Software development", "Design team"] },

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

                    <label
                        htmlFor="file-upload"
                        style={{
                            border: "2px dashed #ccc",
                            borderRadius: "8px",
                            padding: "20px",
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                            transition: "all 0.3s ease",
                            backgroundColor: "#f9f9f9",
                            height: "150px",
                            gap: "10px",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#007bff")}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#ccc")}
                    >
                        <input
                            type="file"
                            id="file-upload"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                color: "#666"
                            }}
                        >
                            <i className="bi bi-plus" style={{ fontSize: "24px", marginBottom: "5px" }}></i>
                            <p style={{ margin: 0, fontSize: "16px", fontWeight: "500" }}>Upload an Invoice</p>
                        </div>
                    </label>

                </div>
                <div class="modal" tabindex="-1">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Modal title</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <p>Modal body text goes here.</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>

                <button onClick={handleSubmit} className="btn btn-primary" style={{ marginTop: "10px" }}>Save</button>

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
