// --- MODERN THEME TOGGLE LOGIC ---
const themeToggleInput = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

// 1. Check memory on page load
if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggleInput.checked = true; // Physically moves the slider to the right
}

// 2. Listen for the toggle switch changing
themeToggleInput.addEventListener('change', () => {
    if (themeToggleInput.checked) {
        // Switch to Light Mode
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    } else {
        // Switch to Dark Mode
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
    }
});

// --- SCROLL ANIMATIONS LOGIC ---
const animatedSections = document.querySelectorAll('.hidden-section');

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Add the 'show' class to trigger the CSS transition
            entry.target.classList.add('show-section');
            // Stop observing once it has animated in
            animationObserver.unobserve(entry.target); 
        }
    });
}, {
    threshold: 0.15 // Triggers when 15% of the section is visible on screen
});

animatedSections.forEach((section) => {
    animationObserver.observe(section);
});

// --- 1. PROJECT DATA ---
// In a full-stack app, this data would eventually come from your Java backend API.
// For now, we mock the database using a local JavaScript array.

const portfolioProjects = [
    {
        id: 1,
        title: "Employee Payroll System",
        description: "A robust Java backend application calculating complex salary structures with OOP principles.",
        techStack: ["Java", "Spring Boot", "MySQL"],
        github: "https://github.com/ayush2004175",
        image: "assets/project1.jpg" // <-- New Image Property
    },
    {
        id: 2,
        title: "Geometry Calculation Engine",
        description: "Object-oriented program utilizing coordinate-based geometry for complex shape classes.",
        techStack: ["Java", "Algorithms", "Mathematics"],
        github: "https://github.com/ayush2004175",
        image: "assets/project2.jpg" // <-- New Image Property
    },
    {
        id: 3,
        title: "Interactive Web Dashboard",
        description: "A responsive data visualization dashboard with smooth CSS animations and dark mode UI.",
        techStack: ["HTML5", "CSS3", "JavaScript"],
        github: "https://github.com/ayush2004175",
        image: "assets/project3.jpg" // <-- New Image Property
    }
];


// --- 2. DYNAMIC RENDERING LOGIC ---

const projectContainer = document.getElementById('project-container');

function renderProjects() {
    // Clear the container just in case
    projectContainer.innerHTML = '';

    // Loop through each project in the array
    portfolioProjects.forEach(project => {
        
        // Convert the tech stack array into HTML span tags
        const techTags = project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('');

    // Construct the HTML for a single project card
        const projectCard = `
            <div class="project-card">
                <img src="${project.image}" alt="${project.title} Screenshot" class="project-image">
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="tags">
                        ${techTags}
                    </div>
                    <a href="${project.github}" class="btn outline-btn" target="_blank">View Code</a>
                </div>
            </div>
        `;

        // Inject the constructed HTML into the webpage
        projectContainer.innerHTML += projectCard;
    });
}

// --- 4. SCROLL SPY (Intersection Observer) ---
// Execute the function when the script loads
renderProjects();

// --- 3. CONTACT FORM INTERCEPTION ---

const contactForm = document.getElementById('contact-form');

// Notice the word 'async' here. It tells the browser this function will 
// take some time (waiting for the server to reply).
contactForm.addEventListener('submit', async function(event) {
    
    event.preventDefault(); // Stops the page from reloading

    // 1. Capture the data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const formData = {
        title: `Message from ${name}`,
        body: message,
        email: email
    };

    console.log("1. Handing the order to the waiter...");

    try {
        // We are now sending data to YOUR local Java Spring Boot server
        const response = await fetch('https://portfolio-backend-production-d0ee.up.railway.app/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            // Read the JSON response from your Java Controller
            const serverData = await response.json(); 
            console.log("Server replied:", serverData);
            alert("Success! " + serverData.message); 
            contactForm.reset(); 
        } else {
            alert("The server rejected the request.");
        }

    } catch (error) {
        console.error("Connection failed:", error);
    }
});

// --- 4. SCROLL SPY (Intersection Observer) ---
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.6 // Triggers when 60% of the section is visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Get the ID of the section currently on screen
            const currentId = entry.target.getAttribute('id');
            
            // Remove the highlight from all links
            navItems.forEach(item => {
                item.style.color = 'var(--text-main)';
                item.style.borderBottom = 'none';
            });

            // Highlight the link that matches the current section
            const activeLink = document.querySelector(`.nav-links a[href="#${currentId}"]`);
            if (activeLink) {
                activeLink.style.color = 'var(--accent-color)';
                // Optional: add a permanent underline to the active section
            }
        }
    });
}, observerOptions);

// Tell the observer to watch all sections
sections.forEach(section => {
    observer.observe(section);
});