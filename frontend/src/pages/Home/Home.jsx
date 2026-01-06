import React from 'react';
import { useTitle } from '../../hooks/useTitle';
import PopularClasses from './PopularClasses/PopularClasses';
import PopularInstructor from './PopularTeacher/PopularInstructor';
import HeroContainer from './Hero/HeroContainer';
import Gallary from './Gallary/Gallary';
import Counter from './Counter/Counter';
import How from './How/How';
import Developers from './Developers';

const Home = () => {
    useTitle('Home | Gaming Hustlers - Play Beyond');
    return (
        <section>
            <HeroContainer />
            <How />
            <div className="max-w-screen-xl mx-auto">
            <Gallary/>
            <Counter />
                <PopularClasses />
                
                <PopularInstructor />
                <Developers />
            </div>
        </section>
    );
};

export default Home;