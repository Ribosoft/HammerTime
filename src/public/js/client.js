window.onload = function() {
    var button1 = document.getElementById("submit1");
    button1.addEventListener("click",nextStep,false);
};

function nextStep() {
    var div_step1 = document.getElementById("step1");
    var div_step2 = document.getElementById("step2");
    div_step1.className+= " hidden";
    div_step2.className= "step";
}   