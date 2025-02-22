let check = document.querySelectorAll(".check");
let Alert = document.querySelector(".Alert");
let circle = document.querySelectorAll(".check_circle");
let note = document.querySelector(".note span")
let allData = {};
let button = document.querySelector(".button")
let img = document.querySelector(".note img")


button.addEventListener("click",()=>{
    location.reload()
    localStorage.clear()
})

// Listen for input on checkboxes and save data to localStorage
for (let text of check) {
    text.addEventListener("input", (e) => {
        allData[e.target.id] = { "name": e.target.value, "completed": false };
        localStorage.setItem("allData", JSON.stringify(allData));
        updateProgress();
    });
}

console.log(allData);

allData = JSON.parse(localStorage.getItem("allData")) || {};
Object.entries(allData).forEach(([key, value]) => {
    check.forEach((item_) => {
        if (key == item_.id) {
            item_.value = value.name;
        }
    });
});

// Update checkboxes when clicking circles (for completing tasks)
for (let item of circle) {
        item.addEventListener("click", (e) => {
            if (item.nextElementSibling.value != "") {
                // console.log(item.nextElementSibling.value);
                
                e.target.classList.toggle("add_check_circle");
                e.target.nextElementSibling.classList.toggle("add_check");
                e.target.nextElementSibling.classList.toggle("add_pointer");

                // Update 'completed' status in the data
                updateCompletionStatus(e.target);
            } else {
                Alert.style.visibility = "visible";
            }
            item.nextElementSibling.addEventListener("focus",()=>{
                Alert.style.visibility = "hidden";
            })
        });
}

// Function to update 'completed' status based on checkbox clicks
function updateCompletionStatus(target) {
    Object.entries(allData).forEach(([key, value]) => {
        if (key == target.nextElementSibling.id) {
            value.completed = target.classList.contains('add_check_circle') ? "true" : "false";
            localStorage.setItem("allData", JSON.stringify(allData));
            updateProgress();
        }
    });
}

// Function to update the progress bar based on the number of true values
function updateProgress() {
    allData = JSON.parse(localStorage.getItem("allData")) || {};
    const trueCount = Object.values(allData).filter(value => value.completed === "true").length;

    const get_level = document.querySelector(".Child_level");
    get_level.style.maxWidth = "0%";
    if (get_level) {
        if (trueCount == 1) {
            get_level.style.maxWidth = "33.3%";
            Bar()
        } else if (trueCount == 2) {
            get_level.style.maxWidth = "66.3%";
            Bar()
        } else if (trueCount == 3) {
            get_level.style.maxWidth = "99.99%";
            Bar()
        }
    } 
}


// Set initial classes based on localStorage data
Object.entries(allData).forEach(([key, value]) => {
    const get_first = document.querySelector(`#a${key}`);
    const get_second = document.querySelector(`#${key}`);

    if (value.completed === "true") {
        if (get_first) get_first.classList.add('add_check_circle');
        if (get_second) {
            get_second.classList.add('add_check');
            get_second.classList.add("add_pointer");
        }
    } else {
        if (get_first) get_first.classList.remove('add_check_circle');
        if (get_second) {
            get_second.classList.remove('add_check');
            get_second.classList.remove("add_pointer");
        }
    }
});

updateProgress();  // Call to update the progress bar initially


function Bar (){
    let progressBar = document.querySelector(".Child_level");
    let parentBar = document.querySelector(".Parent_level");
    
    // Get the width of both elements
    let progressWidth = progressBar.getBoundingClientRect().width;
    let parentWidth = parentBar.getBoundingClientRect().width;
    
    // Calculate the percentage width
    let percentage = (progressWidth / parentWidth) * 100;
    
    console.log("Progress bar width percentage:", percentage + "%");
    if(percentage >= 33 && percentage <= 66){
        note.innerText = "Just a step away, keep going!"
        img.style.visibility = "hidden"
    }else if(percentage < 33 ){
        note.innerText = "Raise the bar by completing your goals!"
        img.style.visibility = "hidden"

    }else{
        note.innerText = "Good Job! You have done your goals!" 
        img.style.visibility = "visible"
    }
}


