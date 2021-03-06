const salas = require("../data/salas.json");
const Sala = require("./Sala");

const Midgard = new Sala(1, "Midgard", 0, "", "");
const Valhalla = new Sala(JSON.stringify(findById(2)));
const Elfheim = new Sala(findById(3));
const Asgard = new Sala(findById(4));
let roomState = { Midgard, Valhalla, Elfheim, Asgard };

// encontrar todas las salas
async function findAll() {
  return new Promise((resolve, reject) => {
    resolve(salas);
  });
}

// encontrar una sala por su id
async function findById(id) {
  return new Promise((resolve, reject) => {
    const sala = salas.find((sala) => sala.id === id);
    resolve(sala);
  });
}

// Comprobar cuantos jugadores hay en una sala
async function jugadoresSala(id) {
  return new Promise((resolve, reject) => {
    if (id == 1) {
      resolve(Midgard.players);
    } else if (id == 2) {
      resolve(Valhalla.players);
    } else if (id == 3) {
      resolve(Elfheim.players);
    } else if (id == 4) {
      resolve(Asgard.players);
    }
  });
}

async function addPlayerRoom(room, username) {
  let r = new Promise((resolve, reject) => {
    let { id, name, players, player1, player2 } = room;

    if (players === 0) {
      for (var i = 0; i < salas.length; i++) {
        if (salas[i].id == id) {
          salas[i].players = 1;
          salas[i].playerOne = username;
          resolve(salas);
        }
      }
    } else {
      for (var i = 0; i < salas.length; i++) {
        if (salas[i].id == id) {
          salas[i].players = 2;
          salas[i].playerTwo = username;
          resolve(salas[i]);
        }
      }
      resolve(salas);
    }
  });
}

async function removePlayerRoom(room, username) {
  let r = new Promise((resolve, reject) => {
    let { id, name, players, playerOne, playerTwo } = room;
    let updatedRoom = room;

    if (players === 1) {
      for (var i = 0; i < salas.length; i++) {
        if (salas[i].id == id) {
          salas[i].players = 0;
          salas[i].playerOne = "";
          resolve(salas[i]);
        }
      }
    } else {
      for (var i = 0; i < salas.length; i++) {
        if (salas[i].id == id) {
          salas[i].players = 1;
          console.log(JSON.stringify(salas[i].player2));
          salas[i].playerTwo = "";
          resolve(salas[i]);
        }
      }
    }
    resolve(salas);
  });
}

module.exports = {
  findAll,
  findById,
  jugadoresSala,
  addPlayerRoom,
  removePlayerRoom,
};
