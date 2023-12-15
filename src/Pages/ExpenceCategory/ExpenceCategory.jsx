import React, { useState, useEffect } from 'react';
import{useSelector,useDispatch} from "react-redux"
import { DataGrid } from '@mui/x-data-grid';
import "./ExpenceCategory.css"
import AddExpenseCategory from '../../Component/AddExpenseCategory/AddExpenseCategory';
import {getExpenseCategory} from '../../Services/Apiservice'
import {logout} from '../../Redux/Reducers/authslice'

const ExpenceCategoryTable = () => {
  const [ExpenceCategorys, setExpenceCategorys] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    // Fetch documents or set them from your state management library
    const fetchedExpenceCategorys = [
      { id: 1, category_id: 1, category_name: 'Housing' },
      { id: 2, category_id: 2, category_name: 'Transportation' },
      { id: 3, category_id: 3, category_name: 'Food and Groceries' },
      { id: 4, category_id: 4, category_name: 'Healthcare' },
      { id: 5, category_id: 5, category_name: 'Utilities' },
      { id: 6, category_id: 6, category_name: 'Entertainment' },
    ];

    setExpenceCategorys(fetchedExpenceCategorys);
  }, []);

  const UserDetail = useSelector((state) => state.auth);
  useEffect(() => {
    // Fetch documents or set them from your state management library
     
    GetExpenceCategory()

   
  }, []);
  function GetExpenceCategory(){
    getExpenseCategory(UserDetail.token).then((data)=>{
        console.log(data.Response);
        setExpenceCategorys(data.Response);
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
    { field: 'category_id', headerName: 'ID', width: 70 },
    { field: 'category_name', headerName: 'Category Name', width: 200 }
  ];
  const [isUploadpopupOpen, setUploadpopupOpen] = useState(false);

  const openUploadpopup = () => {
    setUploadpopupOpen(true);
    console.log(isUploadpopupOpen)
  };
  const closeUploadpopup = () => {
    setUploadpopupOpen(false);
    GetExpenceCategory()
  };

  return (
    <div>
    
    <div className="breadcrumbs d-flex align-items-center ExpenceCategorysBGImg" >
            <div className="container position-relative d-flex flex-column align-items-center">

                <h2>Expence Category</h2>
                <ol>
                <li><a href="index.html">Home</a></li>
                <li>Expence Category</li>
                </ol>

            </div>
    </div> 
    {
      isUploadpopupOpen?
      <AddExpenseCategory isopen={isUploadpopupOpen} onclose={closeUploadpopup}/>:
      <></>
    }
    
    <section id="blog" className="blog">
      <div className="container "  data-aos="fade-up">
        <div className='ExpenceCategorysMangerHeader'>
            <h2 className='ExpenceCategorysManagerHeaderText'>ExpenceCategorys</h2>
            <button className="AddExpenceCategorysButton" onClick={openUploadpopup}>Add ExpenceCategory</button>
        </div>
        <div className='ExpenceCategorys-grid'>
        <DataGrid
               
                rows={ExpenceCategorys}
                columns={columns}
                pageSize={5}
                getRowId={(row) => row.category_id}
                rowsPerPageOptions={[5, 10, 20]}
                
                disableSelectionOnClick
            />
        </div>
   

      </div>
    </section>
    
    </div>
   
  );
};

export default ExpenceCategoryTable;