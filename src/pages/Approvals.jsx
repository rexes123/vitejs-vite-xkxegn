import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../components/AuthProvider";

export default function Approvals() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [selectedItems, setSelectedItems] = useState(new Set());
    const [userRole, setUserRole] = useState('user');
    const [selectedImage, setSelectImage] = useState(null);
    const [showImageModal, setShowImageModal] = useState(false);
    const [selectAll, setSelectAll] = useState(false);

    const handleSelectAllChange = () => {
        setSelectAll(!selectAll);
        setSelectedItems(selectAll ? new Set() : new Set(data.map(item => item.id)));
    };

    const handleCheckBoxChange = (id) => {
        const updatedSelection = new Set(selectedItems);
        if (updatedSelection.has(id)) {
            updatedSelection.delete(id);
        } else {
            updatedSelection.add(id);
        }
        setSelectedItems(updatedSelection);
        setSelectAll(updatedSelection.size === data.length);
    };

    const handleDeleteSelected = async () => {
        const idsToDelete = Array.from(selectedItems);
        if (idsToDelete.length === 0) {
            alert("No items selected for deletion.");
            return;
        }

        await Promise.all(idsToDelete.map(id =>
            fetch(`https://backend-2txi.vercel.app/${data[0].type}/${id}`, {
                method: 'DELETE',
            })
        ));

        setData(prevData => prevData.filter(item => !idsToDelete.includes(item.id)));
        setSelectedItems(new Set());
    };

    const handleViewImage = (imageUrl) => {
        setSelectImage(imageUrl);
        setShowImageModal(true);
    };

    const handleStatusChange = async (id, newStatus, type) => {
        console.log(`Updating ${type} ID:`, id, "with new status:", newStatus);

        const itemExists = data.some(item => item.id === id);
        if (!itemExists) {
            console.error(`No ${type} found with ID: ${id}`);
            return;
        }

        // Optimistically update the UI
        setData(prevData => prevData.map(item =>
            item.id === id ? { ...item, status: newStatus } : item
        ));

        const endpoint = `https://backend-2txi.vercel.app/${type}/status/${id}`;

        try {
            const response = await fetch(endpoint, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (!response.ok) {
                const responseBody = await response.text();
                console.error(`Error updating ${type}: ${response.status} - ${responseBody}`);
                throw new Error(`Failed to update ${type} status: ${responseBody}`);
            }
        } catch (error) {
            console.error('Error updating status:', error);
            // Revert optimistic update on error
            setData(prevData => prevData.map(item =>
                item.id === id ? { ...item, status: prevData.find(i => i.id === id).status } : item
            ));
        }
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const [expensesResponse, tripsResponse] = await Promise.all([
                    fetch('https://backend-2txi.vercel.app/expenses'),
                    fetch('https://backend-2txi.vercel.app/trips'),
                ]);

                if (!expensesResponse.ok || !tripsResponse.ok) {
                    throw new Error('Failed to fetch data');
                }

                const expensesData = await expensesResponse.json();
                const tripsData = await tripsResponse.json();

                // Combine trips and expenses into one data array
                const combinedData = [...tripsData.map(trip => ({ ...trip, type: 'trips' })), ...expensesData.map(expense => ({ ...expense, type: 'expenses' }))];
                setData(combinedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        getData();
    }, []);

    useEffect(() => {
        if (user && user.email === 'admin@gmail.com') {
            setUserRole('admin');
        } else {
            setUserRole('user');
        }
    }, [user]);

    return (
        <div className="container" style={{ display: "flex" }}>
            <div style={{ width: "100%" }}>
                {selectedItems.size > 0 && (
                    <button onClick={handleDeleteSelected} type="button" className="btn btn-danger">Delete Selected</button>
                )}

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">
                                <input
                                    type="checkbox"
                                    checked={selectAll}
                                    onChange={handleSelectAllChange}
                                />
                            </th>
                            <th scope="col">Name</th>
                            <th scope="col">Category</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Frequency</th>
                            <th>View</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id}>
                                <th scope="row">
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.has(item.id)}
                                        onChange={() => handleCheckBoxChange(item.id)}
                                    />
                                </th>
                                <td>{item.name}</td>
                                <td>{item.category}</td>
                                <td>{item.amount}</td>
                                <td>{item.create_at}</td>
                                <td>
                                    <img src={item.invoiceurl} style={{ height: "100px", width: "100px" }} alt="Invoice" onClick={() => handleViewImage(item.invoiceurl)} />
                                </td>
                                {userRole === 'admin' ? (
                                    <td>
                                        <select
                                            className="form-select"
                                            value={item.status}
                                            onChange={(e) => handleStatusChange(item.id, e.target.value, item.type)}
                                        >
                                            <option value="approved">Approved</option>
                                            <option value="rejected">Rejected</option>
                                            <option value="pending">Pending</option>
                                        </select>
                                    </td>
                                ) : (
                                    <td>{item.status}</td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>

                {showImageModal && (
                    <div className="modal fade show" style={{ display: 'block' }} onClick={() => setShowImageModal(false)}>
                        <div className="modal-dialog">
                            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                                <div className="modal-header">
                                    <h5 className="modal-title">Invoice</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowImageModal(false)} />
                                </div>
                                <div className="modal-body">
                                    <img src={selectedImage} alt="Invoice" style={{ width: '100%' }} />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowImageModal(false)}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
