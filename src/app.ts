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
        li.innerHTML = `Vardas: ${data.name}, priskaičiuota: ${data.count}, vardo kilmės tikimybė (5 didž.):`
        uList.appendChild(li);
        const ul = document.createElement('ul');
        li.className = 'listItem';
        li.appendChild(ul);
        data.country.forEach((c) => {
            const innerLi = document.createElement('li');
            fetch(`https://restcountries.com/v3.1/alpha/${c.country_id}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                innerLi.innerHTML = `<img class="flag" src="${data[0].flags.png}" alt=""> ${data[0].name.common}, ${(c.probability).toFixed(3)}`
                innerLi.className = 'innerUListItem';
                ul.appendChild(innerLi)
            })
        })
    })
}

btn.onclick = getInfo;
