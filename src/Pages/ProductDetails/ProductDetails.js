import React, { useEffect, useState } from 'react';
import Layout from '../../Components/Layout/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../../Components/Product/ProductCard';
import { productUrl } from '../../API/Endpoints';
import Loder from '../../Components/Loader/Loder';

function ProductDetails() {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { productID } = useParams();

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${productUrl}/products/${productID}`)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false);
        console.log(res.data); 
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [productID]);

  return (
    <Layout>
    {isLoading ? <Loder /> : <ProductCard product={product} flex={true} renderDesc={true}
    renderAdd={true}
    />}
  </Layout>
  );
}

export default ProductDetails;
