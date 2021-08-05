import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "./vote.css";

const Dat = (props) => {
  const [timerDays, setTimerDay] = useState("");
  const [timerHours, setTimerHours] = useState("");
  const [timerMinutes, setTimerMinutes] = useState("");
  const [timerSeconds, setTimerSeconds] = useState("");

  let interval = useRef();

  const parentCallBack = (a) => {
    props.checkAvailable(a);
  };

  // const getDate = () => {
  //   axios.get("/time/" + localStorage.getItem("hostid")).then((response) => {
  //     console.log("Data is recieved");
  //     console.log(response.data);
  //   });
  // };

  // getDate();

  const startTimer = () => {
    // console.log(props.date);
    // console.log(props.time);
    const countdownDates = new Date(props.date + "," + props.time).getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDates - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hour = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        //stop timer
        clearInterval(interval.current);
        parentCallBack(1);
      } else {
        // update timer
        setTimerDay(days);
        setTimerHours(hour);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
        parentCallBack(0);
      }
    }, 1000);
  };
  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  });
  return (
    <>
      <section class="timer-container">
        <section class="timer">
          <div>
            <i class="fas fa-clock"></i>
          </div>
          <div class="time">
            <section>
              <p>{timerDays}</p>
              <p>
                <small>Days</small>
              </p>
            </section>
            <span>:</span>
            <section>
              <p>{timerHours}</p>
              <p>
                <small>hours</small>
              </p>
            </section>
            <span>:</span>
            <section>
              <p>{timerMinutes}</p>
              <p>
                <small>minutes</small>
              </p>
            </section>
            <span>:</span>
            <section>
              <p>{timerSeconds}</p>
              <p>
                <small>seconds</small>
              </p>
            </section>
          </div>
        </section>
      </section>
    </>
  );
};

export default Dat;
