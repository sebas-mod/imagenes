import { createCanvas, loadImage } from 'canvas'

export default async function handler(req, res) {
  try {
    const { name1, name2 } = req.query

    if (!name1 || !name2) {
      return res.status(400).send('Faltan nombres')
    }

    const width = 1024
    const height = 600

    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')

    // 🔥 FONDO (TU LINK)
    const background = await loadImage('https://imagenes-one.vercel.app/certificadofondo.png')
    ctx.drawImage(background, 0, 0, width, height)

    ctx.textAlign = 'center'

    // 📝 TÍTULO
    ctx.fillStyle = '#8b5c5c'
    ctx.font = 'bold 50px sans-serif'
    ctx.fillText('CERTIFICADO DE AMOR', width / 2, 100)

    // 📄 TEXTO
    ctx.fillStyle = '#444'
    ctx.font = '24px sans-serif'
    ctx.fillText('Este certificado confirma que', width / 2, 170)

    // 💑 NOMBRES
    ctx.fillStyle = '#d16b86'
    ctx.font = 'bold 40px sans-serif'
    ctx.fillText(name1, width / 2, 260)

    ctx.font = '30px sans-serif'
    ctx.fillText('&', width / 2, 300)

    ctx.font = 'bold 40px sans-serif'
    ctx.fillText(name2, width / 2, 340)

    // 💖 FINAL
    ctx.fillStyle = '#444'
    ctx.font = '24px sans-serif'
    ctx.fillText('Están oficialmente en una relación 💖', width / 2, 420)

    // 📅 FECHA
    const fecha = new Date().toLocaleDateString('es-AR')
    ctx.font = '20px sans-serif'
    ctx.fillText(`Fecha: ${fecha}`, width / 2, 470)

    const buffer = canvas.toBuffer('image/png')

    res.setHeader('Content-Type', 'image/png')
    res.send(buffer)

  } catch (err) {
    console.error(err)
    res.status(500).send('Error generando imagen')
  }
}
