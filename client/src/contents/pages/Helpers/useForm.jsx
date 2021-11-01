import React, {useState,useEffect} from 'react'


// form helper function
const useForm=(values,setValues,callback, validate)=>{
  // errors for validation
  const [errors, setErrors] = useState({})
  const [isSubmiting, setIsSubmiting] = useState(false)

  // set values on change
  const handleChange = e =>{
    const {name, value} = e.target
    setValues({
      ...values,
      [name]: value
    })
  }

  // check validation and continue submitting
  const handleSubmit = e =>{
    e.preventDefault()
    setErrors(validate(values))
    setIsSubmiting(true)
  }
  
  // component did update
  useEffect(()=>{
    if(Object.keys(errors).length===0&&isSubmiting){
      callback()
    }
  },[errors])

  return{
    handleChange,
    handleSubmit,
    values,
    errors
  }
}

export default useForm