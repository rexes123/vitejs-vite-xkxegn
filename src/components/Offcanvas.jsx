import { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { auth } from "../firebase";

export default function Offcanvas() {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    const toggleOffcanvas = () => {
        setIsVisible(!isVisible);
    };

    const handleNavigation = (path) => {
        setIsVisible(false);
        navigate(path);
    };

    const handleLogout = async () => {
        console.log('Log out')
        const auth = getAuth();
        try {
          await auth.signOut();
          localStorage.removeItem('user');
          setUserData(null);
          navigate('/login')
        } catch (error) {
          console.error(error.message);
        }
      }

    return (
        <div className="container" style={{ marginBottom: "10px" }}>
            <button className="btn btn-primary" onClick={toggleOffcanvas}>
                <i className="bi bi-list"></i>
            </button>

            <div className={`offcanvas offcanvas-start ${isVisible ? 'show' : ''}`} tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Offcanvas Navigation</h5>
                    <button type="button" className="btn-close" onClick={toggleOffcanvas}></button>
                </div>
                <div className="offcanvas-body" style={{ display: "flex", flexDirection: "column", position: "relative" }}>
                    <a onClick={() => handleNavigation("/")}><i class="bi bi-house navBar__icon" i />Home</a>
                    <a onClick={() => handleNavigation("/expense")}><i className="bi bi-cart-plus navBar__icon" />Expenses</a>
                    <a onClick={() => handleNavigation("/trips")}><i class="bi bi-airplane navBar__icon" />Trip</a>
                    <a onClick={() => handleNavigation("/approvals")}><i class="bi bi-clipboard-check navBar__icon" />Approvals</a>
                    <a onClick={() => handleNavigation("/settings")}><i class="bi bi-gear navBar__icon" />Settings</a>

                    <a style={{ position: "absolute", bottom: "0" }} onClick={handleLogout}>
                        <i class="bi bi-door-closed navBar__icon"></i>Log out
                    </a>
                </div>
                  

            </div>
        </div>
    );
}
