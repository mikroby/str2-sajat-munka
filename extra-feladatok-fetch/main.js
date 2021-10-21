const mainURL = 'https://raw.githubusercontent.com/jokecamp/FootballData/master/UEFA_European_Championship/Euro%202016/players_json/';
const teamsJson = 'teams.json';
const playersJson = 'hungary-players.json';

const requiredTeam = 'Hungary';
const dataToDisplay_team = ['Group', 'FIFA ranking', 'Coach', 'next match'];
const dataToDisplay_player = ['name', 'position', 'club'];

const read = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache'
};

getStart();

function getStart() {
    Promise.all([communicateServer(teamsJson, read), communicateServer(playersJson, read)]).then(resp => {
        const [teamsObject, playerObject] = resp;
        displayTeam(teamsObject);
        displayPlayer(playerObject);
    });
}

function communicateServer(jsonPart, method) {
    return fetch(mainURL + jsonPart, method).then(
        data => data.json(),
        error => alert('Az adatbázis nem található !')
    );
}

function displayTeam(data) {
    data = data.sheets.Teams;

    for (let object of data) {
        if (object.Team === requiredTeam) {

            document.querySelector('#team-name').textContent = requiredTeam;
            const ul_team = document.querySelector('.team-data');
            const ul_info = document.querySelector('.team-info');

            for (let i = 0; i < dataToDisplay_team.length; i++) {

                let li = document.createElement('li');
                li.textContent = `${dataToDisplay_team[i] + ' :'}`;
                ul_team.appendChild(li);

                li = document.createElement('li');
                li.textContent = `${object[dataToDisplay_team[i]]}`;
                ul_info.appendChild(li);
            }
            break;
        }
    }
}

function displayPlayer(data) {
    data = data.sheets.Players;
    const ol = document.querySelector('.team-members');
    const info = [];

    for (let object of data) {
        for (let i = 0; i < dataToDisplay_player.length; i++) {

            info[i] = object[dataToDisplay_player[i]];
            if (dataToDisplay_player[i] === 'name') {
                const temp = info[i].split(' ');
                info[i] = temp[1] + ' ' + temp[0];
            }
        }
        const li = document.createElement('li');
        li.textContent = `${info.join(', ')}`;
        ol.appendChild(li);
    }
}

