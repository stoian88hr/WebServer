'use strict';
var resultMsg = "";

function setResult() {
    document.getElementById("result").value = resultMsg;
}

function BMIcalc() {
    let w_txt = document.getElementById('weight');
    let h_txt = document.getElementById('height');
    var w = parseInt(w_txt.value);
    var h = parseInt(h_txt.value);
    let errMsg = [];
    if (w <= 0) {
        errMsg = errMsg + "* Weight cannot be negative \n";
    }
    if (h <= 0) {
        errMsg = errMsg + "* Height cannot be negative \n";
    }
    if (errMsg != "") {
        alert(errMsg);
    } else {
        var bmi = ((w) / (h * h)) * 10000;
        if (bmi < 18.5) {
            resultMsg = 'Your BMI is ' + bmi.toFixed(2) + ' You are underweight. You should see your doctor.';
        } else if (bmi >= 18.5 && bmi.toFixed(2) <= 25) {
            resultMsg = 'Your BMI is ' + bmi.toFixed(2) + ' You are in the correct weight range.';
        } else {
            resultMsg = 'Your BMI is ' + bmi.toFixed(2) + ' You are overweight. You should see your doctor.';
        }
        alert(resultMsg);
    }
    setResult();
}