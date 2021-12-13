const JACK = 11, QUEEN = 12, KING = 13, ACE = 1;
const CLUB = 0, DIAMOND = 1, HEART = 2, SPADE = 3; 
const BLUE_BACK = "back-blue-75-3.png";
const TOP_DECK = 0;

function initialize ()
{
    mainImage = document.getElementById ("mainimg");
    captionOut = document.getElementById ("caption");

    /* var DRAGON_NAMES = ["Rax", "Ash", "Barnadas", "Drake", "Endisun", "Lunar"];
    var dragonImages = document.getElementsByClassName ("thumb");

    dragons = [];

    for (var i = 0; i < dragonImages.length; i++)
    {
        dragons [i] = {};
        dragons [i].dragonName = DRAGON_NAMES [i];
        dragons [i].dragonImage = dragonImages [i];

        dragonImages [i].dragon = dragons [i];
    } */

    pageTitle = "Dragons";
    itemList = [{itemName: "Rax", itemInfo:"Rax was a dragon scout who was betrayed by one of his own. Killed before his time, Rax returned as a skeleton to continue the fight.", itemImage: "rax copy.png"}, 
                {itemName: "Ash", itemInfo:"Born in flame, Ash uses the heat of his body to wound his enemies.", itemImage:"ash copy.png"}, 
                {itemName: "Barnabas", itemInfo:"Barnabas is the oldest and most respected of the dragons. He is wise beyond mortal years.", itemImage: "barnabas copy.png"}, 
                {itemName: "Drake", itemInfo:"Master of the flame, Drake can fire a molten jet at distant enemies.", itemImage:"drake copy.png"}, 
                {itemName: "Endisun", itemInfo:"With electricity coursing through his body at all times, Endisun is not only a deadly foe, but he can shoot into and out of the field of battle without his opponents even noticing.", itemImage:"endisun copy.png"}, 
                {itemName:"Lunar", itemInfo:"Lunar's magical healing abilities makes her a formidable opponent.", itemImage:"lunar copy.png"}];

    infoOutput = document.getElementById ("info");
    itemThumbs = document.getElementsByClassName ("thumb");
    document.getElementById ("pagetitle").innerHTML = pageTitle;
    currentItemIdx = 0;
    offset = 0;

    flippedCardsContainer = document.getElementById ("flipped");
    // deck = generateStandardDeck ();

    // mightyJoe = new Animal ("Joe");
    // kodo = new Animal ("Kodo");
    // mightyJoe = new Animal ("Joe", "New York");
    // kodo = new Animal ("Kodo", "Arizona");

    // console.log (mightyJoe.name + " and " + kodo.name);

    zooForm = document.getElementById ("zoo");
    listOutput = document.getElementById ("animallist");

    animalList = [new Animal ("Joe", "New York"), new Animal ("Kodo", "Arizona")];

    cardsOutput = document.getElementById ("cardsout");
    theDeck = generateStandardDeck ();
    theDeck.shuffleDeck ();
    showDeck ();

    display ();
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

function moveOffset (mod)
{
    offset += mod;

    if (offset < 0)
        offset = 0;
    if (offset >= itemList.length - 3)
        offset = itemList.length - 3;

    display ();
}

function selectItem (idx)
{
    currentItemIdx = idx + offset;
    display (); 
}

// function generateStandardDeck ()
// {
//     var deck = [];
//     for (var r = ACE; r <= KING; r++)
//     {
//         for (var s = CLUB; s <= SPADE; s++)
//         {
//             var card = {};
//             card.rank = r;
//             card.suit = s;
//             card.imgFile = r + "-" + s + ".png";
//             deck.push (card);
//         }
//     }
//     return deck;
// }

function flipCard ()
{
    if (deck.length == 0)
    {
        return; 
    }
    var card = deck.shift ();
    var cardImage = document.createElement ("img");
    cardImage.src = "cardimages/" + card.imgFile; 
    flippedCardsContainer.appendChild (cardImage);

}

// function Animal (n)
// {
//     this.name = n;
// }

function Animal (n, loc)
{
    this.name = n;
    this.location = loc; 
}

function addAnimal ()
{
    // if (zooForm.animalname.value == "" || zooForm.animallocation.value == "")
    // {
    //     alert ("Please Enter a Name and Location for your Animal");
    //     return;
    // }
    if (!valuesEntered ())
        return;
    
    animalList.push (new Animal (zooForm.animalname.value, zooForm.animallocation.value));

    zooForm.animalname.value = "";
    zooForm.animallocation.value = "";

    display ();
}

function deleteAnimal ()
{
    var animalIdx = zooForm.animalidx.value;

    // if (animalIdx < 0 || animalIdx >= animalList.length)
    // {
    //     alert ("Please Enter a Valid Index.");
    //     return
    // }
    if (!animalInList (animalIdx))
        return;

    animalList.splice (animalIdx, 1);
    display ();
}

function updateAnimal ()
{
    var animalIdx = zooForm.animalidx.value;

    // if (animalIdx < 0 || animalIdx >= animalList.length)
    // {
    //     alert ("Please Enter a Valid Index.");
    //     return
    // }
    // if (zooForm.animalname.value == "" || zooForm.animallocation.value == "")
    // {
    //     alert ("Please Enter a Name and Location for your Animal");
    //     return;
    // }

    if (!animalInList (animalIdx) || !valuesEntered ())
        return;
    animalList [animalIdx].name = zooForm.animalname.value;
    animalList [animalIdx].location = zooForm.animallocation.value;

    display ();
}

function valuesEntered ()
{
    return (zooForm.animalname.value != "" && zooForm.animallocation.value != "");
}

function animalInList (animalIdx)
{
    return (animalIdx >= 0 && animalIdx < animalList.length);
}

function Card (r, s, i)
{
    this.rank = r;
    this.suit = s;
    this.imageFilename = i;
}

function CardDeck ()
{
    //this.deck = [];
}

CardDeck.prototype = Array.prototype;

CardDeck.prototype.shuffleDeck = function ()
{
    var tmpDeck = new CardDeck ();
    while (this.length > 0)
    {
        var tmpCard = this.splice (getRandomInteger (0, this.length - 1), 1) [0];
        tmpDeck.push (tmpCard);
    }

    this.push.apply (this, tmpDeck);
}

function generateStandardDeck ()
{
    var deck = new CardDeck ();

    for (var r = ACE; r <= KING; r++)
    {
        for (var s = CLUB; s <= SPADE; s++)
        {
            deck.push (new Card (r, s, r + "-" + s + ".png"));
        }
    }

    return deck;
}

function showDeck ()
{
    while (theDeck.length > 0)
    {
        var tmpImg = document.createElement ("img");
        var tmpCard = theDeck.shift ();
        tmpImg.src = "cardimages/" + tmpCard.imageFilename;
        cardsOutput.appendChild (tmpImg);
    }
}

function getRandomInteger (min, max)
{
    var multiplier = max - (min - 1);
    var ran = parseInt (Math.random() * multiplier) + min;

    return ran;
}

function display ()
{
    mainImage.src = "images/" + itemList [currentItemIdx].itemImage;
    captionOut.innerHTML = itemList [currentItemIdx].itemName;
    infoOutput.innerHTML = itemList [currentItemIdx].itemInfo;

    for (var i = 0; i < itemThumbs.length; i++)
    {
        itemThumbs [i].src = "images/" + itemList[i + offset].itemImage;
    }

    listOutput.innerHTML = "0: " + animalList [0].name + " lives in " + animalList [0].location + ".";

    for (var i = 1; i < animalList.length; i++)
    {
        listOutput.innerHTML += "<br/>" + i + ": " + animalList [i].name + " lives in " + animalList [i].location + ".";
    }
    // console.log (animalList.length);
}
