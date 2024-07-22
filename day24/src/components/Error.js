import {
    errorEl,
    errorTextEl,
    DEFAULT_DISPLAY_TIME
} from '../common.js'
const renderErrorMessage = (message= 'Something went wrong!!!') =>{
    errorTextEl.textContent = message;
    errorEl.classList.add('error--visible');
    setTimeout(() => {
        errorEl.classList.remove('error--visible');
    }, DEFAULT_DISPLAY_TIME);
}

export default renderErrorMessage;