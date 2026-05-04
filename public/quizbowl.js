// Password for edit mode
const ADMIN_PASSWORD = "admin123";
let isEditMode = false;

$(document).ready(function() {
    // Setup unlock button
    $("#unlock-btn").click(function() {
        handleUnlock();
    });
    
    // Setup score button listeners using event delegation
    $(document).on("click", "nav em", function(e) {
        if (!isEditMode) return;
        
        e.stopPropagation();
        const value = parseInt($(this).data("value"));
        const groupCard = $(this).closest(".group-card");
        const scoreSpan = groupCard.find(".score");
        const currentScore = parseInt(scoreSpan.text());
        const newScore = currentScore + value;
        
        // Get the team ID from input data attribute
        const teamId = groupCard.find(".team-name").data("team");
        
        // Record history before updating score
        recordHistory(teamId, currentScore, newScore, value);
        
        // Update score display with animation
        scoreSpan.prop('Counter', currentScore).animate({
            Counter: newScore
        }, {
            duration: Math.abs(45 * value),
            easing: 'swing',
            step: function(now) {
                scoreSpan.text(Math.ceil(now));
            }
        });
        
        // Update Firestore
        dbRef.update({
            [teamId]: newScore
        }).catch((error) => {
            console.error("Error updating score: ", error);
        });
    });
});

function recordHistory(teamId, previousScore, newScore, changeAmount) {
    const timestamp = new Date();
    
    // Create history document reference
    const historyRef = db.collection("quiz").doc("inigo").collection("history").doc();
    
    // Save history record
    historyRef.set({
        teamId: teamId,
        previousScore: previousScore,
        newScore: newScore,
        changeAmount: changeAmount,
        timestamp: timestamp,
        formattedTime: timestamp.toLocaleString()
    }).catch((error) => {
        console.error("Error recording history: ", error);
    });
}

function handleUnlock() {
    const password = prompt("Enter password to unlock edit mode:");
    
    if (password === ADMIN_PASSWORD) {
        isEditMode = true;
        $("#unlock-btn").addClass("hidden");
        $("nav").addClass("visible");
        alert("Edit mode unlocked! You can now click the buttons to update scores.");
    } else if (password !== null) {
        alert("Incorrect password. Try again.");
    }
}