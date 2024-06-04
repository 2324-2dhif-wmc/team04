import {User} from "./model.mjs";
import {getUser} from "./ServerClient/serverClient.mjs";
import {getHoliday, getMarketNews, getMarketStatus} from "./API/apidata.mjs";


let user = JSON.parse(localStorage.getItem('currentUser'));
let fixedUser;
let flag = false;

await getUser(user.email, (error, user) => {
    if(error)
    {
        console.log(error);
    }
    fixedUser = user;
    flag = true;
});

while (!flag) {
    await new Promise(resolve => setTimeout(resolve, 100));
}

let x = document.getElementById("Account");
x.innerHTML = fixedUser.name;

localStorage.setItem('currentUser', JSON.stringify(fixedUser));

let status = await getMarketStatus();
let holiday = await getHoliday();
let hoday = "no Holiday";
if (status.holiday !== null) {
    hoday = status.holiday;
}

let open = "Open";
if (status.isOpen === false) {
    open = "Closed";
}
let table = document.getElementById("marketStats");
table.innerHTML = `
    <td>US Market</td>
    <td>${hoday}</td>
    <td>${open}</td>
    <td>${status.session}</td>
    <td>Amerika, New-York</td>
`
async function info() {
    const news = await getMarketNews();
    console.log(news);
    let newsContainer = document.getElementById("marketNews");
    news.forEach((newsItem) => {
        let newsElement = document.createElement("div");
        newsElement.classList.add("col-12", "mb-4");
        newsElement.innerHTML = `
            <div class="card h-100" style = "width: 100%; height: 70vh">
                <div class="card-body">
                    <h5 class="card-title">${newsItem.headline}</h5>
                    <p class="card-text">${newsItem.summary}</p>
                    <a href="${newsItem.url}" target="_blank" class="btn btn-primary">Read More</a>
                </div>
            </div>`;
        newsContainer.appendChild(newsElement);
    });
}

info();