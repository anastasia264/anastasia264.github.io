document.getElementById('loadDataBtn').addEventListener('click', loadData);
document.getElementById('sortByNameBtn').addEventListener('click', sortByName);
document.getElementById('sortByYearBtn').addEventListener('click', sortByYear);
document.getElementById('sortByPriceBtn').addEventListener('click', sortByPrice);

function loadData() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const data = xhr.responseXML;
                displayData(data);
            } else {
                console.error('Σφάλμα κατά τη φόρτωση των δεδομένων');
            }
        }
    };
    xhr.open('GET', 'data.xml', true);
    xhr.send();
}

function displayData(data) {
    const items = data.getElementsByTagName('INSTRUMENT');
    const container = document.getElementById('dataContainer');
    container.innerHTML = '';

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const name = item.getElementsByTagName('NAME')[0].textContent;
        const type = item.getElementsByTagName('TYPE')[0].textContent;
        const brand = item.getElementsByTagName('BRAND')[0].textContent;
        const year = item.getElementsByTagName('YEAR')[0].textContent;
        const price = item.getElementsByTagName('PRICE')[0].textContent;

        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `<strong>${name}</strong> - ${type}, ${brand}, ${year}, ${price}€`;
        container.appendChild(itemDiv);
    }
}

function sortByName() {
    const container = document.getElementById('dataContainer');
    const items = Array.from(container.children);

    items.sort((a, b) => {
        const nameA = a.innerText.split(' - ')[0];
        const nameB = b.innerText.split(' - ')[0];
        return nameA.localeCompare(nameB);
    });

    container.innerHTML = '';
    items.forEach(item => container.appendChild(item));
}

function sortByYear() {
    const container = document.getElementById('dataContainer');
    const items = Array.from(container.children);

    items.sort((a, b) => {
        const yearA = parseInt(a.innerText.split(',')[3].trim());
        const yearB = parseInt(b.innerText.split(',')[3].trim());
        return yearB - yearA;
    });

    container.innerHTML = '';
    items.forEach(item => container.appendChild(item));
}

function sortByPrice() {
    const container = document.getElementById('dataContainer');
    const items = Array.from(container.children);

    items.sort((a, b) => {
        const priceA = parseFloat(a.innerText.split(',')[4].trim().replace('€', ''));
        const priceB = parseFloat(b.innerText.split(',')[4].trim().replace('€', ''));
        return priceA - priceB;
    });

    container.innerHTML = '';
    items.forEach(item => container.appendChild(item));
}