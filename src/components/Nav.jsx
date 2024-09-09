import { useState, useContext } from "react"
import Dashboard from "../pages/Dashboard"
import Expense from "../pages/Expense"
import { NavLink } from "react-router-dom";
import { Image, Col } from 'react-bootstrap';
import { AuthContext } from "./AuthProvider";


export default function Nav() {

  const { user } = useContext(AuthContext);
  console.log(user);
  
  const [activeTab, setActiveTab] = useState('');
  console.log(activeTab);

  const renderContent = () => {
    if (activeTab === 'home') {
      return <Dashboard />
    } else if (activeTab === 'expenses') {
      return <Expense />
    }
  }


  return (
    <div class="d-flex align-items-start">

      <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
           <Image src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"roundedCircle style={{height: "120px", width:"120px"}}/> 
          <p>Name</p>
        <NavLink to="/" className={`nav-link ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')} role="tab">Home</NavLink>
        <NavLink to="/expense" className={`nav-link ${activeTab === 'expenses' ? 'active' : ''}`} onClick={() => setActiveTab('expenses')} role="tab">Expenses</NavLink>
        <NavLink to="/trips" className={`nav-link ${activeTab === 'home' ? 'active' : ''}`} role="tab">Trip</NavLink>
        <button class="nav-link" role="tab">Approvals</button>
        <button class="nav-link" role="tab">Settings</button>
      </div>
      <div class="tab-content" id="v-pills-tabContent">
        {renderContent}
      </div>
    </div>
  )
}