import React from 'react';
import { Radio } from 'antd';

const Questions = ({questions}) => {
    return(
        <div>
            { questions &&
            questions.map((question, index) => (
                <div key={question} style={styles.questionContainer}>
                    <div>
                        <h5 style={styles.question}>
                            {index+1}. {question.question} <br />
                        </h5>
                        <div>
                            <Radio.Group>
                            {question.answers &&
                                question.answers.map((answer) => (
                                    <div key={answer} style={styles.answersContainer}>
                                        {/* <div>
                                            <input type="radio" value={answer} />
                                            <label htmlFor={answer}>{answer}</label>
                                        </div> */}
                                        <Radio value={answer} style={{fonstSize: "30px"}}> {answer} </Radio>
                                    </div>
                                ))}
                            </Radio.Group>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
};

const styles = {
    questionContainer: {
        textAlign: "left",
        
    },
    question: {
        fontWeight: "400",
        fontSize: "1.4rem",
        paddingBottom: "0.2rem",
        borderBottom: "1px solid"
    },
    answersContainer: {
        paddingBottom: "0.5rem",
    }
}

export default Questions;