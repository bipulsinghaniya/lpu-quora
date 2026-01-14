import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Tabs from "../components/Tabs";
import QuestionCard from "../components/QuestionCard";
import AskModal from "../components/AskModal";

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [tab, setTab] = useState("all");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const loadQuestions = async () => {
    const res = await api.get("/questions");
    setQuestions(res.data);
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  const filtered = questions.filter((q) => {
    const matchTag = tab === "all" || q.tag === tab;
    const matchSearch =
      q.title.toLowerCase().includes(search.toLowerCase()) ||
      q.desc.toLowerCase().includes(search.toLowerCase());
    return matchTag && matchSearch;
  });

  return (
    <>
      <Navbar onAsk={() => setOpen(true)} search={search} setSearch={setSearch} />

      <div className="pt-24 max-w-5xl mx-auto px-4">
        <Tabs active={tab} setActive={setTab} />

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 mt-20">
            No questions found 🚀
          </p>
        )}

        <div className="space-y-4">
          {filtered.map((q) => (
            <QuestionCard key={q._id} q={q} reload={loadQuestions} />
          ))}
        </div>
      </div>

      <AskModal open={open} onClose={() => setOpen(false)} reload={loadQuestions} />
    </>
  );
}


// import { useEffect, useState } from "react";
// import api from "../api/axios";
// import QuestionCard from "../components/QuestionCard";

// export default function Home() {
//   const [questions, setQuestions] = useState([]);

//   const fetchQuestions = async () => {
//     const res = await api.get("/questions");
//     setQuestions(res.data);
//   };

//   useEffect(() => {
//     fetchQuestions();
//   }, []);

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">All Questions</h2>

//       {questions.length === 0 && (
//         <p className="text-gray-500">No questions yet. Be the first to ask 🚀</p>
//       )}

//       {questions.map((q) => (
//         <QuestionCard
//           key={q._id}
//           question={q}
//           onAnswerAdded={fetchQuestions} // 🔁
//         />
//       ))}
//     </div>
//   );
// }





