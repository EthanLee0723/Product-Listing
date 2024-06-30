import React from 'react';
import ReactDOM from 'react-dom';
import MainNavbar from './MainNavbar';
import MainFooter from './MainFooter';
import { useState, useEffect } from 'react';


export default function ProductsPage() {

    const [productsCategories, setProductsCategories] = useState();
    const [products,setProducts] = useState();
    const [filterByCatId,setFilterByCatId] = useState(0);
    const [filterBySubCatId,setFilterBySubCatId] = useState(null);
    const [searchTxt,setSearchTxt] = useState("");
    const [sortBy,setSortBy] = useState("newArrivals"); 
    const [allCat,setAllCat] = useState([]);
    const urlParams = new URLSearchParams(window.location.search);


    useEffect(()=>{
        if(urlParams.size)
        {
            if(urlParams.get('text'))
            {
                setSearchTxt(urlParams.get('text'));
            }
    
            if(urlParams.get('categoryId'))
            {
                console.log(urlParams.get('categoryId'));
                setFilterByCatId(parseInt(urlParams.get('categoryId')))
            }
    
            if(urlParams.get('subcategoryId'))
            {
                setFilterBySubCatId(parseInt(urlParams.get('subcategoryId')))
            }
    
            history.pushState(null,null,window.location.origin+"/products")
        }
        getProductsCategories();
        getPrdByFilter();
    },[])

    useEffect(()=>{
        chgCatSelection();
    },[allCat])

    useEffect(()=>{
        chgCatSelection()
        getPrdByFilter();
    },[filterByCatId,filterBySubCatId,sortBy])

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
                setAllCat(arrProductsCategories.concat(data));
            }
        })
    }

    function getPrdByFilter()
    {
        console.log(sortBy);
        $.ajax({
            url: "/products/getActivePrdByFilter",
            type: "get",
            data: {
                catId: filterByCatId,
                subcatId: filterBySubCatId,
                searchTxt: searchTxt,
                sortBy: sortBy
            },
            success:(data)=>{
                const productsElements = data.map((val)=>{
                    return <div key={val.id} onClick={()=>{window.location.href = "/products/productDetails/"+val.id}}>
                                <div style={{background:`url("/images/products/${val.images?val.images[0].imgName:""}")`,backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center"}}></div>
                                <div>
                                    <label>{val.product_name}</label>
                                    <label>RM {val.price}</label>
                                </div>
                            </div>
                })
                setProducts(<>{productsElements}</>)
            }
        })
    }

    function chgCatSelection()
    {
        let htmlProductCategories = allCat.map((val,ind)=>{
            let htmlSubCategories = [];
            if(val.subcategory_name)
            {
                val.subcategory_name.forEach((value,ind)=>{
                    htmlSubCategories.push(<div className='divSubcategorySection' key={val.subcategory_id[ind]}>
                        <input checked={filterBySubCatId === val.subcategory_id[ind]} onChange={()=>{ filterByCat(val.subcategory_id[ind],"subcategory") }}  id={"subcategory"+val.subcategory_id[ind]} type='radio' name ="productCategory"></input>
                        <label htmlFor={"subcategory"+val.subcategory_id[ind]}>{value}</label>
                    </div>)
                })

                htmlSubCategories = <>
                    <i className="fa-solid fa-chevron-right"></i><div className="collapsed">{htmlSubCategories}</div>
                </>
            }

            return <div key={val.id} className='divCategorySection' data-category-id={val.id}>
                <input onChange={()=>{ filterByCat(val.id) }} checked={filterBySubCatId === null && filterByCatId === val.id} id={"category"+val.id} type='radio' name="productCategory"></input>
                <label htmlFor={"category"+val.id}>{val.category_name}</label>
                {htmlSubCategories}
            </div>
        })

        setProductsCategories(htmlProductCategories);
    }

    function filterByCat(catId,catType = 'category')
    {
        setFilterByCatId(catType === "category"?catId:null);
        setFilterBySubCatId(catType === "category"?null:catId);
    }

    function getSortByTxt()
    {
        switch(sortBy)
        {
            case "newArrivals":
                return "Newest Arrivals";
            case "name":
                return "Name (A - Z)";
            case "priceLowToHigh":
                return "Price - Low to High";
            case "priceHighToLow":
                return "Price - High to Low";
        }
    }

    return (
        <>
            <MainNavbar/>
                <div id="divProductsPageContainer" className='pageContainer'>
                    <div>
                        <div>
                            <h5>Categories</h5>
                            <div id="divProductCategoriesSidebar">
                                {productsCategories}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div id='divSearchSort'>
                            <div className='divSearchBar'>
                                <input className='form-control' value={searchTxt} onChange={ev=>{ setSearchTxt(ev.target.value) }} placeholder='Search...'></input>
                                <button className='btn btnPrimary' onClick={getPrdByFilter}>
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </button>
                            </div>
                            <div>
                                <label>Sort By:</label>
                                <div className='divDropdown'>
                                    <button className='btn btnPrimary'>{ getSortByTxt() }<i className="ms-1 fa-solid fa-sort-down"></i></button>
                                    <div className='collapsed'>
                                        <div onClick={()=>{ setSortBy("newArrivals") }}>Newest Arrivals</div>
                                        <div onClick={()=>{ setSortBy("name") }}>Name (A - Z)</div>
                                        <div onClick={()=>{ setSortBy("priceLowToHigh") }}>Price - Low to High</div>
                                        <div onClick={()=>{  setSortBy("priceHighToLow") }}>Price - High to Low</div>
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

$(document).on("click","#divProductCategoriesSidebar svg.fa-chevron-right,svg.fa-chevron-down",(ev)=>{
    const elementToPerformAction = $(ev.currentTarget).next("div");
    
    $(ev.currentTarget).toggleClass("fa-chevron-right fa-chevron-down");
    elementToPerformAction.toggleClass("collapsed expanded");
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
    ReactDOM.render(<ProductsPage/>, document.getElementById('productsPage'));
}
