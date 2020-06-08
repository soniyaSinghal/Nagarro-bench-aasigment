import { combineReducers } from "redux";
import apiCallsInProgress from "./apiStatusReducer";
import favApiCallsInProgress from "./favApiStatusReducer";
import tags from "./tagReducer";
import articles from "./articleReducer";
import user from "./userReducer";
import comments from "./commentReducer";
import specialArticles from "./specialArticleReducer";

const rootReducer = combineReducers({
  tags,
  articles,
  apiCallsInProgress,
  user,
  comments,
  favApiCallsInProgress,
  specialArticles
});

export default rootReducer;
