import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../../Components/Layout/Layout';
import { useParams } from 'react-router-dom';
import { productUrl } from '../../API/Endpoints';
import ProductCard from '../../Components/Product/ProductCard';
import classes from './Results.module.css';
import Loder from '../../Components/Loader/Loder';


function Results() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { categoryName } = useParams();

  useEffect(() => {
     setIsLoading(true)
    axios.get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data);
        setIsLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Layout>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>category/{categoryName}</p>
        <hr />
{isLoading?( 
  <Loder/>
):(
<div className={classes.products_container}>
          {results?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              renderDesc={false}
              renderAdd={true}
              
              
            />
          ))}
        </div>

)} 
        
      </section>
    </Layout>
  );
}

export default Results;
