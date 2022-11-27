export const setValueInput = (id: string, value: string) => {
    const el = document.getElementById(id) as HTMLInputElement
    if(el === null) return value
    if(value === null) {
        value = el.value
    }
     el.value = value

    return el.value
    
}

export const htmlById = (id: string) => {
    return document.getElementById(id) as HTMLElement
}


