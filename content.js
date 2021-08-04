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

function inputFocus() {
    let val = parseInt(document.getElementById(this.id).innerText);
    if (val in barcode) {
        val = barcode[val];
        document.getElementById('article' + this.totalCount).innerHTML = val;
    }

    if (val in article) {
        document.getElementById('name' + this.totalCount).innerHTML = article[val];
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
    // let deleteBut = document.createElement('th');
    // deleteBut.innerHTML = '<button type="button" class="btn btn-danger btn-sm" onclick="remove(this)">x</button>';
    // deleteBut.totalCount = count;

    number.innerHTML = count;
    row.append(number);
    row.append(article);
    row.append(name);
    row.append(countOfProduct);
    // row.append(deleteBut);

    table.append(row);


    document.getElementById(article.id).addEventListener("blur", inputFocus);
}

const buttonMag = document.getElementById("addRow").addEventListener("click", addEmptyRow);
const downloadButton = document.getElementById("getOrder").addEventListener("click", download);