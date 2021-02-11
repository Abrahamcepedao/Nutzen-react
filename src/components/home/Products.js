import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row } from 'react-bootstrap';
import ProductImage from './products/ProductImage';
import ProductInfo from './products/ProductInfo';

const useStyles = makeStyles((theme) =>({
    
}));


function Products({classes}) {
    classes = useStyles();

    return (
        <div className={classes.backgroundContainer}>
            <h1>Products</h1>
            <Row>
                <Col md={6}>
                    <ProductImage/>
                </Col>
                <Col md={6}>
                    <ProductInfo/>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <ProductInfo/>
                </Col>
                <Col md={6}>
                    <ProductImage/>
                </Col>
            </Row>
            
        </div>
    )
}

export default Products;
//expandir mis conocimientos de React y conexiones con bases de datos, así como aprender acerca de las administraciones de r