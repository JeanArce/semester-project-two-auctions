/**
 * 
 * @param {*} errorMessage 
 */
export const showError = (errorMessage) => {
  const errorModal = new bootstrap.Modal(
    document.getElementById('errorModal'),
    {
      keyboard: false,
      backdrop: 'static',
    },
  );
  const errorMessageEl = document.getElementById('errorMessage');
  errorMessageEl.innerText = errorMessage;
  errorModal.show();
};

/**
 * 
 * @param {*} data 
 * @returns 
 */
export const getErrorMessage = (data) => {
  const combinedString = data.errors.reduce((accumulator, obj) => {
    return accumulator + ' , ' + obj.message;
  }, '');

  const finalCombinedString = combinedString.trim().substring(2);

  return finalCombinedString;
}

/**
 * 
 * @param {*} successMessage 
 */
export const showSuccess = (successMessage) => {
  const successModal = new bootstrap.Modal(
    document.getElementById('successModal'),
    {
      keyboard: false,
      backdrop: 'static',
    },
  );
  const successMessageEl = document.getElementById('successMessage');
  successMessageEl.innerHTML = successMessage;
  successModal.show();
};