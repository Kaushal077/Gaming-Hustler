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
            // src="https://lottie.host/2580196f-844c-4f74-955c-f61530ffeaf0/2GMv5HFaYL.json"
            src="https://assets10.lottiefiles.com/packages/lf20_i9arxzcg.json"
            background="transparent"
            speed="1"
            style={{ width: '400px', height: '350px' }}
            direction="1"
            playMode="normal"
            loop
            autoplay
        />
    );
};

export default LottieAnimation;