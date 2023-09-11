import React, {useEffect, useState} from 'react';
import styled from "styled-components";

const TimerBox = styled.div`
  color: red
`

const TimerComponent = () => {

    const [seconds, setSeconds] = useState<number>(180)

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prevSeconds) => {
                if (prevSeconds > 0) {
                    return prevSeconds - 1
                } else {
                    return 180
                }
            })
        }, 1000)

        return () => clearInterval(interval)

    }, [])

    const formatTime = (): string => {
        const min = Math.floor(seconds / 60)
        const sec = seconds % 60
        return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`
    };

    return (
        <TimerBox>
            {formatTime()}
        </TimerBox>
    )
}

export default TimerComponent