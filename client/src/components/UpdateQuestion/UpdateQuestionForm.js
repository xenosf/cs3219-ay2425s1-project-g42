import React, { useState, useEffect } from "react";
import {
  Stack,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";

function UpdateQuestionForm({ goBack, selectedQuestion, onUpdateSuccess }) {
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState("");
  const [complexity, setComplexity] = useState("Medium");
  const [link, setLink] = useState("");

  useEffect(() => {
    if (selectedQuestion) {
      setTitle(selectedQuestion.title);
      setDescription(selectedQuestion.description);
      setCategories(selectedQuestion.categories);
      setComplexity(selectedQuestion.complexity);
      setLink(selectedQuestion.link);
    }
  }, [selectedQuestion]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedQuestion = {
      title,
      description,
      categories,
      complexity,
      link,
    };

    try {
      const response = await axios.put(
        `http://localhost:8000/questions/${selectedQuestion._id}`,
        updatedQuestion
      );

      // Call the onUpdateSuccess callback to update the parent state
      onUpdateSuccess(response.data);

      // Go back to the list view
      goBack();
    } catch (error) {
      console.error(error);
      setError("Failed to update the question");
    }
  };

  return (
    <div className="UpdateQuestionForm">
      <h2>Update Question</h2>
      <div>
        {error && (
          <Typography align="center" color="error">
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <Stack spacing={2} sx={{ paddingX: 10 }}>
            <TextField
              label="Title"
              onChange={(e) => setTitle(e.target.value)}
              required
              variant="outlined"
              value={title}
            />

            <TextField
              label="Description"
              onChange={(e) => setDescription(e.target.value)}
              required
              multiline
              variant="outlined"
              value={description}
            />

            <TextField
              label="Categories"
              onChange={(e) => setCategories(e.target.value)}
              required
              variant="outlined"
              value={categories}
            />

            <FormControl>
              <InputLabel id="complexity-select-label">Complexity</InputLabel>
              <Select
                labelId="complexity-select-label"
                id="complexity-select"
                value={complexity}
                label="Complexity"
                onChange={(e) => setComplexity(e.target.value)}
                required
              >
                <MenuItem value={"Easy"}>Easy</MenuItem>
                <MenuItem value={"Medium"}>Medium</MenuItem>
                <MenuItem value={"Hard"}>Hard</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Link"
              onChange={(e) => setLink(e.target.value)}
              required
              variant="outlined"
              value={link}
            />

            <Button variant="outlined" type="submit">
              Update Question
            </Button>
          </Stack>
        </form>
      </div>
    </div>
  );
}

export default UpdateQuestionForm;