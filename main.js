const alarm = new Audio;
const playTimerButton = document.getElementById('playTimer');
const pauseTimerButton = document.getElementById('pauseTimer');
const reLoadButton = document.getElementById('reLoadTimer')
const clockCtn = document.getElementById('clockCtn');
const workCounterCtn = document.getElementById('workCounterCtn')
const breakCounterCtn = document.getElementById('breakCounterCtn')
const ciclesCounterCtn = document.getElementById('ciclesCounterCtn')
const workStage = document.getElementById('workStage')
const breakStage = document.getElementById('breakStage')
const longBreakStage = document.getElementById('longBreakStage')
const timeWorkedCtn = document.getElementById('timeWorkedCtn')
const goalTimeCtn = document.getElementById('goalTimeCtn')
const goalTimeInput = document.getElementById('goalTimeInput')
const sendGoalTime = document.getElementById('sendGoalTime')
let hoursMeter = 0;
let workCounter = 0;
let breakCounter = 0;
let ciclesCounter = 0;
let second = 00;
let minute = 25;
let mode = 0;
let goalTime =goalTimeInput.value;
/*Nose porque no escribe esto arreglar bug*/
sendGoalTime.addEventListener('click',printGoalTime)
function printGoalTime() {
    goalTimeCtn.innerHTML=goalTime;
}
playTimerButton.addEventListener('click',playTimer);
function playTimer() {
    playTimerButton.disabled=true;
    const interval=setInterval(clock,1000);
    pauseTimerButton.addEventListener('click',pauseTimer);
    function pauseTimer(){
    playTimerButton.disabled=false;
    clearInterval(interval);
    }
    reLoadButton.addEventListener('click',reLoadTimer)
    function reLoadTimer() {
        playTimerButton.disabled=false;
        if (mode === 0 ) {
            minute=25;
            second=00;
            clockCtn.innerHTML=`${minute}: ${second}`;
            pauseTimer()
        }else if (mode === 1){
            minute=5;
            second=00;
            clockCtn.innerHTML=`${minute}: ${second}`;
            pauseTimer()
        }else if(mode === 3){
            minute=30;
            second=00;
            clockCtn.innerHTML=`${minute}: ${second}`;
            pauseTimer()
        }
    }
    function clock() {
        second=second-1;
        clockCtn.innerHTML=`${minute}: ${second}`;
        if (second < 0) {
            minute--;
            second=59;
            
        }
        else if (second === 0 && minute === 0){
            alarm.play();
            if (mode === 0) {
                if( workCounter < 3){
                    workCounter++
                    workCounterCtn.innerHTML=workCounter;
                    workStage.style.display='none';
                    breakStage.style.display='block';
                    mode=1
                    reLoadTimer()
                }else{
                    ciclesCounter++
                    timeWorkedCtn.innerHTML= ciclesCounter * 2;
                    longBreakStage.style.display='block';
                    workStage.style.display='none';
                    breakStage.style.display='none';
                    mode=3
                    reLoadTimer()
                }
            }else if (mode === 1){
                breakCounter++
                breakCounterCtn.innerHTML=breakCounter;
                workStage.style.display='block';
                breakStage.style.display='none';
                mode=0
                reLoadTimer()
            }else if (mode === 3){
                mode=0
                ciclesCounterCtn.innerHTML=ciclesCounter;
                breakStage.style.display='none';
                longBreakStage.style.display='none';
                workStage.style.display='block';
                workCounter = 0
                workCounterCtn.innerHTML=workCounter;
                breakCounter = 0
                breakCounterCtn.innerHTML=breakCounter;
                reLoadTimer()
            }
        }
    }
}


/* PUEDO HACER EL CODIGO MAS CORTO POR EJEMPLO OBJETOS EN LOS DISPLAY PARA NO PONERLOS VARIAS VECES */