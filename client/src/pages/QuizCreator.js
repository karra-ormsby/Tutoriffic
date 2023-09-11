import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from "@apollo/client";
import { SAVE_QUIZ } from "../utils/mutations";
import { DatePicker, Form, Input, Button } from "antd";
const generateUniqueId = require("generate-unique-id");

const QuizCreator = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", answers: ["", "", "", ""] },
  ]);
  const [date, setDate] = useState("");
  const [form] = Form.useForm();
  const [errors, setErrors] = useState({});

  const location = useLocation();
  const { moduleId, moduleColour } = location.state;

  const navigate = useNavigate();

  const [saveQuiz] = useMutation(SAVE_QUIZ);

  const handleTitleChange = (e) => {
    setQuizTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setQuizDescription(e.target.value);
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleQuestionChange = (e, index) => {
    const newQuestions = [...questions];
    newQuestions[index].question = e.target.value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (e, questionIndex, answerIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers[answerIndex] = e.target.value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: "", answers: ["", "", "", ""] }]);
  };

  const handleQuizSave = async () => {
    try {
      // Validate the form
      await form.validateFields();
      // Proceed with saving the quiz if there are no validation errors
      const dataToSend = {
        id: generateUniqueId(),
        title: quizTitle,
        description: quizDescription,
        date: date,
        questions: questions,
        moduleId: moduleId,
        moduleColour: moduleColour
      };
      const { data } = await saveQuiz({
        variables: { quizData: dataToSend },
      });

      // Clear the form data after successful save
      form.resetFields();
      setErrors({});

      navigate(`/modules/${moduleId}`);
    } catch (error) {
      // Handle validation errors
      const validationErrors = {};
      error.errorFields.forEach((field) => {
        validationErrors[field.name[0]] = field.errors[0];
      });
      setErrors(validationErrors);
    }
  };

  const styles = {
    button: {
      backgroundColor: "#e67e22",
      color: "#fff",
      boxShadow: '2px 2px 10px rgb(216, 215, 215)',
      borderRadius: '4px', // Add border-radius for curves
    },
    box: {
      maxWidth: '800px',
      margin: 'auto',
      backgroundColor: '#f5f5f5',
      border: '1px solid #ddd',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      textAlign: 'center',
      borderRadius: '8px', // Add border radius for rounded corners
    },
  };

  return (
    <div style={styles.box}>
      <h1>Create A Quiz</h1>
      <Form form={form}>
        <Form.Item
          label="Quiz Title"
          name="quizTitle"
          rules={[
            {
              required: true,
              message: "Please input a Quiz Title!",
            },
          ]}
        >
          <Input value={quizTitle} onChange={handleTitleChange} />
        </Form.Item>

        <Form.Item label="Quiz Description" name="quizDescription">
          <Input value={quizDescription} onChange={handleDescriptionChange} />
        </Form.Item>

        <Form.Item
          label="Due Date:"
          name="quizDueDate"
          rules={[
            {
              required: true,
              message: "Please select a Due Date!",
            },
          ]}
        >
          <DatePicker onChange={handleDateChange} />
        </Form.Item>

        <div id="questions_section">
          {questions.map((question, index) => (
            <div key={index} className="question">
              <h3>Question {index + 1}:</h3>
              <Form.Item
                label="Question"
                name={["questions", index, "question"]}
                rules={[
                  {
                    required: true,
                    message: "Please input a Question!",
                  },
                ]}
              >
                <Input
                  value={question.question}
                  onChange={(e) => handleQuestionChange(e, index)}
                />
              </Form.Item>
              <div className="answers">
                {question.answers.map((answer, answerIndex) => (
                  <Form.Item
                    key={answerIndex}
                    label={`Answer ${answerIndex + 1}`}
                    name={["questions", index, "answers", answerIndex]}
                    rules={[
                      {
                        required: true,
                        message: "Please input an Answer!",
                      },
                    ]}
                  >
                    <Input
                      value={answer}
                      onChange={(e) =>
                        handleAnswerChange(e, index, answerIndex)
                      }
                    />
                  </Form.Item>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Button onClick={addQuestion} style={styles.button}>Add Question</Button>
        <Button onClick={handleQuizSave} style={styles.button}>Save Quiz</Button>
        {Object.keys(errors).map((field) => (
          <div key={field} className="error-message">
            {errors[field]}
          </div>
        ))}
      </Form>
    </div>
  );
};

export default QuizCreator;

