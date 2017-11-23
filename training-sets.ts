import * as _ from 'lodash';

const MAX_SIZE = 10;
const MAX_SIZE_SQUARE = MAX_SIZE * MAX_SIZE;

interface AbstractRoom {
    xSize: number;
    ySize: number;
}

interface Room extends AbstractRoom {
    vectors: number[][];
}

interface Rooms {[hash: string]: FlatRoom}

interface NeuralInput {input: number[];  output: number[]};

interface FlatRoom extends AbstractRoom {
    m: number;
    n: number;
    hash: string;
    vector: number[];
    emptyVector: number[]; // vector representing empty room only 1 or -1
}

function generateRandomRoom(m: number = 10, n: number = 10, xSize: number = 3, ySize: number = 3): Room {
    const x = _.random(0, m - xSize),
        y = _.random(0, n - ySize),
        room: number[][] = [];

    for (let i = 0; i < m; i++) {
        const temp = [];
        for (let j = 0; j < n; j++) {
            const drawX = (i >= x && i < x + xSize),
                drawY = (j >= y && j < y + ySize);
            const type = drawX && drawY ? 2 : 1
            temp.push(type);
        }
        room.push(temp);
    }
    return {vectors: room, xSize, ySize};
}

function generateRooms(count: number): Rooms {
    const rooms: Rooms = {};
    for (let i = 0; i <= count;  i++) {
        const m = _.random(5, MAX_SIZE),
            n = _.random(5, MAX_SIZE),
            xSize = _.round(_.random(2, m / 3)),
            ySize = _.round(_.random(2, n / 3));

        const room = generateRandomRoom(m, n, xSize, ySize),
            flatRoom = flatten(room)

        const hash = flatRoom.hash;
        rooms[hash] = flatRoom;
    }
    return rooms;
}

function flatten(room: Room): FlatRoom {
    if (room.vectors.length === 0) return null;

    const m = room.vectors[0].length,
        n = room.vectors.length,
        emptyVector = [];
    let flatVector: number[] = [],
        hash = '';
    room.vectors.map(vector => {
        flatVector = flatVector.concat(vector)
        vector.map(v => {
            emptyVector.push(1);
        })
    });
    const length = flatVector.length;
    for (let i = 0; i < (MAX_SIZE_SQUARE - length); i++) {
        flatVector = flatVector.concat([0]);
        emptyVector.push(0)
    }

    flatVector.map(i => {hash += i});

    return {m, n, vector: flatVector, hash, xSize: room.xSize, ySize: room.ySize, emptyVector};
}

function toRoom(flatRoom: FlatRoom): Room {
    if (flatRoom.vector.length === 0) return null;
    const vectors = [];
    for (let i = 0; i < flatRoom.vector.length; i = i + flatRoom.m) {
        vectors.push(flatRoom.vector.slice(i, i + flatRoom.m));
    }
    return {vectors, xSize: flatRoom.xSize, ySize: flatRoom.ySize};
}

export class TrainingSet {
    private training: NeuralInput[] = [];
    private test: NeuralInput[] = [];
    private rooms: Rooms;

    constructor(n: number) {
        const rooms = generateRooms(n - 1),
            roomsLength = Object.keys(rooms).length;
        let counter = 0;
        _.mapValues(rooms, (room) => {
            const neuralInput: NeuralInput = {input: room.emptyVector, output: room.vector};
            if (counter >= roomsLength / 2) {
                this.training.push(neuralInput);
            } else {
                this.test.push(neuralInput);
            }
            counter++;
        })
    }

    getTrainingSet() {
        return this.training;
    }

    getTestSet() {
        return this.test;
    }
}



const room1Input = [
    [
        1, 2, 1, 1, 1,
        1, 1, 1, 0, 1,
        1, 1, 1, 1, 1,
        1, 1, 0, 1, 1,
    ]
]

const room1Output = [
    [
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 1, 0, 0
    ],
]
