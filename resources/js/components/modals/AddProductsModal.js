import React from 'react';
import ReactDOM from 'react-dom';
import '../../../library/select2-4.1.0-rc.0/dist/css/select2.min.css';
import '../../../library/select2-4.1.0-rc.0/dist/js/select2.min.js';

export default function MdlAddProducts() {
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
        console.log( $("#selProductsCategory option:checked").text());
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
                status: $("#inCreateProductStatus").is(":checked")
            },
            success:()=>{
                window.location.reload();
            }
        })
    }

    return (
        <div id="mdlAddProducts" className="modal fade" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Create Product</h5>
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
                        {/* <div>
                            <label>Product image</label>
                        </div>
                        <div>
                            <label>Color variation</label>
                            <button>+ Add</button>
                        </div>
                        <div>
                            <label>Product details</label>
                            <button>+ Add</button>
                        </div>
                        <div>
                            <label>Product table details</label>
                            <button>+ Add</button>
                        </div> */}
                        <div className='d-flex align-items-center'>
                            <label className='me-2'>Status</label>
                            <label className='cbxOnOff'>
                                <input id="inCreateProductStatus" type='checkbox'></input>
                            </label>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btnPrimary" onClick={createNewProduct}>Create</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

if (document.getElementById('mdlAddProducts')) {
    ReactDOM.render(<MdlAddProducts/>, document.getElementById('mdlAddProducts'));
}