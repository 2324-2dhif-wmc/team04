import {User} from "./model.mjs";
import {getUser} from "./ServerClient/serverClient.mjs";
import {getHoliday, getMarketNews, getMarketStatus} from "./API/apidata.mjs";


let user = JSON.parse(localStorage.getItem('currentUser'));

let x = document.getElementById("Account");
x.innerHTML = user.name;

localStorage.setItem('currentUser', JSON.stringify(user));
