import {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

//Products URL
const productsUrl = import.meta.env.VITE_WC_PRODUCTS_URL;

const Shopfront = () => {
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);

    //useEffect for axios call
    useEffect(() => {
        axios.get(`${productsUrl}`)
        .then((res) => {
            setProducts(res.data)
            setLoading(false)
        })
        .catch((err) => console.log(err))
    }, [])

    const Products = ({ products }) => {
        const mappedProducts = products.map((product, index) => {
            function getFeaturedImage(product) {
                if (product && product.images && product.images[0]) {
                    return product.images[0].src;
                } else {
                    return 'https://via.placeholder.com/150';
                }
            }
            //return for the map
            return (
                <div className='item-container' key={index}>
                    <div className='d-flex flex-col'>
                    <img className='product-Image' src={getFeaturedImage(product)} alt="Product Image" />
                    <Link className='product-link' to={`/product/${product.id}`}>
                        <h4 className="name button-donate">{product.name}</h4>
                    </Link>
                    </div>

                    {/* <img className='product-Image' src={getFeaturedImage(product)} alt="Product Image" />
                    <Link className='product-link' to={`/product/${product.id}`}>
                        <h4 className="name">{product.name}</h4>
                    </Link>
                    <h3 className='name'>${product.prices.price} {product.prices.currency_code}</h3> */}
                </div>
            )
        })
        // Products return
        return (
            <>
                {mappedProducts}
            </>
        )
    }

  //ShopFront return
  return (
    <div id="shop-page" className='container'>
        <h2>Donate</h2>
        <div id='product-grid' className='grid-container'>
            {loading ? <p>Loading ... </p> : <Products products={products} />}
        </div>
    </div>
  )
}

export default Shopfront
