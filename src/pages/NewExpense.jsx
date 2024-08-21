import { useNavigate } from "react-router-dom"

export default function NewExpense() {

    const navigate = useNavigate()

    const navToExpense = () =>{
        navigate('/expense')
    }
    return (
        <div className="container" >
            <div style={{ display: "flex", justifyContent:"flex-end"}}>
            <button type="button" class="btn-close" aria-label="Close" onClick={navToExpense}></button>
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ width: "45%" }}>
                    <div class="mb-3 row">
                        <label class="col-sm-2 col-form-label">Subject</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputPassword" />
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Merchant</label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control" id="inputPassword" />
                        </div>
                    </div>

                    <div class="mb-3 row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Date*</label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control" id="inputPassword" />
                        </div>
                    </div>

                    <div class="mb-3 row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Total*</label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control" id="inputPassword" />
                        </div>
                    </div>

                    <div class="mb-3 row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Category*</label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control" id="inputPassword" />
                        </div>
                    </div>

                    <div class="mb-3 row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Description</label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control" id="inputPassword" />
                        </div>
                    </div>

                    <div class="mb-3 row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Employee*</label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control" id="inputPassword" />
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

            <button>Save draft</button>

        </div>

    )
}