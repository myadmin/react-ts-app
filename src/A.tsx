import React, { useState } from 'react';

const A = () => {
    const globalEvent = window.myEvent;

    const [infoToB] = useState('哈哈哈哈，我来自A组件');

    const reportToB = () => {
        globalEvent.emit('someEvent', infoToB);
    }

    return <button onClick={reportToB}>点我把state传递给B</button>;
};

export default A;
