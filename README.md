# Consulta CNPJ

## Descrição

Este projeto é uma aplicação web que permite a consulta de informações de empresas pelo CNPJ. A aplicação formata e valida o CNPJ inserido, realiza uma consulta a uma API pública e exibe os dados da empresa. Além disso, permite salvar os dados em um arquivo PDF.

## Funcionalidades

- **Consulta de CNPJ**: Permite pesquisar informações de uma empresa a partir de seu CNPJ.
- **Formatação e Validação**: Formata e valida o CNPJ inserido para garantir que está correto.
- **Exibição de Dados**: Exibe os dados da empresa pesquisada, incluindo informações como nome, razão social, endereço e sócios.
- **Atualização dos Dados**: Permite atualizar os dados diretamente na interface.
- **Geração de PDF**: Possibilita baixar os dados da empresa em um arquivo PDF.

## Tecnologias Utilizadas

- **HTML**: Estrutura da página.
- **CSS**: Estilo e layout da aplicação.
- **JavaScript**: Funcionalidades interativas e manipulação de dados.
- **Bootstrap**: Framework CSS para design responsivo.
- **html2pdf.js**: Biblioteca para gerar PDFs a partir de HTML.

## Instalação

Para rodar o projeto localmente, siga estas etapas:

1. **Clone o Repositório**

   ```bash
   git clone https://github.com/seu-usuario/consulta-cnpj.git

2. **Navegue até o Diretório do Projeto**

   ```bash
   cd consulta-cnpj

3. **Abra o Arquivo index.html no Navegador**

O projeto não requer instalação de dependências adicionais. Basta abrir o arquivo index.html em um navegador para executar a aplicação.

## Como Funciona

1. **Inserção do CNPJ**: O usuário insere o CNPJ no campo de entrada e clica no botão "Consultar". O CNPJ é formatado e validado automaticamente.
2. **Validação**: O sistema valida o formato do CNPJ para garantir que ele esteja correto. Se o CNPJ for inválido, uma mensagem de erro será exibida na interface.
3. **Consulta à API**: Se o CNPJ for válido, uma requisição é feita para a API pública `https://brasilapi.com.br/api/cnpj/v1/${cnpj}` para buscar informações da empresa.
4. **Exibição de Dados**: Os dados retornados da API são exibidos na tela, incluindo informações como nome da empresa, razão social, endereço, telefone e e-mail. O usuário pode atualizar as informações diretamente na interface.
5. **Geração de PDF**: O usuário pode gerar um PDF com as informações da empresa usando a funcionalidade de exportação. O PDF é gerado através da biblioteca `html2pdf.js` e inclui todos os dados exibidos na interface, exceto os botões de ação.

## Deploy

Para realizar o deploy da aplicação em um servidor web, siga estas etapas:

1. **Prepare o Projeto**: Certifique-se de que todos os arquivos necessários (`index.html`, `style.css`, `script.js`) estão prontos para publicação.

2. **Escolha uma Plataforma de Hospedagem**: Você pode usar qualquer plataforma de hospedagem de sites estáticos. Algumas opções populares são:

   - **GitHub Pages**: Ideal para projetos de código aberto e hospedagem simples de sites estáticos.
     - Para hospedar seu site no GitHub Pages, faça o push do código para um repositório público e configure a seção de GitHub Pages nas configurações do repositório.
   - **Netlify**: Oferece uma solução de hospedagem simples e gratuita para sites estáticos.
     - Faça o upload do seu projeto ou conecte seu repositório Git para um deploy contínuo.
   - **Vercel**: Outra plataforma de hospedagem para sites estáticos, com integração fácil com repositórios Git.
     - Similar ao Netlify, você pode fazer o upload do seu projeto ou conectar seu repositório Git para deploy contínuo.

3. **Configuração do Servidor**: Se estiver usando um servidor web, como Apache ou Nginx, configure-o para servir os arquivos estáticos. Certifique-se de que o servidor está configurado para servir o arquivo `index.html` como a página inicial.

## Contato

Para dúvidas, sugestões ou qualquer outra questão:

- **E-mail**: carlosmonteirocontato@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/monteiro-carlos/

---

Obrigado por conferir o projeto!