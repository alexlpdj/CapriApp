export const UPDATE_AUTH = 'UPDATE_AUTH';



export function updateAuthData(authData) {
    return { type: UPDATE_AUTH, payload: authData }
}