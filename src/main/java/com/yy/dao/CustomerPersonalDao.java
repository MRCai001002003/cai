package com.yy.dao;

import com.yy.domain.entity.CustomerPersonal;

public interface CustomerPersonalDao {
    int insert(CustomerPersonal record);

    int insertSelective(CustomerPersonal record);
}
