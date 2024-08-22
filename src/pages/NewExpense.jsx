import { useNavigate } from "react-router-dom"
import Nav from "../components/Nav"
import { useState } from "react"

export default function NewExpense() {

    const navigate = useNavigate()

    const navToExpense = () => {
        navigate('/expense')
    }

    const [subject, setSubject] = useState('');
    console.log(subject);
    const [merhant, setMerhant] = useState('');
    console.log(merhant)
    const [date, setDate] = useState('')
    console.log(date)
    const [amount, setAmount] = useState('')
    console.log(amount)
    const [category, setCategory] = useState('')
    console.log(category)
    const [description, setDescription] = useState('')
    console.log(description)
    const [employee, setEmployee] = useState('')
    console.log(employee)

    const [array, setArray] = useState([])
    console.log(array);

    const obj = {
        subject: subject,
        merhant: merhant,
        date: date,
        amount: amount,
        category: category,
        description: description,
        employee: employee
    }

    console.log(obj);

    const handleSubmit = () =>{
        setArray([...array, obj])
        //Try just send obj to backend
    }
    

    return (
        <div style={{ display: "flex" }} className="container">
            <Nav />
            <div className="container" >

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button type="button" class="btn-close" aria-label="Close" onClick={navToExpense}></button>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ width: "45%" }}>
                        <div class="mb-3 row">
                            <label class="col-sm-2 col-form-label">Subject</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" onChange={(e) => setSubject(e.target.value)} />
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label class="col-sm-2 col-form-label">Merchant</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" onChange={(e) => setMerhant(e.target.value)} />
                            </div>
                        </div>

                        <div class="mb-3 row">
                            <label class="col-sm-2 col-form-label" type="input">Date*</label>
                            <div class="col-sm-10">
                                <input type="date" class="form-control" onChange={(e) => setDate(e.target.value)} />
                            </div>
                        </div>

                        <div class="mb-3 row">
                            <label class="col-sm-2 col-form-label">Total*</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control" onChange={(e) => setAmount(e.target.value)} />
                            </div>
                        </div>

                        <div class="mb-3 row">
                            <label class="col-sm-2 col-form-label">Category*</label>
                            <div class="col-sm-10">
                                {/* <input type="text" class="form-control" /> */}
                                <select class="form-select" aria-label="Default select example" onChange={(e)=> setCategory(e.target.value)}>
                                    <option selected>Type</option>
                                    <option value="trip">Trip</option>
                                    <option value="services">Services</option>
                                    <option value="catering">Catering</option>
                                </select>
                            </div>
                        </div>

                        <div class="mb-3 row">
                            <label class="col-sm-2 col-form-label">Description</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" onChange={(e)=> setDescription(e.target.value)}/>
                            </div>
                        </div>

                        <div class="mb-3 row">
                            <label class="col-sm-2 col-form-label">Employee*</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" onChange={((e)=>setEmployee(e.target.value))}/>
                            </div>
                        </div>
                    </div>

                    <label style={{ width: "45%", border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center" }} type="file">

                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                            <i class="bi bi-plus"></i>
                            <p>Upload and invoice</p>
                        </div>
                    </label>
                </div>

                <button onClick={handleSubmit}>Save</button>

            </div>
        </div>


    )
}