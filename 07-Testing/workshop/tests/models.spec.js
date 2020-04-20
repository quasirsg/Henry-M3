/* globals describe, beforeEach, it */

const { User } = require('../models');
const { expect } = require('chai');

describe('User', () => {
  beforeEach(() =>
    // Por cada test volvamos a reiniciar la tabla para que cada test este isolado del otro.
    User.sync({ force: true }));
  describe('Validators', () => {
    describe('username', () => {
      it('should throw an error if is not a string', (done) => {
        // done maneja test asincronicos, hay dos posibilidades
        // 1. Si llamamos done con un argumento hubo un error
        // 2. Sin argumentos significa que el test paso
        User.create({
          username: [],
        })
          .then(() => done('No deberia haber creado el usuario!!'))
          .catch(() => done());
      });
      it('should throw an error is smaller than 8 characters', (done) => {
        User.create({
          username: 'guille',
        })
          .then(() => done('No deberia haber creado el usuario!!'))
          .catch(() => done());
      });

      it('should require the username', (done) => {
        User.create({})
          .then(() => done('No deberia haber creado el usuario!!'))
          .catch(() => done());
      });
      // Otra forma de manejar test asincronicos es devolver una promesa
      // si la promesa se resuelve, el test paso, si es rechazado falló
      it('should create the user if more than 8 chars', () => User.create({
        username: 'guilleasz',
      }));
    });
  });
  describe('Getter methods', () => {
    describe('email', () => {
      it('should return USERNAME@plataforma5.la', () =>
        User.create({
          username: 'guilleasz',
        }).then((user) => {
          expect(user.email).to.equal('guilleasz@plataforma5.la');
        }));
    });
  });
  describe('Class methods', () => {
    describe('usernames', () => {
      it('should return a Promise that resolves in an array of all the usernames', () =>
        User.bulkCreate([
          {
            username: 'guilleasz',
          },
          {
            username: 'atralice',
          },
        ])
          .then(() => User.usernames())
          .then((users) => {
            // lo ordeno para saber cual va ir primero.
            users.sort();
            expect(users[0]).to.equal('atralice');
            expect(users[1]).to.equal('guilleasz');
          }));
    });
  });
  describe('Hooks', () => {
    describe('beforeCreate', () => {
      it('should make the username lowercase', () =>
        User.create({
          username: 'GUILLEASZ',
        })
          .then((user) => {
            expect(user.username).to.equal('guilleasz');
          }));
    });
  });
});
