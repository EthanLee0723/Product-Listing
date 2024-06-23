import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import AdminSidebar from './adminSidebar';
import MdlCRUDProducts from './modals/CRUDProductsModal.js';
import 'bootstrap-table';
import '../../library/bootstrap-table-theme/bootstrap-table.min.css';
import '../../library/bootstrap-table-theme/bootstrap-table.min.js';

export default function ManageProducts() {
    const [crudMdlData,setCRUDMdlData] = useState();
    $(()=>{
        if(!$("#divManageProductsContainer > .bootstrap-table").length)
        {
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
                    formatter: (val,row,ind) =>
                    {
                        return `<label class='cbxOnOff'><input data-row-ind=${ind} class="cbxPrdStatus" type='checkbox'${val === "active"?" checked":""}></label>`
                    }
                },
                {
                    field: "createdAt",
                    title: "Created date",
                },
                {
                    title: "Actions",
                    align: "center",
                    formatter: (val,row,ind,field) =>
                    {
                        return '<i class="fas fa-edit" data-bs-toggle="modal" data-bs-target="#mdlCRUDProducts" data-row-ind="'+ind+'"></i>'
                    }
                }]
            });   
        }

        if(!$("#btnCreateNewProduct").length)
        {
            $(".bootstrap-table .fixed-table-toolbar").prepend("<button class='btn btnPrimary' data-bs-toggle='modal' data-bs-target='#mdlCRUDProducts' id='btnCreateNewProduct'>+ New</button>")
        }

        $("#tblManageProducts").bootstrapTable('hideLoading')
    })

    $(document).on("change","#tblManageProducts tbody tr td .cbxPrdStatus",(ev)=>{
        $.ajax({
            url: "/manageProducts/prdStatusChg",
            type: "post",
            headers: { 'X-CSRF-TOKEN': _token },
            data: { prdId: $("#tblManageProducts").bootstrapTable('getData')[$(ev.currentTarget).data('row-ind')] }

        })
    })

    $(document).on("click","#btnCreateNewProduct",(ev)=>{
        setCRUDMdlData();
    })


    $(document).on("click","#tblManageProducts tbody tr td svg",(ev)=>{
        setCRUDMdlData($("#tblManageProducts").bootstrapTable('getData')[$(ev.currentTarget).data('row-ind')]);
    })

    return (
        <>
            <div id="divManageProductsPageContainer">
                <div id="divManageProductsContainer">
                    <table id="tblManageProducts"></table>
                </div>
            </div>
            <AdminSidebar />
            <MdlCRUDProducts prdDetails={crudMdlData}/>
        </>
    );
}

if (document.getElementById('manageProducts')) {
    ReactDOM.render(<ManageProducts/>, document.getElementById('manageProducts'));
}