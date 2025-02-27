import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [password, setShowPassword] = useState(false);
  const [confirmPass, setShowConfirmPass] = useState(false);
  const navigate = useNavigate();
  const [formData, setUserFormData] = useState({
    firstname : '',
    lastname : '',
    username : '',
    email : '',
    countrycode : '',
    mobile : '',
    password : '',
    confirmPass : ''
  });

  const [errors, setError] = useState({
    color : 'red',
    firstname : '',
    lastname : '',
    username : '',
    email : '', 
    mobile : '',
    password : '',
    confirmPass : ''
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!password);
  };
  const toggleConfirmPassVisibility = () => {
    setShowConfirmPass(!confirmPass);
  };

const validateFields = (name, value) => {
  let error = '';
  if(!value.trim()){
    error = 'This field is required';
  } else{
    if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      error = 'Enter a valid email address.';
    }
    if (name === 'confirmPass' && value !== formData.password) {
      error = 'Passwords do not match.';
    }
  }
  return error;
};

 const handleOnChange = (e) =>{
  const { name, value } = e.target; 
    const error = validateFields(name, value);
    setError({
      ...errors,
      [name] : error
    });
    setUserFormData({
      ...formData,
      [name] : value
    });
 };

const handleLogin = () => {
  navigate('/login');
}

 const handleSubmit =  async (e) => {
  debugger
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateFields(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
    } else {
      const {
        firstname ,
        lastname ,
        username ,
        email ,
        countrycode ,
        mobile ,
        password ,
       } = formData;
  
       const requestBody = {
        FRISTNAME: firstname,
        LASTNAME: lastname,
        USERNAME: username,
        EMAIL: email,
        COUNTRYCODE: countrycode,
        PHONE_NUMBER: mobile,
        PASSWORD: password
      };
      try{
        debugger
          const response = await fetch('https://localhost:44348/api/Authentication/RegisterUser',{
            method : 'POST',
            headers: {
              'Accept': '*/*',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
          });
         debugger
            const data = await response.json();
    
            if (data.success && response.ok) {
              toast.success(data.message, {autoClose: 1000});
              setTimeout(() => {
                navigate('/verifyotp');
              },1000);
            }else {
              toast.error(data.message);
            }
       
        
      }catch (error) {
        console.error('Error:', error);
      }

    }

     
 }

  return (
    <>
     
      <div className="flex  justify-center items-center h-screen">
        <div className="bg-[#242529] w-100 h-[616px] rounded-md">
          <div className="p-5">
            <h1 className="font-bold text-3xl font-sans text-white">Sign Up</h1>
          </div>
          <form onSubmit={handleSubmit} className="text-white">
            <div className="flex flex-col h-full">
              <div className="flex flex-row px-5 py-2 gap-x-4 justify-center w-full h-[65px]">
                <div className="flex flex-col">
                <input
                  type="text"
                  placeholder="FirstName"
                  className={`p-1 border-1 outline-0 border-gray-400 ${errors.firstname ? 'border-red-500'  : ''} ${errors.firstname ? 'outline-none'  : ''}  w-full text-white rounded-sm focus:outline-1 focus:outline-[#00c2b2]`}
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleOnChange}
                  id="fname"
                />
                {errors.firstname && <span className=" text-xs text-red-500">{errors.firstname}</span>}
                </div>
                <div className="flex flex-col">
                <input
                  type="text"
                  placeholder="LastName"
                  className={`p-1 border-1 outline-0 border-gray-400 ${errors.lastname ? 'border-red-500'  : ''} ${errors.lastname ? 'outline-none'  : ''}  w-full rounded-sm focus:outline-1 focus:outline-[#00c2b2]`}
                  name="lastname"
                  value = {formData.lastname}
                  onChange={handleOnChange}
                  id="sname"
                  
                />
                {errors.lastname && <span className=" text-xs text-red-500">{errors.lastname}</span>}
                </div>
               
              </div>

              <div className="px-5 py-2 h-[65px]">
                <input
                  type="username"
                  className={`p-1 border-1 outline-0 border-gray-400 ${errors.username ? 'border-red-500'  : ''} ${errors.username ? 'outline-none'  : ''} w-full rounded-sm focus:outline-1 focus:outline-[#00c2b2]`}
                  placeholder="UserName"
                  name="username"
                  id="UserName"
                  value= {formData.username}
                  onChange={handleOnChange}
                  
                />
                {errors.username && <span className=" text-xs text-red-500">{errors.username}</span>}
              </div>

              <div className="px-5 py-2 h-[65px]">
                <input
                  type="text"
                  className={`p-1 border-1 outline-0 border-gray-400 ${errors.email ? 'border-red-500'  : ''} ${errors.email ? 'outline-none'  : ''} w-full rounded-sm focus:outline-1 focus:outline-[#00c2b2]`}
                  placeholder="Email"
                  name="email"
                  value = {formData.email}
                  onChange={handleOnChange}
                  id="email"                 
                />
                {errors.email && <span className=" text-xs text-red-500">{errors.email}</span>}
              </div>

              <div className="px-5 py-2 gap-x-2 w-full h-[65px]">
                <div className="flex flex-row">
                  <div>
                  <select
                    name="countrycode"
                    id="country-select"
                    className= {`p-1 border-1 outline-0 border-gray-400 ${errors.mobile ? 'border-red-500'  : ''} ${errors.mobile ? 'outline-none'  : ''} bg-[#242529] rounded-sm focus:outline-1 focus:outline-[#00c2b2]`}
                    value={formData.countrycode}
                    onChange={handleOnChange}
                  >
                    <option value="">-</option>
                    <option value="+91">Ind</option>
                  </select>                
                </div>
                <div className="w-full ml-2">
                  <input
                    type="text"
                    name="mobile"
                    className={`p-1 border-1 outline-0 border-gray-400 ${errors.mobile ? 'border-red-500'  : ''} ${errors.mobile ? 'outline-none'  : ''} w-full rounded-sm focus:outline-1 focus:outline-[#00c2b2]`}
                    id="mobile"
                    placeholder="Mobile number"
                    value={formData.mobile}
                    onChange={handleOnChange}
                  />
                </div>  
               </div>
               {errors.mobile && <span className=" text-xs text-red-500">{errors.mobile}</span>}          
              </div>
              
              <div className="px-5 py-2  w-full relative h-[65px]">
                <input
                  type={password ? "text" : "password"}
                  name="password"
                  className={`p-1 border-1 outline-0 border-gray-400 ${errors.password ? 'border-red-500'  : ''} ${errors.mobile ? 'outline-none'  : ''} w-full rounded-sm focus:outline-1 focus:outline-[#00c2b2]`}
                  id="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleOnChange}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-0 px-6 py-1 text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  {password ? "🙈" : "🐵"}
                </button>
                {errors.password && <span className=" text-xs text-red-500">{errors.password}</span>}
              </div>
              <div className="px-5 py-2 w-full relative h-[65px]">
                <input
                  type={confirmPass ? "text" : "password"}
                  className={`p-1 border-1 outline-0 border-gray-400 ${errors.password ? 'border-red-500'  : ''} ${errors.mobile ? 'outline-none'  : ''} w-full rounded-sm focus:outline-1 focus:outline-[#00c2b2]`}
                  name="confirmPass"
                  value={formData.confirmPass}
                  onChange={handleOnChange}
                  placeholder="Confirm password"
                />

                <button
                  type="button"
                  onClick={toggleConfirmPassVisibility}
                  className="absolute  right-0 px-6 py-1 text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  {confirmPass ? "🙈" : "🐵"}
                </button>
                {errors.confirmPass && <span className=" text-xs text-red-500">{errors.confirmPass}</span>}
              </div>
              <div className="px-5 py-2 h-[65px]">
                <button
                  type="submit"
                  className="bg-[#00c2b2] w-30 rounded-md text-white font-bold py-2 px-4 cursor-pointer"
                >
                  Sign Up
                </button>
                <ToastContainer position="top-center" />
              </div>
              <div className="px-5 py-1">
                <p>Already have an account ? <span className="text-[#00c2b2] cursor-pointer" onClick={handleLogin}>Sign In</span> </p>
              </div>
            </div>
          </form>
          
        </div>
      </div>
     
    </>
  );
};

export default Login;
