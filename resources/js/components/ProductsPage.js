import React from 'react';
import ReactDOM from 'react-dom';
import MainNavbar from './MainNavbar';
import MainFooter from './MainFooter';
import { useState } from 'react';
import '../../library/fontawesome-free-6.5.2-web/js/all.min.js';
import '../../library/fontawesome-free-6.5.2-web/css/all.min.css';


export default function ProductsPage() {
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
                                <button className='btn btn-primary'>
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </button>
                            </div>
                            <div>
                                <label>Sort By:</label>
                                <div className='divDropdown'>
                                    <button className='btn btn-primary'>Newest Arrivals<i className="ms-1 fa-solid fa-sort-down"></i></button>
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

    function getProductsCategories()
    {
        let arrProductsCategories = [{
            id: 0,
            category_name: "All products"
        }]

        $.ajax({
            url: "/products/getProudctListingCategories",
            type: "post",
            headers: { "X-CSRF-TOKEN": _token },
            success:(data)=>{
                arrProductsCategories = arrProductsCategories.concat(data);
                const htmlProductCategories = arrProductsCategories.map((val,ind)=>{
                    let htmlSubCategories = [];
                    if(val.subcategory_name)
                    {
                        val.subcategory_name.forEach((value,ind)=>{
                            htmlSubCategories.push(<div key={val.subcategory_id[ind]}>
                                <input id={"subcategory"+val.subcategory_id[ind]} type='radio' name ="productCategory"></input>
                                <label htmlFor={"subcategory"+val.subcategory_id[ind]}>{value}</label>
                            </div>)
                        })
        
                        htmlSubCategories = <>
                            <i className="fa-solid fa-chevron-right"></i><div className="collapsed">{htmlSubCategories}</div>
                        </>
                    }

                    return <div key={val.id} data-category-id={val.id}>
                        <input id={"category"+val.id} type='radio' name="productCategory"></input>
                        <label htmlFor={"category"+val.id}>{val.category_name}</label>
                        {htmlSubCategories}
                    </div>
                })

                setProductsCategories(htmlProductCategories);
            }
        })

    }
}

$(document).on("click","svg.fa-chevron-right,svg.fa-chevron-down",(ev)=>{
    const elementToPerformAction = $(ev.currentTarget).next("div");

    if($(ev.currentTarget).hasClass("fa-chevron-right"))
    {
        $(ev.currentTarget).removeClass("fa-chevron-right");
        $(ev.currentTarget).addClass("fa-chevron-down");
        elementToPerformAction.removeClass("collapsed");
        elementToPerformAction.addClass("expanded");
    }
    else
    {
        $(ev.currentTarget).removeClass("fa-chevron-down");
        $(ev.currentTarget).addClass("fa-chevron-right");
        elementToPerformAction.removeClass("expanded");
        elementToPerformAction.addClass("collapsed");
    }
})

$(document).on("click",".dropdown button",(ev)=>{
    $(ev.currentTarget).next("ul").css("display",$(ev.currentTarget).next("ul").css("display") === "none"?"block":"none");
})

$(document).on("click",".divDropdown button",(ev)=>{
    $(ev.currentTarget).next("div").toggleClass("expanded collapsed")
})

$(document).on("click",(ev)=>{
    
    if($(ev.target)[0] !== $(".divDropdown button")[0])
    {
        $(".divDropdown .expanded").toggleClass("expanded collapsed");
    }
})

if (document.getElementById('productsPage')) {
    ReactDOM.render(<ProductsPage />, document.getElementById('productsPage'));
}
