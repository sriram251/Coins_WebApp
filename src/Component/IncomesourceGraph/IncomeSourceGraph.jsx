import React, { useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { FormControl, InputLabel, MenuItem, Select, ToggleButton, ToggleButtonGroup } from "@mui/material";
import "./IncomeSouceGraph.css"
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
const IncomeSourceBarChart = ({ incomeSources }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [RenderType, setRenderType] = useState("Monthly");
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - 5 + i);

  // Filter income sources based on selected month and year
  const filteredIncomeSources = incomeSources.filter(
    (source) => {
      if (selectedMonth && selectedYear) {
        return new Date(source.transaction_date).getMonth() + 1 === selectedMonth && new Date(source.transaction_date).getFullYear() === selectedYear;
      } else {
        return new Date(source.transaction_date).getFullYear() === selectedYear;
      }
    }
  );

  // Generate dynamic colors based on the number of sources
  const dynamicColors = () => {
    const numSources = filteredIncomeSources.length;
    const colors = [];
    for (let i = 0; i < numSources; i++) {
      const hue = (i * 137.508) % 360; // Generate a unique hue for each source
      colors.push(`hsla(${hue}, 70%, 50%, 0.6)`);
    }
    return colors;
  };

  const handleRenderType = (e, value) => {
    setRenderType(value);
    if (value === "yearly") {
      setSelectedMonth(null);
    } else {
      setSelectedMonth(new Date().getMonth() + 1);
    }
  };

  // Create data object for the Bar chart
  const data = {
    labels: filteredIncomeSources.map((source) => source.source_name),
    datasets: [
      {
        label: 'Income Amount',
        data: filteredIncomeSources.map((source) => parseFloat(source.amount)),
        backgroundColor: dynamicColors(),
        borderColor: dynamicColors().map((color) => `${color}8`), // Add alpha for border color
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
     // Set to false to disable aspect ratio
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Income Sources',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Income Amount',
        },
      },
    },
  };

  return (
    <div className='IncomeSouceGraph'>
      <div className='FilterConatainer'>
        <div>
          <ToggleButtonGroup
            color="primary"
            value={RenderType}
            exclusive
            onChange={handleRenderType}
            aria-label="Render Type"
          >
            <ToggleButton value="Monthly">Monthly</ToggleButton>
            <ToggleButton value="yearly">Yearly</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className='SpecificFilter'>
          {!(RenderType === "yearly") ?
            <FormControl>
              <InputLabel id="month-label">Month</InputLabel>
              <Select
                labelId="month-label"
                id="month-select"
                value={selectedMonth}
                label="Month"
                onChange={(e) => { setSelectedMonth(e.target.value) }}
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

          <FormControl>
            <InputLabel id="year-label">Year</InputLabel>
            <Select
              labelId="year-label"
              id="year-select"
              value={selectedYear}
              label="Year"
              onChange={(e) => { setSelectedYear(e.target.value) }}
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
      {filteredIncomeSources.length === 0 ?
        <div className='NoDataDisplayContainer'>No income sources to display.</div>
        :
        <div className='GraphContainer'>
          <h2>Income Source Distribution</h2>
          <Bar data={data} options={options} />
        </div>
      }
    </div>
  );
};

export default IncomeSourceBarChart;