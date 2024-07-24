
import {

    jobListSearchEl,
    jobDetailsContentEl,
    BASE_API_URL,
    state
    
} from '../common.js';
import renderSpinner from './Spinner.js'
import { jobDetailsRender } from './JobDetails.js';
import renderErrorMessage from './Error.js'



//render job list 

export const renderJobList = ()=>{
    //cleaning prev job list
    jobListSearchEl.innerHTML = '';
    state.searchJobItems.slice(state.currentPage * 7 - 7, state.currentPage * 7).forEach(jobItem => {
        const newJobItemHTML = `
            <li class="job-item">
                <a class="job-item__link" href="${jobItem.id}">
                    <div class="job-item__badge">${jobItem.badgeLetters}</div>
                    <div class="job-item__middle">
                        <h3 class="third-heading">${jobItem.title}</h3>
                        <p class="job-item__company">${jobItem.company}</p>
                        <div class="job-item__extras">
                            <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i> ${jobItem.duration}</p>
                            <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i> ${jobItem.salary}</p>
                            <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i> ${jobItem.location}</p>
                        </div>
                    </div>
                    <div class="job-item__right">
                        <i class="fa-solid fa-bookmark job-item__bookmark-icon"></i>
                        <time class="job-item__time">${jobItem.daysAgo}d</time>
                    </div>
                </a>
            </li>
        `;
        jobListSearchEl.insertAdjacentHTML('beforeend', newJobItemHTML);
    });
}
// -- JOB LIST COMPONENT --
const clickHandler = event => {
    // prevent default behavior (navigation)
    event.preventDefault();

    // get clicked job item element
    const jobItemEl = event.target.closest('.job-item');

    // remove the active class from previously active job item
    document.querySelector('.job-item--active')?.classList.remove('job-item--active');

    // add active class
    jobItemEl.classList.add('job-item--active');

    // empty the job details section
    jobDetailsContentEl.innerHTML = '';

    // render spinner
    renderSpinner('job--details')

    // get the id
    const id = jobItemEl.children[0].getAttribute('href');

    // fetch job item data
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
};

jobListSearchEl.addEventListener('click', clickHandler);

