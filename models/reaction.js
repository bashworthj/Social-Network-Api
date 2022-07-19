const {Schema, Types} = require('mongoose');
const moment = require('moment');
// reaction schema being dymanically injected to my thoughts model
const reactSchema = new Schema ({
  reactionId:{
    type: Schema.Types.ObjectId,
    default:() => new Types.ObjectId()
  },
  reactionBody:{
    type: String,
    required: true,
    maxLength: 280
  },
  username:{
    type: String,
    required: true
  },
  createdAt:{
    type: Date,
    default: Date.now,
    get: (timeCreated) => moment(timeCreated).format('MMM DD, YYYY [at] hh:mm a')
  }
},
{
  toJSON:{
    getters: true
  },
  id: false
});



module.exports = reactSchema;