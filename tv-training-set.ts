
export const trainingSet = [
    [1, 1, 1, 1],
    [2, 1, 1, 1],
    [3, 1, 1, 1],
    [3, 0, 6, 0],
    [6, 0, 6, 0],
    [10, 1, 1, 1],
    [0, 1, 2, 1],
    [1, 1, 2, 1],
    [2, 1, 2, 1],
    [7, 0, 7, 0],
    [4, 1, 2, 1],
    [5, 1, 2, 1],
    [6, 1, 2, 1],
    [7, 1, 2, 1],
    [8, 1, 2, 1],
    [9, 1, 2, 1],
    [2, 0, 7, 0],
    [1, 0, 3, 0],
    [2, 0, 3, 0],
    [3, 0, 3, 0],
    [4, 0, 3, 0],
    [5, 0, 3, 0],
    [6, 0, 3, 0],
    [7, 0, 3, 0],
    [8, 0, 3, 0],
    [9, 0, 3, 0],
    [10, 0, 3, 0],
    [1, 0, 4, 0],
    [2, 0, 4, 0],
    [3, 0, 4, 0],
    [4, 0, 4, 0],
    [5, 0, 4, 0],
    [6, 0, 4, 0],
    [7, 0, 4, 0],
    [8, 0, 4, 0],
    [9, 0, 4, 0],
    [10, 0, 4, 0],
    [1, 0, 5, 0],
    [2, 0, 5, 0],
    [3, 0, 5, 0],
    [4, 0, 5, 0],
    [5, 0, 5, 0],
    [3, 0, 7, 0],
    [1, 0, 7, 0],
    [2, 0, 6, 0],
    [4, 0, 6, 0],
    [5, 0, 6, 0],
    [6, 0, 5, 0],
    [7, 0, 5, 0],
    [8, 0, 5, 0],
    [9, 0, 5, 0],
    [10, 0, 5, 0]].map(transform);



export const testSet = [
    [1, 0, 6, 0],
    [9, 1, 1, 1],
    [10, 1, 2, 1],
    [3, 1, 2, 1],
    [4, 1, 1, 1],
    [0, 1, 1, 1],
    [5, 1, 1, 1],
    [6, 1, 1, 1],
    [7, 1, 1, 1],
    [8, 1, 1, 1],

    [7, 0, 6, 0],
    [8, 0, 6, 0],
    [9, 0, 6, 0],
    [4, 0, 7, 0],
    [5, 0, 7, 0],
    [6, 0, 7, 0],
    [8, 0, 7, 0],
    [9, 0, 7, 0],
    [10, 0, 7, 0]].map(transform);

function transform(vector: number[]) {
    return {
        input: vector.slice(0, 3),
        output: vector.slice(3)
    }
}