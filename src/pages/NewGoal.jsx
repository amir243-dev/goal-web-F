import React, { useState } from "react";
import ladda from "../assets/amico.png";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const NewGoal = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState("");

  // IN USING CONST, NO VALUE MUST BE UNDEFINED. HENCE THE USESTATE HAS TO BE DEFINED EVEN IF IT IS EMPTY

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newGoal = { title, description, progress: Number(progress) };

    try {
      const postNewGoal = await fetch(
        "https://goal-web-b.onrender.com/api/goals/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newGoal),
        }
      );
      if (postNewGoal.ok) {
        navigate("/allgoals");
        return toast.success("Goal Successfully Created");
      } else {
        console.error("Failed to post goal");
        toast.error("Failed to create Goal");
      }
    } catch (err) {
      console.error("Error creating goal", err);
    }
  };
  // =======================================================================
  return (
    <div className="flex items-start gap-[20px] mx-[100px] my-[48px]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-start w-[656px] bg-[#0585cd29] p-[60px_50px] gap-[66px]"
      >
        <input
          type="text"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          required
          placeholder="Goal Title"
          className="w-[329px] p-[15px_10px] rounded-[5px] border border-[#0585cd] bg-[#0585cd05] placeholder:font-montserrat placeholder:font-normal placeholder:text-[16px] placeholder:text-black/70"
        />
        <textarea
          rows="15"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
          placeholder="Goal Description"
          className="w-[556px] p-[15px_10px] rounded-[5px] border border-[#0585cd] bg-[#0585cd05] placeholder:font-montserrat placeholder:font-normal placeholder:text-[16px] placeholder:text-black/70"
        />
        <input
          type="number"
          value={progress}
          onChange={(event) => {
            const num = Number(event.target.value);

            if (num < 0) {
              setProgress(0);
            } else if (num > 100) {
              setProgress(100);
            } else {
              setProgress(num);
            }
          }}
          min="0"
          max="100"
          required
          placeholder="Goal Progress"
          className="w-[329px] p-[15px_10px] rounded-[5px] border border-[#0585cd] bg-[#0585cd05] placeholder:font-montserrat placeholder:font-normal placeholder:text-[16px] placeholder:text-black/70"
        />
        <button
          type="submit"
          className="bg-[#0585cd] p-[16px] rounded-[10px] font-montserrat font-semibold text-[20px] text-white cursor-pointer"
        >
          Create Goal
        </button>
      </form>
      <span>
        <img src={ladda} alt="Illustration" />
      </span>
    </div>
  );
};

export default NewGoal;
