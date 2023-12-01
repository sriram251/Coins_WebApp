import React, { useState, useEffect } from 'react';
import {useSelector,useDispatch} from "react-redux"
import { DataGrid } from '@mui/x-data-grid';
import "./Expenses.css"
import AddExpense from '../../Component/AddExpense/AddExpense';
import {getExpense} from '../../Services/Apiservice'
import {logout} from '../../Redux/Reducers/authslice'
const ExpencesTable = () => {
  const [Expences, setExpences] = useState([]);
  const UserDetail = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    // Fetch documents or set them from your state management library
     
    GetExpence()

   
  }, []);
  function GetExpence(){
    getExpense(UserDetail.token).then((data)=>{
        console.log(data.Response);
        setExpences(data.Response);
     }).catch((err)=>{
        if (err.response && err.response.status === 401) {
            // Trigger the logout action when a 401 error occurs
            dispatch(logout());
            console.log("ok")
            window.location.href = "/";
          }
        console.log(err)
     })
  }
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
    GetExpence()
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
    {
       isUploadpopupOpen?
        <AddExpense isopen={isUploadpopupOpen} onclose={closeUploadpopup}/>
        :
        <></>
    }
    
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
                getRowId={(row) => row.expense_id}
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