import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import "./Expenses.css"
import AddExpense from '../../Component/AddExpense/AddExpense';

const ExpencesTable = () => {
  const [Expences, setExpences] = useState([]);

  useEffect(() => {
    // Fetch documents or set them from your state management library
    const fetchedExpences = [
        {
          id: 1,
          expense_id: 1,
          amount: '30.00',
          category_name: 'Food and Groceries',
          description: 'Movie night',
          expense_date: '2023-11-27T00:00:00',
        },
        // Add more rows as needed
      ];

    setExpences(fetchedExpences);
  }, []);

  const columns = [
    { field: 'expense_id', headerName: 'ID', width: 70 },
    { field: 'amount', headerName: 'Amount', width: 130 },
    { field: 'category_name', headerName: 'Category', width: 200 },
    { field: 'description', headerName: 'Description', width: 200 },
    { field: 'expense_date', headerName: 'Expense Date', width: 200 },
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
    
    <div className="breadcrumbs d-flex align-items-center ExpencesBGImg" >
            <div className="container position-relative d-flex flex-column align-items-center">

                <h2>Expences</h2>
                <ol>
                <li><a href="index.html">Home</a></li>
                <li>Expences</li>
                </ol>

            </div>
    </div> 
    <AddExpense isopen={isUploadpopupOpen} onclose={closeUploadpopup}/>
    <section id="blog" className="blog">
      <div className="container "  data-aos="fade-up">
        <div className='ExpencesMangerHeader'>
            <h2 className='ExpencesManagerHeaderText'>Expences</h2>
            <button className="AddExpencesButton" onClick={openUploadpopup}>Add Expence</button>
        </div>
        <div className='Expences-grid'>
        <DataGrid
               
                rows={Expences}
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

export default ExpencesTable;