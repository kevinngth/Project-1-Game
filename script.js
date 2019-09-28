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

nextDay = () => {
    dayCount++;
    document.querySelector('#dayCount').innerHTML = dayCount;
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
        return this._imgURL
    }
    set sellingPrice(price) {
        this._sellingPrice = price;
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
console.log(itemsArray);

const generateItem = () => {
    document.querySelector('#buy1').style.visibility = "visible";
    document.querySelector('#item1name').innerHTML = ayogado.name;
    document.querySelector('#item1img').src = ayogado.imgURL;
    document.querySelector('#item1price').innerHTML = ayogado.buyingPrice;
    document.querySelector('#item1buy').value = ayogado.buyingPrice;
    ayogado.toggleInPlay();
}

// // // // // // // // item buying mechanics // // // // // // // //

const makePurchase = () => {
// hide the card
    event.target.parentElement.parentElement.parentElement.style.visibility = 'hidden';
// make inventory card visible
    document.querySelector('#inventory1Visibility').style.visibility = 'visible';
// grab hold of the object
    let object = eval(event.target.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.innerHTML);
// deduct the money used
    console.log(object.buyingPrice)
    changeMoney(-object.buyingPrice);
// put item into inventory
    document.querySelector('#inventory1').innerHTML = object.name;
    document.querySelector('#dateBought1').innerHTML = dayCount;
    document.querySelector('#buyingPrice1').innerHTML = object.buyingPrice;
    console.log('HI!');
}

document.querySelector('#item1buy').addEventListener('click', makePurchase);

generateItem();