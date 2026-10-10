
const secondsToggle = document.getElementById("seconds-toggle");
const twelveToggle = document.getElementById("12-toggle");
const outline = document.getElementById("outline");

function updateClock(){
    
    if(secondsToggle.checked && twelveToggle.checked){
        outline.textContent = "88:88 88";
    }else if(secondsToggle.checked && !twelveToggle.checked){
        outline.textContent = "88:88";

    }else if(!secondsToggle.checked && twelveToggle.checked){
        outline.textContent = "88:88:88 88";

    }else{
        outline.textContent = "88:88:88";
    }

    const now = new Date();
    //pad the start with 0 till 2 characters

    let hours;
    let am = true;
    if (!twelveToggle.checked){
        hours = now.getHours().toString().padStart(2, 0);
        /*add text and outline for am/pm - hide */
    }else{
        hours = now.getHours();
        if(hours>=12){
            am = false;
        }
        hours = hours%12;
        hours = hours.toString().padStart(2, 0);
        /*add text and outline for am/pm - unhide */
    }


    const mins = now.getMinutes().toString().padStart(2, 0);
    
    let secs = "";
    if (!secondsToggle.checked){
        secs = ":" + now.getSeconds().toString().padStart(2, 0);
    }

    let ampm = "";
    if (twelveToggle.checked){
        if(am){
            ampm = " AM";
        }else{
            ampm = " PM";
        }
    }

    const timeString = `${hours}:${mins}${secs}${ampm}`;

    document.getElementById("time").textContent = timeString;
    document.getElementById("reflection").textContent = timeString;
}

updateClock();//immediately when starting

//like setTimeout, but calls it repeatedly
setInterval(updateClock, 1000);

secondsToggle.addEventListener("change", function() {
    updateClock();
});

twelveToggle.addEventListener("change", function() {
    updateClock();
});

const settingsButton = document.getElementById("settings");
const settingsMenu = document.getElementById("settings-menu");
settingsButton.addEventListener("click", function() {
    settingsMenu.classList.toggle("open");
});


const reflectionToggle = document.getElementById("reflection-toggle");
const reflection = document.getElementById("reflection");
reflectionToggle.addEventListener("change", function() {
    reflection.classList.toggle("open");
});

document.addEventListener("click", function() {
    document.body.classList.toggle("cursor-hidden");
});

document.addEventListener("keydown", function(event) {
    if (event.key.toLowerCase() === "f") {

        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }

    }
});


const themeRadios = document.querySelectorAll('input[name="theme"]');

themeRadios.forEach(function(radio) {
    radio.addEventListener("change", function() {
        document.body.className = radio.value;
    });
});

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker.register("./sw.js")
            .then(function() {
                console.log("Service worker registered!");
            })
            .catch(function(error) {
                console.error("Service worker failed:", error);
            });
    });
}