//function changeBackground(){
//    document.querySelector('.contentBox').style.backgroundColor = 'purple;'
//}

var randomColor = Math.floor(Math.random()*16777215).toString(16);
document.getElementById("mainButton").style.backgroundColor = '#' + randomColor;