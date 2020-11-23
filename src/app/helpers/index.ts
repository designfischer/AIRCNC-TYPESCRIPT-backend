export function formatResponse(status: number, data?: object) {
    return {
        status: status,
        data: data
    }
}