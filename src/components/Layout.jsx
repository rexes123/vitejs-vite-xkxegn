
import Nav from "./Nav";
import { Outlet } from "react-router-dom";
import Offcanvas from "../pages/Offcanvas";
import { NavLink } from "react-router-dom";


export default function Layout() {
    return (
        <div className="container" >
            <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">Toggle top offcanvas</button>

            <div class="offcanvas offcanvas-top container" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasTopLabel">Offcanvas top</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body" style={{display: "flex", flexDirection: "column"}}>
                    <NavLink to="/" role="tab"><i class="bi bi-house navBar__icon"></i> Home</NavLink>
                    <NavLink to="/expense" role="tab"><i className="bi bi-cart-plus navBar__icon" />Expenses</NavLink>
                    <NavLink to="/trips" role="tab"><i class="bi bi-airplane navBar__icon" />Trip</NavLink>
                    <NavLink to="/approvals" role="tab"><img src="" />Approvals</NavLink>
                    <NavLink to="/settings" role="tab" class="nav-link"><i class="bi bi-gear navBar__icon"></i>Settings</NavLink>
                </div>
            </div>
            <div style={{ display: 'flex' }}>
                <Nav />
                <Outlet />
            </div>
        </div>
    )
}