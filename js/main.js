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

function setInputFilter(textbox, inputFilter) {
  ["input"].forEach(function(event) {
    textbox.addEventListener(event, function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  });
}

function update_cart(){
  if($(".product_container").children().length < 1){
    $(".product_container").html("<h2 class='e_center'>You have no item :<<</h2>")
  }
}

$(function(){ $(".page-header").load("components/header.html") });
$(function(){ $(".page-footer").load("components/footer.html") });

document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
      load_img();

      $(".menu_ico").click(function(){ toogle_side_nav(); });
      $("[button]").click(function(){ load_page($(this).attr("button")); })
      $(".remove_ico").click(function(){
        $(this).parent().parent().remove();
        update_cart();
      });

      $(".minus_ico").click(function(){ 
        let value = parseInt( $(this).parents().children("input").val() );
        if ( value > 1 ){
          $(this).parents().children("input").val( value -= 1 );   
        }
      });

      $(".plus_ico").click(function(){ 
        let value = parseInt( $(this).parents().children("input").val() );
        if ( value <= 100 ){
          $(this).parents().children("input").val( value += 1 );   
        }
      });

      if($("#intLimitTextBox").length){
        setInputFilter(document.getElementById("intLimitTextBox"), function(value) {
          return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 100); });
      }

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
