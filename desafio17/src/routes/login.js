import { Router } from "express";
import logger from "../log4js/logger.js";
import { passport, sessionVar } from "../persistencia/passport/passport.js";

export const login = Router();

login.use(sessionVar);
login.use(passport.initialize());
login.use(passport.session());

export const soloParaAdmins = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.render("login");
  }
};

login.post(
  "/registro",
  passport.authenticate("registro", {
    failureRedirect: "/failRegister",
    successRedirect: "/successRegister",
  })
);
login.get("/failRegister", (req, res) => {
  logger.info(`Ruta: ${req.path} - Metodo: ${req.method}`);
  res.render("register-error");
});
login.get("/successRegister", (req, res) => {
  logger.info(`Ruta: ${req.path} - Metodo: ${req.method}`);
  res.redirect("/");
});

// login
login.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/failLogin",
    successRedirect: "/successLogin",
  })
);
login.get("/failLogin", (req, res) => {
  logger.info(`Ruta: ${req.path} - Metodo: ${req.method}`);
  res.render("login-error");
});
login.get("/successLogin", (req, res) => {
  logger.info(`Ruta: ${req.path} - Metodo: ${req.method}`);
  res.redirect("/");
});

login.get("/logout", (req, res) => {
  logger.info(`Ruta: ${req.path} - Metodo: ${req.method}`);
  if (req.isAuthenticated()) {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ err: err });
      }
    });
  }
  res.redirect("/");
});
