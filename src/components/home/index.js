import React from 'react';
import Landing from './Landing';
import Footer from './others/Footer';
import GoBack from './others/GoBack';
import Phrase from './Phrase';
import Products from './Products';
import Stores from './Stores';

export default function index() {
    return (
        <>
            <Landing/>
            <Products/>
            <Phrase/>
            <Stores/>
            <Footer/>
            <GoBack/>
        </>
    )
}
