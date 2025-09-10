package com.korit.running_back_s2.domain.globalNotice;


import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface GlobalNoticeMapper {

    void insert(GlobalNotice globalNotice);
    
    List<GlobalNotice> findAllNoticeListBySearchOption(GlobalNoticeSearchOption opt);

    Integer countNoticeListsBySearchOption(GlobalNoticeSearchOption opt);

    List<GlobalNotice> findDetailById(@Param("noticeId") int noticeId);

    void updateContent(GlobalNotice newcrewNotice);

    void deleteFeed(Integer noticeId);

    String checkRoleAdmin(Integer userId);
}
