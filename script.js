const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const addButton = document.querySelector("button"); // Reference to the add button

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    addButton.classList.remove("active"); // Reset button color
    saveData();
}

inputBox.addEventListener("input", function() {
    if (inputBox.value.length > 0) {
        addButton.classList.add("active");
    } else {
        addButton.classList.remove("active");
    }
});

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
    }
    saveData();
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    const savedData = localStorage.getItem("data");
    if (savedData) {
        listContainer.innerHTML = savedData;
        const items = listContainer.getElementsByTagName("li");
        for (let i = 0; i < items.length; i++) {
            items[i].addEventListener("click", function(e) {
                if (e.target.tagName === "LI") {
                    e.target.classList.toggle("checked");
                } else if (e.target.tagName === "SPAN") {
                    e.target.parentElement.remove();
                }
                saveData();
            });
        }
    }
}

showTask();