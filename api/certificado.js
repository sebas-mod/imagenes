import chromium from '@sparticuz/chromium'
import puppeteer from 'puppeteer-core'

export default async function handler(req, res) {
  const { name1, name2 } = req.query

  if (!name1 || !name2) {
    return res.status(400).send('Faltan nombres')
  }

  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: true,
  })

  const page = await browser.newPage()

  const html = `
  <html>
    <body style="
      margin:0;
      width:1024px;
      height:600px;
      background:url('https://imagenes-one.vercel.app/certificadofondo.png');
      background-size:cover;
      font-family: Arial;
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
      text-align:center;
    ">
      <h1 style="color:#8b5c5c;">CERTIFICADO DE AMOR</h1>
      <p>Este certificado confirma que</p>
      <h2 style="color:#d16b86;">${name1}</h2>
      <h3>❤</h3>
      <h2 style="color:#d16b86;">${name2}</h2>
      <p>Están oficialmente en una relación 💖</p>
    </body>
  </html>
  `

  await page.setContent(html)

  const buffer = await page.screenshot({
    type: 'png'
  })

  await browser.close()

  res.setHeader('Content-Type', 'image/png')
  res.send(buffer)
}
