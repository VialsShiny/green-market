import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import ProductDetail from '../components/features/products/ProductDetailCard';
import {fetchData} from '../components/services/Fetch';

export default function ProductDetails() {
    const {id} = useParams();
    const [product, setProduct] = useState([]);

    useEffect(() => {
        fetchData(`https://fakestoreapi.com/products/${id}`)
            .then((data) => {
                setProduct(data);
            })
            .catch((err) => console.error('Erreur API:', err));
    }, []);

    return (
        <ProductDetail
            id={product.id}
            imageSrc={product.image}
            imageAlt={product.title}
            title={product.title}
            price={product.price}
            category={product.category}
            description={product.description}
            // promotion={product.price > 50}
        />
    );
}
