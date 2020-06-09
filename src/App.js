import React from "react";
import Header from "components/header";
import { Route, Switch } from "react-router-dom";
import Home from "components/home";
import { ToastContainer } from "react-toastify";
import NotFound from "components/notFound";
import { config } from "config/config";
import "./assets/style/fonts/Titillium-Regular.otf";
import Register from "components/user/register";
import Login from "components/user/login";
import AllArticles from "components/articles/allArticles";
import ReadArticle from "components/articles/readArticle";
import ManageArticle from "components/articles/manageArticle";
import FavoriteArticle from "components/articles/favoriteArticle";
import TaggedArticles from "components/articles/taggedArticles";
import MyArticles from "components/articles/myArticles";
import PrivateRoute from "components/common/privateRoute";

function App() {
  return (
    <div className="App">
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path={config.HOME_PAGE_URI} component={Home}></Route>
        <Route path={config.REGISTER_PAGE_URI} component={Register}></Route>
        <Route path={config.LOGIN_PAGE_URI} component={Login}></Route>
        <PrivateRoute
          exact
          path={config.ARTICLES_PAGE_URI}
          component={AllArticles}
        ></PrivateRoute>
        <PrivateRoute
          path={`${config.ARTICLES_PAGE_URI}/:slug`}
          component={ReadArticle}
        />
        <PrivateRoute
          path={`${config.ARTICLE_EDIT_PAGE_URI}/:slug`}
          component={ManageArticle}
        />
        <PrivateRoute
          path={`${config.ARTICLE_ADD_PAGE_URI}`}
          component={ManageArticle}
        />
        <PrivateRoute
          path={`${config.FAV_ARTICLE_PAGE_URL}`}
          component={FavoriteArticle}
        />
        <PrivateRoute
          path={`${config.TAGGED_ARTICLE_PAGE_URL}`}
          component={TaggedArticles}
        />
        <PrivateRoute
          path={`${config.MY_ARTICLES_PAGE_URI}`}
          component={MyArticles}
        />

        {/* place all the routes before un known routes*/}
        <Route path={config.NOT_FOUND_PAGE_URI} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
