// Функция анимации чисел
function animateNumber(element, target) {
    let current = 0;
    const duration = 2000; // 2 секунды
    const step = target / (duration / 16); // 60 FPS
    
    const update = () => {
        current += step;
        if (current > target) {
            current = target;
        }
        element.textContent = Math.floor(current);
        
        if (current < target) {
            requestAnimationFrame(update);
        }
    };
    
    update();
}

// Функция для проверки видимости элемента
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Запуск анимации при прокрутке
let animated = false;
function handleScroll() {
    if (animated) return;
    
    const statsSection = document.querySelector('.stats');
    if (isElementInViewport(statsSection)) {
        const numbers = document.querySelectorAll('.stat-number');
        numbers.forEach(number => {
            const target = parseInt(number.getAttribute('data-target'));
            animateNumber(number, target);
        });
        animated = true;
        // Удаляем обработчик после первой анимации
        window.removeEventListener('scroll', handleScroll);
    }
}

// Добавляем обработчик прокрутки
window.addEventListener('scroll', handleScroll);
// Проверяем видимость при загрузке страницы
handleScroll();

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');

    menuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        menuBtn.textContent = mobileMenu.classList.contains('active') ? '✕' : '☰';
    });

    // Close menu when clicking on a link
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            menuBtn.textContent = '☰';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.mobile-menu') && 
            !event.target.closest('.mobile-menu-btn') && 
            mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            menuBtn.textContent = '☰';
        }
    });
});
