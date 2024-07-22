const usermodel = require('../db/User');
const moment = require('moment');

async function getusers(req , res){
    try{
        const orders = await usermodel.find(); 
        res.status(200).send(orders);

    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getUsersForSidebar(req , res){
  try {
		const loggedInUserId = req.userId;

		const filteredUsers = await usermodel.find({ _id: { $ne: loggedInUserId } }).select("-password");

		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
}


async function usercount(req, res) {
  try {
    const params = req.params.day;
    let startDate, endDate, previousStartDate, previousEndDate;

    // Determine the start and end dates based on the period parameter
    if (params === 'today') {
      startDate = moment().startOf('day').toDate();
      endDate = moment().endOf('day').toDate();
      previousStartDate = moment().subtract(1, 'days').startOf('day').toDate();
      previousEndDate = moment().subtract(1, 'days').endOf('day').toDate();
    } else if (params === 'week') {
      startDate = moment().startOf('isoWeek').toDate();
      endDate = moment().endOf('isoWeek').toDate();
      previousStartDate = moment().subtract(1, 'weeks').startOf('isoWeek').toDate();
      previousEndDate = moment().subtract(1, 'weeks').endOf('isoWeek').toDate();
    } else if (params === 'month') {
      startDate = moment().startOf('month').toDate();
      endDate = moment().endOf('month').toDate();
      previousStartDate = moment().subtract(1, 'months').startOf('month').toDate();
      previousEndDate = moment().subtract(1, 'months').endOf('month').toDate();
    } else if (params === 'year') {
      startDate = moment().startOf('year').toDate();
      endDate = moment().endOf('year').toDate();
      previousStartDate = moment().subtract(1, 'years').startOf('year').toDate();
      previousEndDate = moment().subtract(1, 'years').endOf('year').toDate();
    } else {
      return res.status(400).json({ error: 'Invalid period parameter' });
    }

    // Count the number of users where type is 'Buyer' and created within the date range
    const currentBuyerCount = await usermodel.countDocuments({
      type: 'Buyer',
      createdAt: { $gte: startDate, $lte: endDate }
    });

    const previousBuyerCount = await usermodel.countDocuments({
      type: 'Buyer',
      createdAt: { $gte: previousStartDate, $lte: previousEndDate }
    });

    // Calculate whether there was an increase or decrease
    let changeType;
    if (currentBuyerCount > previousBuyerCount) {
      changeType = 'increase';
    } else if (currentBuyerCount < previousBuyerCount) {
      changeType = 'decrease';
    } else {
      changeType = 'nochange';
    }

    // Calculate the number of users increased or decreased
    let changeCount = Math.abs(currentBuyerCount - previousBuyerCount);

    res.status(200).json({ 
      period: params, 
      currentBuyerCount,
      changeType,
      changeCount
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const generateLabels = (range) => {
  const labels = [];
  const now = moment();

  switch (range) {
    case 'day':
      for (let i = 11; i >= 0; i--) {
        labels.push(now.clone().subtract(i, 'days').format('YYYY-MM-DD'));
      }
      break;
    case 'week':
      for (let i = 11; i >= 0; i--) {
        labels.push(`week-${now.clone().subtract(i, 'weeks').format('W-YYYY')}`);
      }
      break;
    case 'month':
      for (let i = 11; i >= 0; i--) {
        labels.push(now.clone().subtract(i, 'months').format('MMM-YYYY'));
      }
      break;
    default:
      break;
  }

  return labels;
};

const calculateUserCount = async (req, res) => {
  try {
    const { range } = req.params;
    const { start, end } = req.params;

    let labels = [];
    let startDate = moment().subtract(12, range).toDate();
    let endDate = new Date();

    if (start && end) {
      startDate = moment(start).startOf('day').toDate();
      endDate = moment(end).endOf('day').toDate();
    } else {
      labels = generateLabels(range);
    }

    const users = await usermodel.find({
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    });

    if (!start && !end) {
      const mappedData = labels.reduce((acc, label) => {
        acc[label] = 0;
        return acc;
      }, {});

      users.forEach((user) => {
        const userDate = moment(user.createdAt);
        const label = range === 'day' ? userDate.format('YYYY-MM-DD') :
                      range === 'week' ? `week-${userDate.format('W-YYYY')}` :
                      userDate.format('MMM-YYYY');

        if (mappedData[label] !== undefined) {
          mappedData[label] += 1;
        }
      });

      const data = Object.values(mappedData);
      res.status(200).json({ labels, data });
    } else {
      const customLabels = [];
      let currentDate = moment(startDate);

      while (currentDate.isSameOrBefore(endDate)) {
        customLabels.push(currentDate.format('YYYY-MM-DD'));
        currentDate.add(1, 'day');
      }

      const mappedData = customLabels.reduce((acc, label) => {
        acc[label] = 0;
        return acc;
      }, {});

      users.forEach((user) => {
        const userDate = moment(user.createdAt).format('YYYY-MM-DD');
        if (mappedData[userDate] !== undefined) {
          mappedData[userDate] += 1;
        }
      });

      const data = Object.values(mappedData);
      res.status(200).json({ labels: customLabels, data });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};





module.exports = { getusers , getUsersForSidebar , usercount  , calculateUserCount};