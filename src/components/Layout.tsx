import React from 'react'
import NavBar from './NavBar';
import Wrapper, { WrapperVariant } from './wrapper';


interface LayoutProps {
    variant?: WrapperVariant
}

const Layout: React.FC<LayoutProps> = ({
    children, variant
}) => {
    return (
        <><NavBar /><Wrapper variant={variant}>

            {children}
        </Wrapper></>);
}
export default Layout;