"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jspdf_1 = require("jspdf"); // Import jsPDF
// Select form elements
const formSteps = document.querySelectorAll('.form-step');
const nextButtons = document.querySelectorAll('.nextBtn');
const submitButton = document.getElementById('submitForm');
let currentStep = 0;
// Store the form data
let resumeData = {};
// Function to go to the next step in the form
function goToNextStep(nextStepId) {
    const currentStepElement = formSteps[currentStep];
    currentStepElement.classList.remove('active'); // Hide the current step
    const nextStepElement = document.getElementById(nextStepId);
    if (nextStepElement) {
        nextStepElement.classList.add('active'); // Show the next step
    }
    // Update the currentStep index using Array.from() (no need for compatibility code)
    currentStep = Array.from(formSteps).findIndex(step => step.id === nextStepId);
}
// Attach event listeners to each "Next" button
nextButtons.forEach(button => {
    button.addEventListener('click', () => {
        const nextStepId = button.getAttribute('data-next');
        if (nextStepId) {
            goToNextStep(nextStepId);
        }
    });
});
// Handle form submission and generate resume preview
submitButton.addEventListener('click', () => {
    const formData = new FormData(document.getElementById('resumeForm'));
    // Collect form data into a JavaScript object
    formData.forEach((value, key) => {
        resumeData[key] = value;
    });
    // Generate and display the resume preview
    generateResume(resumeData);
});
// Function to generate and display the resume preview
function generateResume(data) {
    const resumeContent = document.getElementById('resumeContent');
    resumeContent.innerHTML = `
        <div class="resume-section" id="personal-info">
            <h3>Personal Information</h3>
            <p><strong>Name:</strong> <span class="editable" data-field="fullName">${data.fullName}</span></p>
            <p><strong>Email:</strong> <span class="editable" data-field="email">${data.email}</span></p>
            <p><strong>Phone:</strong> <span class="editable" data-field="phone">${data.phone}</span></p>
        </div>

        <div class="resume-section" id="education">
            <h3>Education</h3>
            <p><strong>Degree:</strong> <span class="editable" data-field="degree">${data.degree}</span></p>
            <p><strong>School:</strong> <span class="editable" data-field="school">${data.school}</span></p>
            <p><strong>Graduation Year:</strong> <span class="editable" data-field="gradYear">${data.gradYear}</span></p>
        </div>

        <div class="resume-section" id="work-experience">
            <h3>Work Experience</h3>
            <p><strong>Job Title:</strong> <span class="editable" data-field="jobTitle">${data.jobTitle}</span></p>
            <p><strong>Company:</strong> <span class="editable" data-field="company">${data.company}</span></p>
            <p><strong>Work Dates:</strong> <span class="editable" data-field="workDates">${data.workDates}</span></p>
        </div>

        <div class="resume-section" id="skills">
            <h3>Skills</h3>
            <p><strong>Skills:</strong> <span class="editable" data-field="skills">${data.skills}</span></p>
        </div>
    `;
    // Display the resume preview section
    document.getElementById('resumePreview').style.display = 'block';
    // Generate shareable link
    const username = data.fullName.split(' ').join('-').toLowerCase();
    const resumeLink = `https://username.vercel.app/resume/${username}`;
    document.getElementById('resumeLink').innerHTML = resumeLink;
    document.getElementById('generatedLink').style.display = 'block';
}
// Download resume as PDF
document.getElementById('downloadPDF').addEventListener('click', () => {
    const resumeContent = document.getElementById('resumeContent');
    const doc = new jspdf_1.jsPDF();
    doc.html(resumeContent, {
        callback: function (doc) {
            doc.save('resume.pdf');
        },
        x: 10,
        y: 10
    });
});
//# sourceMappingURL=script.js.map