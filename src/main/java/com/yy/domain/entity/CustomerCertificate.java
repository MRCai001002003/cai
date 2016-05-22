package com.yy.domain.entity;

import java.util.Date;

public class CustomerCertificate {
    private Long customercertificateid;

    private Long customerid;

    private String certificatetype;

    private String certificatecode;

    private Date certificatevaliddate;

    private String cretificationstatue;

    public Long getCustomercertificateid() {
        return customercertificateid;
    }

    public void setCustomercertificateid(Long customercertificateid) {
        this.customercertificateid = customercertificateid;
    }

    public Long getCustomerid() {
        return customerid;
    }

    public void setCustomerid(Long customerid) {
        this.customerid = customerid;
    }

    public String getCertificatetype() {
        return certificatetype;
    }

    public void setCertificatetype(String certificatetype) {
        this.certificatetype = certificatetype == null ? null : certificatetype.trim();
    }

    public String getCertificatecode() {
        return certificatecode;
    }

    public void setCertificatecode(String certificatecode) {
        this.certificatecode = certificatecode == null ? null : certificatecode.trim();
    }

    public Date getCertificatevaliddate() {
        return certificatevaliddate;
    }

    public void setCertificatevaliddate(Date certificatevaliddate) {
        this.certificatevaliddate = certificatevaliddate;
    }

    public String getCretificationstatue() {
        return cretificationstatue;
    }

    public void setCretificationstatue(String cretificationstatue) {
        this.cretificationstatue = cretificationstatue == null ? null : cretificationstatue.trim();
    }
}
