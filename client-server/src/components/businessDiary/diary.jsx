import React, { useEffect, useState } from "react";
import { Pie, Line } from "react-chartjs-2";
import { createItem, getItems, deleteItem } from "../../api/api";
import { FaCalendarAlt, FaEdit, FaTrash } from "react-icons/fa";
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
import { getCurrentUser } from "../../appwrite/session";
import { Link } from "react-router-dom";
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

const Diary = () => {
  const [activePanel, setActivePanel] = useState("transactions");
  const [create, setCreate] = useState(false);
  const [newPlan, setNewPlan] = useState({ plan: "", email: `` });
  const [plans, setPlans] = useState([]);
  const [updatedPlan, setUpdatedPlan] = useState({ plan: "" });
  const [isEditing, setIsEditing] = useState(null);


  const pieData = {
    labels: ["आम्दानी", "खर्च", "बचत"],
    datasets: [
      {
        label: "Rs.",
        data: [300, 50, 100],
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

  function updateEmail() {
    return getCurrentUser().then((user) => {
      setNewPlan((prevPlan) => ({ ...prevPlan, email: user.email }));
    });
  }

  const handleDeletePlan = async (id) => {
    console.log("Delete Plan:", id);
    await deleteItem(`deletePlan/${id}`);
    fetchBusinessPlans()
      .then((response) => {
        setPlans(response);
        console.log("Plans:", response);
      })
      .catch((error) => console.error("Error fetching business plans:", error));
  };

  const handleBusinessPlan = async () => {
    await updateEmail();
    setTimeout(async () => {
      const response = await createItem("createPlan", newPlan);
      fetchBusinessPlans()
        .then((response) => {
          setPlans(response);
          console.log("Plans:", response);
        })
        .catch((error) =>
          console.error("Error fetching business plans:", error)
        );
      setCreate(false);
    }, 0);
  };

  const fetchBusinessPlans = async () => {
    const userData = await getCurrentUser();
    const response = await getItems(`readPlans/${userData.email}`);
    console.log("Response from fetchBusinessPlans:", response);
    return response; // Ensure the response is returned
  };

  useEffect(() => {
    fetchBusinessPlans()
      .then((response) => {
        setPlans(response);
        console.log("Plans:", response); // Log the response to check the data
      })
      .catch((error) => console.error("Error fetching business plans:", error));
  }, []);

  return (
    <div className="border border-black h-auto sm:w-full sm:h-full p-4 flex flex-col">
  <div>
    <h1 className="mb-5 text-xl font-semibold">व्यवसाय डायरी</h1>
    <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4 w-full">
      <div className="w-full sm:w-[45%] p-4 bg-blue-100 rounded-lg">
        <h2 className="text-lg font-bold">कुल आम्दानी</h2>
        <p className="text-xl">Rs. 5000</p>
      </div>
      <div className="w-full sm:w-[45%] p-4 bg-blue-100 rounded-lg">
        <h2 className="text-lg font-bold">कुल खर्च</h2>
        <p className="text-xl">Rs.4000</p>
      </div>
      {true ? (
        <div className="w-full sm:w-[45%] p-4 bg-blue-100 rounded-lg">
          <h2 className="text-lg font-bold">कुल नाफा</h2>
          <p className="text-xl text-yellow-600">+ Rs.500</p>
        </div>
      ) : (
        <div className="w-full sm:w-[45%] p-4 bg-blue-100 rounded-lg">
          <h2 className="text-lg font-bold">कुल नोक्सान</h2>
          <p className="text-xl text-orange-500">- Rs.300</p>
        </div>
      )}
    </div>

    <div className="flex w-full mt-16  space-x-0  sm:space-y-0  sm:space-x-3  ">
      <button
        className={` w-full sm:w-[25vh] border border-gray-400 rounded ${
          activePanel === "transactions" ? "bg-blue-500 text-white" : "bg-blue-100"
        }`}
        onClick={() => setActivePanel("transactions")}
      >
        कारोबार
      </button>
      <button
        className={`py-1 w-full sm:w-[25vh] border border-gray-400 rounded ${
          activePanel === "income" ? "bg-blue-500 text-white" : "bg-blue-100"
        }`}
        onClick={() => setActivePanel("income")}
      >
        नाफा
      </button>
      <button
        className={`py-1 w-full sm:w-[25vh] border border-gray-400 rounded ${
          activePanel === "expenses" ? "bg-blue-500 text-white" : "bg-blue-100"
        }`}
        onClick={() => setActivePanel("expenses")}
      >
        नोक्सान
      </button>
    </div>

    <div className="mt-5">
      {activePanel === "transactions" && (
        !!plans &&
        plans.length > 0 &&
        plans.map((plan, index) => {
          return (
            <div
              key={index}
              className="flex w-full items-center bg-blue-100 justify-between p-4 border border-gray-300 rounded-lg mt-2 cursor-pointer"
            >
              <Link className="w-full" to={`/business-diary/${plan._id}`} key={index}>
                <div className="flex w-full items-center">
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
                      <h3 className="text-lg font-medium">{plan.plan}</h3>
                    )}
                    <p className="text-sm text-gray-500">मिति: ०१/०१/२०२४</p>
                  </div>
                </div>
              </Link>
              <div className="flex items-center space-x-2">
                Rs.1000
              </div>
            </div>
          );
        })
      )}
      {activePanel === "expenses" && (
        <div>
          <div className="flex items-center bg-blue-100 justify-between p-4 border border-gray-300 rounded-lg mt-5">
            <div className="flex items-center">
              <div className="mr-4">
                <FaCalendarAlt className="text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-medium">योजना नाम</h3>
                <p className="text-sm text-gray-500">मिति: ०१/०१/२०२४</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">$100</div>
          </div>
        </div>
      )}
      {activePanel === "income" && (
        <div>
          <div className="flex items-center bg-blue-100 justify-between p-4 border border-gray-300 rounded-lg mt-5">
            <div className="flex items-center">
              <div className="mr-4">
                <FaCalendarAlt className="text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-medium">योजना नाम</h3>
                <p className="text-sm text-gray-500">मिति: ०१/०१/२०२४</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">$100</div>
          </div>
        </div>
      )}
    </div>

    <h1 className="sm:mb-5 mb-[8rem] text-xl font-semibold mt-10">व्यवसाय चार्टहरू</h1>

    <div className="flex flex-col md:flex-row mt-5 space-x-0 md:space-x-4 w-full h-[50vh]">
      <div className="w-full md:w-1/2">
        <Pie data={pieData} />
      </div>
      <div className="w-full md:w-1/2">
        <Line data={lineData} />
      </div>
    </div>

    <div className="flex items-center justify-between mt-[5rem] sm:mt-10">
      <h2 className="text-lg font-semibold">सबै श्रेणी</h2>
      <button
        onClick={() => setCreate(true)}
        className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded"
      >
        नयाँ योजना थप्नुहोस्
      </button>
    </div>

    <div>
      {!!plans &&
        plans.length > 0 &&
        plans.map((plan, index) => {
          return (
            <div
              key={index}
              className="flex w-full items-center bg-blue-100 justify-between p-4 border border-gray-300 rounded-lg mt-2 cursor-pointer"
            >
              <Link className="w-full" to={`/business-diary/${plan._id}`} key={index}>
                <div className="flex w-full items-center">
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
                      <h3 className="text-lg font-medium">{plan.plan}</h3>
                    )}
                    <p className="text-sm text-gray-500">मिति: ०१/०१/२०२४</p>
                  </div>
                </div>
              </Link>
              <div className="flex items-center space-x-2">
                {isEditing === index ? (
                  <button
                    onClick={() => {
                      // Handle the update logic here
                      setIsEditing(null);
                    }}
                    className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded"
                  >
                    अपडेट गर्नुहोस्
                  </button>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>
          );
        })}
    </div>

    {create && (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-5/6 md:w-1/3">
          <h2 className="text-xl font-semibold mb-4">नयाँ योजना थप्नुहोस्</h2>
          <div className="mb-4">
            <label className="block text-gray-700">योजना नाम</label>
            <input
              type="text"
              value={newPlan.name}
              onChange={(e) =>
                setNewPlan({ ...newPlan, plan: e.target.value })
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
              onClick={handleBusinessPlan}
              className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded"
            >
              योजना थप्नुहोस्
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
</div>

  );
};

export default Diary;
