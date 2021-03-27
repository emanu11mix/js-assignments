'use strict';

/**
 * Returns the bank account number parsed from specified string.
 *
 * You work for a bank, which has recently purchased an ingenious machine to assist in reading letters and faxes sent in by branch offices.
 * The machine scans the paper documents, and produces a string with a bank account that looks like this:
 *
 *    _  _     _  _  _  _  _
 *  | _| _||_||_ |_   ||_||_|
 *  ||_  _|  | _||_|  ||_| _|
 *
 * Each string contains an account number written using pipes and underscores.
 * Each account number should have 9 digits, all of which should be in the range 0-9.
 *
 * Your task is to write a function that can take bank account string and parse it into actual account numbers.
 *
 * @param {string} bankAccount
 * @return {number}
 *
 * Example of return :
 *
 *   '    _  _     _  _  _  _  _ \n'+
 *   '  | _| _||_||_ |_   ||_||_|\n'+     =>  123456789
 *   '  ||_  _|  | _||_|  ||_| _|\n'
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '| | _| _|| ||_ |_   ||_||_|\n'+     => 23056789
 *   '|_||_  _||_| _||_|  ||_| _|\n',
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '|_| _| _||_||_ |_ |_||_||_|\n'+     => 823856989
 *   '|_||_  _||_| _||_| _||_| _|\n',
 *
 */
function parseBankAccount(bankAccount) {
    bankAccount = bankAccount.replace(/\n/gm,"");
 
    function separateSymbolsForOneNumber(str, j) {
        var lineLength = 27;
        return str.substr(j*3, 3) + str.substr(j*3 + lineLength, 3) + str.substr(j*3 + 2*lineLength, 3) ;
    }
    
    var num, out  = '';
    for (var j = 0; j < 9; j++) {
        var str = separateSymbolsForOneNumber(bankAccount, j); 
        
        if (str[1] !== '_') {
            if (str[3] === '|') num = 4;
                else num = 1; }
            else if (str[7] !== '_') num = 7
                 else if (str[3] !== '|') {
                        if(str[6] == '|') num = 2
                            else num = 3
                        } else if(str[5] !== '|') {
                                if(str[6] !== '|') num=5
                                    else num = 6
                                } else if (str[6] === '|') { 
                                    if(str[4] === '_') num = 8
                                        else num = 0 }
                                    else num = 9;
        out += num;
    }
    return Number(out);
}


/**
 * Returns the string, but with line breaks inserted at just the right places to make sure that no line is longer than the specified column number.
 * Lines can be broken at word boundaries only.
 *
 * @param {string} text
 * @param {number} columns
 * @return {Iterable.<string>}
 *
 * @example :
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 26 =>  'The String global object',
 *                                                                                                'is a constructor for',
 *                                                                                                'strings, or a sequence of',
 *                                                                                                'characters.'
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 12 =>  'The String',
 *                                                                                                'global',
 *                                                                                                'object is a',
 *                                                                                                'constructor',
 *                                                                                                'for strings,',
 *                                                                                                'or a',
 *                                                                                                'sequence of',
 *                                                                                                'characters.'
 */
function* wrapText(text, columns) {
    while (text) {
        var cursor = columns;

        if (text.length > cursor)
            while (text[cursor] != " ")
                cursor--;
        
        yield text.slice(0, cursor);
        text = text.slice(cursor + 1);
    }    
}


/**
 * Returns the rank of the specified poker hand.
 * See the ranking rules here: https://en.wikipedia.org/wiki/List_of_poker_hands.
 *
 * @param {array} hand
 * @return {PokerRank} rank
 *
 * @example
 *   [ '4♥','5♥','6♥','7♥','8♥' ] => PokerRank.StraightFlush
 *   [ 'A♠','4♠','3♠','5♠','2♠' ] => PokerRank.StraightFlush
 *   [ '4♣','4♦','4♥','4♠','10♥' ] => PokerRank.FourOfKind
 *   [ '4♣','4♦','5♦','5♠','5♥' ] => PokerRank.FullHouse
 *   [ '4♣','5♣','6♣','7♣','Q♣' ] => PokerRank.Flush
 *   [ '2♠','3♥','4♥','5♥','6♥' ] => PokerRank.Straight
 *   [ '2♥','4♦','5♥','A♦','3♠' ] => PokerRank.Straight
 *   [ '2♥','2♠','2♦','7♥','A♥' ] => PokerRank.ThreeOfKind
 *   [ '2♥','4♦','4♥','A♦','A♠' ] => PokerRank.TwoPairs
 *   [ '3♥','4♥','10♥','3♦','A♠' ] => PokerRank.OnePair
 *   [ 'A♥','K♥','Q♥','2♦','3♠' ] =>  PokerRank.HighCard
 */
const PokerRank = {
    StraightFlush: 8,
    FourOfKind: 7,
    FullHouse: 6,
    Flush: 5,
    Straight: 4,
    ThreeOfKind: 3,
    TwoPairs: 2,
    OnePair: 1,
    HighCard: 0
}
function PokerTools() {
      
    function returnOne(char, hand, suitOrRank) {
        hand = hand.map(x => x.replace('10', '1'));
        return hand.reduce((prev, cur) => prev + ((cur[suitOrRank] === char) ? 1 : 0), 0);
    }    
        
    this.returnSuits = function(hand) {
        return {'♥' : returnOne('♥', hand, 1),
                '♦' : returnOne('♦', hand, 1),
                '♠' : returnOne('♠', hand, 1),
                '♣' : returnOne('♣', hand, 1)}    
    }
    
    this.returnRanks = function(hand) {
        return {'A' : returnOne('A', hand, 0),
                '2' : returnOne('2', hand, 0),
                '3' : returnOne('3', hand, 0),
                '4' : returnOne('4', hand, 0),
                '5' : returnOne('5', hand, 0),
                '6' : returnOne('6', hand, 0),
                '7' : returnOne('7', hand, 0),
                '8' : returnOne('8', hand, 0),
                '9' : returnOne('9', hand, 0),
                '1' : returnOne('1', hand, 0),
                'J' : returnOne('J', hand, 0),
                'Q' : returnOne('Q', hand, 0),
                'K' : returnOne('K', hand, 0)}
    }
    
    function getCardValue(a, AceAsLow) {
        if (!a) return 0;
        if (a[0] === 'A') return AceAsLow ? 1 : 14;
        if (a[0] === '1') return 10;
        if (a[0] === 'J') return 11;
        if (a[0] === 'Q') return 12;
        if (a[0] === 'K') return 13;
        return a[0];
    }
            
    function sortForStraight(hand, AceAsLow) {
        return hand.sort(function(a, b){
            return getCardValue(a, AceAsLow) - getCardValue(b, AceAsLow)
        })
    }
    
    this.isStraight = function(hand) {
        hand = sortForStraight(hand, true);
        var val1 = hand.every((x,i,hand) =>
            + getCardValue(hand[i], true) + 1 === + ( getCardValue(hand[i + 1], true) || 1 + + getCardValue(hand[i], true) )
            );
        
        hand = sortForStraight(hand, false);
        var val2 = hand.every((x,i,hand) => 
            + getCardValue(hand[i], false) + 1 === + ( getCardValue(hand[i + 1], false) || 1 + + getCardValue(hand[i], false) )
            );
        return val1 || val2;
    }
}

function getPokerHandRank(hand) {
  var PT = new PokerTools();
  var arrayOfPokerRanks = [];
  var suits = PT.returnSuits(hand);
  var ranks = PT.returnRanks(hand);
  var straight = PT.isStraight(hand);

  for(var key in suits) {
      if (suits[key] === 5)
          arrayOfPokerRanks.push(5);    
      if ( straight && suits[key] === 5)
          arrayOfPokerRanks.push(8)    
  }
  
  if (straight)
      arrayOfPokerRanks.push(4);    
          
  var b =0;
  for(var key in ranks) {
      if (ranks[key] === 2)
          arrayOfPokerRanks.push(1);    
      if (ranks[key] === 3)
          arrayOfPokerRanks.push(3);   
      if (ranks[key] === 4)
          arrayOfPokerRanks.push(7);   
      
      if (ranks[key] === 2) b += 2;
      if (ranks[key] === 3) b += 3;          
  }

  if (b == 4)
      arrayOfPokerRanks.push(2);      
  if (b == 5)
      arrayOfPokerRanks.push(6);      
  
  var numberOfRank;
  if (!arrayOfPokerRanks.length)
        numberOfRank = 0               
     else
        numberOfRank = Math.max.apply(null, arrayOfPokerRanks);
  return numberOfRank;
}


/**
 * Returns the rectangles sequence of specified figure.
 * The figure is ASCII multiline string comprised of minus signs -, plus signs +, vertical bars | and whitespaces.
 * The task is to break the figure in the rectangles it is made of.
 *
 * NOTE: The order of rectanles does not matter.
 * 
 * @param {string} figure
 * @return {Iterable.<string>} decomposition to basic parts
 * 
 * @example
 *
 *    '+------------+\n'+
 *    '|            |\n'+
 *    '|            |\n'+              '+------------+\n'+
 *    '|            |\n'+              '|            |\n'+         '+------+\n'+          '+-----+\n'+
 *    '+------+-----+\n'+       =>     '|            |\n'+     ,   '|      |\n'+     ,    '|     |\n'+
 *    '|      |     |\n'+              '|            |\n'+         '|      |\n'+          '|     |\n'+
 *    '|      |     |\n'               '+------------+\n'          '+------+\n'           '+-----+\n'
 *    '+------+-----+\n'
 *
 *
 *
 *    '   +-----+     \n'+
 *    '   |     |     \n'+                                    '+-------------+\n'+
 *    '+--+-----+----+\n'+              '+-----+\n'+          '|             |\n'+
 *    '|             |\n'+      =>      '|     |\n'+     ,    '|             |\n'+
 *    '|             |\n'+              '+-----+\n'           '+-------------+\n'
 *    '+-------------+\n'
 */

function HandleRectangles() {

    this.reduceToMatrix = function(figure) {
        var fig = figure.slice(), 
            n = fig.indexOf('\n') + 1,
            m = fig.length / n,
            matr = Array(m).fill([]).map(x => Array(n).fill(0)), 
            i = 0,
            j = 0;       
      
        for(var count = 0; count < n*m; count++, i++) {
           if (fig[count] === '\n') {
               j++;
               i = i - n;
           }
           if (fig[count] === '+')
               matr[j][i] = 1;
           if (fig[count] === '-' || fig[count] === '|')
               matr[j][i] = 2
        }
        return matr;
    }
    
    this.findRectangle = function(arr, i, j) {
         if (arr[j][i] === 1) {
            var obj = isRectangle(arr, i, j);
            if (obj)
                return formRectangle(i, j, obj.width, obj. height); 
         }
   } 
   
   function isRectangle(arr, i, j) {
        var w, h;
        var m = arr.length,
            n= arr[0].length;
          
          w = i + 1;
          while (w < n) { 
            
            while (arr[j][w] === 2 && w < n)
                w++;

            h = j + 1;
            while (h < m && arr[h][i] === 2)
                h++;
        
            if ( h < m && arr[h][w] === 1 && 
                    (arr[h-1][w] === 2 || arr[h-1][w] === 1) )
                        return { width: w, height: h };
            
            if(w === i + 1)
                break;
            w++
          }
        return false;
   }
   
   function formRectangle(a, b, c, d) {
        return '+' + '-'.repeat(c - a - 1) + '+' + '\n' +
                ('|' + ' '.repeat(c - a - 1) + '|' + '\n').repeat(d - b - 1) +
                  '+' + '-'.repeat(c - a - 1) + '+' + '\n';
   }
   
}

function* getFigureRectangles(figure) {
 
   var hr = new HandleRectangles();
   var arr = hr.reduceToMatrix(figure);
   var m = arr.length,
       n= arr[0].length; 
   for(var j = 0; j < m; j++) {      
       for(var i = 0; i < n; i++) {   
            var val = hr.findRectangle(arr, i, j);
            if (val)
                yield val;
       }
   }
}


module.exports = {
    parseBankAccount : parseBankAccount,
    wrapText: wrapText,
    PokerRank: PokerRank,
    getPokerHandRank: getPokerHandRank,
    getFigureRectangles: getFigureRectangles
};
