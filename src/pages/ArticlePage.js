import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import articles from "./article-content";
import CommentsList from "../components/CommentsList";
import AddCommentForm from "../components/AddCommentForm";
import useUser from "../hooks/useUser";
import NotFoundPage from "./NotFoundPage";

function ArticlePage() {
  // For the loaded article document state
  const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [], canUpvote: false });
  const { canUpvote } = articleInfo;

  // useParams hook from react-router: To retrieve the URL string value represented by the route parameter: articleId
  const { articleId } = useParams();

  // Get currently logged-in user
  const { user, isLoading } = useUser();

  // Fetching the article document from the REST API
  useEffect(() => {
    const loadArticleInfo = async () => {
      // Integrate auth token to the request headers
      const token = user && (await user.getIdToken());
      const headers = token ? { authtoken: token } : {};

      const response = await axios.get(`/api/articles/${articleId}`, {
        headers,
      });
      const newArticleInfo = response.data;
      setArticleInfo(newArticleInfo);
    };

    if (!isLoading) {
      loadArticleInfo(); // Work around to avoid an async function to be the first argument
    }
  }, [isLoading, user]);

  const article = articles.find((articleItem) => articleItem.name === articleId);

  // Updating the upvote count of the article on upvote button click by one
  const addUpvote = async () => {
    // Integrate auth token to the request headers
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};

    const response = await axios.put(`/api/articles/${articleId}/upvote`, null, {
      headers,
    });
    const updatedArticle = response.data;
    setArticleInfo(updatedArticle);
  };

  // No article found: 404
  if (!article) {
    return <NotFoundPage />;
  }

  return (
    <>
      <h1>{article.title}</h1>
      <div className="upvotes-section">
        {user ? (
          <button onClick={addUpvote} type="button">
            {canUpvote ? "Upvote" : "Already Upvoted"}
          </button>
        ) : (
          <button type="button">Log In to Upvote</button>
        )}
        <p>This article has {articleInfo.upvotes} upvote(s)</p>
      </div>
      {article.content.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      {user ? (
        <AddCommentForm
          articleName={articleId}
          onArticleUpdated={(updatedArticle) => setArticleInfo(updatedArticle)}
        />
      ) : (
        <button type="button">Log In to Add a Comment</button>
      )}

      <CommentsList comments={articleInfo.comments} />
    </>
  );
}

export default ArticlePage;
