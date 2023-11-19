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