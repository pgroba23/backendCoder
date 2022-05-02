let esAdmin = true;

export const soloParaAdmins = (req, res, next) => {
  if (esAdmin) {
    next();
  } else {
    res
      .sendStatus(403)
      .json({ error: -1, descripcion: "ruta 'x' método 'y' no autorizada" });
  }
};
