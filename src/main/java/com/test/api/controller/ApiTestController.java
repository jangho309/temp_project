package com.test.api.controller;

import ch.qos.logback.classic.Logger;
import com.test.api.dto.KakaoMapDto;
import com.test.api.service.KakaoMapDataRestore;
import com.test.api.service.OctoparseData;
import lombok.RequiredArgsConstructor;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class ApiTestController {

    private Logger logger = (Logger) LoggerFactory.getLogger(ApiTestController.class);
    private final OctoparseData octoparseData;
    private final KakaoMapDataRestore kakaoMapDataRestore;

    @GetMapping("/")
    public ModelAndView test() {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("index");

        return mav;
    }

    @GetMapping("/kakaoMap")
    public ModelAndView kakaoMap() {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("kakaoMap");

        return mav;
    }

    @GetMapping("/getData")
    public void getData() {
        logger.debug("getData 실행");
        octoparseData.getData();
    }

    @PostMapping("/kakaoData")
    @ResponseBody
    public void kakaoData(@RequestBody List<KakaoMapDto> data){
        logger.debug("ajax 받은 데이터 : " + data.toString());
        logger.debug("ajax 받은 데이터 개수 : " + data.size());
        kakaoMapDataRestore.restore(data);
//        kakaoMapDataRestore.testRestore(data.get(0));
    }
}
