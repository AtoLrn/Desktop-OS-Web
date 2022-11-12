
export const setValueInput = (id: string, value: string) => {
    const el = document.getElementById(id)
    if(el === null) return value
    if(value === null) {
        value = el.value
    }
     el.value = value

    return el.value
    
}
