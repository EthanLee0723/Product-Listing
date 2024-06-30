import React from "react";
import ReactDOM from 'react-dom';

export default function MdlDelPrd({prdId,prdName}){
    function delPrd()
    {
        $.ajax({
            url: "/manageProducts/delPrd",
            type: "post",
            headers: { "X-CSRF-TOKEN": _token },
            data: {
                productId: prdId
            },
            success:()=>{
                window.location.reload();
            }
        })
    }

    return (
        <div id="mdlDelPrd" className="modal fade" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Delete Product</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <label className='mb-3'>
                            Are you sure you want to permanently remove product "{prdName}"?
                        </label>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-danger" onClick={delPrd}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

if(document.getElementById("mdlDelPrd"))
{
    ReactDOM.render(<MdlDelPrd />, document.getElementById('mdlDelPrd'));
}