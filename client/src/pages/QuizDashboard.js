import React, {useEffect} from 'react';
import { useQuery } from '@apollo/client';
import QuizList from '../components/QuizList';
import { QUERY_ALL_QUIZZES } from '../utils/queries'
import './cardDashboard.css';

const Quizzes = () => {
    const { data, loading, error, refetch } = useQuery(QUERY_ALL_QUIZZES);

    const quizzes = data?.quizzes || [];

    useEffect(() => {
        refetch();
    }, [refetch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <div className='main-section'>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <QuizList
                    quizzes={quizzes}
                    title="Here's the current list of avilable quizzes..."
                />
            )}
        </div>
    )
}

export default Quizzes;