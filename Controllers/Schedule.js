const Schedule              = require('../Models/schedule');
const {StatusCodes}         = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');


const createSchedule = async (req, res) => {
    req.body.createdBy = req.user.userId
    const schedule = await Schedule.create(req.body)
    res.status(StatusCodes.CREATED).json({ schedule })
}


const getAllSchedules = async (req, res) => {
    const schedules = await Schedule.find({createdBy:req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({ schedules, count : schedules.length })  
}


const getSchedule = async (req, res) => {
   const { user: { userId }, params: {id: scheduleId} } = req
    
        const schedule = await Schedule.findOne({
            _id:scheduleId, createdBy:userId
        })

        if(!schedule){
            throw new NotFoundError(`No schedule with id : ${_id}`)
        }
    res.status(StatusCodes.OK).json({schedule})
}


const updateSchedule = async (req, res) => {
    const { body:{ activity, description },
    user: { userId }, 
    params: {id: scheduleId} } = req

    const schedule = await Schedule.findByIdAndUpdate( 
        { _id: scheduleId, createdBy:userId },
         req.body, 
        {new:true, runValidators:true} )

    if (activity==='' || description===''){
        throw new BadRequestError('Please provide an activity and a description')
    }

    if (!Schedule){
        throw new NotFoundError (`No Schedule with ID ${scheduleId}`)
    }

    res.status(StatusCodes.OK).json({schedule})
}


const deleteSchedule = async (req, res) => {
    const { user : { userId }, params: {id : scheduleId} } = req

    const schedule = await Schedule.findByIdAndRemove( 
        {_id:scheduleId, createdBy:userId }, )

        if (!schedule){
            throw new NotFoundError (`No Schedule with ID ${scheduleId}`)
        }

        const response = {
            message:'Activity successfully deleted',
            id: scheduleId
        }

    res.status(StatusCodes.OK).json({response})
}



module.exports = {
    getAllSchedules,
    createSchedule,
    getSchedule,
    updateSchedule,
    deleteSchedule
} 




















// const getAllSchedules = (async (req, res) => {
//     const schedule = await Schedule.find({})    
//     res.status(200).json({ schedule })
// });


// const createSchedule = (async (req, res) => {
//     const Schedule = await schedule.create(req.body)
//     res.status(201).json({ Schedule })
// });


// const getSchedule = ( async (req, res) => {
//     const {id:SheduleID} = req.params
//     const Schedule = await schedule.findOne({_id:SheduleID})

//     if (!Schedule) {
//         return next(createCustomError(`Not Schedule with id : ${Schedule}`, 404));
//     }
//     res.status(200).json({ Schedule })
// });


// const updateSchedule = ( async (req, res) => {
//     const {id : ScheduleID} = req.params;
//     const Schedule = await schedule.findOneAndUpdate({_id:ScheduleID}, req.body, {
//         new:true,
//         runValidators:true
//     } )
// });



// const deleteSchedule = ( async (req, res) => {
//     const {id : ScheduleID} = req.params;
//     const Schedule = await schedule.findOneAndDelete({_id : ScheduleID})

//     if(!Schedule) {
//         return next (createCustomError(`No schedule with id : ${ScheduleID}`, 404))
//     }
//     res.status(201).json({ Schedule })
// });


