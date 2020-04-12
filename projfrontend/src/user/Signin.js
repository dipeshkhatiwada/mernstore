import React from 'react';
import Base from "../core/Base";
// import {Link} from "react-router-dom";
const Signin = () => {
  const signInForm = ()=>{
    return(
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input className="form-control" type="email"/>
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input className="form-control" type="password"/>
            </div>
            <button className="btn btn-success btn-block">Sign In!</button>
          </form>
        </div>
      </div>
    )
  }
  return (
    <Base title="Signin PAge" description="A page for signin">
        {/* <h2>this is signin page</h2> */}
        {signInForm()}
    </Base>
  );
}
export default Signin;