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

    // Счетчик страницы
    let stepCount = 1;

    function checkForm(selectorBtn, selectorCards) {
        const submitBtn = document.querySelector(selectorBtn);
        const cards = document.querySelectorAll(`input[name="step-${stepCount}"]`);
        let checked = false;
        for (let i = 0; i < cards.length; i++) {
          if (cards[i].checked) {
            console.log(cards[i].checked);
            checked = true;
            break;
          }
        }
        // console.log(submitBtn.disabled);
        submitBtn.disabled = checked;
        
        console.log(submitBtn.disabled);
    }

    // Логика работы карточек с radio-кнопкой
    const cards = document.querySelectorAll('.card');

    cards.forEach(item => {
        if(item && item.querySelectorAll('.radio-button').length > 0){
            
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
                checkForm('.more', 'input[name="card"]');
                
            });
        }    
    });
    
    

    // Логика выпадающего меню
    const cardСheckbox = document.querySelectorAll('.card-checkbox');

    cardСheckbox.forEach(elem => {
        elem.addEventListener('click', () => {
            const dropMenu = elem.nextElementSibling;

            if(dropMenu.classList.contains('drop-menu')){
                if(dropMenu.classList.contains('display-none')){
                    console.log('ready');
                    dropMenu.classList.remove('display-none');
                } else {
                    dropMenu.classList.add('display-none');
                }
            }  
        });
    });
    

    // Логика выбора одного чекбокса
    const cityItems = document.querySelectorAll('.drop-menu__item');

    cityItems.forEach(item => {
        if(item && item.querySelectorAll('.checked-button').length > 0){
            item.addEventListener('click', () => {
                const input = item.querySelector('input');
                const span = item.querySelector('span');
                const text = item.querySelector('label');
                const cardText = document.querySelectorAll('.card-checkbox__text')

                let mainText = text.innerHTML;
    
                cityItems.forEach(btn => {
                    btn.querySelector('span').classList.remove('checked-button__active');
                    
                });
                span.classList.add('checked-button__active');
                
                input.checked = true;
                
                cardText.forEach(elem => {
                    elem.innerHTML = mainText;
                });
            });
        }      
    });














    // Логика работы кнопки 
    const button = document.querySelectorAll('button');
    
    button.forEach(btn => {
        btn.addEventListener('click', () => {
            const buttonMore = document.querySelector('button.more');
            const buttonBack = document.querySelector('button.back');
            const wrapperBlock = document.querySelector('.wrapper-block__content');
            const step = document.querySelector('.step');
            
            checkForm('.more', 'input[name="card"]');
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
                if((key.classList[1] == `wrapper-block__step-${stepCount}`)){
                    wrapperContent.classList.remove('display-none');
                } else {
                    wrapperContent.classList.add('display-none');
                }
            }

            // Добавляем кнопку "Назад", если шаг больше 1, и убираем, если шаг меньше
            (stepCount > 1 && stepCount < 9) ? buttonBack.classList.remove('opacity') : buttonBack.classList.add('opacity');

            
            
            // Меняем цифру в шаге
            step.innerHTML = `Шаг ${stepCount}/9`; 

            question.innerHTML = questions[stepCount-1];


    
        });
    });
    

    
    // console.log(currentBlock);
    // console.log(currentCards);











});