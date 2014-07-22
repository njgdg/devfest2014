// 此代码依赖jquery
(function($) {
  
  // 检验规则函数
  // 1. 为了简单起见，每一个data-validate只关联一个函数
  var func = {
    phone: function() {
      var regexp = new RegExp(/^0?(13[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$/);
      if (!regexp.test(this.val)) {
        this.r = false;
        this.msg = '手机号格式不正确';
      } else {
        this.r = true;
      }
      return this;
    },
    phone_code: function() {
      var regexp = new RegExp(/^\d{4}$/);
      if (!regexp.test(this.val)) {
        this.r = false;
        this.msg = '校验码为4位数字';
      } else {
        this.r = true;
      }
      return this;
    },
    username: function() {
      var notAllowSign = new RegExp(/^[_]+$/);
      if (notAllowSign.test(this.val)) {
        this.r = false;
        this.msg = '昵称只有下划线';
        return this;
      }
      // console.info('1 passed');
      var notAllowNum = new RegExp(/^[0-9]+$/);
      if (notAllowNum.test(this.val)) {
        this.r = false;
        this.msg = '昵称不能只是数字';
        return this;
      }

      var notAllow = new RegExp(/^[\u4E00-\u9FFFh_a-zA-Z0-9]{17,}$/);
      if (notAllow.test(this.val)) {
        this.r = false;
        this.msg = '昵称最多只能1-16个字符';
        return this;
      }

      // console.info('2 passed');
      var allow = new RegExp(/^[\u4E00-\u9FFFh_a-zA-Z0-9]{1,16}$/);
      if (!allow.test(this.val)) {
        this.r = false;
        this.msg = '昵称只能是中英文、数字、下划线组合';
        return this;
      }

      this.r = true;

      return this;
    },
    password: function() {
      var notAllow0 = new RegExp(/\s/);
      if (notAllow0.test(this.val)) {
        this.r = false;
        this.msg = '对不起，密码不能包含空格';
        return this;
      }

      var notAllow1 = new RegExp(/^[a-zA-Z0-9_]{0,5}$/);
      if (notAllow1.test(this.val)) {
        this.r = false;
        this.msg = '密码太短了，至少有6个字符';
        return this;
      }

      var notAllow2 = new RegExp(/^[a-zA-Z0-9_]{33,}$/);
      if (notAllow2.test(this.val)) {
        this.r = false;
        this.msg = '密码太长了，最多有32个字符';
        return this;
      }
      // var notAllow3 = new RegExp(/^[0-9]{6,32}$/);
      // if(notAllow3.test(this.val)){
      //     this.r = false;
      //     this.msg = '密码过于简单，试试英文数字组合';
      //     return this;
      // }

      this.r = true;

      return this;
    },
    realname: function() {
      var regexp = new RegExp(/^\S+$/);
      if (!regexp.test(this.val)) {
        this.r = false;
        this.msg = '真实姓名不能包含空格';
      } else {
        this.r = true;
      }
      return this;
    },
    required: function() {
      if ($.trim(this.val).length === 0) {
        this.r = false;
        this.msg = '内容不能为空';
      } else {
        this.r = true;
      }
      return this;
    },
    chinese: function() {
      var regexp = new RegExp(/[^\u4e00-\u9fa5]/);
      if (regexp.test(this.val)) {
        this.r = false;
        this.msg = '请输入中文';
      } else {
        this.r = true;
      }
      return this;
    },
    num: function() {
      var regexp = new RegExp(/^[0-9]*$/);
      if (!regexp.test(this.val)) {
        this.r = false;
        this.msg = '请输入数字';
      } else {
        this.r = true;
      }
      return this;
    },
    english_num: function() {
      var regexp = new RegExp(/[a-zA-Z\d]+/);
      if (!regexp.test(this.val)) {
        this.r = false;
        this.msg = '只能是英文或数字';
      } else {
        this.r = true;
      }
      return this;
    },
    personal_id: function() {
      var regexp = new RegExp(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/);
      if (!regexp.test(this.val)) {
        this.r = false;
        this.msg = '身份证号输入错误';
      } else {
        this.r = true;
      }
      return this;
    },
    async_account: function(cb){
      func.email.call(this);
      if(!this.r){
        cb(this);
        return;
      }
      
      func.phone.call(this);
      if(!this.r){
        cb(this);
        return;
      }

      func.username.call(this);
      if(!this.r){
        cb(this);
        return;
      }

      cb(this);
    },
    email : function(){
      var regexp = new RegExp(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*$/);
      if (!regexp.test(this.val)) {
        this.r = false;
        this.msg = '邮箱输入错误';
      } else {
        this.r = true;
      }

      return this;
    }
  }

  function check($input, cb) {
    if (!$input || $input.length === 0) {
      return {
        r: true
      };
    }

    var funcName = $input.data('validate');
    var back = {
      val: $input.val(),
      name: $input.attr('name')
    };

    if(funcName.indexOf('async_') > -1){
      func[funcName].call(back, cb);
    }else{
      func[funcName].call(back);
      cb(back);
    }
  }

  $('body').find('[data-validate]').each(function(){
    $(this).blur(function(){
      check($(this), function(result){
        console.info(result);
      })
    })
  })
}(jQuery))