import {
    sortingEl,
    sortingBtnRelevantEl,
    sortingBtnRecentEl,
    state
} from '../common.js';
import { renderJobList } from './JobList.js';
import renderPaginationButtons from './Pagination.js';
sortingEl.addEventListener('click',function(event){
    event.preventDefault();

    const clickedButtonEl = event.target.closest('.sorting__button');

    if(!clickedButtonEl) return;

    const recent=  clickedButtonEl.className.includes('--recent') ? true : false;
    
    if(recent) {
        sortingBtnRecentEl.classList.add('sorting__button--active');
        sortingBtnRelevantEl.classList.remove('sorting__button--active');
    }else{
        sortingBtnRecentEl.classList.remove('sorting__button--active');
        sortingBtnRelevantEl.classList.add('sorting__button--active');
    }

    if(recent){
        state.searchJobItems.sort((a,b) => {
            return a.daysAgo - b.daysAgo;
        });
    }else{
        state.searchJobItems.sort((a,b) => {
            return b.relevanceScore - a.relevanceScore;
        });
    }
    renderPaginationButtons()
    renderJobList();

})