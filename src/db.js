var mongoose = require( 'mongoose' ),
    utils = require('utils');
var Schema   = mongoose.Schema;

/************************ Options Schema *****************/
var Options = new Schema({
    tempEnv : {type: Number, default: 37},
    naEnv: {type: Number, default: 0},
    mgEnv: {type: Number, default: 0},
    oligoEnv: {type: Number, default: 0},
    cutsites: [String]
    //coreType ?
});

mongoose.model( 'Options', Options );

/************************ TargetEnv Schema *****************/
var TargetEnv = new Schema({
    targetRegion : { type: Number, min: 3, max: 5, default:4 },
    //targetEnv = false for vitro, true for vivo
    targetEnv : Boolean,
    vivoEnv : {type: String, default:""}
});

TargetEnv.methods.getEnv = function(){
    if(vivoEnv)
        return {env:'vivo',target:this.vivoEnv};
    else
        return {env:'vitro'};
};

mongoose.model( 'TargetEnv', TargetEnv );

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
    //TODO flush database for records in state 4 with date > week
    status : { type: Number, min: 1, max: 4, default:1 },
    sequence : {type: String, trim: true },
    accessionNumber : String,
    targetEnv : {type : Schema.ObjectId, ref : 'TargetEnv'},
    prefs : {type : Schema.ObjectId, ref : 'Options' },
    candidates : [{type : Schema.ObjectId, ref : 'Candidate' }],
    foldShape : [String],
    foldSW: [String],
    emailUser : {type:String, default:""}
});

Request.statics.createRequest = function (id,seq){
    return new this({
        uuid : id,
        status : 1,
        sequence: seq
    });
};

Request.statics.flushOutdatedRequests = function(){
    var weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - utils.getExpirationDelay());
    this.find({createDate:{"$lte":weekAgo}}, function(err, result){
        if(err)
            console.log("Could not find old requests");
        if(result){
            result.remove(function(err, result){
                if(err)
                    console.log("Could not delete old requests");
                console.log("Database flushed");
            });
        }
    });
};

mongoose.model( 'Request', Request );

mongoose.connect( 'mongodb://localhost/ribosoft-db' );