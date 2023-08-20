import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-da6c4-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const myData = getDatabase(app)
const myListInDatabase = ref(myData, "shoppingList")

const addBtn = document.getElementById("add-btn")
const inputEl = document.getElementById("shopping-list-input")
const myList = document.querySelector(".my-list")

addBtn.addEventListener("click", render)

// Enter key activate the render like button clicked
function handleEnterKey(event) {
    if (event.keyCode === 13) {
        render()
    }
}
inputEl.addEventListener("keyup", handleEnterKey)

function render() {
    let myItem = inputEl.value
    if (myItem) {
        push(myListInDatabase, myItem)
    } 
    inputEl.value = ""
}



onValue(myListInDatabase, function (snapshot) {
    if (snapshot.exists()) {
        let myListValues = Object.entries(snapshot.val())
        myList.innerHTML = ""

        for (let i = 0; i < myListValues.length; i++) {
            let currentItem = myListValues[i]

            createListElement(currentItem)
        }
    } else {
        myList.innerHTML = `
        <p> Your list is empty </p>
        <img src="./Images/giphy.gif" alt="" class="gif-img">
        `
    }
})

function createListElement(text) {
    let textValue = text[1]
    let textID = text[0]

    let list = document.createElement("li")
    list.classList = "list"
    list.textContent = textValue


    list.addEventListener("click", function () {
        let textLocation = ref(myData, `shoppingList/${textID}`)
        remove(textLocation)
    })

    myList.append(list)
}
