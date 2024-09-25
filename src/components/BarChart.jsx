import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, scales } from "chart.js";

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function BarChar (){
    const data = {
        labels: ['Trip', 'Services', 'Catering'],
        datasets: [
            {
                label: 'Day-to-Day Expenses',
                data: [20, 30, 20],
                background: ['Blue', 'Orange', 'Yellow'],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title:{
                display: true,
                text: "Day-to-Day expenses",
                color: 'white'
            },
        },
        scales:{
            x: {
                ticks: {
                    color: 'white'
                },
            },
            beginAtZero: true, //Ensure the Y-axis start at 0
        },
    }

    return <Bar data={data} options={options}/>
};