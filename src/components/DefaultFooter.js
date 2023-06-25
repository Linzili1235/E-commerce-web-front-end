import React from 'react';
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import './DefaultFooter.scss';

const DefaultFooter = () => {
    return (
        <section className='footer'>
            <div className="footer_bg">
                <div className="footer_container">
                    <div className="footerItem">
                        <a href="" className="footer_title">My Account</a>
                        <ul className="footerList">
                            <li className="accountItem"><a href="#">Membership Program</a></li>
                            <li className="accountItem"><a href="#">Sign In</a></li>
                            <li className="accountItem"><a href="#">Register</a></li>
                            <li className="accountItem"><a href="#">Order Status</a></li>
                            <li className="accountItem"><a href="#">Returns</a></li>
                        </ul>
                    </div>
                    <div className="footerItem">
                        <a href=""className="footer_title">Help</a>
                        <ul className="footerList">
                            <li className="helpItem"><a href="#">COVID-19 FAQ</a></li>
                            <li className="helpItem"><a href="#">Services</a></li>
                            <li className="helpItem"><a href="#">Ordering</a></li>
                            <li className="helpItem"><a href="#">Shipping Policy</a></li>
                            <li className="helpItem"><a href="#">Returns</a></li>
                            <li className="helpItem"><a href="#">Redeem Gift Cards</a></li>
                            <li className="helpItem"><a href="#">Sizing</a></li>
                            <li className="helpItem"><a href="#">Our Products</a></li>
                        </ul>
                    </div>
                    <div className="footerItem">
                        <a href=""className="footer_title">About Us</a>
                        <ul className="footerList">
                            <li className="aboutUsItem"><a href="#">Our Business</a></li>
                            <li className="aboutUsItem"><a href="#">Media</a></li>
                            <li className="aboutUsItem"><a href="#">Investors</a></li>
                            <li className="aboutUsItem"><a href="#">Strategic Sales</a></li>
                            <li className="aboutUsItem"><a href="#">Affiliates and Creators</a></li>
                            <li className="aboutUsItem"><a href="#">Sweat Collective</a></li>
                        </ul>
                    </div>
                    <div className="footerItem">
                        <a href=""className="footer_title">Contact Us</a>
                        <ul className="footerList">
                            <li className="contactUsItem"><a href="">Live Chat</a></li>
                            <li className="contactUsItem"><a href="">Email Sign Up</a></li>
                            <li className="contactUsItem"><a href="">Contact Us</a></li>
                        </ul>
                    </div>
                    <div className="footerItem">
                        <ul className="footerList">
                            <li className="otherItem"><a href="">Careers</a></li>
                            <li className="otherItem"><a href="">Community</a></li>
                            <li className="otherItem"><a href="">Lululemon Studio</a></li>
                            <li className="otherItem"><a href="">Like New</a></li>
                            <li className="otherItem"><a href="">Sustainability</a></li>
                            <li className="otherItem"><a href="">Social Impact</a></li>
                            <li className="otherItem"><a href="">Diversity And Inclusion</a></li>
                            <li className="otherItem"><a href="">Lululemon Apps</a></li>
                            <li className="otherItem"><a href="">Sitemap</a></li>
                        </ul>
                    </div>
                    <div className="footerItem">
                        <ul className="footerList">
                            <li className="legacyItem"><a href=""className="bold gift">Gift Cards</a></li>
                            <li className="legacyItem"><a href=""className="bold storeLocator">Store Locator</a></li>
                            <li className="legacyItem"><a href="">Privacy Policy (Last Updated: 1/23/23)</a></li>
                            <li className="legacyItem"><a href="">Your Privacy Choices</a></li>
                            <li className="legacyItem"><a href="">California Privacy Rights (Last Updated: 1/23/23)</a></li>
                            <li className="legacyItem"><a href="">California Transparency Act</a></li>
                            <li className="legacyItem"><a href="">Accessibility Statement</a></li>
                        </ul>
                    </div>

                    <div className="footerItem">
                        <ul className="socialMedia_list">
                            <li className="socialMedia_item"><a className="socialIcon"><TwitterIcon/></a></li>
                            <li className="socialMedia_item"><a className="socialIcon"><PinterestIcon/></a></li>
                            <li className="socialMedia_item"><a className="socialIcon"><YouTubeIcon/></a></li>
                            <li className="socialMedia_item"><a className="socialIcon"><FacebookIcon/></a></li>
                            <li className="socialMedia_item"><a href="" className="socialIcon"><InstagramIcon/></a></li>
                        </ul>




                        {/*<div></div>*/}
                        {/*    <li><TwitterIcon/></li>*/}
                        {/*    <li><PinterestIcon/></li>*/}
                        {/*</ul>*/}

                    </div>


                </div></div>
        </section>
    );
};

export default DefaultFooter;