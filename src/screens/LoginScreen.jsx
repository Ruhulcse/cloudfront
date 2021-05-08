import axios from 'axios';
import React,{useState} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress'
import {URL} from "../Utils/Config"

export default function LoginScreen() {
  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async(e) =>{
    e.preventDefault();
    const loginData = {};
    loginData.email = email;
    loginData.password = password;
    try {
      setLoading(true);
      const {data} = await axios.post(`${URL}api/v1/users/login`,loginData)
      console.log(data);
      if(data){
        setLoading(true);
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("token", data.token);
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div>
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            {/* <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            /> */}
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
              Data Workspace
            </h2>

            {/* <h3 class="mt-1 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
              Welcome Back
            </h3> */}
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-600">
              {loading?(<CircularProgress/>):(<p>Sign in to your account</p>)}
            </h2>
          </div>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-5 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6" onSubmit={submitHandler}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) =>setEmail(e.target.value)}
                      autoComplete="email"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                      autoComplete="current-password"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
