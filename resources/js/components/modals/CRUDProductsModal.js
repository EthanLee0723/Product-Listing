import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import { faXmark,faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../../library/select2-4.1.0-rc.0/dist/css/select2.min.css';
import '../../../library/select2-4.1.0-rc.0/dist/js/select2.min.js';
import MdlDelPrd from './DelPrdModal.js';

export default function MdlCRUDProducts({prdDetails = null}) {
    const [colorVar, setColorVar] = useState([]);
    const [productDetails,setProductDetails] = useState([]);
    const [productTblDetails,setProductTblDetails] = useState([]);
    const [productImg,setProductImg] =  useState([]);
    const [productDetailsElement,setProductDetailsElement] = useState([]);
    const [productTblDetailsElement,setProductTblDetailsElement] = useState([]);
    const [colorVarElement,setColorVarElement] = useState([]);
    const [productImgElement,setProductImgElement] = useState([]);
    const [mdlData,setMdlData] = useState([]);
    const [delPrdMdlData,setDelMdlData] = useState();


    if(prdDetails !== mdlData)
    {
        if(prdDetails)
        {
            $("#inCreateProductName").val(prdDetails.product_name).trigger("change");
            $("#selProductsCategory > option").remove();
            $("#selProductsCategory").append("<option value='"+prdDetails.category_id+"' selected>"+prdDetails.category_name+"</option>");
            $("#selProductsCategory").val(prdDetails.category_id).trigger("change");
            $("#selProductsSubcategory > option").remove();
            $("#selProductsSubcategory").append("<option value='"+prdDetails.subcategory_id+"' selected>"+prdDetails.subcategory_name+"</option>");
            $("#selProductsSubcategory").val(prdDetails.subcategory_id).trigger("change");
            $("#inCreateProductPrice").val(prdDetails.price).trigger("change");
            $("#inCreateProductStock").val(prdDetails.stock_count).trigger("change");
            $("#inCreateProductStatus").prop("checked",prdDetails.status === "active");
            prdDetails.color_variation && setColorVar(prdDetails.color_variation);
            prdDetails.product_details && setProductDetails(prdDetails.product_details);
            prdDetails.product_table_details && setProductTblDetails(prdDetails.product_table_details);
            prdDetails.images && setProductImg(prdDetails.images.map((val,ind)=>{
                val.data = window.location.origin + '/images/products/' + val.imgName;
                val.isExist = true;
                return val;
            }))
        }
        else
        {
            $("#inCreateProductName").val("").trigger("change");
            $("#selProductsCategory").val("").trigger("change");
            $("#selProductsSubcategory").val("").trigger("change");
            $("#inCreateProductPrice").val("").trigger("change");
            $("#inCreateProductStock").val("").trigger("change");
            $("#inCreateProductStatus").prop("checked",false);
            clearAllState();
        }
        setMdlData(prdDetails);
    }

    function clearAllState()
    {
        setColorVar([]);
        setProductDetails([]);
        setProductTblDetails([]);
        setProductImg([]);
    }

    useEffect(()=>{
        setColorVarElement(colorVar.map((val,ind)=>{
            return <div key={ind} className='divInputSection divColorSelectionInputSection'>
                        <FontAwesomeIcon icon={faXmark} onClick={()=>{rmvColorVarRow(ind)}}/>
                        <div className='inputPlaceholderContainer'>
                            <input placeholder=' ' value={val.colorName} onChange={ev=>chgColorVarInput(ev,ind,"colorName")}></input>
                            <label>Color Name</label>
                        </div>
                        <div className='inputPlaceholderContainer'>
                            <input placeholder=' ' type='color' value={val.color} onChange={ev => chgColorVarInput(ev,ind,"color")}></input>
                            <label>Color</label>
                        </div>
                    </div>
        }));
    },[colorVar]);

    useEffect(()=>{
        setProductDetailsElement(productDetails.map((val,ind)=>{
            return <div key={ind} className='divInputSection'>
                        <FontAwesomeIcon icon={faXmark} onClick={()=>{rmvProductDetailsRow(ind)}}/>
                        <div className='inputPlaceholderContainer'>
                            <input placeholder=' ' value={val.title?val.title:''} onChange={ev=>chgProductDetailsInput(ev,ind,"title")}></input>
                            <label>Title</label>
                        </div>
                        <div className='inputPlaceholderContainer'>
                            <textarea placeholder=' ' value={val.content?val.content:''} onChange={ev=>chgProductDetailsInput(ev,ind,"content")}></textarea>
                            <label>Content</label>
                        </div>
                    </div>
        }));
    },[productDetails]);

    useEffect(()=>{
        setProductTblDetailsElement(productTblDetails.map((val,ind)=>{
            return <div key={ind} className='divInputSection'>
                        <FontAwesomeIcon icon={faXmark} onClick={()=>{rmvProductTblDetailsRow(ind)}}/>
                        <div className='inputPlaceholderContainer'>
                            <input placeholder=' ' value={val.title?val.title:''} onChange={ev=>chgProductTblDetailsInput(ev,ind,"title")}></input>
                            <label>Title</label>
                        </div>
                        <div className='inputPlaceholderContainer'>
                            <textarea placeholder=' ' value={val.content?val.content:''} onChange={ev=>chgProductTblDetailsInput(ev,ind,"content")}></textarea>
                            <label>Content</label>
                        </div>
                    </div>
        }));
    },[productTblDetails]);

    useEffect(()=>{
        setProductImgElement(productImg.map((val,ind)=>{
            return <div key={ind} className='divProductImgContainer'>
                        <FontAwesomeIcon icon={faXmark} onClick={()=>{rmvProductImgRow(ind)}}/>
                        <img src={val.data}></img>
                    </div>
        }));
    },[productImg]);

    $(()=>{
        $("#selProductsCategory").select2({
            ajax:{
                url: "/manageProducts/getProductsCategories",
                processResults: (data)=>{
                    return data;
                }
            },
            placeholder: true,
            dropdownParent: $("#selProductsCategory").closest(".sel2PlaceholderContainer")
        });

        $("#selProductsSubcategory").select2({
            ajax:{
                url: "/manageProducts/getProductsSubcategories",
                processResults: (data)=>{
                    return data;
                }
            },
            allowClear: true,
            placeholder: true,
            dropdownParent: $("#selProductsSubcategory").closest(".sel2PlaceholderContainer")
        })
    })

    function createNewProduct()
    {
        $.ajax({
            url: "/manageProducts/createNewProduct",
            type: "post",
            headers: { "X-CSRF-TOKEN": _token },
            data: {
                productName: $("#inCreateProductName").val(),
                categoryId: $("#selProductsCategory").val(),
                categoryName: $("#selProductsCategory option:checked").text(),
                subcategoryId: $("#selProductsSubcategory").val(),
                subcategoryName: $("#selProductsSubcategory option:checked").text(),
                price: $("#inCreateProductPrice").val(),
                stockCount: $("#inCreateProductStock").val(),
                status: $("#inCreateProductStatus").is(":checked"),
                colorVar:  rmvEmptyInputData(colorVar,true),
                productDetails: rmvEmptyInputData(productDetails),
                productTblDetails: rmvEmptyInputData(productTblDetails),
                productImg: productImg

            },
            success:()=>{
                window.location.reload();
            }
        })
    }
    
    function addNewProductDetailsRow()
    {
        setProductDetails(productDetails.concat([{title:"",content:""}]));
    }

    function rmvProductDetailsRow(rowToRmv)
    {
        setProductDetails(productDetails.filter((val,ind)=>{
            return ind !== rowToRmv;
        }));
    }

    function chgProductDetailsInput(ev,rowIndToChg,inputType)
    {
        setProductDetails(productDetails.map((val,ind)=>{
            if(ind === rowIndToChg)
            {
                val[inputType] = ev.target.value;
                return val;
            }
            else
            {
                return val;
            }
        }))
    }

    function addNewProductTblDetailsRow()
    {
        setProductTblDetails(productTblDetails.concat([{title:"",content:""}]));
    }

    
    function rmvProductTblDetailsRow(rowToRmv)
    {
        setProductTblDetails(productTblDetails.filter((val,ind)=>{
            return ind !== rowToRmv;
        }));
    }

    function chgProductTblDetailsInput(ev,rowIndToChg,inputType)
    {
        setProductTblDetails(productTblDetails.map((val,ind)=>{
            if(ind === rowIndToChg)
            {
                val[inputType] = ev.target.value;
                return val;
            }
            else
            {
                return val;
            }
        }))
    }

    function addNewColorVarRow()
    {
        setColorVar(colorVar.concat([{colorName:"",color:"#000000"}]));
    }

    
    function rmvColorVarRow(rowToRmv)
    {
        setColorVar(colorVar.filter((val,ind)=>{
            return ind !== rowToRmv;
        }));
    }

    function chgColorVarInput(ev,rowIndToChg,inputType)
    {
        setColorVar(colorVar.map((val,ind)=>{
            if(ind === rowIndToChg)
            {
                val[inputType] = ev.target.value;
                return val;
            }
            else
            {
                return val;
            }
        }))
    }

    async function chgProductImg(ev)
    {
        setProductImg(productImg.concat(await Promise.all(Array.from(ev.target.files).map(async (val,ind)=>{
            let productImg = await convertFileToBase64(val)
            return {data: productImg,fileType: val.type.split("/").at(-1),isExist: false};
        }))));

    }

    function rmvProductImgRow(rowToRmv)
    {
        setProductImg(productImg.filter((val,ind)=>{
            return ind !== rowToRmv;
        }));
    }
    
    function convertFileToBase64(file,fo) {
        return new Promise((resolve,reject)=>{
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        })
        
    }

    function rmvEmptyInputData(arrInput,allInputRequred = false)
    {
        return arrInput.filter((val,ind)=>{
            let toInclude = allInputRequred;
            for(let [key,val] of Object.entries(val))
            {
                if(!allInputRequred && val)
                {
                    toInclude = true;
                    break;
                }
                else if(allInputRequred && !val)
                {
                    toInclude = false;
                    break;
                }
            }
            return toInclude;
        })
    }

    function updatePrd()
    {
        $.ajax({
            url: "/manageProducts/updatePrd",
            type: "post",
            headers: { "X-CSRF-TOKEN": _token },
            data: {
                productId: prdDetails.id,
                productName: $("#inCreateProductName").val(),
                categoryId: $("#selProductsCategory").val(),
                categoryName: $("#selProductsCategory option:checked").text(),
                subcategoryId: $("#selProductsSubcategory").val(),
                subcategoryName: $("#selProductsSubcategory option:checked").text(),
                price: $("#inCreateProductPrice").val(),
                stockCount: $("#inCreateProductStock").val(),
                status: $("#inCreateProductStatus").is(":checked"),
                colorVar:  rmvEmptyInputData(colorVar,true),
                productDetails: rmvEmptyInputData(productDetails),
                productTblDetails: rmvEmptyInputData(productTblDetails),
                productImg: productImg

            },
            success:()=>{
                window.location.reload();
            }
        })
    }

    return (
        <>
            <div id="mdlCRUDProducts" className="modal fade" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered  modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{prdDetails?"Edit Product":"Create Product"}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='inputPlaceholderContainer'>
                                <input id="inCreateProductName" className='form-control' placeholder=' '></input>
                                <label>Product name</label>
                            </div>
                            <div className='sel2PlaceholderContainer'>
                                <select id="selProductsCategory"></select>
                                <label>Product category</label>
                            </div>
                            <div className='sel2PlaceholderContainer'>
                                <select id="selProductsSubcategory"></select>
                                <label>Product subcategory (optional)</label>
                            </div>
                            <div className='inputPlaceholderContainer'>
                                <input id="inCreateProductPrice" className='form-control' placeholder=' '></input>
                                <label>Price (RM)</label>
                            </div>
                            <div className='inputPlaceholderContainer'>
                                <input id="inCreateProductStock" className='form-control' placeholder=' '></input>
                                <label>Stock count</label>
                            </div>
                            <div className='divColorVarContainer divInputSectionContainer'>
                                <label>Color variation</label>
                                {colorVarElement}
                                <button onClick={addNewColorVarRow} className='btnTransparent'>+ Add</button>
                            </div>
                            <div className='divInputSectionContainer'>
                                <label>Product Details</label>
                                {productDetailsElement}
                                <button onClick={addNewProductDetailsRow} className='btnTransparent'>+ Add</button>
                            </div>
                            <div className='divInputSectionContainer'>
                                <label> Product Table Details</label>
                                {productTblDetailsElement}
                                <button onClick={addNewProductTblDetailsRow} className='btnTransparent'>+ Add</button>
                            </div>
                            <div className='divInputSectionContainer'>
                                <label>Product Image</label>
                                <div className='divProductImgUploadImgContainer'>
                                    {productImgElement}
                                    <div onClick={()=>{$("#inProductImgUpload").click()}}>
                                        <FontAwesomeIcon icon={faPlus}/>
                                        <input id="inProductImgUpload" type='file' accept='image/*' multiple onChange={chgProductImg}  hidden></input>
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex align-items-center'>
                                <label className='me-2'>Status</label>
                                <label className='cbxOnOff'>
                                    <input id="inCreateProductStatus" type='checkbox'></input>
                                </label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {prdDetails && (<button type="button" className='btn btn-danger' data-bs-toggle="modal" data-bs-target="#mdlDelPrd" onClick={()=>{ setDelMdlData({prdId: prdDetails.id,prdName: prdDetails.product_name}) }}>Delete</button>)}
                            {(prdDetails?<button type="button" className="btn btnPrimary" onClick={updatePrd}>Update</button>:<button type="button" className="btn btnPrimary" onClick={createNewProduct}>Create</button>)}
                        </div>
                    </div>
                </div>
            </div>
            <MdlDelPrd {...delPrdMdlData}/>
        </>
    );
}

if (document.getElementById('mdlCRUDProducts')) {
    ReactDOM.render(<MdlCRUDProducts/>, document.getElementById('mdlCRUDProducts'));
}