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
    //TODO figure out when & how to flush database 
    //(maybe add a state)
    status : { type: Number, min: 0, max: 4, default:0 }
});
 
mongoose.model( 'Request', Request );
 
mongoose.connect( 'mongodb://localhost/ribosoft-db' );