import { availableFemaleNames, availableGenders, availableMaleNames } from './utils.js';

export function showMenu() {
    /*Muestra el menu completo*/
    console.log('=========================================================================')
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
//FUNCIONES DEL SWITCH 
export function showTable(array) {
    if (array.length > 0) {
        console.table(array)
    } else {
        console.log('No hay alumnos que mostrar. La lista está vacía:')
        console.table(array)
    }
}

export function showAmount(array) {
    const amountStudents = array.length;
    console.log(`Cantidad de alumnos: ${amountStudents}`);
}

export function showNames(array) {
    if(array.length > 0) {
        for (let i = 0; i < array.length; i++) {
            const studentName = array[i].name;
            console.log(`Nombre del alumno ${i + 1}: ${studentName}`);
        }
    }else {
        console.log('No se muestran nombres porque no hay alumnos en esta clase')
    }
}

export function deleteLast(array) {    
    if (array.length > 0) {
        array.pop();
        console.log('Se eliminó el último alumno: ')
        console.table(array);
    } else {
        console.log('No hay alumnos que eliminar. La lista está vacía.')
    }
}

export function deleteRandom(array) {
    if (array.length > 0) {
        const max = array.length;
        const min = 0;
        const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;
        array.splice(randomIndex, 1);
        console.log(`Eliminaste al alumno en la posicion ${randomIndex}.`)
    } else {
        console.log('No hay alumnos que eliminar. La lista está vacía.')
    }
}

export function showFemales(array) {
    if (array.length > 0) {
        const females = array.filter(person => person.gender === 'female');
        if (females.length === 0) {
            console.log("No hay chicas en esta clase.")
        }
        return females
    } else {
        console.log('No hay alumnos en esta clase. Lalista está vacía.')
    }

}

export function countMalesAndFemales(array) {
    if(array.length > 0) {
        let amountMales = 0;
        let amountFemales = 0;
        for (let i = 0; i < array.length; i++) {
            if (array[i].gender === 'female') {
                amountFemales = amountFemales + 1;
            } else {
                amountMales = amountMales + 1;
            }
        }
        console.log(`Cantidad de chicos: ${amountMales} `);
        console.log(`Cantidad de chicas: ${amountFemales} `);
    } else {
        console.log('No hay alumnos en esta clase. Lista vacia.')
    }
}

export function allFemales(array) {
    if(array.length > 0) {
        const allFemales = array.every((student) => student.gender === 'female');
        console.log(`Los alumnos de la clase son todas chicas?: ${allFemales}`)
    } else {
        console.log('No hay alumnos en esta clase. Lista vacía.')
    }   
}

export function ageInRange(array) {
    if (array.length > 0) {
        const studentsInRange = array.filter(student => student.age >= 20 && student.age <= 25);
        for (let i = 0; i < studentsInRange.length; i++) {
            console.log(studentsInRange[i].name)
        }
        if (studentsInRange.length === 0) {
            console.log("No hay ningún alumno en ese rango etario.")
        }
    } else {
        console.log('No hay alumnos en esta clase. Lista vacía.')
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

export function addRandomStudent(array) {
    const newStudent = createRandomStudent(availableMaleNames, availableFemaleNames, availableGenders);
    array.push(newStudent);
    console.log('Añadiste al siguiente alumno a la clase: ');
    console.log(newStudent)
}

export function youngestStudent(array) {
    const youngestInClass = array.reduce((min, student) => student.age < min.age ? student : min); //operador ternario
    console.log(youngestInClass.name)
}

export function meanAge(array) {
    const meanAge = array.reduce((total, student) => total + student.age, 0) / array.length;
    console.log(`Edad media de toda la clase: ${meanAge}`)
}

export function meanAgeFemales(array) {
    const females = showFemales(array);
    const meanAge = females.reduce((total, student) => total + student.age, 0) / females.length;
    console.log(`Edad media de las chicas: ${meanAge}`)
}

export function addRandomScore(array) {
    const max = 10;
    const min = 0;
    array.forEach(student => {
        student.examScores.push(Math.floor(Math.random() * (max - min + 1)) + min);
        console.log('Nota de', student.name, ':', student.examScores)
    });
}

export function sortArray(array) {
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

export function showHighestMark(array) {
    const highestScores = bestScores(array);
    const studentInfo = highestScores.at(0);
    const highestMark = highestScores.at(1);
    console.log('Alumno con las mejores notas:');
    console.log(studentInfo);
    console.log(`La sumatoria de sus notas es: ${highestMark}`)
}

export function showHighestMean(array) {
    const highestScores = bestScores(array);
    const bestStudentInfo = highestScores.at(0);
    const highestMean = highestScores.at(2);
    console.log(`Nota media más alta de la clase: ${highestMean}`);
    console.log(`Nombre del alumno con mejor media: ${bestStudentInfo.name}`)
}

export function addExtraPoint(array) {
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