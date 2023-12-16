import React, { useState, useEffect } from "react";
import {useSelector,useDispatch} from "react-redux"
import "bootstrap/dist/css/bootstrap.min.css";
import {getExpense,getBudget,getIncomeSources} from '../../Services/Apiservice'
import {logout} from '../../Redux/Reducers/authslice'
import "./Home.css";
import ExpenseChart from "../../Component/ExpenseGraph/ExpenseGraph";
import IncomeSourceBarChart from "../../Component/IncomesourceGraph/IncomeSourceGraph";
import BudgetPieChart from "../../Component/BudgetGraph/BudgetGraph";
const Home = () => {

  const [IncomeSource, setIncomeSource] = useState([]);
  const [Expences, setExpences] = useState([]);
  const [Budgets, setBudgets] = useState([]);
  const UserDetail = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    GetExpence();
    GetIncomeSource();
    GetBudget();
    const selectHeader = document.querySelector("#header");
    selectHeader.classList.add("sticked");

    return () => {
      selectHeader.classList.remove("sticked");
    };
  }, []);

  const GetTotalIncome = ()=>{
    let sum =  IncomeSource.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.amount), 0);
    let formattedCurrency = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR', // Specify the currency code for Indian Rupees
    }).format(sum);
    return formattedCurrency
  }
  const GetTotalExpence = ()=>{
    let sum =  Expences.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.amount), 0);
    let formattedCurrency = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR', // Specify the currency code for Indian Rupees
    }).format(sum);
    return formattedCurrency
  }
  const GetTotalBudjet = ()=>{
    let sum =  Budgets.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.budget_amount), 0);
    let formattedCurrency = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR', // Specify the currency code for Indian Rupees
    }).format(sum);
    return formattedCurrency;
  }
  const Getcashonhand = ()=>{
    let incomes =  IncomeSource.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.amount), 0);
    let Expense =  Expences.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.amount), 0);
    let sum = Math.abs(incomes-Expense);
    let formattedCurrency = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR', // Specify the currency code for Indian Rupees
    }).format(sum);
    return formattedCurrency
  }


  async function GetExpence(){
    getExpense(UserDetail.token).then((data)=>{
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
  async function GetIncomeSource(){
    getIncomeSources(UserDetail.token).then((data)=>{ 
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
  async function GetBudget(){
    getBudget(UserDetail.token).then((data)=>{       
        setBudgets(data.Response);   
     }).catch((err)=>{
        console.log(err)
     })
  }
  return (
    <div className="hero d-flex align-items-stretched ">
      <div className="DashboardContainer" data-aos="fade-up">
        <div class="quick_activity_wrap">
          <div class="single_quick_activity">
            <h4>Total Income</h4>
            <h3>
              
              {GetTotalIncome()}
            </h3>
            
          </div>
          <div class="single_quick_activity">
            <h4>Total Expences</h4>
            <h3>
            {GetTotalExpence()}
             
            </h3>
            
          </div>
          <div class="single_quick_activity">
            <h4>Total Budget</h4>
            <h3>
            {GetTotalBudjet()}
            </h3>
            
          </div>
          <div class="single_quick_activity">
            <h4>Cash on Hand</h4>
            <h3>
            {Getcashonhand()}
            </h3>
           
          </div>
        </div>
        <div className="DashboardGraphs">
            <div className="Dashboard-Icome-Budget">
              <IncomeSourceBarChart incomeSources={IncomeSource}/>
              <BudgetPieChart budgets={Budgets}/>
              </div>
            <ExpenseChart expenses={Expences} chartType="weekly"/>
          
        </div>
      </div>
    </div>
  );
};

export default Home;
