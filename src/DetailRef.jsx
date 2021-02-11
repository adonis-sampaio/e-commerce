import React, {useRef} from 'react';
import Products from './Products';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from './services/useFetch';
import Spinner from './Spinner';
import PageNotFound from './PageNotFound';

export default function Detail(props) {
    const { category, id } = useParams();
    const skuRef = useRef();
    const navigate = useNavigate();
    const { data:product, error, loading} = useFetch(`products/${id}`);

    if (loading) return <Spinner />
    if (!product) return <PageNotFound />
    if (error) throw error;
 

    return (
        <div id="detail">
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p id="price">$ {product.price}</p>
           
            <select id="size" ref={skuRef}>
                <option value="">White Size?</option>
                { product.skus.map((s) => {
                    return <option key={s.sku} value={s.sku}>{s.size}</option>
                })}
            </select>
            <p>
                <button 
                    className="btn btn-primary"  
                    onClick={() => {
                        const sku = skuRef.current.value;
                        if (!sku) return alert("Select Size.");
                        props.addToCart(id, sku);
                        navigate('/cart')
                    }}>
                        Add to cart
                    </button>
            </p>
            <img src={`/images/${product.image}`} alt={product.category} />
        </div>
    )
}