import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import MainNavbar from './MainNavbar';
import MainFooter from './MainFooter';

export default function ProductsDetailsPage() {
    const prdDescriptionElement = JSON.parse(prdDetails.product_details).map((val,ind)=>{
        const arrContents = val.content.split(/(?:\r\n|\r|\n)/g)
        return <div key={ind}>
            <strong>{val.title}</strong>
            <div>
                {arrContents.map((line, index) => (
                    <React.Fragment key={index}>
                        {line}
                        {index !== arrContents.length - 1 && <br />}
                    </React.Fragment>
                ))}
            </div>
        </div>
    })

    const prdTblDetailsElement = JSON.parse(prdDetails.product_table_details).map((val,ind)=>{
        return <div key={ind}>
            <div>{val.title}</div>
            <div>{val.content}</div>
        </div>
    })

    return (
        <>
            <MainNavbar/>
            <div className='pageContainer'>
                <div className='divPrdDetailsContainer'>
                    <div>
                        <div className='divSearchBar'>
                            <input className='form-control' placeholder='Search...'></input>
                            <button className='btn btnPrimary'>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </div>
                        <div>
                            
                        </div>
                        <div>

                        </div>
                    </div>
                    <div>

                    </div>
                </div>
                <div className='divPrdDescription'>
                    <div>
                        {prdDescriptionElement}
                    </div>
                </div>
                <div className='divPrdTblDetails'>
                    <div>
                        {prdTblDetailsElement}
                    </div>
                </div>
            </div>
            <MainFooter/>
        </>);
}

if (document.getElementById('productsDetailsPage')) {
    ReactDOM.render(<ProductsDetailsPage />, document.getElementById('productsDetailsPage'));
}