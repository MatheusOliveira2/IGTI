import { promises as fs } from 'fs';
let states = [];
let maiores = [];
let menores = [];
const UFS = [
  'AC',
  'AL',
  'AM',
  'AP',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MG',
  'MS',
  'MT',
  'PA',
  'PB',
  'PE',
  'PI',
  'PR',
  'RJ',
  'RN',
  'RO',
  'RR',
  'RS',
  'SC',
  'SE',
  'SP',
  'TO',
];

async function joinUfCities() {
  try {
    const UFs = JSON.parse(await fs.readFile('Estados.json'));
    const Cities = JSON.parse(await fs.readFile('Cidades.json'));

    UFs.forEach((uf) => {
      const ufCities = Cities.filter((city) => city.Estado === uf.ID);
      fs.writeFile(`${uf.Sigla}.json`, JSON.stringify(ufCities));
    });
  } catch (err) {
    console.log(err);
  }
}

async function countCities(sigla) {
  const UF = JSON.parse(await fs.readFile(`${sigla}.json`));
  return UF.length;
}

async function populateStates() {
  states.push({ cities: await countCities('AC'), UF: 'AC' });
  states.push({ cities: await countCities('AL'), UF: 'AL' });
  states.push({ cities: await countCities('AM'), UF: 'AM' });
  states.push({ cities: await countCities('AP'), UF: 'AP' });
  states.push({ cities: await countCities('BA'), UF: 'BA' });
  states.push({ cities: await countCities('CE'), UF: 'CE' });
  states.push({ cities: await countCities('DF'), UF: 'DF' });
  states.push({ cities: await countCities('ES'), UF: 'ES' });
  states.push({ cities: await countCities('GO'), UF: 'GO' });
  states.push({ cities: await countCities('MA'), UF: 'MA' });
  states.push({ cities: await countCities('MG'), UF: 'MG' });
  states.push({ cities: await countCities('MS'), UF: 'MS' });
  states.push({ cities: await countCities('MT'), UF: 'MT' });
  states.push({ cities: await countCities('PA'), UF: 'PA' });
  states.push({ cities: await countCities('PB'), UF: 'PB' });
  states.push({ cities: await countCities('PE'), UF: 'PE' });
  states.push({ cities: await countCities('PI'), UF: 'PI' });
  states.push({ cities: await countCities('PR'), UF: 'PR' });
  states.push({ cities: await countCities('RJ'), UF: 'RJ' });
  states.push({ cities: await countCities('RN'), UF: 'RN' });
  states.push({ cities: await countCities('RO'), UF: 'RO' });
  states.push({ cities: await countCities('RR'), UF: 'RR' });
  states.push({ cities: await countCities('RS'), UF: 'RS' });
  states.push({ cities: await countCities('SC'), UF: 'SC' });
  states.push({ cities: await countCities('SE'), UF: 'SE' });
  states.push({ cities: await countCities('SP'), UF: 'SP' });
  states.push({ cities: await countCities('TO'), UF: 'TO' });
}

function find5Big() {
  states.sort((a, b) => (a.cities - b.cities) * -1);

  let big5 = [states[0], states[1], states[2], states[3], states[4]];
  big5 = big5.map((state) => {
    return `${state.UF} - ${state.cities}`;
  });

  return big5;
}

function find5Small() {
  states.sort((a, b) => a.cities - b.cities);

  let small5 = [states[0], states[1], states[2], states[3], states[4]];
  small5 = small5.map((state) => {
    return `${state.UF} - ${state.cities}`;
  });

  return small5.reverse();
}

async function biggestCitiesName() {
  const nomes = [];

  try {
    for (let i = 0; i < UFS.length; i++) {
      let state = JSON.parse(await fs.readFile(`${UFS[i]}.json`));
      nomes.push(
        `${
          state.reduce((a, b) => {
            if (a.Nome.length > b.Nome.length) {
              return a;
            } else if (a.Nome.length < b.Nome.length) return b;
            else {
              const first = a.Nome < b.Nome ? a : b;
              return first;
            }
          }).Nome
        } - ${UFS[i]}`
      );
    }
    maiores = nomes;
  } catch (err) {
    console.log(err);
  }
}

async function smallestsCitiesName() {
  const nomes = [];
  try {
    for (let i = 0; i < UFS.length; i++) {
      let state = JSON.parse(await fs.readFile(`${UFS[i]}.json`));
      nomes.push(
        `${
          state.reduce((a, b) => {
            if (a.Nome.length < b.Nome.length) {
              return a;
            } else if (a.Nome.length > b.Nome.length) return b;
            else {
              const first = a.Nome < b.Nome ? a : b;
              return first;
            }
          }).Nome
        } - ${UFS[i]}`
      );
    }
    menores = nomes;
  } catch (err) {
    console.log(err);
  }
}

async function biggest() {
  const maior = maiores.reduce((a, b) => {
    if (a.length > b.length) {
      return a;
    } else if (a.length < b.length) return b;
    else {
      const first = a < b ? a : b;
      return first;
    }
  });

  console.log(maior);
}

async function smallest() {
  const menor = menores.reduce((a, b) => {
    if (a.length < b.length) {
      return a;
    } else if (a.length > b.length) return b;
    else {
      const first = a < b ? a : b;
      return first;
    }
  });

  console.log(menor);
}

async function init() {
  await joinUfCities();
  await populateStates();
  console.log(find5Big());
  console.log(find5Small());
  await biggestCitiesName();
  console.log(maiores);
  await smallestsCitiesName();
  console.log(menores);
  await biggest();
  await smallest();
}

init();
