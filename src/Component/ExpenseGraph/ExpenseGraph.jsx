import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend, } from "chart.js"
 
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
      );
const ExpenseChart = ({ expenses, chartType }) => {
  // Extract data from expenses array
  if (expenses.length === 0) {
    return <div>No expenses to display.</div>;
  }
  let expenseDates = expenses.map((expense) => expense.expense_date);
  let amounts = expenses.map((expense) => parseFloat(expense.amount));

  // Prepare data based on chartType (weekly or monthly)
   // Prepare data based on chartType (daily, weekly, monthly)
   let labels, labelFormat;
   if (chartType === 'daily') {
     labels = expenseDates.map((date) => date.toLocaleDateString('en-US'));
     labelFormat = 'Daily Expenses';
   } else if (chartType === 'weekly') {
     // Aggregate by week
     const weeklyData = expenseDates.reduce((acc, date, index) => {
       const weekNumber = index + 1; // You can use a better algorithm to calculate the week number
       acc[weekNumber] = (acc[weekNumber] || 0) + amounts[index];
       return acc;
     }, {});
 
     labels = Object.keys(weeklyData).map((week) => `Week ${week}`);
     amounts = Object.values(weeklyData);
     labelFormat = 'Weekly Expenses';
   } else if (chartType === 'monthly') {
     // Aggregate by month
     const monthlyData = expenseDates.reduce((acc, date, index) => {
       const monthYear = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
       acc[monthYear] = (acc[monthYear] || 0) + amounts[index];
       return acc;
     }, {});
 
     labels = Object.keys(monthlyData);
     amounts = Object.values(monthlyData);
     labelFormat = 'Monthly Expenses';
   }

  // Create data object for the Bar chart
  const data = {
    labels: [...new Set(labels)], // Use unique labels
    datasets: [
      {
        fill: true,
        label: labelFormat,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: amounts,
      },
    ],
  };

  return (
    <div>
      <h2>{labelFormat}</h2>
      <Line data={data} />
    </div>
  );
};

export default ExpenseChart;