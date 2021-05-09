'use strict';

const allIncomes = document.querySelectorAll('.income');
const allExpend = document.querySelectorAll('.expenditure');
const btn = document.querySelector('.submit');
const incomeBox = document.querySelector('.left');
const expendBox = document.querySelector('.right');
const outcomeTxt = document.querySelector('.text');
const sumTxt = document.querySelector('.sum');
const procBox = document.querySelectorAll('.content-box');

let sum = 0;
const weekMoney = [];
const weekExpend = [];

const outcome = function () {
  let starSystem = '';
  if (sum < 0) {
    if (sum < 0 && sum >= -5) {
      starSystem = '✦✧✧';
    } else if (sum < -5 && sum >= -20) {
      starSystem = '✦✦✧';
    } else if (sum < -20) {
      starSystem = '✦✦✦';
    }
    outcomeTxt.textContent = `YOU'RE LOSING MONEY ${starSystem}`;
    sumTxt.textContent = sum.toFixed(2) + ' €';
    sumTxt.classList.remove('green');
    sumTxt.classList.add('red');
  } else if (sum > 0) {
    let starSystem = '';
    if (sum > 0 && sum <= 5) {
      starSystem = '✦✧✧';
    } else if (sum > 5 && sum <= 20) {
      starSystem = '✦✦✧';
    } else if (sum > 20) {
      starSystem = '✦✦✦';
    }
    outcomeTxt.textContent = `KEEP UP THE GOOD WORK ${starSystem}`;
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

const weekChange = function () {
  const proc = [];
  weekMoney.forEach((incom, i) => {
    if (incom === 0) {
      incom = 1;
    }
    if (weekExpend[i] === 0) {
      weekExpend[i] = 1;
    }
    proc[i] = ((incom * 100) / weekExpend[i]).toFixed(2);
  });
  procBox.forEach((el, i) => {
    el.innerHTML = '';
    if (proc[i] < 100) {
      proc[i] = 100 - proc[i];
      el.insertAdjacentHTML(
        'beforeend',
        `<span class="material-icons up"> arrow_downward </span>
         <h3 class="procents red">${proc[i]}%</h3>`
      );
    } else {
      el.insertAdjacentHTML(
        'beforeend',
        `<span class="material-icons up"> arrow_upward </span>
         <h3 class="procents green">${proc[i]}%</h3>`
      );
    }
  });
};

const calc = function () {
  allIncomes.forEach((incom, i) => {
    if (Number(incom.value) < 0) return;
    weekMoney[i] = Number(incom.value);
    incom.value = '';
  });
  allExpend.forEach((expend, i) => {
    if (Number(expend.value) < 0) return;
    weekExpend[i] = Number(expend.value);
    expend.value = '';
  });
  sum = weekMoney.reduce((acc = 0, el) => acc + el);
  sum -= weekExpend.reduce((acc = 0, el) => acc + el);
  outcome();
  weekChange();
};

btn.addEventListener('click', calc);
