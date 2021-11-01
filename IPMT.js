// Copyright (c) 2021 Majid Mostafazadeh
 
/**************************************************************
 * Hello for a project I created it.
 * Contact me: majid.mostafazadeh@gmail.com
 * Thanks
 *************************************************************/

var rate = 0.015;
    period = 2;
    periods = 60;
    present = 15000;
    future = 0;
    type=0;
    var pmt, pvif;

    function PMT(rate, periods, present, future, type) {
      future || (future = 0);
      type || (type = 0);
  
      if (rate === 0)
          return -(present + future)/periods;
  
      pvif = Math.pow(1 + rate, periods);
      pmt = - rate * (present * pvif + future) / (pvif - 1);
  
      if (type === 1)
          pmt /= (1 + rate);
  
      return pmt;
  }

    function FV(rate, period, pmt, present, type) {
      var pow = Math.pow(1 + rate, period),
          fv;
      if (rate) {
       fv = (pmt*(1+rate*type)*(1-pow)/rate)-present*pow;
      } else {
       fv = -1 * (present + pmt * period);
      }
      return fv.toFixed(2);
    }



function IPMT(rate, period, periods, present, future, type) {
  // Credits: algorithm inspired by Apache OpenOffice

  // Initialize type
  var type = (typeof type === 'undefined') ? 0 : type;

  // Evaluate rate and periods (TODO: replace with secure expression evaluator)
  rate = eval(rate);
  periods = eval(periods);

  // Compute payment
  var payment = PMT(rate, periods, present, future, type);
  
  // Compute interest
  var interest;
  if (period === 1) {
    if (type === 1) {
      interest = 0;
    } else {
      interest = -present;
    }
  } else {
    if (type === 1) {
      interest = FV(rate, period - 2, payment, present, 1) - payment;
    } else {
      interest = FV(rate, period - 1, payment, present, 0);
    }
  }
  
  // Return interest
  return interest * rate;
}
