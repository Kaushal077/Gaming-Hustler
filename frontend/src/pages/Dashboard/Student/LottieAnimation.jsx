import React, { useEffect } from 'react';

const LottieAnimation = () => {
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
            src="https://lottie.host/a53beb19-c6dc-4048-938c-476c7fa6d4c4/yIlvnupnDz.json"
            background="transparent"
            speed="1"
            style={{ width: '700px', height: '300px' }}
            loop
            autoplay
        />
    );
};

export default LottieAnimation;
