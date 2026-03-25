



import { useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function AnswerList({ answers, reload }) {
  const { auth } = useContext(AuthContext);

  const deleteAnswer = async (id) => {
    try {
      await api.delete(`/admin/answer/${id}`);
      reload();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="mt-2 space-y-2">
      {answers.map((ans) => (
        <div
          key={ans._id}
          className="bg-gray-100 px-3 py-2 rounded flex justify-between items-start"
        >
          <span className="text-sm">{ans.text}</span>

          {auth?.user?.role === "admin" && (
            <button
              onClick={() => deleteAnswer(ans._id)}
              className="text-red-500 text-xs ml-2  cursor-pointer"
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
