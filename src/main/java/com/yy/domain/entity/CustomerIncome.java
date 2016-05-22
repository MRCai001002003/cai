package com.yy.domain.entity;

public class CustomerIncome {
    private Long incomeid;

    private Long customerid;

    private String incometype;

    private String incomecurrency;

    private Float incomeamount;

    private String termtype;

    private String remark;

    public Long getIncomeid() {
        return incomeid;
    }

    public void setIncomeid(Long incomeid) {
        this.incomeid = incomeid;
    }

    public Long getCustomerid() {
        return customerid;
    }

    public void setCustomerid(Long customerid) {
        this.customerid = customerid;
    }

    public String getIncometype() {
        return incometype;
    }

    public void setIncometype(String incometype) {
        this.incometype = incometype == null ? null : incometype.trim();
    }

    public String getIncomecurrency() {
        return incomecurrency;
    }

    public void setIncomecurrency(String incomecurrency) {
        this.incomecurrency = incomecurrency == null ? null : incomecurrency.trim();
    }

    public Float getIncomeamount() {
        return incomeamount;
    }

    public void setIncomeamount(Float incomeamount) {
        this.incomeamount = incomeamount;
    }

    public String getTermtype() {
        return termtype;
    }

    public void setTermtype(String termtype) {
        this.termtype = termtype == null ? null : termtype.trim();
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }
}
