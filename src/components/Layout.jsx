
import Nav from "./Nav";
import { Outlet } from "react-router-dom";


export default function Layout() {
    return (
        <div className="container" >
            <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">Toggle top offcanvas</button>

            <div class="offcanvas offcanvas-top container" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasTopLabel">Offcanvas top</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    ...
                </div>
            </div>
            <div style={{ display: 'flex' }}>
                <Nav />
                <Outlet />
            </div>
        </div>
    )
}