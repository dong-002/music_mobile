function resize() {
  let deviceWidth=document.documentElement.clientWidth||window.innerWidth
  if(deviceWidth>=750) {
    deviceWidth=750
  }
  if(deviceWidth<320) {
    deviceWidth=320
  }
  /*
    设置根元素大小  设备的宽度/设计稿750px rem是依据根元素的 
    例如设备的逻辑大小是375px,除以750设计稿大小,现在1rem就是0.5px 假设div的宽度为20px，那么在css中要设置为10px，即20rem（但是浏览器根元素最小为12px）。
    设备的宽度/设计稿750px*100之后，1rem就是50px，现在设计稿20px的div在css中同样是10px，转换为rem就是0.2rem 0.2*50px=10px
  */
  document.documentElement.style.fontSize=deviceWidth/750 * 100 +'px'
  // 0.3*50=15px 默认是16px，相差不远
  document.querySelector('body').style.fontSize=0.3+'rem'
}
resize()
window.onresize=function(){
  resize()
}