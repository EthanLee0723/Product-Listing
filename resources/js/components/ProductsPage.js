import React from 'react';
import ReactDOM from 'react-dom';
import MainNavbar from './MainNavbar';
import MainFooter from './MainFooter';


export default function ProductsPage({isAdmin}) {
    let testProducts = [];

    for(let x = 0;x < 5;x++)
    {
        testProducts.push(<div key={x + 1} >
            <div style={{background:'url("/images/products/product.jpg")',backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center"}}>
                </div>
                <div>
                    <label>Sample Product</label>
                    <label>RM 10.99</label>
                </div>
            </div>);
    }

    testProducts = <>{testProducts}</>

    const [productsCategories, setProductsCategories] = useState();
    const [products,setProducts] = useState(testProducts);

    if(!productsCategories)
    {
        getProductsCategories();
    }

    return (
        <>
            <MainNavbar/>
                <div id="divProductsPageContainer" className='pageContainer'>
                    <div>
                        <div>
                            <h5>Categories</h5>
                            <div>
                                {productsCategories}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div id='divSearchSort'>
                            <div>
                                <input className='form-control' placeholder='Search...'></input>
                                <button className='btn btnPrimary'>
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </button>
                            </div>
                            <div>
                                <label>Sort By:</label>
                                <div className='divDropdown'>
                                    <button className='btn btnPrimary'>Newest Arrivals<i className="ms-1 fa-solid fa-sort-down"></i></button>
                                    <div className='collapsed'>
                                        <div>Newest Arrivals</div>
                                        <div>Name (A - Z)</div>
                                        <div>Price - Low to High</div>
                                        <div>Price - High to Low</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="divProductList">
                            {products}
                        </div>
                    </div>
                </div>
            <MainFooter/>
        </>
    );
}

if (document.getElementById('productsPage')) {
    ReactDOM.render(<ProductsPage {...data}/>, document.getElementById('productsPage'));
}
