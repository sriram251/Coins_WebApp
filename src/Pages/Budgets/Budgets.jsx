import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import "./Budgets.css"
import AddBudget from '../../Component/AddBudget/AddBudget';

const BudgetsTable = () => {
  const [Budgets, setBudgets] = useState([]);

  useEffect(() => {
    // Fetch documents or set them from your state management library
    const fetchedBudgets = [
        {
            id: 1,
            budget_id: 1,
            budget_amount: '1500.00',
            category_name: 'Transportation',
            category_id: 2,
            month: 11,
            user_id: 2,
            year: 2023,
          },
      // Add more documents as needed
    ];

    setBudgets(fetchedBudgets);
  }, []);

  const columns = [
    { field: 'budget_id', headerName: 'ID', width: 70 },
  { field: 'budget_amount', headerName: 'Budget Amount', width: 150 },
  { field: 'category_name', headerName: 'Category', width: 200 },
  { field: 'month', headerName: 'Month', width: 100 },
  { field: 'year', headerName: 'Year', width: 100 },
  ];
  const [isUploadpopupOpen, setUploadpopupOpen] = useState(false);

  const openUploadpopup = () => {
    setUploadpopupOpen(true);
    console.log(isUploadpopupOpen)
  };
  const closeUploadpopup = () => {
    setUploadpopupOpen(false);
  };

  return (
    <div>
    
    <div className="breadcrumbs d-flex align-items-center BudgetsBGImg" >
            <div className="container position-relative d-flex flex-column align-items-center">

                <h2>Budgets</h2>
                <ol>
                <li><a href="index.html">Home</a></li>
                <li>Budgets</li>
                </ol>

            </div>
    </div> 
    <AddBudget isopen={isUploadpopupOpen} onclose={closeUploadpopup}/>
    <section id="blog" className="blog">
      <div className="container "  data-aos="fade-up">
        <div className='BudgetsMangerHeader'>
            <h2 className='BudgetsManagerHeaderText'>Budgets</h2>
            <button className="AddBudgetsButton" onClick={openUploadpopup}>Add Budget</button>
        </div>
        <div className='Budgets-grid'>
        <DataGrid
               
                rows={Budgets}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
   

      </div>
    </section>
    
    </div>
   
  );
};

export default BudgetsTable;