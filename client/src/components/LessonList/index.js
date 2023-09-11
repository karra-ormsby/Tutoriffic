import React from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Button, Card } from "antd";
import { QUERY_ALL_LESSONS } from "../../utils/queries";
import { DELETE_LESSON } from "../../utils/mutations";
import "../../pages/cardDashboard.css";
import { DeleteOutlined } from "@ant-design/icons";
import { Empty } from 'antd'

const LessonList = ({ lessons }) => {
  const [deleteLesson, { error }] = useMutation(DELETE_LESSON, {
    update(cache, { data: { removeLesson } }) {
      try {
        const { lessons } = cache.readQuery({ query: QUERY_ALL_LESSONS });

        const updatedLessons = lessons.filter(
          (lesson) => lesson.id !== removeLesson.id
        );

        cache.writeQuery({
          query: QUERY_ALL_LESSONS,
          data: { lessons: updatedLessons },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  if (!lessons.length) {
    return <h3 style={{margin: "30px"}}>No Lessons Yet <Empty/> </h3>;
  }

  const handleDelete = async (id) => {
    try {
      const { data } = await deleteLesson({
        variables: { removeLessonId: id },
      });

      if (!data.removeLesson) {
        throw new Error("Something went wrong!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h3>Your Lessons</h3>
      <div className="flex-row justify-space-between my-4">
        {lessons &&
          lessons.map((lesson) => (
            <Card key={lesson.id} className="col-10 col-xl-5 card-dashboard enlarge" style={{ backgroundColor: lesson.moduleColour}}>
              <Link className="link" to={`/lessons/${lesson.id}`}>
                {lesson.title} 
              </Link>
              <Button
                type="text"
                icon={<DeleteOutlined />}
                className="delete-button"
                onClick={() => handleDelete(lesson.id)}
              />
            </Card>
          ))}
      </div>
    </div>
  );

};

export default LessonList;
