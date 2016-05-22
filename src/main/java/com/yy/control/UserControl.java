package com.yy.control;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.yy.common.domain.ResponseResult;
import com.yy.web.utils.JsonViewFactory;

/**
 * 后台用户管理control
 * @author lix
 * 2015年11月10日 下午3:00:29
 */
@Controller
@RequestMapping("/user")
public class UserControl {
	/**
	 * 获取后台用户的真实姓名
	 * @author LuoRuixian
	 */
	@RequestMapping(value = "/getSysUserRealName_async", method = RequestMethod.GET)
	public ModelAndView getSysUserRealName(HttpServletRequest request) throws Exception{
		return JsonViewFactory.buildJsonView(new ResponseResult<>(true, "获取后台用户的真实姓名成功！",
				"测试"));
	}


}
