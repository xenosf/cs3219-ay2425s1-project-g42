import React, { useState, useEffect } from "react";
import "./App.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Typography from "@mui/material/Typography";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import axios from "axios";
import AddQuestionForm from "./components/AddQuestion/AddQuestionForm";

function App() {
  const [questionList, setQuestionList] = useState("");
  const [isShowForm, setIsShowForm] = useState(false); // false = main view page. true = new qn form

  const fetchQuestions = async () => {
    try {
      const response = await axios.get("http://localhost:8000/questions");
      setQuestionList(response.data);
    } catch (error) {
      console.error("Error fetching questions", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  let accordionList = [];

  Object.entries(questionList).map((wholeQuestion) => {
    let questionId = parseInt(wholeQuestion[0]) + 1;
    accordionList.push(
      <Accordion key={wholeQuestion[1]._id}>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>
            {questionId}. {wholeQuestion[1].title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography align="left">Description: {wholeQuestion[1].description}</Typography>
          <Typography align="left" color="secondary">
            Category: {wholeQuestion[1].categories}
          </Typography>
          <Typography align="left" color="primary">
            Complexity: {wholeQuestion[1].complexity}
          </Typography>
          <Typography align="left" color="primary">
            Link:&nbsp;
            <a href={wholeQuestion[1].link}>Click to get to leetcode</a>
          </Typography>
        </AccordionDetails>
      </Accordion>
    );
    return null;
  });

  const handleTabChange = (event, newState) => {
    setIsShowForm(newState);
    if (newState === false) {
      // refresh view when switching to view tab
      fetchQuestions();
    }
  };

  return (
    <div className="App">
      <h1>PeerPrep</h1>
      <ToggleButtonGroup value={isShowForm} exclusive onChange={handleTabChange} aria-label="tab">
        <ToggleButton value={false} aria-label="view questions">
          View questions
        </ToggleButton>
        <ToggleButton value={true} aria-label="add new question">
          Add question
        </ToggleButton>
      </ToggleButtonGroup>
      {isShowForm ? (
        <AddQuestionForm goBack={() => setIsShowForm(false)} />
      ) : (
        <div>{accordionList}</div>
      )}
    </div>
  );
}

export default App;
