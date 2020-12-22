
type ValidatorFunctionType = (value: string) => string | undefined

export const required: ValidatorFunctionType = (value) => {
  if (!value) {
    return "Field is required"
  }

  return undefined
}

export const createMaxLengthValivator = (numberOfSymbols: number): ValidatorFunctionType => {
  return (value) => {
    if (value && value.length > numberOfSymbols) {
      return `Must be ${numberOfSymbols} characters or less`
    } 
    return undefined
  }
}

export const isEmail: ValidatorFunctionType = (value) => {
  if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return "Please enter valid email address"
  }
  return undefined
}