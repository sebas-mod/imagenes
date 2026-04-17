const { createCanvas, loadImage } = require('@napi-rs/canvas')

module.exports = async (req, res) => {
  try {
    const { name1, name2 } = req.query

    if (!name1 || !name2) {
      return res.status(400).send('Faltan nombres')
    }

    const canvas = createCanvas(1024, 600)
    const ctx = canvas.getContext('2d')

    const bg = await loadImage('https://imagenes-one.vercel.app/certificadofondo.png')
    ctx.drawImage(bg, 0, 0, 1024, 600)

    ctx.textAlign = 'center'

    ctx.fillStyle = '#d16b86'
    ctx.font = 'bold 50px sans-serif'
    ctx.fillText('CERTIFICADO DE AMOR', 512, 100)

    ctx.font = '30px sans-serif'
    ctx.fillText(name1, 512, 260)

    ctx.fillText('&', 512, 300)

    ctx.fillText(name2, 512, 340)

    const buffer = canvas.toBuffer('image/png')

    res.setHeader('Content-Type', 'image/png')
    res.end(buffer)

  } catch (e) {
    console.error(e)
    res.status(500).send('Error')
  }
}
