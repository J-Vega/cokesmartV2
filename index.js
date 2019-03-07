

// DISABLES HOVER FUNCTIONS WHEN DETECTING A TOUCH INPUT
// PREVENTS HOVER ANIMATION ON TOUCH DEVICES

function watchForHover() {
    var hasHoverClass = false;
    var container = document.body;
    var lastTouchTime = 0;

    function enableHover() {
        // filter emulated events coming from touch events
        if (new Date() - lastTouchTime < 500) return;
        if (hasHoverClass) return;

        container.className += ' hasHover';
        hasHoverClass = true;
    }

    function disableHover() {
        if (!hasHoverClass) return;

        container.className = container.className.replace(' hasHover', '');
        hasHoverClass = false;
    }

    function updateLastTouchTime() {
        lastTouchTime = new Date();
    }

    document.addEventListener('touchstart', updateLastTouchTime, true);
    document.addEventListener('touchstart', disableHover, true);
    document.addEventListener('mousemove', enableHover, true);

    enableHover();
}

watchForHover();


$('.cartridge-quantity').on('input change propertychange', function() {
    addCartridges();
});

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var bttn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
$('.cartridge-logo').click(function(e) {
  modal.style.display = "block";
});

// When the user clicks on <span> (x), close the modal
$('.close').click(function(e) {
  modal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

jQuery(document).ready(function(){
    // This button will increment the value
    $('[data-quantity="plus"]').click(function(e){
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = $(this).attr('data-field');
        // Get its current value
        var currentVal = parseInt($('input[name='+fieldName+']').val());
        // If is not undefined
        if (!isNaN(currentVal)) {
            // Increment
            $('input[name='+fieldName+']').val(currentVal + 1);
        } else {
            // Otherwise put a 0 there
            $('input[name='+fieldName+']').val(0);
        }
        addCartridges();
    });
    // This button will decrement the value till 0
    $('[data-quantity="minus"]').click(function(e) {
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = $(this).attr('data-field');
        // Get its current value
        var currentVal = parseInt($('input[name='+fieldName+']').val());
        // If it isn't undefined or its greater than 0
        if (!isNaN(currentVal) && currentVal > 0) {
            // Decrement one
            $('input[name='+fieldName+']').val(currentVal - 1);
        } else {
            // Otherwise put a 0 there
            $('input[name='+fieldName+']').val(0);
        }
        addCartridges();
    });

    $('.cartridge-logo').click(function(e){
        e.preventDefault();
         console.log("clicked on logo")
        var productname = e.target.id;
        showModalInfo(productname);
    });
    $('.overlay').click(function(e){
        e.preventDefault();
        // Get id from product logo
        console.log("clicked on overlay")
        var productname = e.target.previousElementSibling.id;
        showModalInfo(productname);
    });
    $('.close').click(function(e){
        e.preventDefault();
        hideModal();
    });

    $('.sort-button-default').click(function(e){
        e.preventDefault();
        console.log("sort default order");
        sortDefault();
    });
    $('.sort-button-alphabetical').click(function(e){
        e.preventDefault();
        
    });
    $('.sort-button-dispenser').click(function(e){
        e.preventDefault();
        console.log("sort dispenser order");
        sortDispenser();
    });
    
});

function addCartridges(){
    var slotTotal = 
        parseInt($('.cocacola-quantity').val() * 2) + 
        parseInt($('.dietcoke-quantity').val() * 2) + 
        parseInt($('.cokezero-quantity').val() * 2) +
        parseInt($('.cfdietcoke-quantity').val() * 2) + 
        parseInt($('.drpepper-quantity').val() * 2) + 
        parseInt($('.minutemaid-quantity').val() * 2) + 
        parseInt($('.sprite-quantity').val()) + 
        parseInt($('.lemon-quantity').val()) + 
        parseInt($('.raspberry-quantity').val()) + 
        parseInt($('.apple-quantity').val()) + 
        parseInt($('.hic-quantity').val()) + 
        parseInt($('.powerade-quantity').val()) + 
        parseInt($('.ing-aa-quantity').val()) + 
        parseInt($('.fanta-quantity').val());

   var priceTotal = 
    document.getElementById("cocacola-price").value * parseInt($('.cocacola-quantity').val()) +
    document.getElementById("dietcoke-price").value * parseInt($('.dietcoke-quantity').val()) +
    document.getElementById("cokezero-price").value * parseInt($('.cokezero-quantity').val()) +
    document.getElementById("cfdietcoke-price").value * parseInt($('.cfdietcoke-quantity').val()) +
    document.getElementById("sprite-price").value * parseInt($('.sprite-quantity').val()) +
    document.getElementById("drpepper-price").value * parseInt($('.drpepper-quantity').val()) +
    document.getElementById("minutemaid-price").value * parseInt($('.minutemaid-quantity').val()) +
    document.getElementById("ing-aa-price").value * parseInt($('.ing-aa-quantity').val()) +
    document.getElementById("fanta-price").value * parseInt($('.fanta-quantity').val());

    $('.total-amount').text(priceTotal.toFixed(2));
    //console.log(parseInt($('.cocacola-price').html()));
   
    var fullCases = slotTotal / 16;
    var remainingSlots = (16 - slotTotal % 16);
    if(remainingSlots == 16) remainingSlots = 0;
    //console.log(slotTotal);
    // Check if case is filled up with 16 slots.
    if(slotTotal % 16 == 0 && slotTotal !== 0){
        console.log("Full Case!")
    }
    $('.js-case-count').text(Math.floor(fullCases));
    $('.js-remaining-count').text(remainingSlots);
    $('.js-slot-count').text(slotTotal);
    if(slotTotal == 0){
        $('.case-slot').addClass("empty-slot");
        $('.case-slot').removeClass("filled-slot");
        $('.case-slot').text("E");
    }
    if(slotTotal > 0){
        updateCaseBuilder(remainingSlots);
    }
}

function updateCaseBuilder(remainingSlots){
    console.log("Slots remaining: " + remainingSlots);

    $('.case-slot').addClass("filled-slot");
    $('.case-slot').removeClass("empty-slot");
    $('.case-slot').text("F");
    for(i = remainingSlots; i> -1 ; i--){
        $(`.slot-${i}`).removeClass("filled-slot");
        $(`.slot-${i}`).addClass("empty-slot");
        $(`.slot-${i}`).text("E");
    }
}

function hideModal(){
    $('.modal-content').hide();
}

function showModalInfo(productname){
    //Hide ALL product info, then show current based off logo clicked by user
    $('.product-info').hide();
    console.log(productname);
    $(`#${productname}-info`).show();
    $('.modal-content').show();
}

function sortDefault(){
    console.log($('.flavor-container'));
     $('.flavor-container').sort(function (a, b) {

      var contentA =parseInt( $(a).attr('sort-default'));
      var contentB =parseInt( $(b).attr('sort-default'));
      return (contentA < contentB) ? -1 : (contentA > contentB) ? 1 : 0;
   });


}

// Sort cartridges to reflect dispenser order
function sortDispenser(){
     $('.flavor-container').sort(function (a, b) {

      var contentA =parseInt( $(a).attr('sort-dispenser'));
      var contentB =parseInt( $(b).attr('sort-dispenser'));
      return (contentA < contentB) ? -1 : (contentA > contentB) ? 1 : 0;
   });
}

// PARTIAL CASE FEE POP UP
var ALERT_TITLE = "Cartridge Case Info";
var ALERT_BUTTON_TEXT = "Got It!";

if(document.getElementById) {
    window.alert = function(txt) {
        createCustomAlert(txt);
    }
}

function createCustomAlert(txt) {
    d = document;

    if(d.getElementById("modalContainer")) return;

    mObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));
    mObj.id = "modalContainer";
    mObj.style.height = d.documentElement.scrollHeight + "px";
    
    alertObj = mObj.appendChild(d.createElement("div"));
    alertObj.id = "alertBox";
    if(d.all && !window.opera) alertObj.style.top = document.documentElement.scrollTop + "px";
    alertObj.style.left = (d.documentElement.scrollWidth - alertObj.offsetWidth)/2 + "px";
    alertObj.style.visiblity="visible";

    h1 = alertObj.appendChild(d.createElement("h1"));
    h1.appendChild(d.createTextNode(ALERT_TITLE));

    msg = alertObj.appendChild(d.createElement("p"));
    //msg.appendChild(d.createTextNode(txt));
    msg.innerHTML = txt;

    btn = alertObj.appendChild(d.createElement("a"));
    btn.id = "closeBtn";
    btn.appendChild(d.createTextNode(ALERT_BUTTON_TEXT));
    btn.href = "#";
    btn.focus();
    btn.onclick = function() { removeCustomAlert();return false; }

    alertObj.style.display = "block";
    
}

function removeCustomAlert() {
    document.getElementsByTagName("body")[0].removeChild(document.getElementById("modalContainer"));
}
function ful(){
alert('Alert this pages');
}



hideModal();

//End