import React, {useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import QuizList from '../components/QuizList';
import LessonList from '../components/LessonList';
import { QUIZ_BY_MODULE, LESSON_BY_MODULE, QUERY_MODULE } from '../utils/queries';

const Module = () => {
    const { moduleId } = useParams();

    const { data: quizData, loading: quizLoading, error: quizError, refetch: quizRefetch } = useQuery(QUIZ_BY_MODULE, {
    variables: { moduleId: moduleId },
    });

    const quizzesByModuleId = quizData?.quizzesByModuleId || [];

    useEffect(() => {
        quizRefetch();
    }, [quizRefetch]);

    const { data: lessonData, loading: lessonLoading, error: lessonError, refetch: lessonRefetch } = useQuery(LESSON_BY_MODULE, {
        variables: { moduleId: moduleId },
    });

    const lessonsByModuleId = lessonData?.lessonsByModuleId || [];

    const { data: moduleData, loading: moduleLoading, error: moduleError, refetch: moduleRefetch } = useQuery(QUERY_MODULE, {
        variables: { moduleId: moduleId },
    });

    const moduleColour = moduleData?.module?.selectedColor;

    useEffect(() => {
        lessonRefetch();
    }, [lessonRefetch]);



    return (
        <div className='main-section'>
            <div>
                {quizLoading ? (
                    <div>Loading...</div>
                ) : (
                    <QuizList
                        quizzes={quizzesByModuleId}
                    />
                )}
                <Link to='/quizzes/add' state={{moduleId, moduleColour}} className='enlarge'style={styles.button}>
                Add Quiz
                </Link>
            </div>

            <div style={{ marginTop: '3rem' }}>
            {lessonLoading ? (
                <div>Loading...</div>
            ) : (
                <LessonList
                    lessons={lessonsByModuleId}
                />
                )}
                <Link to='/lesson/add' state={{moduleId, moduleColour}} className='enlarge'style={styles.button}>
                Add Lesson
            </Link>
            </div>
        </div>
    );
};

const styles = {
    button: {
    backgroundColor: "#e67e22",
    color: "#fff",
    boxShadow: '2px 2px 10px rgb(216, 215, 215)',
    padding: '0.5rem',
    borderRadius: '5px',
    }
}

export default Module;