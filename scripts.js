// Função para formatar o valor do CNPJ com pontos, barra e traço
function formatCNPJ(input) {
  input.value = input.value
    .replace(/\D/g, "") // Remove todos os caracteres não numéricos, mantendo apenas os dígitos.
    .substring(0, 14) // Limita o comprimento do valor para 14 dígitos.
    .replace(/(\d{2})(\d)/, "$1.$2") // Adiciona um ponto após os dois primeiros dígitos.
    .replace(/(\d{3})(\d)/, "$1.$2") // Adiciona um ponto após os cinco primeiros dígitos.
    .replace(/(\d{3})(\d)/, "$1/$2") // Adiciona uma barra após os oito primeiros dígitos.
    .replace(/(\d{4})(\d{1,2})$/, "$1-$2"); // Adiciona um traço após os doze primeiros dígitos.
}

// Função para validar o CNPJ com base em seus dígitos verificadores
function validarCNPJ(cnpj) {
  cnpj = cnpj.replace(/\D/g, ""); // Remove caracteres não numéricos.
  if (cnpj.length !== 14) return false; // Verifica se o comprimento do CNPJ é exatamente 14 dígitos.

  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  // Calcula o primeiro dígito verificador
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(0))) return false; // Valida o primeiro dígito verificador.

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  // Calcula o segundo dígito verificador
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(1))) return false; // Valida o segundo dígito verificador.

  return true; // Retorna verdadeiro se ambos os dígitos verificadores forem válidos.
}

// Função para consultar informações de um CNPJ e exibir mensagens de erro ou sucesso
function consultarCNPJ() {
  const cnpjInput = document.getElementById("cnpj");
  const cnpj = cnpjInput.value.replace(/\D/g, ""); // Remove caracteres não numéricos.
  const errorMessage = document.getElementById("error-message");
  const successMessage = document.getElementById("success-message");

  if (!validarCNPJ(cnpj)) {
    errorMessage.style.display = "block"; // Exibe a mensagem de erro se o CNPJ for inválido.
    successMessage.style.display = "none";
    return; // Retorna se o CNPJ for inválido.
  }

  errorMessage.style.display = "none";

  // Faz uma requisição à API para buscar informações sobre o CNPJ
  fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("CNPJ não encontrado."); // Lança um erro se a resposta da API não for ok.
      }
      return response.json(); // Converte a resposta em JSON.
    })
    .then((data) => {
      exibirDados(data); // Exibe os dados da empresa.
      document.getElementById("generate-pdf").style.display = "block"; // Exibe o botão para gerar PDF.
    })
    .catch((error) => {
      console.error("Erro ao consultar CNPJ:", error);
      errorMessage.style.display = "block";
      errorMessage.innerText =
        "CNPJ inválido. Por favor, verifique e tente novamente.";
      successMessage.style.display = "none";
    });
}

// Função para formatar a data no formato DD/MM/AAAA
function formatarData(data) {
  const [ano, mes, dia] = data.split("-"); // Divide a string da data em ano, mês e dia.
  return `${dia}/${mes}/${ano}`; // Retorna a data no formato DD/MM/AAAA.
}

// Função para exibir os dados da empresa
function exibirDados(data) {
  const companyInfo = document.getElementById("cnpj-info");

  // Função auxiliar para formatar dados de forma condicional
  function formatField(label, value) {
    return value
      ? `<div class="line-info" contenteditable="true" onblur="atualizarCampo(this, '${label}')"><strong>${label}:</strong> <span class="editavel">${value}</span></div>`
      : ""; // Retorna o HTML para o campo formatado se o valor não for nulo.
  }

  // Função auxiliar para formatar dados dos sócios
  function formatPartners(partners) {
    return partners && partners.length > 0
      ? `
              <h3 class="mt-4">Sócios</h3>
              ${partners
                .map(
                  (socio) => `
                <div class="socios-card">
                  ${formatField("Nome", socio.nome_socio)}
                  ${formatField("Qualificação", socio.qualificacao_socio)}
                </div>
              `
                )
                .join("")}
          `
      : '<h3 class="mt-4">Sócios</h3><p class="text-muted">Nenhum sócio encontrado.</p>'; // Exibe uma mensagem se não houver sócios.
  }

  // Constrói e insere o HTML para exibir informações detalhadas da empresa
  companyInfo.innerHTML = `
      <h2>Dados da Empresa</h2>
      ${formatField("Nome", data.nome_fantasia)}
      ${formatField("Razão Social", data.razao_social)}
      ${formatField(
        "Data de Abertura",
        formatarData(data.data_inicio_atividade)
      )}
      ${formatField("Situação", data.situacao_cadastral)}
      ${formatField("Atividade Principal", data.cnae_fiscal_descricao)}
      ${formatField(
        "Endereço Completo",
        `${data.logradouro}, ${data.numero} - ${data.bairro}, ${data.municipio} - ${data.uf}, ${data.cep}`
      )}
      ${formatField("Telefone", data.ddd_telefone_1)}
      ${formatField("E-mail", data.email)}
      ${formatPartners(data.qsa)}
  
      <div class="d-flex justify-content-center align-intens-center">
        <button class="btn btn-success mx-2 mt-3" onclick="salvarDados()">Atualizar dados</button>
        <button class="btn btn-secondary mt-3 mx-2" id="generate-pdf" style="display: none" onclick="gerarPDF()">Baixar consulta</button>
      </div>`;

  // Exibe o botão para gerar PDF após carregar os dados
  document.getElementById("generate-pdf").style.display = "block";
}

// Função para atualizar um campo editável
function atualizarCampo(element, label) {
  // Aqui você pode adicionar lógica para atualizar o campo no servidor
  console.log(`Campo ${label} atualizado para: ${element.innerText}`);
}

// Função para exibir uma mensagem de sucesso e opcionalmente ocultá-la após alguns segundos
function salvarDados() {
  const successMessage = document.getElementById("success-message");
  const errorMessage = document.getElementById("error-message");

  // Oculta a mensagem de erro, se estiver visível
  if (errorMessage.style.display === "block") {
    errorMessage.style.display = "none";
  }

  // Exibe a mensagem de sucesso
  successMessage.style.display = "block";

  // Opcional: Oculta a mensagem de sucesso após alguns segundos
  setTimeout(() => {
    successMessage.style.display = "none";
  }, 3000); // Esconde após 3 segundos
}

// Função para gerar e baixar o PDF com os dados da empresa
function gerarPDF() {
  const companyInfo = document.getElementById("cnpj-info");
  const btnUpdate = document.querySelector(".btn-success");
  const btnDownload = document.getElementById("generate-pdf");

  // Oculta os botões antes de gerar o PDF
  btnUpdate.style.display = "none";
  btnDownload.style.display = "none";

  const opt = {
    margin: [10, 10, 10, 10],
    filename: "consulta-cnpj.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  // Gera o PDF com as opções configuradas
  html2pdf()
    .set(opt)
    .from(companyInfo)
    .toPdf()
    .get("pdf")
    .then(function (pdf) {
      // Após a geração do PDF, restaura a exibição dos botões
      btnUpdate.style.display = "inline-block";
      btnDownload.style.display = "inline-block";
    })
    .save(); // Salva o PDF gerado
}
