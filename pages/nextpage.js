import React from "react";
import { useSelector } from "react-redux";

const NextPage = () => {
  const count = useSelector((state) => state.counter.count);
  return (
    <div className="flex flex-row justify-center items-center w-full h-screen bg-slate-100 gap-5">
      Current count is : {count}
    </div>
  );
};

export default NextPage;
