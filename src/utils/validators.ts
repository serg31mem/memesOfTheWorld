type FieldValidatorsType = (value: string) => string | undefined

export const composeValidators = (...validators: Array<FieldValidatorsType>) => (value: string) =>
    validators.reduce<any>((error, validator) => error || validator(value), undefined)

export const required: FieldValidatorsType = (value) => {
    if (value || value === '') return undefined
    return 'Field is required'
}

export const maxLengthCreator = (maxLength: number): FieldValidatorsType => (value) => {
    if (value.length > maxLength) return `Max length is ${maxLength} symbols`
    return undefined
}