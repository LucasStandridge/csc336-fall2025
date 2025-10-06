let cart_price = 0;

let sandwich_prices = {
  crunchyboi:15.00,
  teamster:15.00,
  marisatomei:13.00,
};

let buy_sandwiches_form = document.querySelector("#sandwich_selections");

function number_toggle(checkbox_id, number_field_id){
  let checkbox = document.querySelector(checkbox_id);
  let number_field = document.querySelector(number_field_id);

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      number_field.style.display = "inline";
      number_field.value = 1;
    } else {
      number_field.style.display = "none";
      number_field.value = "";
    }
  });
}

number_toggle("#crunchyboi_checkbox", "#crunchyboi_number_field");
number_toggle("#teamster_checkbox", "#teamster_number_field");
number_toggle("#marisatomei_checkbox", "#marisatomei_number_field");

buy_sandwiches_form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  let order_total = 0;
  
  for(let sandwich in sandwich_prices){
    let number_field = document.querySelector(`#${sandwich}_number_field`);
    let num = parseInt(number_field.value, 10);

    if(num > 0){
      order_total += sandwich_prices[sandwich] * num;
    }
  }
  
  if (order_total > 0){
    cart_price += order_total
    Toastify({
      text: `Item added to cart!\nCart price: ${cart_price + (cart_price*0.1)}`,
      duration: 3000,
      gravity: "top",
      position: "right",
      close: true,
    }).showToast()
}else{
    Toastify({
    text: "Please select at least one sandwich (you know you want one!",
    duration: 3000,
    gravity: "top",
    position: "right",
    close: true,
  }).showToast()
}
});
