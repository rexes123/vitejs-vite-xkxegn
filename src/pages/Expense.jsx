import Nav from "../components/Nav"
import { useNavigate } from "react-router-dom"

export default function Expense() {


    const navigate = useNavigate()

    const handleAdd = () =>{
        navigate("/newExpense")
    }
    return (
        <div className="container" style={{ display: "flex"}}>
            <Nav />
            <div style={{ width: "100%"}}>
                <button onClick={handleAdd}>+ New expense</button>
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
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        <td>@fat</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        <td>@fat</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        <td>@fat</td>
                        <td>@fat</td>
                    </tr>
                </tbody>
            </table>
            </div>
           

        </div>
    )
}