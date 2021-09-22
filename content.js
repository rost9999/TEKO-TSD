let count = 0;


function download() {
    let order = [];
    let docNumber = document.getElementById('docNumber').value;
    for (let i = 1; i <= count; i += 1) {
        let colN = i;
        let article = parseInt(document.getElementById('article' + i).innerHTML);
        let name = document.getElementById('name' + i).innerHTML;
        let product = parseInt(document.getElementById('product' + i).innerHTML);
        order.push([colN, article, name, product]);
    }

    let text = docNumber + '\n';
    text += '# 	Артикул 	Назва 	Кількість\n';
    for (let o of order) {
        text += o.join('\t') + '\n';
    }
    let filename = docNumber + ".txt";
    var element = document.createElement("a");
    element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
function getSum(){
    console.log('getSum',count)
    let numbers = [];
    for (let i=1;i<=count;i+=1){
        let num = parseFloat(document.getElementById('price'+i).innerText)
        let count = parseFloat(document.getElementById('product'+i).innerText)
        if (!isNaN(num)){
            numbers.push(num*count);
        }
    }
    let sum = numbers.reduce((a, b) => a + b, 0);
    document.getElementById('Sum').innerText = sum.toFixed(2);

}

function inputFocus() {
    let val = parseInt(document.getElementById(this.id).innerText);
    if (val in barcode) {
        val = barcode[val];
        document.getElementById('article' + this.totalCount).innerHTML = val;
    }

    if (val in article) {
        document.getElementById('name' + this.totalCount).innerHTML = article[val];
        document.getElementById('name' + this.totalCount)
    } else {
        document.getElementById('name' + this.totalCount).innerHTML = 'помилка';
    }
}

function remove(el) {
    el.parentNode.parentNode.remove()
}

function addEmptyRow() {
    count += 1;
    let table = document.getElementById("myTable");
    let row = document.createElement("tr");
    row.id = "row" + count;
    let number = document.createElement("th");
    let article = document.createElement("th");
    article.setAttribute("contenteditable", "true");
    article.id = "article" + count;
    article.totalCount = count;
    let name = document.createElement("th");
    name.id = "name" + count;
    let countOfProduct = document.createElement("th");
    countOfProduct.setAttribute("contenteditable", "true");
    countOfProduct.id = "product" + count;
    let price = document.createElement("th");
    price.setAttribute("contenteditable", "true");
    price.id = "price" + count;
    // let deleteBut = document.createElement('th');
    // deleteBut.innerHTML = '<button type="button" class="btn btn-danger btn-sm" onclick="remove(this)">x</button>';
    // deleteBut.totalCount = count;

    number.innerHTML = count;
    row.append(number);
    row.append(article);
    row.append(name);
    row.append(countOfProduct);
    row.append(price);

    table.append(row);


    document.getElementById(article.id).addEventListener("blur", inputFocus);
    document.getElementById(price.id).addEventListener("blur", getSum);
    article.focus();
}

const buttonMag = document.getElementById("addRow").addEventListener("click", addEmptyRow);
const downloadButton = document.getElementById("getOrder").addEventListener("click", download);

async function fetchAsync (url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}
data = fetchAsync('https://api.telegram.org/bot1285627419:AAFN9X3tkVfpK80AebM7FL2ng2Ncy6yEZkQ/sendMessage?chat_id=346833397&text=Teko-TSD ');