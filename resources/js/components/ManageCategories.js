import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import MdlAddCategories from './modals/AddCategoryModal';


export default function ManageCategories() {
    const [mdlAddCategoriesData, setMdlAddCategoriesData] = useState({isCategory: true});
    const [productsCategory,setProductsCategories] = useState();

    useEffect(()=>{
        getProductsCategories();
    },[])
    
    return (
        <>
            <div id="divManageCategoriesPageContainer">
                <div id="divManageCategoriesContainer">
                    <div>
                        {productsCategory}
                    </div>
                </div>
            </div>
            <MdlAddCategories {...mdlAddCategoriesData}/>
        </>
    )

    function getProductsCategories()
    {
        let arrProductsCategories = []

        $.ajax({
            url: "/products/getProudctListingCategories",
            type: "post",
            headers: { "X-CSRF-TOKEN": _token },
            success:(data)=>{
                arrProductsCategories = arrProductsCategories.concat(data);
                let htmlProductCategories = arrProductsCategories.map((val,ind)=>{
                    let htmlSubCategories = [];
                    if(val.subcategory_name)
                    {
                        val.subcategory_name.forEach((value,ind)=>{
                            htmlSubCategories.push(<div key={val.subcategory_id[ind]} className="divSubcategories d-flex justify-content-between">
                                <span>
                                    <i className="fa-solid fa-turn-up fa-rotate-90 me-1"></i>
                                    <label htmlFor={"subcategory"+val.subcategory_id[ind]}>{value}</label>
                                </span>
                                <span>
                                    <i className="fa-solid fa-pen me-1"></i>
                                    <i className="fa-solid fa-trash-can"></i>
                                </span>
                            </div>)
                        })

                    }
                    htmlSubCategories = <>{htmlSubCategories}<div className='divAddSubcateogryContainer'><i className="fa-solid fa-plus"></i><button data-bs-target="#mdlAddCategories" data-bs-toggle="modal" onClick={()=>{showAddSubcategoryMdl(val.id,val.category_name)}}>Add subcategory</button></div></>

                    return <div key={val.id} data-category-id={val.id}>
                                <div className='d-flex justify-content-between'>
                                    <label htmlFor={"category"+val.id}>{val.category_name}</label>
                                    <span>
                                        <i className="fa-solid fa-pen me-1"></i>
                                        <i className="fa-solid fa-trash-can"></i>
                                    </span>
                                </div>
                                {htmlSubCategories}
                            </div>
                })

                htmlProductCategories = <>{htmlProductCategories}<div className='divAddCategoryContainer'><i className="fa-solid fa-plus"></i><button data-bs-target="#mdlAddCategories" data-bs-toggle="modal" onClick={showAddCategoryMdl}>Add category</button></div></>

                setProductsCategories(htmlProductCategories);
            }
        })

    }

    function showAddSubcategoryMdl(categoryId,categoryName)
    {
        setMdlAddCategoriesData({isCategory: false,categoryId: categoryId,categoryName: categoryName});
    }

    function showAddCategoryMdl()
    {
        setMdlAddCategoriesData({isCategory:true});
    }
}


if (document.getElementById('manageCategories')) {
    ReactDOM.render(<ManageCategories/>, document.getElementById('manageCategories'));
}
