import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { SAVE_LESSON } from '../utils/mutations';
import { DatePicker, Form, Input, Button } from 'antd';
const generateUniqueId = require('generate-unique-id');

const LessonCreator = () => {
  const [lessonTitle, setLessonTitle] = useState('');
  const [sections, setSections] = useState([{ heading: '', subheading: '', text: '' }]);
  const [date, setDate] = useState('');
  const [errors, setErrors] = useState({});

  const location = useLocation();
  const { moduleId, moduleColour } = location.state;

  const navigate = useNavigate();

  const [saveLesson] = useMutation(SAVE_LESSON);

  const handleTitleChange = (e) => {
    setLessonTitle(e.target.value);
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleHeadingChange = (e, index) => {
    const newSections = [...sections];
    newSections[index].heading = e.target.value;
    setSections(newSections);
  };

  const handleSubheadingChange = (e, headingIndex) => {
    const newSections = [...sections];
    newSections[headingIndex].subheading = e.target.value;
    setSections(newSections);
  };

  const handleTextChange = (e, headingIndex) => {
    const newSections = [...sections];
    newSections[headingIndex].text = e.target.value;
    setSections(newSections);
  };

  const addSection = () => {
    setSections([...sections, { heading: '', subheading: '', text: '' }]);
  };

  const handleLessonSave = async () => {
    // Perform form validation before saving the lesson
    const validationErrors = {};
    if (!lessonTitle.trim()) {
      validationErrors.lessonTitle = 'Lesson title is required.';
    }
    if (!date) {
      validationErrors.date = 'Lesson date is required.';
    }
    sections.forEach((section, index) => {
      if (!section.heading.trim()) {
        validationErrors[`heading_${index}`] = 'Section heading is required.';
      }
      if (!section.text.trim()) {
        validationErrors[`text_${index}`] = 'Text is required.';
      }
    });

    // If there are validation errors, display them and prevent saving the lesson
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Proceed with saving the lesson if there are no validation errors
    const dataToSend = { id: generateUniqueId(), title: lessonTitle, date: date, sections: sections, moduleId: moduleId, moduleColour: moduleColour };

    try {
      const { data } = await saveLesson({
        variables: { lessonData: dataToSend }
      });

      // Clear form data after successful save
      setLessonTitle('');
      setDate('');
      setSections([{ heading: '', subheading: '', text: '' }]);
      setErrors({});

      navigate(`/modules/${moduleId}`);
    } catch (error) {
      // Handle error here if needed
      console.error(error);
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
      zIndex: 1,
    },
  };

  return (
    <div style={styles.box}>
      <h1>Create Lesson</h1>
      <Form>
        <Form.Item
          label="Lesson Title"
          rules={[
            {
              required: true,
              message: 'Please input a Lesson Title!',
            },
          ]}
          validateStatus={errors.lessonTitle ? 'error' : ''}
          help={errors.lessonTitle}
        >
          <Input
            value={lessonTitle}
            onChange={handleTitleChange}
          />
        </Form.Item>

        <Form.Item
          label="Lesson Date:"
          rules={[
            {
              required: true,
            },
          ]}
          validateStatus={errors.date ? 'error' : ''}
          help={errors.date}
        >
          <DatePicker
            onChange={(date) => handleDateChange(date)}
          />
        </Form.Item>

        <div id="sections_section">
          {sections.map((section, index) => (
            <div key={index}>
              <div className="heading">
                <Form.Item
                  label="Heading"
                  rules={[
                    {
                      required: true,
                      message: 'Please input a Heading!',
                    },
                  ]}
                  validateStatus={errors[`heading_${index}`] ? 'error' : ''}
                  help={errors[`heading_${index}`]}
                >
                  <Input
                    value={section.heading}
                    onChange={(e) => handleHeadingChange(e, index)}
                  />
                </Form.Item>
              </div>

              <div className="subheading">
                <Form.Item
                  label="Subheading"
                  rules={[
                    {
                      required: true,
                      message: 'Please input a Subheading!',
                    },
                  ]}
                  validateStatus={errors[`heading_${index}`] ? 'error' : ''}
                  help={errors[`heading_${index}`]}
                >
                  <Input
                    value={section.subheading}
                    onChange={(e) => handleSubheadingChange(e, index)}
                  />
                </Form.Item>
              </div>

              <div className="text">
                <Form.Item
                  key={`text_${index}`}
                  label="Text"
                  rules={[{ required: true, message: 'Text is required.' }]}
                  validateStatus={errors[`text_${index}`] ? 'error' : ''}
                  help={errors[`text_${index}`]}
                >
                  <Input.TextArea
                    value={section.text}
                    onChange={(e) => handleTextChange(e, index)}
                    showCount maxLength={1000}
                  />
                </Form.Item>
              </div>
            </div>
          ))}
        </div>

        <Button onClick={addSection} style={styles.button}>Add Section</Button>
        <Button onClick={handleLessonSave} style={styles.button}>Save Lesson</Button>
      </Form>
    </div>
  );
};

export default LessonCreator;




