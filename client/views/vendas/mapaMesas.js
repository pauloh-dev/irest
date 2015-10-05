var estadoLivre= "btn-success";
var estadoOcupado = "btn-primary";
var estadoBoqueado = "btn-danger";
var typeModal=['aberturaMesa','incluirProduto'];

Meteor.subscribe('MapaMesas');

//Helpers e Events do template mapaMesas
Template.mapaMesas.helpers({
	'geraMapaMesas': function (){
		return MapaMesas.find();
	},
	'modal':function(){
		if(this.estado==estadoLivre){
			return typeModal[0];
		}
	}

});

Template.mapaMesas.events({
	'click .mesa':function(){
		var mesaId = this._id;
		Session.set('selectedMesa',mesaId);		
		if(this.estado==estadoLivre){		
			$('#aberturaMesa').modal('show');	
		}
		/*else if(this.estado==estadoOcupado){
			Meteor.call('editarEstadoMesa', mesaId,estadoBoqueado);
		}else{
			Meteor.call('editarEstadoMesa', mesaId,estadoLivre);
		}*/
	},
	'submit form':function(event){
		event.preventDefault();
		var mesaId = Session.get('selectedMesa');
		var codGarcomAtend = $('#codGarcomAtend').val();
		$('#aberturaMesa').modal('hide');
		
		Meteor.call('editarEstadoMesa', mesaId,estadoOcupado);

		$('#codGarcomAtend').val('');
		$('#qtdPessoas').val('');
	}
});