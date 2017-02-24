/**
 * Created by Administrator on 2017/2/24.
 */

window.onload = function () {
    var position,result;
    var arr = [1,2,3,4,5,6,7,8,9];
    arr.sort(function(){
        return Math.random() - 0.5 ;
    });
    var lotteryList  = document.getElementById("lotteryList"),
        lotteryBack = lotteryList.querySelectorAll(".blur"),
        lotteryResultArr = [].slice.call(lotteryList.querySelectorAll(".result")),
        lotteryResultImgArr = [].slice.call(lotteryList.querySelectorAll(".result img"));
    var lotteryBackArr = [].slice.call(lotteryBack);
    lotteryList.addEventListener("click",sendMessage,false);
    function sendMessage(e){
        var target = e.target;
        if(target.parentNode.classList.contains("blur")){
            position = lotteryBackArr.indexOf(target.parentNode);
        }else if(target.classList.contains("blur")){
            position = lotteryBackArr.indexOf(target);
        }else{
            return;
        }
        //选中的卡牌边框变为粉色
        lotteryBackArr[position].parentElement.classList.add("chosen");
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
          if(xhr.readyState ==4){
              if( (xhr.status >= 200 && xhr.status < 300 ) || xhr.status == 304){
                  var data = JSON.parse(xhr.responseText);
                  result = data.result;
                  //点击位置与结果所在位置对换
                  arr[arr.indexOf(result)] = arr[position];
                  arr[position] = result;
                  lotteryResultImgArr.forEach(function(item,index){
                      item.src="pic"+arr[index]+".png";
                  });
                  lotteryBackArr.forEach(function(item){
                      item.classList.add("blurRotate");
                  });
                  lotteryResultArr.forEach(function(item){
                      item.classList.add("resultRotate");
                  });

              }
          }
        };
        //需要用get请求。post请求会出现405错误
        xhr.open("get","award.json",true);
        xhr.send(null);
        function preloadImg(){
            for(var i = 1 ; i < 10 ; i++){
                var img = new Image();
                img.src="pic" + i +".png";
            }
        }
    }
};