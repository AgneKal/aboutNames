import { Name } from "./name.js";

const nameInput =<HTMLInputElement> document.getElementById('nameValue')!;
const btn = <HTMLButtonElement>document.getElementById('submit');

const uList = <HTMLUListElement>document.getElementById('uList')!;

const getInfo = () => {
    const nameV = nameInput.value
    fetch(`https://api.nationalize.io/?name=${nameV}`)
    .then ((response) => {
        return response.json();
    })
    .then ((data: Name) => {
        uList.innerHTML = '';
        const li = document.createElement('li');
        li.innerHTML = `${data.name}, ${data.count}`
        uList.appendChild(li);
        const ul = document.createElement('ul');
        li.appendChild(ul);
        data.country.forEach((c) => {
            const innerLi = document.createElement('li');
            fetch(`https://restcountries.com/v3.1/alpha/${c.country_id}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                innerLi.innerHTML = `${data[0].name.common}, ${c.probability}`
                ul.appendChild(innerLi)
            })
        })
    })
}

btn.onclick = getInfo;
