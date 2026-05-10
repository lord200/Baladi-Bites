const hamburger = document.querySelector('.hamburger'); 
const mobileNav = document.querySelector('.mobile-nav'); 
const mobileNavLinks = document.querySelectorAll('.mobile-nav__link'); 
const menuTabs = document.querySelectorAll('.menu__tab'); 
const menuItems = document.querySelectorAll('.menu-item'); 
const scrollRevealElements = document.querySelectorAll('.scroll-reveal'); 
const reservationForm = document.getElementById('reservation-form'); 

hamburger.addEventListener('click', () => {     
    hamburger.classList.toggle('active');     
    mobileNav.classList.toggle('active'); 
}); // Fixed missing closing bracket

mobileNavLinks.forEach(link => {     
    link.addEventListener('click', () => {         
        hamburger.classList.remove('active');         
        mobileNav.classList.remove('active');     
    }); 
}); // Fixed missing closing bracket

menuTabs.forEach(tab => {     
    tab.addEventListener('click', () => {         
        menuTabs.forEach(t => t.classList.remove('active'));         
        tab.classList.add('active');         
        const category = tab.dataset.category;         
        menuItems.forEach(item => {             
            if (category === 'all' || item.dataset.category === category) {                 
                item.classList.remove('hidden');             
            } else {                 
                item.classList.add('hidden');             
            }         
        });     
    }); 
}); // Fixed missing closing bracket

const observerOptions = {     
    threshold: 0.1,     
    rootMargin: '0px 0px -50px 0px' 
}; // Fixed missing closing bracket

const observer = new IntersectionObserver((entries) => {     
    entries.forEach(entry => {         
        if (entry.isIntersecting) {             
            entry.target.classList.add('visible');         
        }     
    }); 
}, observerOptions); 

scrollRevealElements.forEach(element => {     
    observer.observe(element); 
}); // Fixed missing closing bracket

reservationForm.addEventListener('submit', (e) => {     
    e.preventDefault();     
    alert('Reservation request submitted! We will confirm within 24 hours.');     
    reservationForm.reset(); 
}); // Fixed missing closing bracket

window.addEventListener('scroll', () => {     
    const header = document.querySelector('.header');     
    if (window.scrollY > 100) {         
        header.style.padding = '1rem 0';     
    } else {         
        header.style.padding = '1.5rem 0';     
    } 
});

// Cart functionality
let cart = JSON.parse(localStorage.getItem('restaurantCart')) || [];

function updateCartCount() {
    const current = JSON.parse(localStorage.getItem('restaurantCart')) || [];
    const total = current.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => el.textContent = total);
}

function showToast(message) {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const name = btn.dataset.name;
        const price = parseInt(btn.dataset.price);
        const existing = cart.find(item => item.name === name);
        if (existing) {
            existing.quantity++;
        } else {
            cart.push({ name, price, quantity: 1, image: btn.dataset.image });
        }
        localStorage.setItem('restaurantCart', JSON.stringify(cart));
        updateCartCount();
        showToast(name + ' added to the cart');
        btn.textContent = 'Added!';
        setTimeout(() => { btn.textContent = 'Add to Cart'; }, 1000);
    });
});

updateCartCount();