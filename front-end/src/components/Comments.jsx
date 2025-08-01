import { useEffect, useState } from "react";

export default function Comments({ videoId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [editCommentId, setEditCommentId] = useState(null);
  const [editText, setEditText] = useState("");


  useEffect(() => {
    async function fetchComments() {
      const res = await fetch(`http://localhost:5000/api/video/info/${videoId}`);
      const data = await res.json();
      setComments(data.Comments || []);
    }

    fetchComments();
  }, [videoId]);

const submitComment = async () => {
  if (!newComment.trim()) return;

  const res = await fetch(`http://localhost:5000/api/video/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ comment: newComment }),
  });

  if (res.ok) {

    const updated = await fetch(`http://localhost:5000/api/video/info/${videoId}`);
    const newData = await updated.json();
    setComments(newData.Comments || []);
    setNewComment("");
  }
};

const handleEdit = (comment) => {
  setEditCommentId(comment._id);
  setEditText(comment.text);
};

const handleUpdate = async () => {
  const res = await fetch(`http://localhost:5000/api/video/${videoId}/comment/${editCommentId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ updatedText: editText }),
  });

  if (res.ok) {
    const updated = await fetch(`http://localhost:5000/api/video/info/${videoId}`);
    const newData = await updated.json();
    setComments(newData.Comments || []);
    setEditCommentId(null);
    setEditText("");
  }
};

const handleDelete = async (commentId) => {
  const res = await fetch(`http://localhost:5000/api/video/${videoId}/comment/${commentId}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  });

  if (res.ok) {
    const updated = await fetch(`http://localhost:5000/api/video/info/${videoId}`);
    const newData = await updated.json();
    setComments(newData.Comments || []);
  }
};



  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">Comments</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="border flex-1 p-2"
          placeholder="Add a comment..."
        />
        <button
          onClick={submitComment}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Post
        </button>
      </div>

{comments.length > 0 ? (
  <ul className="flex-col gap-2 flex">
    {comments.map((cmt, idx) => {
        console.log(cmt)
      if (!cmt || !cmt.text) return null; 
      return (
        <li key={idx} className="border p-3 rounded">
{editCommentId === cmt._id ? (
  <div className="flex gap-2">
    <input
      value={editText}
      onChange={(e) => setEditText(e.target.value)}
      className="border flex-1 p-1"
    />
    <button onClick={handleUpdate} className="text-green-600">Save</button>
    <button onClick={() => setEditCommentId(null)} className="text-gray-500">Cancel</button>
  </div>
) : (
  <p className="text-gray-800">{cmt.text}</p>
)}

          <div className="text-sm font-semibold text-blue-600">{user?.username || "Anonymous"}
          <div className="text-sm text-gray-500 flex gap-2">
            {cmt.timestamp ? new Date(cmt.timestamp).toLocaleString() : ""}
          </div>
          </div>
          <div className="flex justify-between items-center mt-2">


  {user?.id === cmt.user._id && (
    <div className="flex gap-2">
      <button onClick={() => handleEdit(cmt)}>Edit</button>
      <button onClick={() => handleDelete(cmt._id)}>Delete</button>
    </div>
  )}
</div>

        </li>
      );
    })}
  </ul>
) : (
  <p className="text-gray-500">No comments yet.</p>
)}
    </div>
  );
}
