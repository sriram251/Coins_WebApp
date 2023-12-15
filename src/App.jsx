import React, { useState,useEffect  } from 'react';
import {useSelector,useDispatch} from "react-redux"
import { BrowserRouter as Router,Routes ,Route} from 'react-router-dom';
import Header from './Component/Header/Header';
import LandingPage from './Pages/LandinPage/LandingPage';
import FileUpload from './Pages/FileUpload/FileUpload';
import LoginModal from './Component/Login/Login';
import DocumentTable from './Pages/Documents/DocumentGrid'
import FinancialAssistant from "./Pages/FinancialAssistant/FinancialAssistant"
import InsuranceAssistant from './Pages/InsuranceAssistant/InsuranceAssistant'
import ExpencesTable from './Pages/Expenses/Expenses';
import BudgetsTable from './Pages/Budgets/Budgets';
import ExpenceCategoryTable from './Pages/ExpenceCategory/ExpenceCategory';
import {Provider} from "react-redux"
import store from '../src/Redux/Store/store'
import AuthRoute from './Component/AuthRoute/AuthRoute';
import home from './Pages/Home/Home';
import Chat from './Pages/Chat/Chat';
import { Alert } from 'react-bootstrap';
import {hideAlert} from './Redux/Reducers/alertslice'
import IncomeSourceTable from './Pages/Income_sources/Income_sources';
import RegisterModal from './Component/Register/Register';
import './App.css';
import InsuraceScheme from './Pages/InsuraceScheme/InsuraceScheme';
import InsuranceSchemes from './Pages/Insurance_Schemes/Insurance_Schemes';
function App() {
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setRegisterPopupOpen] = useState(false);
  const UserDetail = useSelector((state) => state.auth);
  const AlterService = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  const openLoginPopup = () => {
    setLoginPopupOpen(true);
    setRegisterPopupOpen(false);
  };
  const openRegisterPopup = () => {
    setRegisterPopupOpen(true);
    setLoginPopupOpen(false);
  };
  
  useEffect(() => {
    // Function to handle the scroll event
    const selectHeader = document.querySelector('#header');
    const handleScroll = () => {
      // Your scroll event logic goes here
      window.scrollY > 50 ? selectHeader.classList.add('sticked') : selectHeader.classList.remove('sticked');
    };
  

    const preloader = document.querySelector('#preloader');
    if (preloader) {
      window.addEventListener('load', () => {
        preloader.remove();
      });
    }
    window.addEventListener('scroll', handleScroll);
  
    // Cleaning up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('load', () => {
        preloader.remove();
      });
    };
  }, []);
  const closeLoginPopup = () => {
    setLoginPopupOpen(false);
  };
  const closeRegisterPopup = () => {
    setLoginPopupOpen(false);
  };
  console.log(AlterService.showAlert ? "show":"not show");
  return (
    <Provider store={store}>
          <Router>
                <div className="app-container">
                  <Header onOpen={openLoginPopup}/>
                  <LoginModal onClose={() => closeLoginPopup()} isopen={isLoginPopupOpen} OpenRegister={openRegisterPopup}/>
                  <RegisterModal onClose={()=>closeRegisterPopup()} isopen={isRegisterPopupOpen} openLogin={openLoginPopup}/>
                  <Alert variant={AlterService.alertType} show={AlterService.showAlert} onClose={()=>dispatch(hideAlert())} dismissible className={`animated-alert`}>
                    {AlterService.message}
                  </Alert>
                  <div className="page-content">
                    <Routes>
                      <Route path="/" exact element={<LandingPage/>} />
                      <Route path="/InsuraceScheme/:SchemeId" exact element={<InsuraceScheme/>} />
                      <Route path="/InsuraceSchemes" exact element={<InsuranceSchemes/>} />
                      <Route path="/Dashboard"  element= {<AuthRoute isAuthenticated={UserDetail.isAuthenticated} component={home}></AuthRoute> } />
                      <Route path="/UploadFile" element={<AuthRoute isAuthenticated={UserDetail.isAuthenticated} Component={FileUpload}></AuthRoute>} />
                      <Route path="/DocumentQ&A" element = {<AuthRoute isAuthenticated={UserDetail.isAuthenticated} component={Chat} ></AuthRoute>} />
                      <Route path="/Documents" element = {<AuthRoute isAuthenticated={UserDetail.isAuthenticated} component={DocumentTable}></AuthRoute>} />
                      <Route path="/financialAssistant" element = {<AuthRoute isAuthenticated={UserDetail.isAuthenticated} component={FinancialAssistant}></AuthRoute>} />
                      <Route path="/InsuranceAssistant" element = {<AuthRoute isAuthenticated={UserDetail.isAuthenticated} component={InsuranceAssistant}></AuthRoute>} />
                      <Route path="/Expenses" element = {<AuthRoute isAuthenticated={UserDetail.isAuthenticated} component={ExpencesTable}></AuthRoute>} />
                      <Route path="/Budget" element = {<AuthRoute isAuthenticated={UserDetail.isAuthenticated} component={BudgetsTable} ></AuthRoute>} />
                      <Route path="/ExpenseCategory" element = {<AuthRoute isAuthenticated={UserDetail.isAuthenticated}component={ExpenceCategoryTable}></AuthRoute>} />
                      <Route path="/IncomeSource" element = {<AuthRoute isAuthenticated={UserDetail.isAuthenticated}component={IncomeSourceTable}></AuthRoute>} />
                    </Routes>
                  </div>
                  

                </div>
              </Router>
    </Provider>
   
  );
}

export default App;
