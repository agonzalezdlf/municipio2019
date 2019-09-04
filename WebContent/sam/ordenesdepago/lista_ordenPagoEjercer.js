var cve_op = 0;
var demo_option=null;

$(document).ready(function() { 
	
		$(".trigger").click(function(){
			$(".panel").toggle("fast");
			$(this).toggleClass("active");
			return false;
		});
		$('#div_unidades').hide();
		$('#cmdfecha').click(function(event){cambiarFecha();})
		$('#cmdejercer').click(function(event){ejercerOP();});
		
		$('#cbotiporelacion').on('change',function(event){
			cambiarTipoRelacion()
		});
		$('#cborelacion').on('change',function(event){
			cargarRelacion()
		});
				
		$('#cmdabrir').click(function(event){abrirCerrarRelacion();});
		$('#cmdmodificar').click(function(event){modificarRelacion();});
		$('#cmdnueva').click(function(event){nuevaRelacion();});
		$('#cmdagregar').click(function(event){agregarOpRelacion();});
		$('#cmdeliminar').click(function(event){eliminarOpRelacion();});
		$('#cmdimprimir').click(function(event){imprimirRelacion();});
		$('#cmdimprimirgeneral').click(function(event){imprimirGeneral();})
		//$('#txtnumop').keypress(function(event){if (event.keyCode == '13'){$('#cmdagregar').click();}});
		$('#ui-datepicker-div').hide();
		 
		 if($('#txtfecha').val()=='')
		 {
			var fecha = new Date();
		 	$('#txtfecha').val(fecha.getDate()+'/'+(fecha.getMonth()+1)+'/'+fecha.getFullYear()); 
		 }
		 
		 $('#cbotiporelacion').val(0);
				 
		 $('#txtfecha_ejercer').datetimepicker({
				format: 'DD/MM/YYYY',
			    useCurrent: false //Important! See issue #1075
			});
		 
		 $('#fecha_relacion').datetimepicker({
				format: 'DD/MM/YYYY',
			    useCurrent: false //Important! See issue #1075
			});
		 
		 $('#fecha_pejercer').datetimepicker({
				format: 'DD/MM/YYYY',
			    useCurrent: false //Important! See issue #1075
			});
		 		 
		 $('.selectpicker').selectpicker();
		
		 $('#cbstatusOP').on('change',function(event){
				buscarOpMes();
		 });
		 
		 
	
});

function demoAjax(){
	
	var statusOP=$('#cbstatusOP').val();
	var s = "?mes="+$('#cbomes').val()+"&statusOP="+$('#cbstatusOP').val();
	
	var data = JSON.stringify({"statusOP": statusOP,"s":s});
	
	$.ajax({
		type: "POST",
		url:"${pageContext.request.contextPatch}/xxxxxx",
		contentType: "application/json",
		data: data,
		success: function (data){
			
			if(data===""){
				return;
			}else{
				var html =[];
				html.push
			}
		}
		
	})
}

//funcion para bu{-}scar ordenes de pago segun criterio del mes
function buscarOpMes(){
	
	//var s = "?por_ejercer="+$('#chk_ejercer').prop('checked')+"&ejercidas="+$('#chk_ejercercidas').prop('checked')+"&mes="+$('#cbomes').val()+"&fecha_ejercer="+$('#chkfecha').prop('checked')+"&fecha="+$('#txtfecha_ejercer').val();
	
	var statusOP=$('#cbstatusOP').val();
	var s = "?mes="+$('#cbomes').val()+"&statusOP="+$('#cbstatusOP').val();
	//console.log('Estatus mandado al controlador: ' +$('#cbstatusOP').selectpicker('val')+" & "+statusOP);
	document.location = s;
}


function imprimirGeneral(){
	var tipo = "";
	//Relacion tipo 1 == Envio OP
	if($('#cbotiporelacion').val()==1) 
		tipo = "ENVIO";
	//Relacion tipo 2 == Devolucion OP
	else if($('#cbotiporelacion').val()==2)
		tipo = "DEVOLUCION";
	//Relacion tipo 3 == Envio Vale
	else if($('#cbotiporelacion').val()==3)
		tipo = "VALES";
	//Relacion tipo 3 == Envio Vale
	else
		tipo = "VALES_DEVOLUCION";
		
	window.open('../consultas/rpt_relacion_globalOP.action?tipo='+tipo,'mywindow2','');
}


function imprimirRelacion(){
	var id_relacion = $('#cborelacion').val();
	$('#id_relacion').val(id_relacion);
	
	$('#frmreporte').prop('action',"../reportes/rpt_relacion_envio.action");

	$('#frmreporte').prop('target',"impresion");
	$('#frmreporte').submit();
	$('#frmreporte').prop('target',"");
	$('#frmreporte').prop('action',"");
	$('#cmdimprimir').prop('disabled', false);
	$('#cmdimprimir').focus();
}

function nuevaRelacion2(){
	var subtitulo = ($('#cbotiporelacion').val()>1) ? 'Devolucion':'Envio';
	var html = '<table width="350" border="0" cellspacing="0" cellpadding="0">' +
				  '<tr>'+
					'<td height="20" width="150">Formato de fecha:</td>'+
					'<td width="200">dd/mm/aaaa</td>'+
				  '</tr>'+
				  '<tr>'+
					'<td height="20">Fecha Nueva:</td>'+
					'<td><input type="text" id="txtfecharelacion" value="" style="width:100px" /></td>'+
				  '</tr>'+
				  '<tr>'+
					'<td height="50" align="center" colspan="2"><input type="button" value="Crear Relaci&oacute;n" id="cmdcrearrelacion" class="botones"/>&nbsp;<input type="button" value="Cancelar" id="cmdcancelar" class="botones"/></td>'+
				  '</tr>'+
				'</table>';
	jWindow(html,'Nueva Relacion de '+subtitulo, '','',0);
	$('#cmdcrearrelacion').click(function(event){crearRelacionOP();})
	$('#cmdcancelar').click(function(event){$.alerts._hide();})
	//$('#txtfecharelacion').keypress(function(event){if (event.keyCode == '13'){$('#cmdcrearrelacion').click();}});

}

function nuevaRelacion(){
	
	var subtitulo = ($('#cbotiporelacion').val()==2||$('#cbotiporelacion').val()==4) ? 'Devolucion':'Envio';
	var t_rel = ($('#cbotiporelacion').val()==1 ||$('#cbotiporelacion').val()==2) ? 'Orden de Pago':'Vales';
	swal({
		  title: '<h2 style="font-size: 30px;">Crear relacion de '+t_rel+'  </h2> '+ 'Tipo: '+subtitulo,
		  html: '<div class="input-group date" id="fecha_relacion"> ' +
                '<input type="text" id="fecha_d" name="fecha_d" class="form-control" />	 ' +
                '<span class="input-group-addon"> ' +
                '<span class="glyphicon-calendar glyphicon"></span> ' +
                '</span> ' +
                '</div>',
		  useRejections: true,
		  customClass: 'swal2-overflow',
		  inputPlaceholder: 'dd/mm/aaaa',
		  showCancelButton: true,
		  confirmButtonText: 'Sí, crear!',
		  cancelButtonText: 'No, cancelar!',
		  confirmButtonClass: 'btn btn-success',
		  cancelButtonClass: 'btn btn-danger',
		  allowOutsideClick: false,
		  onOpen: function() {
		    	$('#fecha_relacion').datetimepicker({
		    		format: 'DD/MM/YYYY',
		    		defaultDate: new Date(),
		    		widgetPositioning: {
		    	        vertical: 'auto',
		    	        horizontal: 'auto'
		    	    }
		     	})
		     	
		    },
		  inputValidator: function (value) {
		    return new Promise(function (resolve, reject) {
		      if (value) {
		        resolve()
		        
		      } else {
		      		reject('Debe escribir una fecha a la realación')
		      	
			  }
		    })
		  }
		    
		}).then(function (text) {
			
			 fecha=$('#fecha_d').val();
			 //Inicia
			 
			 swal({
				  title: 'Estas seguro?',
				  text: "¿Confirma que desea crear la relacion de la orden de pago?",
				  type: 'warning',
				  showCancelButton: true,
				  confirmButtonColor: '#3085d6',
				  cancelButtonColor: '#d33',
				  confirmButtonText: 'Sí, confirmar!',
				  cancelButtonText: 'No, cancelar!',
				  confirmButtonClass: 'btn btn-success',
				  cancelButtonClass: 'btn btn-danger',
				  buttonsStyling: false
				}).then(function (r) {
				  swal('Creada!','Tu documento fue creado con éxito!','success');
				  //clase para cencelacion
						  if(r){
								swal.showLoading();
								//var fecha = $('#txtfecharelacion').attr('value');
								var idDependencia = $('#cbodependencia2').val();
								var tiporel = $('#cbotiporelacion').val();
								if(idDependencia==null) idDependencia = 0;
								controladorListadoOrdenPagoEjercidoRemoto.nuevaRelacion(fecha, tiporel, idDependencia, {
									callback:function(items) {
										
										if($('#cbotiporelacion').val()==1)
											//cargarRelacionEnvio(items);
											setTimeout('cargarRelacionEnvio('+items+')',1300);
										else if($('#cbotiporelacion').val()==2)
											setTimeout('cargarRelacionDevolucion('+items+')',1300);
											//cargarRelacionDevolucion(items);
										else if($('#cbotiporelacion').val()==4)
											setTimeout('cargarRelacionVales('+items+')',1300);
											//cargarRelacionValesDevolucion(0);
										else
											cargarRelacionVales(items);
										swal({title:'Relacion creada con exito!!',showConfirmButton: false,timer:1000,type:"success"});
										//CloseDelay('Relacion creada con exito ',2000);
										//limpiar();
								 } 					   				
								 ,
								 errorHandler:function(errorString, exception) { 
									swal("Fallo la operacion 2:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");          
								 }
					}); 
						
						}
				  //cancelacion cirre
				}, function (dismiss) {
				  // dismiss can be 'cancel', 'overlay',
				  // 'close', and 'timer'
				  if (dismiss === 'cancel') {
				    swal(
				      'Cancelado',
				      'El proceso no fue ejecutado',
				      'warning'
				    )
				  }
				})
			 //Hasta aqui
		});
	
	
	//Termina ciclo de cancelacion
}

	
function cargaDetalles(){
	alert('Revisando carga Detalles');
	if($('#hddetalle').val()!=0) {
		//metodo cancelar
		$('#hddetalle').val(0);
		$('#txtnumop').val('');
		$('#txtarea').val('');
		$('#cmdmodificarop').val('Modificar');
		$('#cmdeliminar').attr('disabled', false);
		$('#chkdevuelto').attr('checked', false);
		return false;
	}
	var id = parseInt($('#lstdetalles').val());
	//ShowDelay('Cargando detalle');
	controladorListadoOrdenPagoEjercidoRemoto.cargarDetalle(id, {
						callback:function(items) { 	
							$('#hddetalle').val(items.ID_DETALLE);
							$('#txtnumop').val(items.CVE_OP);
							$('#txtarea').val(getHTML(items.OBSERVACIONES));
							$('#chkdevuelto').attr('checked', (items.DEVOLUCION=='S') ? true: false);
							$('#cmdmodificarop').val('Cancelar');
							$('#cmdeliminar').attr('disabled', true);
							//_closeDelay();
					 } 					   				
					 ,
					 errorHandler:function(errorString, exception) { 
						 swal("Fallo la operacion 3:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");          
					 }
		});
}

function validarList(){
	
	var cont=0;
	$("#lstdetalles option").each(function(){
		cont++;
	});
	if(cont>0&&($('#cbotiporelacion').val()==1||$('#cbotiporelacion').val()==2)) {
		$('#cmdmodificarop').attr('disabled', false);
		$('#txtarea').attr('disabled', false);
		$('#chkdevuelto').attr('disabled', false);
	}
	else{
		$('#cmdmodificarop').attr('disabled', true);
		$('#txtarea').attr('disabled', true);
		$('#chkdevuelto').attr('disabled', true);
	}
}

function modificarRelacion(){
	
	swal({
		title: '<h2>Editar propiedades de la relacion</h2>',
		html: '<div class="row">'+  
					'<div class="form-group">' +
						'<div style="font-size: 16px;"><strong>Unidad Administrativa.:</strong></div> ' +
						'<div><select name="cbodependenciaM"  id="cbodependenciaM" class="form-control input-sm" style="width:300px"></select></div> ' +
					'</div>' +
			  '</div>'+
			  '<div class="form-group">' +
			   '<label for="fecha_relacion" class="control-label">Fecha:</label>' +
			   '<div class="row">' +
			   '<div class="col-sm-6">'+ 
	    	   	'<div class="input-group date" id="date_new" style="width:150px" value=""> ' +
	    	   		'<input type="text" id="newfecha_r" name="newfecha_r" class="form-control datos" value="'+$('#divfechaentrada').text()+'" />	 ' +
	    	   		'<span class="input-group-addon"> ' +
	    					'<span class="glyphicon-calendar glyphicon"></span> ' +
	    			'</span> ' +
	    		'</div>' +
	    	   '</div>' +
	    	   '</div>' + 
	    	   '</div>',
		customClass: 'swal2-overflow',
		showCancelButton: true,
		allowOutsideClick: false,
	   	onOpen: function() {
	   		
	    	$('#date_new').datetimepicker({
	    		format: 'DD/MM/YYYY',
	    		useCurrent: false, 
	    		defaultDate: new Date(),
	    		widgetPositioning: {
	    	        vertical: 'auto',
	    	        horizontal: 'auto'
	    	    }
	     	});
	    },
	    inputValidator: function (result) {
		    return new Promise(function (resolve, reject) {
		      	if (result) {
		      		resolve()
		        } else {
		      		reject('Debe escribir una fecha a la realación')
		      	}
		    })//cierra new promisse
		}//cierra inputvalidator
	  }).then(function(result) {
		  if (result) {
			 
			  var fecha_rel = $('#newfecha_r').val();
			  var id_relacion = $('#cborelacion').val();
			  var IdDependencia = $('#cbodependenciaM').val();
			 
			  if(IdDependencia==null)
				  IdDependencia=0;
			  
			  //swal('Cambiando fecha a la relacion');//swal2-confirm
			  cambiarFechaRelacion(fecha_rel, id_relacion, IdDependencia);
			  $('#cbodependenciaM').append($("#cbodependencia2 > option").clone());
				$('#cbodependenciaM').val($("#cbodependencia2").val());
				
				if($('#cbotiporelacion').val()!=2) 
					$('#cbodependenciaM').prop('disabled', true);
			  swal({title:'Proceso cocluido con exito!!',showConfirmButton: false,timer:1000,type:"success"});
		  } else{
			  alert('Aceptar el movimiento'+fecha_newr);
		  }
	  })//Finaliza el then
	/*************************************************************************************************************/
	/*
	var html = '<table width="500" border="0" cellspacing="0" cellpadding="0">' +
				  '<tr>'+
					'<td height="30" width="120"><strong>Unidad Administrativa.:</strong></td>'+
					'<td width="350"><select name="cbodependenciaM"  id="cbodependenciaM" style="width:350px" class="comboBox"></select></td>'+
				  '</tr>'+
				  '<tr>'+
					'<td height="30" width="150">Formato de fecha:</td>'+
					'<td width="200">dd/mm/aaaa</td>'+
				  '</tr>'+
				  '<tr>'+
					'<td height="30"><strong>Fecha Nueva:</strong></td>'+
					'<td><input type="text" id="txtfecharelacion" value="'+$('#divfechaentrada').text()+'" style="width:100px" /></td>'+
				  '</tr>'+
				  '<tr>'+
					'<td height="50" align="center" colspan="2"><input type="button" value="Guardar cambios" id="cmdcrearrelacion" class="botones" style="width:100px"/>&nbsp;<input type="button" value="Cancelar" id="cmdcancelar" class="botones" style="width:100px"/></td>'+
				  '</tr>'+
				'</table>';
	jWindow(html,'Editar propiedades de la relacion', '','',0);
	$('#cmdcrearrelacion').click(function(event){cambiarFechaRelacion();})
	$('#cmdcancelar').click(function(event){$.alerts._hide();})
	$('#txtfecharelacion').keypress(function(event){if (event.keyCode == '13'){$('#cmdcrearrelacion').click();}});

	$('#cbodependenciaM').append($("#cbodependencia2 > option").clone());
	$('#cbodependenciaM').val($("#cbodependencia2").val());
	*/
	//if($('#cbotiporelacion').val()!=2) 
		//$('#cbodependenciaM').attr('disabled', true);

}

function cambiarFechaRelacion(fecha_rel, id_relacion, IdDependencia){
	console.log('Datos recibidos: ' +fecha_rel + 'Relacion: ' +id_relacion+'Dependencia: ' + IdDependencia);
	//swal('Cambiando fecha a la relacion');
	//if(newfecha_r=='') {jAlert('La fecha de la relacion no es valida','Advertencia'); return false;}
	controladorListadoOrdenPagoEjercidoRemoto.cambiarFechaRelacion(fecha_rel, id_relacion, IdDependencia,{
						callback:function(items) {
							if(items!='') 
								swal('',items,'error');
							else
								{
									//CloseDelay('Fecha cambiada con exito',2000);
									if($('#cbotiporelacion').val()==1)
										cargarRelacionEnvio(id_relacion);
									else if($('#cbotiporelacion').val()==2)
										cargarRelacionDevolucion(id_relacion);
									else if($('#cbotiporelacion').val()==4)
										cargarRelacionValesDevolucion(0);
									else
										cargarRelacionVales(id_relacion);
								}
						} 					   				
					 ,
					 errorHandler:function(errorString, exception) { 
						swal('Opsss..',"Fallo la operacion 1:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador",'error');          
					 }
		});
}


function eliminarOpRelacion(){
	
	var titulo = "la Orden de Pago";
	if($('#cbotiporelacion').val()==3||$('#cbotiporelacion').val()==4) titulo = "el vale";
	var op = [];
	$("#lstdetalles option").each(function(){
		if($(this).prop('selected')) op.push($(this).val());
	});
	
	if(op.length>0){
		
		swal({
            title: "¿Confirma que desea eliminar "+titulo+" de la relación actual?", 
            text: "Eliminando detalles", 
            type: "warning",
            confirmButtonText: "Sí, eliminar",
            showCancelButton: true,
            allowOutsideClick: false,
            showLoaderOnConfirm: true,
			  preConfirm: function() {
			    return new Promise(function(resolve, reject) {
			    	setTimeout(function() {
			    		
						controladorListadoOrdenPagoEjercidoRemoto.eliminarOpRelacion(op,{
						callback:function(items) { 	
							if(items=="") 
								swal({title: $('#cbotiporelacion').val()==3 || $('#cbotiporelacion').val()==4 ? 'Vales eliminados con exito':'Ordenes de Pago eliminadas con exito',showConfirmButton: false,timer:3000,type:"success"});
							else 
								swal('',items, 'error');
						 },
						 errorHandler:function(errorString, exception) { 
							swal('',"Fallo la operacion 4:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador",'info');          
						 }
						});
			    		resolve();
			    	},2000);
			    });
			  },
        	}).then(function (result)  {
        		
        		cargarRelacion();
            })//.catch(swal.noop);
	}
	else
		swal('Opss..','Es necesario seleccionar almenos una Orden de Pago de la lista','warning');
}

/*Agragar la op manualmente*/
function agregarOpManual(){
	var checks = [];
	var titulo = "Ordenes de Pago";
	if($('#cbotiporelacion').val()==3) titulo = "Vales";
	var texto = $('#txtarea').val();
	var op = $('#txtnumop').val();
	checks.push(op);
	var id_relacion = $('#cborelacion').val();
	if(op=='') {
		swal('','El n&uacute;mero de Orden de Pago/Vale no es v&aacute;lido, debe seleccionar del listado o introducirlo manualmente', 'warning'); $('#txtnumop').focus(); return false;
	}
	if($('#cbotiporelacion').val()<2)
		texto="";
	//$('#txtnumop').val("");
	//cargarRelacion();
	//CloseDelay(titulo+' agregadas con éxito', 2000, cargarRelacion());
	swal({
	   	  text: 'Agregando '+titulo,
	   	  onOpen: function () {
	   	    swal.showLoading()
	   	    controladorListadoOrdenPagoEjercidoRemoto.agregarOpRelacion(checks, id_relacion, texto,{
		    			callback:function(items) { 
		    				alert('Pasa por agregarOpManual con remoro agregarOpRelacion')+JSON.stringify(checks)+'|'+items;
							if(!items=="") 
								swal(items);
							else{
								
								cargarRelacion();
								
							}
								
						},
						errorHandler:function(errorString, exception) { 
							swal(errorString);          
					 }
		    		});
	   	    setTimeout(function () {
	   	    	cargarRelacion();
	   	      swal.close()
	   	    }, 2000)
	   	  }
	   	})
	/*swal({
        title: "¿Confirma que desea eliminar "+titulo+" de la relación actual?", 
        text: "Eliminando detalles", 
        type: "warning",
        confirmButtonText: "Sí, eliminar",
        showCancelButton: true,
        showLoaderOnConfirm: true,
		  preConfirm: function() {
		    return new Promise(function(resolve) {
		    	setTimeout(function() {
		    		controladorListadoOrdenPagoEjercidoRemoto.agregarOpRelacion(checks, id_relacion, texto,{
		    			callback:function(items) { 	
							if(!items=="") 
								swal(items, 'error');
								
							else{
								
								cargarRelacion();
							}
								
						},
						errorHandler:function(errorString, exception) { 
							swal(errorString);          
					 }
		    		});
				    resolve();
		    	},2000);
		    });
		  },
    	}).then(function (result)  {
    		swal({title: titulo+' agregadas con éxito',showConfirmButton: false,timer:3000,type:"success"});
    		//cargarRelacion();
        })//.catch(swal.noop);*/
	/*swal('Agregando '+titulo);
	controladorListadoOrdenPagoEjercidoRemoto.agregarOpRelacion(checks, id_relacion, texto,{
		callback:function(items) { 	
			if(items=="") 
				//CloseDelay(titulo+' agregadas con éxito', 2000, cargarRelacion());
				swal({
					  title: "Auto close alert!",
					  text: "I will close in 2 seconds.",
					  timer: 2000,
					  showConfirmButton: false
					},cargarRelacion());
				//alert('agregades: '+items );
			else 
				swal(items, 'error');
		 },errorHandler:function(errorString, exception) { 
			swal(errorString);          
		 }
	});*/
}

function guardarCambiosOP(){
	alert('Entro a la clase guardarCambiosOP');
	var titulo = "Ordenes de Pago";
	if($('#cbotiporelacion').val()==3) titulo = "Vales";
	var id = parseInt($('#lstdetalles').val());
	var texto = $('#txtarea').val();
	var devolucion = ($('#chkdevuelto').is(':checked') ? 'S':'N');
	var idDependencia = $('#cbodependencia').val();
	//ShowDelay('Guardando cambios');
	controladorListadoOrdenPagoEjercidoRemoto.guardarOpDetalle(id, texto, devolucion, idDependencia, {
						callback:function(items) { 	
							if(items==""){ 
								//CloseDelay(titulo+' guardada con éxito', 2000, cargarRelacion());
								swal({title:titulo+' guardada con éxito',timer: 2000,showConfirmButton: false },cargarRelacion());
								$('#hddetalle').val(0);
								$('#txtnumop').val('');
								$('#txtarea').val('');
								$('#cmdmodificarop').val('Modificar');
								$('#cmdmodificarop').attr('disabled', true);
								$('#chkdevuelto').attr('checked', false);
							}
							else 
								swal(items);
					 } 					   				
					 ,
					 errorHandler:function(errorString, exception) { 
						swal("Fallo la operacion 5:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");          
					 }
		});
}

function agregarOpRelacion(){
	
	var titulo = "";
	var checks = [];
	var id_relacion = $('#cborelacion').val();
	var texto = $('#txtarea').val();
	if($('#hddetalle').val()!=0&&$('#cbotiporelacion').val()>1) {guardarCambiosOP(); return false;}
	$('input[id=chkOP]:checked').each(function() {checks.push($(this).val()); });

	/*comporvar si es vale*/
	if($('#cbotiporelacion').val()==3||$('#cbotiporelacion').val()==4) 
		titulo = "Vales";
	else 
		titulo = "Orden de pago";
	
	/*comporvar si es relacion de devolucion de vale*/
	if($('#cbotiporelacion').val()=="3"&&$('#txtnumop').val()!=''){
		var val = $('#txtnumop').val();
		checks = [];
		checks.push(val);
	}
	//Valida que se escriba un numero de vale 
	if(checks.length==0&&$('#cbotiporelacion').val()==3){
		swal({title:'',text:'El número de vale no es válido, vuelva a escribirlo',type:'info',width:300,timer:1200, showConfirmButton: false}); 
		return false;
	}
	
	if (checks.length>0){
		
		//agregar ops automaticamnte
		//swal('Agregando '+titulo);
		controladorListadoOrdenPagoEjercidoRemoto.agregarOpRelacion(checks, id_relacion, texto,{
						callback:function(items) { 	
							
							if(items=="") {
								
								if($('#cbotiporelacion').val()==3||$('#cbotiporelacion').val()==4)
									cargarRelacion();
									//CloseDelay('Vale agregado con éxito', 2000, cargarRelacion());
									//swal({title:'Vale agregado con éxito',timer: 5000,showConfirmButton: false });
								else
									cargarRelacion();	
									//CloseDelay(titulo+' agregados con éxito', 2000, cargarRelacion());
								   
							}
							else 
								//Si ya existen en una relacion manda el error
								swal(items+'La orden ya esta relacionada');
					 } 	
					 ,
					 errorHandler:function(errorString, exception) { 
						swal("Fallo la operacion 6:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");          
					 }
		});
	}
	else
	{
		agregarOpManual();
		alert('Manda a capturar manual!!!');
	}
}

function abrirCerrarRelacion(){
	
	var id_relacion = $('#cborelacion').val();
	var status = ($('#hdcerrada').val()=='S') ? 'N': 'S';
	var pregunta = ($('#hdcerrada').val()=='S') ? 'Confirma que desea abrir la relacion actual para su edicion?': 'Confirma que desea cerrar la relacion actual e impedir nuevos cambios?';
	
	alert('Datos: ' +id_relacion,status,pregunta);
	
	jConfirm(pregunta,'Confirmar', function(r){
		if(r){
			//ShowDelay('Abriendo la relación actual');
			controladorListadoOrdenPagoEjercidoRemoto.abrirRelacion(id_relacion, status,{
						callback:function(items) { 	
							if(items) CloseDelay('Relación abierta con éxito', 2000, cargarRelacion());
					 } 					   				
					 ,
					 errorHandler:function(errorString, exception) { 
						swal("Fallo la operacion 7:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");          
					 }
		});
		}
	});
}

/*funcion para cargar los diferentes tipo de relaciones de ordenes de pago*/
function cambiarTipoRelacion(){
	var v = $('#cbotiporelacion').val();
	$('#div_unidades').hide();
	if(v==0) inicializar();
	if(v==1) cargarRelacionEnvio(0);
	if(v==2) cargarRelacionDevolucion(0);
	if(v==3) cargarRelacionVales(0);
	if(v==4) cargarRelacionValesDevolucion(0);
}

function cargarRelacionValesDevolucion(id){
	$('#div_unidades').show();
	$('#divdetalle').html('<h3 style="color:#FFF">Detalles de Vales</h3>');
	$('#divopvale').html('<span style="color:#FFF; font-size:11px">Vale</span>');
	$('#cmdagregar').val("Agregar Vale");
	$('#cmdeliminar').val("Eliminar Vale");
	
	
	$('#div_unidades').hide();
	
	//dwr.util.addOptions('cbodependencia2',{ 3:'Direccion de Finanzas' });
	
	if(id==0){
		inicializar();
		//cargar relacion de envio
		//ShowDelay('Cargando relacion de devoluci�n vales');
		controladorListadoOrdenPagoEjercidoRemoto.cargarRelaciones('VALES_DEVOLUCION', {
						callback:function(items) { 	
							$('#cborelacion').attr('disabled', false);
						 	dwr.util.addOptions('cborelacion',items,"ID_RELACION", "DESCRIPCION");
							$('#cmdnueva').attr('disabled', false);
							//_closeDelay();
					 } 					   				
					 ,
					 errorHandler:function(errorString, exception) { 
						swal("Fallo la operacion 13:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");          
					 }
		});
	}
	else{
		limpiar();
		$('#cborelacion').val(id);
		//cargarRelacion();
	}
}

/*reinicia los valores de los controles*/
function inicializar(){
		$('#cborelacion').attr('disabled', true);
		dwr.util.removeAllOptions('cborelacion');
		dwr.util.addOptions('cborelacion',{ 0:'[Seleccione un listado]' });
		dwr.util.removeAllOptions('lstdetalles');
		$('#divfechaentrada').text('');
		$('#cmdmodificar').attr('disabled', true);
		$('#cmdagregar').attr('disabled', true);
		$('#cmdeliminar').attr('disabled', true);
		$('#cmdimprimir').attr('disabled', true);
		$('#cmdimprimirgeneral').attr('disabled', true);
		$('#cmdmodificarop').attr('disabled', true);
		$('#divcerrada').text("");
		$('#divdevuelta').text("");
		$('#hdcerrada').attr('value', '');
		$('#hddevuelta').attr('value', '');
		$('#txtnumop').attr('value', '');
		$('#txtnumop').attr('disabled', true);
		$('#txtarea').attr('disabled', true);
		$('#txtarea').attr('value', '');
		$('#hddetalle').attr('value', 0);
		$('#cmdmodificarop').attr('value', 'Modificar');
		$('#chkdevuelto').attr('disabled', true);
		$('#chkdevuelto').attr('checked', false);
		$('#cmdnueva').attr('disabled', true);
		limpiar();
}

function limpiar(){
		dwr.util.removeAllOptions('lstdetalles');
		//$('#txtfechaentrada').attr('disabled', true);
		$('#divfechaentrada').text('');
		$('#cmdagregar').prop('disabled', true);
		$('#cmdeliminar').prop('disabled', true);
		$('#cmdimprimir').prop('disabled', true);
		$('#cmdimprimirgeneral').prop('disabled', true);
		$('#cmdmodificar').prop('disabled', true);
		$('#divcerrada').prop("");
		$('#divdevuelta').prop("");
		$('#hdcerrada').prop('value', '');
		$('#hddevuelta').prop('value', '');
		$('#cmdabrir').prop('disabled', true);
		$('#txtnumop').prop('value', '');
		$('#txtnumop').prop('disabled', true);
		$('#txtarea').prop('value', '');
		$('#txtarea').prop('disabled', true);
		$('#cmdmodificarop').prop('disabled', true);
		$('#hddetalle').prop('value', 0);
		$('#cmdmodificarop').prop('value', 'Modificar');
		$('#chkdevuelto').prop('disabled', true);
		$('#chkdevuelto').prop('checked', false);
		
}

function cargarRelacion(){
	
	var id_relacion = $('#cborelacion').val();
	var cont =0;
	limpiar();
	
	if(id_relacion==0) return false;
	
	swal({
		title: 'Cargando información de la relación!',type:'info',allowOutsideClick: false,timer: 5000
		}).then(
        function () {},
          swal.showLoading(),
        function (dismiss) {
          if (dismiss === 'overlay') {}
    })
	 controladorListadoOrdenPagoEjercidoRemoto.cargarRelacionesDocumentos(id_relacion, {
						callback:function(items) { 
						jQuery.each(items,function(i) {
							$('#cmdmodificar').prop('disabled', false);
							$('#cmdagregar').prop('disabled', false);
							$('#cmdeliminar').prop('disabled', false);
							$('#cmdimprimir').prop('disabled', false);
							$('#cmdimprimirgeneral').prop('disabled', false);
							$('#lstdetalles').prop('disabled', false);
							$('#cmdabrir').prop('disabled', false);
							$('#txtfechaentrada').prop('disabled', false);
							$('#txtnumop').prop('value', '');
							$('#txtnumop').prop('disabled', false);
							$('#txtarea').prop('disabled', false);
							$('#hddetalle').prop('value', '');
							if(cont==0){
								//muestra la informacion general
								
								$('#divfechaentrada').text(this.FECHA);
								$('#divcerrada').text((this.CERRADA=='S')? 'Si': 'No');
								$('#divdevuelta').text(getHTML((this.DEVUELTO=='S')? 'Si': 'No'));
								$('#hddevuelta').prop('value', this.DEVUELTO);
								$('#hdcerrada').prop('value', this.CERRADA);
								
								(this.CERRADA=='S') ? $('#cmdabrir').val('Abrir relacion'): $('#cmdabrir').val('Cerrar relacion');
								//Recupera la Unidad administrativa
								$('#cbodependencia2').val(this.ID_DEPENDENCIA_DEV);
								
								cont++;
							}
							var x = this.ID_DETALLE;
							//agrega los detalles al list
							//if(this.NUM_OP!=null) dwr.util.addOptions('lstdetalles',{ 0:this.NUM_OP});
       					 });	
						 
						 dwr.util.addOptions('lstdetalles',items,"ID_DETALLE", "NUM_OP");
						 if(cont==0) { 
							$('#cmdimprimir').prop('disabled', true);
						 }
						 if($('#hdcerrada').prop('value')=='S'){
								$('#cmdagregar').prop('disabled', true);
								$('#cmdeliminar').prop('disabled', true);
								$('#txtnumop').prop('value', '');
								$('#txtnumop').prop('disabled', true);
								$('#txtarea').prop('value', '');
								$('#txtarea').prop('disabled', true);
						}
						 
							//_closeDelay();
							
					 } 					   				
					 ,
					 errorHandler:function(errorString, exception) { 
						swal("Fallo la operacion 14:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");          
					 }
		});
}

/*carga la relacion de vales*/
function cargarRelacionVales(id){
	$('#divdetalle').html('<h3 style="color:#FFF">Detalles de Vales</h3>');
	$('#divopvale').html('<span style="color:#FFF; font-size:11px">Vales</span>');
	$('#cmdagregar').val("Agregar Vale");
	$('#cmdeliminar').val("Eliminar Vale");
	if(id==0){
		inicializar();
		dwr.util.removeAllOptions('cborelacion');
		dwr.util.addOptions('cborelacion',{ 0:'[Seleccione un listado]'});
		//cargar relacion de envio
		//ShowDelay('Cargando relacion de vales');
		controladorListadoOrdenPagoEjercidoRemoto.cargarRelaciones('VALES', {
						callback:function(items) { 	
						
							$('#cborelacion').attr('disabled', false);
						 	dwr.util.addOptions('cborelacion',items,"ID_RELACION", "DESCRIPCION");
							$('#cmdnueva').attr('disabled', false);
							_closeDelay();
					 } 					   				
					 ,
					 errorHandler:function(errorString, exception) { 
						swal("Fallo la operacion 15:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");          
					 }
		});
		$('#cmdagregar').attr('disabled', false);
	}
	else{
		limpiar();
		dwr.util.removeAllOptions('cborelacion');
		dwr.util.addOptions('cborelacion',{ 0:'[Seleccione un listado]'});
		//ShowDelay('Cargando relacion de vales');
		controladorListadoOrdenPagoEjercidoRemoto.cargarRelaciones('VALES', {
						callback:function(items) { 	
						
							$('#cborelacion').attr('disabled', false);
						 	dwr.util.addOptions('cborelacion',items,"ID_RELACION", "DESCRIPCION");
							$('#cborelacion').val(id);
							cargarRelacion();
							_closeDelay();
					 } 					   				
					 ,
					 errorHandler:function(errorString, exception) { 
						 
						swal("Fallo la operacion 16:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");          
					 }
		});
		$('#cmdagregar').attr('disabled', false);
	}
}

/*carga la relacion de devoluciones de ordenes de pago*/
function cargarRelacionDevolucion(id){
	$('#div_unidades').show();
	$('#divdetalle').html('<h3 style="color:#FFF">Detalles de Ordenes de Pago</h3>');
	$('#divopvale').html('<span style="color:#FFF; font-size:11px">Orden de Pago</span>');
	$('#cmdagregar').val("Agregar OP's");
	$('#cmdeliminar').val("Eliminar OP's");
	if(id==0){
		inicializar();
		dwr.util.removeAllOptions('cborelacion');
		dwr.util.addOptions('cborelacion',{ 0:'[Seleccione un listado]'});
		//cargar relacion de envio
		ShowDelay('Cargando relacion de devolucion');
		controladorListadoOrdenPagoEjercidoRemoto.cargarRelaciones('DEVOLUCION', {
						callback:function(items) { 	
							$('#cborelacion').attr('disabled', false);
						 	dwr.util.addOptions('cborelacion',items,"ID_RELACION", "DESCRIPCION");
							$('#cmdnueva').attr('disabled', false);
							_closeDelay();
					 } 					   				
					 ,
					 errorHandler:function(errorString, exception) { 
						swal("Fallo la operacion 8:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");          
					 }
		});
		$('#cmdagregar').attr('disabled', false);
	}
	else{
		dwr.util.removeAllOptions('cborelacion');
		dwr.util.addOptions('cborelacion',{ 0:'[Seleccione un listado]'});
		
		ShowDelay('Cargando relacion de devolucion');
		controladorListadoOrdenPagoEjercidoRemoto.cargarRelaciones('DEVOLUCION', {
						callback:function(items) { 	
							$('#cborelacion').attr('disabled', false);
						 	dwr.util.addOptions('cborelacion',items,"ID_RELACION", "DESCRIPCION");
							$('#cmdnueva').attr('disabled', false);
							_closeDelay();
							$('#cborelacion').val(id);
							cargarRelacion();
					 } 					   				
					 ,
					 errorHandler:function(errorString, exception) { 
						swal("Fallo la operacion 9:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");          
					 }
		});
		
		$('#cmdagregar').attr('disabled', false);
		//cargarRelacion();
	}
}

/*carga ka relacion de envios de ordenes de pago*/
function cargarRelacionEnvio(id){
	$('#divdetalle').html('<h3 style="color:#FFF">Detalles de Ordenes de Pago</h3>');
	$('#divopvale').html('<span style="color:#FFF; font-size:11px">Orden de Pago</span>');
	$('#cmdagregar').val("Agregar OP's");
	$('#cmdeliminar').val("Eliminar OP's");

	if(id==0){
		inicializar();
		dwr.util.removeAllOptions('cborelacion');
		dwr.util.addOptions('cborelacion',{ 0:'[Seleccione un listado]'});
		//cargar relacion de envio
		ShowDelay('Cargando relacion de envio');
		controladorListadoOrdenPagoEjercidoRemoto.cargarRelaciones('ENVIO', {
						callback:function(items) { 	
							$('#cborelacion').attr('disabled', false);
						 	dwr.util.addOptions('cborelacion',items,"ID_RELACION", "DESCRIPCION" );
							$('#cmdnueva').attr('disabled', false);
							_closeDelay();
					 } 					   				
					 ,
					 errorHandler:function(errorString, exception) { 
						swal("Fallo la operacion 10:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");          
					 }
		});
		$('#cborelacion').val(0);
		$('#cmdagregar').attr('disabled', false);
	}
	else{
		dwr.util.removeAllOptions('cborelacion');
		dwr.util.addOptions('cborelacion',{ 0:'[Seleccione un listado]'});
		ShowDelay('Cargando relacion de envio');
		controladorListadoOrdenPagoEjercidoRemoto.cargarRelaciones('ENVIO', {
						callback:function(items) { 	
							$('#cborelacion').attr('disabled', false);
						 	dwr.util.addOptions('cborelacion',items,"ID_RELACION", "DESCRIPCION" );
							$('#cmdnueva').attr('disabled', false);
							_closeDelay();
							$('#cborelacion').val(id);
							cargarRelacion();
					 } 					   				
					 ,
					 errorHandler:function(errorString, exception) { 
						 swal("Fallo la operacion 11:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");          
					 }
		});
		$('#cmdagregar').attr('disabled', false);
	}
}
//muestra los detalles de partidas de la orden de pago
//function mostrarDetallesOP(cve_op){
	//jWindow('<iframe width="750" height="500" name="consultaOP" id="consultaOP" frameborder="0" src="../../sam/consultas/muestra_detalles_Op.action?cve_op='+cve_op+'"></iframe>','Detalles de Orden de Pago', '','Cerrar ',1);
//}

//Funcion para rellenar con ceros

function pad (str, max) {
	  str = str.toString();
	  return str.length < max ? pad("0" + str, max) : str;
	}

function mostrarDetallesOP(cve_op){
	//jWindow('',', '','Cerrar',1);
	var num_op = pad(cve_op, 6);
	swal({
		  title: ''+num_op,
		  text: 'Detalles de Orden de Pago',
		  html:
			  '<iframe width="750" height="500" name="consultaOP" id="consultaOP" frameborder="0" src="../../sam/consultas/muestra_detalles_Op.action?cve_op='+cve_op+'"></iframe>',
		  width: 800,
		  padding: 10,
		  confirmButtonText: 'Cerrar',
		  animation: false
		})
}




//Metodo para ejercer las ordenes de pago 
function ejercerOP()
{
	var now = new Date();
	var checkClaves = [];

	//Lista de Ordenes de pago a Ejercer
    $('input[id=chkOP]:checked').each(function() {checkClaves.push($(this).val());});	
          
    if (checkClaves.length>0){
    	
    	swal({
      		title: 'Confirma que desee ejercer la(s) op(s)!! ',
      		html:'<div class="row">OPS '+ checkClaves +' </div></br>'+ 
		    '<label for="fecha_relacion" class="control-label">Fecha de ejercido:</label>' +
		    '<div class="row">' +
		   	'<div class="col-sm-6">'+ 
    			'<div class="input-group date" id="fechas" style="width:150px" value=""> ' +
    				'<input type="text" id="fecha_eje" name="fecha_eje" class="form-control datos" value="" />	 ' +
    				'<span class="input-group-addon"> ' +
    					'<span class="glyphicon-calendar glyphicon"></span> ' +
    				'</span> ' +
    			'</div>' +
    		'</div>' +
    		'</div>', 
      		allowOutsideClick: false,
      		allowEscapeKey: false, 
      		showConfirmButton: true,
      		customClass: 'swal2-overflow',
      		showCancelButton: true,
      		confirmButtonText:'Ejercer',
      		onOpen:()=> {
        		swal.showLoading();
        		setTimeout(() => { 
        			swal.hideLoading()
        			$('#fechas').datetimepicker({
    		    		format: 'DD/MM/YYYY',
    		    		defaultDate: new Date(),
    		    		widgetPositioning: {
    		    	        vertical: 'auto',
    		    	        horizontal: 'auto'
    		    	    }
    		     	});
        		
        		},5000);
        		
      			}
    	}).then((result) => {
    			fecha_nueva = $('#fecha_eje').val();
    			if (!result.dismiss) {
    				  controladorListadoOrdenPagoEjercidoRemoto.ejercerOrdenPago(checkClaves, fecha_nueva, {
	  		        	  callback:function(items) {  
	  		        		  swal.showLoading();
	  		        		  buscarOpMes(); 
	  		        		  
	  		        	  },
	  		           	  errorHandler:function(errorString, exception) {
	  		           		swal({text:errorString, type:'error', showConfirmButton: false/*, timer:5000*/});
	  		           	    demo_option=0;
	  		           	  }
    				  });
    				  
    				swal({
    					title:'Proceso cocluido con exito!!',
    					showConfirmButton: false,
    					type:"success",
    						onOpen:()=> {
    			        		swal.showLoading();
    			        		setTimeout(() => {swal.hideLoading()},5000);
    			        		
    			        	}
    						
    				});
    				demo_option=1;
	        		
    				
    			}else if (result.dismiss === 'cancel') {
    				swal({title:'Proceso abortado con exito!!',showConfirmButton: false,timer:3000,type:"info"});
    			}
    	})
    	
	 }//Cierra debe seleccionar al menos una op para ejercer...
	 else 
	    swal('','Es necesario que seleccione por lo menos una Orden de Pago para realizar esta acción', 'warning');
}


//funcion para cambiar la fecha de la orden de pago
function cambiarFecha(){
	var checkClaves = [];
     $('input[name=chkOP]:checked').each(function(){checkClaves.push($(this).val());});	
	 if(checkClaves.length<1) {jAlert('Seleccione por lo menos una Orden de Pago del listado','Advertencia'); return false;}
	var html = '<table width="350" border="0" cellspacing="0" cellpadding="0">' +
				  '<tr>'+
					'<td height="20" width="150">Formato de fecha:</td>'+
					'<td width="200">dd/mm/aaaa</td>'+
				  '</tr>'+
				  '<tr>'+
					'<td height="20">Fecha Nueva:</td>'+
					'<td><input type="text" id="txtfechanueva" value="" style="width:100px" /></td>'+
				  '</tr>'+
				  '<tr>'+
					'<td height="50" align="center" colspan="2"><input type="button" value="Cambiar fecha" id="cmdcambiarfecha" class="botones"/>&nbsp;<input type="button" value="Cancelar" id="cmdcancelar" class="botones"/></td>'+
				  '</tr>'+
				'</table>';
	jWindow(html,'Cambiar fecha en Ordenes de Pago', '','',0);
	$('#cmdcambiarfecha').click(function(event){cambiarFechaOP();})
	$('#cmdcancelar').click(function(event){cve_op=0;$.alerts._hide();})
	$('#txtfechanueva').keypress(function(event){if (event.keyCode == '13'){$('#cmdcambiarfecha').click();}});
}

function cambiarFechaOP(){
	 var checkClaves = [];
     $('input[name=chkOP]:checked').each(function(){checkClaves.push($(this).val());});	
	 
	var fechatemp = $('#txtfechanueva').attr('value');
	if(checkClaves.length<1) {jAlert('Seleccione por lo menos una Orden de Pago del listado','Advertencia'); return false;}
	if($('#txtfechanueva').attr('value')==''){jAlert('La fecha escrita no es v�lida', 'Advertencia', function(){cambiarFecha(fecha)}); return false;}
	jConfirm('Confirma que desea cambiar la fecha y periodo de las Ordenes de Pago?','Cambiar fecha y periodo', function(r){
			if(r){
					ShowDelay('Cambiando fecha de Ordenes de Pago','');
					controladorListadoOrdenPagoEjercidoRemoto.cambiarFechaOrdenPago(checkClaves, fechatemp, {
						callback:function(items) { 
							if(items)
						 		CloseDelay('Fecha cambiada con exito a: '+fechatemp, 2000, function (){cve_op =0;setTimeout('buscarOpMes()',1000);});
							else 
								swal('No se pudo cambiar la fecha de las Ordenes de Pago, puede que la fecha especificada no sea una fecha v�lida, verifique nuevamente','error');  
					 } 					   				
					 ,
					 errorHandler:function(errorString, exception) { 
						 swal("Fallo la operacion 12:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");          
					 }
				    });
			}
	});
}


/*
function mostrarOpcionPDF(cve_op){
	var html = '<table class="listas" border="0" align="center" cellpadding="1" cellspacing="2" width="405" >'+
				'  <tr id="x1" onmouseover="color_over(\'x1\')" onmouseout="color_out(\'x1\')"> '+
				'	<td width="33" height="27" align="center" style="cursor:pointer" onclick="getReporteOP('+cve_op+')"> '+
				'	  <img src="../../imagenes/pdf.gif"/></td>' +
				'	<td width="362" height="27" align="left" style="cursor:pointer" onclick="getReporteOP('+cve_op+')">&nbsp;Reporte Normal Orden de Pago</td> '+
				'  </tr> '+
				
				'  <tr id="x2" onmouseover="color_over(\'x2\')" onmouseout="color_out(\'x2\')" onclick=""> '+
				'	  <td height="27" align="center"  style="cursor:pointer" onclick="getAnexosListaOP('+cve_op+')"><img src="../../imagenes/report.png" /></td> '+
				'	  <td height="27" align="left" style="cursor:pointer" onclick="getAnexosListaOP('+cve_op+')">&nbsp;Listar Anexos de Orden de Pago</td> '+
				'	</tr> ';
			html+='</table>';
	jWindow(html,'Opciones de Reporte Orden de Pago', '','Cerrar',1);
}
*/

function mostrarOpcionPDF(cve_op){
	//jWindow('',', '','Cerrar',1);
	var num_op = pad(cve_op, 6);
	swal({
		  title: ''+num_op,
		  text: 'Opciones de Reporte Orden de Pago',
		  html:
			  '<table class="listas" border="0" align="center" cellpadding="1" cellspacing="2" width="405" >'+
				'  <tr id="x1" onmouseover="color_over(\'x1\')" onmouseout="color_out(\'x1\')"> '+
				'	<td width="33" height="27" align="center" style="cursor:pointer" onclick="getReporteOP('+cve_op+')"> '+
				'	  <img src="../../imagenes/pdf.gif"/></td>' +
				'	<td width="362" height="27" align="left" style="cursor:pointer" onclick="getReporteOP('+cve_op+')">&nbsp;Reporte Normal Orden de Pago</td> '+
				'  </tr> '+
				
				'  <tr id="x2" onmouseover="color_over(\'x2\')" onmouseout="color_out(\'x2\')" onclick=""> '+
				'	  <td height="27" align="center"  style="cursor:pointer" onclick="getAnexosListaOP('+cve_op+')"><img src="../../imagenes/report.png" /></td> '+
				'	  <td height="27" align="left" style="cursor:pointer" onclick="getAnexosListaOP('+cve_op+')">&nbsp;Listar Anexos de Orden de Pago</td> '+
				'	</tr> ' +
				'</table>',
		  width: 800,
		  padding: 10,
		  confirmButtonText: 'Cerrar',
		  animation: false
		})
}


/*
function getAnexosListaOP(cve_op){
	jWindow('<iframe width="750" height="350" name="ventanaArchivosOP" id="ventanaArchivosOP" frameborder="0" src="../../sam/consultas/muestra_anexosOP.action?cve_op='+cve_op+'"></iframe>','Listado de Anexos de OP: '+cve_op, '','Cerrar',1);
}
*/

function getAnexosListaOP(cve_op){
	//jWindow('',', '','Cerrar',1);
	var num_op = pad(cve_op, 6);
	swal({
		  title: ''+num_op,
		  text: 'Listado de Anexos de OP',
		  html:
			  '<iframe width="750" height="350" name="ventanaArchivosOP" id="ventanaArchivosOP" frameborder="0" src="../../sam/consultas/muestra_anexosOP.action?cve_op='+cve_op+'"></iframe>',
		  width: 750,
		  confirmButtonText: 'Cerrar',
		  padding: 10,
		  animation: false
		})
}


function getReporteOP(clave) {
	$('#cve_op').attr('value',clave);
	$('#forma').attr('action',"../reportes/formato_orden_pago.action");
	$('#forma').attr('target',"impresion");
	$('#forma').submit();
}