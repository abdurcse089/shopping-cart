let addBtn = document.getElementById('add-btn');
let removeBtn = document.getElementById('remove-btn');
let inputFieldDisplay = document.getElementById('input-field-display');
let addCaseBtn = document.getElementById('add-case-btn');
let removeCaseBtn = document.getElementById('remove-case-btn');
let inputFieldDisplayCasing = document.getElementById('input-field-display-casing');
let phoneQty = document.getElementById('phone-qty');
let itemQty = document.getElementById('item-qty');
let subTotal = document.getElementById('sub-total');
let totalAmount = document.getElementById('total-amount');
let removePhone = document.getElementById('remove-phone');
let removeCasing = document.getElementById('remove-casing');
let addedProduct = 0;
let addedCase = 0;
let taxRate = 0;
let phonePrice = 1219
let casePrice = 59
let btnCheckOut = document.getElementById('btn-checkout');
let customerName = document.getElementById('customer-name');
let phoneNumber = document.getElementById('phone-number');
let goBackBtn = document.getElementById('btn-go-back');

document.getElementById('phone-price').innerText = phonePrice;
document.getElementById('casing-price').innerText = casePrice;
document.getElementById('tax-rate').innerText = taxRate;
addBtn.addEventListener('click', () => {
    removeBtn.disabled = false;
    addedProduct++;
    inputFieldDisplay.value = addedProduct;
    phoneQty.innerText = addedProduct;
    subTotal.innerText = parseInt(subTotal.innerText) + phonePrice;
    totalAmount.innerText = parseInt(subTotal.innerText) + taxRate;
});
removeBtn.addEventListener('click', () => {
    if (addedProduct === 0) {
        removeBtn.disabled = true;
        if (addedCase === 0) {
            totalAmount.innerText = 0;
        }
    } else {
        addedProduct--;
        inputFieldDisplay.value = addedProduct;
        phoneQty.innerText = addedProduct;
        subTotal.innerText = parseInt(subTotal.innerText) - phonePrice;
        totalAmount.innerText = parseInt(subTotal.innerText) + taxRate;
    }
});

addCaseBtn.addEventListener('click', () => {
    removeCaseBtn.disabled = false;
    addedCase++;
    inputFieldDisplayCasing.value = addedCase;
    itemQty.innerText = addedCase;
    subTotal.innerText = parseInt(subTotal.innerText) + casePrice;
    totalAmount.innerText = parseInt(subTotal.innerText) + taxRate;
});
removeCaseBtn.addEventListener('click', () => {
    if (addedCase === 0) {
        removeCaseBtn.disabled = true;
        if (addedProduct === 0) {
            totalAmount.innerText = 0;
        }
    } else {
        addedCase--;
        inputFieldDisplayCasing.value = addedCase;
        itemQty.innerText = addedCase;
        subTotal.innerText = parseInt(subTotal.innerText) - casePrice;
        totalAmount.innerText = parseInt(subTotal.innerText) + taxRate;
    }
});

removePhone.addEventListener('click', () => {
    if (addedCase > 0) {
        inputFieldDisplay.value = 0;
        addedProduct = 0;
        phoneQty.innerText = 0;
        removeBtn.disabled = true;
        subTotal.innerText = addedCase * casePrice;
        totalAmount.innerText = parseInt(subTotal.innerText) + taxRate;
    } else {
        inputFieldDisplay.value = 0;
        addedProduct = 0;
        phoneQty.innerText = 0;
        totalAmount.innerText = 0;
        subTotal.innerText = 0;
        removeBtn.disabled = true;
    }
});

removeCasing.addEventListener('click', () => {
    if (addedProduct > 0) {
        inputFieldDisplayCasing.value = 0;
        addedCase = 0;
        caseQty.innerText = 0;
        removeCaseBtn.disabled = true;
        subTotal.innerText = addedProduct * phonePrice;
        totalAmount.innerText = parseInt(subTotal.innerText) + taxRate;
    } else {
        inputFieldDisplayCasing.value = 0;
        addedCase = 0;
        itemQty.innerText = 0;
        totalAmount.innerText = 0;
        subTotal.innerText = 0;
        removeCaseBtn.disabled = true;
    }
});

btnCheckOut.addEventListener('click', (e) => {
    let date = new Date();
    document.getElementById('display-date').innerText = `0${date.getDate()} | 0${date.getMonth()+1} | ${date.getFullYear()}`;
    let customerNumber = parseInt(phoneNumber.value);
    if ((!customerNumber) || (addedProduct <= 0 && addedCase <= 0)) {
        alert('No Orders Found!');
    } else {
        document.getElementById('phone-data').style.display = 'none';
        document.getElementById('order-details').style.display = 'block';
        document.getElementById('customer').innerHTML = customerName.value;
        document.getElementById('phone').innerHTML = phoneNumber.value;
        if (addedProduct > 0 && addedCase > 0) {
            document.getElementById('details').innerHTML = `
        ${document.getElementById('p-name').innerHTML} | Quantity : ${inputFieldDisplay.value}
        | Price : ${addedProduct * phonePrice} <br>
        ${document.getElementById('c-name').innerHTML} | Quantity : ${inputFieldDisplayCasing.value}
        | Price : ${addedCase * casePrice}
        `;
        } else if (addedCase > 0 && addedProduct == 0) {
            document.getElementById('details').innerHTML = `
        ${document.getElementById('c-name').innerHTML} | Quantity : ${inputFieldDisplayCasing.value}
        | Price : ${addedCase * casePrice}
        `;
        } else if (addedProduct > 0 && addedCase == 0) {
            document.getElementById('details').innerHTML = `
        ${document.getElementById('p-name').innerHTML} | Quantity : ${inputFieldDisplay.value}
        | Price : ${addedProduct * phonePrice}
        `;
        }
        document.getElementById('subTotal').innerHTML = subTotal.innerText;
        document.getElementById('tax').innerHTML = taxRate;
        document.getElementById('total').innerHTML = totalAmount.innerText;
    }
});

goBackBtn.addEventListener('click', () => {
    document.getElementById('phone-data').style.display = 'block';
    location.reload();
    document.getElementById('order-details').style.display = 'none';
});