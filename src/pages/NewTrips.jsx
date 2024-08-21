import Nav from "../components/Nav"

export default function NewTrips() {
    return (

        <div className="container" style={{display: "flex"}}>
            <Nav />
            <div class="container">
                <h3>New Trip</h3>
                <hr />
                <div class="mb-3 row">
                    <label for="staticEmail" class="col-sm-2 col-form-label">Name</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputPassword" />
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Type</label>
                    <div class="col-sm-10">
                        <div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                <label class="form-check-label" for="flexRadioDefault1">
                                    Default radio
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
                                <label class="form-check-label" for="flexRadioDefault2">
                                    Default checked radio
                                </label>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="staticEmail" class="col-sm-2 col-form-label">Purpose</label>
                    <div class="col-sm-10">
                        <textarea type="text" class="form-control" id="inputPassword" />
                    </div>
                </div>

                <h3>ITERATY</h3>
                <hr />
                <div class="mb-3 row">
                    <label for="staticEmail" class="col-sm-2 col-form-label">FLIGHT</label>
                    <div class="col-sm-10">
                        <div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault2" id="flexRadioDefault1" />
                                <label class="form-check-label" for="flexRadioDefault1">
                                    Default radio
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault2" id="flexRadioDefault2" checked />
                                <label class="form-check-label" for="flexRadioDefault2">
                                    Default checked radio
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ width: "55%" }}>

                        <div class="mb-3 row">
                            <label for="staticEmail" class="col-sm-2 col-form-label">Depart from*</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="inputPassword" />
                            </div>
                        </div>

                        <div class="mb-3 row">
                            <label for="staticEmail" class="col-sm-2 col-form-label">Destination*</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="inputPassword" />
                            </div>
                        </div>

                        <div class="mb-3 row">
                            <label for="staticEmail" class="col-sm-2 col-form-label">Budget limit*</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="inputPassword" />
                            </div>
                        </div>
                    </div>

                    <div style={{ width: "35%" }}>
                        <div class="mb-3 row">
                            <label for="staticEmail" class="col-sm-2 col-form-label">Date</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="inputPassword" />
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="staticEmail" class="col-sm-2 col-form-label">Date</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="inputPassword" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}