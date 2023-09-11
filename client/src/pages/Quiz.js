import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import moment from "moment";
import { Row, Col } from 'antd';
import Questions from '../components/Questions';
import { QUERY_QUIZ } from '../utils/queries';

const Quiz = () => {
    const {quizId} = useParams();

    const { loading, data } = useQuery(QUERY_QUIZ, {
        variables: { quizId: quizId },
    });

    const quiz = data?.quiz || {};

    if (loading) {
        return <div>Loading...</div>;
    }

    const date = moment(quiz.date).format('L')

    return(
        <div style={{backgroundColor: "#9cb9ca", padding: "1rem 0"}}>
            <Row justify="space-around" align="middle" >
                <Col span={20} style={{backgroundColor: "white", borderRadius: "15px"}}>
                    <div style={styles.titleBox}>
                        <h2>{quiz.title}</h2>
                        <h4 style={styles.date}>Due: {date}</h4>
                    </div>
                    <p>{quiz.description}</p>
                    {quiz.questions?.length > 0 && <Questions questions={quiz.questions} />}
               </Col>
            </Row>
        </div>
    )

};

const styles = {
    titleBox: {
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        paddingTop: "1rem"
    },
    date: {
        alignSelf: "flex-end",
        paddingLeft: "1rem",
        color: "#ec8f4b"
    }
}

export default Quiz;