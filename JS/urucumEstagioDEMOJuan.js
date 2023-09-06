const personagem = document.getElementById('urucum');
const inimigo = document.getElementById('inimigo');

const paredeInimigo1 = document.getElementById('paredeInimigo');

const parede1 = document.getElementById('parede1');
const parede1Cima = document.getElementById('parede1Cima');
const parede2 = document.getElementById('parede2');

const parede6 = document.getElementById('parede6');
const parede6Cima = document.getElementById('parede6Cima');
const parede7 = document.getElementById('parede7');

var musicOn = false;

const backgroundAudio = new Audio('./Audio/campo.mp3'); 
const hitCheckAudio = new Audio('./Audio/danoInimigo.mp3');
const movementAudio = new Audio('./Audio/andar_campo.mp3');
const shootAudio = new Audio('./Audio/tiro.mp3');
const damageCheckAudio = new Audio('./Audio/danoPersonagem.mp3')

const cantoPretoCima = document.getElementById('cantoPretoCima');
const cantoPretoBaixo = document.getElementById('cantoPretoBaixo');
const cantoPretoEsquerda = document.getElementById('cantoPretoEsquerda');
const cantoPretoDireita = document.getElementById('cantoPretoDireita');

const imgFundo = document.getElementById('imgfundo');

const movePad1 = document.getElementById('movePad1');
const movePad2 = document.getElementById('movePad2');
const movePad3 = document.getElementById('movePad3');
const movePad4 = document.getElementById('movePad4');
const movePad5 = document.getElementById('movePad5');
const movePad6 = document.getElementById('movePad6');
const movePad7 = document.getElementById('movePad7');
const movePad8 = document.getElementById('movePad8');

const spawnpoint1 = document.getElementById('spawnpoint1');
const spawnpoint2 = document.getElementById('spawnpoint2');
const spawnpoint3 = document.getElementById('spawnpoint3');
const spawnpoint4 = document.getElementById('spawnpoint4');
const spawnpoint5 = document.getElementById('spawnpoint5');
const spawnpoint6 = document.getElementById('spawnpoint6');
const spawnpoint7 = document.getElementById('spawnpoint7');
const spawnpoint8 = document.getElementById('spawnpoint8');
const spawnpoint9 = document.getElementById('spawnpoint9');
const spawnpoint10 = document.getElementById('spawnpoint10');

var isReloading = false;
var blockAtirar = false;

var lastMovePad;
var backOne = 0;

let inimigoPositionY = 60;
let inimigoPositionX = 840;

const personagemWidth = personagem.clientWidth;
const personagemHeight = personagem.clientHeight;
const personagemLeft = personagem.clientLeft;
var colisorInimigo = 1;


var paredeInimigo1Rect;
var urucumRect;
var inimigoRect;
var inimigoDisplay;

let vidaCount = 3;
let vidaInimigo = 3;

let direcaoInimigo = 0;

let posicaoHorizontal = 32;
let posicaoVertical = 564;
const step = 6;

var direcaoPlayer;

const tiroSpeed = 2;
const tiroSpeed_Descendo = -1*(tiroSpeed);

const inimigoLeft = inimigo.style.left;
const inimigotop = inimigo.style.top;

let posicaoInimigo = 2;


var inimigoPosicao =  Math.random() * (window.innerWidth - 50);

var inimigoInvensi = false;

let inimigoLeftRect;
let inimigoTopRect;

var isOnDialog = false;
var cutsceneStep = 0;

const mensagemContainer = document.getElementById("msgContainer");
const mensagemText = document.createElement("mensagemText")
const ladoDireitoText = document.getElementById("ladoDireitoContainerMSG");

sequenciaDialogos()

function mostrarCaixaTexto(personagemSelecDialogo, mensagem){
    // * Alterar texto do novo elemento
        mensagemText.textContent = mensagem;
        mensagemText.className = "textMensagem";

    // * Alterar Fundo do container
        mensagemContainer.className = "mensagemContainer";

        if(personagemSelecDialogo == "urucum"){
            mensagemContainer.classList.add("backgroundMensagemUrucum");
        }else if(personagemSelecDialogo == "caronte"){
            mensagemContainer.classList.add("backgroundMensagemCaronte");
        }

        ladoDireitoText.appendChild(mensagemText);
}

function esconderCaixaTexto(){
    mensagemContainer.className = "hiddenMessage";
    ladoDireitoText.removeChild(mensagemText);
}

function sequenciaDialogos(){
  isOnDialog = true;
  mostrarCaixaTexto("caronte", "Essa é a oportunidade de vencer o seu medo. Enfrente-o e não o ignore. Ele pode ser vencido com ataques precisos ou consentindo com ele.");

  document.addEventListener('keypress', (event) => {
    if(isOnDialog){
      switch(cutsceneStep){
        case 0:
          mostrarCaixaTexto("urucum", " Medo? Consentir com ele, como assim? ");
          cutsceneStep++;
          break;

        case 1:
          mostrarCaixaTexto("caronte", "É doloroso e assustador resistir à realidade de que pessoas que apoiaram sua jornada desapareceram aos poucos, deixando um vazio. Mas você precisa aceitar, é isso que esta te prendendo aqui");
          cutsceneStep++;
          break;

        case 2:
          mostrarCaixaTexto("caronte", "Para derrota-lo você pode disparar contra ele (Space) ou consentir com ele. Aceitar que há existência dele traz consequência e que elas são inevitáveis.");
          cutsceneStep++;
          break;

        case 3:
          mostrarCaixaTexto("caronte", "DICA: Bater de frentes com os desafios pode nos levar ao sucesso.");
          cutsceneStep++;
          break;

        default:
          isOnDialog = false;
          esconderCaixaTexto();
          cutsceneStep++;
          break;
      }
    }
  })
}

function retirarPX(valor) {
  return Number(valor.replace('px', ''))
}

function contagemVida() {
  if (vidaCount == 3) {
    document.getElementById('vidaId').className = "vida_3";
  }
  if (vidaCount == 2) {
    
    document.getElementById('vidaId').className = "vida_2";
  }
  else if (vidaCount == 1) {
    
    document.getElementById('vidaId').className = "vida_1";
  }
  else if (vidaCount == 0) {
    document.getElementById('vidaId').className = "vida_0";
    window.location.href = "./ganhouFasePsicanalista.html"
    personagem.remove();
  }
}

function contagemVida_Inimigo() {
  vidaInimigo = vidaInimigo
  if (vidaInimigo == 2) {
    document.getElementById('vidaInimigoID').className = "vida_inimigo2";
  }
  else if (vidaInimigo == 1) {
    document.getElementById('vidaInimigoID').className = "vida_inimigo1";
  }
  else if (vidaInimigo == 0) {
    document.getElementById('vidaInimigoID').className = "vida_inimigo0";
    inimigo.remove();
    window.location.href = "./ganhouFaseExpositivo.html"
  }
}

function updateColisorInimigo(){
  var movePad1Rect = movePad1.getBoundingClientRect();
  var movePad2Rect = movePad2.getBoundingClientRect();
  var movePad3Rect = movePad3.getBoundingClientRect();
  var movePad4Rect = movePad4.getBoundingClientRect();
  var movePad5Rect = movePad5.getBoundingClientRect();
  var movePad6Rect = movePad6.getBoundingClientRect();
  var movePad7Rect = movePad7.getBoundingClientRect();
  var movePad8Rect = movePad8.getBoundingClientRect();

  inimigoRect = inimigo.getBoundingClientRect();

  if (
    inimigoRect.left < movePad1Rect.right &&
    inimigoRect.right > movePad1Rect.left &&
    inimigoRect.top < movePad1Rect.bottom &&
    inimigoRect.bottom > movePad1Rect.top &&
    lastMovePad != 1
    ){
    lastMovePad = 1;
    console.log("Colidiu com MovePad 1");
    setTimeout(direcaoInimigo = 0, 3000);
    setTimeout(moverInimigo_Nascimento(), 2000);  
  }
  else if (
    inimigoRect.left < movePad2Rect.right &&
    inimigoRect.right > movePad2Rect.left &&
    inimigoRect.top < movePad2Rect.bottom &&
    inimigoRect.bottom > movePad2Rect.top &&
    lastMovePad != 2
  ){
    lastMovePad = 2;
    console.log("Colidiu com MovePad 2");
    let randomNum = Math.floor(Math.random() * 11);
    if(backOne == 0){
      if (randomNum % 2 == 0){
        direcaoInimigo = 2;
        backOne = 1;
      }else{
        direcaoInimigo = 0;
      }
    }else {
      direcaoInimigo = 0;
    }
    
    setTimeout(moverInimigo_Nascimento(), 2000);
  }
  else if (
    inimigoRect.left < movePad3Rect.right &&
    inimigoRect.right > movePad3Rect.left &&
    inimigoRect.top < movePad3Rect.bottom &&
    inimigoRect.bottom > movePad3Rect.top &&
    lastMovePad != 3
  ){
    lastMovePad = 3;
    console.log("Colidiu com MovePad 3");
    let randomNum = Math.floor(Math.random() * 11);
    if(backOne == 0){
      if (randomNum % 2 == 0){
        direcaoInimigo = 3;
        backOne = 1;
      }else{
        direcaoInimigo = 0;
      }
    }else {
      direcaoInimigo = 0;
    }
    setTimeout(moverInimigo_Nascimento(), 2000);
    
  }
  else if (
    inimigoRect.left < movePad4Rect.right &&
    inimigoRect.right > movePad4Rect.left &&
    inimigoRect.top < movePad4Rect.bottom &&
    inimigoRect.bottom > movePad4Rect.top &&
    lastMovePad != 4
  ){
    lastMovePad = 4;
    console.log("Colidiu com MovePad 4");
    setTimeout(direcaoInimigo = 2, 2000);
    setTimeout(moverInimigo_Nascimento(), 2000);
    
  }
  else if (
    inimigoRect.left < movePad5Rect.right &&
    inimigoRect.right > movePad5Rect.left &&
    inimigoRect.top < movePad5Rect.bottom &&
    inimigoRect.bottom > movePad5Rect.top &&
    lastMovePad != 5
  ){
    lastMovePad = 5;
    console.log("Colidiu com MovePad 5");
    let randomNum = Math.floor(Math.random() * 11);
    if (randomNum % 2 == 0){
      direcaoInimigo = 2;
    }else{
      direcaoInimigo = 1;
    }
    backOne = 0;

    setTimeout(moverInimigo_Nascimento(), 2000)
  }
  else if (
    inimigoRect.left < movePad6Rect.right &&
    inimigoRect.right > movePad6Rect.left &&
    inimigoRect.top < movePad6Rect.bottom &&
    inimigoRect.bottom > movePad6Rect.top &&
    lastMovePad != 6
  ){
    lastMovePad = 6;
    console.log("Colidiu com MovePad 6");
    setTimeout(direcaoInimigo = 1, 2000);
    setTimeout(moverInimigo_Nascimento(), 2000);
    
  }
  else if (
    inimigoRect.left < movePad7Rect.right &&
    inimigoRect.right > movePad7Rect.left &&
    inimigoRect.top < movePad7Rect.bottom &&
    inimigoRect.bottom > movePad7Rect.top &&
    lastMovePad != 7
  ){
    lastMovePad = 7;
    console.log("Colidiu com MovePad 7");

    setTimeout(direcaoInimigo = 3, 2000);
    setTimeout(moverInimigo_Nascimento(), 2000);
    
  }
  else if (
    inimigoRect.left < movePad8Rect.right &&
    inimigoRect.right > movePad8Rect.left &&
    inimigoRect.top < movePad8Rect.bottom &&
    inimigoRect.bottom > movePad8Rect.top &&
    lastMovePad != 8
  ){
    lastMovePad = 8;
    console.log("Colidiu com MovePad 8");
    setTimeout(direcaoInimigo = 2, 2000);
    setTimeout(moverInimigo_Nascimento(), 2000);
    
  }
}

function updateColisorPersonagem() {
  var parede1Rect = parede1.getBoundingClientRect();
  var parede1CimaRect = parede1Cima.getBoundingClientRect();
  var parede2Rect = parede2.getBoundingClientRect();
  var parede6Rect = parede6.getBoundingClientRect();
  var parede6CimaRect = parede6Cima.getBoundingClientRect();
  var parede7Rect = parede7.getBoundingClientRect();

  var cantoPretoCimaRect = cantoPretoCima.getBoundingClientRect();
  var cantoPretoBaixoRect = cantoPretoBaixo.getBoundingClientRect();
  var cantoPretoEsquerdaRect = cantoPretoEsquerda.getBoundingClientRect();
  var cantoPretoDireitaRect = cantoPretoDireita.getBoundingClientRect();


  inimigoRect = inimigo.getBoundingClientRect();
  urucumRect = personagem.getBoundingClientRect();

  if (
    urucumRect.left < inimigoRect.right &&
    urucumRect.right > inimigoRect.left &&
    urucumRect.top < inimigoRect.bottom &&
    urucumRect.bottom > inimigoRect.top
  ) {
      damageCheckAudio.play();
      reposicionarInimigo();
      vidaCount--;
      contagemVida();
  }
  else if (
    urucumRect.left < parede1Rect.right &&
    urucumRect.right > parede1Rect.left &&
    urucumRect.top < parede1Rect.bottom &&
    urucumRect.bottom > parede1Rect.top
  ) {
    posicaoVertical += step;
    updatePersonagemPosition();
  }
  else if (
    urucumRect.left < parede1CimaRect.right &&
    urucumRect.right > parede1CimaRect.left &&
    urucumRect.top < parede1CimaRect.bottom &&
    urucumRect.bottom > parede1CimaRect.top
  ) {
    posicaoVertical -= step;
    updatePersonagemPosition();
  }
  else if (
    urucumRect.left < parede2Rect.right &&
    urucumRect.right > parede2Rect.left &&
    urucumRect.top < parede2Rect.bottom &&
    urucumRect.bottom > parede2Rect.top
  ) {
    posicaoHorizontal += step;
    updatePersonagemPosition();
  }
  else if (
    urucumRect.left < parede6Rect.right &&
    urucumRect.right > parede6Rect.left &&
    urucumRect.top < parede6Rect.bottom &&
    urucumRect.bottom > parede6Rect.top
  ) {
    posicaoVertical += step;
    updatePersonagemPosition();
  }
  else if (
    urucumRect.left < parede6CimaRect.right &&
    urucumRect.right > parede6CimaRect.left &&
    urucumRect.top < parede6CimaRect.bottom &&
    urucumRect.bottom > parede6CimaRect.top
  ) {
    posicaoVertical -= step;
    updatePersonagemPosition();
  }
  else if (
    urucumRect.left < parede7Rect.right &&
    urucumRect.right > parede7Rect.left &&
    urucumRect.top < parede7Rect.bottom &&
    urucumRect.bottom > parede7Rect.top
  ) {
    posicaoHorizontal -= step;
    updatePersonagemPosition();
  }
  else if (
    urucumRect.left < cantoPretoEsquerdaRect.right &&
    urucumRect.right > cantoPretoEsquerdaRect.left &&
    urucumRect.top < cantoPretoEsquerdaRect.bottom &&
    urucumRect.bottom > cantoPretoEsquerdaRect.top
  ) {
    posicaoHorizontal += step;
    updatePersonagemPosition();
  }
  else if (
    urucumRect.left < cantoPretoDireitaRect.right &&
    urucumRect.right > cantoPretoDireitaRect.left &&
    urucumRect.top < cantoPretoDireitaRect.bottom &&
    urucumRect.bottom > cantoPretoDireitaRect.top
  ) {
    posicaoHorizontal -= step;
    updatePersonagemPosition();
  }
  else if (
    urucumRect.left < cantoPretoCimaRect.right &&
    urucumRect.right > cantoPretoCimaRect.left &&
    urucumRect.top < cantoPretoCimaRect.bottom &&
    urucumRect.bottom > cantoPretoCimaRect.top
  ) {
    posicaoVertical += step;
    updatePersonagemPosition();
  }
  else if (
    urucumRect.left < cantoPretoBaixoRect.right &&
    urucumRect.right > cantoPretoBaixoRect.left &&
    urucumRect.top < cantoPretoBaixoRect.bottom &&
    urucumRect.bottom > cantoPretoBaixoRect.top
  ) {
    posicaoVertical -= step;
    updatePersonagemPosition();
  }
}

function updatePersonagemPosition() {
  personagem.style.left = posicaoHorizontal + 'px';
  personagem.style.top = posicaoVertical + 'px';
}

function retirarInvensi(){
  inimigoInvensi = false;
}

function checkTiroCollision(tiro) {
  const tiroRect = tiro.getBoundingClientRect();
  const inimigoRect = inimigo.getBoundingClientRect();

  if (
    tiroRect.left < inimigoRect.right &&
    tiroRect.right > inimigoRect.left &&
    tiroRect.top < inimigoRect.bottom &&
    tiroRect.bottom > inimigoRect.top
  ) {
    // * CHECAR SE TÁ INVENCÍVEL
    if(inimigoInvensi == false){
      // * Retirar vida do Inimigo
      tiro.remove();
      vidaInimigo = vidaInimigo - 1;
      contagemVida_Inimigo();
      reposicionarInimigo();
      // * Deixar inimigo invencível
      inimigoInvensi = true;

      
      hitCheckAudio.play();
    }
    // * CASO CONTRÁRIO
    else {
      // * Tirar cooldown depois de intervalo
      setInterval(retirarInvensi, 5000);

      hitCheckAudio.play();
    }
}
}

function atirar() {
  const tiro = document.createElement('div');
  tiro.className = 'tiro';
  let quantTiro = document.querySelectorAll(".tiro");// criar estilo com a classe 'tiro'
  let quantTiroVar = quantTiro.length;
  if(quantTiroVar < 5){
    switch (direcaoPlayer) {
      case 1:
        tiro.style.left = (urucumRect.left+15) + 'px' // Ajusta a posição inicial do tiro
        tiro.style.top = posicaoVertical + 'px';
        document.body.appendChild(tiro);
        moverTiro_Subindo(tiro);
        shootAudio.play();

        break;
      case 2:
        // Ajusta a posição inicial do tiro
        tiro.style.top = (posicaoVertical + 5) + 'px';
        tiro.style.left = (urucumRect.left+15) + 'px';
        document.body.appendChild(tiro);
        moverTiro_Descendo(tiro);
        shootAudio.play();

        break;
      case 3:
        tiro.style.top = (posicaoVertical + 5) + 'px';
        tiro.style.left = (urucumRect.left+15) + 'px';
        document.body.appendChild(tiro);
        moverTiro_Esquerda(tiro);
        shootAudio.play();

        break;
      case 4:
        tiro.style.top = (posicaoVertical + 5) + 'px';
        tiro.style.left = (urucumRect.left+15) + 'px';
        document.body.appendChild(tiro);
        moverTiro_Direita(tiro);
        shootAudio.play();

        break;

  }

}
}

function moverTiro_Subindo(tiro) {
  const tiroPositionY = parseFloat(tiro.style.top);
  tiro.style.top = tiroPositionY - tiroSpeed + 'px';
  checkTiroCollision(tiro)

  // Remove o tiro se ele sair da tela
  if (tiroPositionY < imgFundo.getBoundingClientRect().top) {
    tiro.remove();
  } else {
    requestAnimationFrame(() => moverTiro_Subindo(tiro)); // "desparo" do tiro
    //   
  }
}

function moverTiro_Descendo(tiro) {
  const tiroPositionY = parseFloat(tiro.style.top);
  tiro.style.top = tiroPositionY - tiroSpeed_Descendo + 'px';
  checkTiroCollision(tiro)

  // Remove o tiro se ele sair da tela
  if (tiroPositionY > imgFundo.getBoundingClientRect().bottom) {
    tiro.remove();
  } else {
    requestAnimationFrame(() => moverTiro_Descendo(tiro)); // "desparo" do tiro
    //   checkTiroCollision(tiro);
  }
}

function moverTiro_Esquerda(tiro) {
  const tiroPositionX = parseFloat(tiro.style.left);
  tiro.style.left = tiroPositionX + tiroSpeed_Descendo + 'px';
  checkTiroCollision(tiro)

  // Remove o tiro se ele sair da tela
  if (tiroPositionX < imgFundo.getBoundingClientRect().left) {
    tiro.remove();
  } else {
    requestAnimationFrame(() => moverTiro_Esquerda(tiro)); // "desparo" do tiro
    //   checkTiroCollision(tiro);
  }
}

function moverTiro_Direita(tiro) {
  const tiroPositionX = parseFloat(tiro.style.left);
  tiro.style.left = tiroPositionX - tiroSpeed_Descendo + 'px';
  checkTiroCollision(tiro)

  // Remove o tiro se ele sair da tela
  if (tiroPositionX > imgFundo.getBoundingClientRect().right) {
    tiro.remove();
  } else {
    requestAnimationFrame(() => moverTiro_Direita(tiro)); // "desparo" do tiro
    //   checkTiroCollision(tiro);
  }
}

function moverInimigo_Nascimento() {
  direcaoInimigo = direcaoInimigo;
  // TODO ESQUERDA
  if(direcaoInimigo == 0){
    inimigo.className = "inimigo";
    inimigo.classList.add('monstro_esquerda');
    moverInimigo_esquerda();
  }
  // TODO CIMA
  else if(direcaoInimigo == 1){
    inimigo.className = "inimigo";
    inimigo.classList.add('monstro_cima');
    moverInimigo_cima();
  }
  // TODO DIREITA
  else if(direcaoInimigo == 2){
    inimigo.className = "inimigo";
    inimigo.classList.add('monstro_direita');
    moverInimigo_direita();
  }
  // TODO BAIXO
  else if(direcaoInimigo == 3){
    inimigo.className = "inimigo";
    inimigo.classList.add('monstro_baixo');
    moverInimigo_baixo();
  }

  if (inimigoPositionY > 624) {
    inimigoPositionY = 54
    inimigo.style.top =inimigoPositionY  + 'px';
    inimigo.style.left = `${Math.random() * (window.innerHeight - 50)}px`;
    while((Number(retirarPX(inimigo.style.left))<98 || Number(retirarPX(inimigo.style.left))> 1400)){
      inimigo.style.left = `${Math.random() * (window.innerHeight - 50)}px`;
    } 
  }

  updateColisorInimigo();
  updateColisorPersonagem();
}

function moverInimigo_baixo() {
  inimigo.style.top = inimigoPositionY + 'px';
  inimigoPositionY += 1.0;

  colisorInimigo = 1;


  updateColisorPersonagem();
}

function moverInimigo_cima() {
  inimigo.style.top = inimigoPositionY + 'px';
  inimigoPositionY -= 1.0;

  colisorInimigo = 1;


  updateColisorPersonagem();
}

function moverInimigo_esquerda() {
  inimigo.style.left = inimigoPositionX + 'px';
  inimigoPositionX -= 1.0;

  colisorInimigo = 0;

  updateColisorPersonagem();
}

function moverInimigo_direita() {
  inimigo.style.left = inimigoPositionX + 'px';
  inimigoPositionX += 1.0;

  colisorInimigo = 0;

  updateColisorPersonagem();
}

function reloadGun(){
  isReloading = false;
}

function reposicionarInimigo() {
  var spawnpoint1Rect = spawnpoint1.getBoundingClientRect();
  var spawnpoint2Rect = spawnpoint2.getBoundingClientRect();
  var spawnpoint3Rect = spawnpoint3.getBoundingClientRect();
  var spawnpoint4Rect = spawnpoint4.getBoundingClientRect();
  var spawnpoint5Rect = spawnpoint5.getBoundingClientRect();
  var spawnpoint6Rect = spawnpoint6.getBoundingClientRect();
  var spawnpoint7Rect = spawnpoint7.getBoundingClientRect();
  var spawnpoint8Rect = spawnpoint8.getBoundingClientRect();
  var spawnpoint9Rect = spawnpoint9.getBoundingClientRect();
  var spawnpoint10Rect = spawnpoint10.getBoundingClientRect();

  // let randomSpawn = getRandomInt(1, 10);
  let randomSpawn = 10;

  console.log("Spawn Escolhido foi: " +randomSpawn);

  switch(randomSpawn){
    case 1:
      console.log(spawnpoint1Rect);
      inimigoLeftRect = spawnpoint1Rect.left;
      inimigoTopRect = spawnpoint1Rect.top;
      document.getElementById('inimigo').style.left = inimigoLeftRect + 'px';
      inimigoPositionX = inimigoLeftRect;
      document.getElementById('inimigo').style.top = inimigoTopRect + 'px';
      inimigoPositionY = inimigoTopRect;
      direcaoInimigo = 0;
      lastMovePad = 0;
      break;
    
    case 2:
      console.log(spawnpoint2Rect);
      inimigoLeftRect = spawnpoint2Rect.left;
      inimigoTopRect = spawnpoint2Rect.top;
      document.getElementById('inimigo').style.left = inimigoLeftRect + 'px';
      inimigoPositionX = inimigoLeftRect;
      document.getElementById('inimigo').style.top = inimigoTopRect + 'px';
      inimigoPositionY = inimigoTopRect;
      direcaoInimigo = 0;
      break;

    case 3:
      console.log(spawnpoint3Rect);
      inimigoLeftRect = spawnpoint3Rect.left;
      inimigoTopRect = spawnpoint3Rect.top;
      document.getElementById('inimigo').style.left = inimigoLeftRect + 'px';
      inimigoPositionX = inimigoLeftRect;
      document.getElementById('inimigo').style.top = inimigoTopRect + 'px';
      inimigoPositionY = inimigoTopRect;
      direcaoInimigo = 0;
      lastMovePad = 0;
      break;
    
    case 4:
      console.log(spawnpoint4Rect);
      inimigoLeftRect = spawnpoint4Rect.left;
      inimigoTopRect = spawnpoint4Rect.top;
      document.getElementById('inimigo').style.left = inimigoLeftRect + 'px';
      inimigoPositionX = inimigoLeftRect;
      document.getElementById('inimigo').style.top = inimigoTopRect + 'px';
      inimigoPositionY = inimigoTopRect;
      direcaoInimigo = 1;
      lastMovePad = 0;
      break;

    case 5:
      console.log(spawnpoint5Rect);
      inimigoLeftRect = spawnpoint5Rect.left;
      inimigoTopRect = spawnpoint5Rect.top;
      document.getElementById('inimigo').style.left = inimigoLeftRect + 'px';
      inimigoPositionX = inimigoLeftRect;
      document.getElementById('inimigo').style.top = inimigoTopRect + 'px';
      inimigoPositionY = inimigoTopRect;
      direcaoInimigo = 1;
      lastMovePad = 0;
      break;

    case 6:
      console.log(spawnpoint6Rect);
      inimigoLeftRect = spawnpoint6Rect.left;
      inimigoTopRect = spawnpoint6Rect.top;
      document.getElementById('inimigo').style.left = inimigoLeftRect + 'px';
      inimigoPositionX = inimigoLeftRect;
      document.getElementById('inimigo').style.top = inimigoTopRect + 'px';
      inimigoPositionY = inimigoTopRect;
      direcaoInimigo = 1;
      lastMovePad = 0;
      break;
    
    case 7:
      console.log(spawnpoint7Rect);
      inimigoLeftRect = spawnpoint7Rect.left;
      inimigoTopRect = spawnpoint7Rect.top;
      document.getElementById('inimigo').style.left = inimigoLeftRect + 'px';
      inimigoPositionX = inimigoLeftRect;
      document.getElementById('inimigo').style.top = inimigoTopRect + 'px';
      inimigoPositionY = inimigoTopRect;
      direcaoInimigo = 3;
      lastMovePad = 0;
      break;

    case 8:
      console.log(spawnpoint8Rect);
      inimigoLeftRect = spawnpoint8Rect.left;
      inimigoTopRect = spawnpoint8Rect.top;
      document.getElementById('inimigo').style.left = inimigoLeftRect + 'px';
      inimigoPositionX = inimigoLeftRect;
      document.getElementById('inimigo').style.top = inimigoTopRect + 'px';
      inimigoPositionY = inimigoTopRect;
      direcaoInimigo = 2;
      lastMovePad = 0;
      break;

    case 9:
      console.log(spawnpoint9Rect);
      inimigoLeftRect = spawnpoint9Rect.left;
      inimigoTopRect = spawnpoint9Rect.top;
      document.getElementById('inimigo').style.left = inimigoLeftRect + 'px';
      inimigoPositionX = inimigoLeftRect;
      document.getElementById('inimigo').style.top = inimigoTopRect + 'px';
      inimigoPositionY = inimigoTopRect;
      direcaoInimigo = 2;
      lastMovePad = 0;
      break;

    case 10:
      console.log(spawnpoint10Rect);
      inimigoLeftRect = spawnpoint10Rect.left;
      inimigoTopRect = spawnpoint10Rect.top;
      document.getElementById('inimigo').style.left = inimigoLeftRect + 'px';
      inimigoPositionX = inimigoLeftRect;
      document.getElementById('inimigo').style.top = inimigoTopRect + 'px';
      inimigoPositionY = inimigoTopRect;
      direcaoInimigo = 2;
      lastMovePad = 0;
      break;

  }

}

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':

      posicaoVertical -= step;
      personagem.className = "urucum";
      personagem.classList.add("sprite_urucum_andando_cima");
      movementAudio.play();

      direcaoPlayer = 1;

      break;
    case 'ArrowDown':

      posicaoVertical += step;
      personagem.className = "urucum";
      personagem.classList.add("sprite_urucum_andando_baixo");
      movementAudio.play();

      direcaoPlayer = 2;

      break;
    case 'ArrowLeft':

      posicaoHorizontal -= step;
      personagem.className = "urucum";
      personagem.classList.add("sprite_urucum_andando_esquerda");
      movementAudio.play();

      direcaoPlayer = 3;

      break;
    case 'ArrowRight':

      posicaoHorizontal += step;
      personagem.className = "urucum";
      personagem.classList.add("sprite_urucum_andando_direita");
      movementAudio.play();

      direcaoPlayer = 4;

      break;

    case 'o':
      reposicionarInimigo();
      break;

    case ' ':
      if (blockAtirar == 0){
        if (isReloading == true){
          setTimeout(reloadGun(), 8000)
        }else{
          
          setTimeout(atirar(), 5000)
        }
        blockAtirar = 1;
      }
      
      break;
  }

  if(musicOn == false){
    hitCheckAudio.volume = 0.1;
    movementAudio.volume = 1.0;
    shootAudio.volume = 0.08;
    damageCheckAudio.volume = 0.15;

    backgroundAudio.loop = true; // Para que o som repita continuamente
    backgroundAudio.volume = 0.1;
    backgroundAudio.play();
    musicOn = true;
  }
  
  updatePersonagemPosition();
}
)

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

document.addEventListener('DOMContentLoaded', (event) => {
  setInterval(moverInimigo_Nascimento, () => {
  });
  
})

document.addEventListener('keyup', (event) => {
  if (event.key == 'ArrowUp' || event.key == 'ArrowDown' || event.key == 'ArrowLeft' || event.key == 'ArrowRight') {
    if (direcaoPlayer == 1) {
      console.log("Direção (cima): " + direcaoPlayer)
      personagem.className = "urucum sprite_urucum_idle_cima";
    }
    else if (direcaoPlayer == 2) {
      console.log("Direção: (baixo)" + direcaoPlayer)
      personagem.className = "urucum sprite_urucum_idle";
    }
    else if (direcaoPlayer == 3) {
      console.log("Direção: (esquerda)" + direcaoPlayer)
      personagem.className = "urucum sprite_urucum_idle_esquerda";
    }
    else if (direcaoPlayer == 4) {
      console.log("Direção: (direita)" + direcaoPlayer)
      personagem.className = "urucum sprite_urucum_idle_direita";
    }
  }
  else if(event.key == ' '){
    setTimeout(blockAtirar = 0, 10000);
  }
})