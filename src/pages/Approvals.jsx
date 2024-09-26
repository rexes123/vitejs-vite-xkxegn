import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../components/AuthProvider";
import { Button, Modal } from "react-bootstrap";

export default function Approvals() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [data, setData] = useState([]);
    console.log(data);
    const [selectedTrips, setSelectedTrips] = useState(new Set());
    const [userRole, setUserRole] = useState('user');
    //Used to hold the url of image that want to display
    const [selectedImage, setSelectImage] = useState(null);
    console.log(selectedImage);
    const [showImageModal, setShowImageModal] = useState(false);
    const [show, setShow] = useState(false);
    //Track if all trips are selected
    const [selectAll, setSelectAll] = useState(false);

    const handleSelectAllChange = () => {
        if (selectAll) {
            setSelectedTrips(new Set()); //Deselect all
        } else {
            const addIds = new Set(data.map(trip => trip.id));
            setSelectedTrips(addIds); //Select all
        }
        setSelectAll(!selectAll); // Toggle selectAll state
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navToNewTrip = () => {
        navigate("/newTrips");
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const [expensesResponse, tripsResponse] = await Promise.all([
                    fetch('https://backend-2txi.vercel.app/expenses'),
                    fetch('https://backend-2txi.vercel.app/trips')
                ]);

                const expensesData = await expensesResponse.json();
                const tripsData = await tripsResponse.json();
                const combinedData = [...expensesData, ...tripsData];

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

    const handleCheckBoxChange = (id) => {
        const updatedSelection = new Set(selectedTrips);
        if (updatedSelection.has(id)) {
            updatedSelection.delete(id);
        } else {
            updatedSelection.add(id);
        }
        setSelectedTrips(updatedSelection);
        setSelectAll(updatedSelection.size === data.length); //Update selectAll based on selection
    };

    const handleDeleteSelected = async () => {
        const idsToDelete = Array.from(selectedTrips);
        if (idsToDelete.length === 0) {
            alert("No trips selected for deletion.");
            return;
        }

        await Promise.all(idsToDelete.map(id =>
            fetch(`https://backend-2txi.vercel.app/trips/${id}`, {
                method: 'DELETE',
            })
        ));

        setData(prevData => prevData.filter(trip => !idsToDelete.includes(trip.id)));
        setSelectedTrips(new Set());
    };

    const handleViewImage = (imageUrl) => {
        console.log(imageUrl);
        setSelectImage(imageUrl);
        setShowImageModal(true);
    };
    const handleStatusChange = async (id, newStatus, type) => {
        console.log(`Changing status of ${type} ${id} to ${newStatus}`);
    
        let endpoint = type === 'trip' 
            ? `https://backend-2txi.vercel.app/trips/${id}` 
            : `https://backend-2txi.vercel.app/expenses/${id}`;
    
        try {
            const response = await fetch(endpoint, {
                method: 'PATCH', // Use PATCH to update only the status
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }), // Only send the status field
            });
    
            if (!response.ok) {
                throw new Error('Failed to update status');
            }
    
            const responseData = await response.json();
    
            // Update the local data state after a successful status change
            setData(prevData =>
                prevData.map(item =>
                    item.id === id ? responseData : item
                )
            );
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };
    
    

    return (
        <div className="container" style={{ display: "flex" }}>
            <div style={{ width: "100%" }}>
                {/* <button onClick={navToNewTrip} type="button" className="btn btn-success">+ New trip</button> */}
                {selectedTrips.size > 0 && (
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
                            <th scope="col">CATEGORY</th>
                            <th scope="col">AMOUNT</th>
                            <th scope="col">FREQUENCY</th>
                            <th>VIEW</th>
                            <th scope="col">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((trip) => (
                            <tr key={trip.id}>
                                <th scope="row">
                                    <input
                                        type="checkbox"
                                        checked={selectedTrips.has(trip.id)}
                                        onChange={() => handleCheckBoxChange(trip.id)}
                                    />
                                </th>
                                <td>{trip.name}</td>
                                <td>{trip.category}</td>
                                <td>{trip.amount}</td>
                                <td>{trip.create_at}</td>
                                <img src={trip.invoiceurl} style={{ height: "100px", width: "100px" }} alt="Invoice" onClick={()=> handleViewImage(trip.invoiceurl)} />


                                {userRole === 'admin' ? (
                                    <td>
                                        <select
                                            className="form-select"
                                            value={trip.status}
                                            onChange={(e) => handleStatusChange(trip.id, e.target.value)}
                                        >
                                            <option value="approved">Approved</option>
                                            <option value="rejected">Rejected</option>
                                            <option value="pending">Pending</option>
                                        </select>
                                    </td>
                                ) : (
                                    <td>{trip.status}</td>
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
