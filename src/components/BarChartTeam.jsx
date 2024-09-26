import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"


// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChartTeam() {
    const data = {
        labels: ['Project Manager', 'Software developer', 'MB'],
        datasets: [
            {
                label: 'Spending',
                data: [8000, 3000 ,5000],
                backgroundColor: ['Blue', 'Yellow', 'Orange'],
                borderRadius: 5
            },
        ],
    };

    const options ={
        responsive: true,
        plugins: {
            legend: {
                display: false, //Hide the legend as it's not in the reference image
            },

            title: {
                display: true,
                text: 'Team Spending Trend',
                color: 'White',
                font: {
                    size: 16, //Adjust font size as needed
                }, 
            },
        },

        scales:{
            x: {
                ticks: {
                    color: 'White', // Color for x-axis labels
                },
            },

            y: {
                beginAtZero: true,
                ticks: {
                    color: 'white',//Color for the Y-axis labels
                    stepSize: 2000 // Steps for Y-axis
                },
                min: 0,
                max: 1000,
            },
        },
    };

    return <Bar data={data} options={options}/>;
}