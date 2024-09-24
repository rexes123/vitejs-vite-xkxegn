

export default function Offcanvas() {
    return (

        <div>
            <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">Toggle top offcanvas</button>

            <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel" />
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasTopLabel">Offcanvas top</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <div>
                    <NavLink to="/" onClick={() => setActiveTab('home')} role="tab"><i class="bi bi-house navBar__icon"></i> Home</NavLink>
                    <NavLink to="/expense" onClick={() => setActiveTab('expenses')} role="tab"><i className="bi bi-cart-plus navBar__icon" />Expenses</NavLink>
                    <NavLink to="/trips" role="tab"><i class="bi bi-airplane navBar__icon" />Trip</NavLink>
                    <NavLink to="/approvals" role="tab"><img src="" />Approvals</NavLink>
                    <NavLink to="/settings" role="tab" class="nav-link"><i class="bi bi-gear navBar__icon"></i>Settings</NavLink>
                </div> 
                <p>asdsd</p>
            </div>
        </div>

    )
}