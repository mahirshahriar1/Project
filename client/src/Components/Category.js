import React from 'react'
import Item from './Item'
import Navbar from './Navbar'
import Axios from 'axios';
import { useState, useEffect, useRef } from 'react';

export default function Category() {
    const category = window.location.href.split('/').reverse()[0]


    const [seller, setSeller] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [customer, setCustomer] = useState(false);
    const [customerID, setCustomerID] = useState(0);
    const [cartID, setCartID] = useState(0);

    const [bool, setBool] = useState(false);
    const [allProducts, setAllProducts] = useState([]);
    const [productList, setProductList] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [isComplete, setIsComplete] = useState(false);


    const getProducts = () => {
        Axios.get('http://localhost:3001/importCategoricalProducts'
            , { params: { category: category } }).then((response) => {
                setAllProducts(response.data);
                setProductList(response.data.slice(0, 6));
                //console.log(response.data);
            });
    };
    const getMoreProducts = () => {
        const numFetchedProducts = productList.length;
        const remainingProducts = allProducts.length - numFetchedProducts;
        //console.log(remainingProducts);
        if (remainingProducts === 0) {
            setIsComplete(true);
            setIsLoading(false);
            return;
        }

        setTimeout
            (() => {

                setProductList((prevProductList) =>

                    prevProductList.concat(allProducts.slice(prevProductList.length, prevProductList.length + 6))
                );
                setIsLoading(false);

            }
                , 500);

    };
    const sort = (text) => {
      //  console.log(text);

      
        Axios.get(`http://localhost:3001/sortCategories/${category}/${text}/ASC`).then((response) => {
            //clear product list
            setProductList([])
            setAllProducts(response.data);
            setProductList(response.data.slice(0, 6));
        });
       

    }

    const [showMenu, setShowMenu] = useState(false);
    const containerRef = useRef(null);


    useEffect(() => {      
        if (bool === false) {
            getProducts();
            setBool(true);
    
            Axios.get('http://localhost:3001/login').then((response) => {
                if (response.data.type === 'Seller') {
                    setSeller(true);
                } else if (response.data.type === 'Customer') {
                    setCustomerID(response.data.user[0].ID)
                    setCustomer(true);
    
                    Axios.get('http://localhost:3001/getCartID', { params: { id: response.data.user[0].ID } }).then((response) => {
                        setCartID(response.data[0].ID);
                    })
                } else if (response.data.type === 'Admin') {
                    setAdmin(true);
                }
            });
        }
    
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                document.documentElement.offsetHeight &&
                !isLoading && !isComplete
            ) {
                setIsLoading(true);
                getMoreProducts();
            }
        };
    
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };
    
        window.addEventListener("scroll", handleScroll);
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
           
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category,isLoading, productList, containerRef, showMenu]);





    return (
        <div>
            <Navbar />

            <div className="container">

                <div className="row">
                    {productList.map((element) => {

                        return <div className="col-md-4" key={element.ID} style={{ display: 'flex', justifyContent: 'center' }} >
                            <Item name={element.Name} description={element.Price}
                                imglink={element.Image} id={element.ID} product={true} admin={admin} customer={customer} seller={seller} customerID={customerID}
                                cartID={cartID} prodQuantity={element.Quantity} home={true}
                            />
                        </div>
                    })}

                </div>
            </div>
            {isLoading && (
                <div style={{ marginTop: '50px', height: '200px', display: "flex", justifyContent: "center" }}>
                    <div style={{ height: '60px', width: '60px' }} className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )}
            <button className='cart-button fa-solid fa-cart-shopping'
                onClick={() => {
                    //send cartid to /cart

                    window.location.href = `http://localhost:3000/cart/`

                }
                }

            > </button>
            <div className="show-more-options-container" ref={containerRef}>
                <button className="show-more-options" onClick={() => setShowMenu(!showMenu)}>
                    Sort
                </button>
                {showMenu && (
                    <div className="show-more-options-menu">
                        <button
                            onClick={() => {
                                sort('Name');
                                setShowMenu(false);
                            }}
                        >Name</button>
                        <button
                            onClick={() => {
                                sort('Price');
                                setShowMenu(false);
                            }}

                        >Price</button>
                        <button
                            onClick={() => {
                                sort('Quantity');
                                setShowMenu(false);
                            }}
                        >Quantity</button>
                        <button
                            onClick={() => {
                                sort('ID');
                                setShowMenu(false);
                            }}
                        >Date Added</button>
                    </div>
                )}
            </div>

        </div>
    )
}
