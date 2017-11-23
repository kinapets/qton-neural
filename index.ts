import {Layer, Network, Trainer, } from 'synaptic';
import * as mnist from 'mnist';
import * as trainSets from './training-sets';

const set = new trainSets.TrainingSet(100);

const trainingSet = set.getTrainingSet();
const testSet = set.getTestSet();

const inputLayer = new Layer(100);
const hiddenLayer = new Layer(100);
const outputLayer = new Layer(100);

console.log('project layers');
inputLayer.project(hiddenLayer);
hiddenLayer.project(outputLayer);

console.log('network building');
const myNetwork = new Network({
    input: inputLayer,
    hidden: [hiddenLayer],
    output: outputLayer
});

console.log('training starts');
const trainer = new Trainer(myNetwork);
trainer.train(trainingSet, {
    // rate: .001,
    iterations: 100,
    // error: 0.01,
    shuffle: true,
    log: 1,
    cost: Trainer.cost.CROSS_ENTROPY
});

console.log("------------------------------------");

console.log(myNetwork.activate(testSet[0].input).map(i => {
    return i;
}).toString());

console.log("------------------------------------");

console.log(myNetwork.activate(testSet[0].input).map(i => {
    if (i >0.8) {
        return 1;
    } else if (i < 0.1) {
        return 0;
    } else {
        return 2;
    }
}).toString());
console.log(testSet[0].output.toString());

process.exit(0);