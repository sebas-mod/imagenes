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

    // Fondo
    const bg = await loadImage('https://imagenes-one.vercel.app/certificadofondo.png')
    ctx.drawImage(bg, 0, 0, width, height)

    ctx.textAlign = 'center'

    // ✨ Sombra suave
    ctx.shadowColor = 'rgba(0,0,0,0.2)'
    ctx.shadowBlur = 10

    // Título
    ctx.fillStyle = '#8b5c5c'
    ctx.font = 'bold 48px sans-serif'
    ctx.fillText('CERTIFICADO DE AMOR', width / 2, 95)

    // Reset sombra
    ctx.shadowBlur = 0

    // Texto
    ctx.fillStyle = '#555'
    ctx.font = '24px sans-serif'
    ctx.fillText('Este certificado confirma que', width / 2, 160)

    // 💖 NOMBRES (con glow)
    ctx.fillStyle = '#d16b86'
    ctx.shadowColor = '#ff9bb0'
    ctx.shadowBlur = 20

    ctx.font = 'bold 42px sans-serif'
    ctx.fillText(name1, width / 2, 250)

    ctx.font = '32px sans-serif'
    ctx.fillText('❤', width / 2, 290)

    ctx.font = 'bold 42px sans-serif'
    ctx.fillText(name2, width / 2, 340)

    ctx.shadowBlur = 0

    // Mensaje final
    ctx.fillStyle = '#444'
    ctx.font = '24px sans-serif'
    ctx.fillText('Están oficialmente en una relación 💖', width / 2, 410)

    // Fecha
    const fecha = new Date().toLocaleDateString('es-AR')
    ctx.font = '20px sans-serif'
    ctx.fillText(`Fecha: ${fecha}`, width / 2, 460)

    const buffer = canvas.toBuffer('image/png')

    res.setHeader('Content-Type', 'image/png')
    res.end(buffer)

  } catch (e) {
    console.error(e)
    res.status(500).send('Error generando imagen')
  }
}
