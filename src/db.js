var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
 

var Request = new Schema({
    uuid : String,
    createDate : {type: Date, default: Date.now },
    //Status is an integer that represents the state of the request
    // 0 : not_created
    // 1 : created
    // 2 : designed
    // 3 : inProcessing
    // 4 : processed
    //TODO flush database for records in state 4 with date > week
    status : { type: Number, min: 0, max: 4, default:0 },
    sequence : {type: String, trim: true },
    targetRegion : { type: Number, min: 3, max: 5, default:4 },
    //targetEnv = false for vitro, true for vivo
    targetEnv : Boolean,
    vivoEnv : {type: String, default:""},
    tempEnv : {type: Number, default: 37},
    naEnv: {type: Number, default: 0},
    mgEnv: {type: Number, default: 0},
    oligoEnv: {type: Number, default: 0},
    cutsites: [],
    foldShape : [],
    foldSW: []
});
 
mongoose.model( 'Request', Request );
 
mongoose.connect( 'mongodb://localhost/ribosoft-db' );