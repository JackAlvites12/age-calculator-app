
const inputDay = document.querySelector('#day');
const inputMonth = document.querySelector('#month');
const inputYear = document.querySelector('#year');

const smallErrorDay = document.querySelector('.errorDay');
const smallErrorMonth = document.querySelector('.errorMonth');
const smallErrorYear = document.querySelector('.errorYear');

const btnSubmit = document.querySelector('.btn-submit');

const errorLabelAll = document.querySelectorAll('label');
const errorInputAll = document.querySelectorAll('.input-date');

const calculatedDay = document.querySelector('.number-days');
const calculatedMonth = document.querySelector('.number-months');
const calculatedYear = document.querySelector('.number-years');


inputDay.addEventListener('input', validarInput);
inputMonth.addEventListener('input', validarInput);
inputYear.addEventListener('input', validarInput);



btnSubmit.addEventListener('click', (e) => {

    e.preventDefault();

    // Obtener la fecha actual
    let fechaActual = new Date();
    let currentYear = fechaActual.getFullYear();
    let currentMonth = fechaActual.getMonth() + 1;
    let currentDay = fechaActual.getDate();

    // Obtener la fecha de nacimiento desde los campos de entrada
    let birthYear = Number(inputYear.value);
    let birthMonth = Number(inputMonth.value);
    let birthDay = Number(inputDay.value);

    // Calcular la diferencia en años, meses y días
    let diffYears = currentYear - birthYear;
    let diffMonths = currentMonth - birthMonth;
    let diffDays = currentDay - birthDay;

    // Ajustar la diferencia si aún no ha pasado el cumpleaños de este año
    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
        diffYears--;

        // Ajustar los meses y los días
        if (currentDay < birthDay) {
            diffMonths = (12 + currentMonth - birthMonth - 1) % 12; // Restar 1 porque ya hemos contado el mes actual
            let daysInLastMonth = new Date(currentYear, currentMonth - 1, 0).getDate();
            diffDays = daysInLastMonth - birthDay + currentDay;
        } else {
            diffMonths = (12 + currentMonth - birthMonth) % 12;
            diffDays = currentDay - birthDay;
        }
    }

    // Ajustar la diferencia de días si es negativa
    if (diffDays < 0) {
        let daysInLastMonth = new Date(currentYear, currentMonth - 1, 0).getDate();
        diffMonths--; // Restar un mes porque hemos sumado un mes al ajustar los días
        diffDays = daysInLastMonth + diffDays;
    }

    calculatedDay.innerText = diffDays;
    calculatedMonth.innerText = diffMonths;
    calculatedYear.innerText = diffYears;

    limpiarCampos();
    validarCampos();

})


function limpiarCampos(){
    smallErrorDay.innerText = '';
    smallErrorMonth.innerText = '';
    smallErrorYear.innerText = '';

    errorLabelAll.forEach(label => {
        label.classList.remove('error-lbl');

    })

    errorInputAll.forEach(input => {
        input.classList.remove('error');
    })
}

function limpiarSmalls(){
    calculatedDay.innerText = ' - - ';
    calculatedMonth.innerText = ' - - ';
    calculatedYear.innerText = ' - - ';
}

function validarCampos(){
    // Esta es la primera versión, usar switch para refactorizar las condicionales. 
    if(inputDay.value.length === 0 && inputMonth.value.length === 0 && inputYear.value.length === 0){


        errorLabelAll.forEach(label => {
            label.classList.add('error-lbl');

        })

        errorInputAll.forEach(input => {
            input.classList.add('error');
        })


        smallErrorDay.innerText = 'Este campo es requerido';
        smallErrorMonth.innerText = 'Este campo es requerido';
        smallErrorYear.innerText = 'Este campo es requerido';
        limpiarSmalls();



    } else{

        if(inputDay.value.length === 0){
            errorLabelAll[0].classList.add('error-lbl');
            errorInputAll[0].classList.add('error');
            smallErrorDay.innerText = 'Este campo es requerido';
            limpiarSmalls();
        }
    
        if(inputMonth.value.length === 0){
            errorLabelAll[1].classList.add('error-lbl');
            errorInputAll[1].classList.add('error');
            smallErrorMonth.innerText = 'Este campo es requerido';
            limpiarSmalls();
        }
    
        if(inputYear.value.length === 0){
            errorLabelAll[2].classList.add('error-lbl');
            errorInputAll[2].classList.add('error');
            smallErrorYear.innerText = 'Este campo es requerido';
            limpiarSmalls();
        }
    
    
    
        if(inputDay.value.length > 0){
            if(Number(inputDay.value) <= 0 || Number(inputDay.value) > 31 ){
                errorLabelAll[0].classList.add('error-lbl');
                errorInputAll[0].classList.add('error');
                smallErrorDay.innerText = 'Debe ser un día válido';
                limpiarSmalls();

            }
    
            if(Number(inputMonth.value) === 4 || Number(inputMonth.value) === 6 || Number(inputMonth.value) === 9 || Number(inputMonth.value) === 11){
                if(Number(inputDay.value) > 30){
                    errorLabelAll[0].classList.add('error-lbl');
                    errorInputAll[0].classList.add('error');
                    smallErrorDay.innerText = 'Debe ser fecha válida';
                    limpiarSmalls();

                }
    
            }
    
            else if(Number(inputMonth.value) === 2){
                if(Number(inputDay.value) > 28){
                    errorLabelAll[0].classList.add('error-lbl');
                    errorInputAll[0].classList.add('error');
                    smallErrorDay.innerText = 'Debe ser fecha válida';
                    limpiarSmalls();

                }
            }
    
    
        }
    
        if(inputMonth.value.length > 0){
            if(Number(inputMonth.value) <= 0 || Number(inputMonth.value) > 12){
                errorLabelAll[1].classList.add('error-lbl');
                errorInputAll[1].classList.add('error');
                smallErrorMonth.innerText = 'Debe ser un mes válido';
                limpiarSmalls();

            }
        }
    
        if(inputYear.value.length > 0){
    
            let currentYear = new Date().getFullYear();
    
            if(Number(inputYear.value) > currentYear){
                errorLabelAll[2].classList.add('error-lbl');
                errorInputAll[2].classList.add('error');
                smallErrorYear.innerText = 'Debe estar en el pasado';
                limpiarSmalls();

            }
    
            if(Number(inputYear.value) < 1900){
                errorLabelAll[2].classList.add('error-lbl');
                errorInputAll[2].classList.add('error');
                smallErrorYear.innerText = 'Debe ser un año válido';
                limpiarSmalls();
                                                                        
            }
        }
    }
}

function validarInput(event) {
    const input = event.target;
  
    if(input.getAttribute('id') === 'year'){
      input.value = input.value.slice(0, 4);
    }
    else{
      input.value = input.value.slice(0, 2);
      input.value = input.value.replace(/e/gi, '');
    }
}


