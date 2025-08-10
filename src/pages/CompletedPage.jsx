import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import pen from "../assets/pen.png";
import can from "../assets/can.png";

const CompletedPage = () => {
  const [comGoals, setComGoals] = useState([]);
  // ====================================

  const fetchGoals = async () => {
    try {
      const getGoalAPI = await fetch(
        "https://goal-web-b.onrender.com/api/goals/completed"
      );
      const compGoaalB = await getGoalAPI.json();
      console.log(compGoaalB);
      setComGoals(compGoaalB);
    } catch (err) {
      console.log("i made a mistake");
    }
  };

  // ===============================================================
  useEffect(() => {
    fetchGoals();
  }, []);
  // ===============================================================
  const handleDelete = async (id) => {
    try {
      await fetch(`https://goal-web-b.onrender.com/api/goals/${id}/delete`, {
        method: "DELETE",
      });
      fetchGoals();
    } catch (error) {
      "Failed to delete", error;
    }
  };
  // ==================================================================
  return (
    <div className="mx-[100px] my-[32px]">
      <div className="flex items-center justify-between">
        <h2 className="font-montserrat font-bold text-[36px] text-black m-0">
          Completed
        </h2>
        <Link
          to="/newgoal"
          className="no-underline font-montserrat font-semibold text-[20px] text-[#0585cd] cursor-pointer"
        >
          + Create New Goals
        </Link>
      </div>

      <div className="mt-[40px] flex flex-col gap-[60px]">
        {comGoals.map((comGoal) => {
          return (
            <div
              className="text-start px-[35px] pt-[24px] pb-[50px] shadow-[0_4px_4px_rgba(0,0,0,0.2)] flex flex-col gap-[35px]"
              key={comGoal._id}
            >
              <div className="flex flex-col gap-[12px]">
                <h4 className="font-montserrat font-semibold text-[20px] text-[#0585cd] m-0">
                  Congratulations 🎉
                </h4>
                <h3 className="font-montserrat font-semibold text-[28px] text-black m-0">
                  {comGoal.title}
                </h3>
                <p className="font-montserrat font-normal text-[20px] leading-[24.38px] text-black/80 m-0">
                  {comGoal.description}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="w-[368px] flex flex-col items-start gap-[12px]">
                  <div className="flex justify-between w-full items-start">
                    <p className="font-montserrat font-normal text-[16px] text-black/80 m-0">
                      Progress
                    </p>
                    <p className="font-montserrat font-normal text-[16px] text-black/80 m-0">
                      {comGoal.progress}%
                    </p>
                  </div>
                  <div className="w-full bg-[#d9d9d9] h-[12px] rounded-[10px]">
                    <div className="h-[12px] w-full rounded-[10px] bg-[#339933]"></div>
                  </div>
                </div>

                <div className="w-[30%] flex justify-between cursor-pointer">
                  <Link
                    to={`/progress/${comGoal._id}`}
                    className="no-underline flex items-center justify-center gap-[10px] rounded-[10px] p-[16px] bg-[#0585cd] cursor-pointer"
                  >
                    <img src={pen} alt="Edit icon" />
                    <p className="font-montserrat font-semibold text-[20px] text-white m-0">
                      Edit
                    </p>
                  </Link>
                  <button
                    onClick={() => {
                      handleDelete(comGoal._id);
                    }}
                    className="no-underline flex items-center justify-center gap-[10px] rounded-[10px] p-[16px] bg-white border border-[#0585cd] cursor-pointer"
                  >
                    <img src={can} alt="Delete icon" />
                    <p className="font-montserrat font-semibold text-[20px] text-[#0585cd] m-0">
                      Delete
                    </p>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CompletedPage;
