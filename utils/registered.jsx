var validator = {
  // 所有验证规则处理函数存放的地方
  types: {},
  validate: function (str, types) {
    this.messages = [];
    var checker, result, msg, i;
    for (i in types) {
      var type = types[i];
      checker = this.types[type]; // 获取验证规则的验证类
      if (!checker) { // 如果验证规则类不存在，抛出异常
        throw {
          name: "ValidationError",
          message: "No handler to validate type " + type
        };
      }
      result = checker.validate(str); // 使用查到到的单个验证类进行验证
      if (!result) {
        msg = "Invalid value for *" + type + "*, " + checker.instructions;
        this.messages.push(msg);
      }
    }
    return this.hasErrors();
  },
  // 是否有message错误信息
  hasErrors: function () {
    return this.messages.length !== 0;
  }
};
// 验证给定的值是否存在
validator.types.isExist = {
  validate: function (value) {
    // $.ajax() ...
    return true;
  },
  instructions: "给定的值已经存在"
};
// 验证给定的值长度是否合理
validator.types.isLength = {
  validate: function (value) {
    var l = value.toString().length
    if ( l > 2 && l < 10) {
      return true;
    } else {
      return false;
    }
  },
  instructions: "长度不合理，请长度在2-10个字符内"
};
// 验证给定的值是否 不是 纯数字
validator.types.isNoNumber = {
  validate: function (value) {
    return isNaN(value); // 伪写法，因为isNaN会误判布尔值和空字符串等，因此并不能作为真正判断纯数字的依据
  },
  instructions: "传入的值不能是纯数字"
};
// 验证给定的值是否不为空
validator.types.isNonEmpty = {
  validate: function (value) {
    return value !== "";
  },
  instructions: "传入的值不能为空"
};
// var types = ['isExist', 'isLength', 'isNoNumber', 'isNonEmpty']; // 决定想要的规则，无论增加或者减少，原函数都不需要改动
export function check (name, types) {
  validator.validate(name, types);
  if (validator.hasErrors()) {
    console.log(validator.messages.join("\n"));
    return false;
  } else {
    console.log('验证通过！')
    return true;
  }
}
// check('okckokckokck', types) // 长度不合理，请长度在2-10个字符内
// check('老faker', types) // true
// check('00001', types) // 传入的值不能是纯数字