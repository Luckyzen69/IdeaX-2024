import React, { useState } from "react";
import { Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, Title, CategoryScale } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, Title, CategoryScale);

const Diary = () => {
    const [activePanel, setActivePanel] = useState("income");

    const pieData = {
        labels: ["Income", "Expenses", "Savings"],
        datasets: [
            {
                label: "# of Votes",
                data: [300, 50, 100],
                backgroundColor: [
                    "green",
                    "red",
                    "yellow",
                ],
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
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "Income",
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: "green",
            },
            {
                label: "Expenses",
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                borderColor: "red",
            },
        ],
    };

    return (
        <div className="border border-black w-full h-full p-4">
            <h1 className="mb-5 text-xl font-semibold">Business Diary</h1>
            <div className="flex justify-between space-x-4 w-[100vh] ">
                <div className=" w-[45%]  p-4   bg-blue-100 rounded-lg">
                    <h2 className="text-lg  font-bold">Total Income</h2>
                    <p className="text-xl">$0.00</p>
                </div>
                <div className=" w-[45%]  p-4   bg-blue-100 rounded-lg">
                    <h2 className="text-lg  font-bold">Total Expenses</h2>
                    <p className="text-xl">$0.00</p>
                </div>
            </div>

            <div className="flex w-[80vh] mt-16 justify-between ">
                <button
                    className={`py-1 w-[25vh] border border-gray-400 rounded ${
                        activePanel === "income"
                            ? "bg-blue-500 text-white "
                            : "  bg-blue-100"
                    }`}
                    onClick={() => setActivePanel("income")}
                >
                    Income
                </button>
                <button
                    className={`py-1  w-[25vh] border border-gray-400 rounded ${
                        activePanel === "expenses"
                            ? "bg-blue-500 text-white "
                            : "  bg-blue-100"
                    } `}
                    onClick={() => setActivePanel("expenses")}
                >
                    Expenses
                </button>
                <button
                    className={`py-1  w-[25vh] border border-gray-400 rounded ${
                        activePanel === "transactions"
                            ? "bg-blue-500 text-white "
                            : "  bg-blue-100"
                    } `}
                    onClick={() => setActivePanel("transactions")}
                >
                    Transactions
                </button>
            </div>

            <div className="mt-5">
                {activePanel === "income" && <div>Income Section</div>}
                {activePanel === "expenses" && <div>Expenses Section</div>}
                {activePanel === "transactions" && <div>Transactions Section</div>}
            </div>
            <div >
                <div className="flex items-center bg-blue-100  justify-between p-4 border border-gray-300 rounded-lg mt-5">
                    <div className="flex items-center">
                        <div className="mr-4">
                            <i className="fas fa-calendar-alt text-blue-500"></i>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium">Plan Name</h3>
                            <p className="text-sm text-gray-500">Date: 01/01/2024</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-lg font-medium">$100.00</p>
                    </div>
                </div>
            </div>

            <h1 className="mb-5 text-xl font-semibold mt-10">Visual Charts</h1>

            <div className="flex mt-5 space-x-4 w-[80vw] h-[50vh]">
                <div className="w-1/2">
                    <Pie data={pieData} />
                </div>
                <div className="w-1/2">
                    <Line data={lineData} />
                </div>
            </div>
        </div>
    );
};

export default Diary;
