// Password for edit mode
const ADMIN_PASSWORD = "admin123";
let isEditMode = false;

$(document).ready(function() {
    // Load groups from Firestore on page load
    loadGroupsFromFirestore();
    
    // Setup unlock button
    $("#unlock-btn").click(function() {
        handleUnlock();
    });
});

function loadGroupsFromFirestore() {
    const groupsRef = db.collection("groups");
    
    groupsRef.onSnapshot((snapshot) => {
        const container = $("#quiz-container");
        container.empty();
        
        snapshot.forEach((doc) => {
            const groupData = doc.data();
            const groupId = doc.id;
            
            const groupCard = createGroupCard(groupId, groupData);
            container.append(groupCard);
        });
        
        // Re-attach event listeners to new elements
        attachScoreButtonListeners();
    });
}

function createGroupCard(groupId, groupData) {
    const score = groupData.score || 0;
    const groupName = groupData.name || `Group ${groupId}`;
    
    const card = $(`
        <div class="group-card" data-group-id="${groupId}">
            <input type="text" placeholder="Group Name" value="${groupName}" class="group-name" disabled>
            <div class="score">${score}</div>
            <div class="edit-controls">
                <button class="score-btn" data-value="20">+20</button>
                <button class="score-btn" data-value="10">+10</button>
                <button class="score-btn" data-value="5">+5</button>
                <button class="score-btn" data-value="1">+1</button>
                <button class="score-btn" data-value="-10">-10</button>
                <button class="score-btn" data-value="-5">-5</button>
            </div>
        </div>
    `);
    
    return card;
}

function attachScoreButtonListeners() {
    $(".score-btn").off("click").on("click", function(e) {
        e.stopPropagation();
        
        const value = parseInt($(this).data("value"));
        const groupCard = $(this).closest(".group-card");
        const groupId = groupCard.data("group-id");
        const currentScore = parseInt(groupCard.find(".score").text());
        const newScore = currentScore + value;
        
        // Update score display
        groupCard.find(".score").text(newScore);
        
        // Update Firestore
        db.collection("groups").doc(groupId).update({
            score: newScore
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