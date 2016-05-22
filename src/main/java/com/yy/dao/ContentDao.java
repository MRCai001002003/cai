package com.yy.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.yy.domain.entity.Content;
import com.yy.domain.entity.ContentExtra;

public interface ContentDao {
    int deleteByPrimaryKey(String id);

    int insert(Content record);

    int insertSelective(Content record);

    ContentExtra selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(Content record);

    int updateByPrimaryKeyWithBLOBs(Content record);

    int updateByPrimaryKey(Content record);

    List<Content> selectContentList();

    List<Content> selectContentListByState(@Param(value = "state") Integer state);

    List<ContentExtra> selectContentListWithPage(@Param(value="startIndex")int startIndex, @Param(value="pageSize")int pageSize, @Param(value = "state") Integer state, @Param(value = "type") String type);

    int selectContentListCountWithPage(@Param(value = "state") Integer state, @Param(value = "type") String type);

    List<ContentExtra> queryContentIndexList();
}
