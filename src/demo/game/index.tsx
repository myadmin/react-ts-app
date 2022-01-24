import { useEffect, useRef } from "react";

const Game = () => {
    const myCanvas = useRef<HTMLCanvasElement>(null);

    const init = () => {
        console.log("myCanvas.current", myCanvas.current);
        const canvas = myCanvas.current;
        const ctx = canvas?.getContext("2d");
        if (canvas) {
            canvas.width = 600;
            canvas.height = 600;
            let w = canvas.width;
            let h = canvas.height;
        }
    };

    useEffect(() => {
        init();
    }, []);

    return <canvas ref={myCanvas}></canvas>;
};

export default Game;
