// Password for edit mode
const ADMIN_PASSWORD = "admin123";
let isEditMode = false;

$(document).ready(function() {
    // Setup unlock button
    $("#unlock-btn").click(function() {
        handleUnlock();
    });
    
    // Setup score button listeners
    attachScoreButtonListeners();
});

function attachScoreButtonListeners() {
    $("nav em").off("click").on("click", function(e) {
        if (!isEditMode) return;
        
        e.stopPropagation();
        const value = parseInt($(this).data("value"));
        const groupCard = $(this).closest(".group-card");
        const scoreSpan = groupCard.find(".score");
        const currentScore = parseInt(scoreSpan.text());
        const newScore = currentScore + value;
        
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
        
        // Get the team ID from input data attribute
        const teamId = groupCard.find(".team-name").data("team");
        
        // Update Firestore
        dbRef.update({
            [teamId]: newScore
        }).catch((error) => {
            console.error("Error updating score: ", error);
        });
    });
}

function handleUnlock() {
    const password = prompt("Enter password to unlock edit mode:");
    
    if (password === ADMIN_PASSWORD) {
        isEditMode = true;
        $("#unlock-btn").addClass("hidden");
        $(".edit-controls").addClass("visible");
    } else if (password !== null) {
        alert("Incorrect password. Try again.");
    }
}