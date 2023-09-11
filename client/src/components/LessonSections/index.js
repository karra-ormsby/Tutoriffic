import React from 'react';

const LessonSections = ({sections}) => {
    return (
        <div>
            {sections &&
                sections.map((section) => (
                    <div key={section}>
                        <div>
                            <h2>
                                {section.heading} <br />
                            </h2>
                            <h3>
                                {section.subheading} <br />
                            </h3>
                            <p>
                                {section.text} <br />
                            </p>
                        </div>
                    </div>
                ))}
        </div>
    )
};

export default LessonSections