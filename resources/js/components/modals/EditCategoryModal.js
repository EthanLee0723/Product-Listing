import React from 'react';
import ReactDOM from 'react-dom';


export default function MdlEditCategories({isCategory,categoryId,categoryName}) {
    const titleName = isCategory?"Category":"Subcategory"
    return (
        <div id="mdlEditCategories" className="modal fade" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Edit {titleName}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <label className='mb-3'>Change {titleName} "{categoryName}" to:</label>
                    <div className='inputPlaceholderContainer'>
                        <input id="inEditCategoryName" className='form-control' placeholder=' '></input>
                        <label>{titleName} name:</label>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btnPrimary" onClick={()=>{isCategory?editCategory():editSubcategory()}}>Update</button>
                </div>
                </div>
            </div>
        </div>
    );

    function editCategory()
    {
        $.ajax({
            url: "/manageCategories/editCategory",
            type: "post",
            headers: { 'X-CSRF-TOKEN':_token },
            data: {
                categoryId: categoryId,
                categoryName: $("#inEditCategoryName").val()
            },
            success:()=>{
                window.location.reload();
            }
        })
    }

    function editSubcategory()
    {
        $.ajax({
            url: "/manageCategories/editSubcategory",
            type: "post",
            headers: { 'X-CSRF-TOKEN':_token },
            data: {
                subcategoryId: categoryId,
                subcategoryName: $("#inEditCategoryName").val()
            },
            success:()=>{
                window.location.reload();
            }
        })
    }
}


if(document.getElementById("mdlEditCategories"))
{
    ReactDOM.render(<MdlEditCategories {...data}/>, document.getElementById('mdlEditCategories'));
}