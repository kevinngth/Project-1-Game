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
// grab hold of the object
    let object = eval(event.target.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.innerHTML);
    if (object.buyingPrice > money) {
        alert(`You don't have enough money!`);
    } else {
        let i = 1;
        while (document.querySelector(`#i${i}`).style.display !== 'none') {i++;};
        if (i > 8) {
            alert('inventory cannot hold more than 8 items');
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

// // // // // // // // item selling & inventory mechanics // // // // // // // //
const checkSelling = () => {
// get object
    let object = eval(event.target.parentElement.parentElement.parentElement.firstElementChild.innerHTML);
// get inventorylist number
    let x =parseInt(event.target.id[1]);
// check whether the shop is full
    let i;
    if (document.querySelector('#s1').style.visibility === 'hidden') {
        sellItem(x, 1, object);
    } else if (document.querySelector('#s2').style.visibility === 'hidden') {
        sellItem(x, 2, object);
    } else if (document.querySelector('#s2').style.visibility === 'hidden') {
        sellItem(x, 3, object);
    } else {
        alert(`You can't sell more than 3 items at a time!`);
    };
}

const sellItem = (x,y,object) => {
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
};

// // // // // // // // others // // // // // // // //

for (let i=1; i<=3; i++) {
    generateItem(i, itemSelector());
    document.querySelector(`#b${i}Btn`).addEventListener('click', makePurchase);
    document.querySelector(`#i${i}Btn`).addEventListener('click', checkSelling);
};