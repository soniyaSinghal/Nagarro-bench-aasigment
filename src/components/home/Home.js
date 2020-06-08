import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as tagActions from "redux/actions/tagActions";
import * as articleActions from "redux/actions/articleActions";
import { bindActionCreators } from "redux";
import { handleError } from "api/apiUtils";
import HomePageLayout from "./_Presentational/HomePageLayout";

export function Home(props) {
  let { actions, tags, loading, articles } = props;
  let articleLimit = 10;
  let articleOffset = 0;

  /**
   * @description React hook
   */
  useEffect(() => {
    actions.loadTags().catch(error => {
      handleError("Something went wrong", error);
    });
    actions.loadArticles(articleLimit, articleOffset).catch(error => {
      handleError("Something went wrong", error);
    });
  }, []);

  return (
    <div className="home">
      <HomePageLayout
        tags={tags}
        loading={loading}
        articles={articles}
        articleLimit={articleLimit}
        articleOffset={articleOffset}
      />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    tags: state.tags,
    articles: state.articles,
    loading: state.apiCallsInProgress > 0
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadTags: bindActionCreators(tagActions.loadTags, dispatch),
      loadArticles: bindActionCreators(articleActions.loadArticles, dispatch)
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
