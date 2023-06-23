import { useState } from "react";
import axios from "axios";

function AddCommentForm({ articleName, onArticleUpdated }) {
  // Form input controller's state
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");

  // Submit the comment to the REST API
  const addComment = async () => {
    const response = await axios.post(`/api/articles/${articleName}/comments`, {
      postedBy: name,
      text: commentText,
    });

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
      <label htmlFor="commenterName">
        Name:
        <input
          type="text"
          id="commenterName"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <label htmlFor="commenterComment">
        Comment:
        <textarea
          rows="4"
          cols="70"
          id="commenterComment"
          value={commentText}
          onChange={(event) => setCommentText(event.target.value)}
        />
      </label>
      <button type="button" onClick={addComment}>
        Add Comment
      </button>
    </div>
  );
}

export default AddCommentForm;
