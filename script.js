// script.js

const getQuoteBtn = document.getElementById("getQuoteBtn");
const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const quoteTags = document.getElementById("quoteTags");

getQuoteBtn.addEventListener("click", () => {
    getQuoteBtn.classList.add("loading");
    getQuoteBtn.textContent = "Loading...";
    getQuote();
});

function getQuote() {
    fetch("https://api.quotable.io/random")
        .then((response) => response.json())
        .then((data) => {
            quoteText.textContent = `"${data.content}"`;
            quoteAuthor.textContent = `— ${data.author}`;
            quoteTags.innerHTML = "";

            if (data.tags && data.tags.length > 0) {
                data.tags.forEach(tag => {
                    const tagElem = document.createElement("span");
                    tagElem.textContent = tag;
                    quoteTags.appendChild(tagElem);
                });
            }

            getQuoteBtn.classList.remove("loading");
            getQuoteBtn.textContent = "Get Quote";
        })
        .catch((error) => {
            console.error("Error fetching quote:", error);
            quoteText.textContent = "Failed to fetch a quote. Please try again later.";
            quoteAuthor.textContent = "";
            quoteTags.innerHTML = "";
            getQuoteBtn.classList.remove("loading");
            getQuoteBtn.textContent = "Get Quote";
        });
}

// Load first quote on page load
getQuote();
