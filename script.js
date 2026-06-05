const missions = [
    {
        text: "Initialize a Git repository",
        answer: "git init"
    },
    {
        text: "Stage all files",
        answer: "git add ."
    },
    {
        text: "Create a commit",
        answer: 'git commit -m "first commit"'
    }
];

let level = Number(localStorage.getItem("level")) || 0;
let xp = Number(localStorage.getItem("xp")) || 0;

const missionText = document.getElementById("mission");
const output = document.getElementById("output");
const commandInput = document.getElementById("command");
const xpText = document.getElementById("xp");

function loadMission() {

    if(level >= missions.length){
        missionText.innerHTML = "🏆 Congratulations! You completed Git Quest.";
        return;
    }

    missionText.innerHTML = missions[level].text;
    xpText.innerHTML = xp;
}

function print(message, className = "") {

    const div = document.createElement("div");
    div.textContent = message;

    if(className){
        div.classList.add(className);
    }

    output.appendChild(div);

    output.scrollTop = output.scrollHeight;
}

commandInput.addEventListener("keydown", function(e){

    if(e.key !== "Enter") return;

    const command = commandInput.value.trim();

    print("> " + command);

    if(level < missions.length &&
       command === missions[level].answer){

        xp += 100;
        level++;

        localStorage.setItem("xp", xp);
        localStorage.setItem("level", level);

        print("✔ Correct! +100 XP", "success");

        if(level < missions.length){
            print("Next mission unlocked!");
        }

        loadMission();

    } else {

        print("✖ Wrong command. Try again.", "error");

    }

    commandInput.value = "";
});

loadMission();
