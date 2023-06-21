export interface FormatResponeInterface {
    status: 'success' | 'error',
    data?: any,
    messege?: any
}

export const MessegeRespone = (data: any) : FormatResponeInterface => {
    const respone = <FormatResponeInterface>{
        status: 'success',
        data: data
    }

    return respone;
}