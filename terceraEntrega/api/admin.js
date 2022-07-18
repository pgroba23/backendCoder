let esAdmin = true;

export const soloParaAdmins = (req, res, next) => {
  if (esAdmin) {
    next();
  } else {
    res.status(403).json({
      error: -1,
      descripcion: `ruta ${req.url} método ${req.method} no autorizada`,
    });
  }
};
