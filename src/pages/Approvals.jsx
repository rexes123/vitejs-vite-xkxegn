import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../components/AuthProvider";

export default function Approvals() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext); // Get user from context
    const [data, setData] = useState([]);
    console.log(data);
    const [selectedTrips, setSelectedTrips] = useState(new Set());
    const [userRole, setUserRole] = useState('user'); // Default role

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

                // Combine data
                const combinedData = [...expensesData, ...tripsData];

                setData(combinedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getData();
    }, []);

    // Set user role based on the logged-in user's email
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

    //Handle select change for admin 
    const handleStatusChange = async (id, newStatus) => {
        console.log(`Updating status fro trip ID: ${id} to ${newStatus}`);
        // Update status in the backend
        const response = await fetch(`https://backend-2txi.vercel.app/trips/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: newStatus }), // Send only the status
        });
    
        if (response.ok) {
            const updatedTrip = await response.json(); // Get the updated trip
            setData(prevData => 
                prevData.map(trip => 
                    trip.id === id ? updatedTrip : trip
                )
            );
        } else {
            alert('Failed to update status.'); // Error handling
        }
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
        setSelectedTrips(new Set()); // Clear selected trips
    };

    return (
        <div className="container" style={{ display: "flex" }}>
            <Nav />
            <div style={{ width: "100%" }}>
                <button onClick={navToNewTrip} type="button" className="btn btn-success">+ New trip</button>

                {/* Conditionally render the Delete button */}
                {selectedTrips.size > 0 && (
                    <button onClick={handleDeleteSelected} type="button" className="btn btn-danger">Delete Selected</button>
                )}

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col"><input type="checkbox"/></th>
                            <th scope="col">Name</th>
                            <th scope="col">CATEGORY</th>
                            <th scope="col">AMOUNT</th>
                            <th scope="col">FREQUENCY</th>
                            <th scope="col">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((trips) => (
                            <tr key={trips.id}>
                                <th scope="row">
                                    <input
                                        type="checkbox"
                                        checked={selectedTrips.has(trips.id)}
                                        onChange={() => handleCheckboxChange(trips.id)}
                                    />
                                </th>
                                <td>{trips.name}</td>
                                <td>{trips.category}</td>
                                <td>{trips.amount}</td>
                                <td>{trips.create_at}</td>
                                
                                {/* Conditionally render based on user role */}
                                {userRole === 'admin' ? (
                                    <select 
                                    className="form-select" 
                                    value={trips.status} // Set current status as the value
                                    onChange={(e)=> handleStatusChange(trips.id, e.target.value)} //Handle change
                                    >
                                        <option value="approved">Approved</option>
                                        <option value="rejected">Rejected</option>
                                        <option value="pending">Pending</option>
                                    </select>
                                ) : (
                                    <td>{trips.status}</td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
