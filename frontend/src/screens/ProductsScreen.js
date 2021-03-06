import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import { signin } from '../actions/userActions';
import { saveProduct, listProducts, deleteProduct } from '../actions/productActions';
import { productDetailsReducer } from '../reducers/productReducers';

function ProductsScreen (props) {

    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');
    const productList = useSelector(state => state.productList);
    const {loading, products, error} = productList;

    const productSave = useSelector(state => state.productSave);
    const { loading: loadingSave, success: successSave, error: errorSave } = productSave;
  
    const productDelete = useSelector(state => state.productDelete);
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;
    const dispatch = useDispatch();

    useEffect(() => {

        if(successSave) {
            setModalVisible(false);
        }
        dispatch(listProducts());
        return () => {
            //
        };
    }, [successSave, successDelete]);

    const openModal = (product) => {

        setModalVisible(true);
        setId(product._id);
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setAuthor(product.author);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
    }
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveProduct({
            _id: id,
            name, image, price, author, category, countInStock, description}));
    }

    const deleteHandler = (product) => {
        dispatch(deleteProduct(product._id));
    }

    return <div className="content content-margined">

        <div className="product-header">
            <h3>Products</h3>
            <button className="button primary" onClick={() => openModal({})}>Create a Book</button>
        </div>

{modalVisible && 
        <div className="form">
        <form onSubmit={submitHandler} >
            <ul className="form-container">

                <li>
                    <h3><center>Create a Book</center></h3>
                </li>
                <li>
                    {loadingSave && <div>Loading...</div>}
                    {errorSave }
                </li>
                <li>
                    <label htmlFor="name"> Name </label>
                    <input type="text" name="name" value={name} id="name" onChange={(e) => setName(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="price">Price</label>
                    <input type="price" id="price" name="price" value={price} onChange={(e) => setPrice(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="image"> Image </label>
                    <input type="text" name="image" value={image} id="image" onChange={(e) => setImage(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="author"> Author </label>
                    <input type="text" name="author" value={author} id="author" onChange={(e) => setAuthor(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="countInStock"> Stock </label>
                    <input type="text" name="countInStock" value={countInStock} id="countInStock" onChange={(e) => setCountInStock(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="category"> Category </label>
                    <input type="text" name="category" value={category} id="category" onChange={(e) => setCategory(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="description"> Description </label>
                    <textarea name="description" value={description} id="description" onChange={(e) => setDescription(e.target.value)}></textarea>
                </li>
                <li>
                    <button type="submit" className="button primary">{id ? "Update": "Create"} </button>
                </li>
                <li>
                    <button type="button" onClick={() => setModalVisible(false)} className="button secondary">Back</button>
                </li>
            </ul>
        </form>
    </div>
}

        <div className="product-list">
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Author</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => 
                    ( <tr key={product._id}>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.author}</td>
                        <td>
                            <button className="button" onClick={() => openModal(product)}>Edit</button>
                            {' '}
                            <button className="button" onClick={() => deleteHandler(product)}>Delete</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    
    
    

            

}

export default ProductsScreen;