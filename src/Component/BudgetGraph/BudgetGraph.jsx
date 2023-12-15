import React,{useState} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import {FormControl,MenuItem,InputLabel,Select,ToggleButton,ToggleButtonGroup} from "@mui/material"
import "./BudgetGraph.css"
ChartJS.register(ArcElement, Tooltip, Legend);
const BudgetPieChart = ({ budgets}) => {
const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
const [RenderType, setRenderType] = useState("Monthly");    
const months = Array.from({ length: 12 }, (_, i) => i + 1);
const years = Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - 5 + i);
  
  // Filter budgets based on selected month and year
  const filteredBudgets = budgets.filter(
    (budget) => {
        if(selectedMonth && selectedYear){
            return budget.month === selectedMonth && budget.year === selectedYear
        }
        else{
            return  budget.year === selectedYear
        }
        
        }
       
  );

  
  // Generate dynamic colors based on the number of categories
  const dynamicColors = () => {
    const numCategories = filteredBudgets.length;
    const colors = [];
    for (let i = 0; i < numCategories; i++) {
      const hue = (i * 137.508) % 360; // Generate a unique hue for each category
      colors.push(`hsla(${hue}, 70%, 50%, 0.6)`);
    }
    return colors;
  };
  const handleRenderType = (e,value) => {
    setRenderType(value)
    if(value === "yearly"){
        setSelectedMonth(null)
    }
    else{
        setSelectedMonth(new Date().getMonth() + 1)
    }

  };

  // Create data object for the Doughnut chart
  const data = {
    labels: filteredBudgets.map((budget) => budget.category_name),
    datasets: [
      {
        data: filteredBudgets.map((budget) => parseFloat(budget.budget_amount)),
        backgroundColor: dynamicColors(),
        hoverBackgroundColor: dynamicColors().map((color) => `${color}8`), // Add alpha for hover effect
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
    },
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 20,
        bottom: 20,
      },
    },
  };

  return (
    <div className='BudgetGraph'>
        <div className='FilterConatainer'>
            <div>
            <ToggleButtonGroup
            color="primary"
            value={RenderType}
            exclusive
            onChange={handleRenderType}
            aria-label="Platform"
            >
      <ToggleButton value="Monthly">Monthly</ToggleButton>
      <ToggleButton value="yearly">Yearly</ToggleButton>
      
    </ToggleButtonGroup>    
            </div>
            <div className='SpecificFilter'>
            { !(RenderType === "yearly") ? 
            <FormControl >
                <InputLabel id="demo-simple-select-label">month</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedMonth}
                label="Age"
                onChange={(e)=>{setSelectedMonth(e.target.value)}}
                >
                {months.map((month) => (
                    <MenuItem key={month} value={month}>
                    {new Date(`${month}/1/2000`).toLocaleString('en-US', { month: 'long' })}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
            :
            <></>
            }
            
            <FormControl >
                <InputLabel id="demo-simple-select-label">Year</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedYear}
                label="Year"
                onChange={(e)=>{setSelectedYear(e.target.value)}}
                >
                {years.map((year) => (
                    <MenuItem key={year} value={year}>
                    {year}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>     
        </div>
        </div>
      { filteredBudgets.length === 0 ?
         <div className='NoDataDisplayContainer'>No budgets to display.</div>
         :
         <div className='GraphContainer'>
            <h2>Budget Distribution</h2>
            <Doughnut data={data}   options={options}/>
        </div>
      }
     
      
    </div>
  );
};

export default BudgetPieChart;
