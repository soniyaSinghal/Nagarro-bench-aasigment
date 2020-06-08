import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as articleActions from "redux/actions/articleActions";
import ManageArticleLayout from "./_Presentational/manageArticleLayout";
import { mockArticleData } from "./mockArticleData";
import { config } from "config/config";
import { toast } from "react-toastify";

export const ManageArticle = ({
  loadSelectedArticle,
  slugFromUrl,
  loading,
  updateArticle,
  saveArticle,
  history,
  ...props
}) => {
  let [selectedArticle, setSelectedArticle] = useState({
    ...props.selectedArticle
  });

  let [saving, setSaving] = useState(false);
  let [formError, setFormError] = useState({});

  /**
   * @description dispatch the action when slugFromUrl is changed
   */
  useEffect(() => {
    if (slugFromUrl) {
      loadSelectedArticle(slugFromUrl);
    } else {
      setSelectedArticle({ ...mockArticleData });
    }
  }, [slugFromUrl]);

  /**
   * @description update the article data when changed
   */
  useEffect(() => {
    setSelectedArticle({ ...props.selectedArticle });
  }, [props.selectedArticle.slug]);

  /**
   *
   * @param {Object} event
   * @description update the article data when changes
   */
  let onChangeHandler = event => {
    const { name, value } = event.target;
    let customizedValue = value;

    if (value && name !== "tagList") {
      setFormError(preError => {
        return {
          ...preError,
          [name]: !Boolean(value)
        };
      });
    }

    setSelectedArticle(prevArticle => {
      if (name === "tagList") {
        customizedValue = value.split(",");
        customizedValue = customizedValue.map(value => value.trim());
      }
      return {
        ...prevArticle,
        [name]: customizedValue
      };
    });
  };

  let isValid = selectedArticle => {
    let errorMap = {};

    if (!selectedArticle.title) {
      errorMap.title = true;
    }
    if (!selectedArticle.body) {
      errorMap.body = true;
    }

    if (!selectedArticle.description) {
      errorMap.description = true;
    }
    setFormError(errorMap);
    return !Boolean(Object.keys(errorMap).length);
  };
  /**
   * @description dispatch an action to save data
   */
  let publishArticleHandler = () => {
    if (!isValid(selectedArticle)) {
      return;
    }
    setSaving(true);

    if (selectedArticle.slug) {
      let dataToBePost = {
        article: {
          body: selectedArticle.body,
          description: selectedArticle.description,
          tagList: selectedArticle.tagList,
          title: selectedArticle.title,
          slug: selectedArticle.slug
        }
      };
      // delete selectedArticle.updatedAt;
      updateArticleHandler(dataToBePost);
    } else {
      let dataToBePost = {
        article: {
          body: selectedArticle.body,
          description: selectedArticle.description,
          tagList: selectedArticle.tagList,
          title: selectedArticle.title
        }
      };
      createArticleHandler(dataToBePost);
    }
  };

  /**
   *
   * @param {object} selectedArticle
   * @description this method will dispatch an action to update article data
   */
  let updateArticleHandler = selectedArticle => {
    debugger;
    updateArticle(selectedArticle, selectedArticle.article.slug).then(() => {
      setSaving(false);
      toast.success("Article is updated");
      history.push(
        `${config.ARTICLES_PAGE_URI}/${selectedArticle.article.slug}`
      );
    });
  };

  /**
   *
   * @param {Object} selectedArticle
   * @description This method will dispatch an action to creat an article
   */
  let createArticleHandler = selectedArticle => {
    saveArticle(selectedArticle)
      .then(articleData => {
        setSaving(false);
        toast.success("Article is created");
        history.push(`${config.ARTICLES_PAGE_URI}/${articleData.slug}`);
      })
      .catch(() => {
        setSaving(false);
      });
  };
  return (
    <>
      {slugFromUrl ? (
        <ManageArticleLayout
          selectedArticle={selectedArticle}
          onChange={onChangeHandler}
          loading={loading}
          publishArticle={publishArticleHandler}
          saving={saving}
          pageHeading="Edit Article"
          showSkeleton={selectedArticle.slug ? false : true}
          formError={formError}
        />
      ) : (
        <ManageArticleLayout
          selectedArticle={selectedArticle}
          onChange={onChangeHandler}
          loading={loading}
          publishArticle={publishArticleHandler}
          saving={saving}
          formError={formError}
          pageHeading="Add Article"
        />
      )}
    </>
  );
};

ManageArticle.propTypes = {
  slugFromUrl: PropTypes.string,
  selectedArticle: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  loadSelectedArticle: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    history: ownProps.history,
    slugFromUrl: ownProps.match.params.slug,
    selectedArticle: ownProps.match.params.slug
      ? state.articles.selectedArticle
        ? state.articles.selectedArticle
        : mockArticleData
      : mockArticleData,
    loading: state.apiCallsInProgress > 0
  };
};

const mapDispatchToProps = {
  loadSelectedArticle: articleActions.loadSelectedArticle,
  updateArticle: articleActions.updateArticle,
  saveArticle: articleActions.saveArticle
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageArticle);
