import React, { useEffect } from 'react'

const ClassesLottie = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs';
        script.type = 'module';
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <dotlottie-player
            src="https://lottie.host/505b0e76-80e1-495e-ba26-60a651fce7de/tthh1nr8Qa.json"
            background="transparent"
            speed="1"
            style={{ width: '250px', height: '280px' }}
            loop
            autoplay
        />
    );
};

export default ClassesLottie