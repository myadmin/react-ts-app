import React, { useState } from "react";

const B = () => {
    const globalEvent = window.myEvent;

    const [newParams, setNewParams] = useState("");

    const handler = (params: string) => {
        setNewParams(params);
    };

    const bindHandler = () => {
        globalEvent.on('someEvent', handler);
    };

    return (
        <div>
            <button onClick={bindHandler}>点我监听A组件的通知</button>
            <div>A组件传入的内容是[{newParams}]</div>
        </div>
    );
};

export default B;
