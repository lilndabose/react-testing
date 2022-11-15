import { queryByText, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

beforeEach(()=>{
  console.log("I run before every test !!!")
  // eslint-disable-next-line testing-library/no-render-in-setup
  render(<App />);
})

afterEach(()=>{
  console.log("I run after every test")
})

test("Default testing",()=>{
  // eslint-disable-next-line testing-library/no-debugging-utils
  screen.debug()
})

test("All input fields in form have to be empty initially",()=>{
  
  const emailFormElement = screen.getByRole("textbox")
  const passwordFormElement = screen.getByLabelText("Password")
  const cpasswordFormElement = screen.getByPlaceholderText("Confirm password")

  expect(emailFormElement.value).toBe("")
  expect(passwordFormElement.value).toBe("")
  expect(cpasswordFormElement.value).toBe("")
})

test("Ensuring that we can type into our input field",()=>{
  
  const emailInputElement = screen.getByRole('textbox',{ name: /email/i })
  const passwordInputElement = screen.getByLabelText("Password")
  const cpasswordInputElement = screen.getByPlaceholderText("Confirm password")

  userEvent.type(emailInputElement,"daniel@gmail.com")
  userEvent.type(passwordInputElement,"mypassword")
  userEvent.type(cpasswordInputElement,"mypassword")
  
  expect(emailInputElement.value).toBe("daniel@gmail.com")
  expect(passwordInputElement.value).toBe("mypassword")
  expect(cpasswordInputElement.value).toBe("mypassword")
})

test("Should display error message if email entered is invalid",()=>{
  

  const emailErrorElement = screen.queryByText(/incorrect email/i)
  const emailInputElement = screen.getByRole('textbox',{ name: /email/i })
  const buttonElement = screen.getByRole("button",{ name: /submit/i })

  expect(emailErrorElement).not.toBeInTheDocument()

  userEvent.type(emailInputElement,"daniel.com")
  userEvent.click(buttonElement)

  const emailErrorElementAfterClick = screen.queryByText(/incorrect email/i)
  expect(emailErrorElementAfterClick).toBeInTheDocument()
})

test("Should display error message for password if not valid",()=>{
  

  const passwordErrorElement = screen.queryByText(/incorrect password should contain atleast 5 characters/i)
  const emailInputElement = screen.getByRole("textbox",{ name: /email/i })
  const passwordInputElement = screen.getByLabelText("Password")
  const submitBtnElement = screen.getByRole('button',{ name: /submit/i })

  expect(passwordErrorElement).not.toBeInTheDocument()

  userEvent.type(emailInputElement,"daniel@gmail.com")
  expect(emailInputElement.value).toBe("daniel@gmail.com")

  userEvent.type(passwordInputElement,"1234")
  expect(passwordInputElement.value).toBe("1234")
  userEvent.click(submitBtnElement)

  const passwordErrorElementAgain = screen.queryByText(/incorrect password should contain atleast 5 characters/i)
  expect(passwordErrorElementAgain).toBeInTheDocument()

})

test("Should display error message for confirm password if not valid",()=>{
  

  const passwordErrorElement = screen.queryByText(/password and confirm password donot match/i)
  const emailInputElement = screen.getByRole("textbox",{ name: /email/i })
  const passwordInputElement = screen.getByLabelText("Password")
  const cpasswordInputElement = screen.getByPlaceholderText("Confirm password")
  const submitBtnElement = screen.getByRole('button',{ name: /submit/i })

  expect(passwordErrorElement).not.toBeInTheDocument()

  userEvent.type(emailInputElement,"daniel@gmail.com")
  expect(emailInputElement.value).toBe("daniel@gmail.com")

  userEvent.type(passwordInputElement,"12345")
  expect(passwordInputElement.value).toBe("12345")

  userEvent.type(cpasswordInputElement,"2345")
  expect(cpasswordInputElement.value).toBe("2345")

  userEvent.click(submitBtnElement)

  const cpasswordErrorElementAgain = screen.queryByText(/password and confirm password donot match/i)
  expect(cpasswordErrorElementAgain).toBeInTheDocument()

})

test("Should not display error message if all fields are valid",()=>{

  const emailInputElement = screen.getByRole("textbox",{ name: /email/i })
  const passwordInputElement = screen.getByLabelText("Password")
  const cpasswordInputElement = screen.getByPlaceholderText("Confirm password")
  const submitBtnElement = screen.getByRole('button',{ name: /submit/i })

  

  userEvent.type(emailInputElement,"daniel@gmail.com")
  expect(emailInputElement.value).toBe("daniel@gmail.com")

  userEvent.type(passwordInputElement,"12345")
  expect(passwordInputElement.value).toBe("12345")

  userEvent.type(cpasswordInputElement,"12345")
  expect(cpasswordInputElement.value).toBe("12345")

  userEvent.click(submitBtnElement)

  const emailErrorElement = screen.queryByText(/incorrect email/i)
  const passwordErrorElement = screen.queryByText(/incorrect password should contain atleast 5 characters/i)
  const cpasswordErrorElement = screen.queryByText(/password and confirm password donot match/i)

  
  expect(emailErrorElement).not.toBeInTheDocument()
  expect(passwordErrorElement).not.toBeInTheDocument()
  expect(cpasswordErrorElement).not.toBeInTheDocument()

})