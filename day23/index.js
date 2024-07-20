const textareaEl = document.querySelector(".form__textarea");
const counterEl = document.querySelector(".counter");
const submitButtonEl = document.querySelector('.submit-btn');
const feedbackList = document.querySelector(".feedbacks");
const formEl = document.querySelector(".form");
const spinnerEl = document.querySelector(".spinner");
const hashtagsList = document.querySelector(".hashtags");

const MAX_CHARS = 150;
const BASE_API_URL = 'https://bytegrad.com/course-assets/js/1/api'
textareaEl.addEventListener("input", function () {
    const typedChar = textareaEl.value.length;
    const charsLeft = MAX_CHARS - typedChar;
    counterEl.textContent = charsLeft;
});

//  -- VALID OR INVALID STATE -- 
const showVisualIndicator = (textCheck) => {
    const className = textCheck === 'valid' ? 'form--valid' : 'form--invalid';
    formEl.classList.add(className);

    setTimeout(() => {
        formEl.classList.remove(className);
    }, 2000);
}

// -- RENDERING FEEDBACK--
const renderFeedback = (feedbackItem)=>{
    const newFeedHTML = `
        <li class="feedback"> 
            <button class="upvote">
                <i class="fa-solid fa-caret-up upvote_icon"></i>
                <span class="upvote__count">${feedbackItem.upvoteCount}</span>
            </button>
            <section class="feedback__badge">
                <p class="feedback__letter">${feedbackItem.badgeLetter}</p>
            </section>
            <div class="feedback__content">
                <p class="feedback__company">${feedbackItem.company}</p>
                <p class="feedback__text">${feedbackItem.text}</p>
            </div>
            <p class="feedback_date">${feedbackItem.daysAgo === 0 ? 'NEW' : `${feedbackItem.daysAgo} d`}</p>
        </li>
    `;

    feedbackList.insertAdjacentHTML('beforeend', newFeedHTML);
}
formEl.addEventListener("submit", function (e) {
    e.preventDefault();

    const text = textareaEl.value;

    if (text.includes('#') && text.length >= 5) {
        showVisualIndicator('valid');
    } else {
        showVisualIndicator('invalid');
        textareaEl.focus();
        return;
    }

    const hashtags = text.split(' ').filter(word => word.startsWith('#')).join(' ');
    const company = hashtags.substring(1);
    const badgeLetter = company.substring(0, 1).toUpperCase();
    const upvoteCount = 0;
    const daysAgo = 0;
    const feedbackItem = {
        upvoteCount,
        company,
        text,
        daysAgo,
        badgeLetter
    }
    renderFeedback(feedbackItem);

    // -- SEND TO THE SERVER --
    fetch(`${BASE_API_URL}/feedbacks`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(feedbackItem)
    }).then((res)=>{
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    }).catch((err)=>{
        console.log(err)
    })

    textareaEl.value = '';
    counterEl.textContent = MAX_CHARS;
    submitButtonEl.blur();
});

// -- FEEDBACK LIST COMPONENT --

 
feedbackList.addEventListener('click',function(e){
   const clickedEl = e.target;

   const upvoteIntention = clickedEl.className.includes('upvote');
   if(upvoteIntention){
    const upvoteBtnEl = clickedEl.closest('.upvote');
    upvoteBtnEl.disabled = true;


    const upvoteCountEl = upvoteBtnEl.querySelector('.upvote__count');
    let upvoteCount = +upvoteCountEl.textContent ;
    

    upvoteCountEl.textContent = ++upvoteCount;
    
  
   }else{
    //expend the clicked item
    clickedEl.closest('.feedback').classList.toggle('feedback--expand');
   }
});

fetch(`${BASE_API_URL}/feedbacks`)
    .then((res) => res.json())
    .then((response) => {
        spinnerEl.remove()
        // Check if response contains feedbacks array
        if (response.feedbacks && Array.isArray(response.feedbacks)) {
            response.feedbacks.forEach(feedback => {
                renderFeedback(feedback)
            });
        } else {
            console.error('Unexpected response format:', response);
        }
    })
    .catch((err) => {
     feedbackList.textContent = `Failure: ${err.message}`
    });


    // -- HASHTAGS LIST --
    hashtagsList.addEventListener('click',(e)=>{

        const clicked = e.target;

        if(clicked.classname === 'hashtags'){
            return 
        }

        const companyNameFromHashtag  = clicked.textContent.substring(1).toLowerCase().trim();
        
    feedbackList.childNodes.forEach(feedbacks =>{
        if(feedbacks.nodeType === 3) return;


        const companyNameFromFeedbackList = feedbacks.querySelector('.feedback__company').textContent.toLowerCase().trim();
        

        if(companyNameFromHashtag 
            !== companyNameFromFeedbackList){
            feedbacks.remove();
        }
    })
    })