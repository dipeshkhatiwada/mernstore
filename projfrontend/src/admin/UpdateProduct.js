import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getCategories, getProduct, updateProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
const UpdateProduct = ({match}) => {
    const {user,token} = isAuthenticated();

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        photo:"",
        categories:[],
        category:"",
        loading:false,
        error:"",
        createdProduct:"",
        getaRedirect:false,
        formData:""
    });

    const {
        name, description, price, stock,
        categories, category, loading, error,
         createdProduct, getaRedirect, formData  
    } = values;

    const preload= productId => {
        getProduct(productId).then(data =>{
            // console.log(data);
            if(data.error){
                setValues({...values, error:data.error});
            }else{
                preloadCategories();
                setValues({
                    ...values,
                    name:data.name,
                    description:data.description,
                    price:data.price,
                    stock:data.stock,
                    category:data.category._id,
                    formData : new FormData()
                });
            }
        })
    }
    const preloadCategories = ()=>{
        getCategories().then(data =>{
            // console.log(data);
            if(data.error){
                setValues({...values, error:data.error});
            }else{
                setValues({
                    categories:data,
                    formData: new FormData() 
                });
            }
        })

    }
    useEffect(() => {
      preload(match.params.productId);
    }, []);

    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, error:"", loading:true })

        updateProduct(match.params.productId, user._id, token, formData)
        .then(data=>{
            if(data.error){
                setValues({...values, error: data.error})
            }else{
                setValues({
                    ...values,
                    name: "",
                    description: "",
                    price: "",
                    stock: "",
                    photo:"",
                    loading:false,
                    createdProduct:data.name
                })
            }
        })
        .catch()
    };

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] :event.target.value
        formData.set(name,value);
        setValues({...values,error:false, [name]:value});
    };

    const goBack = ()=> (
        <div >
            <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard" >Admin Home</Link>
        </div>
    );
    const messages = ()=>{
        if(createdProduct){
            return (
                <div className="col-md-8 offset-sm-2 text-left">
                    <div className="alert alert-success" style={{display:updateProduct ? "": "none"}}>
                         Product has been updated
                    </div>
                </div>
            )
        }
        if(error){  
            return(
                <div className="col-md-8 offset-sm-2 text-left">
                    <div className="alert alert-success" style={{display:error ? "": "none"}}>
                        Product failed to update
                    </div>
                </div>
            )
        }
    };

    const updateProductForm = () => (
        <form>
        <p className="lead">Post photo</p>
        <div className="form-group">
            <label className="btn btn-block">
            <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
            />
            </label>
        </div>
        <div className="form-group">
            <p className="lead">Name</p>
            <input
            onChange={handleChange("name")}
            name="photo"
            className="form-control"
            placeholder="Name"
            value={name}
            />
        </div>
        <div className="form-group">
            <p className="lead">Description</p>
            <textarea
            onChange={handleChange("description")}
            name="photo"
            className="form-control"
            placeholder="Description"
            value={description}
            />
        </div>
        <div className="form-group">
            <p className="lead">Price</p>
            <input
            onChange={handleChange("price")}
            type="number"
            className="form-control"
            placeholder="Price"
            value={price}
            />
        </div>
        <div className="form-group">
            <p className="lead">Category</p>
            <select
            onChange={handleChange("category")}
            className="form-control"
            placeholder="Category"
            >
            <option>Select</option>
            {categories && 
            categories.map((cat, index) => (
                <option key={index} value={cat._id}>{cat.name}</option>
            ))
            }
            <option value="b">b</option>
            </select>
        </div>
        <div className="form-group">
            <p className="lead">Stock</p>
            <input
            onChange={handleChange("stock")}
            type="number"
            className="form-control"
            placeholder="Quantity"
            value={stock}
            />
        </div>

        <button
            type="submit"
            onClick={onSubmit}
            className="btn btn-outline-success mb-3"
        >
            Update Product
        </button>
        </form>
    );

    return (
        <Base
        title="Update product here!"
        description="Welcome to product updating section"
        className="container bg-success p-4"
        >
        {goBack()}{messages()}
        <div className="row bg-white rounded">
            <div className="col-md-8 offset-md-2">{updateProductForm()}</div>
        </div>
        </Base>
    );
};

export default UpdateProduct;
