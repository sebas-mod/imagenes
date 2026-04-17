const { createCanvas, loadImage } = require('@napi-rs/canvas')

module.exports = async (req, res) => {
  try {
    const { name1, name2 } = req.query

    if (!name1 || !name2) {
      return res.status(400).send('Faltan nombres')
    }

    const width = 1024
    const height = 600

    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')

    const bg = await loadImage('https://imagenes-one.vercel.app/certificadofondo.png')
    ctx.drawImage(bg, 0, 0, width, height)

    ctx.textAlign = 'center'

    // 🔥 FORZAR ESTILO (esto arregla el bug)
    ctx.fillStyle = '#000'
    ctx.font = '48px Arial'

    // Título
    ctx.fillText('CERTIFICADO DE AMOR', width / 2, 100)

    // Texto
    ctx.font = '24px Arial'
    ctx.fillText('Este certificado confirma que', width / 2, 170)

    // 💑 Nombres
    ctx.fillStyle = '#ff4d6d'
    ctx.font = '40px Arial'
    ctx.fillText(name1, width / 2, 260)

    ctx.font = '30px Arial'
    ctx.fillText('&', width / 2, 300)

    ctx.font = '40px Arial'
    ctx.fillText(name2, width / 2, 340)

    // Final
    ctx.fillStyle = '#000'
    ctx.font = '24px Arial'
    ctx.fillText('Están oficialmente en una relación 💖', width / 2, 420)

    const buffer = canvas.toBuffer('image/png')

    res.setHeader('Content-Type', 'image/png')
    res.end(buffer)

  } catch (e) {
    console.error(e)
    res.status(500).send('Error')
  }
}
