import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addCart } from '../redux/action'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const Products = () => {
    const [data, setData] = useState([])
    const [filter, setFilter] = useState(data)
    const [loading, setLoading] = useState(false)
    let componentMounted = true

    const dispatch = useDispatch()

    //Add to Cart
    const addProduct = (product) => {
        dispatch(addCart(product))
    }

    //getProducts
    useEffect(() => {
        const getProducts = async () => {
            setLoading(true)
            const response = await fetch('https://fakestoreapi.com/products/')
            if (componentMounted) {
                setData(await response.clone().json())
                setFilter(await response.json())
                setLoading(false)
                console.log(data)
            }

            return () => {
                componentMounted = false
            }
        }

        getProducts()
    }, [])

    // Product Loading Skeleton
    const Loading = () => {
        return (
            <>
                <div className='col-12 py-5 text-center'>
                    <Skeleton height={40} width={560} />
                </div>
                <div className='col-md-4 col-sm-6 col-xs-8 col-12 mb-4'>
                    <Skeleton height={592} />
                </div>
                <div className='col-md-4 col-sm-6 col-xs-8 col-12 mb-4'>
                    <Skeleton height={592} />
                </div>
                <div className='col-md-4 col-sm-6 col-xs-8 col-12 mb-4'>
                    <Skeleton height={592} />
                </div>
                <div className='col-md-4 col-sm-6 col-xs-8 col-12 mb-4'>
                    <Skeleton height={592} />
                </div>
                <div className='col-md-4 col-sm-6 col-xs-8 col-12 mb-4'>
                    <Skeleton height={592} />
                </div>
                <div className='col-md-4 col-sm-6 col-xs-8 col-12 mb-4'>
                    <Skeleton height={592} />
                </div>
            </>
        )
    }

    const dropDownChange = (id, value) => {
        let el = document.getElementById(id)
        el.innerHTML = value
    }

    // Filter Products
    const filterProduct = (cat) => {
        const updatedList = data.filter((item) => item.category === cat)
        setFilter(updatedList)
    }

    const ShowProducts = () => {
        return (
            <>
                {/* Category */}
                <div className='buttons d-flex justify-content-center py-5 gap-2'>
                    <button
                        className='btn btn-outline-dark shadow btn-sm px-4 py-2 rounded-4'
                        onClick={() => setFilter(data)}
                    >
                        All
                    </button>
                    <button
                        className='btn btn-outline-dark shadow btn-sm px-4 py-2 rounded-4'
                        onClick={() => filterProduct("men's clothing")}
                    >
                        Men's Clothing
                    </button>
                    <button
                        className='btn btn-outline-dark shadow btn-sm px-4 py-2 rounded-4'
                        onClick={() => filterProduct("women's clothing")}
                    >
                        Women's Clothing
                    </button>
                    <button
                        className='btn btn-outline-dark shadow btn-sm px-4 py-2 rounded-4'
                        onClick={() => filterProduct('jewelery')}
                    >
                        Jewelery
                    </button>
                    <button
                        className='btn btn-outline-dark shadow btn-sm px-4 py-2 rounded-4'
                        onClick={() => filterProduct('electronics')}
                    >
                        Electronics
                    </button>
                </div>

                {filter.map((product) => {
                    return (
                        <div id={product.id} key={product.id} className='col-md-4 col-sm-6 col-xs-8 col-12 mb-4'>
                            {/* Card */}
                            <div className='card text-center h-100' key={product.id}>
                                {/*Product Image*/}
                                <div className='d-flex align-items-center text-center h-50 p-3 border-bottom'>
                                    <img className='w-100 h-100 object-fit-scale p-3' src={product.image} alt='Card' />
                                </div>
                                {/* Product Info */}
                                <div className='card-body h-50'>
                                    <h5 className='card-title text-start text-truncate' style={{ maxWidth: '100%' }}>
                                        {product.title}
                                    </h5>
                                    <p
                                        className='card-text text-start fst-italic text-secondary text-truncate overflow-hidden'
                                        style={{ maxHeight: '100px' }}
                                    >
                                        {product.description}
                                    </p>
                                    {/* DropDown Menu */}
                                    <div class='dropdown text-start my-4'>
                                        <button
                                            class='px-3 py-2 btn border shadow dropdown-toggle w-100 text-start'
                                            type='button'
                                            data-bs-toggle='dropdown'
                                            aria-expanded='false'
                                            id={`btn${product.id}`}
                                        >
                                            Color
                                        </button>
                                        <ul class='dropdown-menu'>
                                            <li>
                                                <button
                                                    class='dropdown-item'
                                                    onClick={() => {
                                                        dropDownChange(`btn${product.id}`, 'Beige')
                                                    }}
                                                >
                                                    Beige
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    class='dropdown-item'
                                                    onClick={() => {
                                                        dropDownChange(`btn${product.id}`, 'Olive Green')
                                                    }}
                                                >
                                                    Olive Green
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    class='dropdown-item'
                                                    onClick={() => {
                                                        dropDownChange(`btn${product.id}`, 'Denim Blue')
                                                    }}
                                                >
                                                    Denim Blue
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                    {/* BuyArea */}
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <div className=''>
                                            <p className='lead m-0 fw-bold'>$ {product.price.toFixed(2)}</p>
                                        </div>
                                        {/* add available boolean state to product data array and replace 'product' with
                                        'product.available' to filter and add 'Out Of Stock' Control*/}
                                        {product ? (
                                            <div className='d-flex gap-2 align-items-center'>
                                                {/* LinkToProduct */}
                                                <Link to={'/product/' + product.id} className='btn btn-dark'>
                                                    {/* Card Button */}
                                                    <svg
                                                        xmlns='http://www.w3.org/2000/svg'
                                                        width='16'
                                                        height='16'
                                                        fill='currentColor'
                                                        class='bi bi-credit-card'
                                                        viewBox='0 0 16 16'
                                                    >
                                                        <path d='M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z' />
                                                        <path d='M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z' />
                                                    </svg>
                                                </Link>
                                                {/* AddToCart Button */}
                                                <button
                                                    className='btn btn-dark'
                                                    onClick={() => {
                                                        toast.success('Added to cart')
                                                        addProduct(product)
                                                    }}
                                                >
                                                    {/* Cart Icon */}
                                                    <svg
                                                        xmlns='http://www.w3.org/2000/svg'
                                                        width='16'
                                                        height='16'
                                                        fill='currentColor'
                                                        class='bi bi-bag'
                                                        viewBox='0 0 16 16'
                                                    >
                                                        <path d='M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z' />
                                                    </svg>
                                                </button>
                                            </div>
                                        ) : (
                                            <div>
                                                <p className='text-danger fts-italic m-0'>Out of Stock</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </>
        )
    }
    return (
        <>
            <div className='container my-3 py-3'>
                <div className='row'>
                    <div className='col-12'>
                        <h2 className='display-5 text-center'>Latest Products</h2>
                        <hr />
                    </div>
                </div>
                <div className='row justify-content-center'>{loading ? <Loading /> : <ShowProducts />}</div>
            </div>
        </>
    )
}

export default Products
