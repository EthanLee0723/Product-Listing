import React from 'react';
import ReactDOM from 'react-dom';

export default function CategoriesModal() {
    return (
        <div id="mdlCategories" className="modal fade" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Categories</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <select className='select2'>
                        <option>sdfdf</option>
                        <option value="sdf">sdfsdf</option>
                        <option value="sdf">sdfsdf</option>
                        <option value="sdf">sdfsdf</option>
                    </select>
                    <select className='select2'>
                        <option></option>
                    </select>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btnPrimary">Save changes</button>
                </div>
                </div>
            </div>
        </div>
    );
}

if (document.getElementById('categoriesModal')) {
    ReactDOM.render(<CategoriesModal />, document.getElementById('categoriesModal'));
}