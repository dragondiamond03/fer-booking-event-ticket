import React from 'react';

const Heading = ({ title, subtitle, center }) => {
    return (
        <div className={center ? 'text-center' : 'text-start'}>
            <div className="text-2xl font-bold">{title}</div>
            <div className="mt-2 font-light text-neutral-500">{subtitle}</div>
        </div>
    );
};

export default Heading;
