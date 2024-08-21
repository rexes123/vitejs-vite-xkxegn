import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";

export default function Trip(){
    const navigate = useNavigate()

    const navToNewTrip = () =>{
        navigate("/newTrips")
    }
    return (
        <div className="container" style={{ display: "flex"}}>
            <Nav />
            <div style={{ width: "100%"}}>
                <button onClick={navToNewTrip}>+ New trip</button>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">DETAILS</th>
                        <th scope="col">MECHANT</th>
                        <th scope="col">AMOUNT</th>
                        <th scope="col">REPORT</th>
                        <th scope="col">STATUS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                    </tr>
                  
                </tbody>
            </table>
            </div>
           

        </div>
    )
}