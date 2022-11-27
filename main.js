import readline from 'readline';
import { students } from './utils.js';
import { showTable, showMenu, showAmount, showNames, deleteLast, deleteRandom, showFemales, countMalesAndFemales, allFemales, ageInRange, addRandomStudent, youngestStudent, meanAge, meanAgeFemales, addRandomScore, sortArray, showHighestMark, showHighestMean, addExtraPoint } from './functions.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function getOption() {
    /*Obtiene un ingreso por consola de la opcion elegida*/
    const promise = new Promise((resolve, reject) => {
        rl.question('Selecciona una opción del menú: ', (num) => {
            console.log('========================================================================');
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

function displayAction(result, students) {
    /*Recibe la opcion y la lista a consultar. Devuelve la accion asociada a la opción seleccionada*/
    switch (result) {
        case 1:
            console.log("OPCION 1: Mostrar en formato de tabla todos los alumnos.");
            showTable(students);
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