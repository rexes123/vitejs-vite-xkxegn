import { useState } from "react"
import Nav from "../components/Nav"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function Expense() {

    const [data, setData] = useState([])

    const navigate = useNavigate()

    const handleAdd = () => {
        navigate("/newExpense")
    }

    useEffect(()=>{
        const getData = async () => {
            const response = await fetch('https://backend-2txi.vercel.app/expenses');
            const data = await response.json();
            setData(data);
        }
        getData()
    }, [])


    return (
        <div className="container" style={{ display: "flex" }}>
            <Nav />
            <div style={{ width: "100%" }}>
                <button onClick={handleAdd}>+ New expense</button>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col"><input type="checkbox"/></th>
                            <th scope="col">DETAILS</th>
                            <th scope="col">MECHANT</th>
                            <th scope="col">REPORT</th>
                            <th scope="col">AMOUNT</th>
                            <th scope="col">STATUS</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            data.map((expense, index) => {
                                return (
                                    <tr key={expense.id}>
                                        <th scope="row"><input type="checkbox"/></th>
                                        <td>{expense.subject}</td>
                                        <td>{expense.merchant}</td>
                                        <td>{expense.date}</td>
                                        <td>{expense.total}</td>
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