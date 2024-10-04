import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../components/AuthProvider";

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
    const [expenses, setExpenses] = useState([])

    console.log(expenses);

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
                    fetch('https://backend-2txi.vercel.app/trips'),
                ]);

                if (!expensesResponse.ok || !tripsResponse.ok) {
                    throw new Error('Failed to fetch data');
                }

                const expensesData = await expensesResponse.json();
                const tripsData = await tripsResponse.json();

                const combinedData = [...expensesData, ...tripsData];
                console.log(combinedData);
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


    const handleStatusChange = async (id, newStatus) => {
        
        console.log("Updating ID:", id, "with new status", newStatus);

        setData(prevData => prevData.map(trip =>
            trip.id === id ? { ...trip, status: newStatus } : trip
        ));
    
        const expensesEndPoint = `https://backend-2txi.vercel.app/expenses/status/${id}`;
        const tripsEndPoint = `https://backend-2txi.vercel.app/trips/status/${id}`;
    
        try {
            // Update expense status
            const expensesResponse = await fetch(expensesEndPoint, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus })
            });
    
            // Check if expense update was successful
            if (!expensesResponse.ok) {
                const errorText = await expensesResponse.text();
                console.error(`Error updating expense: ${expensesResponse.status} - ${errorText}`);
                throw new Error(`Failed to update expense status: ${errorText}`);
            }

            console.log("Calling trips endpoint:", tripsEndPoint);
            console.log("With body:", JSON.stringify({
                status: newStatus
            }))
    
            // Update trip status
            const tripsResponse = await fetch(tripsEndPoint, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus })
            });
    
            // Check if trip update was successful
            if (!tripsResponse.ok) {
                const errorText = await tripsResponse.text();
                console.error(`Error updating trip: ${tripsResponse.status} - ${errorText}`);
                throw new Error(`Failed to update trip status: ${errorText}`);
            }
    
        } catch (error) {
            console.error('Error updating status:', error);
            // Optionally revert the optimistic update on error
            setData(prevData => prevData.map(trip =>
                trip.id === id ? { ...trip, status: prevData.find(t => t.id === id).status } : trip
            ));
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
                                <img src={trip.invoiceurl} style={{ height: "100px", width: "100px" }} alt="Invoice" onClick={() => handleViewImage(trip.invoiceurl)} />


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
