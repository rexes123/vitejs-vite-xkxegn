import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, scales } from "chart.js";
import { useEffect, useState } from "react";

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function BarChar (){

    const [cateringExpeneses, setCateringExpenses] = useState(null);
    const [serviceExpenses, setServiceExpenses] = useState(null);
    const [tripExpenses, setTripExpenses]  = useState(null);

    useEffect(()=>{
        const getData = async() =>{
            const response = await fetch('https://backend-2txi.vercel.app/expenses');
            const data = await response.json();

            const catering = data.filter((obj)=> obj.category === "Catering");

            const cateringExpenses = catering.reduce((acc, item)=> acc + parseFloat(item.amount), 0);
            setCateringExpenses(cateringExpenses)

            const service = data.filter((obj)=> obj.category === "Services");

            const serviceExpenses = service.reduce((acc, item)=> acc + parseFloat(item.amount), 0);
            setServiceExpenses(serviceExpenses)

            
            const trip = data.filter((obj)=>obj.category === "Trip");
            const tripExpenses = trip.reduce((acc, item)=> acc + parseFloat(item.amount), 0);
            setTripExpenses(tripExpenses)
        }
        getData();
    }, [])



    const data = {
        labels: ['Trip', 'Services', 'Catering'],
        datasets: [
            {
                label: 'Day-to-Day Expenses',
                data: [tripExpenses, serviceExpenses, cateringExpeneses],
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