import Nav from "../components/Nav"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {

    const navigate = useNavigate();

    const navToExpense = () =>{
        navigate("/expense")
    }

    const navToTrip = ()=>{
        navigate("/trips")
    }

    return (
        <div className="container" style={{ display: "flex" }}>
            <Nav />

            <div class="container">
                <div class="row">
                    <div class="card col-sm-5">
                        <div class="pending">
                            <p>Pending Tasks</p>
                            <hr/>
                            <div class="pending-row">
                                <i class="bi bi-clock"></i>
                                <div class="pending-info">
                                    <span>Pending Approvals</span>
                                    <span>1</span>
                                </div>
                            </div>

                            <div class="pending-row">
                                <i class="bi bi-airplane"></i>
                                <div class="pending-info">
                                    <span>New Trips Registered </span>
                                    <span>1</span>
                                </div>
                            </div>

                            <div class="pending-row">
                                <i class="bi bi-cash-stack"></i>
                                <div class="pending-info">
                                    <span>Unreported Expenses</span>
                                    <span>1</span>
                                </div>
                            </div>

                            <div class="pending-row">
                                <i class="bi bi-cart-plus"></i>
                                <div class="pending-info">
                                    <span>Upcoming Expenses</span>
                                    <span>1</span>
                                </div>
                            </div>

                            <div class="pending-row">
                                <i class="bi bi-currency-dollar"></i>
                                <div class="pending-info">
                                    <span>Unreported Advances </span>
                                    <span>1</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card col-sm-7">
                        <p>Recent Expense</p>
                        <hr/>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Subject</th>
                                    <th scope="col">Employee</th>
                                    <th scope="col">Team</th>
                                    <th scope="col">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td colspan="2">Larry the Bird</td>
                                    <td>@twitter</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div>
                    <p>Quick Access</p>
                    <div class="row">
                        <div class="card col-sm" onClick={navToExpense}>
                        <i class="bi bi-wallet2"></i>
                            +New expense</div>
                            
                        <div class="card col-sm">
                            <i class="bi bi-receipt"></i>
                            <span>+Add receipt</span>
                        </div>
                        <div class="card col-sm">
                            <i class="bi bi-files"></i>
                            <span>+Create report</span>
                        </div>
                        <div class="card col-sm" onClick={navToTrip}>
                            <i class="bi bi-airplane"></i>
                            <span>+Create trip</span>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="card col-sm-6">col-sm-6</div>
                    <div class="card col-sm-6">col-sm-6</div>
                </div>
            </div>
        </div>


    )
}