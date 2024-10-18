import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";

export default function Expense() {
    const [data, setData] = useState([]);
    const [selectedExpenses, setSelectedExpenses] = useState(new Set());
    const navigate = useNavigate();

    const user = useContext(AuthContext);

      useEffect(()=>{
          if(user){
              const getData = async ()=>{
                  try{
                      const url = user.user.email === 'admin@gmail.com' ? 'https://backend-2txi.vercel.app/expenses' : `https://backend-2txi.vercel.app/expenses/user/${user.user.uid}`;
                      const response = await fetch(url);
                      const data = await response.json();
                      setData(data);

                  } catch(error){
                    console.error(error.message);
                  }
              };
              getData();
          }
      })



    const handleAdd = () => {
        navigate("/newExpense");
    };

    console.log(data);

    // useEffect(() => {
    //     const getData = async () => {
    //         const response = await fetch('https://backend-2txi.vercel.app/expenses');
    //         const data = await response.json();
    //         setData(data);
    //     };
    //     getData();
    // }, []);


    const handleCheckBoxChange = (id) => {
        const updatedSelection = new Set(selectedExpenses);
        if (updatedSelection.has(id)) {
            updatedSelection.delete(id);
        } else {
            updatedSelection.add(id);
        }
        setSelectedExpenses(updatedSelection);
    };

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            const allExpenseIds = new Set(data.map(trip => trip.id));
            setSelectedExpenses(allExpenseIds);
        } else {
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
                <button onClick={handleAdd} type="button" class="btn btn-success" style={{ marginRight: "10px" }}>+ New expense</button>

                {/* Conditionally render the Delete button */}
                {selectedExpenses.size > 0 && (
                    <button onClick={handleDeleteSelected} type="button" class="btn btn-danger">Delete Selected</button>
                )}

                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">
                                <input
                                    type="checkbox"
                                    onChange={handleSelectAll}
                                    checked={selectedExpenses.size === data.length && data.length > 0}
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
                                    <td>{formatDate(expense.date)}</td>
                                    <td>{expense.amount}</td>
                                    <td>{expense.status}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
