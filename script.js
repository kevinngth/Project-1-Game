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

class Item {
    constructor(name, buyingPrice, imgURL) {
        this._name = name;
        this._buyingPrice = buyingPrice;
        this._availability = true;
        this._sellingPrice = 0;
        this._boughtDate = 0;
        this._imgURL = imgURL;
    }
    get name() {
        return this._name;
    }
    get buyingPrice() {
        return this._buyingPrice;
    }
    get availability() {
        return this._availability;
    }
    get sellingPrice() {
        return this._sellingPrice;
    }
    get boughtDate() {
        return this._boughtDate;
    }
    get imgURL() {
        return this._imgURL
    }
    set sellingPrice(price) {
        this._sellingPrice = price;
    }
    set boughtDate(day) {
        this._boughtDate = day;
    }
    toggleAvailability() {
        this._availability = !this._availability;
    }
};

const goose = new Item('goose', 600, 'img/goose.jpg');
const gun = new Item('gun', 800, 'img/gun.jpg');
const mountain = new Item('mountain', 2000, 'img/mountain.jpg');
const ayogado = new Item('ayogado', 200, 'img/ayogado.jpg');
const hazelnut = new Item('hazelnut', 100, 'img/hazelnut.jpg');
const tap = new Item('tap', 500, 'img/tap.jpg');
const trap = new Item('trap', 900, 'img/trap.png');
const goggles = new Item('goggles', 300, 'img/goggles.jpg');

const generateItem = () => {
    document.querySelector('#buy1').style.visibility = "visible";
    document.querySelector('#item1name').innerHTML = ayogado.name;
    document.querySelector('#item1img').src = ayogado.imgURL;
    document.querySelector('#item1price').innerHTML = ayogado._buyingPrice;
}