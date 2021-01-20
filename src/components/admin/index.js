import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link, Redirect } from "react-router-dom";
import { useDataLayerValue } from "../../ContextAPI/DataLayer";

function Index() {
    const [{user}] = useDataLayerValue();

    return (
        <div>
            {user ? (
                <div>
                    <h1>Bienvenida mamita bonita</h1>
                    <Row>
                        <Link to="/admin/recetas">
                            <Col sm={6} xl={3}>
                                <div>
                                    <h3>Recetas</h3>
                                </div>
                            </Col>
                        </Link>
                        <Link to="/admin/blog">
                            <Col sm={6} xl={3}>
                                <div>
                                    <h3>Blog</h3>
                                </div>
                            </Col>
                        </Link>
                        <Link to="/admin/tiendas">
                            <Col sm={6} xl={3}>
                                <div>
                                    <h3>Tiendas</h3>
                                </div>
                            </Col>
                        </Link>
                        <Link to="/admin/frase">
                            <Col sm={6} xl={3}>
                                <div>
                                    <h3>Frase</h3>
                                </div>
                            </Col>
                        </Link>
                    </Row>
                </div>

            ) : (
                <Redirect to="/login"/>
            )}
        </div>
    )
}

export default Index
