import transporter from "../../utils/nodeMailer";
import jwt from 'jsonwebtoken'

export default function sendResetTokenService(email: string, name: string) {
    const token = jwt.sign({ email }, process.env.SECRET_KEY)

    transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: "Recuperação de Senha - Tech Jr Learning Server",
        html: `
            <h2>Olá, ${name}</h2>
            <p>Há uma solicitação de recuperação de senha para sua conta no <b>Tech Jr Learning Server</b></p>
            <p>Caso você não tenha feito a solicitação, sinta-se à vontade para ignorar este e-mail</b>
            <p>Caso contrário, aqui está o token necessário para recuperar seua senha:</p>
            <h2>${token}</h2>
            <p>Copie-o e insira nos headers da sua requisição para a rota /users/reset</p>
            <p>Para mais informações, verifique a documentação: <a href="${process.env.REPOSITORY_URL}">CLIQUE AQUI PARA ACESSAR O LINK DO REPOSITÓRIO</a>
        `
    }, (err)=> {
        if (err) console.log(err)
    })

    return { message: "E-mail enviado com sucesso. Por favor, aguarde a sua chegada" }
}