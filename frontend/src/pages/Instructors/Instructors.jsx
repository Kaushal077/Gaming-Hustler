import React from 'react';
import { useTitle } from '../../hooks/useTitle';
import ShowHost from './All/ShowInstructors';

const Instructors = () => {
    useTitle('Host | Gaming Hustlers - Play beyond');
    return (
        <section>
            <ShowHost />
        </section>
    );
};

export default Instructors;