var algorithm = require('algorithm');
var RequestExecutor = algorithm.HandleRequest;
var Model = algorithm.Model;
var AlgoRequest = Model.DomainObjects.Request;


var request = new AlgoRequest
(
    'GUACGUAUGCAUCGACUAGUCAGCAGAUCGUACUGAUGCUAGCUAGCUAGCUAGAGAUGAGUACGCCGAGAGUAGGUCGUGCUAGCGCGCGAGAGAGU',
    ' ', //Accesion number (who cares!)
    { //Preferences
        'tempEnv': 37,
        'naEnv': 150, //mM
        'mgEnv': 1, //mM
        'oligoEnv': 12,
        'cutsites': ['GUC', 'AUC'],
        'left_arm_min': 3,
        'right_arm_min': 3,
        'left_arm_max': 10,
        'right_arm_max': 10

    },
    'Test', //ID
    0,//CoreType
    'blah', //TODO: Promoter now part of preferences and not being used (code ready to be implemented)
    function (request) {
        console.log('Hello');
    }
);

RequestExecutor.HandleRequestPart1(request);