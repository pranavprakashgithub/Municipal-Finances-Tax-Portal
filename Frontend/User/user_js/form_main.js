// (function($) {

// 	"use strict";


//   // Form
// 	var contactForm = function() {
// 		if ($('#contactForm').length > 0 ) {
// 			$( "#contactForm" ).validate( {
// 				rules: {
// 					name: "required",
// 					subject: "required",
// 					email: {
// 						required: true,
// 						email: true
// 					},
// 					message: {
// 						required: true,
// 						minlength: 5
// 					}
// 				},
// 				messages: {
// 					name: "Please enter your name",
// 					subject: "Please enter your subject",
// 					email: "Please enter a valid email address",
// 					message: "Please enter a message"
// 				},
// 				/* submit via ajax */
				
// 				submitHandler: function(form) {		
// 					var $submit = $('.submitting'),
// 						waitText = 'Submitting...';

// 					$.ajax({   	
// 				      type: "POST",
// 				      url: "php/sendEmail.php",
// 				      data: $(form).serialize(),

// 				      beforeSend: function() { 
// 				      	$submit.css('display', 'block').text(waitText);
// 				      },
// 				      success: function(msg) {
// 		               if (msg == 'OK') {
// 		               	$('#form-message-warning').hide();
// 				            setTimeout(function(){
// 		               		$('#contactForm').fadeIn();
// 		               	}, 1000);
// 				            setTimeout(function(){
// 				               $('#form-message-success').fadeIn();   
// 		               	}, 1400);

// 		               	setTimeout(function(){
// 				               $('#form-message-success').fadeOut();   
// 		               	}, 8000);

// 		               	setTimeout(function(){
// 				               $submit.css('display', 'none').text(waitText);  
// 		               	}, 1400);

// 		               	setTimeout(function(){
// 		               		$( '#contactForm' ).each(function(){
// 											    this.reset();
// 											});
// 		               	}, 1400);
			               
// 			            } else {
// 			               $('#form-message-warning').html(msg);
// 				            $('#form-message-warning').fadeIn();
// 				            $submit.css('display', 'none');
// 			            }
// 				      },
// 				      error: function() {
// 				      	$('#form-message-warning').html("Something went wrong. Please try again.");
// 				         $('#form-message-warning').fadeIn();
// 				         $submit.css('display', 'none');
// 				      }
// 			      });    		
// 		  		} // end submitHandler

// 			});
// 		}
// 	};
// 	contactForm();

// })(jQuery);

function openForm() {
	document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
	document.getElementById("myForm").style.display = "none";
  }
function update() {

	
				let select = document.getElementById('category');
				let option = select.options[select.selectedIndex].value;
				var inputspace=document.getElementById('floor');
				//inputspace.removeChild();
				//console.log(option);
				let label1=document.createElement('label');
				let node= document.createElement('input');
				if(option === "Residential")
				{
					//console.log("Hi");
					
				
					label1.innerText+="Floor No";
					label1.classList.add("label")
					node.classList.add("form-control");
					inputspace.appendChild(label1);
					inputspace.appendChild(node);
					
					
				}
				else if(option === "Commercial")
				{
					//console.log("Hi");
					
					let label2=document.createElement('label');
					let node1= document.createElement('input');
					label1.innerText+="Floor No";
					label2.classList.add("label")
					node1.classList.add("form-control");
					inputspace.replaceChild(label2,label1);
					inputspace.replaceChild(node,node1);
					
					
				}
				else
				{
					//console.log("Hi");
					
					inputspace.removeChild();
					
				}

			 
				
}