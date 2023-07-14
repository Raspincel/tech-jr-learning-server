import app from './index'
import 'dotenv/config'
;(async () => {
  app.listen(process.env.PORT, () =>
    console.log(`[SERVER ON] Servidor escutando na porta ${process.env.PORT}`),
  )
})()
