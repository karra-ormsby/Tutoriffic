import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useQuery } from '@apollo/client';

import { GET_DUE_DATES, GET_LESSON_DATES  } from '../utils/queries';
import { Col } from "antd";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

const  ReactBigCalendar = () => {
    const { loading: dueDatesLoading, data: dueDatesData, error: dueDatesError } = useQuery(GET_DUE_DATES);
    const quizzes = dueDatesData?.quizzes || [];

    const { loading: lessonDatesLoading, data: lessonDatesData, error: lessonDatesError } = useQuery(GET_LESSON_DATES);
    const lessons = lessonDatesData?.lessons || [];

    const mergedArray = [...quizzes, ...lessons];

    const createCalendarObject = (mergedArray) => {
        return {
            id: 0,
            title: mergedArray.title,
            allDay: true,
            start: mergedArray.date,
            end: mergedArray.date,
        };
    };

    const eventsData = mergedArray.map((calendarData) => createCalendarObject(calendarData));

    return (
        <div className="App" style={{padding: '50px', backgroundColor: '#fff', margin: '50px', borderRadius: '10px', marginTop: '20px'}}>
            <Calendar
                views={["day", "agenda", "work_week", "month"]}
                selectable
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="month"
                events={eventsData}
                style={{ height: "80vh", backgroundColor:'#fff' }}
            />
        </div>
    );
}

export default ReactBigCalendar;