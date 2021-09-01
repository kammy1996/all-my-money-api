const Account = require('../models/schema/records/account');

 function makePaginationProps (page,itemsPerPage) {
  let perPage = parseInt(itemsPerPage)
  let offset = page * perPage - perPage;

  //asked for All records
  if(perPage < 0) {
    offset = 0
    perPage = 0
  }

  return {offset, perPage}
}

function makeObjectFromQuery(userId, query) {
  //Converting Query into Object
  var params = JSON.parse(
    '{"' + query.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
    function (key, value) {
      return key === '' ? value : decodeURIComponent(value);
    }
  );
  params.userId = userId;

  //Make query object for mongoose to search
  Object.keys(params).forEach((key) => {
    params[key] = params[key].split(',');
    if (key == 'amount') {
      params[key] = { $gte: params[key][0], $lte: params[key][1] };
    } else {
      params[key] = { $in: params[key] };
    }
  });

  return params;
}

function updateAccountBalance(state,userId, type,account,amount) { 
  Account.findOne({
    userId: userId , _id: account
 }).exec((err,account) => { 
    if(err)throw err;
    let balance = account.balance;

    if(state == 'add' || state == 'update') {
      if(type == 'income') {
        balance += amount;
      } else if(type == 'expense') {
        balance -= amount
      }
    } else if(state == 'delete') {
      if(type == 'income') {
        balance -= amount;
      } else if(type == 'expense') {
        balance += amount
      }
    }
    
    Account.updateOne({userId: userId,_id: account},{balance : balance},(err,docs) => { 
      if(err)throw err; 
      console.log(`balance Updated`)
    })
  })
}

module.exports = {
  makePaginationProps,
  updateAccountBalance,
  makeObjectFromQuery
}