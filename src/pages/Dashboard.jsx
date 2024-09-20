import Nav from "../components/Nav"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";

export default function Dashboard() {

    const navigate = useNavigate();

    const navToExpense = () => {
        navigate("/expense")
    }

    const navToTrip = () => {
        navigate("/trips")
    }

    const [pendingStatus, setPendingStatus] = useState(0)
    console.log(pendingStatus)

    const [data, setData] = useState([])
    console.log(data);




    useEffect(() => {
        data.forEach(() => {
            const pending = data.filter(item => item.status === 'pending');
            setPendingStatus(pending.length);
        }, [data])
    })

    const [expenses, setExpense] = useState(0);
    const [trips, setTrips] = useState(0);

    useEffect(() => {
        const getData = async () => {
            try {
                const [expensesResponse, tripsResponse] = await Promise.all([
                    fetch('https://backend-2txi.vercel.app/expenses'),
                    fetch('https://backend-2txi.vercel.app/trips')
                ]);

                const expensesData = await expensesResponse.json();
                setExpense(expensesData.length)
                console.log(expensesData.length);
                const tripsData = await tripsResponse.json();
                setTrips(tripsData.length)
                console.log(tripsData.length);

                // Combine data
                const combinedData = [...expensesData, ...tripsData];

                setData(combinedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getData();
    }, []);


    return (
        <div className="container" style={{ display: "flex" }}>
            <Nav />

            <div class="container">
                <div class="row">
                    <div class="card col-sm-5">
                        <p>Pending Tasks</p>
                        <hr />
                        <div class="pending-row">
                            <i class="bi bi-clock"></i>
                            <div class="pending-info">
                                <span>Pending Approvals</span>
                                <span>{pendingStatus}</span>
                            </div>
                        </div>

                        <div class="pending-row">
                            <i class="bi bi-airplane"></i>
                            <div class="pending-info">
                                <span>New Trips Registered </span>
                                <span>{trips}</span>
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
                                <span>{expenses}</span>
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
                    <div class="card col-sm-7">
                        <p>Recent Expense</p>
                        <hr />
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
                                {/* Update the three most latest to here */}

                                {/* {
                                    expenses.map((index, expense) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row">{index+1}</th>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                            </tr>
                                        )
                                    })
                                } */}
                                {/* <tr>
                                    <th scope="row">2</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td colspan="2">Larry the Bird</td>
                                    <td>@twitter</td>
                                </tr> */}
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