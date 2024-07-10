const ordermodel = require('../db/Order');
const moment = require('moment');

async function getorders (req , res){
    try{
        const orders = await ordermodel.find(); 
        res.status(200).send(orders);

    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function ordercount(req, res) {
    try {
        const params = req.params.day;
        // console.log(params);

        let startDate, endDate = moment().toDate();
        let previousStartDate, previousEndDate;

        // Determine the start and previous period dates based on the period parameter
        if (params === 'today') {
            startDate = moment().startOf('day').toDate();
            previousStartDate = moment().subtract(1, 'days').startOf('day').toDate();
            previousEndDate = moment().subtract(1, 'days').endOf('day').toDate();
        } else if (params === 'week') {
            startDate = moment().startOf('isoWeek').toDate();
            previousStartDate = moment().subtract(1, 'weeks').startOf('isoWeek').toDate();
            previousEndDate = moment().subtract(1, 'weeks').endOf('isoWeek').toDate();
          } else if (params === 'month') {
            startDate = moment().startOf('month').toDate();
            console.log("startDate",startDate);
            previousStartDate = moment().subtract(1, 'months').startOf('month').toDate();
            previousEndDate = moment().subtract(1, 'months').endOf('month').toDate();
        } else if (params === 'year') {
            startDate = moment().startOf('year').toDate();
            previousStartDate = moment().subtract(1, 'years').startOf('year').toDate();
            previousEndDate = moment().subtract(1, 'years').endOf('year').toDate();
        } else {
            return res.status(400).json({ error: 'Invalid period parameter' });
        }

        // Count the orders created in the current period
        const ordersCount = await ordermodel.countDocuments({
            createdAt: { $gte: startDate, $lte: endDate }
        });

        // Count the orders created in the previous period
        const previousOrdersCount = await ordermodel.countDocuments({
            createdAt: { $gte: previousStartDate, $lte: previousEndDate }
        });

        // Calculate the absolute change and determine the type of change
        const absoluteChange = ordersCount - previousOrdersCount;
        const changeType = absoluteChange > 0 ? 'increase' : (absoluteChange < 0 ? 'decrease' : 'nochange');

        res.status(200).json({
            params: params,
            ordersCount: ordersCount,
            previousOrdersCount: previousOrdersCount,
            absoluteChange: absoluteChange,
            changeType: changeType
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


async function orderamount(req, res) {
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

    // Helper function to calculate total amount for a date range
    const calculateTotalAmount = async (start, end) => {
      const result = await ordermodel.aggregate([
        {
          $match: {
            createdAt: { $gte: start, $lte: end }
          }
        },
        {
          $unwind: "$products"
        },
        {
          $group: {
            _id: null,
            totalAmount: {
              $sum: {
                $multiply: [
                  { $toDouble: "$products.prize" },
                  "$products.amount"
                ]
              }
            }
          }
        }
      ]);
      return result.length > 0 ? result[0].totalAmount : 0;
    };

    const totalAmount = await calculateTotalAmount(startDate, endDate);
    const previousTotalAmount = await calculateTotalAmount(previousStartDate, previousEndDate);

    const changeInAmount = totalAmount - previousTotalAmount;

    const PrizechangeType = changeInAmount > 0 ? 'increase' : (changeInAmount < 0 ? 'decrease' : 'nochange');

    res.status(200).json({ 
      params: params,
      totalAmount, 
      previousTotalAmount, 
      changeInAmount: Math.abs(changeInAmount), 
      PrizechangeType 
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

const orderchart = async (req, res) => {
  try {
  //  const { range } = req.params;
  const range = req.params.day;
   
  const labels = generateLabels(range);

  const orders = await ordermodel.find({
      createdAt: {
        $gte: range === 'day' ? moment().subtract(12, 'days').toDate() :
               range === 'week' ? moment().subtract(12, 'weeks').toDate() :
               range === 'month' ? moment().subtract(12, 'months').toDate() : new Date(),
        $lt: new Date(),
      },
    });
    
    const mappedData = labels.reduce((acc, label) => {
      acc[label] = 0;
      return acc;
    }, {});

    orders.forEach((order) => {
      const orderDate = moment(order.createdAt);
      const label = range === 'day' ? orderDate.format('YYYY-MM-DD') :
                    range === 'week' ? `week-${orderDate.format('W-YYYY')}` :
                    orderDate.format('MMM-YYYY');
      if (mappedData[label] !== undefined) {
        mappedData[label] += order.count || 1;
      }
    });

    const data = Object.values(mappedData);

    res.status(200).json({ labels, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};






const generateCustomLabels = (startDate, endDate) => {
  const labels = [];
  const start = moment(startDate);
  const end = moment(endDate);

  for (let date = start.clone(); date.isSameOrBefore(end); date.add(1, 'day')) {
    labels.push(date.format('YYYY-MM-DD'));
  }

  return labels;
};

const customOrderchart = async (req, res) => {
  try {
    // const { start, end } = req.query;
    const start = req.params.start;
    const end = req.params.end;

    console.log("start" , end);

    // Validate start and end dates
    if (!start || !end) {
      return res.status(400).json({ error: 'Both start and end dates are required.' });
    }

    const startDate = moment(start).startOf('day').toDate();
    const endDate = moment(end).endOf('day').toDate();

    const labels = generateCustomLabels(startDate, endDate);

    const orders = await ordermodel.find({
      createdAt: {
        $gte: startDate,
        $lte: endDate
      },
    });

    const mappedData = labels.reduce((acc, label) => {
      acc[label] = 0;
      return acc;
    }, {});

    orders.forEach((order) => {
      const orderDate = moment(order.createdAt).format('YYYY-MM-DD');
      if (mappedData[orderDate] !== undefined) {
        mappedData[orderDate] += order.count || 1;
      }
    });

    const data = labels.map(label => mappedData[label] || 0);

    res.status(200).json({ labels, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};








const generate_LabelsPrize = (range) => {
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

const calculateTotalPrice = async (req, res) => {
  try {
    const { range } = req.params;
    const { start, end } = req.params;

    console.log(start , end , range);
    let labels = [];
    let startDate = moment().subtract(12, range).toDate();
    let endDate = new Date();


    if (start && end) {
      startDate = moment(start).startOf('day').toDate();
      endDate = moment(end).endOf('day').toDate();
    } else {
      labels = generateLabels(range);
    }

    
    const orders = await ordermodel.find({
      createdAt: {
        $gte: range === 'day' ? moment().subtract(12, 'days').toDate() :
               range === 'week' ? moment().subtract(12, 'weeks').toDate() :
               range === 'month' ? moment().subtract(12, 'months').toDate() : new Date(),
        $lt: new Date(),
      },
    });

    const mappedData = labels.reduce((acc, label) => {
      acc[label] = 0;
      return acc;
    }, {});

    orders.forEach((order) => {
      const orderDate = moment(order.createdAt);
      const label = range === 'day' ? orderDate.format('YYYY-MM-DD') :
                    range === 'week' ? `week-${orderDate.format('W-YYYY')}` :
                    orderDate.format('MMM-YYYY');

      if (mappedData[label] !== undefined) {
        order.products.forEach((product) => {
          mappedData[label] += product.prize * product.amount;
        });
      }
    });

    const data = Object.values(mappedData);

    res.status(200).json({ labels, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



module.exports = { getorders , ordercount , orderamount ,orderchart, customOrderchart ,calculateTotalPrice };