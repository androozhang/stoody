var app = {
  settings: {
    container: $('.calendar'),
    calendar: $('.front'),
    days: $('.weeks span'),
    form: $('.back'),
    input: $('.back input'),
    buttons: $('.back button')
  },

  init: function() {
    instance = this;
    settings = this.settings;
    this.bindUIActions();
    this.makeDraggable();
  },

  swap: function(currentSide, desiredSide) {
    settings.container.toggleClass('flip');
    currentSide.fadeOut(900);
    currentSide.hide();
    desiredSide.show();
  },

  bindUIActions: function() {
    settings.days.on('click', function() {
      instance.swap(settings.calendar, settings.form);
      settings.input.focus();
    });

    settings.buttons.on('click', function() {
      instance.swap(settings.form, settings.calendar);
    });
  },

  // makeDraggable: function(calendar) {
  //   var calendar = document.getElementById("calendar");
  //   var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  
  //   calendar.onmousedown = dragMouseDown;
  
  //   function dragMouseDown(e) {
  //     e = e || window.event;
  //     e.preventDefault();
  //     // get the mouse cursor position at startup
  //     pos3 = e.clientX;
  //     pos4 = e.clientY;
  //     document.onmouseup = closeDragElement;
  //     // call a function whenever the cursor moves
  //     document.onmousemove = elementDrag;
  //   }
  
  //   function elementDrag(e) {
  //     e = e || window.event;
  //     e.preventDefault();
  //     // calculate the new cursor position
  //     pos1 = pos3 - e.clientX;
  //     pos2 = pos4 - e.clientY;
  //     pos3 = e.clientX;
  //     pos4 = e.clientY;
  //     // set the element's new position
  //     calendar.style.top = (calendar.offsetTop - pos2) + "px";
  //     calendar.style.left = (calendar.offsetLeft - pos1) + "px";
  //   }
  
  //   function closeDragElement() {
  //     // stop moving when mouse button is released
  //     document.onmouseup = null;
  //     document.onmousemove = null;
  //   }
  // }
  

app.init();

function toggleCalendar() {
  var calendar = document.getElementById("calendar");
  if (calendar.style.display === "none") {
    calendar.style.display = "block";
  } else {
    calendar.style.display = "none";
  }
}

// Hide the calendar initially
document.getElementById("calendar").style.display = "none";

// Add button click event listener
var button = document.getElementById("calendar-button");
button.addEventListener("click", toggleCalendar);
