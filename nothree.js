var contents;
var btns;

document.addEventListener('DOMContentLoaded', function() {
    contents = Array.from(document.querySelectorAll('#content section'));
    btns = Array.from(document.querySelectorAll('nav button'));

    document.querySelector('nav').addEventListener('click', event => fade(event));
    //btns.forEach(btn => btn.addEventListener('click', event => fade(event)));
    typewriter();
});

function fade(event) {
    let element = event.target;
    let display = document.querySelector(`.${element.id}`);

    if (element.nodeName === 'BUTTON' && !display.classList.contains('fade')) {
        contents.forEach(content => {
            if (content.classList.contains('fade')) {
                content.classList.toggle('fade');
            }
        });
        display.classList.toggle('fade');
    }
}

var [text1, text2] = ["Hi!  ", "My name is Max."]
var next_text = false;
var char = 0;
var speed = 80;
function typewriter() {
    let text = next_text ? text2 : text1;
    if (char < text.length) {
        document.querySelector('header h1').innerHTML += text.charAt(char);
        char++;
        setTimeout(typewriter, speed);
    } else if (text === text1) {
        next_text = true;
        char = 0;
        setTimeout(typewriter, 300);
    }
}