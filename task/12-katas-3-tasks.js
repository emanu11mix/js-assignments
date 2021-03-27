'use strict';

/**
 * Returns true if word occurrs in the specified word snaking puzzle.
 * Each words can be constructed using "snake" path inside a grid with top, left, right and bottom directions
 *
 * @param {array} puzzle
 * @param {array} searchStr
 * @return {bool}
 *
 * @example
 *   var puzzle = [ 
 *      'ANGULAR',
 *      'REDNCAE',
 *      'RFIDTCL',
 *      'AGNEGSA',
 *      'YTIRTSP',
 *   ]; 
 *   'ANGULAR'   => true   (first row)
 *   'REACT'     => true   (starting from the top-right R adn follow the ↓ ← ← ↓ )
 *   'UNDEFINED' => true
 *   'RED'       => true
 *   'STRING'    => true
 *   'CLASS'     => true
 *   'ARRAY'     => true   (first column)
 *   'FUNCTION'  => false
 *   'NULL'      => false 
 */
function findStringInSnakingPuzzle(puzzle, searchStr) {
    
    function findFirstLetters(puzzle, symbol) {
      var arr = [];
      puzzle.forEach((x,i) => {
          var k = 0;
          while(k < x.length) {
              if (x[k] === symbol)
                  arr.push({row: i, col: k})
              k++
          }
      });  
      return arr;
    }
    
    function isSnakeCrossItself(path) {
        return path.filter((x, i, path) => path.indexOf(x) == i).length === path.length;
    }
    
    function uniqueIndex(a, b) {
        return Math.pow(2, a) * Math.pow(3, b);    
    }
    
    function search(puzzle, row, col, searchStr, k, path) {

        while( k < searchStr.length ) {
            var testDown =  (row !== puzzle.length - 1) 
            var testUp = (row !== 0);
            
            if ( puzzle[row][col + 1] === searchStr[k] ) {
                k++;
                col = col + 1;
                path.push(uniqueIndex(row, col));
                return search(puzzle, row, col, searchStr, k, path)
            } else if (puzzle[row][col - 1] === searchStr[k] ) {
                k++
                col = col - 1;
                path.push(uniqueIndex(row, col));
                return search(puzzle, row, col, searchStr, k, path)
            } else if ( testDown && puzzle[row + 1][col] === searchStr[k]) {
                k++
                row = row + 1;
                path.push(uniqueIndex(row, col));
                return search(puzzle, row, col, searchStr, k, path)
            } else if ( testUp && puzzle[row - 1][col] === searchStr[k] ) {
                k++
                row = row - 1;
                path.push(uniqueIndex(row, col));
                return search(puzzle, row, col, searchStr, k, path)
            }
              else 
                return false;
        }
        return isSnakeCrossItself(path)
    }
 
    
    var firstLetters = findFirstLetters(puzzle, searchStr[0]);
    
    for(var j = 0; j < firstLetters.length; j++) {
        var value = [];
        value.push(uniqueIndex(firstLetters[j].row, firstLetters[j].col)); 

        if ( search(puzzle, firstLetters[j].row, firstLetters[j].col, searchStr, 1, value) )
            return true;
    }
    return false;
    
}


/**
 * Returns all permutations of the specified string.
 * Assume all chars in the specified string are different.
 * The order of permutations does not matter.
 * 
 * @param {string} chars
 * @return {Iterable.<string>} all posible strings constructed with the chars from the specfied string
 *
 * @example
 *    'ab'  => 'ab','ba'
 *    'abc' => 'abc','acb','bac','bca','cab','cba'
 */
function* getPermutations(chars) {
  // Johnson -Trotter algorithm
  
  var arr = chars.split(''),
     n = arr.length,
     d = Array(n).fill(-1);   
  
  function swap(a) {
    var b = a + d[a];
    var tmp = arr[a],   tmpd = d[a];
    arr[a] = arr[b];    d[a] = d[b];
    arr[b] = tmp;       d[b] = tmpd;
  }
  
  function isMobile(i) {
     return ( d[i] < 0 && arr[i - 1] < arr[i] ) || ( d[i] > 0 && arr[i + 1] < arr[i] ) ;
  }
  
  while (true) {
    yield arr.join('');
    
    var id = -1;                    
    for (var i = 0; i < n; i++)
       if (isMobile(i) && ((id == -1) || (arr[i] > arr[id])) )
         id = i;
  
    if (id == -1) break;
    for (var i = 0; i < n; i++) 
      if (arr[i] > arr[id]) 
        d[i] = (d[i] > 0) ? -1 : 1 
    
    swap(id)
  }
}


/**
 * Returns the most profit from stock quotes.
 * Stock quotes are stores in an array in order of date.
 * The stock profit is the difference in prices in buying and selling stock.
 * Each day, you can either buy one unit of stock, sell any number of stock units you have already bought, or do nothing. 
 * Therefore, the most profit is the maximum difference of all pairs in a sequence of stock prices.
 * 
 * @param {array} quotes
 * @return {number} max profit
 *
 * @example
 *    [ 1, 2, 3, 4, 5, 6]   => 15  (buy at 1,2,3,4,5 and then sell all at 6)
 *    [ 6, 5, 4, 3, 2, 1]   => 0   (nothing to buy)
 *    [ 1, 6, 5, 10, 8, 7 ] => 18  (buy at 1,6,5 and sell all at 10)
 */
function getMostProfitFromStockQuotes(quotes) {
    var maxRight = quotes[quotes.length - 1];

    return quotes.reduceRight(function(prev, cur, i) {
                        
        maxRight = Math.max(maxRight, cur);
        return prev + (maxRight - cur);    
    }, 0); 
}


/**
 * Class representing the url shorting helper.
 * Feel free to implement any algorithm, but do not store link in the key\value stores.
 * The short link can be at least 1.5 times shorter than the original url.
 * 
 * @class
 *
 * @example
 *    
 *     var urlShortener = new UrlShortener();
 *     var shortLink = urlShortener.encode('https://en.wikipedia.org/wiki/URL_shortening');
 *     var original  = urlShortener.decode(shortLink); // => 'https://en.wikipedia.org/wiki/URL_shortening'
 * 
 */
function UrlShortener() {
    this.urlAllowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"+
                           "abcdefghijklmnopqrstuvwxyz"+
                           "0123456789-_.~!*'();:@&=+$,/?#[]";
    this.SEVEN = 7;
    this.THIRTEEN = 13;   

    var allChars = this.urlAllowedChars;
    this.myMap1 = new Map();
    
    for(var i = 0; i < allChars.length; i++) { 
        let e = i.toString(2);  
        e = addZerosBefore(e, this.SEVEN);
        this.myMap1.set(allChars[i], e);
    }
    this.myMap1.set(' ', (allChars.length).toString(2));
    
    this.myMap2 = new Map();   
    const START = 14000;              
    
    for(var i = START; i < START + Math.pow(2, this.THIRTEEN); i++) { 
        let e = (i - START).toString(2);      
        e = addZerosBefore(e, this.THIRTEEN);
        this.myMap2.set(String.fromCharCode(i), e);
    }
    
    function addZerosBefore(e, bit) {
        while(e.length < bit)        
            e = '0' + e;
        return e;
    }
}

UrlShortener.prototype = {
   
   encode: function(url) {
    
    var numberOfRequiredSpaces = this.THIRTEEN*(parseInt(url.length/this.THIRTEEN) + 1) - url.length;
    url = url + ' '.repeat(numberOfRequiredSpaces);
    
    var str = '';
    for(var i = 0; i < url.length; i++)
        str += this.myMap1.get(url[i]);

    var arr = str.split('');
    var out = '';
    
    while(arr.length) {

        for(var k of this.myMap2.keys())
            if(this.myMap2.get(k) === arr.slice(0, this.THIRTEEN).join('')) {
                out += k;
                arr.splice(0, this.THIRTEEN)
            }
    }
    
    return out
   },
    
   decode: function(code) {
       var str = '';
       for (var i = 0; i < code.length; i++) {
           str += this.myMap2.get(code[i]);
       }
      
       var arr = str.split('');
       var out = ''; 
            
       while(arr.length) {
     
            for(var k of this.myMap1.keys())
                if(this.myMap1.get(k) === arr.slice(0, this.SEVEN).join('')) {
                    out += k;
                    arr.splice(0, this.SEVEN)
                }
       }

       return out.trim();
   }       
}


module.exports = {
    findStringInSnakingPuzzle: findStringInSnakingPuzzle,
    getPermutations: getPermutations,
    getMostProfitFromStockQuotes: getMostProfitFromStockQuotes,
    UrlShortener: UrlShortener
};
