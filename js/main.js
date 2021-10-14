function gdriveimg(url) {
  return "https://drive.google.com/uc?id="+url;
} 

function load_img(){
  $("img[gsrc]").val(function() {
    $(this).attr("src","https://drive.google.com/uc?id=" + $(this).attr("gsrc"));
  });
}

$(function(){ $(".page-header").load("components/header.html") });

document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
      var banner = new Splide( '#banner' ,{type:'fade',heightRatio: 0.45,rewind:true,drag:false,autoplay:true,pauseOnHover:false,pagination:false,arrows:false}).mount();
      load_img();
  }
}
