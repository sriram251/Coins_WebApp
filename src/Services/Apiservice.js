import axios from 'axios';
import {AppService,Endpoints} from '../config';


export const login = async (login) => {
  try {
    const data = JSON.stringify(login);
    const url = AppService + Endpoints.Login;

    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    // Handle errors more explicitly
    console.error('Login failed:', error);
    throw error; // Rethrow the error to be caught by the caller
  }
};

export const register = async (registerData) => {
  try {
    const data = JSON.stringify(registerData);
    const url = AppService + Endpoints.Register;

    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } 
  catch (error) {
    // Handle errors more explicitly
    console.error('Registration failed:', error);
    throw error; // Rethrow the error to be caught by the caller
  }
};


const GetDocuments = async (token)=>{
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: AppService + Endpoints.GetDocuments,
        headers: { 
            'Authorization': 'Bearer '+ token 
        }
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      })
}

const GetBudget = async (token)=>{
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: AppService + Endpoints.Get_Budgets,
        headers: { 
            'Authorization': 'Bearer '+ token
        }
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      })
}
const GetExpense = async (token)=>{
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: AppService + Endpoints.Get_Expenses,
        headers: { 
            'Authorization': 'Bearer '+ token
         }
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      })
}
const GetExpenseCategory = async (token)=>{
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: AppService + Endpoints.Get_ExpenseCategorys,
        headers: { 
            'Authorization': 'Bearer '+ token
        }
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      })
}
const GetIncome_sources = async (token)=>{
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: AppService + Endpoints.Get_income_sources,
        headers: { 
            'Authorization': 'Bearer '+token
        }
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      })
}


const DeleteDocument = (documentId,token)=>{
    let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: AppService + Endpoints.DeleteDocument +"/"+documentId,
        headers: { 
            'Authorization': 'Bearer '+token
        }
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
}


const AddIncomeSource = (Incomesource,token)=>{
    let data = JSON.stringify(Incomesource);
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: AppService + Endpoints.add_income_source ,
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': 'Bearer '+token
        },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
}


const Add_Expense = (AddExpense,token)=>{
    let data = JSON.stringify(AddExpense);
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: AppService + Endpoints.add_Expense,
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer '+token
        },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
      
}

const AddBudget = (AddBudget,token)=>{

    let data = JSON.stringify(AddBudget);
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: AppService + Endpoints.add_Budget,
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': 'Bearer '+token
        },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
}
const AddExpenseCategory = (AddBudget,token)=>{

    let data = JSON.stringify(AddBudget);
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: AppService + Endpoints.add_Budget,
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': 'Bearer '+token
        },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
}