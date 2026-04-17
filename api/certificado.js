export default function handler(req, res) {
  res.status(200).json({
    ok: true,
    name1: req.query.name1,
    name2: req.query.name2
  })
}
