// Ensure dataLayer is defined
window.dataLayer = window.dataLayer || [];

// Track Button Clicks
function trackButtonClick(buttonName) {
    dataLayer.push({
        'event': 'button_click',
        'button_name': buttonName,
        'page': window.location.pathname
    });
    console.log('Button Click Tracked:', buttonName);
}

// Track Outbound Link Clicks
function trackOutboundLinkClick(link) {
    dataLayer.push({
        'event': 'outbound_link_click',
        'url': link.href
    });
    console.log('Outbound Link Clicked:', link.href);
}

// Track Scroll Depth
let scrollTracked = [];
window.addEventListener('scroll', function () {
    let scrollDepth = Math.round((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100);
    if ([25, 50, 75, 100].includes(scrollDepth) && !scrollTracked.includes(scrollDepth)) {
        scrollTracked.push(scrollDepth);
        dataLayer.push({
            'event': 'scroll_depth',
            'percentage': scrollDepth
        });
        console.log('Scroll Depth Reached:', scrollDepth, '%');
    }
});

// Track Video Interactions
const video = document.getElementById('promoVideo');
if (video) {
    video.addEventListener('play', () => trackVideoEvent('play'));
    video.addEventListener('pause', () => trackVideoEvent('pause'));
    video.addEventListener('ended', () => trackVideoEvent('complete'));
}

function trackVideoEvent(action) {
    dataLayer.push({
        'event': 'video_interaction',
        'action': action,
        'video_title': 'Promo Video'
    });
    console.log('Video Event:', action);
}

// Track Form Field Focus
document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('focus', () => {
        dataLayer.push({
            'event': 'form_field_focus',
            'field_name': input.id
        });
        console.log('Form Field Focus:', input.id);
    });
});

// Enhanced Form Validation and Email Sending
function sendMail() {
    let isValid = true;

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const formStatus = document.getElementById('formStatus');

    // Validate Name
    if (name.value.trim() === "") {
        nameError.textContent = "Name is required.";
        name.classList.add('error');
        nameError.style.display = 'block';
        isValid = false;
    } else {
        nameError.textContent = "";
        name.classList.remove('error');
        nameError.style.display = 'none';
    }

    // Validate Email
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(email.value.trim())) {
        emailError.textContent = "Please enter a valid email.";
        email.classList.add('error');
        emailError.style.display = 'block';
        isValid = false;
    } else {
        emailError.textContent = "";
        email.classList.remove('error');
        emailError.style.display = 'none';
    }

    // Validate Message
    if (message.value.trim() === "") {
        messageError.textContent = "Message cannot be empty.";
        message.classList.add('error');
        messageError.style.display = 'block';
        isValid = false;
    } else {
        messageError.textContent = "";
        message.classList.remove('error');
        messageError.style.display = 'none';
    }

    if (isValid) {
        dataLayer.push({
            'event': 'form_submission',
            'form_name': 'Contact Form'
        });
        console.log('Form Submitted Successfully');

        // Send email using mailto:
        const subject = encodeURIComponent("Contact Form Submission");
        const body = encodeURIComponent(`Name: ${name.value}\nEmail: ${email.value}\nMessage:\n${message.value}`);
        const mailtoLink = `mailto:rickeypatil.2003@gmail.com?subject=${subject}&body=${body}`;
        window.location.href = mailtoLink;

        // Show confirmation message
        formStatus.textContent = "Redirecting to your email client...";
        formStatus.style.color = "green";

        // Clear form
        document.getElementById('contactForm').reset();
    } else {
        formStatus.textContent = "Please correct the errors above.";
        formStatus.style.color = "red";
    }

    return false;  // Prevent default form submission
}

// Back to Top Button
const backToTop = document.createElement('div');
backToTop.className = 'back-to-top';
backToTop.innerHTML = '&#8679;';
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Cookie Consent
const cookieConsent = document.createElement('div');
cookieConsent.className = 'cookie-consent';
cookieConsent.innerHTML = `
    <div class="cookie-content">
        <p>We use cookies to improve your experience. By continuing to visit this site you agree to our use of cookies.</p>
        <button class="btn btn-primary" onclick="acceptCookies()">Accept</button>
    </div>`;
document.body.appendChild(cookieConsent);

function acceptCookies() {
    cookieConsent.style.display = 'none';
    localStorage.setItem('cookiesAccepted', 'true');
}

if (localStorage.getItem('cookiesAccepted') === 'true') {
    cookieConsent.style.display = 'none';
}
