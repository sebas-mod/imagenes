export default function handler(req, res) {
  const { name1, name2 } = req.query

  if (!name1 || !name2) {
    return res.status(400).send('Faltan nombres')
  }

  const base = 'https://res.cloudinary.com/dlg955drd/image/upload'

  const fecha = new Date().toLocaleDateString('es-AR')

  // 🔥 URL limpia (SIN espacios ni saltos)
  const url = base +
    '/l_text:Arial_60:' + encodeURIComponent(name1) + ',co_rgb:d16b86,g_center,x_200,y_-20' +
    '/l_text:Arial_60:' + encodeURIComponent(name2) + ',co_rgb:d16b86,g_center,x_200,y_80' +
    '/l_text:Arial_30:' + encodeURIComponent(fecha) + ',co_rgb:555555,g_south,y_40' +
    '/v1776453975/ChatGPT_Image_17_abr_2026_04_25_50_p.m._xdjcaa.png'

  res.redirect(url)
}
