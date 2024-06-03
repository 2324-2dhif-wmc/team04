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



document.addEventListener("DOMContentLoaded", function (){
    let x1 = document.getElementById("link1");
    let x2 = document.getElementById("link2");
    let x3 = document.getElementById("link3");
    let x4 = document.getElementById("link4");
    x1.addEventListener("click", function(event) {
        window.location.href = "#marketStats";
    })
    x2.addEventListener("click", function(event) {
        window.location.href = "#";
    })
    x3.addEventListener("click", function(event) {
        window.location.href = "#";
    })
    x4.addEventListener("click", function(event) {
        window.location.href = "#";
    })
})