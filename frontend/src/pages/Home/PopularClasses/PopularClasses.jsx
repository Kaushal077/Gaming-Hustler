import React, { useEffect, useState } from 'react';
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import Card from './Card';

const PopularClasses = () => {
    const axiosFetch = useAxiosFetch();
    const [classes, setClasses] = useState([]);
    useEffect(()=>{
        const fetchClasses = async () => {
            const response = await axiosFetch.get('/popular_classes');
            setClasses(response.data);
        };
        fetchClasses();
    },[])
    return (
        <div className='md:w-[80%] mx-auto'>
            <div className="">
                <h1 className='text-5xl font-bold text-center text-black dark:text-white'>Our <span className='text-secondary'>Popular</span> Tournaments</h1>
                <div className="w-[40%] text-center mx-auto my-4">
                    <p className="text-gray-500">
            Explore our <strong>Popular Tournaments </strong>based on players enrolled.
          </p>
                </div>
                <i>
            <img src="https://www.gamerji.com/img/title-shape.png" alt="Title Shape" className="mx-auto" />
        </i>
            </div>


        <div className="grid  md:grid-cols-2 lg:grid-cols-3">
            {
                classes.map((item, index) => <Card id={item._id} key={index} availableSeats={parseInt(item.slot) - parseInt(item.totalEnrolled)} price={parseInt(item.prizePoolFirst) +
                    parseInt(item.prizePoolSecond) +
                    parseInt(item.prizePoolThird)} name={item.name} image={item.image} totalEnrolled={item.totalEnrolled} />)
            }
        </div>

        </div>
    );
};

export default PopularClasses;