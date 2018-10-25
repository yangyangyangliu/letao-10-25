$(function(){
  /*
  1.用户名必填  2-6位
  2.密码必须填  6-12位

  找到表单 调用bootstrapValidator方法
  bootstrapValidator这个插件会在表单提交的时候校验 保证表单能够提交
  如果校验失败 插件组件表单的提交 必须等到校验成功了才能正常提交
  
  */
  $('form').bootstrapValidator({
    //配置校验的规则
    fields: {
      // 配置用户名的校验
      username: {
        validators: {
          notEmpty: {
            message: '用户名不能为空'
          },
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度必须是2-6位'
          },
          callback: {
            message: '用户名不存在'
          }
        }
      },
      // 配置password校验规则
      password: {
        validators: {
          notEmpty: {
            message: '用户密码不能为空'
          },
          stringLength: {
            min: 6,
            max: 12,
            message: '用户密码的长度必须是6-12位'
          },
          callback: {
            message: '密码错误'
          }
        }
      }
    },
    //配置校验的小图标 默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
  })
  /*
  给表单注册一个表单校验成功的事件,校验成功才会触发.
  会触发success.form.bv事件，此时会提交表单，这个时候
  通常我们需要禁止表单的自动提交，使用ajax进行表单的提交。
  */
 $('form').on('success.form.bv', function (e) {
  e.preventDefault(); //禁止表单的自动提交 
  //使用ajax提交逻辑 发送ajax请求
  $.ajax({
    url:'/employee/employeeLogin',
    type:'post',
    data:$('form').serialize(),
    //dataType自动根据后端返回的content-type进行判断
    success :function(info){
      console.log(info);
      if (info.success) {
        //登录成功
        location.href = 'index.html'
      }
      if ( info.error === 1000) {
        //用户名不合法
        // alert('用户名不存在')
        $('form')
          .data('bootstrapValidator')
          .updateStatus('username','INVALID','callback')
      }
      // status的值有：
      // - NOT_VALIDATED：未校验的
      // - VALIDATING：校验中的
      // - INVALID ：校验失败的
      // - VALID：校验成功的。

      if ( info.error === 1001) {
        //password 不合法
        // alert('密码错误')
        $('form')
          .data('bootstrapValidator')
          .updateStatus('password','INVALID','callback')
      }
    }
  })
})
  //重置表单的功能
  //validator.resetForm();//重置表单，并且会隐藏所有的错误提示和图标
  $('[type=reset]').on('click',function(){
    //重置表单
    $('form')
      .data('bootstrapValidator')
      .resetForm(true)
  })
  
});