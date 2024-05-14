let name = "";
let email = "";
document.getElementById("dataForm").addEventListener("submit", function(event) {
    event.preventDefault();
    name = document.getElementById("name").value;
    email = document.getElementById("email").value;
    module.exports = {name, email};
});

