package com.yy.domain.entity;

import java.util.Date;

public class CustomerEducation {
    private Long customereducationid;

    private Long customerid;

    private String schoolname;

    private Boolean iskeyschool;

    private String education;

    private String degree;

    private String major;

    private Boolean isfulltime;

    private Long honorcertification;

    private Date gradeationdate;

    private Date enterdate;

    public Long getCustomereducationid() {
        return customereducationid;
    }

    public void setCustomereducationid(Long customereducationid) {
        this.customereducationid = customereducationid;
    }

    public Long getCustomerid() {
        return customerid;
    }

    public void setCustomerid(Long customerid) {
        this.customerid = customerid;
    }

    public String getSchoolname() {
        return schoolname;
    }

    public void setSchoolname(String schoolname) {
        this.schoolname = schoolname == null ? null : schoolname.trim();
    }

    public Boolean getIskeyschool() {
        return iskeyschool;
    }

    public void setIskeyschool(Boolean iskeyschool) {
        this.iskeyschool = iskeyschool;
    }

    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education == null ? null : education.trim();
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree == null ? null : degree.trim();
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major == null ? null : major.trim();
    }

    public Boolean getIsfulltime() {
        return isfulltime;
    }

    public void setIsfulltime(Boolean isfulltime) {
        this.isfulltime = isfulltime;
    }

    public Long getHonorcertification() {
        return honorcertification;
    }

    public void setHonorcertification(Long honorcertification) {
        this.honorcertification = honorcertification;
    }

    public Date getGradeationdate() {
        return gradeationdate;
    }

    public void setGradeationdate(Date gradeationdate) {
        this.gradeationdate = gradeationdate;
    }

    public Date getEnterdate() {
        return enterdate;
    }

    public void setEnterdate(Date enterdate) {
        this.enterdate = enterdate;
    }
}
