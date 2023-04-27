'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('my-form');
    const sendButton = document.getElementById('test');
    const url = 'https://formspree.io/f/xpzeogqv';

    sendButton.addEventListener('click', (e) => {
    e.preventDefault();
    fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        name: form.name.value,
        _replyto: form.email.value,
        email: form.email.value
        })
    })
    .then(response => {
        if (response.ok) {
        alert('Ваше сообщение было успешно отправлено.');
        form.reset();
        } else {
        throw new Error('Произошла ошибка при отправке сообщения.');
        }
    })
    .catch(error => {
        alert(error.message);
    });
    });

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

    // Функция проверки на выбор кнопки
    function checkForm() {
        const submitBtn = document.querySelector('.more');
        const currentBlock = document.querySelector(`.wrapper-block__step-${stepCount}`);
        const currentCards = currentBlock.querySelectorAll('.card');
        let checked = true;

        for(let i = 0; i < currentCards.length; i++){
            if(currentCards[i].classList.contains('card__active')){
                submitBtn.disabled = !checked;
                submitBtn.classList.remove('disabled');
                break;
            } else {
                submitBtn.classList.add('disabled');
                submitBtn.disabled = checked; 
            }
        }

        // Логика работы карточек с radio-кнопкой
        currentCards.forEach(item => {
            if(item && item.querySelectorAll('.radio-button').length > 0){
                
                item.addEventListener('click', () => {
                    const input = item.querySelector('input');
                    const span = item.querySelector('span');
        
                    currentCards.forEach(btn => {
                        btn.classList.remove('card__active');
                        btn.querySelector('span').classList.remove('radio-button__active');
                    });
        
                    span.classList.add('radio-button__active');
                    item.classList.add('card__active');
        
                    input.checked = true;
                    checkForm(); 
                    
                });
            }    
        });


    }

    checkForm();
    
    

    // Логика выпадающего меню
    const cardСheckbox = document.querySelectorAll('.card-checkbox');

    cardСheckbox.forEach(elem => {
        elem.addEventListener('click', () => {
            const dropMenu = elem.nextElementSibling;

            if(dropMenu.classList.contains('drop-menu')){
                if(dropMenu.classList.contains('display-none')){
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
            const buttonSend = document.querySelector('.wrapper-block__send');
            const wrapperBlock = document.querySelector('.wrapper-block__content');
            const step = document.querySelector('.step');
            
            // Если нажали на "Далее", то счетчик шагов увеличивается на 1, при нажатии "Назад", уменьшается на 1
            if(stepCount < questions.length && stepCount > 0){
                if(btn.classList.contains('more')){
                    stepCount++;
                } else if(btn.classList.contains('back')) {
                    stepCount--;
                } else {
                    return;
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

            if(stepCount == 9){
                buttonMore.classList.add('display-none');
                buttonBack.classList.add('display-none');
                buttonSend.classList.remove('display-none');
            } else {
                buttonMore.classList.remove('display-none');
                buttonBack.classList.remove('display-none');
                buttonSend.classList.add('display-none');
            }


            
            
            // Меняем цифру в шаге
            step.innerHTML = `Шаг ${stepCount}/9`; 

            question.innerHTML = questions[stepCount-1];


            checkForm(); 
        });
    });
    

    
    // console.log(currentBlock);
    // console.log(currentCards);











});