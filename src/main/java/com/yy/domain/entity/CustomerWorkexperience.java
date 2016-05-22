package com.yy.domain.entity;

import java.util.Date;

public class CustomerWorkexperience {
    private Long workexperienceid;

    private Long customerid;

    private String companyname;

    private Boolean iscurrentcompany;

    private Date startdate;

    private Date enddate;

    private String companypostcode;

    private String companyaddress;

    private String companytype;

    private String companyindustry;

    private String department;

    private String role;

    private String professionaltitle;

    public Long getWorkexperienceid() {
        return workexperienceid;
    }

    public void setWorkexperienceid(Long workexperienceid) {
        this.workexperienceid = workexperienceid;
    }

    public Long getCustomerid() {
        return customerid;
    }

    public void setCustomerid(Long customerid) {
        this.customerid = customerid;
    }

    public String getCompanyname() {
        return companyname;
    }

    public void setCompanyname(String companyname) {
        this.companyname = companyname == null ? null : companyname.trim();
    }

    public Boolean getIscurrentcompany() {
        return iscurrentcompany;
    }

    public void setIscurrentcompany(Boolean iscurrentcompany) {
        this.iscurrentcompany = iscurrentcompany;
    }

    public Date getStartdate() {
        return startdate;
    }

    public void setStartdate(Date startdate) {
        this.startdate = startdate;
    }

    public Date getEnddate() {
        return enddate;
    }

    public void setEnddate(Date enddate) {
        this.enddate = enddate;
    }

    public String getCompanypostcode() {
        return companypostcode;
    }

    public void setCompanypostcode(String companypostcode) {
        this.companypostcode = companypostcode == null ? null : companypostcode.trim();
    }

    public String getCompanyaddress() {
        return companyaddress;
    }

    public void setCompanyaddress(String companyaddress) {
        this.companyaddress = companyaddress == null ? null : companyaddress.trim();
    }

    public String getCompanytype() {
        return companytype;
    }

    public void setCompanytype(String companytype) {
        this.companytype = companytype == null ? null : companytype.trim();
    }

    public String getCompanyindustry() {
        return companyindustry;
    }

    public void setCompanyindustry(String companyindustry) {
        this.companyindustry = companyindustry == null ? null : companyindustry.trim();
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department == null ? null : department.trim();
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role == null ? null : role.trim();
    }

    public String getProfessionaltitle() {
        return professionaltitle;
    }

    public void setProfessionaltitle(String professionaltitle) {
        this.professionaltitle = professionaltitle == null ? null : professionaltitle.trim();
    }
}
