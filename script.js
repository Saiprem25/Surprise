const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const questionSection = document.getElementById('question-section');
const successSection = document.getElementById('success-section');

// Configuration for the "Tired" mechanic
let runCount = 0;
const maxRuns = 5; // How many times the Yes button jumps before giving up

// IMPORTANT: Ensure the container allows absolute positioning inside it
questionSection.style.position = "relative";

// Function to get random coordinates WITHIN the question container
function getRandomPosition(element) {
    // We use the container's width/height instead of the window's
    const containerWidth = questionSection.clientWidth;
    const containerHeight = questionSection.clientHeight;

    const x = Math.random() * (containerWidth - element.offsetWidth);
    const y = Math.random() * (containerHeight - element.offsetHeight);
    
    return { x, y };
}

// Function to move buttons
function moveButtons() {
    // 1. Always move the 'No' button (It keeps running away)
    let posNo = getRandomPosition(noBtn);
    noBtn.style.position = 'absolute';
    noBtn.style.left = `${posNo.x}px`;
    noBtn.style.top = `${posNo.y}px`;

    // 2. Logic for the 'Yes' button
    if (runCount < maxRuns) {
        // If not tired yet, move the Yes button
        let posYes = getRandomPosition(yesBtn);
        
        // Ensure buttons don't overlap too much
        const distance = Math.sqrt(Math.pow(posYes.x - posNo.x, 2) + Math.pow(posYes.y - posNo.y, 2));
        if (distance < 100) { 
            posNo = getRandomPosition(noBtn); // Re-roll No button if too close
            noBtn.style.left = `${posNo.x}px`;
            noBtn.style.top = `${posNo.y}px`;
        }

        yesBtn.style.position = 'absolute';
        yesBtn.style.left = `${posYes.x}px`;
        yesBtn.style.top = `${posYes.y}px`;
        
        runCount++;
    } else {
        // 3. The Yes button is "Tired"
        // We stop updating its position so it stays still
        yesBtn.innerText = "Okay, I'm tired... Click me! 😅";
        yesBtn.style.transform = "scale(1.1)"; // Make it slightly bigger/inviting
        
        // Optional: Remove the mouseover listener from Yes so it doesn't trigger No to move
        yesBtn.removeEventListener('mouseover', moveButtons);
    }
}

// Trigger movement when mouse gets close to either button
yesBtn.addEventListener('mouseover', moveButtons);
noBtn.addEventListener('mouseover', moveButtons);

// The "Yes" button click event
yesBtn.addEventListener('click', () => {
    questionSection.classList.add('hidden');
    successSection.classList.remove('hidden');
    
    // Reset styles for the success screen
    yesBtn.style.position = 'static';
    noBtn.style.display = 'none';
});

// Set the name from URL
const urlParams = new URLSearchParams(window.location.search);
const userName = urlParams.get('name') || "Nirali";
// Check if element exists before setting innerText to avoid errors
const nameElement = document.getElementById('valentineName');
if (nameElement) {
    nameElement.innerText = `${userName}, will you be my Valentine?`;
}