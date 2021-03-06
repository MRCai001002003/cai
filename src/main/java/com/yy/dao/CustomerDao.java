package com.yy.dao;

import com.yy.domain.entity.Customer;

public interface CustomerDao {
    int deleteByPrimaryKey(Long customerid);

    int insert(Customer record);

    int insertSelective(Customer record);

    Customer selectByPrimaryKey(Long customerid);

    int updateByPrimaryKeySelective(Customer record);

    int updateByPrimaryKey(Customer record);
}
