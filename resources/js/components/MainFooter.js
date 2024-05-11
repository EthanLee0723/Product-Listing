import React from 'react';
import ReactDOM from 'react-dom';

export default function MainFooter() {
    return(
        <footer>
            <label>Copyright © 2020 GTY Solutions - All Rights Reserved.</label>
        </footer>
    )
}

if (document.getElementById('mainFooter')) {
    ReactDOM.render(<MainFooter />, document.getElementById('mainFooter'));
}