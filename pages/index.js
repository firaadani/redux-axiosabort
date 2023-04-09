import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../slices/counterSlice";

export default function Counter() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.count);
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-slate-100 gap-10">
      <div className=" flex flex-row gap-5">
        <button
          className="bg-slate-200 px-5 py-3 rounded rounded-xl drop-shadow-lg"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <span className="px-10 text-3xl">{count}</span>
        <button
          className="bg-slate-200 px-5 py-3 rounded rounded-xl drop-shadow-lg"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </div>
      <div className=" flex flex-row gap-5">
        <button
          className="bg-slate-200 px-5 py-3 rounded rounded-xl drop-shadow-lg"
          onClick={() => router.push("/nextpage")}
        >
          Go To Next Page
        </button>
      </div>
    </div>
  );
}
