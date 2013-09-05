var mongoose = require( 'mongoose' ),
    utils = require('route_utils');
var Schema   = mongoose.Schema;

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
    foldShape : [String],
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

Request.statics.createRequest = function (id, seq, accessionUsed){
    return new this({
        uuid : id,
        status : 1,
        sequence: seq,
        accessionUsed : accessionUsed
    });
};

Request.statics.flushOutdatedRequests = function(){
    var weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - utils.getExpirationDelay());
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
    return {env: this.getTargetEnv(), target: this.vivoEnv};
};

Request.methods.getTargetEnv = function(){
    return (this.targetEnv)? 'In-vivo':'In-vitro';
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

Request.statics.findRequest = function(uuid, callback) {
    Request.findOne({'uuid': 'uuid'}, function (err, result){
       if(err || !result) {
           console.log("Request with uuid "+uuid+" does not exist");
       }
       callback(err, result);
    });
};

mongoose.model( 'Request', Request );
mongoose.connect( 'mongodb://localhost/ribosoft-db' );