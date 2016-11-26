'use strict';

angular.module('stockApp')
.controller('tableController', ['$scope', 'menuFactory', 'favoriteFactory', function ($scope, menuFactory, favoriteFactory) {

// All the Services Needed
  $scope.stats = menuFactory.getStats();
  $scope.stockData = menuFactory.getStocks();
  $scope.sectors = menuFactory.getSectors();

  $scope.testPE = {};
  var testPE5 = $scope.testPE
  console.log("This is the test.PE: "+ testPE5);
// Promise for all the minAndMax
$scope.maxPE = menuFactory.getMaxPE();
$scope.minPE = menuFactory.getMinPE();
$scope.maxPB = menuFactory.getMaxPB();
$scope.minPB = menuFactory.getMinPB();
$scope.maxDebtToEquity = menuFactory.getMaxDebtToEquity();
$scope.minDebtToEquity = menuFactory.getMinDebtToEquity();
$scope.maxEPS = menuFactory.getMaxDebtToEquity();
$scope.minEPS = menuFactory.getMinDebtToEquity();
$scope.maxcashFlow = menuFactory.getMaxCashFlow();
$scope.mincashFlow = menuFactory.getMinCashFlow();

  $scope.addFavorite = function(index){
    console.log("index is " + index);
    favoriteFactory.addToFavorites(index);

  }

  // Filtering by name and ordering
  $scope.sortType = 'name';
  $scope.sortReverse = false;

  // Hiding rows
  $scope.showTop = true;

  // Angular Filter Sliders
  $scope.userFilter = {
    PE: { min: $scope.minPE, max: $scope.maxPE },
    PB: { min: "", max: "" },
    DebtToEquity: { min: "", max: "" },
    EPS: { min: "", max: "" },
    CashFlow: { min: "", max: "" },
    Industry: { sector: "" }
  };

  // User Search by companies
  $scope.search = { company: "" };
  $scope.all = "";
  // END Angular Filter

  //////////////// Filtering  /////////////

  //////////////// Filtering //////////////////////
  /////////////// PAGINATION ///////////////
  $scope.currentPage = 1;
  $scope.pageSize = 10;
  //////////////// END PAGINATION ///////////////////////


///////////////// Filters for Range Slideers //////////////////////
}]).filter('pbFilter', function () {
    return function(items, minPB, maxPB) {
      var arrayReturn = [];
      var userMinPB = parseFloat(minPB);
      var userMaxPB = parseFloat(maxPB);
        for (var i = 0; i < items.length; i++) {
          var priceBook = items[i].priceBook;
          if (priceBook >= userMinPB && priceBook <= userMaxPB){
            arrayReturn.push(items[i])
          }
        }
        return arrayReturn;
    };
}).filter('peFilter', function () {
    return function(items,minPE, maxPE) {
      var arrayReturn = [];
      var userMinPE = parseFloat(minPE);
      var userMaxPE = parseFloat(maxPE);
        for (var i = 0; i < items.length; i++) {
          var priceEquity = items[i].priceEquity;
          if (priceEquity >= userMinPE && priceEquity <= userMaxPE){
            arrayReturn.push(items[i])
          }
        }
        return arrayReturn;
    };
}).filter('debtEquityFilter', function () {
    return function(items, minDebtEquity, maxDebtEquity) {
      var arrayReturn = [];
      var userMinDebtEquity = parseFloat(minDebtEquity);
      var userMaxDebtEqutiy = parseFloat(maxDebtEquity);
        for (var i = 0; i < items.length; i++) {
          var debtEquity = items[i].debtEquity;
          if (debtEquity >= userMinDebtEquity && debtEquity <= userMaxDebtEqutiy){
            arrayReturn.push(items[i])
          }
        }
        return arrayReturn;
    };
}).filter('epsFilter', function () {
    return function(items, minEPS, maxEPS) {
      var arrayReturn = [];
      var userMinEPS = parseFloat(minEPS);
      var userMaxEPS = parseFloat(maxEPS);
        for (var i = 0; i < items.length; i++) {
          var EPS = items[i].EPS;
          if (EPS >= userMinEPS && EPS <= userMaxEPS){
            arrayReturn.push(items[i])
          }
        }
        return arrayReturn;
    };
}).filter('cashFlowFilter', function () {
    return function(items, minCashFlow, maxCashFlow) {
      var arrayReturn = [];
      var userMinCashFlow = parseFloat(minCashFlow);
      var userMaxCashFlow = parseFloat(maxCashFlow);
        for (var i = 0; i < items.length; i++) {
          var cashFlow = items[i].cashFlow;
          if (cashFlow >= userMinCashFlow && cashFlow <= userMaxCashFlow){
            arrayReturn.push(items[i])
          }
        }
        return arrayReturn;
    };
////////////////////// END Filters Range Sliders /////////////////////////////
})

.controller('favoritesController',['$scope', 'menuFactory', 'favoriteFactory', function($scope, menuFactory, favoriteFactory) {

  $scope.stats = menuFactory.getStats();
  $scope.favorites = favoriteFactory.getFavorites();
  var indexFav = $scope.favorites;
  console.log("This is the indexFav: ")
  console.log(indexFav)
  console.log(" ")
  $scope.stockData = menuFactory.getStocks();
  var stocks = $scope.stockData;
  $scope.sectors = menuFactory.getSectors();

//////////////////////////////////////////////////
////////// START Binary Search and QSORT ////////
////////////////////////////////////////////////
///////////////////////////////////////////
/////////// bsearch     //////////////////
/////////////////////////////////////////
$scope.checkFavs = function () {

  var currentPE = [];
  var currentPB = [];
  var currentDE = [];
  var currentEPS = [];
  var currentCF = [];

  console.log("This is before currentPE: ");
  console.log(currentPE);
  var bsearch = function(items, value){
    var startIndex = 0;
    var stopIndex = items.length - 1;

    while (startIndex <= stopIndex){
      var middle = Math.floor((stopIndex + startIndex)/2);
      try{
      if (items[value].id < items[middle].id){
        stopIndex = middle - 1;
      }
      else if (items[value].id > items[middle].id){
        startIndex = middle + 1;
      }
      else{
        console.log(true);
        return middle
      }
    } //try
    catch (e) {
      console.log(false)
      return -1;
    } // catch
    }
  }
///////////////////////////////////////////
/////////// bsearch END //////////////////
/////////////////////////////////////////

for (var i = 0; i < indexFav.length; i++){
    var sameID = bsearch(stocks, indexFav[i].id);
    console.log("This is the samdeID: ");
    console.log(sameID)
    console.log(" ")
    console.log("Checking stocks[sameID]: ");
    console.log(stocks[sameID]);
    currentPE.push(stocks[sameID].priceEquity);
    currentPB.push(stocks[sameID].priceBook);
    currentDE.push(stocks[sameID].debtEquity);
    currentEPS.push(stocks[sameID].EPS);
    currentCF.push(stocks[sameID].cashFlow);
  }

/////////////////////////////////////////////
///// QSORT                   //////////////
///////////////////////////////////////////
var Partition = function (array, start, end) {
  var pivot = array[end];
  var pIndex = start;
  var temp;
  for (var i = start; i < end; i++){
    if (array[i] <= pivot){
      temp = array[i];
      array[i] = array[pIndex];
      array[pIndex] = temp;
      pIndex++;
    }
  }
  temp = array[end];
  array[end] = array[pIndex];
  array[pIndex] = temp;

  return pIndex;
};

var qSort = function (array, start, end){
  if (start < end){
    var pIndex = Partition(array, start, end);
    qSort(array, start, pIndex-1);
    qSort(array, pIndex+1, end);
  }
}
qSort(currentPE, 0, currentPE.length-1);
qSort(currentPB, 0, currentPB.length-1);
qSort(currentDE, 0, currentDE.length-1);
qSort(currentEPS, 0, currentEPS.length-1);
qSort(currentCF, 0, currentCF.length-1);

////////////////////////////////////////////////
///// QSORT END                  //////////////
//////////////////////////////////////////////

  // console.log("This the mincurrentPE: ")
  // console.log(currentPE[0])
  // console.log("This is the maxcurrentPE: ")
  // console.log(currentPE[currentPE.length - 1])

  $scope.favMinPE = currentPE[0];
  $scope.favMaxPE = currentPE[currentPE.length - 1];
  $scope.favMinPB = currentPB[0];
  $scope.favMaxPB = currentPB[currentPB.length - 1];
  $scope.favMinDE = currentDE[0];
  $scope.favMaxDE = currentDE[currentDE.length - 1];
  $scope.favMinEPS = currentEPS[0];
  $scope.favMaxEPS = currentEPS[currentEPS.length - 1];
  $scope.favMinCF = currentCF[0];
  $scope.favMaxCF = currentCF[currentCF.length - 1];

}
////////////////////////////////////////////////
////////// END Binary Search and QSORT ////////
//////////////////////////////////////////////

    // var checkFavs = $scope.checkFavs()
    // Filtering by name and ordering
    $scope.sortType = 'name';
    $scope.sortReverse = false;

    // Hiding rows
    $scope.showTop = true;

    // Angular Filter Sliders
    $scope.userFilter = {
      PE: { min: "", max: ""},
      PB: { min: "", max: "" },
      DebtToEquity: { min: "", max: "" },
      EPS: { min: "", max: "" },
      CashFlow: { min: "", max: "" },
      Industry: { sector: "" }
    };

    // User Search by companies
    $scope.search = { company: "" };
    $scope.all = "";
    // END Angular Filter

    /////////////// PAGINATION ///////////////
    $scope.currentPage = 1;
    $scope.pageSize = 10;
    //////////////// END PAGINATION ///////////////////////

    $scope.deleteFavorite = function (index) {
      console.log("index deleted is: " + index);
      favoriteFactory.deleteFromFavorites(index);
    };
}])
.filter('favoriteFilter', function () {
    // return function (stockData, favorites) {
    //     var out = [];
    //     for (var i = 0; i < favorites.length; i++) {
    //         for (var j = 0; j < stockData.length; j++) {
    //             if (stockData[j].id === favorites[i].id)
    //                 out.push(stockData[j]);
    //         }
    //     }
    //     return out;

      return function(stockData, favorites){
          var out = [];
          for (var i = 0; i < favorites.length; i++){
            var bsearch = function(items, value){
              var startIndex = 0;
              var stopIndex = items.length - 1;

              while (startIndex <= stopIndex){
                var middle = Math.floor((stopIndex + startIndex)/2);
                try{
                if (items[value].id < items[middle].id){
                  stopIndex = middle - 1;
                }
                else if (items[value].id > items[middle].id){
                  startIndex = middle + 1;
                }
                else{
                  console.log(true);
                  return middle
                }
              } //try
              catch (e) {
                console.log(false)
                return -1;
              } // catch
              }
            }
            var sameID = bsearch(stockData, favorites[i].id);
            out.push(stockData[sameID])
          }
          return out;
    }})
;
