import { useEffect, useRef, useState } from "react";
import {
    StepBackwardOutlined,
    StepForwardOutlined,
    PauseCircleOutlined,
    PlayCircleOutlined,
} from "@ant-design/icons";
import "../mock";
import Axios from "axios";
import AudioSpectrum from "react-audio-spectrum";
import "./player.less";

const Music = () => {
    // state = {
    //     songData: [], // 页面数据,播放列表
    //     isPlaying: false, // 播放状态, 播放/暂停
    //     currentIndex: 0, // 当前播放歌曲的索引, 默认为0的歌曲
    //     duration: 0, // 歌曲总时长
    //     currentTime: 0 // 当前播放时间
    // }
    const [songData, setSongData] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef(null);
    const progressBar = useRef(null);
    const progress = useRef(null);
    const progressBarBtn = useRef(null);

    // 把当前歌曲的索引存到currentIndex
    const handleClick = (index: number) => {
        setCurrentIndex(index);
        togglePlay();
        setIsPlaying(true);
    };

    // 播放/暂停切换
    const togglePlay = () => {
        setIsPlaying(!isPlaying);
        const audio: any = audioRef.current;
        isPlaying ? audio.play() : audio.pause();
    };

    // 上一首
    const handlePrev = () => {
        if (songData.length === 1) {
            loop();
            return;
        } else {
            let index = currentIndex - 1;
            if (index === -1) {
                index = songData.length - 1;
            }
            setCurrentIndex(index);
            togglePlay();
            setIsPlaying(true);
        }
    };

    // 下一首
    const handleNext = () => {
        if (songData.length === 1) {
            loop();
            return;
        } else {
            let index = currentIndex + 1;
            if (index === songData.length) {
                index = 0;
            }
            setCurrentIndex(index);
            togglePlay();
            setIsPlaying(true);
        }
    };

    // 循环
    const loop = () => {
        const audio: any = audioRef.current;
        audio.currentTime = 0;
        audio.play();
        setIsPlaying(true);
    };

    // 歌曲准备好就获取歌曲时长
    const onCanplay = () => {
        const audio: any = audioRef.current;
        setDuration(audio.duration);
    };

    // 计算当前播放时间
    const currentTimeFn = (e: any) => {
        const currentTime = e.target.currentTime;
        setCurrentTime(currentTime);
        percent();
    };

    // 初始化歌曲时间格式
    const formatTime = (time: any) => {
        time = Math.floor(time);
        const minute = fillIn0(Math.floor(time / 60));
        const second = fillIn0(Math.floor(time % 60));
        return `${minute}:${second}`;
    };

    // 时间前面补0
    const fillIn0 = (num: any, n = 2) => {
        let len = num.toString().length;
        while (len < n) {
            num = "0" + num;
            len++;
        }
        return num;
    };

    // 点击进度条
    const handleProgress = (e: any) => {
        e.stopPropagation();
        const audioRef1: any = audioRef.current;
        const progressBar1: any = progressBar.current;

        // 偏移量 = 点击的X坐标 - 进度条离页面左边的距离
        const newLeft = e.pageX - progressBar1.offsetLeft;
        console.log(newLeft);

        // 当前时间 / 总时长 === 当前偏移的长度 / 进度条总长度
        // 当前时间 = (当前偏移的长度 / 进度条总长度) * 总时长
        const currentTime = (duration * newLeft) / progressBar1.clientWidth;
        audioRef1.currentTime = currentTime;

        _offsetWidth(newLeft);
        togglePlay();
        setCurrentTime(currentTime);
        setIsPlaying(true);
    };

    // 正常播放进度条
    const percent = () => {
        const progressBarRef: any = progressBar.current;
        const progressBarBtnRef: any = progressBarBtn.current;
        const percent = currentTime / duration;
        const barWidth = progressBarRef.offsetWidth - progressBarBtnRef.offsetWidth;
        const offsetWidth = percent * barWidth;
        _offsetWidth(offsetWidth);
    };

    // 进度偏移量
    const _offsetWidth = (offsetWidth: any) => {
        const progressRef: any = progress.current;
        const progressBarBtnRef: any = progressBarBtn.current;
        progressRef.style.width = `${offsetWidth}px`;
        progressBarBtnRef.style.transform = `translateX(${offsetWidth}px)`;
    };

    useEffect(() => {
        Axios.get("/mock")
            .then((res) => {
                if (res.data) {
                    setSongData(res.data.songData);
                } else {
                    return "没有音乐";
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // const { songData, currentIndex, isPlaying, duration, currentTime } = this.state
    // 当前播放歌曲
    const currenSong: any =
        songData.find((item: any, index: number) => index === currentIndex) || {};

    return (
        <div className="player">
            <audio
                id="audioId"
                src={currenSong.audio}
                ref={audioRef}
                onCanPlay={onCanplay}
                onTimeUpdate={currentTimeFn}
                onEnded={handleNext}
            />
            <div className="player-wrapper">
                <div className="operation-wrapper">
                    <div className="operation">
                        <div
                            className={`${isPlaying ? "bgCover play" : "bgCover play pause"}`}
                        >
                            <img src={currenSong.cover} alt="" />
                        </div>
                        <div className="prev" onClick={handlePrev}>
                            <StepBackwardOutlined />
                        </div>
                        <div className="play" onClick={togglePlay}>
                            {isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
                        </div>
                        <div className="next" onClick={handleNext}>
                            <StepForwardOutlined />
                        </div>
                        <div
                            className="progressBar"
                            ref={progressBar}
                            onClick={(e) => {
                                handleProgress(e);
                            }}
                        >
                            <div className="progress" ref={progress}></div>
                            <div className="proBtn" ref={progressBarBtn}></div>
                        </div>
                        <div className="time">
                            <span> {formatTime(currentTime)} </span>/
                            <span> {formatTime(duration)} </span>
                        </div>
                    </div>
                </div>
                <div className="songlist-wrapper">
                    <div className="songlist">
                        {songData.map((item: any, index: number) => {
                            return (
                                <div
                                    className={`${index === currentIndex ? "active" : ""}`}
                                    key={index}
                                    onDoubleClick={() => handleClick(index)}
                                >
                                    {index + 1}. {item["name"]}
                                    <span className="singer"> - {item["singer"]}</span>
                                </div>
                            );
                        })}
                    </div>
                    <div className="spectrum">
                        <AudioSpectrum
                            id="audio-spectrum"
                            height={315}
                            width={530}
                            audioId={"audioId"}
                            capColor={"#00fff4"}
                            capHeight={5}
                            meterWidth={8}
                            meterCount={48}
                            meterColor={[
                                { stop: 0, color: "#f00" },
                                { stop: 0.5, color: "#0CD7FD" },
                                { stop: 1, color: "#8d95dc" },
                            ]}
                            gap={5}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Music;
