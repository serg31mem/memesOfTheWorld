export const composeValidators = (...validators) => value =>
    validators.reduce((error, validator) => error || validator(value), undefined)

export const required = (value) => {
    if (value || value === '') return undefined
    return 'Field is required'
}

export const maxLengthCreator = (maxLength) => (value) => {
    if (value.length > maxLength) return `Max length is ${maxLength} symbols`
    return undefined
}