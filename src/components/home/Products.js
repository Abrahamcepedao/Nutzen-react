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
        padding: '50px',
        margin: 'auto',
        marginBottom: '50px',
        marginTop: '50px',
        borderRadius: '25px',
        maxWidth: '1200px'
    }
}));

const benefits = [
    ["benefit1", "benefit2", "benefit3"],
    ["benefit1", "benefit2", "benefit3"],
    ["benefit1", "benefit2", "benefit3"]
]

function Products({classes}) {
    classes = useStyles();

    return (
        <div className={classes.backgroundContainer} id={"productos"}>
            <h1 className={classes.title}>Products</h1>
            <Row className={classes.productRow} style={{backgroundImage: 'linear-gradient(to top, #ff0844 0%, #ffb199 100%)'}}>
                <Col md={6}>
                    <ProductImage type="natural"/>
                </Col>
                <Col md={6}>
                    <ProductInfo phrase="¡Crema de cacahuate natural perfecta para deportistas que buscan mantener una vida sana!" type="Natural" position="right" benefits={benefits[0]}/>
                </Col>
            </Row>
            <Row className={classes.productRow} style={{backgroundImage: 'linear-gradient(to top, #c79081 0%, #dfa579 100%)'}}>
                <Col md={6}>
                    <ProductInfo phrase="¡Crema de cacahuate natural perfecta para deportistas que buscan mantener una vida sana!" type="Matcha" position="left" benefits={benefits[1]}/>
                </Col>
                <Col md={6}>
                    <ProductImage type="matcha"/>
                </Col>
            </Row>
            <Row className={classes.productRow} style={{backgroundImage: 'linear-gradient(to top, #0ba360 0%, #3cba92 100%)'}}>
                <Col md={6}>
                    <ProductImage type="azucar"/>
                </Col>
                <Col md={6}>
                    <ProductInfo phrase="¡Crema de cacahuate natural perfecta para deportistas que buscan mantener una vida sana!" type="Azúcar" position="right" benefits={benefits[2]}/>
                </Col>
            </Row>
        </div>
    )
}

export default Products;
//expandir mis conocimientos de React y conexiones con bases de datos, así como aprender acerca de las administraciones de r