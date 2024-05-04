import React, { useState, useEffect } from "react";
import axios from "axios";

const sharedClasses = {
  input:
    "mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
  button:
    "mt-4 w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded",
  toast: "hidden mt-4 p-4 bg-zinc-800 text-white text-sm rounded-lg",
};

const PAGE_SIZE = 5;
const BUTTON_CLASS = "py-2 px-4 font-bold";
const PREV_BUTTON_CLASS =
  "bg-zinc-300 hover:bg-zinc-400 text-zinc-800 rounded-l";
const NEXT_BUTTON_CLASS =
  "bg-green-400 hover:bg-green-500 text-white rounded-r";

const Countdown = ({ countdown }) => (
  <div className="fixed bottom-0 left-0 right-0 z-50 bg-white p-4 text-center">
    Countdown: {countdown}
  </div>
);

const ThirdComponent = () => {
  const [timerValue, setTimerValue] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [fetchingData, setFetchingData] = useState(false);
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const startCountdown = () => {
    if (!timerValue) {
      alert("Please Enter Time");
      return;
    }
    setShowForm(false);
    setFetchingData(true);
    setCountdown(parseInt(timerValue));
    setTimerValue("");
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://api.knowmee.co/api/v1/master/get-country-list"
      );
      setData(response.data.responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setFetchingData(false);
    }
  };

  useEffect(() => {
    let interval;
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      fetchData();
    }
    return () => clearInterval(interval);
  }, [countdown]);

  const nextPage = () => {
    setCurrentPage((prev) =>
      prev < Math.ceil(data.length / PAGE_SIZE) ? prev + 1 : prev
    );
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const getPageData = () => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return data.slice(startIndex, endIndex);
  };

  return (
    <div className="container">
      <div className="max-w-sm mx-12 p-8">
        {countdown > 0 && <Countdown countdown={countdown} />}
        {showForm ? (
          <>
            <label
              htmlFor="timerInput"
              className="block text-sm font-medium text-zinc-700"
            >
              Enter Timer Value (in seconds):
            </label>
            <input
              type="number"
              id="timerInput"
              className={sharedClasses.input}
              value={timerValue}
              onChange={(e) => setTimerValue(e.target.value)}
            />
            <button className={sharedClasses.button} onClick={startCountdown}>
              Start timer
            </button>
          </>
        ) : (
          <>
            {fetchingData && (
              <div className="mt-4 text-center text-zinc-700">
                Fetching Data, Please wait...
              </div>
            )}
            {!fetchingData && data.length > 0 && (
              <div className="mt-4">
                <ul>
                  {getPageData().map((item) => (
                    <li key={item.country_id} className="text-zinc-700">
                      {item.country_name}
                    </li>
                  ))}
                </ul>
                <div className="flex ml-96 justify-between w-full mt-4">
                  <button
                    onClick={prevPage}
                    className={`${BUTTON_CLASS} ${PREV_BUTTON_CLASS}`}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <button
                    onClick={nextPage}
                    className={`${BUTTON_CLASS} ${NEXT_BUTTON_CLASS}`}
                    disabled={
                      currentPage === Math.ceil(data.length / PAGE_SIZE)
                    }
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ThirdComponent;
