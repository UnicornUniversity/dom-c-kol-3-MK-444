//TODO add imports if needed
//TODO doc
/**
 * The main function which calls the application. 
 * Please, add specific description here for the application purpose.
 * @param {object} dtoIn contains count of employees, age limit of employees {min, max}
 * @returns {Array} of employees
 */
export function main(dtoIn) {
    const names = getNameLists();
    const surnames = getSurnameList();
    const employees = [];
    const usedBirthdates = new Set();
    const dateRange = calculateDateRange(dtoIn);

    for (let i = 0; i < dtoIn.count; i++) {
        const employee = createEmployee(names, surnames, dateRange, usedBirthdates);
        employees.push(employee);
    }

    let dtoOut = employees;
    return dtoOut;
}

/**
 * Returns lists of male and female names.
 * @returns {object} object with maleNames and femaleNames arrays
 */
function getNameLists() {
    return {
        male: [
            "Jan", "Petr", "Pavel", "Jiří", "Josef", "Tomáš", "Martin", "Jaroslav",
            "Miroslav", "František", "Václav", "Karel", "Milan", "David", "Michal",
            "Vratislav", "Zdeněk", "Lukáš", "Marek", "Jakub", "Ondřej", "Stanislav"
        ],
        female: [
            "Jana", "Marie", "Eva", "Anna", "Hana", "Věra", "Alena", "Lenka",
            "Petra", "Jitka", "Martina", "Kateřina", "Lucie", "Monika", "Aneta",
            "Jiřina", "Ivana", "Veronika", "Tereza", "Barbora", "Zuzana", "Michaela"
        ]
    };
}

/**
 * Returns list of surnames.
 * @returns {Array} array of surnames
 */
function getSurnameList() {
    return [
        "Novák", "Svoboda", "Novotný", "Dvořák", "Černý", "Procházka", "Kučera",
        "Veselý", "Horák", "Němec", "Marek", "Pospíšil", "Pokorný", "Hájek",
        "Král", "Jelínek", "Růžička", "Beneš", "Fiala", "Sedláček", "Doležal",
        "Zeman", "Kolář", "Navrátil", "Čermák", "Sýkora", "Ptáček", "Urban",
        "Krejčí", "Vaněk"
    ];
}

/**
 * Calculates date range for birthdate generation.
 * @param {object} dtoIn contains age limits
 * @returns {object} minDate and maxDate with range
 */
function calculateDateRange(dtoIn) {
    const now = new Date();
    const maxDate = new Date(now);
    maxDate.setFullYear(now.getFullYear() - dtoIn.age.min);

    const minDate = new Date(now);
    minDate.setFullYear(now.getFullYear() - dtoIn.age.max);

    return { minDate, maxDate, range: maxDate.getTime() - minDate.getTime() };
}

/**
 * Creates a single employee with random attributes.
 * @param {object} names lists of male and female names
 * @param {Array} surnames list of surnames
 * @param {object} dateRange date range for birthdate
 * @param {Set} usedBirthdates set of already used birthdates
 * @returns {object} employee object
 */
function createEmployee(names, surnames, dateRange, usedBirthdates) {
    const gender = Math.random() < 0.5 ? "male" : "female";
    const workloads = [10, 20, 30, 40];
    const workload = workloads[Math.floor(Math.random() * workloads.length)];

    const nameList = gender === "male" ? names.male : names.female;
    const name = nameList[Math.floor(Math.random() * nameList.length)];
    const surname = surnames[Math.floor(Math.random() * surnames.length)];

    const birthdate = generateUniqueBirthdate(dateRange, usedBirthdates);

    return { gender, birthdate, name, surname, workload };
}

/**
 * Generates a unique birthdate in ISO format.
 * @param {object} dateRange date range configuration
 * @param {Set} usedBirthdates set of already used birthdates
 * @returns {string} ISO formatted birthdate
 */
function generateUniqueBirthdate(dateRange, usedBirthdates) {
    let birthdateStr;

    do {
        const randomTime = dateRange.minDate.getTime() + Math.random() * dateRange.range;
        const birthdate = new Date(randomTime);
        birthdateStr = formatDateToISO(birthdate);
    } while (usedBirthdates.has(birthdateStr));

    usedBirthdates.add(birthdateStr);
    return birthdateStr;
}

/**
 * Formats date to ISO string format (YYYY-MM-DDTHH:mm:ss.sssZ).
 * @param {Date} date date object
 * @returns {string} ISO formatted date string
 */
function formatDateToISO(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
}