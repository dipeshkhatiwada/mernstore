import React,{useState} from 'react';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import {createCategory} from './helper/adminapicall';

const AddCategory=()=> {

    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const {user,token} = isAuthenticated();

    const goBack = ()=> (
        <div >
            <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard" >Admin Home</Link>
        </div>
    )
    const handleChange= event=>{
        setError("");
        setName(event.target.value)
    };
    const onSubmit = (event)=>{
        event.preventDefault();
        setError("");
        setSuccess(false);
        // backend request call
        createCategory(user._id,token,{name})
        .then(data=>{
            if(data.error){
                setError(true);
            }else{
                setError("");
                setSuccess(true);
                setName("");
            }
        })

    }
    const messages = ()=>{
        if(success){
            return (
                <div className="col-md-8 offset-sm-2 text-left">
                    <div className="alert alert-success" style={{display:success ? "": "none"}}>
                        New Category has been created
                    </div>
                </div>
            )
        }
        if(error){  
            return(
                <div className="col-md-8 offset-sm-2 text-left">
                    <div className="alert alert-success" style={{display:error ? "": "none"}}>
                        Category failed to created
                    </div>
                </div>
            )
        }
    };
      

    const createCategoryForm = ()=>{
        return (
            <form>
                <div className="form-group">
                    <p className="lead">Enter the category</p>
                    <input type="text"
                    onChange={handleChange}
                    value={name}
                    className="form-control my-3"
                    autoFocus
                    required
                    placeholder="For ex. Summer"
                    />
                    <button onClick={onSubmit} className="btn btn-outline-info">Create Category</button>
                </div>
            </form>
        )
    }

  return (
    <Base
        title="Add a Category here!"
        description="Welcome to Category creation section"
        className="container bg-success p-4"
    >
        {goBack()}{messages()}

        <div className="row bg-white rounded">
            <div className="col-md-8 offset-md-2">{createCategoryForm()}</div>
        </div>
   </Base>
  );
}
export default AddCategory;