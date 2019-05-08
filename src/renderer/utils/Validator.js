class Validator {

  /**
   *Creates an instance of Validator.
   * @param {[{fn:function,message:string}]} conditions 数组的每一项有两个属性  1. fn 返回值为Boolean。若返回false,代表该条件未通过验证 2.message 条件未通过时的提示信息
   * @memberof Validator
   */
  constructor(conditions) {
    let hint = Validator.hint || console.log
    setTimeout(() => {
      for (const item of conditions) {
        const res = item.fn();
        if (!res) {
          hint(item.message);
          return;
        }
      }
      this.callback()
    }, 0);
  }


  then(callback = () => { }) {
    this.callback = callback
  }
}


export default Validator