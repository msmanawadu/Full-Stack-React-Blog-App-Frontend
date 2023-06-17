import { useParams } from "react-router-dom";
import articles from "./article-content";
import NotFoundPage from "./NotFoundPage";

function ArticlePage() {
  // useParams hook from react-router: To retrieve the URL string value represented by the route parameter: articleId
  const { articleId } = useParams();
  const article = articles.find((articleItem) => articleItem.name === articleId);

  // No article found: 404
  if (!article) {
    return <NotFoundPage />;
  }

  return (
    <>
      <h1>{article.title}</h1>
      {article.content.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </>
  );
}

export default ArticlePage;
