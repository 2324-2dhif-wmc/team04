document.addEventListener("DOMContentLoaded", function() {
    // Überprüfe, ob das schwarze DIV existiert
    var blackDiv = document.getElementById("blackDiv");
    if (blackDiv) {
        // Wenn ja, füge dem body-Tag die Klasse 'black-bg' hinzu
        document.body.classList.add("black-bg");
    }
});