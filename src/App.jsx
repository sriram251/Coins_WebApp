import React, { useState,useEffect  } from 'react';
import {useSelector} from "react-redux"
import './App.css';
import { BrowserRouter as Router,Routes ,Route} from 'react-router-dom';
import Header from './Component/Header/Header';
import LandingPage from './Pages/LandinPage/LandingPage';
import Dashboard from './Pages/Home/Home';
import FileUpload from './Pages/FileUpload/FileUpload';
import DocumentQA from './Pages/Chat/Chat';
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
function App() {
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  const UserDetail = useSelector((state) => state.auth);
  const openLoginPopup = () => {
    setLoginPopupOpen(true);
    console.log(isLoginPopupOpen)
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
  console.log(home)
  return (
    <Provider store={store}>
          <Router>
                <div className="app-container">
                  <Header onOpen={openLoginPopup}/>
                  <LoginModal onClose={() => closeLoginPopup()} isopen={isLoginPopupOpen} />
                  <div className="page-content">
                    <Routes>
                      <Route path="/" exact element={<LandingPage/>} />
                      
                      <Route path="/Dashboard"  element= {<AuthRoute isAuthenticated={UserDetail.isAuthenticated} component={home}></AuthRoute> } />
                      <Route path="/UploadFile" element={<AuthRoute isAuthenticated={UserDetail.isAuthenticated} Component={FileUpload}></AuthRoute>} />
                      <Route path="/DocumentQ&A" element = {<AuthRoute isAuthenticated={UserDetail.isAuthenticated} component={Chat} ></AuthRoute>} />
                      <Route path="/Documents" element = {<AuthRoute isAuthenticated={UserDetail.isAuthenticated} component={DocumentTable}></AuthRoute>} />
                      <Route path="/financialAssistant" element = {<AuthRoute isAuthenticated={UserDetail.isAuthenticated} component={FinancialAssistant}></AuthRoute>} />
                      <Route path="/InsuranceAssistant" element = {<AuthRoute isAuthenticated={UserDetail.isAuthenticated} component={InsuranceAssistant}></AuthRoute>} />
                      <Route path="/Expenses" element = {<AuthRoute isAuthenticated={UserDetail.isAuthenticated} component={ExpencesTable}></AuthRoute>} />
                      <Route path="/Budget" element = {<AuthRoute isAuthenticated={UserDetail.isAuthenticated} component={BudgetsTable} ></AuthRoute>} />
                      <Route path="/ExpenseCategory" element = {<AuthRoute isAuthenticated={UserDetail.isAuthenticated}component={ExpenceCategoryTable}></AuthRoute>} />
                    </Routes>
                  </div>
                  

                </div>
              </Router>
    </Provider>
   
  );
}

export default App;
