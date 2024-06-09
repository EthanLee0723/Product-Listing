import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import AdminSidebar from './adminSidebar';
import MdlAddProducts from './modals/AddProductsModal.js';
import 'bootstrap-table';
import '../../library/bootstrap-table-theme/bootstrap-table.min.css';
import '../../library/bootstrap-table-theme/bootstrap-table.min.js';

export default function ManageProducts() {

    $(()=>{
        $("#tblManageProducts").bootstrapTable({
            search: true,
            url: "/manageProducts/getAllProducts",
            columns: [{
                field: "product_name",
                title: "Product name",
            },
            {
                field: "category_name",
                title: "Product cateogry",
            },
            {
                field: "subcategory_name",
                title: "Product subcategory",
            },
            {
                field: "status",
                title: "Status",
            },
            {
                field: "created_at",
                title: "Created date",
            },
            {
                title: "Actions",
            }]
        });

        $(".bootstrap-table .fixed-table-toolbar").prepend("<button class='btn btnPrimary' data-bs-toggle='modal' data-bs-target='#mdlAddProducts' id='btnCreateNewProduct'>+ New</button>")

        $("#tblManageProducts").bootstrapTable('hideLoading')
    })

    return (
        <>
            <div id="divManageProductsPageContainer">
                <div id="divManageProductsContainer">
                    <table id="tblManageProducts">
                        
                    </table>
                </div>
            </div>
            <AdminSidebar />
            <MdlAddProducts />
        </>
    );
}

if (document.getElementById('manageProducts')) {
    ReactDOM.render(<ManageProducts/>, document.getElementById('manageProducts'));
}