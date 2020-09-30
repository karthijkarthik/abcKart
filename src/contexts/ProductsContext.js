import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ProductsContext = createContext();

export default function ProductsContextProvider(props) {
    /* Setting the local State using React Hook useState() */
    const [products, setProducts] = useState([]);

    /* Fetching Products using Axios */
    const fetchProducts = async () => {
        const result = await axios(
          'http://localhost:3000/products',
        );
        setProducts(result.data); // Setting the fetched result to local state
    };

    /* Fetch the method using React Hook useEffect() */
    useEffect(() => {
        console.log("Entered here");
        fetchProducts();
    }, []);

    return ( 
        <ProductsContext.Provider value={{products}} >
            {props.children}
        </ProductsContext.Provider>
     );
}