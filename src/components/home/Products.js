import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row } from 'react-bootstrap';
import ProductImage from './products/ProductImage';
import ProductInfo from './products/ProductInfo';

const useStyles = makeStyles((theme) =>({
    backgroundContainer: {
        padding: '50px'
    },
    title: {
        textAlign: 'center'
    },
    productRow: {
        padding: '50px'
    }
}));


function Products({classes}) {
    classes = useStyles();

    return (
        <div className={classes.backgroundContainer}>
            <h1 className={classes.title}>Products</h1>
            <Row className={classes.productRow}>
                <Col md={6}>
                    <ProductImage type="natural"/>
                </Col>
                <Col md={6}>
                    <ProductInfo/>
                </Col>
            </Row>
            <Row className={classes.productRow}>
                <Col md={6}>
                    <ProductInfo/>
                </Col>
                <Col md={6}>
                    <ProductImage type="matcha"/>
                </Col>
            </Row>
            <Row className={classes.productRow}>
                <Col md={6}>
                    <ProductImage type="azucar"/>
                </Col>
                <Col md={6}>
                    <ProductInfo/>
                </Col>
            </Row>
        </div>
    )
}

export default Products;
//expandir mis conocimientos de React y conexiones con bases de datos, así como aprender acerca de las administraciones de r