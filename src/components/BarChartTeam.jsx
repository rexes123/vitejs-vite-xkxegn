import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"


// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChartTeam() {
    const data = {
        labels: ['Project Management', 'Software development', 'Design team'],
        datasets: [
            {
                label: 'Spending',
                data: [8000, 3000, 5000],
                backgroundColor: ['Blue', 'Yellow', 'Orange'],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true, //Hide the legend as it's not in the reference image
            },

            title: {
                display: true,
                text: 'Team Spending Trend',
                color: 'White',
                font: {
                    size: 10, //Adjust font size as needed
                },
            },
        },

        scales: {
            x: {
                ticks: {
                    color: 'Black', // Color for x-axis labels
                },
            },

            y: {
                beginAtZero: true,// Ensure Y-axis start at 0
                ticks: {
                    color: 'Black',// Color for the Y-axis labels
                    stepSize: 1000 // Steps for Y-axis
                },
                min: 0,
                max: 10000, //Set the maximum value to match the chart's 100k scale
            },
        },
    };

    return <Bar data={data} options={options} />;
}