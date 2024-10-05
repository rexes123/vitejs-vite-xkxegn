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
            console.log('Response from server:', data);
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

    const handleSelectAll = (event)=>{
        if(event.target.checked){
            const allTripIds = new Set(data.map(trip => trip.id));
            setSelectedTrips(allTripIds);
        } else{
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

    return (
        <div className="container" style={{ display: "flex" }}>
            <div style={{ width: "100%" }}>
                <button onClick={navToNewTrip} type="button" class="btn btn-success" style={{marginRight: "10px"}}>+ New trip</button>

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
                            <th scope="col">DESTINATION</th>
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
                                <td>{trips.destination}</td>
                                <td>{trips.purpose}</td>
                                <td>{trips.amount}</td>
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
