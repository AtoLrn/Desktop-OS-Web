export const generateId = () => {
    return `app-${shortId()}-${shortId()}-${shortId()}`
}

export const shortId = (length = 9) => {
    return (Math.random() + 1).toString(36).substring(length)
}
export const shortNumberId = () => {
    return Math.round(Math.random() * (100000000))
}