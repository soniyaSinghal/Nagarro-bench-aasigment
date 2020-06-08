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

function App() {
  return (
    <div className="App">
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path={config.HOME_PAGE_URI} component={Home}></Route>
        <Route path={config.REGISTER_PAGE_URI} component={Register}></Route>
        <Route path={config.LOGIN_PAGE_URI} component={Login}></Route>
        <Route
          exact
          path={config.ARTICLES_PAGE_URI}
          component={AllArticles}
        ></Route>
        <Route
          path={`${config.ARTICLES_PAGE_URI}/:slug`}
          component={ReadArticle}
        />
        <Route
          path={`${config.ARTICLE_EDIT_PAGE_URI}/:slug`}
          component={ManageArticle}
        />
        <Route
          path={`${config.ARTICLE_ADD_PAGE_URI}`}
          component={ManageArticle}
        />
        <Route
          path={`${config.FAV_ARTICLE_PAGE_URL}`}
          component={FavoriteArticle}
        />
        <Route
          path={`${config.TAGGED_ARTICLE_PAGE_URL}`}
          component={TaggedArticles}
        />

        {/* place all the routes before un known routes*/}
        <Route path={config.NOT_FOUND_PAGE_URI} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
