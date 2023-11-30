import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import ChatIcon from '@mui/icons-material/Chat';
import "./DocumentGrid.css"
import FileUpload from "../../Component/FileUpload/FileUpload"
import '../../assets/css/main.css'
const DocumentTable = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // Fetch documents or set them from your state management library
    const fetchedDocuments = [
      {
        id: 1,
        title: 'Financials',
        description: 'test',
        document_id: 39,
        file_path: 'uploads\\Sriram_Rajah_CV.pdf',
        is_encoded: true,
        upload_date: '2023-11-13T07:29:23.364583',
        user_id: 2,
      },
      // Add more documents as needed
    ];

    setDocuments(fetchedDocuments);
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'description', headerName: 'Description', width: 200 },
    { field: 'upload_date', headerName: 'Upload Date', width: 200 },
    {
      field: 'is_encoded',
      headerName: 'Encoded',
      width: 120,
      renderCell: (params) => (
        params.value ? <CheckIcon color="primary" /> : null
      ),
    },
    {
        field: 'Delete',
        headerName: 'Delete',
        width: 120,
        renderCell: (params) => (
          <DeleteIcon
          style={{
            cursor: 'pointer',
             // Adjust opacity for disabled state
          }}
          
          onClick={() => console.log(params.id)} // Add your chat logic here
        />// Add your chat logic here
        ),
      },
    {
        field: 'Chat',
        headerName: 'Chat',
        width: 120,
        renderCell: (params) => (
          <ChatIcon
          style={{
            cursor: !params.row.is_encoded ? 'not-allowed' : 'pointer',
            opacity:! params.row.is_encoded ? 0.5 : 1, // Adjust opacity for disabled state
          }}
          disabled={params.row.is_encoded}
          onClick={() => console.log(params.id)} // Add your chat logic here
        />// Add your chat logic here
        ),
      },
    // Add more columns as needed
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
    
    <div className="breadcrumbs d-flex align-items-center DocumentBGImg" >
            <div className="container position-relative d-flex flex-column align-items-center">

                <h2>Documents</h2>
                <ol>
                <li><a href="index.html">Home</a></li>
                <li>Documents</li>
                </ol>

            </div>
    </div> 
    <FileUpload isopen={isUploadpopupOpen} onclose={closeUploadpopup}/>
    <section id="blog" className="blog">
      <div className="container "  data-aos="fade-up">
        <div className='DocumentMangerHeader'>
            <h2 className='DocumentManagerHeaderText'>Documents</h2>
            <button className="AddDocumentButton" onClick={openUploadpopup}>Add Document</button>
        </div>
        <div className='Document-grid'>
        <DataGrid
               
                rows={documents}
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

export default DocumentTable;