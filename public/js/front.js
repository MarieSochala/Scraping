var application = {
    config: {
        url: '/'
    },


    init: function() {
        this.watchers();
        //console.log(this === application); /*objet courant est-il égal à application ? true ou false */

    },

    watchers: function() {
        var self = this;
        $("[ligne]").on('click', function() {
        var atr = $(this).attr("ligne");
        console.log(atr);
            self.get(atr);

        });
        $("body").on('click',"#listearrets a", function(e){
        	e.preventDefault();
        	var id = $(this).attr('data-id');
        	console.log(application.node[id]);
        	self.update(application.node[id]);

        })
    },

    get: function(key) {
        $.getJSON("/", function(data) {
        application.node = data[key].arrets;
        application.showarrets(application.node);
        });
    },

    showarrets: function(liste){
    	
    	var len = liste.length; // on compte toujours avant la boucle > pr performance
    	var $table = $ ("#listearrets table");
    	for (var i = 0; i < len ; i++){
    		console.log(liste[i]);
    		var arret = liste[i];
    		var tpl = $('<tr><td><a href="#" data-id="'+i+'">'+arret.name+'</a></td></tr>');
    		$table.append(tpl);
    	}
    },



    update: function(arret) {
    	$("#nomarret").html(arret.name);
    	this.showhoraires(arret.horaires);
    },

    showhoraires: function(liste){
    	
    	var len = liste.length; // on compte toujours avant la boucle > pr performance
    	var $table = $ ("#infoarret table");
    	var out = [];
    	for (var i = 0; i < len ; i++){
    		
    		out.push('<tr><td>'+liste[i]+'</td></tr>');
    		
    		
    	}
    	$table.html(out.join(""));
    },
};


   
application.init();