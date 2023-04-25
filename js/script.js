document.addEventListener('DOMContentLoaded', () => {
    // Получаем все элементы с классом .radio-button
    const radioButtons = document.querySelectorAll('.radio-button');

    // Добавляем обработчик события на каждый элемент
    radioButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Получаем связанный input элемент
            const input = button.previousElementSibling;
            
            // Удаляем класс active со всех radio-button
            radioButtons.forEach(btn => {
                btn.classList.remove('radio-button__active');
                btn.parentElement.classList.remove('card__active');
            });
            
            // Добавляем класс active только к текущему элементу
            button.classList.add('radio-button__active');
            button.parentElement.classList.remove('card__active');
            
            // Устанавливаем свойство checked для выбранного input элемента
            input.checked = true;
        });
    });

















});