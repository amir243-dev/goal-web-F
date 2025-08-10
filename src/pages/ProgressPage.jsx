// pages/ProgressPage.js
import React, { useEffect, useState } from "react";
import ladda from "../assets/amico.png";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const ProgressPage = () => {
  const { id } = useParams();
  const [goal, setGoal] = useState([]);
  const [newProgress, setNewProgress] = useState("");
  const navigate = useNavigate();

  const fetchEachGoalByID = async () => {
    try {
      const fetchEach = await fetch(
        `https://goal-web-b.onrender.com/api/goals/${id}`
      );

      if (fetchEach.ok) {
        const fetchedGoal = await fetchEach.json();
        setGoal(fetchedGoal);
        setNewProgress(fetchedGoal.progress);
      } else {
        console.error("Goal not Found");
      }
    } catch (err) {
      console.log("I made a mistake", err);
    }
  };
  // ================================================================
  useEffect(() => {
    fetchEachGoalByID();
  }, [id]);
  // ===================================================================
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const patchedGoal = await fetch(
        `https://goal-web-b.onrender.com/api/goals/${id}/progress`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ progress: Number(newProgress) }),
        }
      );
      if (patchedGoal.ok) {
        navigate("/allgoals");
        return toast.success("Goal Successfully Updated");
      } else {
        toast.error("Failed to Update Progress");
        console.error("Failed to update Progress");
      }
    } catch (err) {
      console.error("Error Updating Progress");
    }
  };
  // ===================================================================
  return (
    <div className="newgoal my-[48px] mx-[100px] flex items-start gap-5">
      <form onSubmit={handleSubmit} className="new-forms text-left">
        <h2 className="font-bold text-4xl text-black m-0">Progress</h2>

        <div className="uper-form mt-6">
          <div className="goal-t mb-4">
            <h4 className="text-base font-normal text-black/70">Goal Title</h4>
            <p className="text-base font-semibold text-black">{goal.title}</p>
          </div>

          <div className="goal-d">
            <h4 className="text-base font-normal text-black/70">
              Goal Description
            </h4>
            <p className="text-base font-normal text-black leading-[19.5px]">
              {goal.description}
            </p>
          </div>
        </div>

        <div className="lower-form flex flex-col items-start w-[656px] bg-[#0585cd29] p-[60px_50px] gap-[66px]">
          <input
            type="number"
            value={newProgress}
            onChange={(event) => {
              const num = Number(event.target.value);
              if (num < 0) {
                setNewProgress(0);
              } else if (num > 100) {
                setNewProgress(100);
              } else {
                setNewProgress(num);
              }
            }}
            placeholder="Goal Progress"
            className="w-[329px] px-[10px] py-[15px] rounded-[5px] border border-[#0585cd] bg-[#0585cd05] placeholder:text-black/70"
          />

          <div className="progress w-[368px] flex flex-col items-start gap-3">
            <div className="progress-text flex items-start gap-[265px]">
              <p className="m-0 text-base font-normal text-black/80">
                Progress
              </p>
              <p className="m-0 text-base font-normal text-black/80">
                {goal.progress}%
              </p>
            </div>
            <div className="loader-con bg-[#d9d9d9] w-full h-3 rounded-[10px]">
              <div
                className="loader-bar h-3 rounded-[10px]"
                style={{
                  width: `${goal.progress}%`,
                  backgroundColor: goal.progress < 50 ? "#ff0000cc" : "#339933",
                }}
              ></div>
            </div>
          </div>

          <button
            onClick={() => {}}
            type="submit"
            className="bg-[#0585cd] px-4 py-4 rounded-[10px] text-white font-semibold text-xl cursor-pointer"
          >
            Update Progress
          </button>
        </div>
      </form>

      <span>
        <img src={ladda} alt="" />
      </span>
    </div>
  );
};

export default ProgressPage;
