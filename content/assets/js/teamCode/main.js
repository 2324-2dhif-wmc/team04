import {User} from "./model.mjs";
import {getUser} from "./ServerClient/serverClient.mjs";


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
