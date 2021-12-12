function initialize ()
{
    mainImage = document.getElementById ("mainimg");
    captionOut = document.getElementById ("caption");

    var DRAGON_NAMES = ["Rax", "Ash", "Barnadas", "Drake", "Endisun", "Lunar"];
    var dragonImages = document.getElementsByClassName ("thumb");

    dragons = [];

    for (var i = 0; i < dragonImages.length; i++)
    {
        dragons [i] = {};
        dragons [i].dragonName = DRAGON_NAMES [i];
        dragons [i].dragonImage = dragonImages [i];

        dragonImages [i].dragon = dragons [i];
    }
}

function changeMyColor (el, clr)
{
    el.style.color = clr;
}

function selectDragon (dragon)
{
    mainImage.src = dragon.dragonImage.src;
    captionOut.innerHTML = dragon.dragonName;
}