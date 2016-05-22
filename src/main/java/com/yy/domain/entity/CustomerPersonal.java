package com.yy.domain.entity;

import java.util.Date;

public class CustomerPersonal {
    private Long customerid;

    private String sex;

    private Date birthdate;

    private String national;

    private String marriagetype;

    private String politicsstatus;

    private String dwellingcondition;

    private String residentialaddress;

    private String residentialpostcode;

    private String hukouaddress;

    public Long getCustomerid() {
        return customerid;
    }

    public void setCustomerid(Long customerid) {
        this.customerid = customerid;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex == null ? null : sex.trim();
    }

    public Date getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(Date birthdate) {
        this.birthdate = birthdate;
    }

    public String getNational() {
        return national;
    }

    public void setNational(String national) {
        this.national = national == null ? null : national.trim();
    }

    public String getMarriagetype() {
        return marriagetype;
    }

    public void setMarriagetype(String marriagetype) {
        this.marriagetype = marriagetype == null ? null : marriagetype.trim();
    }

    public String getPoliticsstatus() {
        return politicsstatus;
    }

    public void setPoliticsstatus(String politicsstatus) {
        this.politicsstatus = politicsstatus == null ? null : politicsstatus.trim();
    }

    public String getDwellingcondition() {
        return dwellingcondition;
    }

    public void setDwellingcondition(String dwellingcondition) {
        this.dwellingcondition = dwellingcondition == null ? null : dwellingcondition.trim();
    }

    public String getResidentialaddress() {
        return residentialaddress;
    }

    public void setResidentialaddress(String residentialaddress) {
        this.residentialaddress = residentialaddress == null ? null : residentialaddress.trim();
    }

    public String getResidentialpostcode() {
        return residentialpostcode;
    }

    public void setResidentialpostcode(String residentialpostcode) {
        this.residentialpostcode = residentialpostcode == null ? null : residentialpostcode.trim();
    }

    public String getHukouaddress() {
        return hukouaddress;
    }

    public void setHukouaddress(String hukouaddress) {
        this.hukouaddress = hukouaddress == null ? null : hukouaddress.trim();
    }
}
