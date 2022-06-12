import passport from 'passport';
import { Strategy } from 'passport-local';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { getByName, save, getById } from './database.js';

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const sessionVar = session({
  store: MongoStore.create({
    //En Atlas connect App :  Make sure to change the node version to 2.2.12:
    // mongoUrl: `mongodb+srv://coderhouse:coderhouse@cluster0.o0eqf.mongodb.net/sesiones?authSource=admin&replicaSet=atlas-39qwv9-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`,
    mongoUrl: `xxxxxxxxxxxxxxxxxxxxxxxxx`,
    mongoOptions: advancedOptions,
  }),
  /* ----------------------------------------------------- */

  secret: 'pablo',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 10000,
  },
});

passport.use(
  'registro',
  new Strategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      try {
        const result = await getByName(username);
        if (!!result) {
          return done(null, false, { message: 'El usuario ya existe' });
        }
      } catch (error) {}

      let usuario = { ...req.body, id: new Date().getTime() };
      try {
        await save(usuario);
      } catch (error) {
        return done(error);
      }
      done(null, usuario);
    }
  )
);

passport.use(
  'login',
  new Strategy(async (username, password, done) => {
    let usuario;
    try {
      usuario = await getByName(username);
      if (!usuario) {
        return done(null, false, { message: 'El usuario no existe' });
      }
    } catch (error) {
      return done(error);
    }

    if (usuario.password !== password) {
      return done(null, false, { message: 'La contraseña es incorrecta' });
    }
    done(null, usuario);
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await getById(id);
  done(null, user);
});

export { passport, sessionVar };
