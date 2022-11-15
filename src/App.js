import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
// import { validate } from 'react-email-validator';
import  validator from 'validator'

function App() {
  
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [cpassword,setCpassword] = useState('')
  const [errorMessage,setErrorMessage] = useState('')

  const submitForm=(e)=>{
    e.preventDefault()
    console.log("Password: "+password)
    if(!validator.isEmail(email)){
      return setErrorMessage('incorrect email')
    }else if(password.length < 5){
      return setErrorMessage('incorrect password should contain atleast 5 characters')
    }else if(password!==cpassword){
      return setErrorMessage('password and confirm password donot match')
    }else{
      setErrorMessage('')
    }
  }

  return (
    <div className="container">
        <form onSubmit={submitForm}>
          <div className='mb-3'>
              <label htmlFor='email' className='form-label'>Email address</label>
              <input type="text" value={email} className='form-control'
              onChange={(e)=> setEmail(e.target.value)} name="email"  id='email' />
          </div>
          <div className='mb-3'>
              <label htmlFor='password' className='form-label'>Password</label>
              <input name="password" value={password} onChange={(e)=> setPassword(e.target.value)}
              type="password" className='form-control' id='password' />
          </div>
          <div className='mb-3'>
              <label htmlFor='cpassword' className='form-label'>Confirm Password</label>
              <input name="cpassword" value={cpassword} onChange={(e)=> setCpassword(e.target.value)}
               placeholder='Confirm password' type="password" className='form-control' id='cpassword' />
          </div>

         { errorMessage && <p className='text-danger'>{errorMessage }</p>}
          <button type='submit' className='btn btn-primary'>Submit</button>
        </form>
    </div>
  );
}

export default App;
