import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Row, Col} from 'antd';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { QUERY_LESSON } from '../utils/queries';

const Lesson = () => {
    const { lessonId } = useParams();

    const { loading, data } = useQuery(QUERY_LESSON, {
        variables: { lessonId: lessonId },
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    const lesson = data?.lesson || {};
    const lessonTitle = lesson.title.toUpperCase();

    const carouselData = lesson.sections.map((section, index) => {
        return {
            id: index,
            title: section
        };
    });

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <div style={{backgroundColor: "#9cb9ca", height: "100vh", width: "100vw"}}>
             <Row justify="space-around" align="middle" >
                <Col span={20}>
                    <h2 style={{paddingTop: "1rem", fontWeight: "550", fontSize: "3.2rem", fontStyle: "italic"}}>{lessonTitle}</h2>
                    <Carousel responsive={responsive}>
                        {carouselData && carouselData.map((item) => (
                            <div style={styles.lessonSlide}>
                                <h2 style={{paddingBottom: "0.5rem", fontWeight: "500"}}>{item.title.heading}</h2>
                                <h5 style={{paddingBottom: "0.5rem", fontWeight: "400", color:"#ec8f4b"}}>{item.title.subheading}</h5>
                                <p>{item.title.text}</p>
                            </div>
                        ))}
                    </Carousel>
                    {/* <Carousel >
                           {carouselData && carouselData.map((item) => (
                            <div >
                                <h2 style={{paddingBottom: "0.5rem", fontWeight: "500"}}>{item.title.heading}</h2>
                                <h5 style={{paddingBottom: "0.5rem", fontWeight: "400", color:"#ec8f4b"}}>{item.title.subheading}</h5>
                                <p>{item.title.text}</p>
                            </div>
                        ))}
                    </Carousel> */}
               </Col>
            </Row>
        </div>
    )
};

const styles = {
    lessonSlide: {
        padding: "2rem",
        backgroundColor: 'white',
         borderRadius: "15px"
    },
}

export default Lesson;