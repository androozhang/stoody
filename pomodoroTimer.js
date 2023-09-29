


//hides timer when loading website
document.getElementById("mydiv").style.display = "none";

function timerAppear() {
  var x = document.getElementById("mydiv");
  var listBtn = document.querySelector(".fa-clock");

  if (x.style.display === "none") {
    x.style.display = "block";
    listBtn.style.color = "#bae8e8"; // Change color to #bae8e8 when mydiv2 is visible
  } else {
    x.style.display = "none";
    listBtn.style.color = "#333333"; // Change color back to #333333 when mydiv2 is hidden
  }
}

  //timer
  pomodoroButton = document.getElementById('pomodoro')
  startbutton = document.getElementById('startbtn');
  resetbutton = document.getElementById('resetbtn')
  upbutton = document.getElementById('upbtn')
  downbutton = document.getElementById('downbtn')
  min = document.getElementById('min');
  sec = document.getElementById('sec');
  var dingdong = new Audio('downloadedAudio/dingdong.mp3');
  
  let minutes = 25;
  let seconds = 0;
  let breakMinutes = 5;
  let breakSeconds = 0;
  min.innerHTML = minutes;
  sec.innerHTML = '00';
  let totalSeconds = (minutes*60) + seconds;
  let backUpSeconds = totalSeconds;
  let secondsInterval = -1;
  let incrementMin = 1;
  let pomo =false;

  pomodoroButton.addEventListener('click',function(event){
  pomodoro();
  })


  upbutton.addEventListener('click', function(event){
  incrementUp();
  })

  downbutton.addEventListener('click', function(event){
    incrementDown();
    })

  startbutton.addEventListener('click', function(event){
    updateTimer(totalSeconds);
    if (totalSeconds <= 0){
      clearInterval(secondsInterval)
    minutes = backUpSeconds/60;
    seconds = 0;
    totalSeconds = (60*minutes) + seconds
    min.innerHTML = Math.floor(minutes);
    sec.innerHTML = '0' + seconds;
    startbutton.innerHTML ="<i class='fas fa-play fa-2x'></i>";
    }

    else{
    if (secondsInterval == -1){
      
      startbutton.innerHTML = "<i class='fa fa-pause fa-2x'></i>";
      secondsInterval = setInterval(function(){
        totalSeconds--;
        minutes = (totalSeconds / 60);
        seconds = totalSeconds % 60;
        if (Math.floor(minutes) < 10){
          min.innerHTML = '0' + Math.floor(minutes);
        }
        else{
          min.innerHTML = Math.floor(minutes);
        }
        if (seconds < 10){
          sec.innerHTML = '0' + Math.floor(seconds);
        }
        else{
          sec.innerHTML = Math.floor(seconds);
        }
        if (totalSeconds <= 0){
          stopTimer()
          dingdong.play();
        }
      },1000);
    }
    else {
      stopTimer();
    }
  }
  });

  resetbutton.addEventListener('click', function(event){
    clearInterval(secondsInterval)
    minutes = backUpSeconds/60;
    seconds = 0;
    totalSeconds = (60*minutes) + seconds
    min.innerHTML = Math.floor(minutes);
    sec.innerHTML = '0' + seconds;

    startbutton.innerHTML ="<i class='fas fa-play fa-2x'></i>";
  })

  function updateTimer(totalSeconds){ 
    minutes = totalSeconds / 60;
    seconds = totalSeconds % 60;
    if (Math.floor(minutes) < 10){
      min.innerHTML = '0' + Math.floor(minutes);
    }
    else{
      min.innerHTML = Math.floor(minutes);
    }
    if (seconds < 10){
      sec.innerHTML = '0' + (seconds);
    }
    else{
      sec.innerHTML = (seconds);
  }

}

  function stopTimer(){
    clearInterval(secondsInterval);
    secondsInterval= -1;
    startbutton.innerHTML ="<i class='fas fa-play fa-2x'></i>";
  }

  function incrementUp(){
    if (totalSeconds <= (3600 - (incrementMin*60))){
    totalSeconds = totalSeconds + (incrementMin*60);
    }
    else{
      totalSeconds = 3600; 
    }

    updateTimer(totalSeconds);
  }

  function incrementDown(){
    if (totalSeconds >= (incrementMin*60)){
    totalSeconds = totalSeconds - (incrementMin*60);
    }
    else{
      totalSeconds =  0;
      stopTimer()
      dingdong.play();
    }
    
    updateTimer(totalSeconds);
  }

   function pomodoro(){
    if (pomo == false){
      stopTimer();
      minutes = breakMinutes;
      seconds = breakSeconds;
      totalSeconds = (60*minutes) + seconds
      updateTimer(totalSeconds);
      pomodoroButton.innerHTML = "Break";
      pomo = true;
    }
    else{
      stopTimer();
      minutes = backUpSeconds/60;
      seconds = 0;
      totalSeconds = (60*minutes) + seconds;
      updateTimer(totalSeconds);
      pomodoroButton.innerHTML = "Pomodoro";
      pomo = false;
    }
  }








/*
//timer
var timeLeft = 1500
const minutes = Math.floor((timeLeft % 3600) / 60);
const seconds = '0' + (timeLeft % 60);
let timeLeftInterval;
let pause = false; 

function template(){
  document.getElementById('minutes').innerHTML = minutes;
  document.getElementById('seconds').innerHTML = seconds;
}

function formatTime(timeLeft) {
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;
  template();
}

/
btnStart.addEventListener('click', () => {
  const hours = (hoursEl.value);
  const minutes = (minutesEl.value);
  const seconds = (secondsEl.value);
  startTimer()
});

function startTimer(){
  timeLeftInterval = setInterval(() => {

    if (pause) return;
    timeLeft--;
    formatTime();

    if (timeLeft <= 0) {
        stopTimer();
    }
}, 1000)
}

function stopTimer(){
  timeLeftInterval = clearInterval(timeLeftInterval)
}
*/