import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../components/AuthProvider";

export default function Trip() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    console.log(data);
    const [selectedTrips, setSelectedTrips] = useState(new Set());

    const navToNewTrip = () => {
        navigate("/newTrips");
    };

    const { user } = useContext(AuthContext);
    console.log(user.uid);

    useEffect(() => {
        if (user) {
            const getData = async () => {
                try {
                    const url = user.email === 'admin@gmail.com' ? 'https://backend-2txi.vercel.app/trips' : `https://backend-2txi.vercel.app/trips/user/${user.uid}`;
                    const response = await fetch(url);
                    const data = await response.json();
                    console.log('Response from server:', data);
                    setData(data);
                } catch (error) {
                    console.error(error.message);
                }
            };
            getData();
        }
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

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            const allTripIds = new Set(data.map(trip => trip.id));
            setSelectedTrips(allTripIds);
        } else {
            setSelectedTrips(new Set());
        }
    }

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

        setData(prevData => {
            const newData = [...prevData];
            idsToDelete.forEach(id => {
                const index = newData.findIndex(trip => trip.id === id);
                if (index !== -1) {
                    newData.splice(index, 1);
                }
            });
            return newData;
        });

        setSelectedTrips(new Set());
    };

    const formatDate = (dateString)=>{
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute:'2-digit',
            hour12: true
        })
    }

    return (
        <div className="container" style={{ display: "flex" }}>
            <div style={{ width: "100%" }}>
                <button onClick={navToNewTrip} type="button" class="btn btn-success" style={{ marginRight: "10px" }}>+ New trip</button>

                {/* Conditionally render the Delete button */}
                {selectedTrips.size > 0 && (
                    <button onClick={handleDeleteSelected} type="button" class="btn btn-danger">Delete Selected</button>
                )}

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">
                                <input
                                    type="checkbox"
                                    class="deleteAll"
                                    onChange={handleSelectAll}
                                    checked={selectedTrips.size === data.length && data.length > 0}
                                />
                            </th>
                            <th scope="col">Departure</th>
                            <th scope="col">RETURN</th>
                            <th scope="col">SUBJECT</th>
                            <th scope="col">AMOUNT</th>
                            <th scope="col">REPORT</th>
                            <th scope="col">STATUS</th>
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
                                <td>{formatDate(trips.depart_from)}</td>
                                <td>{formatDate(trips.destination)}</td>
                                <td>{trips.purpose}</td>
                                <td>{trips.amount}</td>
                                <td>{formatDate(trips.create_at)}</td>
                                <td>{trips.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
