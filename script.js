// ======================================================
// MAHROOKH LAB — MAIN JAVASCRIPT
// ======================================================

// ======================================================
// MAHROOKH LAB — SOFT SOUND SYSTEM
// ======================================================

let audioContext = null;

function initAudio() {
    try {
        if (!audioContext) {
            const AudioContext =
                window.AudioContext ||
                window.webkitAudioContext;

            if (!AudioContext) {
                return false;
            }

            audioContext = new AudioContext();
        }

        if (audioContext.state === "suspended") {
            audioContext.resume().catch(() => {});
        }

        return true;

    } catch (error) {
        console.warn("Audio unavailable:", error);
        return false;
    }
}


// ======================================================
// SOFT CLICK
// ======================================================

function playClickSound() {

    try {

        if (!initAudio()) return;

        const now =
            audioContext.currentTime;

        const oscillator =
            audioContext.createOscillator();

        const gain =
            audioContext.createGain();

        oscillator.type =
            "sine";

        oscillator.frequency.setValueAtTime(
            520,
            now
        );

        oscillator.frequency.exponentialRampToValueAtTime(
            300,
            now + 0.06
        );

        gain.gain.setValueAtTime(
            0.0001,
            now
        );

        gain.gain.exponentialRampToValueAtTime(
            0.045,
            now + 0.01
        );

        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            now + 0.07
        );

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.start(now);
        oscillator.stop(now + 0.08);

    } catch (error) {
        console.warn("Click sound error:", error);
    }
}


// ======================================================
// CINEMATIC ENTER SOUND
// ======================================================

function playEnterSound() {

    try {

        if (!initAudio()) return;

        const now =
            audioContext.currentTime;

        const oscillator =
            audioContext.createOscillator();

        const gain =
            audioContext.createGain();

        oscillator.type =
            "sine";

        oscillator.frequency.setValueAtTime(
            220,
            now
        );

        oscillator.frequency.exponentialRampToValueAtTime(
            440,
            now + 0.65
        );

        gain.gain.setValueAtTime(
            0.0001,
            now
        );

        gain.gain.exponentialRampToValueAtTime(
            0.08,
            now + 0.08
        );

        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            now + 0.75
        );

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.start(now);
        oscillator.stop(now + 0.75);

    } catch (error) {
        console.warn("Enter sound error:", error);
    }
}


// ======================================================
// SUCCESS — TWO NOTE SPARKLE
// ======================================================

function playSuccessSound() {

    try {

        if (!initAudio()) return;

        const now =
            audioContext.currentTime;

        [660, 880].forEach(
            function (frequency, index) {

                const oscillator =
                    audioContext.createOscillator();

                const gain =
                    audioContext.createGain();

                const startTime =
                    now + (index * 0.09);

                oscillator.type =
                    "sine";

                oscillator.frequency.setValueAtTime(
                    frequency,
                    startTime
                );

                gain.gain.setValueAtTime(
                    0.0001,
                    startTime
                );

                gain.gain.exponentialRampToValueAtTime(
                    0.055,
                    startTime + 0.015
                );

                gain.gain.exponentialRampToValueAtTime(
                    0.0001,
                    startTime + 0.16
                );

                oscillator.connect(gain);
                gain.connect(
                    audioContext.destination
                );

                oscillator.start(startTime);
                oscillator.stop(startTime + 0.17);
            }
        );

    } catch (error) {
        console.warn("Success sound error:", error);
    }
}


// ======================================================
// ERROR — SOFT MUTED THUMP
// ======================================================

function playErrorSound() {

    try {

        if (!initAudio()) return;

        const now =
            audioContext.currentTime;

        const oscillator =
            audioContext.createOscillator();

        const gain =
            audioContext.createGain();

        oscillator.type =
            "triangle";

        oscillator.frequency.setValueAtTime(
            150,
            now
        );

        oscillator.frequency.exponentialRampToValueAtTime(
            90,
            now + 0.12
        );

        gain.gain.setValueAtTime(
            0.0001,
            now
        );

        gain.gain.exponentialRampToValueAtTime(
            0.055,
            now + 0.015
        );

        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            now + 0.15
        );

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.start(now);
        oscillator.stop(now + 0.16);

    } catch (error) {
        console.warn("Error sound error:", error);
    }
}

// ======================================================
// ACHIEVEMENT SYSTEM
// ======================================================

const achievements = {

    firstVisit: {
        title: "First Visit",
        description: "You stepped inside the Lab.",
        icon: "✦"
    },

    cafeArchitect: {
        title: "Café Architect",
        description: "You created your own café.",
        icon: "☕"
    },

    selfExplorer: {
        title: "Self Explorer",
        description: "You discovered something about yourself.",
        icon: "◌"
    },

    wordDecoder: {
        title: "Word Decoder",
        description: "You cracked the Lab's hidden words.",
        icon: "⌁"
    },

    patternHunter: {
        title: "Pattern Hunter",
        description: "You spotted patterns in the Lab.",
        icon: "◈"
    },

    labContributor: {
        title: "Lab Contributor",
        description: "You left something behind.",
        icon: "✎"
    }

};


// ======================================================
// GET UNLOCKED ACHIEVEMENTS
// ======================================================

function getUnlockedAchievements() {

    return JSON.parse(
        localStorage.getItem("mahrookhLabAchievements")
    ) || [];

}


// ======================================================
// UNLOCK ACHIEVEMENT
// ======================================================

function unlockAchievement(id) {

    const unlocked =
        getUnlockedAchievements();

    if (!achievements[id]) {
        return;
    }

    if (unlocked.includes(id)) {
        return;
    }

    unlocked.push(id);

    localStorage.setItem(
        "mahrookhLabAchievements",
        JSON.stringify(unlocked)
    );

    console.log(
        `🏆 Achievement unlocked: ${achievements[id].title}`
    );

}


// ======================================================
// BASIC LAB ELEMENTS
// ======================================================

const enterLab =
    document.getElementById("enterLab");

const landing =
    document.getElementById("landing");


const dashboard =
    document.getElementById("dashboard");

const backButton =
    document.getElementById("backButton");


// ======================================================
// VISITOR IDENTITY
// ======================================================

const visitorGate =
    document.getElementById("visitorGate");

const visitorName =
    document.getElementById("visitorName");

const anonymousVisitor =
    document.getElementById("anonymousVisitor");

const continueToLab =
    document.getElementById("continueToLab");


// ======================================================
// OPEN VISITOR GATE
// ======================================================

enterLab.addEventListener("click", function () {

    playEnterSound();

    enterLab.disabled = true;

    landing.classList.add("lab-exit");

    setTimeout(function () {

        landing.style.display = "none";

        visitorGate.style.display = "flex";

        visitorGate.classList.add("lab-reveal");

        visitorName.focus();

        enterLab.disabled = false;

    }, 700);

});

// ======================================================
// ANONYMOUS OPTION
// ======================================================

anonymousVisitor.addEventListener("change", function () {

    if (anonymousVisitor.checked) {

        visitorName.value = "";

        visitorName.disabled = true;

        visitorName.placeholder =
            "You're entering anonymously";

    }

    else {

        visitorName.disabled = false;

        visitorName.placeholder =
            "Enter your name";

        visitorName.focus();

    }

});


// ======================================================
// ENTER LAB FROM VISITOR GATE
// ======================================================

continueToLab.addEventListener("click", function () {

    

    let name;


    if (anonymousVisitor.checked) {

        name = "Explorer";

    }

    else {

        name =
            visitorName.value.trim();


        if (name === "") {

            visitorName.focus();

            visitorName.style.borderColor =
                "#a56f7a";

            return;

        }

    }


    // Save visitor name for this session

    sessionStorage.setItem(
        "mahrookhLabVisitor",
        name
    );


    // FIRST VISIT ACHIEVEMENT

    unlockAchievement("firstVisit");


    visitorGate.style.display =
        "none";

    dashboard.style.display =
        "block";

});


// ======================================================
// EXIT LAB
// ======================================================

backButton.addEventListener("click", function () {

    dashboard.style.display = "none";

    landing.classList.remove("lab-exit");

    landing.style.display = "flex";

    visitorGate.classList.remove("lab-reveal");

});

// ======================================================
// CREATE — CAFÉ BUILDER
// ======================================================

const createButton =
    document.querySelector(
        ".create-card .explore-button"
    );

const createSection =
    document.getElementById("createSection");

const backToLab =
    document.getElementById("backToLab");

const generateCafe =
    document.getElementById("generateCafe");

const cafeResult =
    document.getElementById("cafeResult");


// ======================================================
// OPEN CAFÉ BUILDER
// ======================================================

createButton.addEventListener("click", function () {

    dashboard.style.display =
        "none";

    createSection.style.display =
        "block";

});


// ======================================================
// BACK TO LAB
// ======================================================

backToLab.addEventListener("click", function () {

    createSection.style.display =
        "none";

    dashboard.style.display =
        "block";

});


// ======================================================
// GENERATE CAFÉ
// ======================================================

generateCafe.addEventListener("click", function () {

   playSuccessSound();

    const cafeName =
        document
            .getElementById("cafeName")
            .value
            .trim();

    const drink =
        document.getElementById("drink").value;

    const dessert =
        document.getElementById("dessert").value;

    const vibe =
        document.getElementById("vibe").value;

    const music =
        document.getElementById("music").value;


    if (
        cafeName === "" ||
        drink === "" ||
        dessert === "" ||
        vibe === "" ||
        music === ""
    ) {

        alert(
            "Complete your café first ☕✨"
        );

        return;

    }


    const descriptions = {

        "Cozy & Warm":
            "A warm little corner made for chai, comfort and conversations that last a little longer.",

        "Soft & Dreamy":
            "A dreamy little escape filled with soft lights, quiet moments and somewhere to breathe.",

        "Minimal & Elegant":
            "A thoughtfully designed space where simplicity, good taste and slow moments meet.",

        "Dark & Mysterious":
            "A mysterious hideaway for late evenings, deep conversations and stories waiting to be told.",

        "Playful & Colorful":
            "A cheerful little world filled with colour, sweet treats and moments worth remembering."

    };


    const description =
        descriptions[vibe];


    cafeResult.innerHTML = `

        <div class="cafe-card">

            <p class="cafe-label">
                YOUR CAFÉ
            </p>

            <h3>${cafeName}</h3>

            <p class="cafe-description">
                ${description}
            </p>

            <div class="cafe-details">

                <div>
                    <span>DRINK</span>
                    <strong>${drink}</strong>
                </div>

                <div>
                    <span>DESSERT</span>
                    <strong>${dessert}</strong>
                </div>

                <div>
                    <span>VIBE</span>
                    <strong>${vibe}</strong>
                </div>

                <div>
                    <span>MUSIC</span>
                    <strong>${music}</strong>
                </div>

            </div>

            <p class="cafe-signature">
                Designed in Mahrookh Lab ✦
            </p>

        </div>

    `;

});


// ======================================================
// SAVE CAFÉ
// ======================================================

const saveCafe =
    document.getElementById("saveCafe");

const savedMessage =
    document.getElementById("savedMessage");


saveCafe.addEventListener("click", function () {

    const cafeName =
        document
            .getElementById("cafeName")
            .value
            .trim();

    const drink =
        document.getElementById("drink").value;

    const dessert =
        document.getElementById("dessert").value;

    const vibe =
        document.getElementById("vibe").value;

    const music =
        document.getElementById("music").value;


    if (
        cafeName === "" ||
        drink === "" ||
        dessert === "" ||
        vibe === "" ||
        music === ""
    ) {

        savedMessage.textContent =
            "Create your café first ☕";

        return;

    }


    const cafe = {

        name: cafeName,

        drink: drink,

        dessert: dessert,

        vibe: vibe,

        music: music

    };


    localStorage.setItem(
        "mahrookhCafe",
        JSON.stringify(cafe)
    );


    savedMessage.textContent =
        "Your café has been saved ✦";


    // CAFÉ ACHIEVEMENT

    unlockAchievement(
        "cafeArchitect"
    );

});


// ======================================================
// CHECK SAVED CAFÉ
// ======================================================

const savedCafe =
    localStorage.getItem("mahrookhCafe");


if (savedCafe) {

    const cafe =
        JSON.parse(savedCafe);

    savedMessage.textContent =
        `Your saved café: ${cafe.name} ✦`;

}


// ======================================================
// DISCOVER — UNIVERSAL QUIZ
// ======================================================

const discoverButton =
    document.querySelector(
        ".discover-card .explore-button"
    );

const discoverSection =
    document.getElementById("discoverSection");

const backFromDiscover =
    document.getElementById("backFromDiscover");

const calculateExplorer =
    document.getElementById("calculateExplorer");

const explorerResult =
    document.getElementById("explorerResult");


// ======================================================
// OPEN DISCOVER
// ======================================================

discoverButton.addEventListener("click", function () {

    dashboard.style.display =
        "none";

    discoverSection.style.display =
        "block";

});


// ======================================================
// BACK TO LAB
// ======================================================

backFromDiscover.addEventListener("click", function () {

    discoverSection.style.display =
        "none";

    dashboard.style.display =
        "block";

});


// ======================================================
// CALCULATE RESULT
// ======================================================

calculateExplorer.addEventListener("click", function () {

    const questions = [
        "q1",
        "q2",
        "q3",
        "q4",
        "q5"
    ];


    const scores = {

        curious: 0,

        creator: 0,

        solver: 0,

        observer: 0,

        experimenter: 0

    };


    let answered = 0;


    questions.forEach(function (question) {

        const answer =
            document.querySelector(
                `input[name="${question}"]:checked`
            );


        if (answer) {

            scores[answer.value]++;

            answered++;

        }

    });


    if (answered < 5) {

        explorerResult.innerHTML = `

            <div>

                <p>
                    Answer all five questions first ✦
                </p>

            </div>

        `;

        return;

    }


    let result =
        "curious";


    Object.keys(scores).forEach(function (type) {

        if (
            scores[type] >
            scores[result]
        ) {

            result = type;

        }

    });


    const results = {

        curious: {

            icon: "🔎",

            title: "The Curious One",

            description:
                "You love discovering what is hiding behind the next door. Questions, mysteries and new possibilities naturally catch your attention."

        },


        creator: {

            icon: "🎨",

            title: "The Creator",

            description:
                "You enjoy turning imagination into something real. For you, exploring can mean making, designing, writing, building or simply creating."

        },


        solver: {

            icon: "🧩",

            title: "The Problem Solver",

            description:
                "Give you a mystery and you'll probably want to figure it out. You enjoy clues, patterns and finding the answer hiding underneath."

        },


        observer: {

            icon: "🌙",

            title: "The Observer",

            description:
                "You notice things others might miss. You don't always need to jump in — sometimes watching, thinking and understanding is your kind of exploration."

        },


        experimenter: {

            icon: "⚡",

            title: "The Experimenter",

            description:
                "You're willing to try things just to see what happens. Your curiosity often begins with one simple thought: 'What if I try this?'"

        }

    };


    const selected =
        results[result];


    explorerResult.innerHTML = `

        <div>

            <p class="result-type">
                YOUR LAB RESULT
            </p>

            <div class="result-icon">
                ${selected.icon}
            </div>

            <h3>
                ${selected.title}
            </h3>

            <p>
                ${selected.description}
            </p>

            <p class="result-note">
                There is no right type. This is just your little Lab discovery ✦
            </p>

        </div>

    `;


    // DISCOVER ACHIEVEMENT

    unlockAchievement(
        "selfExplorer"
    );

});


// ======================================================
// DECODE — WORD JUMBLE GAME
// ======================================================

const decodeButton =
    document.querySelector(
        ".analyze-card .explore-button"
    );

const decodeSection =
    document.getElementById("decodeSection");

const backFromDecode =
    document.getElementById("backFromDecode");


// ======================================================
// OPEN DECODE
// ======================================================

decodeButton.addEventListener("click", function () {

    dashboard.style.display =
        "none";

    decodeSection.style.display =
        "block";

    startDecodeGame();

});


// ======================================================
// BACK TO LAB
// ======================================================

backFromDecode.addEventListener("click", function () {

    decodeSection.style.display =
        "none";

    dashboard.style.display =
        "block";

});


// ======================================================
// DECODE ELEMENTS
// ======================================================

const decodeLevel =
    document.getElementById("decodeLevel");

const decodeScore =
    document.getElementById("decodeScore");

const currentWordNumber =
    document.getElementById("currentWordNumber");

const levelLabel =
    document.getElementById("levelLabel");

const levelTitle =
    document.getElementById("levelTitle");

const jumbleWord =
    document.getElementById("jumbleWord");

const wordHint =
    document.getElementById("wordHint");

const decodeAnswer =
    document.getElementById("decodeAnswer");

const checkDecode =
    document.getElementById("checkDecode");

const decodeFeedback =
    document.getElementById("decodeFeedback");

const nextWord =
    document.getElementById("nextWord");

const levelComplete =
    document.getElementById("levelComplete");

const levelCompleteTitle =
    document.getElementById("levelCompleteTitle");

const levelCompleteText =
    document.getElementById("levelCompleteText");

const nextLevel =
    document.getElementById("nextLevel");

const decodeFinal =
    document.getElementById("decodeFinal");

const finalScore =
    document.getElementById("finalScore");

const finalRank =
    document.getElementById("finalRank");

const finalMessage =
    document.getElementById("finalMessage");

const restartDecode =
    document.getElementById("restartDecode");


// ======================================================
// DECODE LEVELS
// ======================================================

const decodeLevels = {

    1: {

        title: "Warm Up",

        words: [

            {
                word: "CAFE",
                jumble: "E F C A",
                hint: "A place where you can enjoy a drink."
            },

            {
                word: "MOON",
                jumble: "O O N M",
                hint: "You can see it in the night sky."
            },

            {
                word: "BOOK",
                jumble: "O K B O",
                hint: "You can read it."
            },

            {
                word: "RAIN",
                jumble: "I R N A",
                hint: "It falls from the clouds."
            },

            {
                word: "LAB",
                jumble: "B A L",
                hint: "A place where experiments happen."
            }

        ]

    },


    2: {

        title: "Getting Tricky",

        words: [

            {
                word: "DREAM",
                jumble: "E A M R D",
                hint: "Something you may see while sleeping."
            },

            {
                word: "CLOUD",
                jumble: "U C D O L",
                hint: "You can see it floating in the sky."
            },

            {
                word: "LIGHT",
                jumble: "G H T L I",
                hint: "It helps you see in the dark."
            },

            {
                word: "SMILE",
                jumble: "L M E S I",
                hint: "You make this when you're happy."
            },

            {
                word: "WORLD",
                jumble: "R O W D L",
                hint: "The planet we live on."
            }

        ]

    },


    3: {

        title: "Think Twice",

        words: [

            {
                word: "CREATE",
                jumble: "T E C A R E",
                hint: "To make something new."
            },

            {
                word: "PUZZLE",
                jumble: "Z L P E U Z",
                hint: "Something you solve."
            },

            {
                word: "SECRET",
                jumble: "R E C T S E",
                hint: "Something not meant for everyone to know."
            },

            {
                word: "CURIOUS",
                jumble: "O U R I C S U",
                hint: "Wanting to know or discover something."
            },

            {
                word: "BEAUTY",
                jumble: "T U Y B E A",
                hint: "Something pleasing or lovely."
            }

        ]

    },


    4: {

        title: "Lab Mode",

        words: [

            {
                word: "DISCOVER",
                jumble: "V E C O R D I S",
                hint: "To find something you didn't know before."
            },

            {
                word: "IMAGINE",
                jumble: "G I M A N E I",
                hint: "To create pictures or ideas in your mind."
            },

            {
                word: "EXPERIMENT",
                jumble: "P E R I M E N T E X",
                hint: "A test done to learn something."
            },

            {
                word: "ADVENTURE",
                jumble: "T U R E A D V E N",
                hint: "An exciting experience or journey."
            },

            {
                word: "KNOWLEDGE",
                jumble: "L E D G E K N O W",
                hint: "What you gain by learning."
            }

        ]

    },


    5: {

        title: "Final Code",

        words: [

            {
                word: "CREATIVITY",
                jumble: "V I T Y C R E A T I",
                hint: "The ability to come up with original ideas."
            },

            {
                word: "DISCOVERY",
                jumble: "V E R Y D I S C O",
                hint: "The act of finding something new."
            },

            {
                word: "CURIOSITY",
                jumble: "O S I T Y C U R I",
                hint: "The desire to know or learn something."
            },

            {
                word: "EXPLORATION",
                jumble: "P L O R A T I O N E X",
                hint: "The act of investigating or travelling through something."
            },

            {
                word: "IMAGINATION",
                jumble: "G I N A T I O N I M A",
                hint: "The ability to form ideas and pictures in your mind."
            }

        ]

    }

};


// ======================================================
// DECODE GAME VARIABLES
// ======================================================

let currentLevel = 1;

let currentWordIndex = 0;

let score = 0;


// ======================================================
// START DECODE
// ======================================================

function startDecodeGame() {

    currentLevel = 1;

    currentWordIndex = 0;

    score = 0;


    decodeScore.textContent =
        score;

    levelComplete.style.display =
        "none";

    decodeFinal.style.display =
        "none";

    jumbleWord.parentElement.style.display =
        "block";

    document.querySelector(
        ".answer-area"
    ).style.display =
        "flex";

    decodeFeedback.style.display =
        "block";

    loadWord();

}


// ======================================================
// LOAD WORD
// ======================================================

function loadWord() {

    const level =
        decodeLevels[currentLevel];

    const currentWord =
        level.words[currentWordIndex];


    decodeLevel.textContent =
        currentLevel;

    currentWordNumber.textContent =
        currentWordIndex + 1;

    levelLabel.textContent =
        `LEVEL ${currentLevel}`;

    levelTitle.textContent =
        level.title;


    jumbleWord.innerHTML =
        currentWord.jumble
            .split(" ")
            .map(letter =>
                `<span>${letter}</span>`
            )
            .join("");


    wordHint.textContent =
        `Hint: ${currentWord.hint}`;


    decodeAnswer.value =
        "";

    decodeFeedback.textContent =
        "";

    decodeFeedback.classList.remove(
        "correct",
        "wrong"
    );

    jumbleWord.classList.remove(
        "decode-correct",
        "decode-shake"
    );


    nextWord.style.display =
        "none";

    checkDecode.style.display =
        "inline-block";


    decodeAnswer.focus();

}


// ======================================================
// CHECK ANSWER
// ======================================================

checkDecode.addEventListener(
    "click",
    function () {

        const userAnswer =
            decodeAnswer.value
                .trim()
                .toUpperCase();


        const level =
            decodeLevels[currentLevel];

        const currentWord =
            level.words[currentWordIndex];


        if (userAnswer === "") {

            decodeFeedback.textContent =
                "Type your answer first ✦";

            return;

        }


        if (
            userAnswer ===
            currentWord.word
        ) {
            
            playSuccessSound();

            score++;


            decodeScore.textContent =
                score;


            decodeFeedback.textContent =
                "✓ Correct! You cracked it.";


            decodeFeedback.classList.remove(
                "wrong"
            );

            decodeFeedback.classList.add(
                "correct"
            );


            jumbleWord.classList.remove(
                "decode-shake"
            );

            jumbleWord.classList.add(
                "decode-correct"
            );


            checkDecode.style.display =
                "none";

            nextWord.style.display =
                "inline-block";

        }


        else {
            
              playErrorSound();

            decodeFeedback.textContent =
                "✕ Not quite... Try again.";


            decodeFeedback.classList.remove(
                "correct"
            );

            decodeFeedback.classList.add(
                "wrong"
            );


            jumbleWord.classList.remove(
                "decode-correct"
            );


            jumbleWord.classList.remove(
                "decode-shake"
            );


            void jumbleWord.offsetWidth;


            jumbleWord.classList.add(
                "decode-shake"
            );


            decodeAnswer.select();

        }

    }
);


// ======================================================
// NEXT WORD
// ======================================================

nextWord.addEventListener(
    "click",
    function () {

        currentWordIndex++;


        const level =
            decodeLevels[currentLevel];


        if (
            currentWordIndex >=
            level.words.length
        ) {

            showLevelComplete();

        }

        else {

            loadWord();

        }

    }
);


// ======================================================
// LEVEL COMPLETE
// ======================================================

function showLevelComplete() {

    const level =
        decodeLevels[currentLevel];


    if (currentLevel === 5) {

        showFinalResult();

        return;

    }


    levelComplete.style.display =
        "block";

    jumbleWord.parentElement.style.display =
        "none";

    document.querySelector(
        ".answer-area"
    ).style.display =
        "none";

    decodeFeedback.style.display =
        "none";

    nextWord.style.display =
        "none";


    levelCompleteTitle.textContent =
        `Level ${currentLevel} Complete ✦`;


    levelCompleteText.textContent =
        `You cracked all ${level.words.length} words. Current score: ${score}.`;

}


// ======================================================
// NEXT LEVEL
// ======================================================

nextLevel.addEventListener(
    "click",
    function () {

        currentLevel++;

        currentWordIndex = 0;


        levelComplete.style.display =
            "none";

        jumbleWord.parentElement.style.display =
            "block";

        document.querySelector(
            ".answer-area"
        ).style.display =
            "flex";

        decodeFeedback.style.display =
            "block";


        loadWord();

    }
);


// ======================================================
// FINAL DECODE RESULT
// ======================================================

function showFinalResult() {

    const totalWords = 25;


    const accuracy =
        Math.round(
            (score / totalWords) * 100
        );


    let rank = "";

    let message = "";


    if (accuracy === 100) {

        rank =
            "Master Decoder 🔐";

        message =
            "Every code cracked. The Lab has officially been decoded.";

    }


    else if (accuracy >= 80) {

        rank =
            "Sharp Mind ⚡";

        message =
            "You spotted patterns quickly and decoded almost everything.";

    }


    else if (accuracy >= 60) {

        rank =
            "Code Breaker 🧩";

        message =
            "You kept going, solved the tricky ones and made it through the Lab.";

    }


    else if (accuracy >= 40) {

        rank =
            "Curious Explorer 🔎";

        message =
            "You may have missed a few codes, but you never stopped exploring.";

    }


    else {

        rank =
            "Brave Experimenter 🌱";

        message =
            "The codes won this time... but every experiment starts somewhere.";

    }


    decodeFinal.style.display =
        "block";

    jumbleWord.parentElement.style.display =
        "none";

    document.querySelector(
        ".answer-area"
    ).style.display =
        "none";

    decodeFeedback.style.display =
        "none";

    nextWord.style.display =
        "none";

    levelComplete.style.display =
        "none";


    finalScore.textContent =
        `${score}/25`;

    finalRank.textContent =
        rank;

    finalMessage.textContent =
        `${message} Accuracy: ${accuracy}%.`;


    // DECODE ACHIEVEMENT

    unlockAchievement(
        "wordDecoder"
    );

}


// ======================================================
// RESTART DECODE
// ======================================================

restartDecode.addEventListener(
    "click",
    function () {

        startDecodeGame();

    }
);


// ======================================================
// PLAY — PATTERN ROOM
// ======================================================

const playButton =
    document.querySelector(
        ".play-card .explore-button"
    );

const playSection =
    document.getElementById("playSection");

const backFromPlay =
    document.getElementById("backFromPlay");


// ======================================================
// PATTERN ELEMENTS
// ======================================================

const patternLevel =
    document.getElementById("patternLevel");

const patternScore =
    document.getElementById("patternScore");

const patternStreak =
    document.getElementById("patternStreak");

const patternCard =
    document.getElementById("patternCard");

const patternSequence =
    document.getElementById("patternSequence");

const patternHint =
    document.getElementById("patternHint");

const patternOptions =
    document.getElementById("patternOptions");

const patternFeedback =
    document.getElementById("patternFeedback");

const nextPattern =
    document.getElementById("nextPattern");

const patternFinal =
    document.getElementById("patternFinal");

const finalPatternScore =
    document.getElementById("finalPatternScore");

const patternRank =
    document.getElementById("patternRank");

const patternFinalMessage =
    document.getElementById("patternFinalMessage");

const patternRestart =
    document.getElementById("patternRestart");


// ======================================================
// PATTERN GAME DATA
// ======================================================

const patterns = [

    {
        sequence: "3 → 7 → 15 → 31 → ?",
        options: ["47", "55", "63", "71"],
        answer: "63",
        hint: "Look at how each number is being transformed."
    },

    {
        sequence: "B → E → I → N → ?",
        options: ["R", "S", "T", "U"],
        answer: "T",
        hint: "Convert the letters into positions and study the jumps."
    },

    {
        sequence: "▲ → ▲ → ● → ▲ → ▲ → ● → ▲ → ?",
        options: ["▲", "●", "■", "◆"],
        answer: "▲",
        hint: "Look at the repeating group."
    },

    {
        sequence: "2 → 5 → 10 → 17 → 26 → ?",
        options: ["35", "36", "37", "38"],
        answer: "37",
        hint: "The amount being added changes each time."
    },

    {
        sequence: "Z → W → S → N → ?",
        options: ["H", "I", "J", "K"],
        answer: "H",
        hint: "Move backward through the alphabet. The jumps grow."
    },

    {
        sequence: "▲ → ▶ → ▼ → ◀ → ?",
        options: ["▲", "●", "◆", "■"],
        answer: "▲",
        hint: "The shape is rotating in the same direction."
    },

    {
        sequence: "1 → 2 → 6 → 24 → 120 → ?",
        options: ["240", "360", "720", "840"],
        answer: "720",
        hint: "The multiplier changes at every step."
    },

    {
        sequence: "A1 → C2 → E3 → G4 → ?",
        options: ["H5", "I5", "J5", "K5"],
        answer: "I5",
        hint: "Both parts are following their own pattern."
    },

    {
        sequence: "4 → 9 → 19 → 39 → 79 → ?",
        options: ["149", "159", "169", "179"],
        answer: "159",
        hint: "Look at the relationship between each number and the next."
    },

    {
        sequence: "● ▲ ▲ ■ ● ▲ ▲ ■ ● ▲ ▲ ?",
        options: ["●", "▲", "■", "◆"],
        answer: "■",
        hint: "Find the four-symbol cycle."
    }

];

// ======================================================
// PATTERN GAME VARIABLES
// ======================================================

let currentPattern = 0;

let patternScoreValue = 0;

let patternStreakValue = 0;

let patternComboTimer = null;

const patternProgressText =
    document.getElementById("patternProgressText");

const patternProgressBar =
    document.getElementById("patternProgressBar");

function showPatternCombo(message) {

    const comboMessage =
        document.getElementById("patternComboMessage");

    if (!comboMessage) return;

    comboMessage.textContent = message;

    comboMessage.classList.remove("show");

    void comboMessage.offsetWidth;

    comboMessage.classList.add("show");

    clearTimeout(patternComboTimer);

    patternComboTimer = setTimeout(function () {

        comboMessage.classList.remove("show");

    }, 1200);
}

// ======================================================
// OPEN PATTERN ROOM
// ======================================================

playButton.addEventListener("click", function () {

    dashboard.style.display =
        "none";

    playSection.style.display =
        "block";

    resetPatternGame();

});


// ======================================================
// BACK TO LAB
// ======================================================

backFromPlay.addEventListener("click", function () {

    playSection.style.display =
        "none";

    dashboard.style.display =
        "block";

});


// ======================================================
// RESET PATTERN GAME
// ======================================================

function resetPatternGame() {

    currentPattern = 0;

    patternScoreValue = 0;

    patternStreakValue = 0;


    patternLevel.textContent =
        "1";

    patternScore.textContent =
        "0";

    patternStreak.textContent =
        "0";


    patternCard.style.display =
        "block";

    patternOptions.style.display =
        "grid";

    patternFeedback.style.display =
        "block";

    patternFeedback.textContent = "";

    patternFeedback.className =
        "pattern-feedback";


    nextPattern.style.display =
        "none";

    patternFinal.style.display =
        "none";


    loadPattern();

}


// ======================================================
// LOAD PATTERN
// ======================================================

function loadPattern() {
 
   const progressNumber =
    currentPattern + 1;

   const totalPatterns =
    patterns.length;

    patternProgressText.textContent =
    `${progressNumber} / ${totalPatterns}`;

    patternProgressBar.style.width =
    `${(progressNumber / totalPatterns) * 100}%`;

    patternCard.classList.remove(
    "pattern-transition"
);

void patternCard.offsetWidth;

patternCard.classList.add(
    "pattern-transition"
);

    const current =
        patterns[currentPattern];


    patternLevel.textContent =
        currentPattern + 1;

    patternSequence.textContent =
        current.sequence;

    patternHint.textContent =
        current.hint;


    patternFeedback.textContent =
        "";

    patternFeedback.className =
        "pattern-feedback";


    patternFeedback.style.display =
        "block";


    nextPattern.style.display =
        "none";


    patternOptions.style.display =
        "grid";


    patternOptions.innerHTML =
        "";


    current.options.forEach(function (option) {

        const button =
            document.createElement("button");


        button.className =
            "pattern-option";


        button.textContent =
            option;


        button.addEventListener(
            "click",
            function () {

                checkPatternAnswer(
                    option,
                    button
                );

            }
        );


        patternOptions.appendChild(
            button
        );

    });

}


// ======================================================
// CHECK PATTERN ANSWER
// ======================================================

function checkPatternAnswer(
    selectedAnswer,
    selectedButton
) {

    const current =
        patterns[currentPattern];


    const allButtons =
        document.querySelectorAll(
            ".pattern-option"
        );


    allButtons.forEach(function (button) {

        button.disabled = true;

    });


    if (
        selectedAnswer ===
        current.answer
    ) {
       
        playSuccessSound();

        patternScoreValue++;

        patternStreakValue++;


        patternScore.textContent =
            patternScoreValue;

        patternStreak.textContent =
            patternStreakValue;


        selectedButton.classList.add(
            "correct"
        );


        patternCard.classList.add(
            "pattern-correct"
        );

  if (
    patternStreakValue >= 3
) {

    showPatternCombo(
        `🔥 ${patternStreakValue} STREAK — You're on fire!`
    );

}

else if (
    patternStreakValue === 2
) {

    showPatternCombo(
        "✨ 2 STREAK — Keep going!"
    );

}

else {

    showPatternCombo(
        "✓ Correct!"
    );

}

        patternFeedback.classList.add(
            "correct"
        );

    }


    else {

        playErrorSound();

        patternStreakValue = 0;


        patternStreak.textContent =
            "0";


        selectedButton.classList.add(
            "wrong"
        );


        allButtons.forEach(
            function (button) {

                if (
                    button.textContent ===
                    current.answer
                ) {

                    button.classList.add(
                        "correct"
                    );

                }

            }
        );


        patternCard.classList.add(
            "pattern-wrong"
        );


        patternFeedback.textContent =
            `✕ Not quite. The answer was ${current.answer}. Streak reset.`;

        showPatternCombo(
    "↺ Streak reset — try the next one!"
);


        patternFeedback.classList.add(
            "wrong"
        );

    }


    if (
        currentPattern <
        patterns.length - 1
    ) {

        nextPattern.style.display =
            "inline-block";

    }

    else {

        setTimeout(
            showPatternFinal,
            700
        );

    }

}


// ======================================================
// NEXT PATTERN
// ======================================================

nextPattern.addEventListener(
    "click",
    function () {

        currentPattern++;


        patternCard.classList.remove(
            "pattern-correct",
            "pattern-wrong"
        );


        loadPattern();

    }
);


// ======================================================
// PATTERN FINAL RESULT
// ======================================================

function showPatternFinal() {

    patternCard.style.display =
        "none";

    patternOptions.style.display =
        "none";

    patternFeedback.style.display =
        "none";

    nextPattern.style.display =
        "none";


    patternFinal.style.display =
        "block";


    finalPatternScore.textContent =
        patternScoreValue;


    const result =
        getPatternRank(
            patternScoreValue
        );


    patternRank.textContent =
        result.rank;


    patternFinalMessage.textContent =
        result.message;


    // PATTERN ACHIEVEMENT

    unlockAchievement(
        "patternHunter"
    );

}


// ======================================================
// PATTERN FINAL RANK
// ======================================================

function getPatternRank(score) {

    if (score === 10) {

        return {

            rank: "Logic Master 🧠",

            message:
                "Perfect score. You didn't miss a single pattern."

        };

    }


    if (score >= 8) {

        return {

            rank: "Pattern Hunter ✦",

            message:
                "You notice connections faster than most people."

        };

    }


    if (score >= 6) {

        return {

            rank: "Pattern Seeker 🔎",

            message:
                "Your pattern instincts are pretty strong."

        };

    }


    if (score >= 4) {

        return {

            rank: "Curious Mind 🌙",

            message:
                "You spotted some interesting connections."

        };

    }


    return {

        rank: "Lab Beginner 🌱",

        message:
            "Every pattern is easier once you know what to look for."

    };

}


// ======================================================
// PLAY AGAIN
// ======================================================

patternRestart.addEventListener(
    "click",
    function () {

        patternFeedback.style.display =
            "block";

        resetPatternGame();

    }
);


// ======================================================
// LEAVE A NOTE — OPEN / BACK
// ======================================================

const noteDashboardButton =
    document.querySelector(
        ".lab-card.note-card .explore-button"
    );

const noteSection =
    document.getElementById("noteSection");

const backFromNote =
    document.getElementById("backFromNote");

noteDashboardButton.addEventListener(
    "click",
    function () {

        dashboard.style.display =
            "none";

        noteSection.style.display =
            "block";

        noteFormCard.style.display =
            "none";

        noteSuccess.style.display =
            "none";

        const envelope =
            document.getElementById(
                "noteEnvelope"
            );

        if (envelope) {

            envelope.style.display =
                "flex";

            envelope.classList.remove(
                "open"
            );

        }

    }
);

const openEnvelope =
    document.getElementById(
        "openEnvelope"
    );

const noteEnvelope =
    document.getElementById(
        "noteEnvelope"
    );


openEnvelope.addEventListener(
    "click",
    function () {

        playClickSound();

        noteEnvelope.classList.add(
            "open"
        );


        setTimeout(
            function () {

                noteEnvelope.style.display =
                    "none";

                noteFormCard.style.display =
                    "block";

                noteFormCard.style.opacity =
                    "0";

                noteFormCard.style.transform =
                    "translateY(20px)";


                requestAnimationFrame(
                    function () {

                        noteFormCard.style.transition =
                            "opacity 0.6s ease, transform 0.6s ease";

                        noteFormCard.style.opacity =
                            "1";

                        noteFormCard.style.transform =
                            "translateY(0)";

                    }
                );

                noteMessage.focus();

            },
            900
        );

    }
);


backFromNote.addEventListener(
    "click",
    function () {

        noteSection.style.display =
            "none";

        dashboard.style.display =
            "block";

    }
);


// ======================================================
// LEAVE A NOTE — FUNCTIONALITY
// ======================================================

const noteName =
    document.getElementById("noteName");

const noteRole =
    document.getElementById("noteRole");

const noteMessage =
    document.getElementById("noteMessage");

const noteCharCount =
    document.getElementById("noteCharCount");

const sendNote =
    document.getElementById("sendNote");

const noteFeedback =
    document.getElementById("noteFeedback");

const noteSuccess =
    document.getElementById("noteSuccess");

const noteFormCard =
    document.querySelector(
        ".note-form-card"
    );

const writeAnotherNote =
    document.getElementById(
        "writeAnotherNote"
    );


// ======================================================
// CHARACTER COUNTER
// ======================================================

noteMessage.addEventListener(
    "input",
    function () {

        noteCharCount.textContent =
            noteMessage.value.length;

    }
);

// ======================================================
// MAHROOKH LAB WEB APP URL
// ======================================================

const notesWebApp =
    "https://script.google.com/macros/s/AKfycbxYLKs0unPJ562I4cZeF-nYGwVfuqq9s5D_iEHrzMKMScGdI1qNHNdw-2j_5todP_eN/exec";


// ======================================================
// SEND NOTE
// ======================================================

sendNote.addEventListener(
    "click",
    async function () {

        const name =
            noteName.value.trim();

        const role =
            noteRole.value;

        const message =
            noteMessage.value.trim();


        noteFeedback.textContent =
            "";

        noteFeedback.className =
            "note-feedback";


        // ==================================================
        // VALIDATION
        // ==================================================

        if (message === "") {

            noteFeedback.textContent =
                "✦ Write something first — even a tiny hello counts.";

            noteFeedback.classList.add(
                "error"
            );

            noteMessage.focus();

            return;

        }


        if (message.length < 3) {

            noteFeedback.textContent =
                "✦ Your note is a little too tiny. Give it a few more words.";

            noteFeedback.classList.add(
                "error"
            );

            noteMessage.focus();

            return;

        }


        // ==================================================
        // BUTTON STATE
        // ==================================================

        sendNote.disabled =
            true;

        sendNote.textContent =
            "SENDING... ✦";


        // ==================================================
        // SEND TO GOOGLE SHEETS
        // ==================================================

        try {

            const data =
                new URLSearchParams();

            data.append(
                "name",
                name || "Anonymous"
            );

            data.append(
                "role",
                role || "Just Curious"
            );

            data.append(
                "note",
                message
            );


            await fetch(
                notesWebApp,
                {
                    method: "POST",

                    mode: "no-cors",

                    body: data
                }
            );


            // ==================================================
            // SUCCESS
            // ==================================================

            noteFormCard.style.display =
                "none";

            noteSuccess.style.display =
                "block";

            noteFeedback.style.display =
                "none";


            unlockAchievement(
                "labContributor"
            );


            // CLEAR FORM

            noteName.value =
                "";

            noteRole.value =
                "";

            noteMessage.value =
                "";

            noteCharCount.textContent =
                "0";


        }

        catch (error) {

            console.error(
                "Note submission error:",
                error
            );


            noteFeedback.textContent =
                "✦ Something went wrong. Please try again.";

            noteFeedback.classList.add(
                "error"
            );


            sendNote.disabled =
                false;

            sendNote.textContent =
                "SEND NOTE ✦";

        }

    }
);

// ======================================================
// WRITE ANOTHER NOTE
// ======================================================

writeAnotherNote.addEventListener(
    "click",
    function () {

        noteName.value =
            "";

        noteRole.value =
            "";

        noteMessage.value =
            "";

        noteCharCount.textContent =
            "0";

        noteFeedback.textContent =
            "";

        noteFeedback.className =
            "note-feedback";

        noteSuccess.style.display =
    "none";

noteFormCard.style.display =
    "none";


const envelope =
    document.getElementById(
        "noteEnvelope"
    );


if (envelope) {

    envelope.style.display =
        "flex";

    envelope.classList.remove(
        "open"
    );

}

       
    }
);

// ======================================================
// BUTTON INTERACTION SYSTEM
// ======================================================

document.addEventListener("click", function (event) {

    const button = event.target.closest("button");

    if (!button || button.disabled) return;

    playClickSound();

    button.classList.remove("button-clicked");

    void button.offsetWidth;

    button.classList.add("button-clicked");

});

