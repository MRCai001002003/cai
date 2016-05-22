package com.yy.control;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.yy.common.domain.ResponseResult;
import com.yy.common.exception.CustomException;
import com.yy.common.utils.Common;
import com.yy.domain.entity.BdUser;
import com.yy.domain.entity.Content;
import com.yy.service.ContentService;
import com.yy.web.utils.JsonViewFactory;
/**
 *
 * @ClassName: ContentControl
 * @Description: 内容管理类
 * @author qiming
 * @date : 2015年12月4日 上午10:14:00
 */
@Controller
@RequestMapping(value = "/content")
public class ContentControl {

	@Autowired
	private ContentService contentService;

	/**
	 *
	* @Description: 添加内容
	* @Title: insertSelective
	* @author: qiming
	* @date: 2015年12月4日 上午10:19:20
	* @throws
	 */
	@RequestMapping(value = "/filter/saveContent_async", method = RequestMethod.POST)
	public ModelAndView insertSelective(HttpServletRequest request, @RequestBody JSONObject obj) throws Exception {
		BdUser user = (BdUser)request.getSession().getAttribute(Common.SESSION_USER);
		Content smContent = new Content();
		if(obj.has("type")) {
			smContent.setType(obj.getString("type"));
		} else {
			throw new CustomException("发布类型不能为空！");
		}
		if(obj.has("source")) {
			smContent.setSource(obj.getString("source"));
		} else {
			smContent.setSource("未知");
		}
		if(obj.has("title")) {
			smContent.setTitle(obj.getString("title"));
		} else {
			throw new CustomException("文章标题不能为空！");
		}
		if(obj.has("content")) {
			smContent.setContent(obj.getString("content"));
		} else {
			throw new CustomException("文章内容不能为空！");
		}
		contentService.insertSelective(smContent, user);
		return JsonViewFactory.buildJsonView(new ResponseResult<>(true, "新增内容成功！", smContent));
	}

	/**
	 *
	* @Description: 添加或修改内容
	* @Title: saveOrUpdateContent
	* @author: qiming
	* @date: 2016年1月12日 上午9:14:26
	* @throws
	 */
	@RequestMapping(value = "/filter/saveOrUpdateContent_async", method = RequestMethod.POST)
	public ModelAndView saveOrUpdateContent(HttpServletRequest request, @RequestBody JSONObject obj) throws Exception {
		BdUser user = (BdUser)request.getSession().getAttribute(Common.SESSION_USER);
		Content smContent = new Content();
		if(obj.has("id")) {
			smContent.setId(obj.getString("id"));
		}
		if(obj.has("type")) {
			smContent.setType(obj.getString("type"));
		} else {
			throw new CustomException("发布类型不能为空！");
		}
		if(obj.has("source")) {
			smContent.setSource(obj.getString("source"));
		}
		if(obj.has("title")) {
			smContent.setTitle(obj.getString("title"));
		} else {
			throw new CustomException("文章标题不能为空！");
		}
		if(obj.has("content")) {
			smContent.setContent(obj.getString("content"));
		} else {
			throw new CustomException("文章内容不能为空！");
		}
		contentService.saveOrUpdateContent(smContent, user);
		return JsonViewFactory.buildJsonView(new ResponseResult<>(true, "操作成功！", smContent));
	}

	/**
	 *
	* @Description: 根据id查询内容详情
	* @Title: selectByPrimaryKey
	* @author: qiming
	* @date: 2015年12月4日 上午10:20:48
	* @throws
	 */
	@RequestMapping(value = "/filter/queryContentById_async", method = RequestMethod.GET)
	public ModelAndView selectByPrimaryKey(HttpServletRequest request, String id) throws Exception {
		return JsonViewFactory.buildJsonView(new ResponseResult<>(true, "查询成功！", contentService.selectByPrimaryKey(id)));
	}

	/**
	 *
	* @Description: 查询所有内容
	* @Title: selectContentList
	* @author: qiming
	* @date: 2015年12月14日 上午9:13:30
	* @throws
	 */
	@RequestMapping(value = "/filter/queryContentList_async", method = RequestMethod.GET)
	public ModelAndView selectContentList(HttpServletRequest request) throws Exception {
		return JsonViewFactory.buildJsonView(new ResponseResult<>(true, "查询成功！", contentService.selectContentList()));
	}

	/**
	 *
	* @Description: 根据状态查询内容
	* @Title: selectContentListByState
	* @author: qiming
	* @date: 2015年12月15日 上午9:51:44
	* @throws
	 */
	@RequestMapping(value = "/filter/queryContentListByState_async", method = RequestMethod.GET)
	public ModelAndView selectContentListByState(HttpServletRequest request, String state) throws Exception {
		return JsonViewFactory.buildJsonView(new ResponseResult<>(true, "查询成功！", contentService.selectContentListByState(StringUtils.isEmpty(state) ? null : Integer.parseInt(state))));
	}

	/**
	 *
	* @Description: 根据状态查询内容并进行分页封装
	* @Title: selectContentWithPage
	* @author: qiming
	* @date: 2015年12月15日 上午10:53:39
	* @throws
	 */
	@RequestMapping(value = "/filter/queryContentListWithPage_async", method = RequestMethod.GET)
	public ModelAndView selectContentWithPage(HttpServletRequest request, String state, String type) throws Exception {
		return JsonViewFactory.buildJsonView(new ResponseResult<>(true, "查询成功！", contentService.getContentList(request, StringUtils.isEmpty(state) ? null : Integer.parseInt(state), type)));
	}

	/**
	 *
	* @Description: 发布内容
	* @Title: publishContent
	* @author: qiming
	* @date: 2015年12月15日 下午3:20:59
	* @throws
	 */
	@RequestMapping(value = "/fiter/publishContent_async", method = RequestMethod.POST)
	public ModelAndView publishContent(HttpServletRequest request, Content smContent) throws Exception {
		BdUser user = (BdUser)request.getSession().getAttribute(Common.SESSION_USER);
		return JsonViewFactory.buildJsonView(new ResponseResult<>(true, "发布成功！", contentService.publishContent(smContent, user)));
	}

	/**
	 *
	* @Description: 下线内容
	* @Title: removeContent
	* @author: qiming
	* @date: 2015年12月16日 上午10:27:34
	* @throws
	 */
	@RequestMapping(value = "/filter/removeContent_async", method = RequestMethod.POST)
	public ModelAndView removeContent(HttpServletRequest request, Content smContent) throws Exception {
		return JsonViewFactory.buildJsonView(new ResponseResult<>(true, "下线成功！", contentService.removeContent(smContent)));
	}

	/**
	 *
	* @Description: 删除内容
	* @Title: deleteContent
	* @author: qiming
	* @date: 2016年1月5日 下午4:29:20
	* @throws
	 */
	@RequestMapping(value = "/filter/deleteContent_async", method = RequestMethod.POST)
	public ModelAndView deleteContent(HttpServletRequest request, Content smContent) throws Exception {
		return JsonViewFactory.buildJsonView(new ResponseResult<>(true, "删除成功！", contentService.deleteContent(smContent)));
	}

	/**
	 *
	* @Description: 审核内容
	* @Title: auditContent
	* @author: qiming
	* @date: 2015年12月16日 上午10:11:04
	* @throws
	 */
	@RequestMapping(value = "/filter/auditContent_async", method = RequestMethod.POST)
	public ModelAndView auditContent(HttpServletRequest request, Content smContent) throws Exception {
		return JsonViewFactory.buildJsonView(new ResponseResult<>(true, "审核操作成功！", contentService.auditContent(smContent)));
	}
	/**
	 * @Title: toEditor
	 * @Description: 跳转到内容编辑界面
	 * @author caizhen
	 * @param @return    设定文件
	 * @return String    返回类型
	 */
	@RequestMapping(value = "/filter/toEditor",method=RequestMethod.GET)
	public String toEditor(String uName,String userId,String projectType,HttpServletRequest request){
		return "/editor";
	}
	/**
	 * @Title: getContent_async
	 * @Description: 获取格式化后的文本文件
	 * @author caizhen
	 * @param @param request
	 * @param @return
	 * @return ModelAndView    返回类型
	 */
	@RequestMapping(value = "/getContent_async", method = RequestMethod.GET,produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getContent_async(HttpServletRequest request,Content c) throws Exception {
		return  contentService.getContent_async(request, c);
	}
}
