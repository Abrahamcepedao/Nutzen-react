import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

/* Home */
import Home from "./components/home";
import Recetas from "./components/recetas/Recetas";
import Blog from "./components/blog/Blog";
import Login from "./components/admin/Login";
import Admin from "./components/admin/index";
import AdminRecetas from "./components/admin/Recetas";
import AdminTiendas from "./components/admin/Tiendas";
import AdminBlog from "./components/admin/Blog";
import AdminFrase from "./components/admin/Frase";
const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/recetas" component={Recetas}/>
        <Route exact path="/blog" component={Blog}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/admin" component={Admin}/>
        <Route exact path="/admin/recetas" component={AdminRecetas}/>
        <Route exact path="/admin/tiendas" component={AdminTiendas}/>
        <Route exact path="/admin/blog" component={AdminBlog}/>
        <Route exact path="/admin/frase" component={AdminFrase}/>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;