let title = document.getElementById("title");
let price = document.getElementById("price");
let tax = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let create = document.getElementById("submit");
let category = document.getElementById("category");
let count = document.getElementById("count");
let heading = document.getElementById("heading");
let deleteAll = document.getElementById("deleteAll");
let searchinput = document.getElementById("search");

let mood = "create";
let tmp;
// get total

function getTotal() {
    if (price.value != "") {
        let result = +price.value + +tax.value + +ads.value - +discount.value;
        total.innerHTML = result;
        total.style.background = "green";
    } else {
        total.innerHTML = "";
        total.style.background = "red";
    }
}

//create product
let dataproduct;
if (localStorage.product != null) {
    dataproduct = JSON.parse(localStorage.product);
} else {
    dataproduct = [];
}

create.onclick = function () {
    let newproduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        tax: tax.value,
        ads: ads.value,
        count: count.value,
        discount: discount.value,
        total: total.innerHTML,
        category: category.value.toLowerCase(),
    };
    if(price.value != '' && category.value != '' && title.value != ''  && tax.value != '' && discount.value != '' && ads.value != '' && count.value <= 100){
        if (mood === "create") {
            if (newproduct.count > 1) {
                for (let j = 0; j < newproduct.count; j++) {
                    dataproduct.push(newproduct);
                }
            } else if (newproduct.count == 0) {
                dataproduct.pop(newproduct);
            } else {
                dataproduct.push(newproduct);
            }
        } else {
            dataproduct[tmp] = newproduct;
            mood = "create";
            count.style.display = "block";
            create.innerHTML = "Create";
        }
        cleardata();
    
    }
 
    // save product in localstorage
    localStorage.setItem("product", JSON.stringify(dataproduct));
    
    showdata();
};

// clear data in inputs

function cleardata() {
    title.value = "";
    price.value = "";
    tax.value = "";
    ads.value = "";
    count.value = "";
    discount.value = "";
    total.innerHTML = "";
    category.value = "";
}

// read data
function showdata() {
    getTotal();
    let table = "";

    for (let i = 0; i < dataproduct.length; i++) {
        table += `
    <tr>
    <td>${i}</td>
    <td>${dataproduct[i].title}</td> 
    <td>${dataproduct[i].price}</td>
    <td>${dataproduct[i].tax}</td>
    <td>${dataproduct[i].ads}</td>
    <td>${dataproduct[i].discount}</td>
    <td>${dataproduct[i].category}</td>
    <th> <button id="update" onclick = "updatedata(${i})">update</button></th>
    <th> <button onclick="deleteitem(${i})" id="delete">delete</button></th>
    </tr>
    `;
    }

    document.getElementById("tbody").innerHTML = table;
    if (dataproduct.length > 0) {
        deleteAll.innerHTML = `
        <button onclick="deleteAlldata()">delete All ${dataproduct.length}</button>
        `;
    } else {
        deleteAll.innerHTML = "";
    }
}
showdata();

// delete item
function deleteitem(id) {
    dataproduct.splice(id, 1);
    localStorage.product = JSON.stringify(dataproduct);
    showdata();
}

//delete all data
function deleteAlldata() {
    localStorage.clear();
    dataproduct.splice(0);
    showdata();
}

// function update data
function updatedata(i) {
    // 5 // dataproduct[5] // price
    title.value = dataproduct[i].title;
    price.value = dataproduct[i].price;
    tax.value = dataproduct[i].tax;
    ads.value = dataproduct[i].ads;
    discount.value = dataproduct[i].discount;
    tax.category = dataproduct[i].category;
    count.style.display = "none";
    create.innerHTML = "Update";
    getTotal();
    mood = "update";
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth",
    });
}

// search data

let searchmood = "title";

function getsearch(id) {
    if (id === "searchTitle") {
        searchmood = "title";
        searchinput.value = '';
        showdata();
    } else {
        searchmood = "Category";
        searchinput.value = '';
        showdata();
    }

    searchinput.focus();
    searchinput.placeholder = `Search By ${searchmood}`;

}

function searchData(value) {
    let table = '';
    for (let i = 0; i < dataproduct.length; i++) {
        if (searchmood == "title") {

            if (dataproduct[i].title.includes(value.toLowerCase())) {

                table += `
            <tr>
            <td>${i}</td>
            <td>${dataproduct[i].title}</td> 
            <td>${dataproduct[i].price}</td>
            <td>${dataproduct[i].tax}</td>
            <td>${dataproduct[i].ads}</td>
            <td>${dataproduct[i].discount}</td>
            <td>${dataproduct[i].category}</td>
            <th> <button id="update" onclick = "updatedata(${i})">update</button></th>
            <th> <button onclick="deleteitem(${i})" id="delete">delete</button></th>
            </tr>
            `;
                document.getElementById("tbody").innerHTML = table;
            }

        } else {

            if (dataproduct[i].category.includes(value.toLowerCase())) {

                table += `
              <tr>
              <td>${i}</td>
              <td>${dataproduct[i].title}</td> 
              <td>${dataproduct[i].price}</td>
              <td>${dataproduct[i].tax}</td>
              <td>${dataproduct[i].ads}</td>
              <td>${dataproduct[i].discount}</td>
              <td>${dataproduct[i].category}</td>
              <th> <button id="update" onclick = "updatedata(${i})">update</button></th>
              <th> <button onclick="deleteitem(${i})" id="delete">delete</button></th>
              </tr>
              `;
                document.getElementById("tbody").innerHTML = table;
            }

        }
    }

}
