'use strict';

const allIncomes = document.querySelectorAll('.income');
const allExpend = document.querySelectorAll('.expenditure');
const btn = document.querySelector('.submit');
const incomeBox = document.querySelector('.left');
const expendBox = document.querySelector('.right');
const outcomeTxt = document.querySelector('.text');
const sumTxt = document.querySelector('.sum');

let sum = 0;

const outcome = function () {
  if (sum < 0) {
    outcomeTxt.textContent = "YOU'RE LOSING MONEY 💥💥💥";
    sumTxt.textContent = sum.toFixed(2) + ' €';
    sumTxt.classList.remove('green');
    sumTxt.classList.add('red');
  } else if (sum > 0) {
    outcomeTxt.textContent = 'KEEP UP THE GOOD WORK 🚀🚀🚀';
    sumTxt.textContent = '+' + sum.toFixed(2) + ' €';
    sumTxt.classList.remove('red');
    sumTxt.classList.add('green');
  } else {
    outcomeTxt.textContent = 'CALCULATED? 🤷‍♂️🤷‍♂️🤷‍♂️';
    sumTxt.textContent = sum.toFixed(2) + ' €';
    sumTxt.classList.remove('red');
    sumTxt.classList.remove('green');
  }
  sum = 0;
};

const calc = function () {
  allIncomes.forEach(incom => {
    if (Number(incom.value) < 0) return;
    sum += Number(incom.value);
    incom.value = '';
  });
  allExpend.forEach(expend => {
    if (Number(expend.value) < 0) return;
    sum -= Number(expend.value);
    expend.value = '';
  });
  outcome();
};

btn.addEventListener('click', calc);
