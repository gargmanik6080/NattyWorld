import React, { useState, useEffect } from "react";

const GenerateDiet = () => {
  const [dietPlan, setDietPlan] = useState("");
  const [currentUser, setcurrentUser] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    height: "",
    weight: "",
    gender: "",
    age: "",
    foodSource: "",
    fitnessGoal: "",
    protein: "",
    carbs: "",
    fats: "",
    otherPreferences: "",
    country: "",
    totalCalories: "",
  });

  useEffect(() => {
    const user=JSON.parse(localStorage.getItem('user'));
    // console.log(user?.loggedInUser?.name)
    setcurrentUser(user);
}, [setcurrentUser])

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const generateDietByAI = async (formData) => {
    const res = await fetch("/api/v1/ai/generateDiet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const response = await res.json();
    if (!response?.data?.dietPlan?.content) {
      alert("Cannot fetch Diet Plan");
    }
    setDietPlan(response.data.dietPlan.content);
  };

  const saveDiet = async (formData) => {
    const dietDetails={
      name:`${formData.fitnessGoal} | ${formData.foodSource} | ${formData.gender} | ${formData.totalCalories}`,
      plan : dietPlan
    }
    const res = await fetch("/api/v1/diet/addDiet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dietDetails),
    });
    const response = await res.json();

    if (!response?.data) {
      alert("Cannot save Diet Plan");
    } 

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await generateDietByAI(formData);
  };

  return (
    <>
      <div className="flex-col pt-16 bg-[#0d0d0d] flex lg:flex-row ">
        <div className="leftList overflow-y-auto h-[90vh] flex flex-col items-center w-[100%] lg:w-[35%] bg-[#171717]">
          <div className="formForDiet p-10">
            <h2 className="text-3xl font-bold text-white pb-8">Generate Your Diet</h2>
            <form method="POST" className=" flex flex-col gap-6">
              <div className="">
                <label className="text-white" htmlFor="name">
                  Name
                </label>
                <br />
                <input
                  name="name"
                  onChange={(e) => handleInput(e)}
                  className="py-1 px-4 w-[100%] rounded-md focus:outline-none"
                  type="text"
                  defaultValue={currentUser?.name}
                />
              </div>
              <div className="">
                <label className="text-white" htmlFor="name">
                  Height (cms)
                </label>
                <br />
                <input
                  name="height"
                  onChange={(e) => handleInput(e)}
                  className="py-1 px-4 w-[100%] rounded-md "
                  type="number"
                  defaultValue={currentUser?.height}
                />
              </div>
              <div className="">
                <label className="text-white" htmlFor="name">
                  Weight (kgs)
                </label>
                <br />
                <input
                  name="weight"
                  onChange={(e) => handleInput(e)}
                  className="py-1 px-4 w-[100%] rounded-md "
                  type="number"
                  defaultValue={currentUser?.weight}
                />
              </div>
              <div className="">
                <label className="text-white" htmlFor="name">
                  Gender
                </label>
                <br />
                <select
                  name="gender"
                  value={formData.gender}
                  id=""
                  className="py-1 px-4 w-[100%] rounded-md"
                  onChange={(e) => handleInput(e)}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="">
                <label className="text-white" htmlFor="name">
                  Age
                </label>
                <br />
                <input
                  name="age"
                  onChange={(e) => handleInput(e)}
                  className="py-1 px-4 w-[100%] rounded-md "
                  type="number"
                />
              </div>
              <div className="">
                <label className="text-white" htmlFor="name">
                  Total Calories
                </label>
                <br />
                <input
                  name="totalCalories"
                  onChange={(e) => handleInput(e)}
                  className="py-1 px-4 w-[100%] rounded-md "
                  type="number"
                />
              </div>
              <div className="">
                <label className="text-white" htmlFor="name">
                  Food Source
                </label>
                <br />
                <select
                  name="foodSource"
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  id=""
                  className="py-1 px-4 w-[100%] rounded-md"
                  value={dietPlan.foodSource}
                >
                  <option value="">Select Food Source</option>
                  <option value="veg">Veg</option>
                  <option value="non veg">Non-Veg</option>
                </select>
              </div>

              <div className="">
                <label className="text-white" htmlFor="name">
                  Fitness Goal
                </label>
                <br />
                <select
                  name="fitnessGoal"
                  id=""
                  className="py-1 px-4 w-[100%] rounded-md"
                  value={dietPlan.fitnessGoal}
                  onChange={(e) => {
                    handleInput(e);
                  }}
                >
                  <option value="fat loss">Fat Loss</option>
                  <option value="lean bulk">Lean Bulk</option>
                  <option value="weight gain">Weight Gain</option>
                  <option value="weight loss">Weight Loss</option>
                  <option value="Maintain Weight and Fat Loss">
                    Maintain Weight and Fat Loss
                  </option>
                </select>
              </div>

              <div className="">
                <h1 className="text-2xl text-white font-bold pb-3 pt-4">
                  Macros :
                </h1>
                <div>
                  <label className="text-white" htmlFor="name">
                    Protein (gms)
                  </label>
                  <br />
                  <input
                    onChange={(e) => handleInput(e)}
                    type="number"
                    name="protein"
                    id=""
                    className="py-1 px-4 w-[100%] rounded-md"
                  />
                </div>
                <div>
                  <label className="text-white" htmlFor="name">
                    Carbs (gms)
                  </label>
                  <br />
                  <input
                    onChange={(e) => handleInput(e)}
                    type="number"
                    name="carbs"
                    id=""
                    className="py-1 px-4 w-[100%] rounded-md"
                  />
                </div>
                <div>
                  <label className="text-white" htmlFor="name">
                    Fats (gms)
                  </label>
                  <br />
                  <input
                    onChange={(e) => handleInput(e)}
                    type="number"
                    name="fats"
                    id=""
                    className="py-1 px-4 w-[100%] rounded-md"
                  />
                </div>
              </div>

              <div className="generateBtn flex flex-row w-[100%] h-[15%] justify-center items-center">
                <button
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
                  className=" py-2 px-4 rounded-md text-white bg-[#585858] hover:bg-[#00000079]"
                >
                  GENERATE
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="rightList w-[100%] h-[90vh] p-4 flex flex-col">
          <div className="inpText w-[100%] h-[90%]">
            <textarea
              name=""
              id=""
              value={dietPlan}
              cols="30"
              rows="10"
              className="h-[100%] w-[100%] overflow-y-auto resize-none border-none focus:outline-none border-4 bg-[#171717] rounded-xl p-4 text-white"
              readOnly={true}
            ></textarea>
          </div>
          <div className="generateBtn flex flex-row w-[100%] h-[10%] justify-center items-center">
                <button
                  onClick={(e) => {
                    saveDiet(formData);
                  }}
                  className=" py-2 px-4 rounded-md text-white bg-[#585858] hover:bg-[#00000079]"
                >
                  ADD TO MY WORKOUT
                </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GenerateDiet;
