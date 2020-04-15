import React,{Fragment} from 'react';
import {Link, withRouter} from "react-router-dom";
import {signout, isAuthenticated} from "../auth/helper";
const activeTab = (history, path)=>{
    if (history.location.pathname === path){
        return{color:"#2ecc72"}
    }else{
        return{color:"#d1d1d1"}
    }
}
 const Menu = ({
     history
 }) =>(
    <div>
    <ul className="nav nav-tabs bg-dark">
        <li className="nav-item">
            <Link style={activeTab(history,"/")}  className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item">
            <Link style={activeTab(history,"/cart")} className="nav-link" to="/cart">Cart</Link>
        </li>
        {isAuthenticated() && isAuthenticated().user.role ===0 && (
            <li className="nav-item">
                <Link style={activeTab(history,"/user/dashboard")} className="nav-link" to="/user/dashboard">u Dashboard</Link>
            </li>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <li className="nav-item">
                <Link style={activeTab(history,"/admin/dashboard")} className="nav-link" to="/admin/dashboard">a Dashboard</Link>
            </li>
        )}
        {!isAuthenticated() && (
            <Fragment>
                <li className="nav-item">
                    <Link style={activeTab(history,"/signup")} className="nav-link" to="/signup">Signup</Link>
                </li>
                <li className="nav-item">
                    <Link style={activeTab(history,"/signin")} className="nav-link" to="/signin">Sign In</Link>
                </li>
            </Fragment>
        )}
        {isAuthenticated() && (
            <li className="nav-item">
                <span className="nav-link text-warning" onClick={()=>{
                    signout(()=>{
                        history.push("/")
                    });
                }} >Sign out</span>
                {/* <Link style={activeTab(history,"/signout")} className="nav-link" to="/signout">Sign out</Link> */}
            </li>
        )}
    </ul>
</div>
 )
export default withRouter(Menu);