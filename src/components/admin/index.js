import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Link, Redirect } from "react-router-dom";
import { useDataLayerValue } from "../../ContextAPI/DataLayer";
import { PRIMARY, TEXT_COLOR } from "../../resources/Colors";
import { Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
/* import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'; */
import StorefrontIcon from '@material-ui/icons/Storefront';
import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles((theme) => ({
    backgroundContainer: {
        backgroundColor: PRIMARY,
        position: 'relative',
        width: '100vw',
        maxWidth: '100vw',
        minHeight: '100vh',
        padding: '50px 20px',
        textAlign: 'center',
    },
    itemsContainer: {
        width: '100%',
        maxWidth: '1000px',
        margin: 'auto',
    },
    itemLink: {
      color: 'white',
      '&:hover': {
        color: 'white',
        textDecoration: 'none'
      }
    },
    item: {
      backgroundImage: "url(./img/admin/recetas.png)",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: '300px',
      maxWidth: '100%',
      height: '400px',
      margin: 'auto',
      marginBottom: '40px',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'transform 450ms',
      '&:hover': {
        transform:'scale(1.06)'
      }
    },
    itemOverlay: {
      width: '100%',
      height: '100%',
      backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1))',
      borderRadius: '12px'
    },
    itemWrapper: {
      position: 'relative',
      top: '350px',
      width: '100%',
      maxWidth: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: '10px',
    },
    itemIcon: {
      position: 'relative',
      right: '10px'
    }
}));

function Index({classes}) {
    const [{user}] = useDataLayerValue();
    classes = useStyles();

    return (
        <div>
            {user ? (
                <div className={classes.backgroundContainer}>
                    <h1 style={{marginBottom: '100px', fontWeight: 'bold', color: TEXT_COLOR}}>Bienvenida mamita bonita</h1>
                    <Row className={classes.itemsContainer}>
                        <Col sm={6} xl={4}>
                          <Link to="/admin/recetas" className={classes.itemLink}>
                              <div className={classes.item}>
                                <div className={classes.itemOverlay}>
                                  <div className={classes.itemWrapper}>
                                    <h3>Recetas</h3>
                                    <RestaurantMenuIcon className={classes.itemIcon}/>
                                  </div>
                                </div>
                              </div>
                            </Link>
                        </Col>
                        {/* <Col sm={6} xl={3}>
                          <Link to="/admin/blog" className={classes.itemLink}>
                              <div className={classes.item}>
                                   <div className={classes.itemOverlay}>
                                  <div className={classes.itemWrapper}>
                                    <h3>Blog</h3>
                                    <LibraryBooksIcon className={classes.itemIcon}/>
                                  </div>
                                </div>
                              </div>
                            </Link>
                        </Col> */}
                        <Col sm={6} xl={4}>
                          <Link to="/admin/tiendas" className={classes.itemLink}>
                              <div className={classes.item} style={{backgroundImage: 'url(./img/admin/store.png)'}}>
                                   <div className={classes.itemOverlay}>
                                    <div className={classes.itemWrapper}>
                                      <h3>Tienda</h3>
                                      <StorefrontIcon className={classes.itemIcon}/>
                                    </div>
                                </div>
                              </div>
                            </Link>
                        </Col>
                        <Col sm={6} xl={4}>
                          <Link to="/admin/frase" className={classes.itemLink}>
                              <div className={classes.item} style={{backgroundImage: 'url(./img/admin/frase.png)'}}>
                                   <div className={classes.itemOverlay}>
                                  <div className={classes.itemWrapper}>
                                    <h3>Frase</h3>
                                    <CreateIcon className={classes.itemIcon}/>
                                  </div>
                                </div>
                              </div>
                            </Link>
                        </Col>
                    </Row>
                </div>

            ) : (
                <Redirect to="/login"/>
            )}
        </div>
    )
}

export default Index
