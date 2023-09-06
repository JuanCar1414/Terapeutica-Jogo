var isOnDialog = false;
var cutsceneStep = 0;

const imgCaronte = document.getElementById("caronte");

const victorySong = new Audio ('./Audio/venceu.mp3');
victorySong.volume = 0.1;

// * Criar Const do container
const mensagemContainer = document.getElementById("msgContainer");
// * Criar const do novo elemento (texto)
const mensagemText = document.createElement("div")
// * Criar const do lado direito da div Container
const ladoDireitoText = document.getElementById("ladoDireitoContainerMSG");

sequenciaDialogos();

function sequenciaDialogos(){
    isOnDialog = true;
    mostrarCaixaTexto("caronte", "Parabéns, você conseguiu lidar com os seus traumas!");
  
    document.addEventListener('keypress', (event) => {
      if(isOnDialog){
        switch(cutsceneStep){
          case 0:
            mostrarCaixaTexto("caronte", "Ao enfrentar, de frente, os fantasmas do seu passado, você conseguiu subjugar os pensamentos que tanto te assolavam.");
            cutsceneStep++;
            break;
  
          case 1:
            mostrarCaixaTexto("caronte", "Agora que você completou esse longo e difícil processo, eu diria que você está preparado...");
            cutsceneStep++;
            break;
  
          case 2:
            mostrarCaixaTexto("caronte", "A partir daqui, é minha vez de fazer o trabalho.");
            cutsceneStep++;
            break;
  
          case 3:
            mostrarCaixaTexto("caronte", "Te levarei para o outro lado do rio Aqueronte... para o paraíso!");
            cutsceneStep++;
            break;
  
          default:
            isOnDialog = false;
            esconderCaixaTexto();
            cutsceneStep++;

            imgCaronte.remove();

            const textoVitoria = document.createElement('div');
            textoVitoria.textContent = "Parabéns!!!"
            textoVitoria.className = "textoVitoria";
            document.body.appendChild(textoVitoria);

            victorySong.play();
            break;
  
  
        }
      }
    })
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