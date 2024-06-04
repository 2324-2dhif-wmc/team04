import {User} from "./model.mjs";
import {getUser} from "./ServerClient/serverClient.mjs";
import {getHoliday, getMarketStatus} from "./API/apidata.mjs";


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
console.log(holiday);
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
