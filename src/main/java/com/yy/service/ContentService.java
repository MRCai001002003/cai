package com.yy.service;

import java.io.File;
import java.io.FileReader;
import java.lang.reflect.Method;
import java.util.Date;
import java.util.List;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yy.dao.ContentDao;
import com.yy.domain.entity.BdUser;
import com.yy.domain.entity.Content;
import com.yy.domain.entity.ContentExtra;
import com.yy.web.utils.DateUtil;
import com.yy.web.utils.Pagination;
import com.zxlh.util.UUIDUtil;

@Service
public class ContentService {

	@Autowired
	private ContentDao contentDao;

	/**
	* @Description: 添加或修改内容
	* @Title: saveOrUpdateContent
	* @author: qiming
	* @date: 2016年1月12日 上午9:12:48
	* @throws
	 */
	public void saveOrUpdateContent(Content content, BdUser user) throws Exception {
		if(StringUtils.isEmpty(content.getId())) {
			insertSelective(content, user);
		} else {
			updateByPrimaryKeySelective(content, user);
		}
	}

	/**
	 *
	* @Description: 添加内容
	* @Title: insertSelective
	* @author: qiming
	* @date: 2015年12月4日 上午9:02:18
	* @throws
	 */
	public void insertSelective(Content content, BdUser user) throws Exception {
		content.setId(UUIDUtil.getUUID());
		content.setCreateUserId(user.getId());
		content.setUpdateUserId(user.getId());
		content.setCreateUserName(user.getName());
		content.setUpdateUserName(user.getName());
//		content.setCreateTime(DateUtil.getCurrentDateTime());
//		content.setUpdateTime(DateUtil.getCurrentDateTime());
		content.setCreateTime(new Date());
		content.setUpdateTime(new Date());
		content.setState(0);
		contentDao.insertSelective(content);
	}

	/**
	 *
	* @Description: 修改内容
	* @Title: updateByPrimaryKeySelective
	* @author: qiming
	* @date: 2016年1月12日 上午9:12:31
	* @throws
	 */
	public void updateByPrimaryKeySelective(Content content, BdUser user) throws Exception {
		content.setUpdateTime(new Date());
		content.setUpdateUserId(user.getId());
		content.setUpdateUserName(user.getName());
		contentDao.updateByPrimaryKeySelective(content);
	}

	/**
	 *
	* @Description: 根据id查询内容
	* @Title: selectByPrimaryKey
	* @author: qiming
	* @date: 2015年12月4日 上午9:02:04
	* @throws
	 */
	public ContentExtra selectByPrimaryKey(String id) {
		ContentExtra content = contentDao.selectByPrimaryKey(id);
		if(content != null && StringUtils.isNotEmpty(content.getContent())) {
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("content", content.getContent());
			content.setContent(null);
			content.setContentObj(jsonObject.get("content"));
		}
		return content;
	}

	/**
	 *
	* @Description: 查询所有内容
	* @Title: selectContentList
	* @author: qiming
	* @date: 2015年12月14日 上午9:11:18
	* @throws
	 */
	public List<Content> selectContentList() {
		return contentDao.selectContentList();
	}

	/**
	 *
	* @Description: 根据状态查询内容
	* @Title: selectContentListByState
	* @author: qiming
	* @date: 2015年12月15日 上午9:48:17
	* @throws
	 */
	public List<Content> selectContentListByState(Integer state) {
		return contentDao.selectContentListByState(state);
	}

	/**
	 *
	* @Description: 根据状态加载内容列表，并封装分页信息
	* @Title: getContentList
	* @author: qiming
	* @date: 2015年12月15日 上午10:49:28
	* @throws
	 */
	public Pagination getContentList(HttpServletRequest request, Integer state, String type) {
		//设置默认分页参数
				Integer startIndex=0;
				Integer currentPage=1;
				Integer pageSize=10;
				//获取分页信息
				if(StringUtils.isNotBlank(request.getParameter("currentPage")))
					currentPage=Integer.parseInt(request.getParameter("currentPage"))>0?Integer.parseInt(request.getParameter("currentPage")):1;
				if(StringUtils.isNotBlank(request.getParameter("pageSize")))
					pageSize=Integer.parseInt(request.getParameter("pageSize"))>0?Integer.parseInt(request.getParameter("pageSize")):10;
				startIndex=(currentPage-1)*pageSize;//查询开始下标
				Pagination pagination= null;
				pagination = getContentListPagination(currentPage, startIndex, pageSize, state, type);
				return pagination;
	}

	/**
	 * s
	* @Description: 根据状态加载内容列表，并封装分页信息(PC专用)
	* @Title: getContentListPC
	* @author: qiming
	* @date: 2016年1月11日 上午11:58:03
	* @throws
	 */
	public Pagination getContentListPC(HttpServletRequest request, Integer state, String type) {
		//设置默认分页参数
		Integer startIndex=0;
		Integer currentPage=1;
		Integer pageSize=3;
		Pagination pagination= null;
		pagination = getContentListPagination(currentPage, startIndex, pageSize, state, type);
		return pagination;
	}

	/**
	 *
	* @Description: 根据状态加载内容列表，并封装分页信息
	* @Title: getContentListPagination
	* @author: qiming
	* @date: 2015年12月15日 上午10:50:06
	* @throws
	 */
	public Pagination getContentListPagination(Integer currentPage, Integer startIndex, Integer pageSize, Integer state, String type) {
		List<ContentExtra> contentlist = contentDao.selectContentListWithPage(startIndex, pageSize, state, type);
		for(ContentExtra sm : contentlist) {
			if(sm != null && StringUtils.isNotEmpty(sm.getContent())) {
				JSONObject jsonObject = new JSONObject();
				jsonObject.put("content", sm.getContent());
				sm.setContent(null);
				sm.setContentObj(jsonObject.get("content"));
			}
		}
		int total = contentDao.selectContentListCountWithPage(state, type);
		Pagination pagination = new Pagination(contentlist,total,currentPage,pageSize);
		return pagination;
	}

	/**
	 *
	* @Description: 发布内容
	* @Title: publishContent
	* @author: qiming
	* @date: 2015年12月15日 下午3:14:51
	* @throws
	 */
	public Content publishContent(Content content, BdUser user) {
//		content.setPublishUserId(user.getId());
//		content.setPublishUserName(user.getName());
		content.setPublishTime(new Date());
		content.setState(1);
		contentDao.updateByPrimaryKeySelective(content);
		return contentDao.selectByPrimaryKey(content.getId());
	}

	/**
	 *
	* @Description: 下线内容
	* @Title: removeContent
	* @author: qiming
	* @date: 2015年12月16日 上午10:26:08
	* @throws
	 */
	public Content removeContent(Content content) {
		content.setState(5);
		contentDao.updateByPrimaryKeySelective(content);
		return contentDao.selectByPrimaryKey(content.getId());
	}

	/**
	 *
	* @Description: 删除内容
	* @Title: deleteContent
	* @author: qiming
	* @date: 2016年1月5日 下午4:29:07
	* @throws
	 */
	public int deleteContent(Content content) {
		content.setIsDelete(1);
		return contentDao.updateByPrimaryKeySelective(content);
	}

	/**
	 *
	* @Description: 审核内容
	* @Title: auditContent
	* @author: qiming
	* @date: 2015年12月16日 上午10:08:49
	* @throws
	 */
	public int auditContent(Content content) {
		return contentDao.updateByPrimaryKeySelective(content);
	}

	/**
	 *
	* @Description: 生成html文件
	* @Title: createFile
	* @author: qiming
	* @date: 2015年12月4日 下午2:42:45
	* @throws
	 */
	/**
	public String createFile(content content) throws Exception {
		//文件保存地址
		String localPath = Common.localPath;
//		String netPath = "http://localhost:8080/" + "xj-sys" + "/" + "resources" + "/" + "ueditor" + "/" + "html" + "/" + DateUtil.getCurrentDate("yyyyMMdd") + "/";
//		String storePath = "xj-sys" + File.separator + "resources" + File.separator + "ueditor" + File.separatorChar + "html" + File.separator + DateUtil.getCurrentDate("yyyyMMdd") + File.separator;
		//生成的页面及上传文件地址，在服务器上单独保存，不放在项目目录下
		String netPath = "http://localhost:8080/" + "xj_html" + "/" + "html" + "/" + DateUtil.getCurrentDate("yyyyMMdd") + "/";
		String storePath = "xj_html" + File.separator + "html" + File.separator + DateUtil.getCurrentDate("yyyyMMdd") + File.separator;

		//生成6位随机数组成的文件名称
		String fileName = "";
		String chars="0123456789";
    	for(int i=0;i<6;i++){
    		int rand=(int)(Math.random()*10);
    		fileName += chars.charAt(rand);
    	}
    	fileName += ".html";
    	//文件完整地址
    	String filePath = localPath + storePath + fileName;
    	String returnPath = netPath + fileName;
    	File file = new File(filePath);
		if (!file.getParentFile().exists()) {
			file.getParentFile().mkdirs();
		}
		file.createNewFile();
		//向文件中写入内容
		StringBuilder sb = new StringBuilder();
		sb.append("<!DOCTYPE html>\n");
		sb.append("<html>\n");
		sb.append("<head>\n");
		sb.append("	<meta http-equiv='Content-Type' content='text/html' charset='utf-8'/>\n");
		sb.append("	<title>" + content.getTitle() + "</title>\n");
		sb.append("	<script src='../../ueditor.parse.js'></script>\n");
//		sb.append("	<script>setTimeout(function(){uParse('div',{rootPath: '../../'})},300)</script>\n");
		sb.append("</head>\n");
		sb.append("<body>\n");
		sb.append("	<div>" + content.getContent() + "</div>\n");
		sb.append("</body>\n");
		sb.append("</html>");

		FileWriter fw = new FileWriter(file, true);
		BufferedWriter bw = new BufferedWriter(fw);
		bw.write(sb.toString());
		bw.flush();
		bw.close();
		fw.close();
//		FileReader fr = new FileReader(file);
//		BufferedReader bReader = new BufferedReader(fr);
//		String string = bReader.readLine();
//		System.out.println(string);
		return returnPath;
	}
	 * @throws SecurityException
	 * @throws NoSuchMethodException
	**/
	public String getContent_async(HttpServletRequest request,Content content) throws Exception{
		ContentExtra cExtra=selectByPrimaryKey(content.getId());
		return cExtra.getContentObj().toString();
	}
}
