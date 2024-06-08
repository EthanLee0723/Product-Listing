import React from 'react';
import { useDropzone } from 'react-dropzone';
import ReactDOM from 'react-dom';
import MainNavbar from './MainNavbar';
import MainFooter from './MainFooter';
import { useState } from 'react';
import { useCallback } from 'react';
import $ from 'jquery';


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
    const [modalVisible, setModalVisible] = useState(false);
    const [files, setFiles] = useState([]);

    const [products,setProducts] = useState(testProducts);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const onDrop = useCallback((acceptedFiles) => {
        setFiles([...files, ...acceptedFiles]);
    }, [files]);


    if(!productsCategories)
    {
        getProductsCategories();
    }

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*' // Only accept images
      });

    return (
        <>
            <MainNavbar />
            <div id="divProductsPageContainer" className='pageContainer'>
                <div>
                <div>
                    <h5>Categories</h5>
                    <div id="divProductCategoriesSidebar">
                    {productsCategories}
                    </div>
                </div>
                <div>
                    <button id="uploadimage" className='btn btnPrimary' onClick={toggleModal}>Upload Image</button>
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
            <MainFooter />

            {/* Modal */}
            {modalVisible && (
                <div className="modal show d-block" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Upload Image</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={toggleModal}></button>
                    </div>
                    <div className="modal-body">
                        <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some image files here, or click to select images</p>
                        </div>
                        <div>
                        {files.map((file, index) => (
                            <div key={index}>{file.name}</div>
                        ))}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={toggleModal}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={uploadimage}>Upload</button>
                    </div>
                    </div>
                </div>
                </div>
            )}
        </>
      );


    function uploadimage(){

        const formData = new FormData();

        files.forEach((file) => {
          formData.append('images', file);
        });

        $.ajax({
          url: '/products/uploadimages', // replace with your actual upload endpoint
          type: 'post',
          data: formData,
          processData: false,
          contentType: false,
          headers: { 'X-CSRF-TOKEN': _token }, // replace `_token` with your actual CSRF token variable
          success: function (result) {
            console.log(result);
            setFiles([]); // Clear the files after successful upload
            toggleModal();
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('error');
            console.error(textStatus, errorThrown);
          },
        });
      };



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
                let htmlProductCategories = arrProductsCategories.map((val,ind)=>{
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
