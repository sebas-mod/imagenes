export default async function handler(req, res) {
  const { name1, name2 } = req.query

  if (!name1 || !name2) {
    return res.status(400).send('Faltan nombres')
  }

  const text = encodeURIComponent(`${name1} ❤️ ${name2}`)

  // 🔥 API que genera imagen con texto
  const imageUrl = `https://api.popcat.xyz/drake?text1=${text}&text2=Certificado%20de%20Amor`

  res.setHeader('Content-Type', 'application/json')
  res.json({ url: imageUrl })
}
