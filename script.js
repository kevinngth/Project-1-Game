console.log("I'm running!");

let dayCount = 0;

let money = 1000;

const checkBankruptcy = () => {
    if (money < 0) {alert("YOU WENT BANKRUPT!")};
};

const collectRent = () => {
    if (dayCount%7 === 0) {money -= 200; document.querySelector('#money').innerHTML = money;};
};

nextDay = () => {
    dayCount++;
    document.querySelector('#dayCount').innerHTML = dayCount;
    collectRent();
    checkBankruptcy();
};

document.querySelector('#next').addEventListener('click', nextDay);