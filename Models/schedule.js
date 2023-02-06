const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    activity:{
        type: String,
        required:[true, 'Please provide a activity name'],
        trim:true,
        maxlength:[20, 'Activity name cannot be more than 20 characters']
    },
    description: {
        type: String,
        required:[true, 'please provide a short description'],
        maxlength:100,
    },
    Status:{
        type: String,
        enum:['Upcoming', 'Current', 'Completed'],
        default: 'Upcoming',
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref: 'User',
              
    }
}, {timestamps:true});

module.exports = mongoose.model('schedule', scheduleSchema);



// const mongoose = require('mongoose')

// const JobSchema = new mongoose.Schema(
//   {
//     company: {
//       type: String,
//       required: [true, 'Please provide company name'],
//       maxlength: 50,
//     },
//     position: {
//       type: String,
//       required: [true, 'Please provide position'],
//       maxlength: 100,
//     },
//     status: {
//       type: String,
//       enum: ['interview', 'declined', 'pending'],
//       default: 'pending',
//     },
//     createdBy: {
//       type: mongoose.Types.ObjectId,
//       ref: 'User',
//       required: [true, 'Please provide user'],
//     },
//   },
//   { timestamps: true }
// )

// module.exports = mongoose.model('Job', JobSchema)
