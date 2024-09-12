import Nav from "../components/Nav"
import React, { useState } from "react"

export default function NewTrips() {
    //Define state variable for each input field
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [purpose, setPurpose] = useState('');
    const [departForm, setDepartForm] = useState('');
    const [destination, setDestination] = useState('');
    const [budgetLimit, setBudgetLimit] = useState('');
    const [flightType, setFlightType] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [hotel, setHotel] = useState('');

    console.log(name);
    console.log(type);
    console.log(purpose)
    console.log(departForm);
    console.log(destination)
    //Handle form submission
    const handleSubmit = async(event)=>{
        event.preventDefault();
        console.log('Submit')

         const formData = {
             name, 
             type,
             purpose,
             departForm,
             destination,
             budgetLimit,
             flightType,
             checkIn,
             hotel
         };

        // //Send data to backend
         try{
             const response = await fetch('https://backend-2txi.vercel.app/trips', {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json'
                 },
                 body: JSON.stringify(formData)
             });

             if(response.ok){
                 console.log('Trip saved successfully');
             }


         } catch(error){
             console.error(error);
         }
    };

    return (

        <div className="container" style={{ display: "flex" }}>
            <Nav />
            <div class="container">

                <form onSubmit={handleSubmit}>
                <h3>New Trip</h3>
                <hr />
                <div class="mb-3 row">
                    <label for="staticEmail" class="col-sm-2 col-form-label" style={{width: "40%"}}>Name*</label>
                    <div class="col-sm-10" style={{width: "60%"}}>
                        <input type="text" class="form-control" id="inputPassword" value={name} onChange={(e)=> setName(e.target.value)}/>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Type</label>
                    <div class="col-sm-10">
                        <div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="type" value='domestic' id="flexRadioDefault1" checked={type === 'domestic'} onChange={(e)=> setType(e.target.value)}/>
                                <label class="form-check-label" for="flexRadioDefault1">
                                    Domestic
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="type" value='international' id="flexRadioDefault2" checked={type === 'international'} onChange={(e)=> setType(e.target.value)}/>
                                <label class="form-check-label" for="flexRadioDefault2">
                                    International
                                </label>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="staticEmail" class="col-sm-2 col-form-label">Purpose*</label>
                    <div class="col-sm-10">
                        <textarea class="form-control" id="inputPassword" value={purpose} onChange={(e)=>setPurpose(e.target.value)}/>
                    </div>
                </div>

                <h3>ITERATY</h3>
                <hr />
                <div class="mb-3 row">
                    <label for="staticEmail" class="col-sm-2 col-form-label">FLIGHT</label>
                    <div class="col-sm-10">
                        <div>
                            <div class="form-check">
                                {/* const handleFlightType(e){
                                 setFlightType(e.target.value)   
                                } */}
                                <input class="form-check-input" type="radio" name="flightType" id="oneWay" value="one-way" checked={flightType === 'one-way'} onChange={(e)=>setFlightType(e.target.value)}/>
                                <label class="form-check-label" for="flexRadioDefault1">
                                    One-way
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flightType" id="roundTrip" value="roundTrip" checked={flightType === 'roundTrip'} onChange={(e)=>setFlightType(e.target.value)}/>
                                <label class="form-check-label" for="flexRadioDefault2">
                                    Roundtrip
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ width: "60%" }}>

                        <div class="mb-3 row">
                            <label for="staticEmail" class="col-sm-2 col-form-label">Depart from*</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="departFrom" value={departForm} onChange={(e)=> setDepartForm(e.target.value)} />
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

                    <div style={{ width: "30%" }}>
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

                <h3>ACCOMODATION</h3>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ width: "60%", display: 'flex', justifyContent: "space-between" }}>
                        <div class="mb-3 row">
                            <label for="staticEmail" class="col-sm-2 col-form-label" style={{width: "40%"}}>Check-in*</label>
                            <div class="col-sm-10" style={{width: "60%"}}>
                                <input type="text" class="form-control" id="inputPassword" />
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="staticEmail" class="col-sm-2 col-form-label" style={{width: "40%"}}>Check-out*</label>
                            <div class="col-sm-10" style={{width: "60%"}}>
                                <input type="text" class="form-control" id="inputPassword" />
                            </div>
                        </div>
                    </div>

                    <div style={{ width: "30%" }}>

                    </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ width: "60%", display: 'flex', justifyContent: "space-between" }}>
                        <div class="mb-3 row" style={{width: "104%"}}>
                            <label for="staticEmail" class="col-sm-2 col-form-label" style={{width: "20%"}}>Hotel*</label>
                            <div class="col-sm-10" style={{width: "80%"}}>
                                <input type="text" class="form-control" id="inputPassword" />
                            </div>
                        </div>
                    </div>

                    <div style={{ width: "30%", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                        <button type="button" class="btn btn-primary">Save draft</button>
                        <button type="submit" class="btn btn-secondary">Save</button>
                    </div>
                </div>
                </form>


            </div>
        </div>

    )
}