import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { useState, useEffect } from "react";


// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChartTeam() {

    const [spendingData, setSpendingData] = useState(null);
    console.log(spendingData)

    const [totalProjManAmount, setTotalProjManAmount] = useState(null);
    console.log(totalProjManAmount);


    const [totalDesignTeamAmount, setTotalDesignTeamAmount] = useState(null);
    console.log(totalDesignTeamAmount)

    
    const [softDevExpense, setSoftDevExpense] = useState(null);
    console.log(softDevExpense)
"Project management"
    useEffect(()=>{
        const getData = async () => {
            const response = await fetch('https://backend-2txi.vercel.app/expenses');
            const data = await response.json();
            setSpendingData(data);

            const projMan = data.filter((obj)=> obj.team === "Project management");
            console.log(projMan);
            
            const projManExpense = projMan.reduce((acc, item)=> acc + parseFloat(item.amount), 0);
            console.log(projManExpense);

            setTotalProjManAmount(projManExpense);

            const designTeamName = data.filter((obj)=> obj.team === "Design team");    
            console.log(designTeamName);
            const designExpense = designTeamName.reduce((acc, item)=> acc + parseFloat(item.amount), 0);
            setTotalDesignTeamAmount(designExpense)

            const softDevTeamName = data.filter((obj)=> obj.team === "Software development");
            const softDevExpense = softDevTeamName.reduce((acc, item)=> acc + parseFloat(item.amount), 0);
            console.log(softDevExpense);
            setSoftDevExpense(softDevExpense)
        }
        getData();
    }, [])
    


    const data = {
        labels: ['Project Management', 'Software development', 'Design team'],
        datasets: [
            {
                label: 'Spending',
                data: [totalProjManAmount, softDevExpense, totalDesignTeamAmount],
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
                max: 1000, //Set the maximum value to match the chart's 100k scale
            },
        },
    };

    return <Bar data={data} options={options} />;
}