import React from 'react';
import './SimpleFooter.scss';

const SimpleFooter = () => {
    return (
        <section className='simpleFooter-container'>
            <div className="simpleFooter">
                <div className="footer-list">
                    <ul>
                        <li><a href="">Contact Us</a></li>
                        <li><a href="">Live Chat</a></li>
                        <li><a href="">1.877.263.9300</a></li>
                    </ul>
                </div>
                <hr/>
                <div className="footer-list light">
                    <ul>
                        <li><a href="">Shipping Policy</a></li>
                        <li><a href="">Privacy Policy</a></li>
                        <li><a href="">Term of Use</a></li>
                        <li><a href="">Accessibility Statement</a></li>
                        <li><a href="">© lululemon athletica 1818 Cornwall Ave, Vancouver BC V6J 1C7</a></li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default SimpleFooter;