document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();

    const firstName = e.target.querySelector('[placeholder="First Name"]').value,
        lastName = e.target.querySelector('[placeholder="Last Name"]').value,
        country = e.target.querySelector('[placeholder="Country"]').value,
        score = e.target.querySelector('[placeholder="Player Score"]').value;
    const errorPrompter = document.querySelector(".main_error-prompter");

    errorPrompter.style.display = "none";

    if (firstName === '' || lastName === '' || country === '' || score === '') {
        return (errorPrompter.style.display = "block");
    }

    const scoreboardContainer = document.querySelector(".main_scoreboard-wrapper");
    const scoreboardElement = document.createElement("div");

    scoreboardElement.classList.add("main_scoreboard");

    scoreboardElement.innerHTML = `
    <div>
        <p class="main_player-name">${firstName} ${lastName}</p>
        <p class="main_time-stamp">${generateDateAndTime()}</p>
    </div>
    <p class="main_player-country">${country}</p>
    <p class="main_player-score">${score}</p>
    <div class="main_scoreboard-btn-container">
        <button>&#x1f5d1;</button>
        <button>+5</button>
        <button>-5</button>
    </div>
 `;

    scoreboardContainer.appendChild(scoreboardElement);
    sortScoreBoard();
    activateBtnEventListener();
});

function activateBtnEventListener() {
    document.querySelectorAll(".main_scoreboard-btn-container").forEach((el) => {
        el.addEventListener("click", (e) => {
            let textContent = e.target.textContent;
            let scorePlayer = e.target.parentElement.parentElement.querySelector('.main_player-score');

            if (textContent === '🗑') {
                return e.target.parentElement.parentElement.remove();
            }

            scorePlayer.textContent = parseInt(scorePlayer.textContent) + parseInt(textContent);
            sortScoreBoard();
        });
    });
}

activateBtnEventListener();

function sortScoreBoard() {
    const scoreboardContainer = document.querySelector(".main_scoreboard-wrapper");
    const scoreBoards = Array.from(scoreboardContainer.querySelectorAll(".main_scoreboard"));

    scoreBoards.sort((a, b) => {
        let numA = parseInt(a.querySelector('.main_player-score').textContent);
        let numB = parseInt(b.querySelector('.main_player-score').textContent);

        return numB - numA;
    });

    scoreBoards.forEach((el) => {
        scoreboardContainer.appendChild(el);
    });
}

function generateDateAndTime() {
    const dateObject = new Date();
    const month = dateObject.toLocaleString("default", { month: "long" });
    const day = dateObject.getDate();
    const year = dateObject.getFullYear();
    const time = dateObject.toLocaleTimeString().slice(0, 8);

    return `${month} ${day}: ${year} ${time}`;
}