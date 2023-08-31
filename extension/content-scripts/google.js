
const fetchRatings = async (urls) => {
    
    const apiUrl = "http://localhost:3000/api/feedback/get";
    const data = {
        urls,
    };

    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })

    const result = await response.json();
    return result;
}

const createTag = (text, color) => {
    const tag = document.createElement('div');
    tag.innerHTML = text;
    tag.style = `
        background-color: ${color};
        color: white;
        padding: 2px 6px;
        border-radius: 4px;
        display: inline-block;
        margin-left: 10px;`;
    return tag;
}



const searchResults = document.getElementById('rso');

let urls = Array.from(searchResults.childNodes).map(result => {
    try {
        return result.querySelector('a').href
    } catch (err) {
        return null;
    }
});
urls = urls.filter(url => url !== null);

const apiUrl = "http://localhost:3000/api/feedback/get";
fetch(apiUrl, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ urls }),
})
    .then((response) => response.json())
    .then((result) => {

        for (let searchResult of searchResults.children) {

            try {

                const link = searchResult.querySelector('a');
                const h3 = link.querySelector('h3');

                const rating = result[link.href] || {
                    score: 0,
                    tags: [],
                };

                if (rating.score > 0) {
                    const tag = createTag('Highly rated', 'green');
                    h3.appendChild(tag);

                } else if (rating.score < 0) {
                    const tag = createTag('Lowly rated', 'red');
                    h3.appendChild(tag);
                }

                for (let { tag } of rating.tags) {
                    const tagElement = createTag(tag, 'red');
                    h3.appendChild(tagElement);
                }

            } catch (err) {
                // console.error(err);
            }
        }
    })

// TODO: fetch again when user scrolls down or clicks next page