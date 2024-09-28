import React, { useState, useEffect } from "react";
import { Pie, Line } from "react-chartjs-2";
import { useParams, Link } from "react-router-dom";
import { FaCalendarAlt, FaEdit, FaTrash } from "react-icons/fa";
import { createItem, deleteItem, getItems } from "../../../api/api";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale
);

const Category = () => {
  const [activePanel, setActivePanel] = useState("transactions");
  const [diaries, setdiaries] = useState(null);
  const [newtask, setNewtask] = useState({ task: "", revenue: "", cost: "" });
  const [plandata, setplandata] = useState(null);
  const { id } = useParams();
  const [create, setCreate] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [updatedPlan, setUpdatedPlan] = useState({ plan: "" });

  const calculateTotals = () => {
    if (!diaries) return { totalRevenue: 0, totalCost: 0 };
    const totalRevenue = diaries.reduce(
      (acc, diary) => acc + Number(diary.revenue),
      0
    );
    const totalCost = diaries.reduce(
      (acc, diary) => acc + Number(diary.cost),
      0
    );

    return { totalRevenue, totalCost };
  };

  useEffect(() => {
    const totals = calculateTotals();
    setplandata((prevData) => ({
      ...prevData,
      totalRevenue: totals.totalRevenue,
      totalCost: totals.totalCost,
    }));
  }, [diaries]);

  console.log(diaries, plandata);
  const fetchData = async () => {
    try {
      const result = await getItems(`readDiaries/${id}`);
      setdiaries(result.diaries);
      setplandata(result.plandata);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  const handleCreate = async () => {
    setTimeout(async () => {
      const response = await createItem("createDiaryEntry", {
        planId: id,
        task: newtask.task,
        revenue: newtask.revenue,
        cost: newtask.cost,
      });
      setNewtask({ task: "", revenue: "", cost: "" });
      setCreate(false);
      fetchData();
    }, 0);
  };

  const handleDeletePlan = async (planId) => {
    try {
      await deleteItem(`deleteDiaryEntry/${planId}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting plan:", error);
    }
  };

  if (!plandata) {
    return <div>Loading...</div>;
  }

  const pieData = {
    labels: ["आम्दानी", "खर्च", " नाफा / नोक्सान"],
    datasets: [
      {
        label: "Rs.",
        data: [
          plandata.totalRevenue,
          plandata.totalCost,
          plandata.totalRevenue - plandata.totalCost,
        ],
        backgroundColor: ["green", "red", "yellow"],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: ["जनवरी", "फेब्रुअरी", "मार्च", "अप्रिल", "मे", "जुन", "जुलाई"],
    datasets: [
      {
        label: "आम्दानी",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "green",
      },
      {
        label: "खर्च",
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: false,
        borderColor: "red",
      },
    ],
  };

  return (
    <div className="border border-black w-full h-full p-4">
      <h1 className="mb-5 text-xl font-semibold">{plandata.plan}</h1>
      <div className="flex justify-between space-x-4 w-[100vh] ">
        <div className=" w-[45%]  p-4   bg-blue-100 rounded-lg">
          <h2 className="text-lg  font-bold">कुल आम्दानी</h2>
          <p className="text-xl">Rs. {plandata.totalRevenue}</p>
        </div>
        <div className=" w-[45%]  p-4   bg-blue-100 rounded-lg">
          <h2 className="text-lg  font-bold">कुल खर्च</h2>
          <p className="text-xl">Rs. {plandata.totalCost}</p>
        </div>

        {plandata.totalRevenue > plandata.totalCost ? (
          <div className=" w-[45%]   p-4   bg-blue-100 rounded-lg">
            <h2 className="text-lg  font-bold">कुल  नाफा</h2>
            <p className="text-xl text-yellow-400 ">+ Rs. {plandata.totalRevenue - plandata.totalCost}</p>
          </div>
        ) : (
          <div className=" w-[45%]  p-4   bg-blue-100 rounded-lg">
            <h2 className="text-lg  font-bold">कुल नोक्सान</h2>
            <p className="text-xl text-orange-500 ">- Rs. {plandata.totalCost - plandata.totalRevenue}</p>
          </div>
        )}
      </div>

      <div className="flex w-[80vh] mt-16 justify-between ">
        <button
          className={`py-1  w-[25vh] border border-gray-400 rounded ${
            activePanel === "transactions"
              ? "bg-blue-500 text-white "
              : "  bg-blue-100"
          } `}
          onClick={() => setActivePanel("transactions")}
        >
          कारोबार
        </button>
        <button
          className={`py-1 w-[25vh] border border-gray-400 rounded ${
            activePanel === "income"
              ? "bg-blue-500 text-white "
              : "  bg-blue-100"
          }`}
          onClick={() => setActivePanel("income")}
        >
          नाफा
        </button>
        <button
          className={`py-1  w-[25vh] border border-gray-400 rounded ${
            activePanel === "expenses"
              ? "bg-blue-500 text-white "
              : "  bg-blue-100"
          } `}
          onClick={() => setActivePanel("expenses")}
        >
          नोक्सान
        </button>
      </div>

      <div className="mt-5">
        {activePanel === "transactions" && (
          <div>
            {" "}
            <div>
              {!!diaries &&
                diaries.length > 0 &&
                diaries.map((plan, index) => {
                  return (
                    <div
                      key={index}
                      className="flex w-full  items-center bg-blue-100 justify-between p-4 border border-gray-300 rounded-lg mt-2 cursor-pointer"
                    >
                      <div className="flex w-full  items-center">
                        <div className="mr-4">
                          <FaCalendarAlt className="text-blue-500" />
                        </div>
                        <div>
                          {isEditing === index ? (
                            <input
                              type="text"
                              value={updatedPlan.plan}
                              onChange={(e) =>
                                setUpdatedPlan({
                                  ...updatedPlan,
                                  plan: e.target.value,
                                })
                              }
                              className="w-full p-2 border border-gray-300 rounded mt-1"
                            />
                          ) : (
                            <h3 className="text-lg font-medium">{plan.task}</h3>
                          )}
                          <p className="text-sm text-gray-500">
                            मिति: {Date(plan.date)}
                          </p>
                        </div>
                      </div>

                      <div className="flex w-[90vh] justify-between  items-center space-x-2">
                        <p>आम्दानी: Rs. {plan.revenue}</p>
                        <p>खर्च: Rs. {plan.cost}</p>
                        <p>
                          {Number(plan.revenue) > Number(plan.cost) ? (
                            <p className="text-yellow-400 ">{`+ Rs.${
                              plan.revenue - plan.cost
                            }`}</p>
                          ) : (
                            <p className="text-orange-800">{`- Rs.${
                              plan.cost - plan.revenue
                            }`}</p>
                          )}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
        {activePanel === "expenses" && (
          <div>
            {" "}
            <div>
              {!!diaries &&
                diaries.length > 0 &&
                diaries.map((plan, index) => {
                  return (
                    <>
                      {plan.revenue < plan.cost && (
                        <div
                          key={index}
                          className="flex w-full  items-center bg-blue-100 justify-between p-4 border border-gray-300 rounded-lg mt-2 cursor-pointer"
                        >
                          <div className="flex w-full  items-center">
                            <div className="mr-4">
                              <FaCalendarAlt className="text-blue-500" />
                            </div>
                            <div>
                              {isEditing === index ? (
                                <input
                                  type="text"
                                  value={updatedPlan.plan}
                                  onChange={(e) =>
                                    setUpdatedPlan({
                                      ...updatedPlan,
                                      plan: e.target.value,
                                    })
                                  }
                                  className="w-full p-2 border border-gray-300 rounded mt-1"
                                />
                              ) : (
                                <h3 className="text-lg font-medium">
                                  {plan.task}
                                </h3>
                              )}
                              <p className="text-sm text-gray-500">
                                मिति: {Date(plan.date)}
                              </p>
                            </div>
                          </div>

                          <div className="flex w-[90vh] justify-between  items-center space-x-2">
                            <p>आम्दानी: Rs. {plan.revenue}</p>
                            <p>खर्च: Rs. {plan.cost}</p>
                            <p>
                              {Number(plan.revenue) > Number(plan.cost) ? (
                                <p className="text-yellow-400 ">{`+ Rs.${
                                  plan.revenue - plan.cost
                                }`}</p>
                              ) : (
                                <p className="text-orange-800">{`- Rs.${
                                  plan.cost - plan.revenue
                                }`}</p>
                              )}
                            </p>
                          </div>
                        </div>
                      )}
                    </>
                  );
                })}
            </div>
          </div>
        )}
        {activePanel === "income" && (
          <div>
            {" "}
            <div>
              {!!diaries &&
                diaries.length > 0 &&
                diaries.map((plan, index) => {
                  return (
                    <>
                      {plan.revenue > plan.cost && (
                        <div
                          key={index}
                          className="flex w-full  items-center bg-blue-100 justify-between p-4 border border-gray-300 rounded-lg mt-2 cursor-pointer"
                        >
                          <div className="flex w-full  items-center">
                            <div className="mr-4">
                              <FaCalendarAlt className="text-blue-500" />
                            </div>
                            <div>
                              {isEditing === index ? (
                                <input
                                  type="text"
                                  value={updatedPlan.plan}
                                  onChange={(e) =>
                                    setUpdatedPlan({
                                      ...updatedPlan,
                                      plan: e.target.value,
                                    })
                                  }
                                  className="w-full p-2 border border-gray-300 rounded mt-1"
                                />
                              ) : (
                                <h3 className="text-lg font-medium">
                                  {plan.task}
                                </h3>
                              )}
                              <p className="text-sm text-gray-500">
                                मिति: {Date(plan.date)}
                              </p>
                            </div>
                          </div>

                          <div className="flex w-[90vh] justify-between  items-center space-x-2">
                            <p>आम्दानी: Rs. {plan.revenue}</p>
                            <p>खर्च: Rs. {plan.cost}</p>
                            <p>
                              {Number(plan.revenue) > Number(plan.cost) ? (
                                <p className="text-yellow-400 ">{`+ Rs.${
                                  plan.revenue - plan.cost
                                }`}</p>
                              ) : (
                                <p className="text-orange-800">{`- Rs.${
                                  plan.cost - plan.revenue
                                }`}</p>
                              )}
                            </p>
                          </div>
                        </div>
                      )}
                    </>
                  );
                })}
            </div>
          </div>
        )}
      </div>

      <h1 className="mb-5 text-xl font-semibold mt-10">दैनिक खर्च चार्टहरू</h1>

      <div className="flex mt-5 space-x-4 w-[80vw] h-[50vh]">
        <div className="w-1/2">
          <Pie data={pieData} />
        </div>
        <div className="w-1/2">
          <Line data={lineData} />
        </div>
      </div>

      <div className="flex items-center justify-between mt-10">
        <h2 className="text-lg font-semibold">सबै श्रेणी</h2>
        <button
          onClick={() => setCreate(true)}
          className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded"
        >
          नयाँ योजना थप्नुहोस्
        </button>
      </div>
      <div>
        {!!diaries &&
          diaries.length > 0 &&
          diaries.map((plan, index) => {
            return (
              <div
                key={index}
                className="flex w-full  items-center bg-blue-100 justify-between p-4 border border-gray-300 rounded-lg mt-2 cursor-pointer"
              >
                <div className="flex w-full  items-center">
                  <div className="mr-4">
                    <FaCalendarAlt className="text-blue-500" />
                  </div>
                  <div>
                    {isEditing === index ? (
                      <input
                        type="text"
                        value={updatedPlan.plan}
                        onChange={(e) =>
                          setUpdatedPlan({
                            ...updatedPlan,
                            plan: e.target.value,
                          })
                        }
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                      />
                    ) : (
                      <h3 className="text-lg font-medium">{plan.task}</h3>
                    )}
                    <p className="text-sm text-gray-500">
                      मिति: {Date(plan.date)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center  justify-between  w-[60vh] space-x-2">
                  <p>आम्दानी: Rs. {plan.revenue}</p>
                  <p>खर्च: Rs. {plan.cost}</p>

                  <div className="flex">
                    <FaEdit
                      className="text-blue-500 cursor-pointer"
                      onClick={() => {
                        setIsEditing(index);
                        setUpdatedPlan(plan);
                      }}
                    />
                    <div onClick={() => handleDeletePlan(plan._id)}>
                      <FaTrash className="text-red-500 cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {create && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">नयाँ योजना थप्नुहोस्</h2>
            <div className="mb-4">
              <label className="block text-gray-700">योजना नाम</label>
              <input
                type="text"
                value={newtask.task}
                onChange={(e) =>
                  setNewtask({ ...newtask, task: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">आम्दानी</label>
              <input
                type="text"
                value={newtask.revenue}
                onChange={(e) =>
                  setNewtask({ ...newtask, revenue: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">खर्च</label>
              <input
                type="text"
                value={newtask.cost}
                onChange={(e) =>
                  setNewtask({ ...newtask, cost: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setCreate(false)}
                className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded"
              >
                रद्द गर्नुहोस्
              </button>
              <button
                onClick={handleCreate}
                className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded"
              >
                योजना थप्नुहोस्
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
