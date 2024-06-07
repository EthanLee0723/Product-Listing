import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';


export default function MdlAddCategories({isCategory,categoryId = null,categoryName = null}) {
    const titleName = isCategory?"Category":"Subcategory"
    return (
        <div id="mdlAddCategories" className="modal fade" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Add {titleName}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className='inputPlaceholderContainer'>
                        <input id="inCategoryName" className='form-control' placeholder=' '></input>
                        <label>{titleName} name:</label>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btnPrimary" onClick={()=>{isCategory?createNewCategory():createNewSubcategory()}}>Create</button>
                </div>
                </div>
            </div>
        </div>
    );

    function createNewCategory()
    {
        $.ajax({
            url: "/manageCategories/createCategory",
            type: "post",
            headers: { 'X-CSRF-TOKEN':_token },
            data: {
                categoryName: $("#inCategoryName").val()
            },
            success:()=>{
                window.location.reload();
            }
        })
    }

    function createNewSubcategory()
    {
        $.ajax({
            url: "/manageCategories/createSubcategory",
            type: "post",
            headers: { 'X-CSRF-TOKEN':_token },
            data: {
                categoryId: categoryId,
                categoryName: categoryName,
                subcategoryName: $("#inCategoryName").val()
            },
            success:()=>{
                window.location.reload();
            }
        })
    }
}


if(document.getElementById("mdlAddCategories"))
{
    ReactDOM.render(<MdlAddCategories {...data}/>, document.getElementById('mdlAddCategories'));
}