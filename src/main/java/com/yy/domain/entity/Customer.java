package com.yy.domain.entity;

import java.util.Date;

public class Customer {
    private Long customerid;

    private Long userid;

    private Long accountid;

    private String customertype;

    private String customercode;

    private String name;

    private String ename;

    private String alias;

    private String loginaccount;

    private String loginpassword;

    private Date loginpawwrodvalidity;

    private String paypassword;

    private String billsendtype;

    private String email;

    private String cellphone;

    private String fixtel;

    private String address;

    private String postcode;

    private String fax;

    private String channelcode;

    private String refereetype;

    private String refereeaccount;

    private Date createtime;

    private Long createrid;

    private Long lastupdaterid;

    private Date lastupdatetime;

    private String customerstatus;

    private String remark;

    private String lastloginip;

    private Date lastlogintime;

    private Integer logincount;

    private Integer passworderrortimes;

    private Date passwordlocktime;

    public Long getCustomerid() {
        return customerid;
    }

    public void setCustomerid(Long customerid) {
        this.customerid = customerid;
    }

    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long userid) {
        this.userid = userid;
    }

    public Long getAccountid() {
        return accountid;
    }

    public void setAccountid(Long accountid) {
        this.accountid = accountid;
    }

    public String getCustomertype() {
        return customertype;
    }

    public void setCustomertype(String customertype) {
        this.customertype = customertype == null ? null : customertype.trim();
    }

    public String getCustomercode() {
        return customercode;
    }

    public void setCustomercode(String customercode) {
        this.customercode = customercode == null ? null : customercode.trim();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getEname() {
        return ename;
    }

    public void setEname(String ename) {
        this.ename = ename == null ? null : ename.trim();
    }

    public String getAlias() {
        return alias;
    }

    public void setAlias(String alias) {
        this.alias = alias == null ? null : alias.trim();
    }

    public String getLoginaccount() {
        return loginaccount;
    }

    public void setLoginaccount(String loginaccount) {
        this.loginaccount = loginaccount == null ? null : loginaccount.trim();
    }

    public String getLoginpassword() {
        return loginpassword;
    }

    public void setLoginpassword(String loginpassword) {
        this.loginpassword = loginpassword == null ? null : loginpassword.trim();
    }

    public Date getLoginpawwrodvalidity() {
        return loginpawwrodvalidity;
    }

    public void setLoginpawwrodvalidity(Date loginpawwrodvalidity) {
        this.loginpawwrodvalidity = loginpawwrodvalidity;
    }

    public String getPaypassword() {
        return paypassword;
    }

    public void setPaypassword(String paypassword) {
        this.paypassword = paypassword == null ? null : paypassword.trim();
    }

    public String getBillsendtype() {
        return billsendtype;
    }

    public void setBillsendtype(String billsendtype) {
        this.billsendtype = billsendtype == null ? null : billsendtype.trim();
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email == null ? null : email.trim();
    }

    public String getCellphone() {
        return cellphone;
    }

    public void setCellphone(String cellphone) {
        this.cellphone = cellphone == null ? null : cellphone.trim();
    }

    public String getFixtel() {
        return fixtel;
    }

    public void setFixtel(String fixtel) {
        this.fixtel = fixtel == null ? null : fixtel.trim();
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address == null ? null : address.trim();
    }

    public String getPostcode() {
        return postcode;
    }

    public void setPostcode(String postcode) {
        this.postcode = postcode == null ? null : postcode.trim();
    }

    public String getFax() {
        return fax;
    }

    public void setFax(String fax) {
        this.fax = fax == null ? null : fax.trim();
    }

    public String getChannelcode() {
        return channelcode;
    }

    public void setChannelcode(String channelcode) {
        this.channelcode = channelcode == null ? null : channelcode.trim();
    }

    public String getRefereetype() {
        return refereetype;
    }

    public void setRefereetype(String refereetype) {
        this.refereetype = refereetype == null ? null : refereetype.trim();
    }

    public String getRefereeaccount() {
        return refereeaccount;
    }

    public void setRefereeaccount(String refereeaccount) {
        this.refereeaccount = refereeaccount == null ? null : refereeaccount.trim();
    }

    public Date getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }

    public Long getCreaterid() {
        return createrid;
    }

    public void setCreaterid(Long createrid) {
        this.createrid = createrid;
    }

    public Long getLastupdaterid() {
        return lastupdaterid;
    }

    public void setLastupdaterid(Long lastupdaterid) {
        this.lastupdaterid = lastupdaterid;
    }

    public Date getLastupdatetime() {
        return lastupdatetime;
    }

    public void setLastupdatetime(Date lastupdatetime) {
        this.lastupdatetime = lastupdatetime;
    }

    public String getCustomerstatus() {
        return customerstatus;
    }

    public void setCustomerstatus(String customerstatus) {
        this.customerstatus = customerstatus == null ? null : customerstatus.trim();
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }

    public String getLastloginip() {
        return lastloginip;
    }

    public void setLastloginip(String lastloginip) {
        this.lastloginip = lastloginip == null ? null : lastloginip.trim();
    }

    public Date getLastlogintime() {
        return lastlogintime;
    }

    public void setLastlogintime(Date lastlogintime) {
        this.lastlogintime = lastlogintime;
    }

    public Integer getLogincount() {
        return logincount;
    }

    public void setLogincount(Integer logincount) {
        this.logincount = logincount;
    }

    public Integer getPassworderrortimes() {
        return passworderrortimes;
    }

    public void setPassworderrortimes(Integer passworderrortimes) {
        this.passworderrortimes = passworderrortimes;
    }

    public Date getPasswordlocktime() {
        return passwordlocktime;
    }

    public void setPasswordlocktime(Date passwordlocktime) {
        this.passwordlocktime = passwordlocktime;
    }
}
