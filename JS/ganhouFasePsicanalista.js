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
    mostrarCaixaTexto("caronte", "Parabéns, você foi muito corajoso nessa jornada!");
  
    document.addEventListener('keypress', (event) => {
      if(isOnDialog){
        switch(cutsceneStep){
          case 0:
            mostrarCaixaTexto("caronte", "Você teve força de vontade e, por causa disso, conseguiu superar os obstáculos que apareceram em seu caminho.");
            cutsceneStep++;
            break;
  
          case 1:
            mostrarCaixaTexto("caronte", "Mesmo sendo contraintuitivo, você decidiu encarar o perigo de frente...");
            cutsceneStep++;
            break;
  
          case 2:
            mostrarCaixaTexto("caronte", "E isso o levou à paz consigo mesmo, aceitando seus defeitos como parte de quem você é.");
            cutsceneStep++;
            break;
  
          case 3:
            mostrarCaixaTexto("caronte", "Agora é a minha vez. Te levarei para o outro lado do rio Aqueronte para que você possa desfrutar do paraíso. Você pode descansar agora.");
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