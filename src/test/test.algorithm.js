var algorithm = require(process.cwd()+'/node_modules/algorithm'),
    should = require('should'),
    fs = require('fs'),
    log = require('log'),
    test_utils = require('./test_utils.js');
    
var RequestExecutor = algorithm.HandleRequest;
var Model = algorithm.Model;
var AlgoRequest = Model.DomainObjects.Request;

var testID = 'Test';
var pathToDir = process.cwd()+'/'+testID;

beforeEach(function(done){
    log.setLogLevel(log.HIDE_ALL);
    test_utils.rmDirIfExists(pathToDir);
    done();
});

describe('Algorithm library', function(){
    it('Testing no candidates', function(done){
        var algoRequest = new AlgoRequest(
            'ATGCATGC',
            ' ', //Accesion number
            {
                'tempEnv' :37,
                'naEnv' : 150, //mM
                'mgEnv' : 1, //mM
                'oligoEnv': 12,
                'cutsites' : ['GUC','AUC'],
                'left_arm_min': 3,
                'right_arm_min': 3,
                'left_arm_max':10,
                'right_arm_max':10

            },
            testID,
            0,//CoreType
            'blah',
            function (request)
            {
                if(request.Completed){
                    request.State.should.include('No candidates were generated!');
                    var errorJsonExists = fs.existsSync(pathToDir+'/requestState.json')?
                        new Error('requestState.json was created even when no candidates were generated.'):
                                undefined;
                    done(errorJsonExists);
                }
            }//Promoter : Disabled due to change in algorithm sequence (e.g. non-annealing ones are removed earlier on)
        );
        RequestExecutor.HandleRequestPart1(algoRequest);
    });
});


// Always keep last
after(function(done){
    test_utils.rmDirIfExists(pathToDir);
    done();
});