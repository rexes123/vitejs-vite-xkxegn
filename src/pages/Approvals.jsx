import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import { useEffect, useState } from "react";

export default function Trip() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [selectedTrips, setSelectedTrips] = useState(new Set());

    const navToNewTrip = () => {
        navigate("/newTrips");
    };

    useEffect(() => {
        const getData = async () => {
            const response = await fetch('https://backend-2txi.vercel.app/trips');
            const data = await response.json();
            console.log(data);
            setData(data);
        };

        getData();
    }, []);

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

        // Make a DELETE request for each selected trip
        await Promise.all(idsToDelete.map(id => 
            fetch(`https://backend-2txi.vercel.app/trips/${id}`, {
                method: 'DELETE',
            })
        ));

        // Update the local data state
        setData(prevData => prevData.filter(trip => !idsToDelete.includes(trip.id)));
        setSelectedTrips(new Set()); // Clear selected trips
    };

    return (
        <div className="container" style={{ display: "flex" }}>
            <Nav />
            <div style={{ width: "100%" }}>
                <button onClick={navToNewTrip} type="button" class="btn btn-success">+ New trip</button>

                {/* Conditionally render the Delete button */}
                {selectedTrips.size > 0 && (
                    <button onClick={handleDeleteSelected} type="button" class="btn btn-danger">Delete Selected</button>
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
                                <td>{trips.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
