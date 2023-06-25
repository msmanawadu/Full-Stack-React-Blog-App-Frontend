import { useState } from "react";
import axios from "axios";
import useUser from "../hooks/useUser";

function AddCommentForm({ articleName, onArticleUpdated }) {
  // Form input controller's state
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");
  const { user } = useUser();

  // Submit the comment to the REST API
  const addComment = async () => {
    // Integrate auth token to the request headers
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};
    const response = await axios.post(
      `/api/articles/${articleName}/comments`,
      {
        postedBy: name,
        text: commentText,
      },
      {
        headers,
      },
    );

    const updatedArticle = response.data;

    // Passing the updatedArticle prop from child to parent
    onArticleUpdated(updatedArticle);

    // Reset input form controllers
    setName("");
    setCommentText("");
  };

  return (
    <div id="add-comment-form">
      <h3>Add a Comment</h3>
      {user && <p>You are posting as {user.email} </p>}
      <textarea
        rows="4"
        cols="70"
        id="commenterComment"
        value={commentText}
        onChange={(event) => setCommentText(event.target.value)}
      />
      <button type="button" onClick={addComment}>
        Add Comment
      </button>
    </div>
  );
}

export default AddCommentForm;
