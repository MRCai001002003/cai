package com.yy.control;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.util.HashMap;
import java.util.Map;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import net.sf.json.JSONObject;

/**
 * @ClassName: Test
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author caizhen
 * @date 2016年2月24日 下午3:18:19
 */
public class Test {

	public static void main(String[] args) throws Exception {
		getInfo();
	}
	/**
	 * @Title: loadJs
	 * @Description: 加载JS文件
	 * @author caizhen
	 * @param @throws Exception    设定文件
	 * @return void    返回类型
	 */
	public static void readJs() throws Exception{
		//使用脚本引擎检索结果
		ScriptEngineManager manager = new ScriptEngineManager();
		ScriptEngine engine = manager.getEngineByName("js");
		engine.put("data", 2);
		engine.put("textModules", 333);
		engine.put("noClaims", Boolean.TRUE);
		Object result = engine.eval(new FileReader("E:/b.js"));//eval()函数返回执行脚本后所返回的值，默认情况下，将返回上次执行的表达式的值
		System.out.println(result);
	}
	/**
	 * @Title: getInfo
	 * @Description: 获取文件夹下的文件明细
	 * @author caizhen
	 * @return void    返回类型
	 */
	public static void getInfo() {
		JSONObject jObject = new JSONObject();
		String path = "D:/mywork/CMS/src/main/webapp/cms-modules";//"E:b/";
		File file = new File(path);
		File[] tempList = file.listFiles();
//		System.out.println("该目录下对象个数：" + tempList.length);
		for (int i = 0; i < tempList.length; i++) {
			if (tempList[i].isFile()) {
//				System.out.println("文 件名字：" + tempList[i].getName());
//				System.out.println("文     件：" + tempList[i]);
				jObject.put(tempList[i].getName().substring(0,tempList[i].getName().indexOf(".")), getStr(tempList[i]));

			}
			if (tempList[i].isDirectory()) {
				System.out.println("文件夹：" + tempList[i]);
			}
		}
		System.out.println(jObject);
	}
	/**
	 * @Title: getStr
	 * @Description: 获取文件内容
	 * @author caizhen
	 * @return String    文件內容
	 */
	public static String getStr(File file){
		try {
//			File file = new File(path);
			FileReader reader = new FileReader(file);
			int fileLen = (int)file.length();
			char[] chars = new char[fileLen];
			reader.read(chars);
			return String.valueOf(chars);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

}
