console.log("I'm running!");

// // // // // // // // // status panel mechanics // // // // // // // //

let dayCount = 0;

let money = 2000;

let hiScore = 0

const changeMoney = (amount) => {
    money += amount;
    document.querySelector('#money').innerHTML = money;
    if (money > hiScore) {
        hiScore = money;
        document.querySelector('#hiScore').innerHTML = hiScore;
    }
    checkBankruptcy();
}

const checkBankruptcy = () => {
    if (money < 0) {
        if (confirm("YOU WENT BANKRUPT! RESTART?")) {
            dayCount = 0;
// reset money
            money = 0;
            changeMoney(1000);
// reset items
            for (let i=0; i<itemsArray.length; i++) {
                itemsArray[i].inPlay = false;
            };
// reset market & shop
            for (let i=1; i<=3; i++) {
                document.querySelector(`#s${i}`).style.visibility = 'hidden';
                generateItem(i, itemSelector());
            };
// reset inventory
            for (let i=1; i<=8; i++) {
                document.querySelector(`#i${i}`).style.display = 'none';
            };
        } else {
            console.log('Going to crash your browser in 3...2...1...');
        };
    };
};

const collectRent = () => {
    if (dayCount%7 === 0) {changeMoney(-200); createToast('Deducted 200$ to pay rent!')};
};

const checkShop = () => {
    for (let i=1; i<=3; i++) {
        if (document.querySelector(`#s${i}`).style.visibility !== 'hidden') {
// grab the object
            let object = eval(document.querySelector(`#s${i}Name`).innerHTML);
// check for sale
            if (object.saleCD === 0) {
// add to money
                changeMoney(object.sellingPrice);
// remove from shop
                document.querySelector(`#s${i}`).style.visibility = 'hidden';
// put object back to available
                object.toggleInPlay();
// toast
                createToast(`Managed to sell ${object.name} for ${object.sellingPrice}`)
            } else {
// count down to sale
                if (Math.random()*object.sellingPrice/object.buyingPrice < 1) {
                object.saleCD -= 1;
                }
            };
        };
    };
};

const topUpMarket = () => {
    for (let i=1; i<=3; i++) {
        if (document.querySelector(`#b${i}`).style.visibility === 'hidden') {
            generateItem(i, itemSelector());
        };
    };
};

const nextDay = () => {
    dayCount++;
    document.querySelector('#dayCount').innerHTML = dayCount;
    checkShop();
    collectRent();
    checkBankruptcy();
    topUpMarket();
    if (dayCount > 7) {chanceEvent()};
};

document.querySelector('#next').addEventListener('click', nextDay);

// // // // // // // // item generation mechanics // // // // // // // //

class Item {
    constructor(name, buyingPrice, imgURL) {
        this._name = name;
        this._buyingPrice = buyingPrice;
        this._inPlay = false;
        this._sellingPrice = 0;
        this._imgURL = imgURL;
        this._saleCD = 0;
    }
    get name() {
        return this._name;
    }
    get buyingPrice() {
        return this._buyingPrice;
    }
    get inPlay() {
        return this._inPlay;
    }
    get sellingPrice() {
        return this._sellingPrice;
    }
    get imgURL() {
        return this._imgURL;
    }
    get saleCD() {
        return this._saleCD;
    }
    set inPlay(x) {
        this._inPlay = x;
    }
    set sellingPrice(price) {
        this._sellingPrice = price;
    }
    set saleCD(x) {
        this._saleCD = x;
    }
    toggleInPlay() {
        this._inPlay = !this._inPlay;
    }
};

const itemsArray = [];

const goose = new Item('goose', 600, 'img/goose.jpg');
const gun = new Item('gun', 800, 'img/gun.jpg');
const mountain = new Item('mountain', 2000, 'img/mountain.jpg');
const ayogado = new Item('ayogado', 200, 'img/ayogado.jpg');
const hazelnut = new Item('hazelnut', 100, 'img/hazelnut.jpg');
const tap = new Item('tap', 500, 'img/tap.jpg');
const trap = new Item('trap', 900, 'img/trap.png');
const goggles = new Item('goggles', 300, 'img/goggles.jpg');
const snap = new Item('snap', 700, 'img/snap.png');
const headphones = new Item('headphones', 1100, 'img/headphones.png');
const sardines = new Item('sardines', 400, 'img/sardines.jpg');
const tooth = new Item('tooth', 1200, 'img/tooth.jpg');

itemsArray.push(goose, gun, mountain, ayogado, hazelnut, tap, trap, goggles, snap, headphones, sardines, tooth);

const itemSelector = () => {
    let object;
    while (object === undefined) {
        let randomNum = Math.floor(Math.random()*itemsArray.length);
        if (!(itemsArray[randomNum].inPlay)) {
            object = itemsArray[randomNum];
        };
    };
    return object;
};

const generateItem = (position, object) => {
    document.querySelector(`#b${position}`).style.visibility = "visible";
    document.querySelector(`#b${position}Name`).innerHTML = object.name;
    document.querySelector(`#b${position}Img`).src = object.imgURL;
    document.querySelector(`#b${position}Price`).innerHTML = object.buyingPrice;
    document.querySelector(`#b${position}Btn`).value = object.buyingPrice;
    object.toggleInPlay();
};

// // // // // // // // item buying & inventory mechanics // // // // // // // //

const makePurchase = () => {
// grab hold of the object
    let object = eval(event.target.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.innerHTML);
    if (object.buyingPrice > money) {
        alert(`You don't have enough money!`);
    } else {
        let i = 1;
        while (document.querySelector(`#i${i}`).style.display !== 'none') {i++;};
        if (i > 5) {
            alert('inventory cannot hold more than 5 items');
        } else {
// hide bought card
            event.target.parentElement.parentElement.parentElement.style.visibility = 'hidden';
// show inventory card
            document.querySelector(`#i${i}`).style.display = 'flex';
// deduct the money used
            changeMoney(-object.buyingPrice);
// put item into inventory
            document.querySelector(`#i${i}Name`).innerHTML = object.name;
            document.querySelector(`#i${i}Date`).innerHTML = dayCount;
            document.querySelector(`#i${i}BP`).innerHTML = object.buyingPrice;
        };
    };
};

const backToInventory = () => {
    event.target.parentElement.parentElement.parentElement.style.visibility = 'hidden';
    let object = eval(event.target.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.innerHTML);
    let i = 1;
    while (document.querySelector(`#i${i}`).style.display !== 'none') {i++;};
    document.querySelector(`#i${i}`).style.display = 'flex';
    document.querySelector(`#i${i}Name`).innerHTML = object.name;
    document.querySelector(`#i${i}BP`).innerHTML = object.buyingPrice;
};
// // // // // // // // item selling & inventory mechanics // // // // // // // //
const checkSelling = () => {
// get object
    let object = eval(event.target.parentElement.parentElement.parentElement.firstElementChild.innerHTML);
// get inventorylist number
    let x = parseInt(event.target.id[1]);
// check whether the shop is full
    if (document.querySelector('#s1').style.visibility === 'hidden') {
        sellItem(x, 1, object);
    } else if (document.querySelector('#s2').style.visibility === 'hidden') {
        sellItem(x, 2, object);
    } else if (document.querySelector('#s3').style.visibility === 'hidden') {
        sellItem(x, 3, object);
    } else {
        alert(`You can't sell more than 3 items at a time!`);
    };
}

const sellItem = (x,y,object) => {
    if (document.querySelector(`#i${x}SP`).value !== '') {
// hide inventory card
        document.querySelector(`#i${x}`).style.display = 'none';
// get input value
        object.sellingPrice = parseInt(document.querySelector(`#i${x}SP`).value);
// reset field
        document.querySelector(`#i${x}SP`).value = '';
// show selling card
        document.querySelector(`#s${y}Name`).innerHTML = object.name;
        document.querySelector(`#s${y}Img`).src = object.imgURL;
        document.querySelector(`#s${y}Price`).innerHTML = object.sellingPrice;
        document.querySelector(`#s${y}`).style.visibility = 'visible';
        object.saleCD = Math.ceil(Math.random()*7);
    };
};
// // // // // // // // updates panel mechanics // // // // // // // //

let toastCount = 0;

function createToast(message) {
    let toast = document.createElement('div');
    let toastBody = document.createElement('div');
    toastBody.class = 'toast-body';
    toastBody.innerHTML = message;
    toast.append(toastBody);
    toast.id = `${toastCount}`
    toast.setAttribute('class', 'toast');
    toast.setAttribute('role', 'alert');
    toast.setAttribute('data-delay', '8000');
    document.querySelector('#gameLog').append(toast);
    $(`#${toastCount}`).toast('show');
    toastCount++;
};

// // // // // // // // chance // // // // // // // //

chanceCards = [
];

class Chance {
    constructor(words, effect) {
        this._effect = effect;
        this._message = words + Math.abs(effect) + `$`;
    }
    get message() {
        return this._message;
    }
    get effect() {
        return this._effect;
    }
};

const moneyFall = new Chance(`Money fell from the sky! Collect `, 300);
chanceCards.push(moneyFall);
const hospital = new Chance(`Your pet iguana was admitted to the hospital. Pay `, -200);
chanceCards.push(hospital);
const shopDown = new Chance(`Shop was destroyed in a meteor shower! For repairs pay `, -400);
chanceCards.push(shopDown);
const elephant = new Chance(`The town elephant got injured. Contribute `, -100);
chanceCards.push(elephant);
const phoneDrop = new Chance(`Dropped your new iPhone! Buy another one for `, -800);
chanceCards.push(phoneDrop);
const mayor = new Chance(`Town mayor decides to award you 'Best Pedestrian'. Receive `, 600);
chanceCards.push(mayor);

const chanceEvent = () => {
    if (Math.random() < .3) {
        let selectedCard = chanceCards[Math.floor(Math.random()*chanceCards.length)];
// toast
        createToast(selectedCard.message);
// change money
        changeMoney(selectedCard.effect);
    };
};

// // // // // // // // others // // // // // // // //

for (let i=1; i<=3; i++) {
    generateItem(i, itemSelector());
    document.querySelector(`#b${i}Btn`).addEventListener('click', makePurchase);
    document.querySelector(`#s${i}Btn`).addEventListener('click', backToInventory);
};

for (let i=1; i<=8; i++) {
    document.querySelector(`#i${i}Btn`).addEventListener('click', checkSelling);
}

$(function(){
    $('#help').modal();
})