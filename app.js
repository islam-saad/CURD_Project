"use strict";
//Get Total
//Create Product
//Save to local storage
//Clear inputs
//Read
//Count
//Delete
//Update
//Search
//Clean Data

// Variables
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const taxes = document.querySelector("#taxes");
const ads = document.querySelector("#ads");
const discount = document.querySelector("#discount");
const total = document.querySelector("#total");
const count = document.querySelector("#count");
const category = document.querySelector("#category");
const submit = document.querySelector("#submit");
const priceInputs = document.querySelectorAll(".price input");
const insertedItems = document.querySelector(".insertedItems");
let dataProduct;
let mode = "create";
let tmp;
//Get Total
function getTotal() {
    if (price.value !== "") {
        let result = +price.value + +taxes.value + +ads.value - +discount.value;
        total.textContent = result;
        total.style.backgroundColor = "#040";
    } else {
        total.style.backgroundColor = "#a00d02";
    }
}
priceInputs.forEach((input) => {
    input.addEventListener("keyup", getTotal);
});

//Create Product

if (localStorage.product != null) {
    dataProduct = JSON.parse(localStorage.product);
} else {
    dataProduct = [];
}

submit.addEventListener("click", function() {
    const newProduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.textContent,
        count: count.value,
        category: category.value.toLowerCase(),
    };
    if (
        title.value != "" &&
        price.value != "" &&
        category.value != "" &&
        newProduct.count < 100
    ) {
        if (mode === "create") {
            if (+count.value > 1) {
                for (let i = 0; i < +count.value; i++) {
                    dataProduct.push(newProduct);
                }
            } else {
                dataProduct.push(newProduct);
            }
            clearInput();
        } else {
            dataProduct[tmp] = newProduct;
            mode = "create";
            submit.innerHTML = "Create";
            count.style.display = "block";
        }
    }

    localStorage.setItem("product", JSON.stringify(dataProduct));
    console.log(newProduct, dataProduct);

    showData();
});

//Clear inputs
function clearInput() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.textContent = "";
    count.value = "";
    category.value = "";
    total.style.backgroundColor = "#a00d02";
}
//Read

function showData() {
    let dataItem = "";
    for (let i = 0; i < dataProduct.length; i++) {
        dataItem += `<tr>
    <td>${i + 1}</td>
    <td>${dataProduct[i].title}</td>
    <td>${dataProduct[i].price}</td>
    <td>${dataProduct[i].taxes}</td>
    <td>${dataProduct[i].ads}</td>
    <td>${dataProduct[i].discount}</td>
    <td>${dataProduct[i].total}</td>
    <td>${dataProduct[i].category}</td>
    <td><button onclick="updateData(${i})"  id="update">Update</button></td>
    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
</tr>`;

        insertedItems.innerHTML = dataItem;
    }
    const deleteAllBtn = document.querySelector("#deleteAll");

    if (dataProduct.length > 0) {
        deleteAllBtn.innerHTML = `<button onclick='deleteAll()'>Delete All (${dataProduct.length})</button>`;
    } else {
        insertedItems.innerHTML = "";
        deleteAllBtn.innerHTML = "";
    }
}
showData();

//Delete

function deleteData(i) {
    dataProduct.splice(i, 1);
    localStorage.product = JSON.stringify(dataProduct);
    showData();
}
//Delete all
function deleteAll() {
    localStorage.clear();
    dataProduct.splice(0);
    showData();
}

// Update Item
function updateData(i) {
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxes.value = dataProduct[i].taxes;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount;
    getTotal();
    category.value = dataProduct[i].category;
    count.style.display = "none";
    submit.innerHTML = "update";
    mode = "update";
    tmp = i;

    scroll({
        top: 0,
        behavior: "smooth",
    });
}

//Search
let searchMood = "title";

function getSearchMood(id) {
    let search = document.querySelector("#search");
    if (id == "searchTitle") {
        searchMood = "title";
    } else {
        searchMood = "category";
    }

    search.placeholder = `Search By ${searchMood}`;
    search.focus();
    search.value = "";
    showData();
}

function searchData(value) {
    let dataItem = "";
    if (searchMood == "title") {
        ///
        for (let i = 0; i < dataProduct.length; i++) {
            if (dataProduct[i].title.includes(value.toLowerCase())) {
                dataItem += `<tr>
    <td>${i + 1}</td>
    <td>${dataProduct[i].title}</td>
    <td>${dataProduct[i].price}</td>
    <td>${dataProduct[i].taxes}</td>
    <td>${dataProduct[i].ads}</td>
    <td>${dataProduct[i].discount}</td>
    <td>${dataProduct[i].total}</td>
    <td>${dataProduct[i].category}</td>
    <td><button onclick="updateData(${i})"  id="update">Update</button></td>
    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
</tr>`;
            }
        }
    } else {
        ///
        for (let i = 0; i < dataProduct.length; i++) {
            if (dataProduct[i].category.includes(value.toLowerCase())) {
                dataItem += `<tr>
    <td>${i + 1}</td>
    <td>${dataProduct[i].title}</td>
    <td>${dataProduct[i].price}</td>
    <td>${dataProduct[i].taxes}</td>
    <td>${dataProduct[i].ads}</td>
    <td>${dataProduct[i].discount}</td>
    <td>${dataProduct[i].total}</td>
    <td>${dataProduct[i].category}</td>
    <td><button onclick="updateData(${i})"  id="update">Update</button></td>
    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
</tr>`;
            }
        }
    }
    insertedItems.innerHTML = dataItem;
}

//Clean Data