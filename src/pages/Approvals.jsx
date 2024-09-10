import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import { useEffect, useState } from "react";

export default function Trip(){
    const navigate = useNavigate()

    const [data, setData] = useState([])

    const navToNewTrip = () =>{
        navigate("/newTrips")
    }

    useEffect(()=>{
        const getData = async()=>{
            const response = await fetch('https://backend-2txi.vercel.app/trips')
            const data = await response.json()
            console.log(data)
            setData(data)
        }
    
        getData();
    }, []);

    
    
    return (
        <div className="container" style={{ display: "flex"}}>
            <Nav />
            <div style={{ width: "100%"}}>
                <button onClick={navToNewTrip}>+ New trip</button>
            <table class="table">
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

                        {
                            data.map((trips, index) => {
                                return (
                                    <tr key={trips.id}>
                                        <th scope="row"><input type="checkbox"/></th>
                                        <td>{trips.name}</td>
                                        <td>{trips.catergory}</td>
                                        <td>{trips.budget_limit}</td>
                                        <td>{trips.create_at}</td>
                                        <td>{trips.status}</td>
                                        

                                        {/* <td>{expense.merchant}</td>
                                        <td>{expense.date}</td>
                                        <td>{expense.total}</td> */}
                                        {/* <td>{expense.category}</td>
                                        <td>{expense.description}</td> */}
                                        {/* <td>{expense.employee}</td> */}

                                    </tr>
                                )
                            })
                        }

                    </tbody>
            </table>
            </div>
           

        </div>
    )
}