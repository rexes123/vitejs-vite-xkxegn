import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../components/AuthProvider";

export default function Trip() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext); // Get user from context
    const [data, setData] = useState([]);
    const [selectedTrips, setSelectedTrips] = useState(new Set());
    const [userRole, setUserRole] = useState('user'); // Default role

    const navToNewTrip = () => {
        navigate("/newTrips");
    };

    useEffect(() => {
        const getData = async () => {
            const response = await fetch('https://backend-2txi.vercel.app/trips');
            const data = await response.json();
            setData(data);
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
                            <th scope="col">#</th>
                            <th scope="col">Staff Name</th>
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
                                <td>{trips.budget_limit}</td>
                                <td>{trips.create_at}</td>
                                
                                {/* Conditionally render based on user role */}
                                {userRole === 'admin' ? (
                                    <select className="form-select" aria-label="Default select example">
                                        <option selected>Open this select menu</option>
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
