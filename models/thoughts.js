const {Schema, model} = require('mongoose');
const reactSchema = require('./reaction');
const moment = require('moment');
// my thoughts model
const thoughtsSchema = new Schema ({
  thoughtText: {
    type: String,
    required: true, 
    minLength: 1,
    maxLength: 280
  },
  createAt: {
    type: Date,
    default: Date.now,
    get: (timeCreated) => moment(timeCreated).format('MMM DD, YYYY [at] hh:mm a')
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactSchema]
},
{
  toJson: {
    virtuals: true,
    getters: true
  },
  id: false
});


thoughtsSchema.virtual('reactionCount').get(function(){
  return this.reactions.length;
});



const Thoughts = model('Thoughts', thoughtsSchema);

module.exports = Thoughts;