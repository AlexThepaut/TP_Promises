const fs = require('fs-extra');

const dir = 'temp/'
const file = 'pubs.json'
const pubJson = [
    {
        "name": "Arawak",
        "owner": {
            "firstName": "Nicolas",
            "lastName": "Hodicq",
            "mail": "nhodicq@bewizyu.com"
        },
        "openDays": [
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ],
        "openHours": {
            "start": 10,
            "end": 1
        },
        "beers": [
            {
                "type": "Blonde",
                "name": "Triple Karmeliet"
            }
        ]
    },
    {
        "name": "Pendorain",
        "owner": {
            "firstName": "Alex",
            "lastName": "Thepaut",
            "mail": "alex.thepaut33@gmail.com"
        },
        "openDays": [
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ],
        "openHours": {
            "start": 18,
            "end": 3
        },
        "beers": [
            {
                "type": "Blonde",
                "name": "La débauche"
            }
        ]
    }
]
let compteur = 0;

/* --------------------------------------------------------------------- */
/* Async with promise */
/*fs.pathExists(dir)
    .then(exists => {
        if (exists) {
            console.log("Dir Temp exist so remove it");
            return fs.remove(dir);
        } return;
    })
    .then(() => {
        console.log("Create Temp");
        return fs.ensureDir(dir);
    })
    .then(() => {
        return fs.writeJson(`${dir}${file}`, pubJson);
    })
    .then(() => {
        console.log("Success !")
        watcher();
    })
    .catch(err => {
        console.error(err);
    });
*/

/* --------------------------------------------------------------------- */
/* Async with await */

async function fillTempDir(dir, file) {
    try {
        const exists = await fs.pathExists(dir)
        if (exists) {
            await fs.remove(dir);
            console.log('success!');
        }
        await fs.ensureDir(dir);
        await fs.writeJson(`${dir}${file}`, pubJson);
        watcher();
    } catch (err) {
        console.error(err);
    }
}

fillTempDir(dir, file);

/* --------------------------------------------------------------------- */
/* Watcher du dossiers */

function watcher(){
    fs.watchFile(`${dir}${file}`, (curr, prev) => {
        console.log(`Fichier modifié ${compteur++} fois`);
    });
}