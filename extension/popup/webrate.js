const sendFeedback = async (positive, feedbackTags) => {
    await browser.tabs.query({ active: true, currentWindow: true }).then(async (tabs) => {
        const currentTab = tabs[0];
        const currentUrl = currentTab.url;

        const apiUrl = "http://localhost:3000/api/feedback/post";
        const data = {
            url: currentUrl,
            positive: positive,
            feedbackTags: feedbackTags,
        };

        await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {

    const thumbsUpButton = document.getElementById('thumbsUpButton');
    const thumbsDownButton = document.getElementById('thumbsDownButton');
    const feedbackNegativeButton = document.getElementById('feedbackNegativeButton');
    const chips = document.querySelectorAll('.chip');

    thumbsUpButton.addEventListener('click', async function() {
        await sendFeedback(true);

        document.getElementById('main-rating').style.display = 'none';
        document.getElementById('thankYou').style.display = 'block';
    });

    thumbsDownButton.addEventListener('click', async function() {
        await sendFeedback(false);
        
        document.getElementById('main-rating').style.display = 'none';
        document.getElementById('feedbackNegative').style.display = 'block';
        
    });

    feedbackNegativeButton.addEventListener('click', async function() {
        const feedbackTags = Array.from(document.querySelectorAll('.chip--active')).map(chip => chip.innerText);
        if (feedbackTags.length > 0) {
            await sendFeedback(false, feedbackTags);
        }

        document.getElementById('feedbackNegative').style.display = 'none';
        document.getElementById('thankYou').style.display = 'block';
    });

    chips.forEach(function (chip) {
        chip.addEventListener('click', function () {
            if (this.classList.contains('chip--active')) {
                this.classList.remove('chip--active');
            } else {
                this.classList.add('chip--active');
            }
        });
    });
});
