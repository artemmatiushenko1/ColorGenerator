'use strict';

const getColorBtn = document.querySelector('.generate-btn');
const circle = document.querySelector('.circle');
const messageOverlay = document.querySelector('.message-overlay');
const copyBtn = document.querySelector('.copy');
const messageColorCode = document.querySelector('.code');
const mainBox = document.querySelector('.box');

const random = function (max) {
    return Math.floor(Math.random() * max);
};

const randomColorHEX = function () {
    const code = '0123456789ABCDEF'.split('');
    let color = '';

    for (let i = 0; i < 6; i++) {
        color += code[random(code.length)];
    }

    return `#${color}`;
};

const copyCode = function (e) {
    const code = e.target.textContent;

    if (!code) return;

    const data = [
        new ClipboardItem({
            'text/plain': new Blob([code], { type: 'text/plain' }),
        }),
    ];

    navigator.clipboard.write(data).then(function () {
        console.log('Copied to clipboard successfully!');
    });

    messageColorCode.textContent = code;
    messageOverlay.style.backgroundColor = code;

    messageOverlay.classList.remove('hidden-modal');

    setTimeout(function () {
        messageOverlay.classList.add('hidden-modal');
    }, 2000);
};

getColorBtn.addEventListener('click', function () {
    circle.innerHTML = '';
    copyBtn.textContent = '';

    const color = randomColorHEX();

    circle.style.backgroundColor = `${color}`;
    copyBtn.textContent = `${color}`;
});

copyBtn.addEventListener('click', copyCode);

window.addEventListener('load', function () {
    copyBtn.textContent = '';
    circle.style.backgroundColor = 'transparent';
});
