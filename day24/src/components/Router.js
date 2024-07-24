import  {jobDetailsContentEl} from '../common.js'
import {BASE_API_URL} from '../common.js'
import renderSpinner from './Spinner.js';
import { jobDetailsRender } from './JobDetails.js';
import renderErrorMessage from './Error.js';
const loadHandler =  async () => {
    console.log('DomContenetLoaded');
    const id = window.location.hash.substr(1);
    if(id){
        jobDetailsContentEl.innerHTML  = ''
        renderSpinner('job-details');
        fetch(`${BASE_API_URL}/jobs/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch job');
            }

            return response.json();
        })
        .then(data => {
            // extract job item
            const { jobItem } = data;

            // remove spinner
            renderSpinner('job--details')

            // render job details
            jobDetailsRender(jobItem)
        })
        .catch(error => 
        {
            renderSpinner('job--details');
            renderErrorMessage(error.message);

        }
        );
    }
}
window.addEventListener('DOMContentLoaded', loadHandler);