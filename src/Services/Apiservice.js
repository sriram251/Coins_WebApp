import axios from '../AxiosExtension/AxiosExtension';

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

export const GetInsuranceSchemes = async (token)=>{
  try{
      let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: AppService + Endpoints.Get_InsuranceScheme,
          headers: { 
              'Authorization': 'Bearer '+ token 
          }
          
        };
        
       let response = await axios.request(config);
       
       return response.data
  }
  catch (error) {
      // Handle errors more explicitly
      console.error('GetDocuments failed:', error);
      throw error; // Rethrow the error to be caught by the caller
    }
  

}
export const GetInsuranceSchemesByID = async (token,Id)=>{
  try{
      let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: AppService + Endpoints.Get_insurance_schemeByID + Id,
          headers: { 
              'Authorization': 'Bearer '+ token 
          }
          
        };
        
       let response = await axios.request(config);
       
       return response.data
  }
  catch (error) {
      // Handle errors more explicitly
      console.error('GetDocuments failed:', error);
      throw error; // Rethrow the error to be caught by the caller
    }
  

}
export const GetDocuments = async (token)=>{
    try{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: AppService + Endpoints.GetDocuments,
            headers: { 
                'Authorization': 'Bearer '+ token 
            }
            
          };
          
         let response = await axios.request(config);
         
         return response.data
    }
    catch (error) {
        // Handle errors more explicitly
        console.error('GetDocuments failed:', error);
        throw error; // Rethrow the error to be caught by the caller
      }
    

}

export const getBudget = async (token) => {
    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: AppService + Endpoints.Get_Budgets,
        headers: {
          'Authorization': 'Bearer ' + token
        }
      };
  
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
};
export const getExpense = async (token) => {
    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: AppService + Endpoints.Get_Expenses,
        headers: {
          'Authorization': 'Bearer ' + token
        }
      };
  
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
export const getExpenseCategory = async (token) => {
    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: AppService + Endpoints.Get_ExpenseCategorys,
        headers: {
          'Authorization': 'Bearer ' + token
        }
      };
  
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
export const Get_InsuranceCategory = async (token) => {
    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: AppService + Endpoints.Get_InsuranceCategory,
        headers: {
          'Authorization': 'Bearer ' + token
        }
      };
  
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
export const getIncomeSources = async (token) => {
    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: AppService + Endpoints.Get_income_sources,
        headers: {
          'Authorization': 'Bearer ' + token
        }
      };
  
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
};
  

export const deleteDocument = async (documentId, token) => {
    try {
      const config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `${AppService}${Endpoints.DeleteDocument}/${documentId}`,
        headers: {
          'Authorization': 'Bearer ' + token
        }
      };
  
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };


export const addIncomeSource = async (incomeSource, token) => {
    try {
      const data = JSON.stringify(incomeSource);
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: AppService + Endpoints.add_income_source,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        data: data
      };
  
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

export const addExpense = async (expenseData, token) => {
    try {
      const data = JSON.stringify(expenseData);
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: AppService + Endpoints.add_Expense,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        data: data
      };
  
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
export const addBudget = async (budgetData, token) => {
    try {
      const data = JSON.stringify(budgetData);
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: AppService + Endpoints.add_Budget,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        
        data: data
      };
  
      console.log(config)
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      return response.data;
    } catch (error) {

      console.error(error);
      throw error;
    }
  };
export const addExpenseCategory = async (expenseCategory, token) => {
    try {
      const data = JSON.stringify(expenseCategory);
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: AppService + Endpoints.add_ExpenseCategory, // Assuming this is correct, you may need to replace it with the actual endpoint for adding expense categories
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        data: data
      };
  
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
export const addDocument = async (token, documentData) => {
    try {
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: AppService + Endpoints.UploadDocument,
            headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'multipart/form-data'
            },
            data: documentData
        };
  
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };


export const add_insurance_scheme = async (token, insuranceData) => {
    try {
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: AppService + Endpoints.add_insurance_scheme,
            headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'multipart/form-data'
            },
            data: insuranceData
        };
  
      const response = await axios.request(config);
      
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

export const Get_Insurance_Summary = async (token, insuranceData) => {
    try {
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: AppService + Endpoints.SummarizeDocument,
            headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'multipart/form-data'
            },
            data: insuranceData
        };
  
      const response = await axios.request(config);
      
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
export const financailAssistant = async (token, Question) => {
    try {
        const data = JSON.stringify(Question);
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: AppService + Endpoints.FinancialAssistant,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              },
            data: data
        };
  
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
export const ChatWithScheme = async (token, Question) => {
    try {
        const data = JSON.stringify(Question);
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: AppService + Endpoints.QAInsuranceScheme,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              },
            data: data
        };
  
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  export const DocumentQA = async (token, Question) => {
    try {
        const data = JSON.stringify(Question);
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: AppService + Endpoints.QAdocument,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              },
            data: data
        };
  
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  export const ChatWithInsuranceAssistant = async (token, Question) => {
    try {
        const data = JSON.stringify(Question);
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: AppService + Endpoints.InsuranceAssistant,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              },
            data: data
        };
  
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };