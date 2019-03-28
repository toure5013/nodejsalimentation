/*BISMILLAHI RAHMANI RAHIM 
ALAHOUMA SOLI ALA MOUHALIMANA MOUHALIMA, AL BACHARIYA SOLAWATOU RABI ALEY-HI WA ALA ALIHI WA SALIM*/
var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var morgan = require('morgan')('dev');
var path = require('path');

///connection à la base
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'nodelogin'
});

//instanciation
var app = express();

//middlewares
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('views'));
app.use(morgan);

//route
/**
	CONNEXION
*/
/*--------------------------------------------------------------------
							page d'index : connection
-----------------------------------------------------------------------*/
app.get('/', function(request, response) {
	if(request.session.loggedin && request.session.loggedin != undefined){
		response.redirect('/home');
	}else{
		// response.sendFile(path.join(__dirname + '/login.html'));
		response.render('login');
	}
	
});
app.get('/index', function(request, response) {
	if(request.session.message && request.session.message.trim() != "" && request.session.message !== undefined){
		alert(request.session.message);
		request.session.message ="";
	}
	// response.sendFile(path.join(__dirname + '/login'));
	response.render('login');
});

//à la reception des données du formulaire de connection
app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ?', [username], function(error, results, fields) {
			if (results.length > 0) {
				if(password == results[0].password){
					request.session.loggedin = true;
					request.session.username = username;
					response.redirect('/home');
				}//fin verification de l'égalité des mots de passe
				else{
					response.render('info',{'infoEnvoyer':'Mot de passe incorrect!','redirectPage':'/'});
				}
			} else {
				response.render('info',{'infoEnvoyer':'Pseudo ou mot de passe incorrect!','redirectPage':'/'});
			}			
		});
	}else if(request.session.loggedin && request.session.loggedin != undefined){
			response.redirect('/home');
	}
	else {
		response.render('info',{'infoEnvoyer':'Veuillez remplir tout les champs','redirectPage':'/index'});
	}
});


/*--------------------------------------------------------------------
							page d'inscription
-----------------------------------------------------------------------*/
// /**
	// INSCRIPTION
// */
//Il faut ajouter la page inscription
app.get('/inscription', function(request, response) {
	if(request.session.loggedin && request.session.loggedin != undefined){
		response.redirect('/home');
	}else{
		// response.sendFile(path.join(__dirname + '/inscription.html'));
		response.render('inscription');
	}
});
//A LA RECEPTION DES DONNER DE L'INSCRIPTION
app.post('/destinscrit', function(request, response) {
	
	var username = request.body.username;
	var password = request.body.password;
	var email = request.body.email;
	var numero = request.body.numero;
	var ville = request.body.ville;
	console.info("vil " +ville + " user " + username + " email " + email + " password " + password)
	if (username && password && email && numero && ville) {
		//Nous allons verifié que le nom d'utilisateur n'est dejà pris
		connection.query('SELECT * FROM accounts WHERE username = ? OR email=?', [username,email], function(error, results) {
			if (results.length > 0) {
				//request.session.message = "Pseudo déjà pris veuillez réessayez ou cet email!";
				
				response.render('info',{'infoEnvoyer':'Ce pseudo existe déjà, veuillez essayer un autre', 'redirectPage':'/inscription'});
				
			} else {
				var date_inscri = Date();
				var statutDefaut = "Free";
				connection.query("INSERT INTO `accounts`(`username`, `password`, `email`, `numero_tel`, `ville`, `statut`, `date_inscription`) VALUES (?,?,?,?,?,?,?)", [username, password,email,numero,ville,statutDefaut,date_inscri], function(error, results) {
					if(error){
						console.log("erreur : Enrigistrement impossible");
					}else{
						console.log("Enregistrer avec succès");
						request.session.loggedin = true;
						request.session.username = username;
						response.redirect('/home');
						response.end();
					}
				});//fin insert
				 // response.redirect('/');
				// response.end();
			}			
			// response.end();
		});//fin query
	} else {
		response.render('info',{'infoEnvoyer':'Remplissez tout les champs!', 'redirectPage':'/inscription'});
	}
});

/*--------------------------------------------------------------------
							page d'acceuil : home
-----------------------------------------------------------------------*/
//Page d'accueil
app.get('/home', function(request, response) {	
		if(request.session.loggedin && request.session.loggedin != undefined){
		connection.query('SELECT * FROM `plats` ORDER BY id_plat DESC',  function(error, resultPlat
		) {
			if (error) {
				console.log("Erreur : " + error.message);
			} else {
				connection.query('SELECT * FROM `menu` ORDER BY id_menu DESC',function(error, resultsMenu) {
					if (error) {
					console.log("Erreur : " + error.message);
					} else {
					console.log("Requete avec success");
					//Faire une boucle pour retourner tout les éléments
					for(let i=0 ; i< resultsMenu.length; i++){
						console.log(" Nom Menu  : " +  resultsMenu[i].nom_menu);	
					}//Les menus
					for(let i=0 ; i< resultPlat.length; i++){
						console.log(" Nom plat :  " + resultPlat[i].nom_plat);	
					}//Les plats
					response.render('acceuil',{'username' : request.session.username , plats_user : resultPlat, menu_users : resultsMenu})
					
				}
				});
			}			
			// response.end();
		});//fin query
	}else{
		// response.sendFile(path.join(__dirname + '/login.html'));
		//response.render('info',{'infoEnvoyer':'Connectez-vous pour voir cette page!', 'redirectPage':'/'});
		response.render('login');
	}
	
	/*if (request.session.loggedin) {
		 response.render('',{ });
		response.render('pageAcceuil',{'infoEnvoyer':'Connecter-vous pour voir cette page','username':request.session.username, 'redirectPage':'/'});
	} else {
		
	}*/
	
});

/*--------------------------------------------------------------------
							page de deconnection
-----------------------------------------------------------------------*/
//page deconnexion
app.get('/dec', function(request, response) {
	if(request.session.loggedin && request.session.loggedin !==undefined && request.session.loggedin != ""){
		delete request.session.loggedin;
		response.redirect('/');
	} else {
		response.redirect('/');
	}
	response.end();
});

//Cafe
app.get('/cafe', function(request, response) {
	if(request.session.loggedin && request.session.loggedin !==undefined && request.session.loggedin != ""){
		response.render('cafe',{username:request.session.username});
	} else {
		response.redirect('/');
	}
	response.end();
});



/*--------------------------------------------------------------------
							page profil
-----------------------------------------------------------------------*/
app.get('/profil', function(request, response) {
	if(request.session.loggedin && request.session.loggedin != undefined){
		connection.query('SELECT * FROM `plats` WHERE id_user=?', [request.session.username], function(error, resultPlat
		) {
			if (error) {
				console.log("Erreur : " + error.message);
			} else {
				connection.query('SELECT * FROM `menu` WHERE id_user=?', [request.session.username], function(error, resultsMenu) {
					if (error) {
					console.log("Erreur : " + error.message);
					} else {
					console.log("Requete avec success");
					//Faire une boucle pour retourner tout les éléments
					for(let i=0 ; i< resultsMenu.length; i++){
						console.log(" Nom Menu  : " +  resultsMenu[i].nom_menu);	
					}//Les menus
					for(let i=0 ; i< resultPlat.length; i++){
						console.log(" Nom plat :  " + resultPlat[i].nom_plat);	
					}//Les plats
					response.render('profil',{username:request.session.username, plats_user : resultPlat, menu_users : resultsMenu})
					
				}
				});
			}			
			// response.end();
		});//fin query
	}else{
		// response.sendFile(path.join(__dirname + '/login.html'));
		response.render('login');
	}
	
});


/*--------------------------------------------------------------------
							Publication de produits
-----------------------------------------------------------------------*/
//A LA RECEPTION DES DONNER DE L'INSCRIPTION
app.post('/ajoutplat', function(request, response) {
	
	var nomPlat = request.body.nomPlat;
	var imagePlat = request.body.imagePlat;
	var nbrePersonnePlat = request.body.nbrePersonnePlat;
	var prixPlat = request.body.prixPlat;
	var livraisonPlat = request.body.livraisonPlat;
	var btnPlat = request.body.btnPlat;
	
	
	
	// console.info("btnPlat " +btnPlat + " imagePlat " + imagePlat + " nbrePersonnePlat " + nbrePersonnePlat + " prixPlat " + prixPlat + "livraisonPlat" + livraisonPlat + " btnPlat "  + btnPlat + "username "+ request.session.username );
	if (btnPlat && btnPlat != "" && btnPlat !== undefined) {
			var datePlat = new Date();
				connection.query("INSERT INTO `plats`(`nom_plat`, `prix_plat`, `livraison_plat`, `date_plat`, `imageplat`, `nbrePersonne`, `id_user`)  VALUES (?,?,?,?,?,?,?)", [nomPlat, prixPlat,livraisonPlat,datePlat,imagePlat,nbrePersonnePlat,request.session.username], function(error, results) {
					if(error){
						console.log("Erreur lors de l'enrigistrement plat:  impossible : " + error.message);
					}else{
						console.log("Plat enregistrer avec succès");
						response.redirect('/');
						response.end();
					}
				});//fin insert
				 // response.redirect('/');
				// response.end();
	} else {
		response.render('info',{'infoEnvoyer':'Remplissez tout les champs!', 'redirectPage':'/inscription'});
	}
});

/*--------------------------------------------------------------------
							Publication de menu
-----------------------------------------------------------------------*/
//A LA RECEPTION DES DONNER DE L'INSCRIPTION
app.post('/ajoutmenu', function(request, response) {
	var nomMenu = request.body.nomMenu;
	var tempsCuissons = request.body.tempsCuissons;
	var nbrePersonneMenu = request.body.nbrePersonneMenu;
	var decriptionMenu = request.body.decriptionMenu;
	var btnMenu = request.body.btnMenu;
	var imageMenu = request.body.imageMenu;
	
	console.log(dateMenu);
	if (btnMenu && btnMenu != "" && btnMenu != undefined) {
		var dateMenu = new Date();
				connection.query("INSERT INTO `menu`(`nom_menu`, `temps_cuissons_menu`, `description`, `image_menu`, `date_menu`, `id_user`) VALUES (?,?,?,?,?,?)", [nomMenu, tempsCuissons,decriptionMenu,imageMenu,dateMenu,request.session.username], function(error, results) {
					if(error){
						console.log("Erreur lors de l'enrigistrement du Menu : " + error.message);
					}else{
						console.log("Menu enregistrer avec succès");
						response.redirect('/');
						response.end();
					}
				});//fin insert
				 // response.redirect('/');
				// response.end();
	} else {
		response.render('info',{'infoEnvoyer':'Remplissez tout les champs!', 'redirectPage':'profil'});
	}
});











/*--------------------------------------------------------------------
							supprimer  menu
-----------------------------------------------------------------------*/
//A LA RECEPTION DES DONNER DE L'INSCRIPTION
app.post('/suprimerMenu', function(request, response) {
	btn_supprimer_menu = request.body.btn_supprimer_menu;
	console.log(btn_supprimer_menu);
	if (btn_supprimer_menu && btn_supprimer_menu != "" && btn_supprimer_menu != undefined) {
				connection.query("DELETE FROM `menu` WHERE id_menu=?",[btn_supprimer_menu], function(error, results) {
					if(error){
						console.log("Erreur lors de la suppression : " + error.message);
					}else{
						console.log("Plat suprimer avec succès");
						response.redirect('/profil');
					}
				});//fin inse
	} else {
		response.end('Erreur');
	}
});

/*--------------------------------------------------------------------
							supprimer  plat
-----------------------------------------------------------------------*/
//Supprimer menu
app.post('/suprimermenu', function(request, response) {
	btn_supprimer_menu = request.body.btn_supprimer_menu;
	console.log(btn_supprimer_menu);
	if (btn_supprimer_menu && btn_supprimer_menu != "" && btn_supprimer_menu != undefined) {
				connection.query("DELETE FROM `menu` WHERE id_menu=?",[btn_supprimer_menu], function(error, results) {
					if(error){
						console.log("Erreur lors de la suppression : " + error.message);
					}else{
						console.log("Menu suprimer avec succès");
						response.redirect('/profil');
					}
				});//fin delete
	} else {
		response.end('Erreur suppression de plat, plat inexistant');
	}
});

//Suprimer plat
app.post('/suprimerplat', function(request, response) {
	btn_supprimer_plat = request.body.btn_supprimer_plat;
	console.log(btn_supprimer_plat);
	if (btn_supprimer_plat && btn_supprimer_plat != "" && btn_supprimer_plat != undefined) {
				connection.query("DELETE FROM `plats` WHERE id_plat=?",[btn_supprimer_plat], function(error, results) {
					if(error){
						console.log("Erreur lors de la suppression : " + error.message);
					}else{
						console.log("Plat suprimer avec succès");
						response.redirect('/profil');
					}
				});//fin delete
	} else {
		response.end('Erreur suppression de plat, plat inexistant');
	}
});


/*--------------------------------------------------------------------
							commande de produits
-----------------------------------------------------------------------*/
//A LA RECEPTION DES DONNER DE L'INSCRIPTION
app.post('/commander', function(request, response) {
	var villecommande = request.body.villecommande;
	var datelivraisoncommande = request.body.datelivraisoncommande;
	var nomproduitcommande = request.body.nomproduitcommande;
	var quantcommande = request.body.quantcommande;
	var datecomande = new Date();
	var btncommande = request.body.btncommande;
	var usercommande = request.body.usercommande; 
	
	console.log(quantcommande);
	if (btncommande && btncommande != "" && btncommande != undefined) {
				connection.query("INSERT INTO `commandes`(`user_commande`, `produit_commande`, `date_commande`, `date_livraison`, `quantite`, `ville_livraison`, `id_user`)  VALUES (?,?,?,?,?,?,?)", [usercommande, nomproduitcommande,datecomande,datelivraisoncommande,quantcommande,villecommande, request.session.username], function(error, results) {
					if(error){
						console.log("Erreur lors de l'enrigistrement de la commande dans la base:  impossible : " + error.message);
					}else{
						console.log("Comandez avec succès ");
						response.render('info',{'infoEnvoyer':'Comande à livrer le '+ datecomande +' à été transmis avec succès! Merci pour votre confiance!','redirectPage':'/'});
					}
				});//fin insert
				 // response.redirect('/');
				// response.end();
	} else {
		response.render('info',{'infoEnvoyer':'Remplissez tout les champs!', 'redirectPage':'/'});
	}
});




/********************************  fin^page profil *******************************/
/* Pour verifier dans n'importe quel route que l'utilisateur est autentifé il suffit d'inclure ce code et de faire le traitement s'il est connecter au niveau du if, sinon il est redirigé vers la page connexion
if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
*/

/*--------------------------------------------------------------------
							ecout du serveur
-----------------------------------------------------------------------*/

app.listen(3000, (req,res)=>{
	console.log("serveur en marche sur le port 3000");
});
