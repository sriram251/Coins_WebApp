import React, { useState, useEffect } from 'react';
import {useSelector,useDispatch} from "react-redux"
import { DataGrid } from '@mui/x-data-grid';
import "./Income_sources.css"
import AddExpense from '../../Component/AddExpense/AddExpense';
import {getIncomeSources} from '../../Services/Apiservice'
import {logout} from '../../Redux/Reducers/authslice'
import AddIncomesources from '../../Component/AddIncomeSources/Add_Income_sources';
import IncomeSourceBarChart from '../../Component/IncomesourceGraph/IncomeSourceGraph';
const IncomeSourceTable = () => {
  const [IncomeSource, setIncomeSource] = useState([]);
  const UserDetail = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    // Fetch documents or set them from your state management library
     
    GetIncomeSource()

   
  }, []);
  function GetIncomeSource(){
    getIncomeSources(UserDetail.token).then((data)=>{
        console.log(data.Response);
        setIncomeSource(data.Response);
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
    { field: 'source_id', headerName: 'ID', width: 70 },
    { field: 'amount', headerName: 'Amount', width: 130 },
    { field: 'source_name', headerName: 'Source', width: 200 },
    { field: 'transaction_date', headerName: 'Date', width: 200 },
  ];
  const [isUploadpopupOpen, setUploadpopupOpen] = useState(false);

  const openUploadpopup = () => {
    setUploadpopupOpen(true);
    console.log(isUploadpopupOpen)
  };
  const closeUploadpopup = () => {
    GetIncomeSource()
    setUploadpopupOpen(false);
  };

  return (
    <div>
    
    <div className="breadcrumbs d-flex align-items-center ExpencesBGImg" >
            <div className="container position-relative d-flex flex-column align-items-center">

                <h2>Income Sources</h2>
                <ol>
                <li><a href="index.html">Home</a></li>
                <li>IncomeSources</li>
                </ol>

            </div>
    </div> 
    {
       isUploadpopupOpen?
        <AddIncomesources isopen={isUploadpopupOpen} onclose={closeUploadpopup}/>
        :
        <></>
    }
    
    <section id="blog" className="blog">
      <div className="container "  data-aos="fade-up">
        <div className='ExpencesMangerHeader'>
            <h2 className='ExpencesManagerHeaderText'>Income Source</h2>
            <button className="AddExpencesButton" onClick={openUploadpopup}>Add Income Source</button>
        </div>
        <div>
          <IncomeSourceBarChart incomeSources={IncomeSource}/>
        </div>
        <div className='Expences-grid'>
        <DataGrid
                
                rows={IncomeSource}
                columns={columns}
                pageSize={5}
                getRowId={(row) => row.source_id}
                rowsPerPageOptions={[5, 10, 20]}
                
                disableSelectionOnClick
            />
        </div>
   

      </div>
    </section>
    
    </div>
   
  );
};

export default IncomeSourceTable;