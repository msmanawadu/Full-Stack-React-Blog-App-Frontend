import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import articles from "./article-content";
import CommentsList from "../components/CommentsList";
import NotFoundPage from "./NotFoundPage";

function ArticlePage() {
  // For the loaded article document state
  const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });

  // useParams hook from react-router: To retrieve the URL string value represented by the route parameter: articleId
  const { articleId } = useParams();

  // Fetching the article document from the REST API
  useEffect(() => {
    const loadArticleInfo = async () => {
      const response = await axios.get(`/api/articles/${articleId}`);
      const newArticleInfo = response.data;
      setArticleInfo(newArticleInfo);
    };
    loadArticleInfo(); // Work around to avoid an async function to be the first argument
  }, []);

  const article = articles.find((articleItem) => articleItem.name === articleId);

  // Updating the upvote count of the article on upvote button click by one
  const addUpvote = async () => {
    const response = await axios.put(`/api/articles/${articleId}/upvote`);
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
        <button onClick={addUpvote} type="button">
          Upvote
        </button>
        <p>This article has {articleInfo.upvotes} upvote(s)</p>
      </div>
      {article.content.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      <CommentsList comments={articleInfo.comments} />
    </>
  );
}

export default ArticlePage;
