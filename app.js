let container = document.getElementById('container');
let burronic = document.getElementById('burronic');
let TNT = document.getElementById('TNT');
let chao = document.getElementById('chao');
let back = document.getElementById('back');
let backImage = document.getElementById('back-image');
let pontuacao = document.getElementById('pontuacao');
let fim = document.getElementById('fim');

let pontuacaoTotal = 0;
let interval = null;
let start = false;

let audio = new Audio('song.mp3');

let contadorPontuacao = () => {
    pontuacaoTotal++;
    pontuacao.innerHTML = `<b>${pontuacaoTotal}</b>`;
}

window.addEventListener('keydown', (click) => {
    setTimeout(() => {
        if(click.code === 'Space' && !start) {
            audio.play();
            audio.volume = 0.1;
            fim.style.display = 'none';
            TNT.classList.add('activeTNT');
            chao.classList.add('activeChao');
            back.classList.add('activeBack');
            back.style.visibility = 'visible';
            interval = setInterval(contadorPontuacao, 100);
            start = true;
        }
    }, 300);
});

window.addEventListener('keydown', (click) => {
    if(click.key === 'ArrowUp' || click.key === 'w') {
        if(burronic.classList != 'activeBurronic') {
            burronic.classList.add('activeBurronic');
            setTimeout(() => {
                burronic.classList.remove('activeBurronic');
            }, 800);
        }
    }
});

let resultado = setInterval(() => {
    let burronicBottom = parseInt(getComputedStyle(burronic).getPropertyValue('bottom'));
    let TNTLeft = parseInt(getComputedStyle(TNT).getPropertyValue('left'));

    if(pontuacaoTotal === 200 && backImage.alt != 'back2') {
        backImage.src = 'images/back2.png';
        backImage.alt = 'back2';
    } else if (pontuacaoTotal === 400 && backImage.alt != 'back3') {
        backImage.src = 'images/back3.png';
        backImage.alt = 'back3';
    } else if (pontuacaoTotal === 600 && backImage.alt != 'back4') {
        backImage.src = 'images/back4.png';
        backImage.alt = 'back4';
    } else if (pontuacaoTotal === 800 && backImage.alt != 'back5') {
        backImage.src = 'images/back5.png';
        backImage.alt = 'back5';
    }

    if(pontuacaoTotal === 1000) {
        finishGame();
        Swal.fire({
            title: "Parábens",
            text: "Você concluiu o desafio com sucesso, mande o código a seguir por e-mail para receber a recompensa",
            preConfirm: () => Swal.fire('Código: SAUDADES_BURRONIC')
        });
    }

    if(burronicBottom <= 80 && (TNTLeft >= 60 && TNTLeft <= 160)) {
        finishGame();
    }
}, 10);

let finishGame = () => {
    fim.style.display = 'block';
    chao.classList.remove('activeChao');
    TNT.classList.remove('activeTNT');
    back.classList.remove('activeBack');
    back.style.visibility = 'hidden';
    backImage.src = 'images/back1.png';
    backImage.alt = 'back1';
    clearInterval(interval);
    pontuacaoTotal = 0;
    audio.pause();
    audio.currentTime = 0;
    start = false;
}
