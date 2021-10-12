$(function(){ $(".page-header").load("components/header.html") });

document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
        var banner = new Splide( '#banner' ,{type:'fade',heightRatio: 0.45,rewind:true,drag:false,autoplay:true,pauseOnHover:false,pagination:false,arrows:false}).mount();
    }
  }

$(function() {
   
});