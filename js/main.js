function load_page(s){
  window.location.href = s+".html";
}

function load_img(){
  $("img[gsrc]").val(function() {
    $(this).attr("src","https://drive.google.com/uc?id=" + $(this).attr("gsrc"));
  });
}

function toogle_side_nav(){
  if ($(".side_nav").hasClass('hide-menu')) {      
    $(".side_nav").removeClass('hide-menu');
    $(".side_nav").addClass('show-menu');
    $("body").css("overflow","hidden");
  }else if ($(".side_nav").hasClass('show-menu')) {
    $(".side_nav").removeClass('show-menu');
    $(".side_nav").addClass('hide-menu');
    $("body").css("overflow","unset");
  }
}

$(function(){ $(".page-header").load("components/header.html") });
$(function(){ $(".page-footer").load("components/footer.html") });

document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
      load_img();

      $(".menu_ico").click(function(){ toogle_side_nav(); });
      $("[button]").click(function(){ load_page($(this).attr("button")); })
    
      $(document).mouseup(function(e) 
      {
          var container_2 = $(".side_nav_container");
          if (!container_2.is(e.target) && container_2.has(e.target).length === 0) 
          {
            var container_3 = $(".menu_ico");
            if (!container_3.is(e.target) && container_3.has(e.target).length === 0) 
            {
              if ($(".side_nav").hasClass('show-menu')) {
                $(".side_nav").removeClass('show-menu');
                $(".side_nav").addClass('hide-menu');
                $("body").css("overflow","unset");
              }
            }
          }
      });
  }
}
