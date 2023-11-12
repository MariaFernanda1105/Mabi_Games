// Obtém referências para os elementos do DOM
const loginLink = document.getElementById("login_page");
const loginPopup = document.getElementById("loginPopup");
const loginForm = document.getElementById("loginForm");
const nicknameInput = document.getElementById("Nick_input");
const senhaInput = document.getElementById("Senha_input");
const ConfirmarSenhaInput = document.getElementById("Confirmar_Senha_input");

// Adiciona um ouvinte de evento para exibir o popup de login ao clicar no link de login
loginLink.addEventListener("click", function(event) {
    event.preventDefault();
    loginPopup.style.display = "block";
});

// Adiciona um ouvinte de evento para validar o formulário de login antes de recarregar a página
loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // Validação do formulário
    if (nicknameInput.value.length <= 3) {
        alert("O nickname deve ter mais de 3 caracteres.");
    } else if (senhaInput.value.length <= 2) {
        alert("A senha deve conter pelo menos dois caracteres.");
    } else if (senhaInput.value !== ConfirmarSenhaInput.value) {
        alert("As senhas não coincidem.");
    } else {
        // Recarrega a página se o formulário for válido
        location.reload();
    }
});

// Seleciona todos os sliders de imagem
const sliders = document.querySelectorAll('.imageSlider');

// Função para rotacionar as imagens nos sliders
function rotateImages() {
    const activeSlider = document.querySelector('.imageSlider.active');
    activeSlider.classList.remove('active');

    const nextSlider = activeSlider.nextElementSibling || sliders[0];
    nextSlider.classList.add('active');
}

// Configura um intervalo para chamar a função rotateImages a cada 3000 milissegundos (3 segundos)
setInterval(rotateImages, 3000);

// JavaScript para tornar as imagens de redes sociais clicáveis
document.addEventListener("DOMContentLoaded", function () {
    const redesSociais = document.querySelectorAll('.redes-sociais img');

    // Adiciona um ouvinte de evento para abrir as redes sociais em uma nova guia ao clicar nas imagens
    redesSociais.forEach(function (icone) {
        icone.addEventListener('click', function () {
            const urlRedeSocial = icone.parentElement.getAttribute('href');
            window.open(urlRedeSocial, '_blank');
        });
    });
});

function compartilharWhatsApp() {
    const texto = encodeURIComponent("Venha olhar essa página que eu fiz!");
    const url = encodeURIComponent(window.location.href);

    // Cria o link de compartilhamento do WhatsApp
    const whatsappLink = `https://api.whatsapp.com/send?text=${texto}%20${url}`;

    // Abre o link no WhatsApp em uma nova janela ou guia
    window.open(whatsappLink, '_blank');
}

// Adiciona um ouvinte de evento ao botão
document.getElementById('whatsappShareButton').addEventListener('click', compartilharWhatsApp);
