import { GameData, Token } from "@renderer/types/game";


export const Storage = {
    games: 'games',
    installationPath: 'installationPath'
}


export function get<T extends string | object>(key: string) : T | null{
    let value = localStorage.getItem(key)

    if(!value)
        return null;

    try {
        return JSON.parse(value) as T;
    } catch {
        return value as T;
    }
}

export function set(key: string, value: string | null | object) : void {
    if(!value)
        return localStorage.removeItem(key)

    if(typeof value == 'string')
        return localStorage.setItem(key, value)

    localStorage.setItem(key, JSON.stringify(value))
}

export type MapOfGames = Map<string, GameData>

export function getMapOfGames() : MapOfGames {
    let mapOfGames = get<MapOfGames>(Storage.games)

    if(!mapOfGames)
        return {} as MapOfGames

    return mapOfGames
}

export function getListOfGames() : GameData[]{
    return Object.values(getMapOfGames())
}

export function updateGameData(gameData: GameData) : void {
    let mapOfGames = get<MapOfGames>(Storage.games)

    if(!mapOfGames)
        return console.warn("Tried to update game data but it doesnt exist")

    const key = getKeyFromGameToken(gameData.token)

    mapOfGames[key] = gameData

    set(Storage.games, mapOfGames)

    
}

function getKeyFromGameToken({policy, assetName}: Token) : string {
    return policy + "." + assetName
}


export function addGameEntry(gameData: GameData) : void {
    let mapOfGames = get<Map<string, GameData>>(Storage.games)

    if(!mapOfGames)
        mapOfGames = {} as Map<string, GameData>

    const key = getKeyFromGameToken(gameData.token)

    if(mapOfGames[key]){
        console.warn(`Tried to add game "${key}" but already exists`)
        return
    }

    mapOfGames[key] = gameData

    set(Storage.games, mapOfGames)
}

