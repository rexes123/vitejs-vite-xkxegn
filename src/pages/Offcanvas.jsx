
// import Nav from "./Nav";
import { Outlet, NavLink } from "react-router-dom";
import 'bootstrap';
import { useRef } from "react";


export default function Offcanvas() {
    const offCanvasRef = useRef(null);

    const closeOffCanvas = () => {
        const offCanvas = bootstrap.Offcanvas.getInstance(offCanvasRef.current);
        if (offCanvas) {
            offCanvas.hide();
        }
    }

    return (
        <div className="container" >
            <button
                class="btn btn-primary"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasTop"
                aria-controls="offcanvasTop"
            ><i class="bi bi-list"></i>
            </button>

            <div
                ref={offCanvasRef}
                class="offcanvas offcanvas-top container"
                tabindex="-1"
                id="offcanvasTop"
                aria-labelledby="offcanvasTopLabel"
            >

                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasTopLabel">Offcanvas top</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>

                <div class="offcanvas-body" style={{ display: "flex", flexDirection: "column" }}>
                {/* <button to="/" role="tab" onClick={closeOffCanvas} data-bs-dismiss="offcanvas" aria-label="Close">Home</button> */}

                    <NavLink to="/" role="tab" onClick={closeOffCanvas}><i class="bi bi-house navBar__icon"></i> Home</NavLink>
                    <NavLink to="/expense" role="tab" onClick={closeOffCanvas}><i className="bi bi-cart-plus navBar__icon" />Expenses</NavLink>
                    <NavLink to="/trips" role="tab" onClick={closeOffCanvas}><i class="bi bi-airplane navBar__icon" />Trip</NavLink>
                    <NavLink to="/approvals" role="tab" onClick={closeOffCanvas}><img src="" />Approvals</NavLink>
                    <NavLink to="/settings" role="tab" onClick={closeOffCanvas} class="nav-link"><i class="bi bi-gear navBar__icon"></i>Settings</NavLink>
                </div>
            </div> 
        </div>
    )
}