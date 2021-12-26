class Product {
  constructor(id, name, price, description, image_id = []){
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.image_id = image_id;
  }

  preview_image(){
    return "https://res.cloudinary.com/diyvwfxxk/image/upload/" + this.image_id[0];
  }

  get_image(){
    let array = [];
    this.image_id.forEach(s => {
      array.push("https://res.cloudinary.com/diyvwfxxk/image/upload/"+s);
    });
    return array;
  }

  get_price(){
    return formatter.format(this.price);
  }

  set_clickable(){
    $("[product]").click(function(){
      load_page("product","id="+$(this).attr("product"));
    });
  }
}

function Get_Product(s){
  let product =[];
  if(!s){s = "";}else{s="?"+s;}
  return fetch("http://127.1.1.1/api/product"+s)
  .then(res => { return res.json() }).then(data =>{ 
    data.pop();
    data.forEach(array => {
      product.push(new Product(array.id,array.name,array.price,array.description,array.image_id));
    });
    return product;
  })
  .catch(err =>{
    console.log("Lỗi: "+err);
  })
}

var formatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

function load_page(s,query){
  if(!query){query="";}else{query="?"+query;}
  window.location.href = s+".html"+query;
}

function load_img(){
  $("img[gsrc]").val(function() {
    $(this).attr("src","https://res.cloudinary.com/diyvwfxxk/image/upload/" + $(this).attr("gsrc"));
  });
  $("div[bsrc]").val(function() {
    $(this).attr("style",`background-image:url("https://res.cloudinary.com/diyvwfxxk/image/upload/` + $(this).attr("bsrc") +`")`);
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

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function update_cart(action, product,quantity, element){
  switch (action) {
    case "add":
      if(localStorage.getItem("client_cart") != null){
        let array = localStorage.getItem("client_cart").split("&").map(s => { return JSON.parse(s); });
        for (let i = 0; i<array.length;i++){
          if(array[i].id == product){
            array[i].quantity = parseInt(array[i].quantity) + parseInt(quantity);
            array[i].quantity.toString();
            localStorage.setItem("client_cart",array.map(s => { return JSON.stringify(s); }).join("&"));
            
            let value = parseInt( element.parents().children("input").val() );
            if ( value <= 100 ){
              element.parents().children("input").val( value += 1 );   
            }
            get_cart_quantity();
            return;
          }
        }
      }
      let string = localStorage.getItem("client_cart") == null ? "" : "&"+localStorage.getItem("client_cart");
      let data = JSON.stringify({"id":product,"quantity":quantity});
      localStorage.setItem("client_cart",data + string);
    break;
    case "remove":
      if(localStorage.getItem("client_cart") != null){
        let array = localStorage.getItem("client_cart").split("&").map(s => { return JSON.parse(s); });
        for (let i = 0; i<array.length;i++){
          if(array[i].id == product){
            if (parseInt(array[i].quantity) + parseInt(quantity) > 0){
              array[i].quantity = parseInt(array[i].quantity) + parseInt(quantity);
              array[i].quantity.toString();
              localStorage.setItem("client_cart",array.map(s => { return JSON.stringify(s); }).join("&"));

              let value = parseInt( element.parents().children("input").val() );
              if ( value > 1 ){
                element.parents().children("input").val( value -= 1 );   
              }else{
                array.splice(array.indexOf(array[i]), 1);
                array == "" ? localStorage.removeItem('client_cart') : localStorage.setItem("client_cart",array.map(s => { return JSON.stringify(s); }).join("&"));
                $("#"+product).remove();
                if($(".product_container").children().length < 1){
                  $(".product_container").html("<h2 class='e_center'>You have no item :<<</h2>")
                }
              }
              get_cart_quantity();
              return;
            }else{
              array.splice(array.indexOf(array[i]), 1);
              array == "" ? localStorage.removeItem('client_cart') : localStorage.setItem("client_cart",array.map(s => { return JSON.stringify(s); }).join("&"));
              $("#"+product).remove();
              if($(".product_container").children().length < 1){
                $(".product_container").html("<h2 class='e_center'>You have no item :<<</h2>")
              }
            }
          }
        }
      }
    break;
  } 
  get_cart_quantity();
}

function get_cart_quantity(){
  if(!localStorage.getItem("client_cart")){
    $('.cart_count').text(0);
  }else{
    $('.cart_count').text(localStorage.getItem("client_cart").split("&").length);
  }
}

function set_clickable(){
  $("[product]").click(function(){
    load_page("product","id="+$(this).attr("product"));
  });
}

$(function(){ $(".page-header").load("components/header.html") });
$(function(){ $(".page-footer").load("components/footer.html") });

function input_val_minus(ele){
  let value = parseInt( ele.parents().children("input").val() );
  if ( value > 1 ){
    ele.parents().children("input").val( value -= 1 );   
  }
};

function input_val_plus(ele){
  let value = parseInt( ele.parents().children("input").val() );
  if ( value <= 100 ){
    ele.parents().children("input").val( value += 1 );   
  }
};

document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
      load_img();

      $(".menu_ico").click(function(){ toogle_side_nav(); });
      $("[button]").click(function(){ load_page($(this).attr("button")); });
      

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
