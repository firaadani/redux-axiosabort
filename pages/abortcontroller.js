import { useState, useEffect } from "react";
import axios from "axios";

function MyComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastRequestTime, setLastRequestTime] = useState(0);

  const controller = new AbortController();

  const fetchData = async () => {
    setLoading(true);
    console.log("MAKING A REQUEST :", {
      date: new Date().toLocaleTimeString(),
    });
    try {
      const response = await axios.get(
        "https://run.mocky.io/v3/282670fd-0002-4d9f-8efe-d5772b06ac4f?mocky-delay=10000ms",
        {
          signal: controller.signal,
        }
      );
      setData(response.data);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("ERROR MESSAGE :", error.message);
        setLoading(false);
      } else {
        console.error(error);
      }
    }
    setLoading(false);
  };

  const cancelRequest = () => {
    controller.abort();
    console.log("REQUEST CANCELED : user canceled");
    setLoading(false);
  };

  // Cancel the request after 5 seconds
  //   setTimeout(() => {
  //     controller.abort();
  //     console.log("REQUEST CANCELED : exceeding 8s");
  //     setLoading(false);
  //   }, 8000);

  useEffect(() => {
    setLoading(true);
    fetchData();

    return () => {
      setLoading(false);
      controller.abort();
      console.log("REQUEST CANCELED : aborted by useEffect return");
    };
  }, [lastRequestTime]);

  const handleRefresh = () => {
    setLoading(true);
    setLastRequestTime(Date.now());
    fetchData();
    console.log("REQUEST REFRESHED");
  };

  useEffect(() => {
    console.log("loading", {
      loading,
      data,
      date: new Date().toLocaleTimeString(),
    });

    return () => {};
  }, [loading]);

  return (
    <div className="flex flex-col flex-wrap gap-2 w-100 h-screen items-center justify-center bg-slate-100">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col items-center w-100 gap-5">
          <button
            className="bg-slate-200 px-5 py-3 rounded rounded-xl drop-shadow-lg"
            onClick={fetchData}
          >
            Fetch Data
          </button>
        </div>
      )}
      {loading && (
        <div className="flex flex-row items-center w-100 gap-5">
          <button
            className="bg-slate-200 px-5 py-3 rounded rounded-xl drop-shadow-lg"
            onClick={handleRefresh}
          >
            Refresh
          </button>
          <button
            className="bg-slate-200 px-5 py-3 rounded rounded-xl drop-shadow-lg"
            onClick={cancelRequest}
          >
            Cancel Request
          </button>
        </div>
      )}
    </div>
  );
}

export default MyComponent;
