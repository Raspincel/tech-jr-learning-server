# Tech Jr Learning Server

Projeto desenvolvido com o propósito de dar um espaço para membros da Tech Jr (e, possivelmente, alunos do Instituto Federal do Maranhão no geral), especialmente aqueles que estão iniciando seus estudos em servidores e requisições ao backend, praticarem algumas requisições sem precisarem tocar em uma única linha de código. Dessa forma, é possível explorar conceitos como:
*   O uso de diferentes métodos para realizar diferentes requisições, mesmo em um mesmo endereço
*   O envio de tokens para autenticação nos _headers_, e outras informações necessária para realizar a requisição com sucesso no _body_
*   O uso de parâmetros para passar diferentes informações que alteram o objeto retornado da requisição
*   JSON, ciclo de vida de um token, aprendendo a ler a documentação, etc.

Existem 9 rotas disponíveis para acesso. Todas elas são, obviamente, precedidas pela URL do local em que o servidor está rodando.

## '/users/register'
É uma das rotas mais importantes, visto que é possível possuir uma conta para acessar qualquer outra rota.
### Infos
  **método**: *POST*  
  **body**: Requer o envio do e-mail acadêmico, o nome (não necessariamente o nome real) do indivíduo e uma senha. Para que seja aprovada, a senha não possui tamanho mínimo ou necessidade de caracteres especiais, dada a trivialidade da aplicação.
  **retorno**: 
*   Em caso de sucesso:
    * Status: 201
    * Retorna um objeto JSON contendo as informações do usuário recém-cadastrado, com exceção da sua senha.
*   Ao deixar de enviar email, senha ou nome no _body_ da requisição:
    * Status: 400
    * Retorna um objeto JSON com informações sobre quais campos estão faltando
*   Caso não envie o próprio e-mail acadêmico:
    * Status: 401
    * Retorna um objeto JSON com informações sobre o motivo de o e-mail não ser aceito
*   Ao tentar cadastrar-se com um e-mail que já está sendo utilizado por outra conta:
    * Status: 409
    * Retorna um objeto JSON com o motivo de a requisição ter falhado.

## '/users/login'
É outra rota bastante importante, sendo o token que retorna necessário para acessar quase todas as rotas.
### Infos
  **método**: *POST*  
  **body**: Requer o envio do e-mail e senha com os quais o usuário se cadastrou.
  **retorno**: 
*   Em caso de sucesso:
    * Status: 200
    * Retorna um token codificado que o usuário pode utilizar para validar sua identidade em outras requisições
*   Ao deixar de enviar email ou senha no _body_ da requisição:
    * Status: 400
    * Retorna um objeto JSON com informações sobre quais campos estão faltando
*   Ao enviar um e-mail que não foi registrado anteriormente:
    * Status: 404
    * Retorna um objeto JSON com o motivo de a requisição ter falhado, e instruções sobre como prosseguir.

