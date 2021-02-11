import React from 'react';
import Landing from './Landing';
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
        </>
    )
}
