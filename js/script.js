'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // Наши вопросы
    const question = document.querySelector('.question');
    const questions = [
        'Для кого вы ищете учебное заведение?',
        'В каком городе планируете поступать?',
        'Какое образование уже есть?',
        'Куда планируете поступать?',
        'Какую форму обучения предпочитаете?',
        'Рассматриваете платное обучение?',
        'Какая специальность интересует?',
        'Как скоро планируете поступать?',
        'Ваша подборка готова! 🥳 Куда нам отправить её?'
    ];


    // Пробегаем по всем карточкам
    const cards = document.querySelectorAll('.card');

    cards.forEach(item => {
        item.addEventListener('click', () => {
            const input = item.querySelector('input');
            const span = item.querySelector('span');

            cards.forEach(btn => {
                btn.classList.remove('card__active');
                btn.querySelector('span').classList.remove('radio-button__active');
            });

            span.classList.add('radio-button__active');
            item.classList.add('card__active');

            input.checked = true;
        });
    });

    const button = document.querySelectorAll('button');
    let stepCount = 1;
    
    button.forEach(btn => {
        btn.addEventListener('click', () => {
            const buttonMore = document.querySelector('button.more');
            const buttonBack = document.querySelector('button.back');
            const wrapperBlock = document.querySelector('.wrapper-block__content');
            const step = document.querySelector('.step');
            
            // Если нажали на "Далее", то счетчик шагов увеличивается на 1, при нажатии "Назад", уменьшается на 1
            if(stepCount < questions.length && stepCount > 0){
                if(btn.classList.contains('more')){
                    stepCount++;
                } else {
                    stepCount--;
                } 
            }           

            // Показываем текущий блок шага
            for(let key of wrapperBlock.children){
                const wrapperContent = key;
                if((key.classList[0] == `wrapper-block__step-${stepCount}`)){
                    wrapperContent.classList.remove('display-none');
                } else {
                    wrapperContent.classList.add('display-none');
                }
            }

            // Добавляем кнопку "Назад", если шаг больше 1, и убираем, если шаг меньше
            (stepCount > 1) ? buttonBack.classList.remove('opacity') : buttonBack.classList.add('opacity');
            
            // Меняем цифру в шаге
            step.innerHTML = `Шаг ${stepCount}/9`; 

            question.innerHTML = questions[stepCount-1];


    
        });
    });
    













});