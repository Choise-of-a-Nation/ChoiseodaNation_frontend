import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { getUsers } from "../../ApiService/ApiService";
import "./Statistics.css";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const roleColors: { [key: string]: string } = {
    Full: "red",
    Client: "blue",
    default: "gray", 
};

const Statistics = () => {
    const [userStats, setUserStats] = useState<{ labels: string[]; data: number[]; colors: string[] }>({
        labels: [],
        data: [],
        colors: [],
    });

    useEffect(() => {
        getUsers().then((users) => {
            const rolesCount = users.reduce((acc: { [key: string]: number }, user: { roleId?: string }) => {
                if (user.roleId) {
                    acc[user.roleId] = (acc[user.roleId] || 0) + 1;
                } else {
                    acc["Невідомо"] = (acc["Невідомо"] || 0) + 1;
                }
                return acc;
            }, {});

            const labels = Object.keys(rolesCount);
            const data = Object.values(rolesCount) as number[];
            const colors = labels.map((role) => roleColors[role] || roleColors.default);

            setUserStats({ labels, data, colors });
        });
    }, []);

    return (
        <div className="statistics-container">
            <h2>Статистика користувачів</h2>
            <Bar
                data={{
                    labels: userStats.labels,
                    datasets: [
                        {
                            label: "Кількість",
                            data: userStats.data,
                            backgroundColor: userStats.colors,
                        },
                    ],
                }}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true, 
                            position: "top",
                            labels: {
                                color: "white", 
                                font: {
                                    size: 18, 
                                    weight: "bold",
                                    family: "MyFont"
                                },
                                usePointStyle: true, 
                                padding: 20,
                                generateLabels: (chart) => {
                                    return userStats.labels.map((label, index) => ({
                                        text: `${label} (${userStats.data[index]})`, 
                                        fillStyle: userStats.colors[index], 
                                        strokeStyle: userStats.colors[index],
                                        pointStyle: "rectRounded",
                                    }));
                                },
                            },
                        },
                        title: {
                            display: true,
                            text: "Кількість користувачів за ролями",
                            color: "white",
                            font: {
                                size: 28,
                                weight: "bold",
                                family: "MyFont"
                            },
                        },
                    },
                    scales: {
                        x: { ticks: { color: "white" } },
                        y: { ticks: { color: "white" } },
                    },
                }}
            />
        </div>
    );
};

export default Statistics;