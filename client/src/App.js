import React, {useState, useEffect} from "react";
import './App.css';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

function App() {
  const [questionList, setQuestionList] = useState("");

  useEffect(() => { 
    const fetchQuestions = async () => {    
        try {
          const response = await axios.get("http://localhost:8000/questions");
          setQuestionList(response.data);
        } catch(error) {
          console.error('Error fetching questions', error)
        }
      }
      fetchQuestions()
  },[questionList])

  let accordionList = [];

  Object.entries(questionList).map((wholeQuestion, index) => {
      let questionId = parseInt(wholeQuestion[0]) + 1;
      accordionList.push(<Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>{questionId}. {wholeQuestion[1].title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography align = 'left'>
            Description: {wholeQuestion[1].description}
          </Typography>
          <Typography align = 'left' color = 'secondary'>
          Category: {wholeQuestion[1].categories}
          </Typography>
          <Typography align = 'left' color = 'primary'>
          Complexity: {wholeQuestion[1].complexity}
          </Typography>
          <Typography align = 'left' color = 'primary'>
            Link:&nbsp; 
           <a href = {wholeQuestion[1].link}>Click to get to leetcode</a>
          </Typography>          
        </AccordionDetails>
      </Accordion>);
      return null;
  });

  return (
    <div className="App">
      <h1>PeerPrep</h1>
      <div>
        {accordionList}
        </div>      
    </div>
  );
}

export default App;
