import { useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function AnswerList({ answers, reload }) {
  const { auth } = useContext(AuthContext);

  const deleteAnswer = async (id) => {
    await api.delete(`/admin/answer/${id}`);
    reload();
  };

  return (
    <div className="mt-3 space-y-2">
      {answers.map((a) => (
        <div
          key={a._id}
          className="bg-gray-50 p-2 rounded text-sm flex justify-between"
        >
          <span>{a.text}</span>

          {auth.role === "admin" && (
            <button
              onClick={() => deleteAnswer(a._id)}
              className="text-red-500 text-xs"
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
