# Tech Jr Learning Server

Projeto desenvolvido com o propósito de dar um espaço para membros da Tech Jr (e, possivelmente, alunos do Instituto Federal do Maranhão no geral), especialmente aqueles que estão iniciando seus estudos em servidores e requisições ao backend, praticarem algumas requisições sem precisarem tocar em uma única linha de código. Dessa forma, é possível explorar conceitos como:
*   O uso de diferentes métodos para realizar diferentes requisições, mesmo em um mesmo endereço
*   O envio de tokens para autenticação nos _headers_, e outras informações necessária para realizar a requisição com sucesso no _body_
*   O uso de parâmetros para passar diferentes informações que alteram o objeto retornado da requisição
*   JSON, ciclo de vida de um token, aprendendo a ler a documentação, etc.

Existem 9 rotas disponíveis para acesso. Todas elas são, obviamente, precedidas pela URL do local em que o servidor está rodando.

## '/user/register'
É uma das rotas mais importantes, visto que é preciso possuir uma conta para acessar qualquer outra rota.
### Infos
  **método**: *POST*  
  **body**: Requer o envio do e-mail acadêmico, o nome (não necessariamente o nome real) do indivíduo e uma senha. Para que seja aprovada, a senha não possui tamanho mínimo ou necessidade de caracteres especiais, dada a trivialidade da aplicação.  
  **retorno**:
*   Em caso de sucesso:
    * Status: 201
    * Retorna um objeto JSON contendo as informações do usuário recém-cadastrado, com exceção da sua senha.
*   Ao deixar de enviar e-mail, senha ou nome no _body_ da requisição:
    * Status: 400
    * Retorna um objeto JSON com informações sobre quais campos estão faltando
*   Caso não envie o próprio e-mail acadêmico:
    * Status: 401
    * Retorna um objeto JSON com informações sobre o motivo de o e-mail não ser aceito
*   Ao tentar cadastrar-se com um e-mail que já está sendo utilizado por outra conta:
    * Status: 409
    * Retorna um objeto JSON com o motivo de a requisição ter falhado.

# '/user/login'
  **método**: *POST*  
  **body**: Requer o envio do e-mail e senha com os quais o usuário se cadastrou.  
  **retorno**:
*   Em caso de sucesso:
    * Status: 200
    * Retorna um token codificado que o usuário pode utilizar para validar sua identidade em outras requisições
*   Ao deixar de enviar e-mail ou senha no _body_ da requisição:
    * Status: 400
    * Retorna um objeto JSON com informações sobre quais campos estão faltando
*   Ao enviar um e-mail que não foi registrado anteriormente:
    * Status: 404
    * Retorna um objeto JSON afirmando que não existe conta associada ao e-mail enviado.

# '/user'
  **método**: *DELETE*  
  **headers**: Requer o envio de um token de autenticação em Authorization. Exemplo: "Authorization": "Bearer ${token}"  
  **retorno**:
*   Em caso de sucesso:
    * Status: 200
    * Não retorna nada  
*   Ao deixar de enviar um token no headers:
    * Status: 401
    * Retorna uma mensagem de erro afirmando que as credenciais para realizar a operação são inválidas, com um lembrete de que talvez a ausência de um token seja o problema
*   Ao enviar um token inválido:
    * Status: 404
    * Retorna uma mensagem de erro afirmando que não há usuário no registrado associado a esse token

# '/user'
  **método**: *GET*  
  **headers**: Requer o envio de um token de autenticação em Authorization. Exemplo: "Authorization": "Bearer ${token}"  
  **retorno**:
*   Em caso de sucesso:
    * Status: 200
    * Retorna um objeto JSON contendo as informações do usuário recém-cadastrado, com exceção da sua senha.  
*   Ao deixar de enviar um token no headers:
    * Status: 401
    * Retorna uma mensagem de erro afirmando que as credenciais para realizar a operação são inválidas, com um lembrete de que talvez a ausência de um token seja o problema
*   Ao enviar um token inválido:
    * Status: 404
    * Retorna uma mensagem de erro afirmando que não há usuário no registrado associado a esse token

# '/user/forgot'
  **método**: *POST*  
  **body**: Requer o envio do e-mail da conta que o usuário deseja recuperar.  
  **retorno**:
*   Em caso de sucesso:
    * Status: 202
    * Retorna um objeto JSON uma mensagem afirmando que um e-mail foi enviado para o usuário, pedindo que que o mesmo aguarde até a sua chegada.  
*   Ao deixar de enviar o e-mail no _body_ da requisição:
    * Status: 400
    * Retorna um objeto JSON com informações sobre a ausência do e-mail
*   Ao enviar um e-mail que não foi registrado anteriormente:
    * Status: 404
    * Retorna um objeto JSON afirmando que não existe conta associada ao email enviado.

# '/user/reset'
  **método**: *POST*  
  **body**: Requer o envio da nova senha que o usuário deseja que sua conta possua.  
  **headers**: Requer o envio de um token de autenticação em Authorization. Exemplo: "Authorization": "Bearer ${token}"  
  **retorno**:
*   Em caso de sucesso:
    * Status: 200
    * Retorna um objeto JSON contendo as informações do usuário recém-recuperado, com exceção da sua senha.
*   Ao deixar de enviar a senha no _body_ requisição:
    * Status: 400
    * Retorna um objeto JSON com informações sobre a ausência do senha
*   Ao enviar um token inválido:
    * Status: 404
    * Retorna uma mensagem de erro afirmando que não há usuário no registrado a esse token
