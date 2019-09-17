export class Polyline {
  public encodeGPolyline(path){
    var enc = "";
    var old = true;
    for(let c in path){
      var latlng = path[c];
      if(old === true){
        enc += this.encodeGPolylineNum(latlng[0])+
               this.encodeGPolylineNum(latlng[1]);
      }else{
        enc += this.encodeGPolylineNum(latlng[0] - old[0])+
               this.encodeGPolylineNum(latlng[1] - old[1]);
      }
      old = latlng;
    }
    return enc;
  }
  
  public encodeGPolylineNum(num){
    var fu = false;
    if(num < 0){
      fu = true;
    }
    //STEP2
    num = Math.round(num * 100000);
    //STEP3
    //STEP4
    num = num << 1;
    //STEP5
    if(fu){
        num = ~num;
    }
    //STEP6 - STEP7
    num = num.toString(2);
    var n = [];
    for(var c = 0; c < num.length; c++){
      n.push(num.charAt(c));
    }
    num = [];
    var nn = "";
    for(c=n.length-1;c >= 0;c--){
      nn = n[c] + nn;
      if(nn.length == 5){
        num.push(nn);
        nn = "";
      }
    }
    if(nn.length>0){
      nn = this.str_repeat("0",5 - nn.length) + nn;
      num.push(nn);
    }
    //STEP8 - STEP9 - STEP10 - STEP11
   
    for(var c = 0;c < num.length;c++){
      if(c != num.length - 1){
        num[c] = String.fromCharCode(this.bindec(num[c]) + 32 + 63);
      }else{
        num[c] = String.fromCharCode(this.bindec(num[c]) + 63);
      }
    }
    return num.join("");
  }
  
  str_repeat(str, n){
      var ret = "";
      for (; n > 0; n >>>= 1, str += str) if (n & 1) ret += str;
      return ret;
  }
  
  
  bindec(binary_string) {
      binary_string = (binary_string + '').replace(/[^01]/gi, '');
      return parseInt(binary_string, 2);
  }
}