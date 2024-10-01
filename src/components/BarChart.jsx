import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, scales } from "chart.js";
import { useEffect } from "react";

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function BarChar (){


    useEffect(()=>{
        const getData = async() =>{
            const response = await fetch('https://backend-2txi.vercel.app/expenses');
            const data = await response.json();
            console.log(data);
        }
        getData();
    }, [])



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
                display: true,
            },
            title:{
                display: true,
                text: "Day-to-Day expenses",
                color: 'black'
            },
        },
        scales:{
            x: {
                ticks: {
                    color: 'black'
                },
            },
            beginAtZero: true, //Ensure the Y-axis start at 0
        },
    }

    return <Bar data={data} options={options}/>
};