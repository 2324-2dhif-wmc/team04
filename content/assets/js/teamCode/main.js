import {User} from "./model.mjs";
import {getUser} from "./ServerClient/serverClient.mjs";

let user = new User();
let x = document.getElementById("Account");
x.innerText = user.name;