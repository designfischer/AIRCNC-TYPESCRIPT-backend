export function formatResponse(status: number, data?: object) {
    return {
        status: status,
        data: data
    }
}

export function covertStringToArray(techs: string | undefined) {
    if (techs) {
        const splitedString = techs.split(',')
        const newArray = splitedString.map(item => item.trim())
        return newArray
    }
    return []
}