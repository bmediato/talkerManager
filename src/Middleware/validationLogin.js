const validationLogin = (req, res, next) => {
  const { email, password } = req.body;
  const emailVal = /\S+@\S+\.\S+/;
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' }); 
}
  if (password.length < 6) {
 return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' }); 
}
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' }); 
}
  if (!emailVal.test(email)) {
 return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
}
  next();
};

module.exports = validationLogin;