import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Navigation from './Navigation';
const Layout = ({ children }) => {
    return (
    <React.Fragment>
        <Header />
        <div className="navigationWrapper">
            <Navigation />
            <main>{children}</main>
        </div>
        <Footer />
    </React.Fragment>
    );
};
export default Layout;