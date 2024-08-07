import {
    searchInputEl,
    searchFormEl,
    jobListSearchEl,
    numberEl,
    BASE_API_URL,
    state
    
} from '../common.js';

import renderErrorMessage from './Error.js'
import renderSpinner from './Spinner.js'
import { renderJobList } from './JobList.js';

// -- SEARCH COMPONENT --
const submitHandler = async event => {
    // prevent default behavior
    event.preventDefault();

    // get search text
    const searchText = searchInputEl.value;

    // validation (regular expression example)
    const forbiddenPattern = /[0-9]/;
    const patternMatch = forbiddenPattern.test(searchText);
    if (patternMatch) {
        renderErrorMessage('You are not allowed to submit numbers')
        return;
    }

    // blur input
    searchInputEl.blur();

    // remove previous job items
    jobListSearchEl.innerHTML = '';

    // render spinner
    renderSpinner('search');

    // fetch search results
    try{

        const response = await fetch(`${BASE_API_URL}/jobs?search=${searchText}`);
        const data = await response.json();

            if (!response.ok) {
                throw new Error('Failed to fetch search results');
            }
            // extract job items
            const { jobItems } = data;

            //update state
            state.searchJobItems = jobItems
          
            // remove spinner
            renderSpinner('search')

            // render number of results
            numberEl.textContent = state.searchJobItems.length;

            // render job items in search job list
            renderJobList();
    }catch(error){
        renderSpinner('search')
        renderErrorMessage(error.message);
    }



    // fetch(`${BASE_API_URL}/jobs?search=${searchText}`)
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch search results');
    //         }

    //         return response.json();
    //     })
    //     .then(data => {
    //         // extract job items
    //         const { jobItems } = data;

    //         // remove spinner
    //         renderSpinner('search')

    //         // render number of results
    //         numberEl.textContent = jobItems.length;

    //         // render job items in search job list
    //         renderJobList(jobItems);
    //     })
    //     .catch(error => {
    //         renderSpinner('search')
    //         renderErrorMessage(error.message);
    //     });


    
};


searchFormEl.addEventListener('submit', submitHandler);