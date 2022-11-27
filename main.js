import readline from 'readline';
import { students, availableFemaleNames, availableGenders, availableMaleNames } from './utils.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

//FUNCIONES
function showMenu() {
    /*Muestra el menu completo*/
    console.log("¿Qué deseas hacer?");
    console.log("1- Mostrar en formato de tabla todos los alumnos.");
    console.log("2- Mostrar por consola la cantidad de alumnos que hay en clase.");
    console.log("3- Mostrar por consola todos los nombres de los alumnos.");
    console.log("4- Eliminar el último alumno de la clase.");
    console.log("5- Eliminar un alumno aleatoriamente de la clase.");
    console.log("6- Mostrar por consola todos los datos de los alumnos que son chicas.");
    console.log("7- Mostrar por consola el número de chicos y chicas que hay en la clase.");
    console.log("8- Mostrar true o false por consola si todos los alumnos de la clase son chicas.");
    console.log("9- Mostrar por consola los nombres de los alumnos que tengan entre 20 y 25 años.");
    console.log("10- Añadir un alumno nuevo con los siguientes datos: género, mombre y edad aleatorios, y lista de notas vacía.");
    console.log("11- Mostrar por consola el nombre de la persona más joven de la clase.");
    console.log("12- Mostrar por consola la edad media de todos los alumnos de la clase.");
    console.log("13- Mostrar por consola la edad media de las chicas de la clase.");
    console.log("14- Añadir nueva nota a los alumnos. Por cada alumno de la clase, calcular una nota de forma aleatoria(número entre 0 y 10) y añadirla a su listado de notas.");
    console.log("15- Ordenar el array de alumnos alfabéticamente según su nombre.");
    console.log("16- Mostrar por consola el alumno de la clase con las mejores notas.");
    console.log("17- Mostrar por consola la nota media más alta de la clase y el nombre del alumno al que pertenece.")
    console.log("18- Añadir un punto extra a cada nota existente de todos los alumnos. Si los alumnos aún no tienen registrada ninguna nota, les pondremos un 10.")
}

function getOption() {
    /*Obtiene un ingreso por consola de la opcion elegida*/
    const promise = new Promise((resolve, reject) => {
        rl.question('Selecciona una opción del menú: ', (num) => {
            rl.pause();
            if (num > 0 && num <= 18) {
                num = Number.parseInt(num);
                resolve(num);
            } else {
                reject('Número de opción fuera de rango. La aplicación se ha cerrado');
            }
        })
    })
    return promise;
}

//FUNCIONES DEL SWITCH (transformar en arrow functions)

function showAmount(array) {
    const amountStudents = array.length;
    console.log(`Cantidad de alumnos: ${amountStudents}`);
}

function showNames(array) {
    for (let i = 0; i < array.length; i++) {
        const studentName = array[i].name;
        console.log(`Nombre del alumno ${i + 1}: ${studentName}`);
    }
}

function deleteLast(array) {    
    array.pop();
    console.log('Se eliminó el último alumno: ')
    console.table(array);
}

function deleteRandom(array) {
    const max = array.length;
    const min = 0;
    const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;
    array.splice(randomIndex, 1);
    console.log(`Eliminaste al alumno en la posicion ${randomIndex}.`)
}

function showFemales(array) {
    const females = array.filter(person => person.gender === 'female');
    return females
}

function countMalesAndFemales(array) {
    let amountMales = 0;
    let amountFemales = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i].gender === 'female') {
            amountFemales = amountFemales + 1;
        } else {
            amountMales = amountMales + 1;
        }
    }
    console.log(`En esta clase hay ${amountMales} chico(s) y ${amountFemales} chica(s)`);
}

function allFemales(array) {
    const allFemales = array.every((student) => student.gender === 'female');
    console.log(`Los alumnos de la clase son todas chicas?: ${allFemales}`)
}

function ageInRange(array) {
    const studentsInRange = array.filter(student => student.age >= 20 && student.age <= 25);
    for (let i = 0; i < studentsInRange.length; i++) {
        console.log(studentsInRange[i].name)
    }
}

function createRandomStudent(maleNames, femaleNames, genders) {
    const max = 50;
    const min = 20;
    const randomStudent = new Object();
    randomStudent.age = Math.floor(Math.random() * (max - min)) + min;
    randomStudent.examScores = [];
    randomStudent.gender = genders[Math.floor(Math.random() * (genders.length))];
    if (randomStudent.gender === 'female') {
        randomStudent.name = femaleNames[Math.floor(Math.random() * (femaleNames.length))];
    } else {
        randomStudent.name = maleNames[Math.floor(Math.random() * (maleNames.length))];
    }
    return randomStudent
}

function addRandomStudent(array) {
    const newStudent = createRandomStudent(availableMaleNames, availableFemaleNames, availableGenders);
    array.push(newStudent);
    console.log('Añadiste al siguiente alumno a la clase: ');
    console.log(newStudent)
}

function youngestStudent(array) {
    const youngestInClass = array.reduce((min, student) => student.age < min.age ? student : min); //operador ternario
    console.log(youngestInClass.name)
}

function meanAge(array) {
    const meanAge = array.reduce((total, student) => total + student.age, 0) / array.length;
    console.log(`Edad media de toda la clase: ${meanAge}`)
}

function meanAgeFemales(array) {
    const females = showFemales(array);
    const meanAge = females.reduce((total, student) => total + student.age, 0) / females.length;
    console.log(`Edad media de las chicas: ${meanAge}`)
}

function addRandomScore(array) {
    const max = 10;
    const min = 0;
    array.forEach(student => {
        student.examScores.push(Math.floor(Math.random() * (max - min + 1)) + min);
        console.log('Nota de', student.name, ':', student.examScores)
    });
}

function sortArray(array) {
    const sortedArray = array.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        } else if (a.name > b.name) {
            return 1;
        } else {
            return 0;
        }
    })
    return sortedArray;
}

//opcionales
function bestScores(array) {
    let bestScores = 0;
    let studentInfo;
    let highestMean;
    array.forEach(student => {
        const totalMarks = student.examScores.reduce((total, score) => total + score, 0);
        if (totalMarks > bestScores) {
            bestScores = totalMarks
            studentInfo = student;
            highestMean = bestScores / student.examScores.length
        } else if (totalMarks < bestScores) {
            bestScores = bestScores
        } else if (totalMarks === 0) {
            bestScores = 0
        }
    })
    return [studentInfo, bestScores, highestMean]
}

function showHighestMark(array) {
    const highestScores = bestScores(array);
    const studentInfo = highestScores.at(0);
    const highestMark = highestScores.at(1);
    console.log('Alumno con las mejores notas:');
    console.log(studentInfo);
    console.log(`La sumatoria de sus notas es: ${highestMark}`)
}

function showHighestMean(array) {
    const highestScores = bestScores(array);
    const bestStudentInfo = highestScores.at(0);
    const highestMean = highestScores.at(2);
    console.log(`Nota media más alta de la clase: ${highestMean}`);
    console.log(`Nombre del alumno con mejor media: ${bestStudentInfo.name}`)
}

function addExtraPoint(array) {
    console.log("Notas registradas:");
    console.table(array);
    for (let i = 0; i < array.length; i++) {
        if (array[i].examScores.length > 0) {
            array[i].examScores = array[i].examScores.map(n => n + 1);
            array[i].examScores = array[i].examScores.map(mark => (mark > 10) ? 10: mark)
        } else if (array[i].examScores.length === 0) {
            array[i].examScores.push(10)
        }
    }
    console.log("Nuevas notas:");
    console.table(array)
}

function displayAction(result, students) {
    /*Recibe la opcion y la lista a consultar. Devuelve la accion asociada a la opción seleccionada*/
    switch (result) {
        case 1:
            console.log("OPCION 1: Mostrar en formato de tabla todos los alumnos.");
            console.table(students);
            break;
        case 2:
            console.log("OPCION 2: Mostrar por consola la cantidad de alumnos que hay en clase.");
            showAmount(students);
            break;
        case 3:
            console.log("OPCION 3: Mostrar por consola todos los nombres de los alumnos.");
            showNames(students);
            break;
        case 4:
            console.log("OPCION 4: Eliminar el último alumno de la clase.");
            deleteLast(students);
            break;
        case 5:
            console.log("OPCION 5: Eliminar un alumno aleatoriamente de la clase.");
            deleteRandom(students);
            break;
        case 6:
            console.log("OPCION 6: Mostrar por consola todos los datos de los alumnos que son chicas.");
            const femalesInfo = showFemales(students)
            console.table(femalesInfo);
            break;
        case 7:
            console.log("OPCION 7: Mostrar por consola el número de chicos y chicas que hay en la clase.");
            countMalesAndFemales(students);
            break;
        case 8:
            console.log("OPCION 8: Mostrar true o false por consola si todos los alumnos de la clase son chicas.");
            allFemales(students);
            break;
        case 9:
            console.log("OPCION 9: Mostrar por consola los nombres de los alumnos que tengan entre 20 y 25 años.");
            ageInRange(students);
            break;
        case 10:
            console.log("OPCION 10: Añadir un alumno nuevo con los siguientes datos: nombre y género aleatorio, edad aleatoria entre 20 y 50 años, y lista de calificaciones vacía");
            addRandomStudent(students);
            break;
        case 11:
            console.log("OPCION 11: Mostrar por consola el nombre de la persona más joven de la clase.");
            youngestStudent(students);
            break;
        case 12:
            console.log("OPCION 12: Mostrar por consola la edad media de todos los alumnos de la clase.");
            meanAge(students);
            break;
        case 13:
            console.log("OPCION 13: Mostrar por consola la edad media de las chicas de la clase.");
            meanAgeFemales(students);
            break;
        case 14:
            console.log("OPCION 14: Añadir nueva nota a los alumnos. Por cada alumno de la clase, tendremos que calcular una nota de forma aleatoria(número entre 0 y 10) y añadirla a su listado de notas.");
            addRandomScore(students);
            break;
        case 15:
            console.log("OPCION 15: Ordenar el array de alumnos alfabéticamente según su nombre.");
            const sortedArray = sortArray(students);
            console.table(sortedArray)
            break;
        case 16:
            console.log("OPCION 16: Mostrar por consola el alumno de la clase con las mejores notas. ");
            showHighestMark(students);
            break;
        case 17:
            console.log("OPCION 17: Mostrar por consola la nota media más alta de la clase y el nombre del alumno al que pertenece.");
            showHighestMean(students);
            break;
        case 18:
            console.log("OPCION 18: Añadir un punto extra a cada nota existente de todos los alumnos. Si los alumnos aún no tienen registrada ninguna nota, les pondremos un 10.");
            addExtraPoint(students);
            break;
        default:
            console.log('Opción no valida');
            break;
    }
}

async function app() {
    let withinRange = true;
    do {
        showMenu();
        try {
            const result = await getOption();
            displayAction(result, students)
            withinRange = true
        } catch (error) {
            console.log(error);
            withinRange = false
        }

    } while (withinRange != false);
}

app()