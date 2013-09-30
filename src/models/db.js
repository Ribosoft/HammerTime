var mongoose = require( 'mongoose' ),
    algorithm = require('algorithm'),
    config = require('./config.json');
var Schema = mongoose.Schema;

var RequestExecutor = algorithm.HandleRequest;
var Model = algorithm.Model;
var AlgoRequest = Model.DomainObjects.Request;

/************************ Candidate Schema *****************/
var Candidate = new Schema({
    parentOutsideTarget : { type: Number },
    coreTypeId: [Number],
    fitness : [Number],
    structuresSFold : [{type : Schema.ObjectId, ref : 'Structure' }],
    structureUNA: {type : Schema.ObjectId, ref : 'Structure' },
    coreStart: Number
});

mongoose.model( 'Candidate', Candidate );

/************************ Structure Schema *****************/
var Structure = new Schema({
    parentRep : Schema.Types.Mixed,
    fitness: Number,
    frequency: Number,
    pairs:[{type:Schema.ObjectId, ref : 'Pair'}],
    fitnessdG: Number,
    dG: Number,
    rangedG : [Number]
});

mongoose.model( 'Structure', Structure );

/************************ Pair Schema *****************/
var Pair = new Schema({
    left: Number,
    right: Number,
    type: String
});

mongoose.model( 'Pair', Pair );


/************************ Request Schema *****************/
var Request = new Schema({
    uuid : String,
    createDate : {type: Date, default: Date.now },
    //Status is an integer that represents the state of the request
    // 1 : created
    // 2 : designed
    // 3 : inProcessing
    // 4 : processed
    status : { type: Number, min: 1, max: 4, default:1 },
    state : {type : String, default:'\n'},
    sequence : {type: String, trim: true },
    accessionNumber : {type: String, default: '', trim : true},
    candidates : [{type : Schema.ObjectId, ref : 'Candidate' }],
    foldShape : String,
    emailUser : {type:String, default:""},
    tempEnv : {type: Number, default: 37},
    naEnv: {type: Number, default: 0},
    mgEnv: {type: Number, default: 0},
    oligoEnv: {type: Number, default: 0},
    cutsites: [String],
    targetRegion : { type: Number, min: 3, max: 5, default:4 },
    //targetEnv = false for vitro, true for vivo
    targetEnv : Boolean,
    vivoEnv : {type: String, default:""}
});

Request.statics.createRequest = function (id, seq, accessionNumber){
    return new this({
        uuid : id,
        status : 1,
        sequence: seq,
        accessionNumber : accessionNumber
    });
};

Request.statics.createRequest = function (id,
					  seq,
					  accessionNumber,
					  foldShape,
					  tempEnv,
					  naEnv,
					  mgEnv,
					  oligoEnv,
					  cutsites,
					  targetRegion,
					  targetEnv,
					  vivoEnv){
    return new this({
        uuid : id,
        status : 2,
        sequence: seq,
        accessionNumber : accessionNumber,
	foldShape : foldShape,
	tempEnv: tempEnv,
	naEnv: naEnv,
	mgEnv: mgEnv,
	oligoEnv: oligoEnv,
	cutsites: cutsites,
	targetRegion: targetRegion,
	targetEnv: targetEnv,
	vivoEnv: vivoEnv
    });
};

Request.statics.flushOutdatedRequests = function(){
    var weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - config.expirationDelay);
    this.find({createDate:{"$lte":weekAgo}}, function(err, result, count){
        if(err)
            console.log("Could not find old requests");
        else if(!result)
            console.log("No request to flush");
        else {
            result.forEach(function(element){
                element.remove(function(err, result){
                    if(err)
                        console.log("Could not delete request");
                }); 
            });
            console.log("Database flushed for "+count+" old requests.");
        }
    });
};

Request.methods.getEnv = function(){
    if (this.targetEnv)
	return {type: this.getTargetEnv(), target: this.vivoEnv};
    else
	return {type: this.getTargetEnv(), target: ''};
};

Request.methods.getTargetEnv = function(){
    return (this.targetEnv)? 'vivo':'vitro';
};

Request.methods.getRegion = function(){
    return (this.targetRegion === 4)? 'ORF':
           (this.targetRegion === 5)?'5\'':'3\'';
};

Request.methods.setStatus = function(newStatus){
    //status is always between 1 and 4, and is always incremented by 1
    if( newStatus > 4 || newStatus< 1 || newStatus - 1 !== this.status) {
        return false;
    }
    
    this.status = newStatus;
    return true;
};

Request.statics.createAlgoRequest = function(uuid, algoCallback) {
    Request.findOne({uuid: uuid}, function(err, result) {
        if (err || !result) {
            console.log("cannot find id with error " + err + "or result " + result );
	    return null;
        } else {
	    var request = new AlgoRequest(
                result.sequence,
                result.accessionNumber,
		{
		    'tempEnv': result.tempEnv,
		    'naEnv': result.naEnv,
		    'mgEnv': result.mgEnv,
		    'oligoEnv': result.oligoEnv,
		    'cutsites': result.cutsites,
		    'left_arm_min': 3,
		    'right_arm_min': 3,
		    'left_arm_max': 8,
		    'right_arm_max': 8
		},
		result.uuid,
                0,
                'blah',
		algoCallback);
	    return request;
        }
    });
}

mongoose.model( 'Request', Request );
mongoose.connect( config.ribosoftDbUrl );
