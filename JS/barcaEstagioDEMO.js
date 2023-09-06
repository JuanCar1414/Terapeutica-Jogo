const personagem = document.getElementById('urucum');
const caronte = document.getElementById('caronte');
const parede1 = document.getElementById('paredeSuperior');
const parede2 = document.getElementById('paredeInferior');
const saidaParede = document.getElementById('saida');

const backgroundAudio = new Audio('./Audio/barca.mp3');

var musicOnBarca = false;

var isOnDialog = false;
var cutsceneStep = 0;

// * Criar Const do container
const mensagemContainer = document.getElementById("msgContainer");
// * Criar const do novo elemento (texto)
const mensagemText = document.createElement("div")
// * Criar const do lado direito da div Container
const ladoDireitoText = document.getElementById("ladoDireitoContainerMSG");

let posicaoHorizontal = 661;
let posicaoVertical = 270;
const step = 6;

console.log(personagem.getBoundingClientRect());

sequenciaDialogos()

function sequenciaDialogos(){
  isOnDialog = true;
  mostrarCaixaTexto("urucum", "Ugh.. onde... estou...?");

  document.addEventListener('keypress', (event) => {
    if(isOnDialog){
      switch(cutsceneStep){
        case 0:
          mostrarCaixaTexto("caronte", "Você morreu.");
          cutsceneStep++;
          break;

        case 1:
          mostrarCaixaTexto("urucum", "Como assim eu morri?");
          cutsceneStep++;
          break;

        case 2:
          mostrarCaixaTexto("caronte", "Simplesmente morreu. No momento você está atravessando o rio Aqueronte, o rio que separa a vida da morte, mas há um problema!");
          cutsceneStep++;
          break;

        case 3:
          mostrarCaixaTexto("urucum", "Eu vivi tão pouco... \n Que tipo de problema?");
          cutsceneStep++;
          break;

        case 4:
          mostrarCaixaTexto("caronte", "Você possui assuntos não resolvidos. Traumas que te afetaram muito enquanto você estava vivo e, mesmo assim, você não teve coragem de tentar resolvê-los.");
          cutsceneStep++;
          break;

        case 5:
          mostrarCaixaTexto("urucum", "Eu achei que teria mais tempo... \n Agora é tarde demais para chorar por leite derramado.");
          cutsceneStep++;
          break;

        case 6:
          mostrarCaixaTexto("caronte", "Eu te ajudarei a enfrentar os seus problemas, siga para o canto oposto da barca. (Lado Esquerdo da Tela)");
          cutsceneStep++;
          break;

        case 7:
          mostrarCaixaTexto("urucum", "Certo, muito obrigado!");
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

function ladoErradoDialogo(){
  isOnDialog = true;
  mostrarCaixaTexto("caronte", "O outro lado, Urucum!");
  document.addEventListener('keypress', () => {
    esconderCaixaTexto();
  })
}

function htmlColisao (){
  window.location.href = "./urucumEstagio.html"
}

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

function updatePositionColisor(){
  parede1Rect = parede1.getBoundingClientRect();
  parede2Rect = parede2.getBoundingClientRect();
  urucumRect = personagem.getBoundingClientRect();
  caronteRect = caronte.getBoundingClientRect();
  saidaParedeRect = saidaParede.getBoundingClientRect();
  
  if (
    urucumRect.left < parede1Rect.right &&
    urucumRect.right > parede1Rect.left &&
    urucumRect.top < parede1Rect.bottom &&
    urucumRect.bottom > parede1Rect.top
  ) {
    posicaoVertical += step;
  }
  else if (
  urucumRect.left < parede2Rect.right &&
  urucumRect.right > parede2Rect.left &&
  urucumRect.top < parede2Rect.bottom &&
  urucumRect.bottom > parede2Rect.top
  ) {
  posicaoVertical -= step;
  }
  else if (
    urucumRect.left < caronteRect.right &&
    urucumRect.right > caronteRect.left &&
    urucumRect.top < caronteRect.bottom &&
    urucumRect.bottom > caronteRect.top
  ){
    posicaoHorizontal -=step;
    ladoErradoDialogo();
  }
  else if (
    urucumRect.left < saidaParedeRect.right &&
    urucumRect.right > saidaParedeRect.left &&
    urucumRect.top < saidaParedeRect.bottom &&
    urucumRect.bottom > saidaParedeRect.top
  ){
    htmlColisao();
  }
}

function updatePersonagemPosition() {
  personagem.style.left = posicaoHorizontal + 'px';
  personagem.style.top = posicaoVertical + 'px';

  console.log(personagem.getBoundingClientRect())
}

if (posicaoHorizontal == 0 && posicaoVertical == 0) {
  posicaoHorizontal = 661;
  posicaoVertical = 270;
}

document.addEventListener('keydown', (event) => {
  if(musicOnBarca == false){
    backgroundAudio.loop = true;
    backgroundAudio.volume = 0.09;
    backgroundAudio.play();

    musicOnBarca = true;
  }
  if(isOnDialog == false){
    switch (event.key) {
      case 'ArrowUp':
  
        posicaoVertical -= step;
        personagem.className = "personagem_urucum";
        personagem.classList.add("sprite_urucum_andando_cima");
  
  
        direcaoPlayer = 1;
  
        break;
      case 'ArrowDown':
  
        posicaoVertical += step;
        personagem.className = "personagem_urucum";
        personagem.classList.add("sprite_urucum_andando_baixo");
  
        direcaoPlayer = 2;
  
        break;
      case 'ArrowLeft':
  
        posicaoHorizontal -= step;
        personagem.className = "personagem_urucum";
        personagem.classList.add("sprite_urucum_andando_esquerda");
  
  
        direcaoPlayer = 3;
  
        break;
      case 'ArrowRight':
  
        posicaoHorizontal += step;
        personagem.className = "personagem_urucum";
        personagem.classList.add("sprite_urucum_andando_direita");
  
        direcaoPlayer = 4;
  
        break;
    }
  }

  // * Passar Diálogo

  switch(event.key){
    case 'j':

      break;
  }

    updatePositionColisor()
    updatePersonagemPosition();
});

document.addEventListener('keyup', (event) => {
  if(event.key == 'ArrowUp' || event.key == 'ArrowDown' || event.key == 'ArrowLeft' || event.key == 'ArrowRight'){
    if(direcaoPlayer == 1){
        console.log("Direção (cima): " +direcaoPlayer)
        personagem.className = "sprite_urucum_idle_cima personagem_urucum";
    }
    else if(direcaoPlayer == 2){
        console.log("Direção: (baixo)" +direcaoPlayer)
        personagem.className = "sprite_urucum_idle personagem_urucum";
    }
    else if(direcaoPlayer == 3){
        console.log("Direção: (esquerda)" +direcaoPlayer)
        personagem.className = "sprite_urucum_idle_esquerda personagem_urucum";
    }
    else if(direcaoPlayer == 4){
        console.log("Direção: (direita)" +direcaoPlayer)
        personagem.className = "sprite_urucum_idle_direita personagem_urucum";
    }
    
}
})