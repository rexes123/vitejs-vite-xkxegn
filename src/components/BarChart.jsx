import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, scales } from "chart.js";
import { useEffect, useState } from "react";

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function BarChar (){

    const [cateringExpeneses, setCateringExpenses] = useState(0);
    const [serviceExpenses, setServiceExpenses] = useState(0);
    const [tripExpenses, setTripExpenses]  = useState(0);

    useEffect(()=>{
        const getData = async() =>{
            const response = await fetch('https://backend-2txi.vercel.app/expenses');
            const data = await response.json();

            const catering = data.filter((obj)=> obj.category === "Catering");
            console.log(catering);
            const approvedCatering = catering.filter((obj)=> obj.status === "approved");
            const cateringExpenses = approvedCatering.reduce((acc, item)=> acc + parseFloat(item.amount), 0);
            setCateringExpenses(cateringExpenses)



            // Service
            const service = data.filter((obj)=> obj.category === "Services");
            console.log(service);
            const approvedService = service.filter((obj)=> obj.status === "approved");
            console.log(approvedService);
            const serviceExpenses = approvedService.reduce((acc, item)=> acc + parseFloat(item.amount), 0);
            setServiceExpenses(serviceExpenses)

            
            // Trip
            const trip = data.filter((obj)=>obj.category === "Trip");
            console.log(trip);
            const approvedTrip = trip.filter((obj)=> obj.status === "approved");
            console.log(approvedTrip);
            const tripExpenses = approvedTrip.reduce((acc, item)=> acc + parseFloat(item.amount), 0);
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