import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../../css/main.css';


function MainLayout() {
    return (
        <>
            <nav id="navMainNavBar" className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <label>GTY Solutions</label>
                    <div className="collapse navbar-collapse" id="mainNavBar">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Shop</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link">FAQ</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link btn">Contact</a>
                            </li>
                            {/* <li className="nav-item d-flex align-items-center">
                                <a className="">
                                    <svg width="20" height="20" className="search-icon" role="img" viewBox="2 9 20 5" focusable="false" aria-label="Search">
                                        <path className="search-icon-path" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                                    </svg>
                                </a>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </nav>
            <div id="divItemDetailsContainer">
                <div className='row'>
                    {/* <div className='col'>
                        Image
                    </div> */}
                    {/* <div className='col'>
                        <h1>
                            Testing product
                        </h1>
                    </div> */}
                </div>
                <table className='table table-bordered'>
                    <tbody>
                        <tr>
                            <th>Product code</th>
                            <td>Demo</td>
                        </tr>
                        <tr>
                            <th>Packing Detail</th>
                            <td>Demo</td>
                        </tr>
                        <tr>
                            <th>Dimension (mm)</th>
                            <td>100(H) x 85(D)</td>
                        </tr>
                        <tr>
                            <th>Weight per Unit(g)</th>
                            <td>100</td>
                        </tr>
                        <tr>
                            <th>Units per Inner Box</th>
                            <td>100</td>
                        </tr>
                        <tr>
                            <th>Weight per Carton (kg)</th>
                            <td>100</td>
                        </tr>
                        <tr>
                            <th>Units per Carton</th>
                            <td>100</td>
                        </tr>
                        <tr>
                            <th>Carton Size (mm)</th>
                            <td>100</td>
                        </tr>
                        <tr>
                            <th>Print Type</th>
                            <td>Demo</td>
                        </tr>
                        <tr>
                            <th>Print Area</th>
                            <td>Demo</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <footer>
                <h6>Copyright 2024 © GTY | Brand Of The Day</h6>
            </footer>
        </>
    );
}

export default MainLayout;

if (document.getElementById('mainLayout')) {
    ReactDOM.render(<MainLayout />, document.getElementById('mainLayout'));
}
