package com.ssafy.banchic.config.dummy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

//@Component
public class DataInitalizationRunner implements ApplicationRunner {

    private final DummyDataService dummyDataService;

    public DataInitalizationRunner(DummyDataService dummyDataService) {
        this.dummyDataService = dummyDataService;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        // 애플리케이션 초기화 시점에서 DummyData 실행
        dummyDataService.insertDummyData();
    }
}
