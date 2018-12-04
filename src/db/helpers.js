import http from 'axios';

var request = require("request");

async function getFavoritesId(user) {
    var options = { 
        method: 'GET',
        url: 'https://tvshows-8c59.restdb.io/rest/favorites?q={"user": "' + user + '"}',
        headers:  { 
            'cache-control': 'no-cache',
            'x-apikey': '5c029e90b83385326c1389eb',
            'content-type': 'application/json' 
        },
        json: true 
    };
  
    return new Promise(resolve => {
        request(options, function (error, response, body) {
            if (error) {
                resolve(null)
                throw new Error(error);
            }

            if (response.body && response.body.length > 0) {
                resolve(response.body[0]._id)
            } else {
                resolve(null)
            }
        });
    })
}

async function saveFavorites(user, favorites) {
    let favoritesId = await getFavoritesId(user)
    
    var options = { 
        method: favoritesId ? 'PUT' : 'POST',
        url: 'https://tvshows-8c59.restdb.io/rest/favorites' + (favoritesId ? "/" + favoritesId : ""),
        headers:  { 
            'cache-control': 'no-cache',
            'x-apikey': '5c029e90b83385326c1389eb',
            'content-type': 'application/json' 
        },
        body: { user: user, tvshows: favorites.join(",") },
        json: true 
    };
  
    return new Promise((resolve, reject) => {
        request(options, function (error, response, body) {
            if (error) {
                reject()
                throw new Error(error);
            }

            resolve()
        });
    })
}

async function getFavorites(user) {
    var options = { 
        method: 'GET',
        url: 'https://tvshows-8c59.restdb.io/rest/favorites?q={"user": "' + user + '"}',
        headers:  { 
            'cache-control': 'no-cache',
            'x-apikey': '5c029e90b83385326c1389eb',
            'content-type': 'application/json' 
        },
        json: true 
    };
  
    return new Promise(resolve => {
        request(options, function (error, response, body) {
            if (error) {
                resolve([])
                throw new Error(error);
            }

            if (response.body && response.body.length > 0 && response.body[0].tvshows) {
                resolve(response.body[0].tvshows.split(","))
            } else {
                resolve([])
            }
        });
    })
}
  
async function addFavorite(user, id) {
    let favorites = await getFavorites(user)

    favorites.push(id)

    await saveFavorites(user, favorites)
}

async function deleteFavorite(user, id) {
    let favorites = await getFavorites(user)

    favorites = favorites.filter(item => item != id)

    await saveFavorites(user, favorites)
}

export { getFavorites, addFavorite, deleteFavorite };