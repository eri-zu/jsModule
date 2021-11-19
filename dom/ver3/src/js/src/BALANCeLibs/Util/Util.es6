// ------------------------------------------------------------
//
//  Util
//
// ------------------------------------------------------------

import UArray from './UtilPack/Array.es6';
import UColor from './UtilPack/Color.es6';
import UDate from './UtilPack/DateClass.es6';
import UDevice from './UtilPack/Device.es6';
import UMath from './UtilPack/Math.es6';
import UOther from './UtilPack/Other.es6';
import UString from './UtilPack/String.es6';
import UUrl from './UtilPack/Url.es6';

export default class Util {

  constructor() {

    this.a = new UArray();
    this.c = new UColor();
    this.d = new UDate();
    this.dv = new UDevice();
    this.m = new UMath();
    this.o = new UOther();
    this.s = new UString();
    this.u = new UUrl();

  }

}