import { useState, useEffect } from "react";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";

export default function Expense() {
    const [data, setData] = useState([]);
    const [selectedExpenses, setSelectedExpenses] = useState(new Set());
    const navigate = useNavigate();

    const handleAdd = () => {
        navigate("/newExpense");
    };

    console.log(data);

    useEffect(() => {
        const getData = async () => {
            const response = await fetch('https://backend-2txi.vercel.app/expenses');
            const data = await response.json();
            setData(data);
        };
        getData();
    }, []);

    const handleCheckBoxChange = (id) => {
        const updatedSelection = new Set(selectedExpenses);
        if (updatedSelection.has(id)) {
            updatedSelection.delete(id);
        } else {
            updatedSelection.add(id);
        }
        setSelectedExpenses(updatedSelection);
    };

    const handleSelectAll = (event)=>{
        if(event.target.checked){
            const allExpenseIds = new Set(data.map(trip => trip.id));
            setSelectedExpenses(allExpenseIds);
        } else{
            setSelectedExpenses(new Set());
        }
    }

    const handleDeleteSelected = async () => {
        const idsToDelete = Array.from(selectedExpenses);
        if (idsToDelete.length === 0) {
            alert("No expenses selected for deletion.");
            return;
        }

        // Make a DELETE request for each selected expense
        await Promise.all(idsToDelete.map(id => 
            fetch(`https://backend-2txi.vercel.app/expenses/${id}`, {
                method: 'DELETE',
            })
        ));

        // Update the local data state
        setData(prevData => prevData.filter(expense => !idsToDelete.includes(expense.id)));
        setSelectedExpenses(new Set()); // Clear selected expenses
    };

    return (
        <div className="container" style={{ display: "flex" }}>
            <Nav />
            <div style={{ width: "100%" }}>
                <button onClick={handleAdd} type="button" class="btn btn-success">+ New expense</button>

                {/* Conditionally render the Delete button */}
                {selectedExpenses.size > 0 && (
                    <button onClick={handleDeleteSelected} type="button" class="btn btn-danger">Delete Selected</button>
                )}

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">
                                <input 
                                type="checkbox" 
                                onChange={handleSelectAll}
                                checked={selectedExpenses.size == data.length && data.length > 0}
                                />
                                </th>
                            <th scope="col">DETAILS</th>
                            <th scope="col">MERCHANT</th>
                            <th scope="col">REPORT</th>
                            <th scope="col">AMOUNT</th>
                            <th scope="col">STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((expense) => (
                                <tr key={expense.id}>
                                    <th scope="row">
                                        <input
                                            type="checkbox"
                                            checked={selectedExpenses.has(expense.id)}
                                            onChange={() => handleCheckBoxChange(expense.id)}
                                        />
                                    </th>
                                    <td>{expense.subject}</td>
                                    <td>{expense.merchant}</td>
                                    <td>{expense.date}</td>
<<<<<<< main
                                    <td>{expense.amount}</td>
                                    <td>{expense.status}</td>
=======
                                    <td>{expense.total}</td>
>>>>>>> c2a2fe0abc10cc6e283b130c6f02c6f3932d2054
                                    {/* Additional fields can be added here if needed */}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
