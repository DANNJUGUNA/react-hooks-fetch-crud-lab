import React,{useEffect,useState} from "react";
import QuestionItem from "./QuestionItem";
function QuestionList() {
  const[data,setData]=useState([]);

  useEffect(()=>{
    fetch("http://localhost:4000/questions")
    .then((response)=>response.json())
    .then((dat)=>setData(dat))
},[])
function handleDeleteClick(id) {
  fetch(`http://localhost:4000/questions/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then(() => {
      const updatedQuestions = questions.filter((question) => question.id !== id);
      setData(updatedQuestions);
    });
}

function handleAnswerChange(id, correctIndex) {
  fetch(`http://localhost:4000/questions/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ correctIndex }),
  })
    .then((r) => r.json())
    .then((updatedQuestion) => {
      const updatedQuestions = questions.map((question) => {
        if (question.id === updatedQuestion.id) return updatedQuestion;
        return question;
      });
      setData(updatedQuestions);
    });
}
const questions = data.map((question) => (
  <QuestionItem
    key={question.id}
    question={question}
    onDeleteClick={handleDeleteClick}
    onAnswerChange={handleAnswerChange}
  />
));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */
      questions
      }</ul>
    </section>
  );
}

export default QuestionList;
