$(document).ready(function() {		
	/* Redirection pour les mobiles */
	if ($(window).width() < 1000) {
		$(location).attr('href',"http://cv de chetoui iftikhar/mobile");
	}
	
	/* Déclaration de tableaux */	
	var rubriques = ['diploma', 'skills', 'projects', 'proExp', 'hobbies', 'contact'];	
	var time = 300;		
	
	/* Sert à déterminer si on peut cliquer sur "A Propos" ou non. */	
	var afficherAPropos = true; 		
	
	/* Quand on passe la souris sur la boîte de bienvenue. */	
	$("#center").hover(function() {		
		
		var width = $(this).outerWidth(); 		
		$(this).find("#welcome").animate({top: "-" + width },{queue:false, duration:300});	
		
	}, function() {		
	
		$(this).find("#welcome").animate({top: "0px" },{queue:false, duration:300});	
	});			
		
	/* Quand on clique sur le bouton de bienvenue. */	
	$("#startButton").click(function(){		
		
		$("#leftSide").animate({left: "-50%"}, 900, function() {			
			$(this).remove();		
		});	  	
		
		$("#rightSide").animate({left: "+50%"}, 900, function () {	  		
			$(this).remove();	  	
		});	  	
		
		$(this).fadeOut("slow");	  	
		$("#center").fadeOut("fast", function() {	  		
		
			/* Code javascript permettant d'afficher progressivement les catégories du CV. */  			
			for (var i = 0, t = rubriques.length; i < t; i++) {  				
				$("#" + rubriques[i]).show(time, "linear");  				
				time += 150;  			
			}	  	
		});	
	});		
	
	/* Quand la souris passe sur une rubrique du CV. */	
	$('.boutonRubriques').hover(function() {		
		$(this).animate({width: '33%', height: '73%'}, {queue: false});		
		var color = $(this).css('borderTopColor');		
		$(this).css({			
			"background-color": color,			
			"box-shadow": "5px 15px 5px #444"		
		});	
	}, function() {		
		$(this).animate({width: '30%', height: '70%'}, {queue: false});		
		$(this).css({			
			"background-color": "",			
			"box-shadow": "none"		
		});	
	});		
	
	/* Quand on clique sur une rubrique du CV. */	
	$('.boutonRubriques').click(function() {
		
		var identifiant = $(this).attr('id');	
		
		if (identifiant == "aaa") {
			
			window.open("http://semrom.fr/contact.php", '_blank');
			
		} else {
		
			$('.boutonRubriques').attr("disabled", "disabled");		
			$("section").fadeTo(1000, 0.3);	
						
			var hauteurRubrique = $("#rubriques").outerHeight();			
			var color = $(this).css('borderTopColor');		
			
			$(this).animate({top: "-" + hauteurRubrique}, 900);		
			afficherAPropos = false;				
			
			/* On va chercher le contenu de la rubrique dans le fichier PHP avec un appel Ajax. */		
			$.ajax({			
				url : "php/cv-content.php",			
				method : 'POST',			
				data : "id=" + identifiant, /* $_POST['id'] en PHP */			
				success: function(data) {				
								
					creerRubrique(data, identifiant, color);		
				}		
			});	
		}
	});		
	
	/* Création du formulaire de contact. */	
	function creerFormulaireContact(data, identifiant, color) {		
		$('section').after(			
			$('<div />')				
				.attr('id', 'content')				
				.html(data)				
				.css({					
					"border-color": color,					
					/* Ajout d'un overflow pour ne pas que des éléments sortent de la div. */					
					"overflow-y": "scroll"				
				})				
				.animate({top: "50%"}, 900)				
				.append(					
					$('<p />').attr("id", "result"),	
									
					$('<form />')
						.attr("action", "php/contact.php")						
						.attr("method", "POST")						
						.attr("id", "contact-form")						
						.attr("role", "form")						
						.css("padding", "15px")						
						.prepend(	
											
							$('<div />')								
								.attr("class", "form-group")								
								.prepend(									
									$('<input />')										
										.attr('type', 'text')										
										.attr('name', 'completeName')										
										.attr('placeholder', 'Nom et/ou Prénom')										
										.attr('class', 'form-control')							
							),							
								
							$('<div />')								
								.attr("class", "form-group")								
								.prepend(									
									$('<input />')										
										.attr('type', 'email')										
										.attr('name', 'mail')										
										.attr('placeholder', 'Email')										
										.attr('class', 'form-control')							
							),							
									
							$('<div />')								
								.attr("class", "form-group")								
								.prepend(									
									$('<textarea />')										
										.attr('name', 'message')										
										.attr('placeholder', 'Votre message...')										
										.attr('class', 'form-control')										
										.attr('rows', '5')										
										.attr('cols', '50')										
										.css("resize", "none")							
							),							
							
							$('<input />')								
								.attr("type", "submit")								
								.attr('value', 'Envoyer')								
								.attr('class', 'buttonDefault')						
						)						
						.submit(onSubmit),						
						
						$('<button />')							
							.attr("id", "close")							
							.attr("class", "buttonDefault")							
							.text("Fermer")							
							
							/* Quand on clique sur le bouton "Fermer" de la zone de contact. */							
							.click(function(){								
								
								$("#content").animate({top: "-50%"}, 900, function() {									
									$(this).remove();								
								});								
								
								$("#" + identifiant).animate({top: "0px", width: '30%', height: '70%'}, 900);								
								$("#" + identifiant).css({									
									"background-color": "", 									
									"box-shadow": "none"								
								});								
								
								$("section").fadeTo(1000, 1);								
								$('.boutonRubriques').removeAttr("disabled", "disabled");								
								afficherAPropos = true;							
							})				
				)		
		);	
	}		
	
	/* Création d'une rubrique et de son contenu. */	
	function creerRubrique(data, identifiant, color) {		
		$('section').after(			
		
			$('<div />')				
				.attr('id', 'content')				
				.html(data)				
				.css({
					"border-color": color,
					"overflow-y": "scroll"
				})				
				.animate({top: "50%"}, 900)				
				.append(					
					$('<button />')						
						.attr("class", "buttonDefault")						
						.text("Fermer")						
						
						/* Quand on clique sur le bouton "Fermer" d'une rubrique. */						
						.click(function(){							
							$("#content").animate({top: "-50%"}, 900, function(){								
								$(this).remove();							
							});							
						
							$("#" + identifiant).animate({top: "0px", width: '30%', height: '70%'}, 900);							
							$("#" + identifiant).css({								
								"background-color": "", 								
								"box-shadow": "none"							
							});							
						
							$("section").fadeTo(1000, 1);							
							$('.boutonRubriques').removeAttr("disabled", "disabled");							
							afficherAPropos = true;						
						})				
				)		
		);	
	}		
	
	/* Quand on envoie le formulaire de contact. */	
	function onSubmit() {		
		
		var donnees = $("#contact-form").serialize();
				
		$("#contact-form").find(":input").attr("disabled", "disabled");		
		$("#close").fadeOut();		
		$("#result").fadeOut();		
		$("#contact-form").fadeOut(function(){				
			$(this).find(":input").removeAttr("disabled");				
			$.ajax({					
				url: $("#contact-form").attr("action"),			        
				type: $("#contact-form").attr("method"),					
				data: donnees,					
				success: function(data) {						
					if(data.success) {	
											
						$("#result").css({								
							"background-color": "green",								
							"font-size": "25px",								
							"color": "white"							
						});	
											
					} else {	
											
						$("#result").css({								
							"background-color": "red",								
							"font-size": "18px",
							"color": "white"							
						});							
						
						$("#contact-form").fadeIn();						
					}						
					
					$("#close").fadeIn();						
					$("#result").fadeIn().text(data.message);					
				},					
				error: function(data) {						
					alert("Erreur lors de l'envoi des données en Ajax.");						
					$("#contact-form").fadeIn();					
				}			    
			});			
		});				
		
		return false;	
	}		
	
	/* Quand on clique sur le bouton "A Propos" du menu. */	
	$("#about").click(function() {		
		
		/* Eviter les actions de plusieurs clics d'affilés. */		
		if (!afficherAPropos) {			
			return false;		
		}		
		$(".boutonRubriques").attr("disabled", "disabled");		
		$("section").fadeTo(1000, 0.3);		
		$("#description").fadeIn(800);		
		afficherAPropos = false;	
	});		
	
	/* Quand on clique sur le bouton "Fermer" de la boîte "A Propos". */	
	$("#closeAbout").click(function() {		
		$("section").fadeTo(1000, 1);		
		$("#description").slideUp(500);		
		$(".boutonRubriques").removeAttr("disabled", "disabled");		
		afficherAPropos = true;	
	});	
});//DOM
