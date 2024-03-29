const data = [
    { name: "anchor", image: "anchor-solid.svg" },
    { name: "atom", image: "atom-solid.svg" },
    { name: "bolt-lightning", image: "bolt-lightning-solid.svg" },
    { name: "bomb", image: "bomb-solid.svg" },
    { name: "book", image: "book-solid.svg" },
    { name: "carrot", image: "carrot-solid.svg" },
    { name: "cat", image: "cat-solid.svg" },
    { name: "crow", image: "crow-solid.svg" },
    { name: "fish", image: "fish-solid.svg" },
    { name: "flask", image: "flask-solid.svg" },
    { name: "hat-wizard", image: "hat-wizard-solid.svg" },
    { name: "jet-fighter-up", image: "jet-fighter-up-solid.svg" },
    { name: "lightbulb", image: "lightbulb-solid.svg" },
    { name: "meteor", image: "meteor-solid.svg" },
    { name: "moon", image: "moon-solid.svg" },
    { name: "star", image: "star-solid.svg" },
    { name: "terminal", image: "terminal-solid.svg" },
    { name: "tree", image: "tree-solid.svg" },
]

let open = []
let isClickEnabled = true
let moves = 0

const cards = document.querySelector(".cards")
const resetBtn = document.querySelector("#resetBtn")
const movesCard = document.querySelector(".information span.count")

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5)
}

function selectRandomIcons(array) {
    const randomIcons = shuffle(array).slice(0, 8)
    const iconPairs = [...randomIcons, ...randomIcons]
    return shuffle(iconPairs)
}

function renderIcons(array) {
    cards.innerHTML = " "

    array.forEach(({name, image }) => {
        const button = document.createElement("button")
        button.className = "card"
        button.name = name
        
        const img = document.createElement("img")
        img.src = `./icons/${image}`

        button.appendChild(img)
        cards.appendChild(button)

        button.addEventListener("click",handleClick)
    });
}


function handleClick(e) {
    const button = e.target

    if(!isClickEnabled || button.classList.contains("open")) {
        return;
    }

    button.classList.add("open")
    open.push(button)
    changeMoves(++moves)

    if(open.length === 2) {
        isClickEnabled = false
    setTimeout(() => {
        if(open[0].name === open[1].name) {
            open.forEach(card => card.classList.add("done"))
        } else {
            open.forEach(card => card.classList.remove("open"))
        }

        const doneButtons = document.querySelectorAll(".done")

        if(doneButtons.length === 16) {
            document.querySelector(".congratulations").classList.add("active")
        }

        open = []
        isClickEnabled = true
    }, 500)
    }
}

function changeMoves(count) {
    movesCard.innerText = count
}

window.onload = function () {
    renderIcons(selectRandomIcons(data))
}

resetBtn.addEventListener("click", () => {
    isClickEnabled = true
    moves = 0
    changeMoves(moves)
    document.querySelector(".congratulations").classList.remove("active")
    renderIcons(selectRandomIcons(data))

})