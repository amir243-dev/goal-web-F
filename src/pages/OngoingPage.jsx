import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import pen from "../assets/pen.png";
import can from "../assets/can.png";
import toast from "react-hot-toast";

const OngoingPage = () => {
  const [ongGoals, setOngGoals] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchOngGoals = async () => {
    try {
      const getGoalsAPI = await fetch(
        "https://goal-web-b.onrender.com/api/goals/ongoing"
      );

      const onGoaalB = await getGoalsAPI.json();
      console.log(onGoaalB);

      setOngGoals(onGoaalB);
    } catch (error) {
      console.log("I made a mistake");
    } finally {
      setLoading(false);
    }
  };

  // =============================================================
  useEffect(() => {
    fetchOngGoals();
  }, []);
  // ===============================================================
  const handleDelete = async (id) => {
    try {
      await fetch(`https://goal-web-b.onrender.com/api/goals/${id}/delete`, {
        method: "DELETE",
      });
      fetchOngGoals;
      return toast.success("Goal Successfully Deleted");
    } catch (error) {
      toast.error("Failed to delete Goal");
      console.log("Failed to delete", error);
    }
  };

  // =================================================================
  return (
    <div className="mx-[100px] my-[32px]">
      <div className="flex items-center justify-between">
        <h2 className="font-montserrat font-bold text-[36px] text-black m-0">
          Ongoing
        </h2>
        <Link
          to="/newgoal"
          className="no-underline font-montserrat font-semibold text-[20px] text-[#0585cd] cursor-pointer"
        >
          + Create New Goals
        </Link>
      </div>

      <div className="mt-[40px] flex flex-col gap-[60px]">
        {loading && (
          <div className="h-20 w-20 rounded-full border-[#0585cd] border-t-transparent animate-spin"></div>
        )}
        {ongGoals.map((ongGoal) => {
          return (
            <div
              className="text-start px-[35px] pt-[24px] pb-[50px] shadow-[0_4px_4px_rgba(0,0,0,0.2)] flex flex-col gap-[35px]"
              key={ongGoal._id}
            >
              <div className="flex flex-col gap-[12px]">
                <h3 className="font-montserrat font-semibold text-[28px] text-black m-0 break-words">
                  {ongGoal.title}
                </h3>
                <h4 className="font-montserrat font-semibold text-[20px] text-[#0585cd] m-0 break-words">
                  In Progress
                </h4>
                <p className="font-montserrat font-normal text-[20px] leading-[24.38px] text-black/80 m-0 break-words">
                  {ongGoal.description}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="w-[368px] flex flex-col items-start gap-[12px]">
                  <div className="flex justify-between w-full items-start">
                    <p className="font-montserrat font-normal text-[16px] text-black/80 m-0">
                      Progress
                    </p>
                    <p className="font-montserrat font-normal text-[16px] text-black/80 m-0">
                      {ongGoal.progress}%
                    </p>
                  </div>
                  <div className="w-full bg-[#d9d9d9] h-[12px] rounded-[10px]">
                    <div
                      className="h-[12px] rounded-[10px]"
                      style={{
                        width: `${ongGoal.progress}%`,
                        backgroundColor:
                          ongGoal.progress < 50 ? "#ff0000cc" : "#339933",
                      }}
                    ></div>
                  </div>
                </div>

                <div className="w-fit flex gap-[100px] cursor-pointer">
                  <Link
                    to={`/progress/${ongGoal._id}`}
                    className="no-underline flex items-center justify-center gap-[10px] rounded-[10px] p-[16px] bg-[#0585cd] cursor-pointer"
                  >
                    <img src={pen} alt="Update icon" />
                    <p className="font-montserrat font-semibold text-[20px] text-white m-0">
                      Update Progress
                    </p>
                  </Link>
                  <button
                    onClick={() => {
                      handleDelete(ongGoal._id);
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

export default OngoingPage;
