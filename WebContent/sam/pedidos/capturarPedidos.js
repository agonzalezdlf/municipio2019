var subtotal =0;
var total =0;
var indices = [];
var checkPresupuesto = new Array();
var total_pedido=0;
var importecomp=0;
$(document).ready(function() {
	
	$('.selectpicker').selectpicker();
	
	$('#txtfecha').datetimepicker({
		format: 'DD/MM/YYYY',
		defaultDate: new Date()
	});
	
	$('#checkall').on('click', function(){setCheckAll('chkconcepto');});
	$('#checkall').prop('checked',true);
	setCheckAll('chkconcepto');
	
	$("#checkall").on('click', function() {
		$('input:checkbox').not(this).prop('checked', this.checked);
	 });
	
	
	$('#cmdguardarPedido').on('click', function(){guardarPedido();});
	$('#cmdguardarPedido2').on('click', function(){guardarPedido();});
	$('#cmdborrarConceptos').on('click', function(){borrarLotes()});
	$('#cmdcerrarPedido').on('click', function(){cerrarPedido()});
	
	$('#cmdenviarPedido').on('click', function(){enviarLotesPedido();});
	$('#cmdsincronizar').on('click', function(){_muestraImportarLotes();});
	
	
	 
	 //$("input:checkbox[name='one']")
	 if($('#CVE_PED').val()=='0'||$('#CVE_PED').val()=='') $('#cboiva').val(1);
	 $('#txtcontrato').focus();
	 
	 
	 /*
		
	 //Configura los tabuladores
	 $('#tabuladores').tabs();
	 $('#tabuladores').tabs('enable',0);
	 
	  $('#ui-datepicker-div').hide();
	 */
	 
	$('[data-unitprice=precio]').on('blur', function(){
		getTotales();
	});
	$('[data-unitprice=precio]').on('focus', function(){
		getTotales();
	});
	
	$('[data-unitprice=precio]').on('keypress', function(event){
		if(event.keyCode == 13)
		{
			getEnter($(this).data('idmovto'), event);
		}
		event.keyCode =0;
	});
	
	$('[data-chkconcepto="concepto"]').on('click', function(){
		habilitarConcepto($(this).is(':checked'), $(this).data('idmovto'));
	});
	
	$('#txtieps').on('blur', function(){
		getTotales();
	});
	
	$('#txtdescuento').on('blur', function(){
		getTotales();
	});
	

	
});

//**********************************************************************************************************************
//*********************  PROCESO PARA GUARDAR EL PEDIDO  ***************************************************************
/*funcion para guardar el pedido*/
function guardarPedido(){
	var error="";
	var checks = []; 
	
 	if ($('#CVE_REQ').val()=='') { 
 		   swal({title: 'Error!',text: 'No hay ninguna requisicion para el pedido actual',type: 'error',confirmButtonText: 'Cerrar'});return false;
 	}
		
 	if ($('#txtfecha').val()==''){ 
		   swal({title: 'Error!',text: 'Es necesario establecer la fecha del pedido',type: 'error',confirmButtonText: 'Cerrar'});return false;
		   }
	

 	if ($('#txtfechaentrega').val()=='') { 
		   swal({title: 'Error!',text: 'Es necesario establecer el tiempo de entrega',type: 'error',confirmButtonText: 'Cerrar'});return false;
	}
	
 	if ($('#xBeneficiario').selectpicker('val')=='') { 
 		 swal({title: 'Error!',text: 'Es necesario selecionar el beneficiario',type: 'error',confirmButtonText: 'Cerrar'});return false;
	}
	
 	if ($('#txtcondicionespago').val()=='') { 
 		swal({title: 'Error!',text: 'Es necesario escribir las condiciones de pago',type: 'error',confirmButtonText: 'Cerrar'});return false;
	}
 	
 	var checks = [];
	$('input[id=chkconcepto]:checked').each(function() 
		{ 
			checks.push($(this).val()); 
			if($('#txtpreciounit'+$(this).val()).val()==''||$('#txtpreciounit'+$(this).val()).val()=='0')
			{error="El precio de algún lote en el pedido no es válido, verifique y vuelva a intentar esta operación";}
			
	});	
 		
	if(checks.length==0 ){
		swal({title: 'Error!',text: 'Es necesario seleccionar un lote de la requisición',type: 'error',confirmButtonText: 'Cerrar'});return false;
  	}
	 if (error!=""){
		 swal({title: 'Error!',text: error,type: 'error',confirmButtonText: 'Cerrar'});return false;
	 }
	 
	swal({
		  title: 'Es seguro?',
		  text: '¿Confirma que desea guardar la informacion del pedido?',
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonText: 'Sí, gaurdar!',
		  cancelButtonText: 'No, abortar!'
		}).then((result) => {
		  if (result.value  ) {
			 
			   _guardarPedido();
		  // For more information about handling dismissals please visit
		  // https://sweetalert2.github.io/#handling-dismissals
		  } else if (result.dismiss === swal.DismissReason.cancel) {
		    swal(
		      'Cancelado',
		      'El pedido no se guardo',
		      'error'
		    )
		  }
		})
}


/*funcion que permite guardar fisicamente el pedido*/
function _guardarPedido(){
	
	var checks = [];
	var notas = [];
	var precio_unit = [];
	var cantidad = [];
	var num_ped = $('#cve_pedido_text').val();
		
	$('input[id=chkconcepto]:checked').each(function() { 
					
		checks.push($(this).val());
		notas.push($('#txtnota'+$(this).val()).val());
		precio_unit.push($('#txtpreciounit'+$(this).val()).val());
		cantidad.push($('#txtcantidad'+$(this).val()).val());
	});
		
	
	controladorPedidos.guardarPedido($('#CVE_PED').val(), $('#CVE_REQ').val(), $('#txtfecha').val(), $('#txtcontrato').val(), $('#txtfechaentrega').val(), $('#xBeneficiario').selectpicker('val'), $('#txtcondicionespago').val(), $('#txtlugarentrega').val(),$('#txtdescripcion').val(), checks, cantidad, notas, precio_unit, $('#txtiva').val(), $('#cboiva').val(), $('#txtdescuento').val(),$('#txtieps').val(),{
			  callback:function(items){
				  		if(items.EVENT==true){
							$('#CVE_PED').val(items.CVE_PED);
						  	$('#cve_pedido_text').text(items.NUM_PED);
							var cve = items.CVE_PED;
							swal({
								  title: 'Guardando',
								  type: 'success',
								  timer: 4000,
								  onOpen: () => {
								    swal.showLoading()
								  }
								}).then((result) => {
								  if (result.dismiss === swal.DismissReason.timer) {
									  document.location='capturarPedidos.action?cve_ped='+$('#CVE_PED').val();  
								  }
								})
							
						}
		} 					   				
		,
		errorHandler:function(errorString, exception) { 
			swal('','Fallo la operacion:<br>Error::'+errorString+'-message::'+exception.message+'-JavaClass::'+exception.javaClassName+'.<br><strong>Consulte a su administrador</strong>', 'error');   
			return false;
		}
	});	
}
//**********************************************************************************************************************
//********************* TERMINA PROCESO PARA GUARDAR EL PEDIDO  ***************************************************************
function getEnter(n, e){
	var j=0;
	if(e.keyCode == 13)	{
		for(j=0;j < indices.length; j++){
			
			if(n==indices[j]){
				$('#txtpreciounit'+(indices[j+1])).focus();
				$('#txtpreciounit'+(indices[j+1])).select();
				e.keyCode =0;
				return false;
			}
			e.keyCode =0;
		}
	}
}
//************************************************************************************************************************
/*var html='<di><input type=text id="demo" name="demo"/></div></br>'
	html+='<di><input type=text id="demo2" name="demo2"/></div></br>'
	html+='<di><input type=text id="demo2" name="demo3"/></div></br>'
	html+='<di><input type=text id="demo2" name="demo4"/></div></br>'
	html+='<di><input type=text id="demo2" name="demo5"/></div></br>'*/
		
		
		function formatNumber(num,prefix){
		   num= redondeo( num );
		   prefix = prefix || '';
		   num += '';
		   var splitStr = num.split('.');
		   var splitLeft = splitStr[0];
		   var splitRight = splitStr.length > 1 ? '.' + splitStr[1] : '';
		   var regx = /(\d+)(\d{3})/;
		   while (regx.test(splitLeft)) {
		      splitLeft = splitLeft.replace(regx, ' $1' + ',' + '$2');
		   }
		    if( splitRight.length == 0 )
			   		splitRight = ".00";
			 else if( splitRight.length == 2 )
			   		splitRight += "0";
		   return prefix + splitLeft + splitRight;
		}
		function redondeo( valor ) {
			var resultado = Math.round(valor * 100) / 100;
			return resultado;
		}
		function upperCase(object) {
			  object.value=trim(object.value.toUpperCase());	
		}
		function LTrim( value ) {	
			var re = /\s*((\S+\s*)*)/;
			return value.replace(re, "$1");	
		}

		function RTrim( value ) {	
			var re = /((\s*\S+)*)\s*/;
			return value.replace(re, "$1");	
		}

		function trim( value ) {	
			return LTrim(RTrim(value));	
		}

//*****************   PROCESO PARA EL CIERRE DEL PEDIDO   ****************************************************************
/*Metodo para cerrar un pedido*/
function cerrarPedido(){
	
	
	var contador = 0;
	$('input[id=chkconcepto]:checked').each(function() 
		{ contador++;});	
	if(contador==0) {swal('','Para poder cerrar el pedido es necesario que exista por lo menos un lote', 'warning'); return false;}
	if(isNaN($('#txtiva').val())) {swal('','La cantidad especificada en el IVA no es válida', 'warning'); return false;} 

	swal({
		  title: 'Es seguro?',
		  text: '¿Confirma que desea cerrar el pedido?',
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonClass: 'btn btn-success',
		  cancelButtonClass: 'btn btn-danger',
		  buttonsStyling: false,
		  confirmButtonText: 'Sí, cerrar Pedido',
		  cancelButtonText: 'No',
		  reverseButtons: true
		}).then((result) => {
			
		  if (result.value) {
			  if ($('#ped_cal').is(':checked')){
				  getPresupuesto();
			  }else{
					
				  _cerrarPedido($('#CVE_PED').val(), $('#txtiva').val());
			  }
		  } else if (
		    // Read more about handling dismissals
		    result.dismiss === swal.DismissReason.cancel
		  ) {
		    swal('Cancelado','El pedido no se guardo','error')
		  }
		})
	
	
	
}

	/*Metodo interno para el cierra del pedido*/
	function _cerrarPedido(cve_ped, iva){
		
		/*if ($('#TIPO_REQ').val()==7){
			//array.length != nullarr.length === 0
			if ( Object.keys(checkPresupuesto).length == null )
				console.log('Esta aqui');
				swal('','Debe calendarizar el pedido','error');
			return false;
		}*/
		controladorPedidos.cerrarPedido(cve_ped, $('#TIPO_REQ').val(), iva, checkPresupuesto,{
			callback:function(items){
				
					swal({
						title: 'Cerrado!',
						text: 'Tu pedido se cerro con éxito! ',
						type: 'success',
						timer: 5000
					}).then(						
							swal.showLoading(),
							swal({
								  type: 'info',
								  title: 'Existoso !!...',
								  text: 'Pedido cerrado con éxito!!',
								  
								}),
							//swal("Pedido cerrado con éxito!"),
							$('#cmdcerrar').prop('disabled', true),
							$('#cmdguardarPedido').prop('disabled', true),
							getReportePedido($('#CVE_PED').val()),
							document.location='lst_pedidos.action',
							function (dismiss) {
								if (dismiss === 'timer') {
									console.log('Cerrado por el temporizador')
								}else {  throw dismiss;    }
						}
					);	
					},//cierra el callback
							errorHandler:function(errorString, exception) { 
								swal('',errorString,'error');   
								//return false;
						}
					}//Cierra la llamada del controlador
		)
	}


//************************************************************************************************************************
//************************************************************************************************************************

//*************************** METODOS PARA EL PEDIDO CALENDARIZADO
	function getPresupuesto(){
		
		
		controladorPedidos.getPresupuestoReq($('#CVE_REQ').val(), {
	    callback:function(items) {
		
	    	var html = getTabla(items);
		
		swal({
			  title: '',
			  text: 'Disponibilidad Presupuestal<br/> Presupuesto disponible',
			  //type: 'info',
			  html: html,
			  showCloseButton: true,
			  showCancelButton: true,
			  focusConfirm: false,
			  confirmButtonText: 'Sí, confirmar!',
			  cancelButtonText: 'No, cancelar!',
			  confirmButtonClass: 'btn btn-success',
			  cancelButtonClass: 'btn btn-danger',
		}),
	    	$('.swal2-confirm').click(function(){
	    			getPresupuestoSelec();
	    	})
	    }
	    
	  				   				
	    ,
	    errorHandler:function(errorString, exception) { 
	       swal("Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");      
	    }
	}); 
}
	


function getTabla(items){
	
	var meses=["","ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE"];
	var mesActivo=6;
	var importe=parseFloat(items.importe);
	var importeDes=0;
	var faltante=(importe*1);
	
	var tabla ="<table class='table table-hover' align='center'><tr><td><h1>Presupuesto precomprometido: " + items.rnumero + "</h1></td></tr></table>";
		tabla +="<input type='hidden' name='importeReq' id='importeReq' value='"+importe+"' >";
		tabla +="<table class='table table-striped'>";
		tabla +="<tr class='active'><td colspan='3' height='25'>Total Precomprometido: <strong>$ "+formatNumber(items.importe)+"</strong><input type='hidden' name='pre' id='t_importe' value='"+items.importe+"'></td></tr>";	
  	    tabla +="<tr class='success'><td  class='TituloFormulario' width='100'>Mes</td><td  class='TituloFormulario' width='100' >Precomprometido</td><td  class='TituloFormulario' width='100'>Importe</td></tr>";		
        
  	  
		for (i=1; i<=12; i++ ){
			
			//alert('NUMERO DEL MES :' + [i]);
			//alert('NOMBRE DEL MES: ' + meses[i]); 
			if (i>=mesActivo){
				var dispo=(eval("items."+meses[i].substring(0,3)+"PREREQ")).toFixed(2);//Importe de la requiscion segun su calendario..
				//Si hay disponibilidad
				if (dispo>0){	//Tiene precompromiso	   
					var impImp=0;
					if (importe<=dispo){
						impImp=importe;
						console.log('Valor de importe: ' +importe + ' Valor de dispo: ' + dispo);
						console.log('Valor de impImp: ' +impImp);
						
					}else
					   impImp=dispo;
					   importe =(importe-impImp).toFixed(2);
					   console.log('Valor de importe 2 importe: ' +importe);
					   console.log('Valor de importe2 impImp: ' +impImp);
					   //onblur='validarPre(this,"+dispo+")' onkeypress='return keyNumbero(event);validarPre(this,"+dispo+");'
					 //envia a setdistribuir..............
					   tabla +="<tr class='info'>" +
					   		   		"<td><input type='hidden' name='pre' data-presupuest='"+i+"' id='"+i+"' value='"+dispo+"'>" +
					   		   			"<input type='hidden' name='mes' id='mes' data-mes='"+i+"' value='"+i+"' >"+meses[i]+"" +
					   		   		"</td>" +
					   		   		"<td>"+formatNumber(dispo)+"</td>" +
					   		   		"<td><input type='text' name='"+i+"_importe' id='p_importe' value='"+impImp+"' onblur='validarPre(this,"+dispo+")' onkeypress='return keyNumbero(event);validarPre(this,"+dispo+");' ></td>" +
					   		   "</tr>";
					   
				}
				
			}
		}
			
	tabla +="<tr class='danger'><td align='left'>Total: </td><td align='left'>&nbsp;</td><td align='left'><div id='div_total'><strong>$0.00&nbsp;</strong></div></td></tr>"
	tabla +="<tr class='danger'><td align='left'>Pedido: </td><td align='left'>&nbsp;</td><td align='left'><strong>"+total_pedido+"</strong></td></tr>"	
	tabla +="<tr class='danger'><td align='left'>Falta</td><td align='left'>&nbsp;</td><td align='left'><strong>"+ importecomp +"</strong></td></tr>"
	tabla +="<tr><td align='center' height='35' colspan='6' ><input name='cmddistribuir' id='cmddistribuir' type='button' class='btn-info' onClick=\"setDistribuir('"+items.importe+"');\" value='Distribuir' /></td></tr>";
	return tabla+="</table> ";	
}

function getPresupuestoSelec(){
	  
	  checkPresupuesto = new Array();
	  var suma=0;
	  var vimporte=0;
	  
    $('input[name=mes]').each(function() { 
    	
    	vimporte=parseFloat($("INPUT[name="+$(this).val()+"_importe]").val());		
    	
    	//console.log('Importe capturado que se le asigna a vimporte: '+parseFloat($("INPUT[name="+$(this).val()+"_importe]").val()));
    	    	
 	    suma=suma+vimporte;
 	    //console.log('Este es el valor de sumar vimporte: '+ vimporte);
 	    
		if (vimporte > 0){			
		   var map = {
				   mes: $(this).val(), importe: vimporte};
		   		   checkPresupuesto.push(map);
		   		   console.log('Mes: ' + $(this).val());//Introduce el mes 
		   		   console.log('Importe: ' +vimporte );//Introduce el importe 
		}
	});
    
    console.log('El total de la variable suma es: ' + suma);
	if (redondeo(suma) < redondeo(parseFloat($("#importeReq").val()))){		
		 _cerrarPedido($('#CVE_PED').val(), $('#txtiva').val());
	 }
	   else{
		   checkPresupuesto = new Array();
		   swal({
			   type: 'error',
			   title: 'Oops...',
			   text: 'Verifique el presupuesto con el importe del documento!',
			   footer: '<a href>Why do I have this issue?</a>'
			})
	   	
	   }
}

//validarPre(this,95.03)
//Valida el precompromiso de la requisicion 
// con el importe para cerrar el pedido
function validarPre(obj,importe){	
	
	   var  num = parseFloat(obj.value).toFixed(2);
		   
	   var total2=0;
	   console.log('Importe a compromer: '+ num + ' ' + 'Importe precomprometido: '+ importe); 
	   
	   total2=importe-num;
	   
	   console.log('Importe restante en precompromiso : '+ (total2 * 1).toFixed(2));
	   
	   if (num>importe||num<0 || isNaN(obj.value) || obj.value=="")
		{ 
		  //alert("El importe es mayor que el disponible actual del mes en el calendario ó el número no es válido");
		  swal({
			   type: 'error',
			   title: 'Oops...',
			   text: 'El importe es mayor que el disponible actual del mes en el calendario ó el número no es válido!',
			   
			})
		  obj.focus();
		}else
		{	
			getTotalPre()
		}
	}

	function getTotalPre(){
		//console.log('Total del pedido desde gettotal: ' +total_pedido);
		//total_pedido
		//document.getElementById("demo").innerHTML = n;
		
		var total = 0.00;
		var temp = 0.00;
			$('INPUT[id=p_importe]').each(function() {
							
				total = eval(total) + eval($(this).val());//
				temp = redondeo(total);
							
				if(temp==$('#t_importe').val()){
					
					$('#cmdguardarPresupuesto').prop('disabled', false);
				}
				else{
					$('#cmdguardarPresupuesto').prop('disabled', true);
				}
					//temp = 0.00;
			});
			$('#div_total').html('<strong>$ '+formatNumber(total)+'</strong>');
			importecomp=total_pedido-total;
					
			if(redondeo(total)>eval($('#t_importe').val())||total<0){
				//swal('','El importe que ha establecido no es válido, vuelva a verificarlo','info');
				$('#cmdguardarPresupuesto').attr('disabled', false); 
			} 

	}

	function keyNumbero( event ){
		var key = ( window.event )? event.keyCode:event.which;
		if( ( key > 47 && key < 58 ) || key == 45 || key == 46 || key == 8 )
			return true;
		else
			return false;
	}
//***********************************************************************************    

/*Metodo para mostrar enviar lotes a otro pedido*/
function enviarLotesPedido(){
	var html = "";
	controladorPedidos.getComboPedidosRequisicion($('#CVE_REQ').val(),$('#CVE_PED').val(), {
		  callback:function(i){
				html = '<table width="350" border="0" cellspacing="0" cellpadding="0" align="center">' +
					   '<tr>' +
					   '<td height="27" align="center"><span class="TextoNegritaTahomaGris">Seleccione el n&uacute;mero de pedido:</span> '+ i+'</td>' +
					   '</tr>' +
					   '<tr>' +
					   '<td height="44" align="center">&nbsp;<input type="button" value="Exportar" id="cmdEnviarLotes" onClick="_enviarLotesPedido();" class="botones"/>&nbsp;' +
					   '<input type="button" value="Cancelar" id="cmdborrarConceptos" class="botones" onClick="$.alerts._hide();"/></td>' +
					   '</tr>'+
					   '</table>';	
				swal(html,'Exportar lotes a pedido', '','',0);
		  }
	});
}

/*Metodo para enviar los lotes seleccionados a otro pedido*/
function _enviarLotesPedido(){
	if($('#cbopedidos').attr('value')=='0') {swal('En número de pedido no es válido, seleccione un pedido');return false;}
	var id_ped_movto = [];
	var cve_ped_dest = $('#cbopedidos').attr('value');
	$('input[id=chkconcepto]:checked').each(function() { 
		id_ped_movto.push($(this).val());
	});
	$.alerts._hide();
	jConfirm('¿Confirma que desea exportar los lotes seleccionados al pedido <strong>'+cve_ped_dest+'</strong>?', 'Confirmar', function(r){
				if(r){
					ShowDelay('Exportando lotes','');
					controladorPedidos.moverLotes(id_ped_movto, $('#CVE_PED').attr('value'), cve_ped_dest, $('#txtdescuento').attr('value'), {
												  callback:function(i){
													  		CloseDelay('Lotes exportados con exito', 2000, function(){
																document.location='capturarPedidos.action?cve_ped='+$('#CVE_PED').attr('value');
															});
													  		
												  }
									});
				}
		});
}


//cargarLotes()
/*Metodo para sincronizar lotes al pedido*/
function enviarLotesdesderequi(){
	var html = "";
	controladorPedidos.getComboRequisicionaPedidos($('#CVE_REQ').val(),$('#CVE_PED').val(), {
		  callback:function(i){
				html = '<table width="350" border="0" cellspacing="0" cellpadding="0" align="center">' +
					   '<tr>' +
					   '<td height="27" align="center"><span class="TextoNegritaTahomaGris">Seleccione el n&uacute;mero de pedido:</span> '+ i+'</td>' +
					   '</tr>' +
					   '<tr>' +
					   '<td height="44" align="center">&nbsp;<input type="button" value="Exportar" id="cmdEnviarLotes" onClick="_muestraImportarLotes();" class="botones"/>&nbsp;' +
					   '<input type="button" value="Cancelar" id="cmdborrarConceptos" class="botones" onClick="$.alerts._hide();"/></td>' +
					   '</tr>'+
					   '</table>';	
				swal(html,'Exportar lotes a pedido', '','',0);
		  }
	});
}

/*Metodo para sincronizar los lotes seleccionados de la requisicion al pedido cuando son eliminados*/
function enviaLotesalPedido(){
	
	var cve_requisicion = $('#CVE_REQ').val();
	alert('Clave de requesiscion: ' +cve_requisicion);
	var id_ped_movto = [];
	var cve_ped_dest = $('#cbopedidos').attr('value');
	$('input[id=chkconcepto]:checked').each(function() { 
		id_ped_movto.push($(this).val());
	});
	$('input[id=chkreqmovto]:checked').each(function() { 
		ID_REQ_MOVTO.push($(this).val());
	});
	$.alerts._hide();
	jConfirm('¿Confirma que desea exportar los lotes seleccionados al pedido <strong>'+cve_ped_dest+'</strong>?', 'Confirmar', function(r){
				if(r){
					ShowDelay('Exportando lotes','');
					controladorPedidos.moverLotes_reqaped(ID_REQ_MOVTO, $('#CVE_PED').val(), cve_requisicion, $('#txtdescuento').val(), {
												  callback:function(i){
													  		CloseDelay('Lotes exportados con exito', 2000, function(){
																document.location='capturarPedidos.action?cve_ped='+$('#CVE_PED').attr('value');
															});
													  		
												  }
									});
				}
		});
}

function _muestraImportarLotes(){
	var cve_requisicion = $('#CVE_REQ').val();
	
	swal({
		  title: '',
		  text: 'Importar lotes desde una Requisición existente',
		  html:
			  '<iframe width="850" height="400" id="ventanaImportar" frameborder="0" src="../../sam/pedidos/muestraImportarp.action?cve_req='+cve_requisicion+'"></iframe>',//cve_req="'+'cve_requisicion+idVale='+$('#CVE_VALE').val()
		  width: 800,
		  confirmButtonText: 'Cerrar',
		  padding: 10,
		  animation: false
		})
}

/*----------------------- Carga los lotes seleccionados a otra requisicion ----------------------------------------------------*/
//----------------------  Viene de la pagina muestraImportarp del frame cargarLotes () -------------------------------------
function CargarLotesNuevos(lotes){
	
	cve_ped = $('#CVE_PED').val();
	cve_req = $('#CVE_REQ').val();
	iva = $('#txtiva').val();
	
	alert('El iva es: ' +iva);
	//swal('Agregando nuevos lotes');
	
	controladorPedidos.sincronizaPedidos(lotes, cve_req, cve_ped,iva, {
				callback:function(items) {
					if(items) {
											
						swal('Lotes importados con éxito');	
					}
					else
						swal('','La operacion ha fallado al importar lotes','error');
			} 					   				
			,
			errorHandler:function(errorString, exception) { 
				swal('',"Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador",'error');          
			}
	});
}


/*Metodo para mostrar el reporte PDF del pedido*/
function getReportePedido(clavePed) {
	$('#clavePedido').val(clavePed);
	$('#forma').attr('target',"impresion");
	$('#forma').submit();
	$('#forma').attr('target',"");
}



/*funcion para habilitar los elementos del concepto*/

function habilitarConcepto(checked, id, bol){
	var valor =0;
	$('#cmdenviarPedido').prop('disabled', !checked);
	$('#txtenviarpedido').prop('disabled', !checked);
	$('#cmdguardarPedido').prop('disabled', false);
	$('#txtcantidad'+id).prop('disabled', !checked);
	$('#txtnota'+id).prop('disabled', !checked);
	$('#txtpreciounit'+id).prop('disabled', !checked);
	
	$("INPUT[id='chkconcepto'][type='checkbox']").each(function(){ if($(this).val()!=0){ 														   
					if($(this).prop('checked')){
						valor++;
					}
				}
			});
	
	if(valor>=1) {
		$('#cmdenviarPedido').prop('disabled', false);
		$('#txtenviarpedido').prop('disabled', false);
	}
	else
	{
		$('#cmdenviarPedido').prop('disabled', true);
		$('#txtenviarpedido').prop('disabled', true);
	}
	
	calculatTotal(id, $('#txtcantidad'+id).attr('value'), $('#txtpreciounit'+id).prop('value'), checked); 
	
	if(!bol) getTotales();
}

/*Funcion para eleccionar todos los check del listado*/
function setCheckAll(check){	
	
	
	$("input[name='"+check+"'][type='checkbox']").prop('checked', $('#checkall').is(':checked'));
	$("input[id='"+check+"'][type='checkbox']").each(function(){ if($(this).val()!=0){															 
					habilitarConcepto($('#checkall').prop('checked'), $(this).val(), true);
				}
			});
		
	if(!$('#checkall').prop('checked')) {subtotal =0; $('#cmdguardarPedido').prop('disabled', true);}
	getTotales();
}


/*funcion para calcular el total del concepto*/
function calculatTotal(id, cantidad, precio, check){
	if(check) {
		$('#divcosto'+id).text('$'+formatNumber(cantidad*precio)+' ');
	}
	else{
		$('#divcosto'+id).text('$ 0.00 ');
	}
}

/*funcion para calucar subtotales y totales*/
function getTotales(){
	ieps =0;
	subtotal =0;
	subtotalsieps=0;
	total = 0;
	var valor = 0;
	var i =0;
	var tablita = "";
	$("input[id='chkconcepto'][type='checkbox']").each(function(){ if($(this).val()!=0){ 														   
					if($(this).prop('checked')){
						
						subtotalsieps =  subtotalsieps + ($('#txtcantidad'+$(this).val()).val()*$('#txtpreciounit'+$(this).val()).val());
						$('#divcosto'+$(this).val()).text('$'+formatNumber($('#txtcantidad'+$(this).val()).val()*$('#txtpreciounit'+$(this).val()).val()));
						if(isNaN($('#txtpreciounit'+$(this).val()).val())) valor++;
					}
				}
			});
	/*Comprueba valores numericos*/
	$("input[id='chkconcepto'][type='checkbox']").each(function(){ if($(this).val()!=0){ 														   
					if($(this).prop('checked')){
						if(isNaN($('#txtpreciounit'+$(this).val()).val())) {
							tablita = tablita +   '<tr>'+
													'<td align="center">'+$('#Lote'+$(this).val()).val()+'</td>'+
													'<td align="right">'+$('#txtpreciounit'+$(this).val()).val()+'&nbsp;</td>'+
												  '</tr>';
							i++;
							$('#txtpreciounit'+$(this).val()).prop('val','');				
						}
						if(valor==i&&valor!=0) 
							jAlert("Hay valores numericos no válidos en precios unitarios, quite los separadores de Miles(<strong>,</strong>) o simbolos especiales(¿?-/*@#$%&_;:<>{}...) .Los lotes afectados son los siguientes:<br><br><table align='center' height='22' class='listas' width='243' border='0' cellspacing='0' cellpadding='0'><tr><th width='89' align='center'>Lote</td><th width='154' align='right'>Precio Unitario&nbsp;</td>  </tr>"+tablita+"</table>","Advertencia");	
						
					}
				}
			});
	
	
	var ieps = $('#txtieps').val();
	
	if(isNaN($('#txtieps').val())){jAlert('El valor númerico del <strong>IEPS</strong> no es valido, vuelva a escribirlo', 'Advertencia'); return false;}
	if($('#txtieps').val()=='') $('#txtieps').prop('value', '0');
	
	subtotal = subtotalsieps +Number($('#txtieps').val());
	
	
	$('#divsubtotal').text('$'+formatNumber(subtotal+Number(ieps)));
	
	
	
	
	if(isNaN($('#txtdescuento').val())){jAlert('El valor númerico del <strong>descuento</strong> no es valido, vuelva a escribirlo', 'Advertencia'); return false;}
	
	var descuento = $('#txtdescuento').val();
	
	/*Aplicacion del Iva si lo requiere*/
	var iva = 0.0;
	if($('#cboiva').val()==0) $('#txtiva').prop('value', '0');
	if($('#cboiva').val()==1) {
		
			iva = redondeo(subtotal*0.16);
			$('#txtiva').prop('value', iva);
		
	}
	if($('#cboiva').val()==2){
		iva = ($('#txtiva').val()*1);
		$('#txtiva').prop('value', iva);
	}
		
	
	
	/*Aplicar descuento si es requerido*/
	if($('#txtdescuento').val()=='') $('#txtdescuento').prop('value', '0');
	if($('#txtdescuento').val()!=''){
		if((subtotal - descuento) < 0 ) {jAlert('El monto del descuento no puede ser mayor al subtotal, vuelva a escribirlo','Advertencia'); $('#txtdescuento').prop('value', ''); $('#txtdescuento').focus(); return false;}
		subtotal = subtotal - descuento ;
		total = subtotal + iva;
	}
	else 
		total = (subtotal)  + iva ;
		
	$('#divtotal').text('$'+formatNumber(redondeo(total)));
	
	total_pedido='$'+formatNumber(redondeo(total))
	console.log('Total del pedido: ' + total_pedido);
	/*
	var n = 1.7777;    
	n.round(2); // 1.78
	*/
}

function getTotalesMasIva(){
	var iva_temp = 0.00;
	if($('#cboiva').val()==1||$('#cboiva').val()==2) {
		//if($('#txtiva').attr('value')=='0'||$('#txtiva').attr('value')=='') 
			iva_temp = (1* $('#txtiva').val());
		//else 
		//	iva_temp = ($('#txtiva').attr('value')*1)+subtotal;
	}
	total = subtotal + iva_temp;
	$('#divtotal').text('$'+formatNumber(redondeo(total)));
}

/*funcion para obtener un arreglo de los ids seleccionados*/
function getCheckValues(check){
	var values = Array();
	$("INPUT[id='"+check+"']:checked").each(function(){ if($(this).val()!=0) values.push($(this).val());});
	return values.join(",");
}

/******************************   FUNCIONES ADICIONALES DE LOS PEDIDOS   ****************************************************/
/****************************************************************************************************************************/
/*funcion para borrar los conceptos seleccionados*/
function borrarLotes(){
	var checkConceptos = [];
     $('input[name=chkconcepto]:checked').each(function() {checkConceptos.push($(this).val());});	
  	 var cve_ped = $('#CVE_PED').val();
	 var cve_req = $('#CVE_REQ').val();
	 if (checkConceptos.length>0){
		 swal({
			  title: 'Es seguro?',
			  text: '¿Confirma que desea cerrar el pedido?',
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonText: 'Sí, gaurdar!',
			  cancelButtonText: 'No, abortar!',
			  timer: 4000,
			  showLoaderOnConfirm: true,
			  preConfirm: function(email) {
				    return new Promise(function(resolve, reject) {
				      setTimeout(function() {
				        if (email === 'taken@example.com') {
				          reject('This email is already taken.');
				        } else {
				          resolve();
				          controladorPedidos.eliminarLotesPedido(checkConceptos, cve_ped, $('#txtdescuento').val(), {
								callback:function(items) {
									
									setTimeout(function(){
									    swal("Lotes eliminados con éxito!");
									    mostrarTablaLotes($('#CVE_PED').val());
									  }, 2000);
								} 					   				
								,
								errorHandler:function(errorString, exception) { 
									swal('',"Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador",'error');          
								}
							});  
				        }
				      }, 2000);
				    });
				  },
				  allowOutsideClick: false
				
			}).then((result) => {
				  
			  if (result.value  ) {
				
							
			  
			  } else if (result.dismiss === swal.DismissReason.cancel) {
				  		swal('Cancelado','Proceso cancelado','error')
			  }
			});
		 
				
	 }else 
	    swal('','Es necesario que seleccione por lo menos un lote del listado', 'warning');
		
}

/****************************************************************************************************************************/
/****************************************************************************************************************************/
/*funcion para mostrar el listado de conceptos*/
function mostrarTablaLotes(cve_ped){
	var cont =0;
	var total = 0;
	quitRow("listasConceptos");
	controladorPedidos.getConceptos(cve_ped, {
						   callback:function(items) { 
						   		jQuery.each(items,function(i){
									 cont++;
									 pintaTablaLotes('listasConceptos', this);				   
									 if(items.length==cont) pintarTotalConceptos('listasConceptos', cve_ped);
								});
						   }
	});
	
}

/*funcion para pintar las filas de los subtotales*/
function pintarTotalConceptos(table, cve_ped){
	/*Primera fila*/
	//appendNewRow(table, [Td('', izquierda, '', '<input type="button" value="Borrar lotes" id="cmdborrarConceptos" class="botones" onClick="borrarLotes()" />&nbsp;<input type="button" value="Enviar lotes a otro pedido" id="cmdenviarPedido" class="botones" onClick="enviarLotesPedido()" disabled/>', 6),
	//					 ]);
}

/*Funcion para pintar las filas de los conceptos*/
function pintaTablaLotes(table, obj){
	/*Filas de los conceptos*/
	appendNewRow(table, [Td('', centro , '', '<input type="checkbox" onClick="habilitarConcepto(this.checked, '+obj.ID_PED_MOVTO+')" name="chkconcepto" id="chkconcepto" value="'+obj.ID_PED_MOVTO+'">'),
						 Td('', centro , '', '<input type="hidden" value="'+obj.PED_CONS+'" id="Lote'+obj.PED_CONS+'">'+obj.PED_CONS),
				 		 Td('', centro , '', '<input type="text" class="input" style="width:100%;text-align:center" onBlur="getTotales()" disabled value="'+obj.CANTIDAD+'" id="txtcantidad'+obj.ID_PED_MOVTO+'">'),
						 Td(obj.UNIDMEDIDA, centro , '', ''),
						 Td('', centro , '', '<textarea rows="3" class="textarea" maxlength="300" style="width:99%" disabled id="txtnota'+obj.ID_PED_MOVTO+'">'+obj.DESCRIP+'</textarea>'),
						 Td('$ '+obj.PRECIO_EST, derecha, '', ''),
						 Td('', centro , '', '<input type="text" onBlur="getTotales()" class="input" style="width:95%; text-align:right; padding-right:5px" disabled value="'+formatNumber(obj.PRECIO_ULT, '')+'" data-txtpreciounit="'+obj.ID_PED_MOVTO+'" id="txtpreciounit'+obj.ID_PED_MOVTO+'">'),
						 Td('', derecha, '', '<div align="right" id="divcosto'+obj.ID_PED_MOVTO+'">'+formatNumber((obj.CANTIDAD*obj.PRECIO_ULT), '$')+'</div>')]);
}



