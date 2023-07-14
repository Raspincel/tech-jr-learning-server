## TechJr-server-test

# '/users/register'
    validateSchema
    verify if user doesn't exist (and if email is .acad.edu.br) (middleware)
    controller final
        criptografar senha (bcrypt)
        service de registrar usuário
        retornar 201 com o usuário

# '/users/login'
    validateSchema
    verify if user does exist (middleware)
    controller final
        service de criar token
    retorn 204 com o token