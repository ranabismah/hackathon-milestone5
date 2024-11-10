"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateResume() {
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const skills = document.getElementById('skills').value;
    const experience = document.getElementById('experience').value;
    const education = document.getElementById('education').value;
    // Validate that all fields are filled
    if (!name || !email || !phone || !skills || !experience || !education) {
        alert("Please fill in all fields.");
        return;
    }
    // Format skills into a list
    const skillsList = skills.split(',').map(skill => `<li>${skill.trim()}</li>`).join('');
    // Format education into a list (split by commas or line breaks)
    const educationList = education.split(',').map(edu => `<li>${edu.trim()}</li>`).join('');
    // Prepare resume content (Personal Information first, then Education, Skills, and Experience)
    const resumeContent = `
        <h3>Personal Information</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>

        <h3>Education</h3>
        <ul>${educationList}</ul>

        <h3>Skills</h3>
        <ul>${skillsList}</ul>

        <h3>Work Experience</h3>
        <p>${experience}</p>
    `;
    // Change the heading of the generated resume to the user's name
    document.getElementById('generated-resume').querySelector('h2').textContent = `${name}'s Resume`;
    // Display generated resume and hide form
    document.getElementById('form-container').style.display = 'none';
    document.getElementById('generated-resume').style.display = 'block';
    document.getElementById('resume-content').innerHTML = resumeContent;
}
function editResume() {
    // Show form and hide generated resume
    document.getElementById('form-container').style.display = 'block';
    document.getElementById('generated-resume').style.display = 'none';
}
function downloadPDF() {
    // Create a jsPDF instance
    const doc = new jsPDF();
    // Get resume content text
    const resumeContent = document.getElementById('resume-content').innerText;
    // Add the content to the PDF
    doc.setFontSize(16);
    doc.text("Resume", 10, 10); // Title of the document
    doc.setFontSize(12);
    doc.text(resumeContent, 10, 20);
    // Save the PDF with the name 'resume.pdf'
    doc.save('resume.pdf');
}
// Optional: Listen for 'Enter' key to trigger resume generation
document.getElementById('resume-form')?.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        generateResume();
    }
});
