interface Terreno {
  [terrenoID: string]: Casa | Garage;
}

interface Garage {
  [garageID: string]: Scatola;
}

interface Scatola {
  [scatolaID: string]: Oggetti;
}

interface Casa {
  [casaID: string]: Stanza;
}

interface Stanza {
  [stanzaID: string]: Oggetti;
}

type Oggetti = any;

let casa: Casa = {};
let garage: Garage = {};

//1 - creao array oggettiRandom = []
const oggettiRandom: Oggetti = [
  'Pupazzo',
  'Ombrellone',
  'Computer',
  'Valigia',
  'Tv',
  'Nokia3310',
  'radio',
  'Cuffie',
  'Gomme',
  'zaino',
  'Pupazzo',
  'Ombrellone',
  'Computer',
  'Valigia',
  'Tv',
  'Nokia3310',
  'radio',
  'Cuffie',
  'Gomme',
  'zaino',
];
//Terreno{
// casa = {
//   casa1: {
//     stanza1: ['armadio', 'matita'],
//     stanza2: ['armadio', 'matita'],
//     stanza3: ['armadio', 'matita'],

//   },
// garage = {
//   garage: {
//     scatole: ['armadio', 'matita'],
//     scatole: ['armadio', 'matita'],
//     scatole: ['armadio', 'matita'],

//}

//
//   },
// };

const livelli = 3;

let terreno: Terreno = {};
terreno = {
  casa: { stanza1: [], stanza2: [] },
  garage: { scatola1: [], scatol2: [] },
};

terreno = { ...generaCasaGarage(livelli) };
console.log(terreno);

function generaCasaGarage(livelli: number) {
  Object.keys(terreno).forEach((tipologia) => {
    const stanzeScatole = generaStanza(livelli, tipologia);
    terreno = {
      ...terreno,
      [tipologia]: {
        ...stanzeScatole,
        ...generaMatriosca(livelli, tipologia, stanzeScatole),
      },
    };
  });

  return terreno;
}

function generaStanza(livelli: number, tipologia: string) {
  let stanza: {} = {};
  for (let i = 1; i <= livelli; i++) {
    //ciclare le chiavi e mettere dinamiche oggetto[index]; de
    let oggettiCasaGarage: {} = {};
    let stanzaScatola: {} = {};

    if (tipologia === 'casa') {
      oggettiCasaGarage = oggettiRandomCasaGarage().objStanza;
      stanzaScatola = 'stanza';
    } else {
      (oggettiCasaGarage = oggettiRandomCasaGarage().objGarage),
        (stanzaScatola = 'scatola');
    }
    const nomeStanza = `${stanzaScatola}${i}`;
    stanza = { [nomeStanza]: oggettiCasaGarage, ...stanza };
  }
  return stanza;
}

function generaMatriosca(livelli: number, casaKey: string, casa: {}) {
  let matriosca: {} = {};
  matriosca = livelli > 1 ? generaMatriosca(livelli - 1, casaKey, casa) : {};
  const nomeCasa = `${casaKey}_copy${livelli}`;
  return {
    [nomeCasa]: { ...casa, ...matriosca },
  };
}

function generaNumeriCasuali(numeri: number): number[] {
  const min = 1;
  const numeriCasuali = [];
  while (numeriCasuali.length < numeri - min + 1) {
    const numeroCasuale = Math.floor(Math.random() * (numeri - min + 1)) + min;
    if (!numeriCasuali.includes(numeroCasuale)) {
      numeriCasuali.push(numeroCasuale);
    }
  }
  return numeriCasuali;
}

function getNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function oggettiRandomCasaGarage() {
  //togliere da arrayAppoggio i 3 elementi del generaNumeriCasuali
  //ciclo i 3/n numeri casuali
  let oggettiGarage = [...oggettiRandom];
  let oggettiStanza = [];
  let oggettiStanzaGarage = {
    objStanza: oggettiStanza,
    objGarage: oggettiGarage,
  };
  generaNumeriCasuali(3).forEach((_, index) => {
    let singleObj = oggettiGarage[index];
    oggettiStanza.push(singleObj);
    oggettiGarage.splice(index, 1);
  });
  return oggettiStanzaGarage;
}

console.log(oggettiRandom);
console.log(generaNumeriCasuali(3));
