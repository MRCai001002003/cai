package com.yy.domain.entity;

import java.io.Serializable;

public class BdUser implements Serializable {
	/**
	 *
	 */
	private String id ;
	/**
	 * 手机号
	 */
	private String mobilePhone ;
	/**
	 * 固定电话
	 */
	private String fixPhone ;
	/**
	 *
	 */
	private String pwd ;
	/**
	 * 老密码
	 */
	private String oldPwd ;
	/**
	 * 名字
	 */
	private String name ;
	/**
	 * 身份证号
	 */
	private String idcard ;
	/**
	 * 身份证照片
	 */
	private String idcardPhoto ;
	/**
	 * 银行卡号
	 */
	private String bankCard;
	/**
	 * 余额
	 */
	private Double balance;
	private String roleId;
	public String getRoleId() {
		return roleId;
	}
	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}
	public String getRealName() {
		return realName;
	}
	public void setRealName(String realName) {
		this.realName = realName;
	}
	private String realName;
	public String[] getIdcardPhotoArray(){
		return idcardPhoto!=null?idcardPhoto.split(";"):null;
	}
	/**
	 *
	 */
	private String email ;
	/**
	 * 签名
	 */
	private String signature ;
	/**
	 * 照片
	 */
	private String photo ;

	public String[] getPhotoArray(){
		return photo!=null?photo.split(";"):null;
	}
	/**
	 *
	 */
	private Integer sex ;
	/**
	 * 省
	 */
	private String province ;
	/**
	 * 市
	 */
	private String city ;
	/**
	 * 区县
	 */
	private String county ;
	/**
	 * 详细地址
	 */
	private String addressDetail ;
	/**
	 * 学历
	 */
	private String education ;
	/**
	 * 工作类型(1,2)
	 */
	private String jobType ;
	/**
	 * 工作年限(1,2)
	 */
	private Integer jobYear ;
	/**
	 * 配偶姓名
	 */
	private String spouseName ;
	/**
	 * 配偶电话
	 */
	private String spousePhone ;
	/**
	 * 配偶身份证
	 */
	private String spouseIdcard ;
	/**
	 * 配偶身份证照片
	 */
	private String spouseIdcardPhoto ;

	public String[] getSpouseIdcardPhotoArray(){
		return spouseIdcardPhoto!=null?spouseIdcardPhoto.split(";"):null;
	}
	/**
	 * 结婚证照片
	 */
	private String weddingPhoto;

	public String[] getWeddingPhotoArray(){
		return weddingPhoto!=null?weddingPhoto.split(";"):null;
	}
	/**
	 * 家庭人口
	 */
	private Integer familyPopulation ;
	/**
	 * 劳动力数量
	 */
	private Integer laborNum ;
	/**
	 * 儿子数量
	 */
	private Integer sunNum ;
	/**
	 * 女儿数量
	 */
	private Integer daughterNum ;
	/**
	 * 身份信息(bd_dict外键)
	 */
	private String identity ;
	/**
	 * 注册时间
	 */
	private String registerTime ;
	/**
	 * 可耕面积
	 */
	private Double arableAreaNum ;
	/**
	 * 水浇地
	 */
	private Double irrigatedNum ;
	/**
	 * 旱地
	 */
	private Double dryNum ;
	/**
	 * 非滴灌
	 */
	private Double nonDripNum ;
	/**
	 * 滴灌地
	 */
	private Double dripGroundNum ;
	/**
	 * 水井
	 */
	private Double wellNum ;
	/**
	 * 更新时间
	 */
	private String updateTime ;

	/**
	 * 验证码
	 */
	private String checkCode ;

	/**
	 * 手机输入的验证码
	 */
	private String phoneCheckCode ;

	/**
	 * 删除标记（0：未删除，1：已删除）
	 */
	private Integer isDelete ;

	/**
	 * 状态(1：待审核，3：审核通过，5：审核不通过)
	 */
	private Integer state;

	/**
	 * 审核意见
	 */
	private String feedback ;
	private Integer role;
	public Integer getRole() {
		return role;
	}
	public void setRole(Integer role) {
		this.role = role;
	}
	/**
	 * 设备唯一编码
	 */
	private String imsi;

	public BdUser(){}
	public BdUser(String id){
		this.id=id;
	}
	public BdUser(String id, String mobilePhone) {
		this.id = id;
		this.mobilePhone = mobilePhone;
	}
	public String getImsi() {
		return imsi;
	}
	public void setImsi(String imsi) {
		this.imsi = imsi;
	}
	public void setId(String id) {
		this.id=id;
	}
	public String getId() {
		return id;
	}
	public void setMobilePhone(String mobilePhone) {
		this.mobilePhone=mobilePhone;
	}
	public String getMobilePhone() {
		return mobilePhone;
	}
	public void setFixPhone(String fixPhone) {
		this.fixPhone=fixPhone;
	}
	public String getFixPhone() {
		return fixPhone;
	}
	public void setPwd(String pwd) {
		this.pwd=pwd;
	}
	public String getPwd() {
		return pwd;
	}
	public void setName(String name) {
		this.name=name;
	}
	public String getName() {
		return name;
	}
	public void setIdcard(String idcard) {
		this.idcard=idcard;
	}
	public String getIdcard() {
		return idcard;
	}
	public void setIdcardPhoto(String idcardPhoto) {
		this.idcardPhoto=idcardPhoto;
	}
	public String getIdcardPhoto() {
		return idcardPhoto;
	}
	public void setEmail(String email) {
		this.email=email;
	}
	public String getEmail() {
		return email;
	}
	public void setSignature(String signature) {
		this.signature=signature;
	}
	public String getSignature() {
		return signature;
	}
	public void setPhoto(String photo) {
		this.photo=photo;
	}
	public String getPhoto() {
		return photo;
	}
	public void setProvince(String province) {
		this.province=province;
	}
	public String getProvince() {
		return province;
	}
	public void setCity(String city) {
		this.city=city;
	}
	public String getCity() {
		return city;
	}
	public void setCounty(String county) {
		this.county=county;
	}
	public String getCounty() {
		return county;
	}
	public void setAddressDetail(String addressDetail) {
		this.addressDetail=addressDetail;
	}
	public String getAddressDetail() {
		return addressDetail;
	}
	public void setEducation(String education) {
		this.education=education;
	}
	public String getEducation() {
		return education;
	}
	public void setJobType(String jobType) {
		this.jobType=jobType;
	}
	public String getJobType() {
		return jobType;
	}
	public void setSpouseName(String spouseName) {
		this.spouseName=spouseName;
	}
	public String getSpouseName() {
		return spouseName;
	}
	public void setSpousePhone(String spousePhone) {
		this.spousePhone=spousePhone;
	}
	public String getSpousePhone() {
		return spousePhone;
	}
	public void setSpouseIdcard(String spouseIdcard) {
		this.spouseIdcard=spouseIdcard;
	}
	public String getSpouseIdcard() {
		return spouseIdcard;
	}
	public void setSpouseIdcardPhoto(String spouseIdcardPhoto) {
		this.spouseIdcardPhoto=spouseIdcardPhoto;
	}
	public String getSpouseIdcardPhoto() {
		return spouseIdcardPhoto;
	}
	public String getWeddingPhoto() {
		return weddingPhoto;
	}
	public void setWeddingPhoto(String weddingPhoto) {
		this.weddingPhoto = weddingPhoto;
	}
	public void setFamilyPopulation(Integer familyPopulation) {
		this.familyPopulation=familyPopulation;
	}
	public Integer getFamilyPopulation() {
		return familyPopulation;
	}
	public void setLaborNum(Integer laborNum) {
		this.laborNum=laborNum;
	}
	public Integer getLaborNum() {
		return laborNum;
	}
	public void setSunNum(Integer sunNum) {
		this.sunNum=sunNum;
	}
	public Integer getSunNum() {
		return sunNum;
	}
	public void setDaughterNum(Integer daughterNum) {
		this.daughterNum=daughterNum;
	}
	public Integer getDaughterNum() {
		return daughterNum;
	}
	public void setIdentity(String identity) {
		this.identity=identity;
	}
	public String getIdentity() {
		return identity;
	}
	public void setRegisterTime(String registerTime) {
		this.registerTime=registerTime;
	}
	public String getRegisterTime() {
		return registerTime;
	}
	public void setArableAreaNum(Double arableAreaNum) {
		this.arableAreaNum=arableAreaNum;
	}
	public Double getArableAreaNum() {
		return arableAreaNum;
	}
	public void setIrrigatedNum(Double irrigatedNum) {
		this.irrigatedNum=irrigatedNum;
	}
	public Double getIrrigatedNum() {
		return irrigatedNum;
	}
	public void setDryNum(Double dryNum) {
		this.dryNum=dryNum;
	}
	public Double getDryNum() {
		return dryNum;
	}
	public void setNonDripNum(Double nonDripNum) {
		this.nonDripNum=nonDripNum;
	}
	public Double getNonDripNum() {
		return nonDripNum;
	}
	public void setDripGroundNum(Double dripGroundNum) {
		this.dripGroundNum=dripGroundNum;
	}
	public Double getDripGroundNum() {
		return dripGroundNum;
	}
	public void setWellNum(Double wellNum) {
		this.wellNum=wellNum;
	}
	public Double getWellNum() {
		return wellNum;
	}
	public void setUpdateTime(String updateTime) {
		this.updateTime=updateTime;
	}
	public String getUpdateTime() {
		return updateTime;
	}
	public void setIsDelete(Integer isDelete) {
		this.isDelete=isDelete;
	}
	public Integer getIsDelete() {
		return isDelete;
	}
	public String getCheckCode() {
		return checkCode;
	}
	public void setCheckCode(String checkCode) {
		this.checkCode = checkCode;
	}
	public String getPhoneCheckCode() {
		return phoneCheckCode;
	}
	public void setPhoneCheckCode(String phoneCheckCode) {
		this.phoneCheckCode = phoneCheckCode;
	}
	public String getOldPwd() {
		return oldPwd;
	}
	public void setOldPwd(String oldPwd) {
		this.oldPwd = oldPwd;
	}
	public Integer getJobYear() {
		return jobYear;
	}
	public void setJobYear(Integer jobYear) {
		this.jobYear = jobYear;
	}
	public Integer getState() {
		return state;
	}
	public void setState(Integer state) {
		this.state = state;
	}
	public String getFeedback() {
		return feedback;
	}
	public void setFeedback(String feedback) {
		this.feedback = feedback;
	}
	public Integer getSex() {
		return sex;
	}
	public void setSex(Integer sex) {
		this.sex = sex;
	}
	public String getBankCard() {
		return bankCard;
	}
	public void setBankCard(String bankCard) {
		this.bankCard = bankCard;
	}
	public Double getBalance() {
		return balance;
	}
	public void setBalance(Double balance) {
		this.balance = balance;
	}
	public String getEducationDesc() {
		if (this.education != null) {
			switch (this.education) {
			case "1": return "初中";
			case "2": return "高中";
			case "3": return "本科";
			case "4": return "硕士";
			case "5": return "博士";
			default: return null;
			}
		} else {
			return null;
		}
	}
	public String getJobTypeDesc() {
		if (this.jobType != null) {
			switch (this.jobType) {
			case "1": return "农业种植";
			case "2": return "畜牧种植";
			case "3": return "苗木种植";
			default: return null;
			}
		} else {
			return null;
		}
	}
	public String getJobYearDesc() {
		if(this.jobYear != null) {
			switch (this.jobYear) {
			case 1: return "1年";
			case 2: return "2年";
			case 3: return "3年";
			case 4: return "3-5年";
			case 5: return "5-10年";
			case 6: return "10年以上";
			default: return null;
			}
		} else {
			return null;
		}
	}
	public String getSexDesc() {
		if (this.sex != null) {
			switch (this.sex) {
			case 1: return "男";
			case 2: return "女";
			default: return "未知";
			}
		} else {
			return "未知";
		}
	}
	public String getIsDeleteDesc() {
		String isDeleteDesc = "正常";
		if(isDelete != null && isDelete==1){
			isDeleteDesc = "已删除";
		}
		return isDeleteDesc;
	}
}
