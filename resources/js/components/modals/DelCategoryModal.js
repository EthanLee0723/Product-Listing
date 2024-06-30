import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';


export default function MdlDelCategories({isCategory,categoryId,categoryToDelName}) {
    const titleName = isCategory?"Category":"Subcategory"
    const [btnDelStatus,setBtnDelStatus] = useState(true);
    return (
        <div id="mdlDelCategories" className="modal fade" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Delete {titleName}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <label className='mb-3'>
                        Once you remove this {titleName.toLocaleLowerCase()} all products and everything associated with {titleName.toLocaleLowerCase()} "{categoryToDelName}" will also be remove permanently.
                        <br></br>
                        <br></br>
                        Please type in "{categoryToDelName}" and click on the delete button to proceed.
                    </label>
                    <div className='inputPlaceholderContainer'>
                        <input id="inCategoryName" onChange={checkForMatchingName} className='form-control' placeholder=' '></input>
                        <label>{titleName} name:</label>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-danger" disabled={btnDelStatus} onClick={()=>{isCategory?delCategory():delSubcategory()}}>Delete</button>
                </div>
                </div>
            </div>
        </div>
    );

    function checkForMatchingName(ev)
    {
        setBtnDelStatus($(ev.currentTarget).val() !== categoryToDelName);
    }

    function delCategory()
    {
        $.ajax({
            url: "manageCategories/delCategory",
            type: "post",
            headers: { "X-CSRF-TOKEN": _token },
            data: {
                categoryId: categoryId
            },
            success:()=>{
                window.location.reload();
            }

        })
    }

    function delSubcategory()
    {
        $.ajax({
            url: "manageCategories/delSubcategory",
            type: "post",
            headers: { "X-CSRF-TOKEN": _token },
            data: {
                subcategoryId: categoryId
            },
            success:()=>{
                window.location.reload();
            }

        })
    }
}


if(document.getElementById("mdlDelCategories"))
{
    ReactDOM.render(<MdlDelCategories {...data}/>, document.getElementById('mdlDelCategories'));
}