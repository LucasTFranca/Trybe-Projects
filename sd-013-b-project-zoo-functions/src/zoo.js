/* eslint-disable max-lines-per-function */
/* eslint-disable no-unused-vars */
const { species, employees, prices, hours } = require('./data');

function getSpeciesByIds(...ids) {
  if (!ids.length) return [];
  if (ids.length === 1) return species.filter(({ id }) => id === ids[0]);
  const animalsFind = [];

  ids.forEach((animalId, index) => {
    animalsFind.push(species.find(({ id }) => id === animalId));
  });

  return animalsFind;
}

function getAnimalsOlderThan(animal, age) {
  const { residents } = species.find(({ name }) => name === animal);
  return residents.every(({ age: residentAge }) => residentAge >= age);
}

function getEmployeeByName(employeeName) {
  if (!employeeName) return {};
  const fisrtNameFind = employees.find(({ firstName }) => firstName === employeeName);
  if (fisrtNameFind) return fisrtNameFind;
  const lastNameFind = employees.find(({ lastName }) => lastName === employeeName);
  if (lastNameFind) return lastNameFind;
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const employeFind = employees.find(({ id: employeId }) => employeId === id);
  const employeManager = employeFind.managers[0];

  if (employeFind.managers.length === 1) {
    const boss = employees.find(({ id: employeId }) => employeId === employeManager);
    if (!boss.managers.length) return true;
  }

  return false;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
  return employees;
}

function countAnimals(countSpecies) {
  if (!countSpecies) {
    const obj = { };
    species.forEach(({ name, residents }) => {
      obj[name] = residents.length;
    });
    return obj;
  }

  const { residents } = species.find(({ name }) => name === countSpecies);
  return residents.length;
}

function calculateEntry(entrants) {
  let total = 0;

  if (!entrants) return 0;
  if (Object.entries(entrants).length === 0) return 0;
  Object.keys(entrants).forEach((key, index) => {
    total += prices[key] * entrants[key];
  });

  return total;
}

function getSexNames(residents, sex) {
  const animalNameList = [];

  residents.forEach(({ name: animalName, sex: animalSex }) => {
    if (animalSex === sex) animalNameList.push(animalName);
  });

  return animalNameList;
}

function getIncludeNames({ sorted, sex }) {
  const obj = {};

  species.forEach(({ location, name, residents }) => {
    if (!obj[location]) obj[location] = [];

    let animalNameList = [];

    if (sex) animalNameList = getSexNames(residents, sex);
    else animalNameList = residents.map(({ name: animalName }) => animalName);

    if (sorted) animalNameList.sort();

    obj[location].push({
      [name]: animalNameList,
    });
  });

  return obj;
}

function getAnimalMap(options) {
  const obj = {};

  species.forEach(({ name, location }) => {
    if (!obj[location]) obj[location] = [name]; else obj[location].push(name);
  });

  if (!options) return obj;
  if (options.includeNames) return getIncludeNames(options);
  return obj;
}

console.log(getAnimalMap({ sex: 'female', sorted: true }));

function getSchedule(dayName) {
  const obj = {};
  const hoursKeys = Object.keys(hours);

  hoursKeys.forEach((key, index) => {
    obj[key] = `Open from ${hours[key].open}am until ${hours[key].close - 12}pm`;
    if (index === hoursKeys.length - 1) obj[key] = 'CLOSED';
  });

  if (!dayName) return obj;
  const dayNameFind = obj[hoursKeys.find((key) => key === dayName)];
  return { [dayName]: dayNameFind };
}

function getOldestFromFirstSpecies(id) {
  const { responsibleFor } = employees.find(({ id: idEmploye }) => idEmploye === id);
  const { residents } = species.find(({ id: idAnimal }) => idAnimal === responsibleFor[0]);
  const oldestResident = residents.reduce((accumulate, current) => {
    if (accumulate.age > current.age) return accumulate; return current;
  }, 0);
  const { name, sex, age } = oldestResident;
  return [name, sex, age];
}

function increasePrices(percentage) {
  const valueToIncrease = Number(`1.${percentage}`);
  const { Adult, Senior, Child } = prices;

  prices.Adult = (Math.ceil((Adult * valueToIncrease) * 100)) / 100;
  prices.Senior = (Math.ceil((Senior * valueToIncrease) * 100)) / 100;
  prices.Child = (Math.ceil((Child * valueToIncrease) * 100)) / 100;
  return prices;
}

function findAnimal({ firstName, lastName, responsibleFor }) {
  const animalsResponsible = [];

  responsibleFor.forEach((animal) => {
    animalsResponsible.push(species.find(({ id }) => animal === id).name);
  });

  return { [`${firstName} ${lastName}`]: animalsResponsible };
}

function getEmployeeCoverage(idOrName) {
  if (!idOrName) {
    const employeesResponsibleFor = {};
    employees.forEach(({ firstName, lastName, responsibleFor }) => {
      const animalsResponsible = [];
      responsibleFor.forEach((animal) => animalsResponsible
        .push(species.find(({ id }) => id === animal).name));
      employeesResponsibleFor[`${firstName} ${lastName}`] = animalsResponsible;
    });
    return employeesResponsibleFor;
  }
  const withId = employees.find(({ id }) => id === idOrName);
  const withFirstName = employees.find(({ firstName }) => firstName === idOrName);
  const withLastName = employees.find(({ lastName }) => lastName === idOrName);
  if (withId) return findAnimal(withId);
  if (withFirstName) return findAnimal(withFirstName);
  if (withLastName) return findAnimal(withLastName);
}

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
