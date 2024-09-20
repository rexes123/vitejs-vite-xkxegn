import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../components/AuthProvider";

export default function Approvals() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [selectedTrips, setSelectedTrips] = useState(new Set());
    const [userRole, setUserRole] = useState('user');
    const [selectedImage, setSelectImage] = useState(null);
    const [showImageModal, setShowImageModal] = useState(false);

    const navToNewTrip = () => {
        navigate("/newTrips");
    };

    const handleViewImage = (imageUrl) => {
        setSelectImage(imageUrl);
        setShowImageModal(true);
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

    const handleCheckboxChange = (id) => {
        const updatedSelection = new Set(selectedTrips);
        if (updatedSelection.has(id)) {
            updatedSelection.delete(id);
        } else {
            updatedSelection.add(id);
        }
        setSelectedTrips(updatedSelection);
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

    return (
        <div className="container" style={{ display: "flex" }}>
            <Nav />
            <div style={{ width: "100%" }}>
                <button onClick={navToNewTrip} type="button" className="btn btn-success">+ New trip</button>
                {selectedTrips.size > 0 && (
                    <button onClick={handleDeleteSelected} type="button" className="btn btn-danger">Delete Selected</button>
                )}

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col"><input type="checkbox" /></th>
                            <th scope="col">Name</th>
                            <th scope="col">CATEGORY</th>
                            <th scope="col">AMOUNT</th>
                            <th scope="col">FREQUENCY</th>
                            <th>View</th>
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
                                        onChange={() => handleCheckboxChange(trip.id)}
                                    />
                                </th>
                                <td>{trip.name}</td>
                                <td>{trip.category}</td>
                                <td>{trip.amount}</td>
                                <td>{trip.create_at}</td>
                                <td>
                                    {/* {trip.invoiceUrl && (
                                        <i className="bi bi-eye" onClick={() => handleViewImage(trip.invoiceUrl)} style={{ cursor: 'pointer' }}>asda</i>
                                    )} */}
                                    <i className="bi bi-eye"  onClick={() => handleViewImage(trip.invoiceUrl)} style={{ cursor: 'pointer' }}></i>
                                </td>

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
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={() => setShowImageModal(false)}>&times;</span>
                            <img src={selectedImage} alt="Invoice" style={{ width: '100%' }} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
