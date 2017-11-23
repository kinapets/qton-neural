import * as _ from 'lodash';

export enum PlaceType {
    nothing,
    wall,
    door,
    window,
    table,
    dinnerTable,
    sofa,
    tv,
    bed,
    wardrobe
}

export enum Direction {
    top,
    bottom,
    left,
    right
}


export interface RoomPixel {
    top: number;
    bottom: number;
    right: number;
    left: number;
    placeType: PlaceType;
}

export interface PixelPosition {m: number; n: number;}

export class DistanceService {

    private roomDefinition: PlaceType[][];

    constructor(roomDefinition: PlaceType[][]) {
        this.roomDefinition = roomDefinition;
    }

    getWallDistance(position: PixelPosition, direction: Direction) {
        const directionVector = this.getDirectionVector(direction);
        const {m, n} = position;
        let tempPosition = position;
        let distance = 0;

        while (!this.isEdge(tempPosition)) {
            distance++;
            const {m, n} = tempPosition;
            tempPosition = {m: m + directionVector.m, n: n + directionVector.n}
        }
        return distance;
    }

    /**
     * Is edge of room - ending with wall, window or door
     * @param position {PixelPosition}
     */
    isEdge(position: PixelPosition): boolean {
        const mMax = this.roomDefinition.length - 1,
            nMax = this.roomDefinition[0].length - 1,
            {m, n} = position,
            isZero = Boolean(m <= 0 || n <= 0),
            isMoreThanMatrixSize = Boolean(m >= mMax || n >= nMax),
            isOnEdgeOfMatrix = Boolean((isZero || isMoreThanMatrixSize)),
            placeType = _.get(this.roomDefinition, `[${m}][${n}]`, -1);
        return (isOnEdgeOfMatrix || (placeType < PlaceType.window && placeType !== PlaceType.nothing));
    }

    private getDirectionVector(direction: Direction): PixelPosition {
        switch (direction) {
            case Direction.bottom:
                return {m: 0, n: 1}
            case Direction.top:
                return {m: 0, n: -1}
            case Direction.left:
                return {m: -1, n: 0}
            case Direction.right:
                return {m: 1, n: 0}
            default:
                break;
        }
    }
}

