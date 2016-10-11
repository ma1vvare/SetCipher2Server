var Web3 = require('web3');
var Cryptr=require('cryptr');
var bn = require('homomorphicjs');
var sha3_256 = require("js-sha3").sha3_256;

//var BigNumber = require('bignumber.js');
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

//Automatic create keypair
var key=bn.generate_paillier_keypair();
//
var cipher1=key['public_key'].raw_encrypt(23000000,1080);//about 32bits, input 40000000000
var cipher2=key['public_key'].raw_encrypt(24000000,1080);
var cipher3=key['public_key'].raw_encrypt(25000000,1080);

var tmp='';
var c=0;

/*
console.log(cipher1);
console.log("________");
//console.log(key['private_key'].raw_decrypt(cipher1));
console.log(cipher2);
console.log("________");
*/

var tmp1='';
for(var a=0;typeof(cipher1[a.toString()])=="number"||a.toString()=='t'||a.toString()=='s';a++){
  tmp1 = tmp1 + cipher1[a.toString()];
}

var tmp2='';
for(var a=0;typeof(cipher2[a.toString()])=="number"||a.toString()=='t'||a.toString()=='s';a++){
  tmp2 = tmp2 + cipher2[a.toString()];
}

var tmp3='';
for(var a=0;typeof(cipher3[a.toString()])=="number"||a.toString()=='t'||a.toString()=='s';a++){
  tmp3 = tmp3 + cipher3[a.toString()];
}

var ciphertextOP=cipher1.multiply(cipher2).multiply(cipher3);
var c='';
for(var a=0;typeof(ciphertextOP[a.toString()])=="number"||a.toString()=='t'||a.toString()=='s';a++){
  c = c + ciphertextOP[a.toString()];
}

/* cipher text
console.log("____c1____");
console.log(tmp1);
console.log("____c2____");
console.log(tmp2);
console.log("____c3____");
console.log(tmp3);
*/
console.log("____ciphertextOP____");
console.log(c);

console.log("____decryption____");
console.log("Answer is "+key['private_key'].raw_decrypt(ciphertextOP)[0]);

var ans=key['private_key'].raw_decrypt(ciphertextOP)[0];

//0xf6BADaDd9b078260881d495C8F546aab0739A08f


// console.log(cipher1['0'].toString()+cipher1['1'].toString());
//console.log(cipher2);

//console.log(key['private_key'].raw_decrypt(cipher1));


/*console.log(key['public_key']);
console.log(bn.EncodedNumber.encode(key['public_key'],'1234',1,2));
console.log(bn.EncodedNumber.decode;
console.log(bn.EncryptedNumber.prototype.ciphertext);*/

/*
{
name:'settest',
type:'function',
constant:false,
inputs:
[
  {
    "name":"sec",
    "type":"string"
  }
],
outputs:[]
},
{
name:'gettest',
type:'function',
constant:true,
inputs:[],
outputs:
[
  {
    "name":"",
    "type":"string"
  }
]
}
*/
var abi = [
    {
      "constant":false,
      "inputs":
      [
        {
          "name":"serverId",
          "type":"address"
        }
      ],
      "name":"getSplitData",
      "outputs":
      [
        {
          "name":"splitdata",
          "type":"string"
        }
      ],
      "payable":false,
      "type":"function"
    },

    {
      "constant":false,
      "inputs":[],
      "name":"isSensor",
      "outputs":
      [
        {
          "name":"",
          "type":"bool"
        }
      ],"payable":false,
      "type":"function"
    },
    {
      "constant":true,
      "inputs":[],
      "name":"doctor",
      "outputs":
      [
        {
          "name":"","type":"address"
        }
      ],
      "payable":false,
      "type":"function"
    },
    {
      "constant":false,
      "inputs":
      [
        {
          "name":"serverId","type":"address"
        },
        {
          "name":"splitdata",
          "type":"string"
        }
      ],
      "name":"putData",
      "outputs":[],
      "payable":false,
      "type":"function"
    },
    {
      "constant":false,
      "inputs":
      [
        {
          "name":"serverId","type":"address"
        }
      ],"name":"getDataSum","outputs":
      [
        {
          "name":"",
          "type":"uint256"
        }
      ],
      "payable":false,
      "type":"function"
    },
    {
      "constant":false,
      "inputs":[],
      "name":"isDoctor",
      "outputs":
      [
        {
          "name":"",
          "type":"bool"
        }
      ],
      "payable":false,
      "type":"function"
    }
]
  //  {"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"ciphertext","type":"uint256"}],"name":"transInfo","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"input","type":"address"}],"name":"isGradesOf","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"server1","type":"address"},{"name":"server2","type":"address"},{"name":"server3","type":"address"}],"name":"getAllData","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"sensor","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"timestamp","type":"uint256"},{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to","type":"address"}],"name":"ServerTransferDataEvent","type":"event"}];

//0x2baa76a93fa02e1fe0e09f91f2a3a4e50fbb7ad0
//console.log(web3.eth.accounts);
//var ins = myContract.at('0xf6badadd9b078260881d495c8f546aab0739a08f');//set text contract
//var ins = myContract.at('0xdc8c9d7c0936f3bb5de369c12913757fb74ea283');//set cipher text
//var ins = myContract.at('0x7ddd7881a0208bfd2838334bca8f4b4822a8f894');//Successful set cipher and address
//0x91cce40cc0273fc24e1d5f9C03e40f1ac22ea228 // Statistical
//set text example
//var re = ins.settest(c,{from:web3.eth.coinbase,gas: "1000000"});
//var result=ins.gettest();
//Set Cipher Text

var hashvalue=sha3_256(c);
console.log("hashvalue : "+hashvalue);
//console.log("typeof "+typeof(hashvalue));
var myContract = web3.eth.contract(abi);

var ins = myContract.at('0x723d6df49f82a929405e112f7dcd672f17d64cd6');
console.log("Hello World");
//var ascill_s=web3.toAscii(hashvalue);
//console.log("ascill_s : "+ascill_s);
web3.eth.defaultAccount=web3.eth.accounts[0];
var re1=ins.putData("0x14723a09acff6d2a60dcdf7aa4aff308fddc160c",sha3_256(tmp1),{from:web3.eth.coinbase,gas: "1000000"});
var re2=ins.putData("0x4b0897b0513fdc7c541b6d9d7e929c4e5364d2db",sha3_256(tmp2),{from:web3.eth.coinbase,gas: "1000000"});
var re3=ins.putData("0x583031d1113ad414f02576bd6afabfb302140225",sha3_256(tmp3),{from:web3.eth.coinbase,gas: "1000000"});

var result1=ins.getSplitData("0x14723a09acff6d2a60dcdf7aa4aff308fddc160c");
var result2=ins.getSplitData("0x4b0897b0513fdc7c541b6d9d7e929c4e5364d2db");
var result3=ins.getSplitData("0x583031d1113ad414f02576bd6afabfb302140225");

console.log("result : "+result1);
console.log("result : "+result2);
console.log("result : "+result3);
console.log(typeof('0x7ddd7881a0208bfd2838334bca8f4b4822a8f894'));
