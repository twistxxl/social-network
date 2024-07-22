

export const requiredField = (value) => {
    if (value) {
        return undefined
    } else {
        return "Поле обязательно для заполнения"
    }
}

export const maxLengthCreator = (maxLength) => (value) => {
    if (value && value.length > maxLength) {
        return `Максимальная длина ${maxLength} символов`
    }
    return undefined
}