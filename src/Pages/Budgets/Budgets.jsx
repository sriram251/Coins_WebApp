import React, { useState, useEffect } from 'react';
import {useSelector} from "react-redux"
import { DataGrid } from '@mui/x-data-grid';
import "./Budgets.css"
import AddBudget from '../../Component/AddBudget/AddBudget';
import {getBudget} from '../../Services/Apiservice'
import BudgetPieChart from '../../Component/BudgetGraph/BudgetGraph';
const BudgetsTable = () => {
  const [Budgets, setBudgets] = useState([]);
  
 

  const UserDetail = useSelector((state) => state.auth);
  useEffect(() => {
    // Fetch documents or set them from your state management library
     
    GetBudget()

   
  }, []);
  function GetBudget(){
    getBudget(UserDetail.token).then((data)=>{
        console.log(data.Response);
        setBudgets(data.Response);
     }).catch((err)=>{
        console.log(err)
     })
  }

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
    GetBudget()
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
    {
        isUploadpopupOpen?
        <AddBudget isopen={isUploadpopupOpen} onclose={closeUploadpopup}/>
        :
        <></>

    }
    
    <section id="blog" className="blog">
      <div className="container "  data-aos="fade-up">
        <div className='BudgetsMangerHeader'>
            <h2 className='BudgetsManagerHeaderText'>Budgets</h2>
            <button className="AddBudgetsButton" onClick={openUploadpopup}>Add Budget</button>
        </div>
        <div>
          <BudgetPieChart budgets={Budgets}/>
        </div>
        <div className='Budgets-grid'>
        <DataGrid
               
                rows={Budgets}
                columns={columns}
                pageSize={5}
                getRowId={(row) => row.budget_id}
                rowsPerPageOptions={[5, 10, 20]}
                
                disableSelectionOnClick
            />
        </div>
   

      </div>
    </section>
    
    </div>
   
  );
};

export default BudgetsTable;