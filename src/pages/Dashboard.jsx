import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BarChar from "../components/BarChart";
import BarChartTeam from "../components/BarChartTeam";


export default function Dashboard() {
    const navigate = useNavigate();

    const navToExpense = () => {
        navigate("/newExpense");
    };

    const navToTrip = () => {
        navigate("/newTrips");
    };

    const [pendingStatus, setPendingStatus] = useState(0);
    const [data, setData] = useState([]);
    const [expenses, setExpenses] = useState([]); // Store actual expenses

    // for (let i = 0; i < expenses.length; i++){
    //     console.log(expenses[i].team === "Software development");
    // }

    const softDevExpense = expenses.filter(expense => expense.team === "Software development");
    console.log(softDevExpense.length);

    // console.log(expenses.create_timestamp);
    const [trips, setTrips] = useState(0);

    useEffect(() => {
        const getData = async () => {
            try {
                const [expensesResponse, tripsResponse] = await Promise.all([
                    fetch('https://backend-2txi.vercel.app/expenses'),
                    fetch('https://backend-2txi.vercel.app/trips')
                ]);

                const expensesData = await expensesResponse.json();
                setExpenses(expensesData); // Set expenses to the actual data
                const tripsData = await tripsResponse.json();
                setTrips(tripsData.length);

                // Combine data for pending tasks
                const combinedData = [...expensesData, ...tripsData];
                setData(combinedData);

                // Calculate pending status
                const pending = expensesData.filter(item => item.status === 'pending').length;
                setPendingStatus(pending);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getData();
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="card col-sm-5">
                    <p>Pending Tasks</p>
                    <hr />
                    <div className="pending-row">
                        <i className="bi bi-clock"></i>
                        <div className="pending-info">
                            <span>Pending Approvals</span>
                            <span>{pendingStatus}</span>
                        </div>
                    </div>

                    <div className="pending-row">
                        <i className="bi bi-airplane"></i>
                        <div className="pending-info">
                            <span>New Trips Registered</span>
                            <span>{trips}</span>
                        </div>
                    </div>

                    <div className="pending-row">
                        <i className="bi bi-cash-stack"></i>
                        <div className="pending-info">
                            <span>Unreported Expenses</span>
                            <span>1</span>
                        </div>
                    </div>

                    <div className="pending-row">
                        <i className="bi bi-cart-plus"></i>
                        <div className="pending-info">
                            <span>Upcoming Expenses</span>
                            <span>{expenses.length}</span> {/* Display the number of expenses */}
                        </div>
                    </div>

                    <div className="pending-row">
                        <i className="bi bi-currency-dollar"></i>
                        <div className="pending-info">
                            <span>Unreported Advances</span>
                            <span>1</span>
                        </div>
                    </div>
                </div>
                <div className="card col-sm-7">
                    <p>Recent Expense</p>
                    <hr />
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Subject</th>
                                <th scope="col">Employee</th>
                                <th scope="col">Team</th>
                                <th scope="col">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses
                                .sort((a, b) => new Date(b.create_timestamp) - new Date(a.create_timestamp))
                                .slice(0, 3)
                                .map((expense, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{expense.employee}</td> {/* Adjust this field */}
                                        <td>{expense.team}</td> {/* Adjust this field */}
                                        <td>{expense.amount}</td> {/* Adjust this field */}
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="row card" style={{paddingInline: "10px"}}>
                <p>Quick Access</p>
                <hr/>
                <div className="row">
                    <div className="card col-sm" onClick={navToExpense}>
                        <i className="bi bi-wallet2"></i>
                        +New expense
                    </div>

                    {/* <div className="card col-sm">
                        <i className="bi bi-receipt"></i>
                        <span>+Add receipt</span>
                    </div> */}
                    {/* <div className="card col-sm">
                        <i className="bi bi-files"></i>
                        <span>+Create report</span>
                    </div> */}
                    <div className="card col-sm" onClick={navToTrip}>
                        <i className="bi bi-airplane"></i>
                        <span>+Create trip</span>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="card col-sm-6">
                    <BarChartTeam/>
                </div>
                <div className="card col-sm-6"><BarChar /></div>
            </div>
        </div>
    );
}
