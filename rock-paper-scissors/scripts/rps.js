function show(src) {
    
    var hello = src;
    console.log(hello);

    document.getElementById('img1').style.visibility = 'visible';
    
    document.getElementById("img1").src = "images/" + src;
}

function hide() {
    document.getElementById('img1').style.visibility = 'hidden';
}