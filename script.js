console.log("I'm running!");

// // // // // // // // // status panel mechanics // // // // // // // //

let dayCount = 0;

let money = 1000;

const changeMoney = (amount) => {
    money += amount;
    document.querySelector('#money').innerHTML = money;
}

const checkBankruptcy = () => {
    if (money < 0) {alert("YOU WENT BANKRUPT!")};
};

const collectRent = () => {
    if (dayCount%7 === 0) {changeMoney(-200)};
};

const checkShop = () => {
    for (let i=1; i<=3; i++) {
        if (document.querySelector(`#s${i}`).style.visibility !== 'hidden') {
// grab the object
            let object = eval(document.querySelector(`#s${1}Name`).innerHTML);
// check for sale
            if (object.saleCD === 0) {
// add to money
                changeMoney(object.sellingPrice);
// remove from shop
                document.querySelector(`#s${i}`).style.visibility = 'hidden';
            } else {
// count down to sale
                object.saleCD -= 1;
            };
        };
    };
};

nextDay = () => {
    dayCount++;
    document.querySelector('#dayCount').innerHTML = dayCount;
    checkShop();
    collectRent();
    checkBankruptcy();
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
        this._saleCD = Math.ceil(Math.random()*3);
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

itemsArray.push(goose, gun, mountain, ayogado, hazelnut, tap, trap, goggles);

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
// hide bought card
    event.target.parentElement.parentElement.parentElement.style.visibility = 'hidden';
// show inventory card
    document.querySelector('#i1').style.display = 'flex';
// grab hold of the object
    let object = eval(event.target.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.innerHTML);
// deduct the money used
    changeMoney(-object.buyingPrice);
// put item into inventory
    document.querySelector('#i1Name').innerHTML = object.name;
    document.querySelector('#i1Date').innerHTML = dayCount;
    document.querySelector('#i1BP').innerHTML = object.buyingPrice;
};

document.querySelector('#b1Btn').addEventListener('click', makePurchase);

// // // // // // // // item selling & inventory mechanics // // // // // // // //

const sellItem = () => {
// hide inventory card
    document.querySelector('#i1').style.display = 'none';
// get object
    let object = eval(event.target.parentElement.parentElement.parentElement.firstElementChild.innerHTML);
// get input value
    object.sellingPrice = parseInt(document.querySelector('#i1SP').value);
// reset field
    document.querySelector('#i1SP').value = '';
// show selling card
    document.querySelector('#s1Name').innerHTML = object.name;
    document.querySelector('#s1Img').src = object.imgURL;
    document.querySelector('#s1Price').innerHTML = object.sellingPrice;
    document.querySelector('#s1').style.visibility = 'visible';
};

document.querySelector('#i1Btn').addEventListener('click', sellItem);

// // // // // // // // others // // // // // // // //
for (let i=1; i<=3; i++) {
    generateItem(i, itemSelector());
}