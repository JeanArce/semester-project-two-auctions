const baseUrl = 'https://api.noroff.dev/api/v1';

/**
 * 
 * @param {*} data 
 * @returns 
 */
export const registerApi = async(data) => {
    const registerEndpoint = baseUrl + '/auction/auth/register';
    const executeRegister = await fetch(registerEndpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    const registerData = await executeRegister.json();
    return registerData;
};

/**
 * 
 * @param {*} data 
 * @returns 
 */

export const loginApi = async(data) => {
    const loginEndpoint = baseUrl + '/auction/auth/login';
    const executeLogin = await fetch(loginEndpoint, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json; charset=UTF-8',
        },
    });

    const loginData = await executeLogin.json();
    return loginData;
 };