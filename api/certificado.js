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

    // 🔥 TEXTO COMO SVG (esto SIEMPRE funciona)
    const svg = `
    <svg width="${width}" height="${height}">
      <style>
        .title { fill: #8b5c5c; font-size: 48px; font-family: Arial; font-weight: bold; }
        .text { fill: #444; font-size: 24px; font-family: Arial; }
        .name { fill: #d16b86; font-size: 40px; font-family: Arial; font-weight: bold; }
      </style>

      <text x="50%" y="100" text-anchor="middle" class="title">
        CERTIFICADO DE AMOR
      </text>

      <text x="50%" y="170" text-anchor="middle" class="text">
        Este certificado confirma que
      </text>

      <text x="50%" y="260" text-anchor="middle" class="name">
        ${name1}
      </text>

      <text x="50%" y="300" text-anchor="middle" class="text">
        ❤
      </text>

      <text x="50%" y="340" text-anchor="middle" class="name">
        ${name2}
      </text>

      <text x="50%" y="420" text-anchor="middle" class="text">
        Están oficialmente en una relación 💖
      </text>
    </svg>
    `

    const textImage = await loadImage(Buffer.from(svg))
    ctx.drawImage(textImage, 0, 0)

    const buffer = canvas.toBuffer('image/png')

    res.setHeader('Content-Type', 'image/png')
    res.end(buffer)

  } catch (e) {
    console.error(e)
    res.status(500).send('Error')
  }
}
