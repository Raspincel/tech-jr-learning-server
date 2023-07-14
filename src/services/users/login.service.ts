import jwt from 'jsonwebtoken'

export default async function loginService(email: string) {
  const token = await jwt.sign(
    {
      email,
    },
    process.env.SECRET_KEY,
    { expiresIn: '7d' },
  )

  return token
}
