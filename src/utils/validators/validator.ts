

export type FieldValidatorType = (value : string) => string | undefined


export const requiredField: FieldValidatorType = (value) => {
    if (value) {
        return undefined
    } else {
        return "Поле обязательно для заполнения"
    }
}


export const maxLengthCreator = (maxLength: number): FieldValidatorType => (value) => {
    if (value && value.length > maxLength) {
        return `Максимальная длина ${maxLength} символов`
    }
    return undefined
}