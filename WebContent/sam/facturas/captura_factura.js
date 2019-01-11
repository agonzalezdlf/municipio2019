/*
Autor: ISC. Israel de la Cruz Hernandez & ISC. Abraham Gonzalez
Version: 2.0
Date: 17-05-2018
Update: 
*/

var entraVale =0;
var cerrar = false; 
var cont;
var data;

$(document).ready(function(){
	
	var options = { 
        beforeSubmit:  showRequest,  
        success:       showResponse, 
        url:       '_subirArchivo.action?CVE_FACTURA='+$('#CVE_FACTURA').val(),
        type:      'post', 
        dataType:  'json'
    }; 
	
	$('#frmEntrada').submit(function(){
		$(this).ajaxSubmit(options);
		return false;
	});
	
	$('#txtfecha').datetimepicker({
		format: 'DD/MM/YYYY'
	});
	
	
	$('#cbotipodocumento').on('change',function(event){//El metodo on asigna uno o mas controladores de eventos para los elementos seleccionados.
		
		tipoFacturas();
		
		$('#cboSearch').selectpicker('val',0);
		$('#cboSearch').selectpicker('refresh');
		
	});
	
	$('#div_benaficiarioFijo').hide();
	
	/*Carga el documento para edicion desde el listado de facturas*/
	 if($('#CVE_FACTURA').val()==0){
		 tipoFacturas();
		 mostrarDetalles($('#CVE_FACTURA').val());//Carga todos los datos de las factura..
	 } 
	 
	 $('#cmdcerrar').addClass("btn_disable");
	 
	 $('#cmdNuevaRetencion').on('click',function(event){
		 limpiarRetenciones();
	 });
	 
	 $('#cmdGuardarRetencion').on('click',function(event){
		 guardarRetencion();
	 });
	 
	 $('#cmdguardar').on('click',function(event){
		 guardarFactura();
	 });
	 
	 $('#cmdguardar2').on('click',function(event){
		 guardarFactura();
	 });
	 
	 $('#cmdagregar').on('click',function(event){
		 guardarDetalle();
	 }); 
		
	 $('#img_detele').on('click',function(event){
		   deleteDocumento();
		   event.preventDefault();
		   return false;
	   });
		 
	 $('#cmdnuevo').on('click',function(event){
		 document.location='captura_factura.action';
	 }); 	 
	
	 $('#cmdcerrar').on('click',function(event){
		 cerrarDocumento();
	 }); 
		 
	 //Muestra el documento a devengar segun sea su tipo; desde toolSam.js 
	   $('#img_movimiento').on('click',function(){
		   muestraTiposDocumento();//Funcion llamada atravez toolsam
		   return false;
	   });
	 
		   
	 $('#cboproyectopartida').change(function (event) {obtenerProyectoPartida();});
	 $('#cboproyectopartida').change(function (event) {obtenerProyectoPartida();});
	 	
	 $('#cmdnuevoconcepto').click(function (event){limpiarDetalles();});
	 $('#txtproyecto').blur(function(event){__getPresupuesto($('#ID_PROYECTO').val(),$('#txtproyecto').val(),$('#txtpartida').val(), $('#cbomes').val(),'txtpresupuesto','txtdisponible','');});
	 $('#txtpartida').focus(function(event){__getPresupuesto($('#ID_PROYECTO').val(), $('#txtproyecto').val(),$('#txtpartida').val(), $('#cbomes').val(),'txtpresupuesto','txtdisponible','');});
	 $('#img_presupuesto').click(function(event){muestraPresupuesto();});
	 

	 //$('#tr_file').hide();
	 
		 
	getMesRequisicion($('#cbomes').val());
	
	$('#cbomes').attr('disabled', 'disabled');
	
	/*Deshabilitar los divs*/
	/*$('#tr_Programa').hide();
	$('#tr_PresupuestoLibre').hide();
	$('#ndocumento').hide();
	$('#nentrada').hide();*/
	
	
	//Entra aqui cuando se esta editando una factura
	if($('#CVE_FACTURA')!= null && $('#CVE_FACTURA')!=0)
	{
		mostrarDetallesArchivos();
		llenarTablaDeRetenciones();
		//tipoFacturasDeductivas();
		llenarTablaDeVales();
		mostrarDetalles();
		
	}
	
	
});

function onLoad(){
	cont = document.getElementById("cont");
	data = new Array();
} 

function test(){
	
	var request = new requestAjax();
	
	request.onreadystatechange = function(){
		
		if(request.readyState == 4 && request.readyState == 200){
			
			if (request.responseXML != null){
				data[0] = request.responseXML.getElementsByTagName("UUID").item(0);
				data[1] = request.responseXML.getElementsByTagName("rfc").item(0);
				data[2] = request.responseXML.getElementsByTagName("UUID").item(0);
				cont.innerHTML += "UUID" +data[0].firstChild.nodeValue+"</br>";
			}
		}
	}
	request.open ("GET","ruta del xml",true);
	request.send();
}

function requestAjax(){
	
	try{
		var request = new XMLHttpRequest();
	}catch(error1){
		
		try {
			var request = new ActiveXObject("Msxm12.XMLHTTP");
		} catch(error2){
			try{
				var request =  new ActiveXObject("Msxm.XMLHTTP");
			}catch(error3){
				var request = false;
			}
		}
	}
	return request;
}


//Lee el nombre del archivo que se sube 
function getUrl(){
	  var url = document.getElementById('inputFile').files[0].name;
	  alert(url);
}

function tipoFacturas(){
		
	var tipofactura = $('#cbotipodocumento').selectpicker('val');//Combo del tipo del documento
	var tipo = $('#cbotipoFactura').selectpicker('val');
	
	$('#tr_NumDocumento').show();
	$('#trEntrada').show();
	$('#tr_TotalDocumento').show();
	$('#div_benaficiario').hide();
	$('#tr_PresupuestoLibre').show();
	$('#tr_ProyectoPartida').show();
	$('#tr_ProgramaPartidaPresupuesto').hide();
	$('#div_benaficiarioFijo').hide();
	$('#div_beneficiario').show();
	
	/*Retorna si vale cero*/
	if(tipofactura=='0') return false;
	
	/*Retorna si vale cero*/
	if($('#TOTAL_CONCEPTOS').val()>'1'){
		alert('Total de detalles: ' +$('#TOTAL_CONCEPTOS').val());
		$('#cbotipodocumento').prop('disabled', true);
		
		swal('','No se puede cambiar el tipo de documento, debe eliminar el detalle primero','error');
		return false;
	}
	
	
	switch(tipofactura){
	
		case '4': //Para OS u OT
				
				$('#cbo_ProyectoPartida').show();
				$('#input_ProgramaPartidaPresupuesto').show();
				$('#ndocumento').show();
				$('#nentrada').show();
				break;
		
		case '3': /*Para PEDIDOS*/
				
				$('#cbo_ProyectoPartida').show();
				$('#input_ProgramaPartidaPresupuesto').show();
				$('#ndocumento').show();
				$('#nentrada').show();
				break;
				
		case '3': //NOMINA
			
			break;
			
		case '6': //Para CONTRATOS
			
			$('#cbo_ProyectoPartida').show();
			$('#input_ProgramaPartidaPresupuesto').show();
			$('#ndocumento').show();
			$('#nentrada').show();
			break;
			
		case '1': //NOMINAS
			
			$('#div_benaficiarioFijo').show();
			$('#div_beneficiario').show();
			$('#cbo_ProyectoPartida').show();
			$('#input_ProgramaPartidaPresupuesto').show();
			$('#ndocumento').show();
			$('#nentrada').show();
			break;
		//muestraContratosaDevengar
	}
}

function tipoFacturasDeductivas()
{
	
	var tipo = $('#cbotipoFactura').val();
	$('#tr_NumDocumento').show();
	$('#trEntrada').show();
	$('#tr_TotalDocumento').show();
	//$('#tr_Programa').show();
	//$('#tr_partida').show();
	$('#div_benaficiario').show();
	$('#tr_PresupuestoLibre').show();
	$('#tr_ProyectoPartida').show();
	$('#tr_ProgramaPartidaPresupuesto').hide();
	$('#div_benaficiarioFijo').show();
	$('#div_beneficiario').show();
	
	switch(tipo){
		case "1"://NOMINA
			
			$('#tabuladores').tabs('enable',1);
			$('#tabuladores').tabs('enable',2);
			$('#div_benaficiario').show();
			//$('#tabuladores').tabs('enable',2);;
			$('#tr_NumDocumento').hide();
			$('#trEntrada').hide();
			$('#tr_TotalDocumento').hide();
			$('#tr_Programa').hide();
			$('#tr_partida').hide();
			$('#tr_PresupuestoLibre').hide();
			$('#tr_ProyectoPartida').hide();
			$('#tr_ProgramaPartidaPresupuesto').show();
			$('#div_benaficiarioFijo').show();
			$('#div_beneficiario').hide();
		case "2"://OBRAS
			
			$('#tabuladores').tabs('enable',1);
			$('#tabuladores').tabs('enable',2);
			$('#tabuladores').tabs('enable',3);
			break;
		case "3"://PEDIDO
			alert('Entro a facturas deductivas tipo 3');
			$('#tabuladores').tabs('enable',1);
			$('#tabuladores').tabs('enable',2);
			$('#tabuladores').tabs('enable',3);
			break;
		case "4"://OT/OS
			
			$('#tabuladores').tabs('enable',1);
			$('#tabuladores').tabs('enable',2);
			$('#tabuladores').tabs('enable',3);
			break;
		case "6"://CONTRATO
			
			$('#tabuladores').tabs('enable',1);
			$('#tabuladores').tabs('enable',2);
			$('#tabuladores').tabs('enable',3);
			break;
		case "7"://HONORARIOS
			
			$('#tabuladores').tabs('enable',1);
			$('#tabuladores').tabs('enable',2);
			$('#tabuladores').tabs('enable',3);
			break;
		case "8"://ARRENDAMIENTOS
			
			$('#tabuladores').tabs('enable',1);
			$('#tabuladores').tabs('enable',2);
			$('#tabuladores').tabs('enable',3);
			break;
		case "9"://FONDO FIJO
			
			$('#tabuladores').tabs('enable',1);
			$('#tabuladores').tabs('enable',2);
			$('#tabuladores').tabs('enable',3);
			
			break;
		case "10"://CON RETENCION
			
			$('#tabuladores').tabs('enable',1);
			$('#tabuladores').tabs('enable',2);
			$('#tabuladores').tabs('enable',3);
			
			break;	
		default: 
			$('#tabuladores').tabs('option', 'disabled', [1,2,3]);
			break;
	}
}

/****************Para ocultar un boton cerrar si no exista movimientos en el detalle de la tabla maestra****************************/
function mostrarcerrar(){
	cmdcerrar.style.display = '';
}

function tabladetalles(){
	
	var numFilas=0;
	var numFilas = $('#listaDetalles > tbody > tr').length;
			
	if (numFilas< 1){

				//cmdcerrar.style.visibility  = 'visible'; 
				$('#cmdcerrar').removeClass("btn_disable");
	}else
		{
			//cmdcerrar.style.display = 'none'; // No ocupa espacio hidden
			$('#cmdcerrar').addClass("btn_disable");	
		}
}


function obtenerProyectoPartida()
{
	var arreglo = $('#cboproyectopartida').val().split(',');
	$('#ID_PROYECTO').val(arreglo[0]);
	$('#txtproyecto').val(arreglo[1]);
	$('#txtpartida').val(arreglo[2]);
	
	__getPresupuesto($('#ID_PROYECTO').val(),arreglo[1],arreglo[2], $('#cbomes').val(),  'txtpresupuesto','txtdisponible','');
	
}

/*Metodo para obtener el mes de la requsicion*/
function getMesRequisicion(mes){
	if(mes==0){
		controladorFacturasRemoto.getMesActivo({
			callback:function(items){
				$('#cbomes').val(items);
			}
			,
			errorHandler:function(errorString, exception) { 
				swal('','Fallo la operacion:<br>Error::'+errorString+'-message::'+exception.message+'-JavaClass::'+exception.javaClassName+'.<br><strong>Consulte a su administrador</strong>');   
				return false;
			}
		});
	}
}

/*funcion para mostrar el listado del presupuesto*/
function muestraPresupuesto(){
	
	if($('#txtproyecto').val()==''||$('#txtpartida').val()=='')
		$('#ID_PROYECTO').val('0');
		$('#CLV_PARTID').val('0');
		
		
	var idUnidad = $('#cbUnidad2').selectpicker('val');
	alert('La unidad a filtrat es: ' +idUnidad);
	if(idUnidad==null||idUnidad=="") idUnidad =0;
	
	if($('#cbomes').val()==0) {swal('','Seleccione un periodo presupuestal válido','warning'); return false;}

	__listadoPresupuesto($('#ID_PROYECTO').val(),$('#txtproyecto').val(),$('#txtpartida').val(), $('#cbomes').val(), 0, idUnidad);
}

 function eliminarVales(){
	  var checkVales = [];
     $('input[name=chkVale]:checked').each(function() { checkVales.push($(this).val());	 });	 
	 if (checkVales.length > 0 ) {
   	 var idOrden=$('#id_orden').val();
   	 
   	swal({
   	  title: '¿Eliminando la comprobación de Vale?',
   	  onOpen: function () {
   	    swal.showLoading()
   	    // AJAX request simulated with setTimeout
   	    setTimeout(function () {
   	    	controladorFacturasRemoto.eliminarVales(checkVales, {
				callback:function(items) {	
					llenarTablaDeVales();
				   CloseDelay("Registros eliminados con éxito");
				   
				} 					   				
				,
				errorHandler:function(errorString, exception) { 
					swal('eliminarVales',errorString, 'error');
				}
			},async=false ); 
   	      swal.close()
   	    }, 2000)
   	  }
   	})
	 /*jConfirm('¿Confirma que desea aliminar la comprobación de Vale?', 'Eliminar Vale', function(r){
		 		ShowDelay('Eliminando vale(s)','');
				controladorFacturasRemoto.eliminarVales(checkVales, {
				callback:function(items) {	
					llenarTablaDeVales();
				   CloseDelay("Registros eliminados con éxito");
				   
				} 					   				
				,
				errorHandler:function(errorString, exception) { 
					jError(errorString, 'Error');
				}
			},async=false ); 
		 });*/
     
	 } else 
	    jAlert('Es necesario que seleccione un elemento de la lista', 'Advertencia');
 }
 
 function guardarDetalle()
 {
	
	if($('#ID_PROYECTO').val()==''||$('#ID_PROYECTO').val()=='0') {swal('El programa escrito no es valido'); return false;}
	if($('#txtpartida').val()=='') {swal('La partida escrita no es valida'); return false;}
	if($('#txtimporteDet').val()=='') {swal('','Es necesario especificar un importe', 'warning'); return false;}
	 
	swal({
			  title: 'Es seguro?',
			  text: '¿Confirma que desea agregar el movimiento?',
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonText: 'Sí, guardar!',
			  cancelButtonText: 'No, abortar!',
			  timer: 4000,
			  showLoaderOnConfirm: true,
			  preConfirm: function(email) {
				    return new Promise(function(resolve, reject) {
				      setTimeout(function() {
				          resolve();
				          controladorFacturasRemoto.agregarMovimiento($('#CVE_FACTURA').val(), $('#ID_PROYECTO').val(), $('#txtpartida').val(), $('#txtimporteDet').val(), $('#txtdetalle').val(), {
								callback:function(items) {
									
									setTimeout(function(){
									    swal('','Movimiento agregado con éxito','');
									    llenarTablaDeVales();
										limpiarDetalles();
										mostrarDetalles();
									  }, 2000);
								} 					   				
								,
								errorHandler:function(errorString, exception) { 
									swal('',"Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador",'error');          
								}
							});  //termina el llamado al controlador
				        }
				      , 2000);
				    });
				  },
				  allowOutsideClick: false
				
			}).then((result) => {
				  if (result.value  ) {
				  } else if (result.dismiss === swal.DismissReason.cancel) {
				 		swal('Cancelado','Proceso cancelado','error')
				  }
			});
 }	     
    

 
 function mostrarDetalles()
 {
	controladorFacturasRemoto.getDetallesFactura($('#CVE_FACTURA').val(), {
		callback:function(items) { 
			if(items.length>0) {
				cerrar = true;
				tabladetalles();
				$('#cmdcerrar').removeClass("btn_disable");
				$('#cmdcerrar').prop('disabled', false);
			}else{
				cerrar = false;
				$('#cmdcerrar').prop('disabled', true);
			}
			quitRow("listaDetalles");
			$('#TOTAL_CONCEPTOS').val(0);
			var total = 0;
			tipoFacturas();
			dwr.util.removeAllOptions("cboproyectocuenta");
			dwr.util.addOptions('cboproyectocuenta',{ 0:'Seleccione' });
			lipiarVale();
			jQuery.each(items,function(i) {
				var htmlCheck = "<input type='checkbox' name='chkdetalle' id='chkdetalle' value='"+this.ID_PROYECTO+"-"+this.CLV_PARTID+"'>";
				total += this.IMPORTE;
				//Total de lotes en la tabla de detalles...........................................
				$('#TOTAL_CONCEPTOS').val((parseInt($('#TOTAL_CONCEPTOS').val())+1)); 
				var Conceptos= ($('#TOTAL_CONCEPTOS').val());
				appendNewRow('listaDetalles', 
						[Td('', centro , '', htmlCheck),
						 Td('', izquierda , '', this.DEPENDENCIA),
						 Td('', izquierda  , '', getHTML(this.NOTAS)),
						 Td('', centro  , '', this.N_PROGRAMA),
						 Td('', centro  , '', this.CLV_PARTID),
						 Td('', derecha , '', formatNumber(this.IMPORTE, '$')+"&nbsp;"),
				 		 Td('', derecha , '', '')
						 
				]);
				dwr.util.addOptions('cboproyectocuenta',[{ID_PROYECTO:this.ID_PROYECTO, PROYECTOPARTIDA:this.N_PROGRAMA+" - "+ this.CLV_PARTID}],"ID_PROYECTO", "PROYECTOPARTIDA" );		
			}); 
			
			$('#div_total').html(formatNumber(total, '$')+"&nbsp;");
        },
        errorHandler:function(errorString, exception) { 
			swal('',errorString, 'error');
        }
    });
 }
 
 function eliminarDetalles()
 {
	 var checkDetalles = [];
     $('input[name=chkdetalle]:checked').each(function() {checkDetalles.push($(this).val()); });	 
     

    		 if (checkDetalles.length>0){
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
    					          controladorFacturasRemoto.eliminarDetalles($('#CVE_FACTURA').val(), checkDetalles, {
    									callback:function(items) {
    										
    										setTimeout(function(){
    										    swal("Lotes eliminados con éxito!");
    										    if (items< 1){
    												$('#cmdcerrar').addClass("btn_disable");
    					        				}
    											mostrarDetalles();
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
    			 
    					
    		 }
    		  else 
    		    swal('','Es necesario que seleccione por lo menos un lote del listado', 'warning');
    			
    	
     
     /*
	 if (checkDetalles.length > 0 ) {
		 jConfirm('¿Confirma que desea eliminar los movimientos?','Eliminar movimiento', function(r){
			 if(r){
				 controladorFacturasRemoto.eliminarDetalles($('#CVE_FACTURA').val(), checkDetalles, {
        			callback:function(items) { 
        				if (items< 1){
							$('#cmdcerrar').addClass("btn_disable");
        				}
						mostrarDetalles();
					},
					errorHandler:function(errorString, exception) { 
						jError(errorString, 'Error');
					}
				});
			 }
		 });
	 }*/
 }
 
 function limpiarDetalles(){
	$('#txtproyecto').val('');
	$('#txtpartida').val('');
	$('#ID_PROYECTO').val('0');
	$('#ID_DETALLE').val('0');
	$('#txtdetalle').val('');
	$('#txtimporteDet').val('');
	$('#txtpresupuesto').val('');
	$('#txtdisponible').val('');
}

 function llenarTablaDeVales() {
	 quitRow("listasVales");
	 controladorFacturasRemoto.getListaVales($('#CVE_FACTURA').val(), {
        callback:function(items) { 	
     
        	jQuery.each(items,function(i) {
        		pintaVales( "listasVales", i+1,this.ID_PROYECTO,this.N_PROGRAMA,this.CLV_PARTID,this.CVE_VALE,this.NUM_VALE,this.IMPORTE, this.ID_MOVIMIENTO);
        	});
        },
        errorHandler:function(errorString, exception) { 
        	swal('llenarTablaDeVales',"Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador",'error');          
        }
    },async=false ); 
 }
 
  function pintaVales( table, consecutivo,idproyecto, proyecto,partida,vale,numeroVale,importe, idMovVale){
 	var tabla = document.getElementById( table ).tBodies[0];
 	var row =   document.createElement( "TR" );  
    var htmlEdit = "<img src=\"../../imagenes/page_white_edit.png\" style='cursor: pointer;' alt=\"Editar registro\" width=\"16\" height=\"16\" border=\"0\" onClick='editarVale("+idMovVale+","+vale+","+importe+",\""+proyecto+"-"+partida+"\")' >"; 	
    var htmlCheck = "<input type='checkbox' name='chkVale' id='chkVale' value='"+idMovVale+"' >";
	row.appendChild( Td("",centro,"",htmlCheck));
	row.appendChild( Td(proyecto,centro));
	row.appendChild( Td(partida,centro));
	row.appendChild( Td(numeroVale,centro));
	row.appendChild( Td(formatNumber(importe,"$"),derecha) );
	row.appendChild( Td("",centro,"",htmlEdit) );
	tabla.appendChild(row);
 }
 
 function editarVale(idVale,cve_vale,importe,proyectoCuenta){
	 swal({
		  title: 'En modificación',
		  text: 'No se permite editar, elimine el movimiento y capture de nuevo',
		  timer: 5000,
		  onOpen: function () {
		    swal.showLoading()
		  }
		}).then(
		  function () {},
		  // handling the promise rejection
		  function (dismiss) {
		    if (dismiss === 'timer') {
		      console.log('I was closed by the timer')
		    }
		  }
		)
		
 } 
 
 
 //Funcion que carga la comprobacion de vales....
 function cargarVales(cve_vale) {
     
     
     if ($('#cboproyectocuenta').val()!=0) {
    	 
    	 var x = document.getElementById("cboproyectocuenta").value;
    	 document.getElementById("demo").innerHTML = "You selected: " + x;
    	 
    	 dwr.util.removeAllOptions("cboVales");
    	 
    	 var datos= $('#cboproyectocuenta :selected').text().split('-');
		 var proyecto = $('#cboproyectocuenta').val();//datos[0];
		 var partida = jQuery.trim(datos[1]);
		 var idDependencia = $('#cbUnidad').val();
		 
		 console.log('Datos enviados en la clase: ' +datos + ' ', proyecto + ' ', partida + ' ' , idDependencia);
		 
		 controladorFacturasRemoto.getValesDisponibles(idDependencia, proyecto, jQuery.trim(partida), {
			 callback:function(items) { 
					dwr.util.addOptions('cboVales',{ 0:'[Seleccione]'});
					dwr.util.addOptions('cboVales',items,"CVE_VALE", "DATOVALE");
					$('#cboVales').val(cve_vale);
			 },errorHandler:function(errorString, exception) { 
					swal('cargarVales',errorString, "error");          
			 }
		},async=false ); 
	} 
 }

function guardarVale(){
	
	var error="";  
	if ($('#CVE_FACTURA').val()=='' || $('#CVE_FACTURA').val()==0){swal('','No se puede guardar el Vale hasta que guarde la factura','error'); return false;}
    if ($('#cboproyectocuenta').val()==0) {swal('','El Proyecto/Cuenta  de Vale no es válido','error'); return false;}
    if ($('#cboVales').val()==""||$('#cboVales').val()==0) {swal('','El Vale no es válido','error'); return false;}
    if ($('#txtimporteVale').val()=="" || parseFloat($('#txtimporteVale').val()==0)) {swal('','El importe escrito para la comprobación de Vale no es válido','error'); return false;}
	
    var temp = $('#cboVales :selected').text().replace(',','');
    
	temp = temp.replace('$',''); //000026 > 514512.32
	temp = temp.replace(' ',''); //000026> 514512.32
	
	var datos= temp.split('>');	 //000026, 514512.32
	
	
	var textImporteDisponible = parseFloat((datos[1]).replace(',',''));
	console.log(textImporteDisponible);
	
	var imp_anterior = parseFloat($('#importeAntVale').val());
	console.log(imp_anterior);
	
	var imp_vale = parseFloat($('#importeVale').val());
	console.log(imp_vale);
	
	var imp_total_disp_vale = parseFloat(textImporteDisponible+imp_anterior);
	console.log(imp_total_disp_vale);
	
	if (imp_vale>(imp_total_disp_vale)) {swal('El importe de comprobación para el Vale no puede ser mayor al disponible actual del Vale'); return false;}
	
    datos= $('#cboproyectocuenta :selected').text().split('-');	 
	var proyecto = jQuery.trim($('#cboproyectocuenta').val());
	var clv_partid = jQuery.trim(datos[1]);	 	 
	datosVale = $('#cboVales :selected').text().split('>');

	var cve_vale = parseInt(jQuery.trim(datosVale[0]));
	var cve_factura = jQuery.trim($('#CVE_FACTURA').val());
	var importe = $('#txtimporteVale').val();
	var idMovVale = $('#idVale').val();
	  
	controladorFacturasRemoto.guardarComprobacionVale(idMovVale, cve_factura, cve_vale, proyecto, clv_partid, importe, {
			  callback:function(items){
				  lipiarVale();
				  CloseDelay("Comprobacion de Vale agregada con exito");  
				  llenarTablaDeVales();
							 
		} 					   				
		,
			errorHandler:function(errorString, exception) { 
				swal('',errorString,'error');   
			}
	});	
}

 function lipiarVale(){
	$('#idVale').attr('value',0);
	$('#CVE_VALE').attr('value',0);
	$('#txtimporteVale').attr('value',"");	
	$('#cboproyectocuenta').val(0);
	dwr.util.removeAllOptions("cboVales");	 
 }
 
function getProyectosPartidasVales(datos) {	
	alert ('Entro al getProyectosPartidasVales');
        lipiarVale();
		dwr.util.addOptions('cboproyectocuenta',{ 0:'Seleccione'});
		dwr.util.addOptions('cboproyectocuenta',datos,"ID_PROYECTO", "PROYECTOPARTIDA");
 }
 
 function getProyectosPartidasDetalles(datos){
	 	//dwr.util.removeAllOptions("cboproyectopartida");	
		//dwr.util.addOptions('cboproyectopartida',{ 0:'Seleccione'});
	 	alert ('Entro al getProyectosPartidasDetalles');
		dwr.util.addOptions('cboproyectopartida',datos,"ID_PROYECTO", "PROYECTOPARTIDA");
 }

 //Funcion que carga la información del Contrato a DEVENGAR.........
function getcontratoDocumento(num_contrato, cve_contrato, idRecurso, clv_benefi, proyecto, clv_partid, importe)
{
	$('#trEntrada').hide();
	$('#CVE_DOC').val(cve_contrato);
	$('#txtdocumento').val(num_contrato);

	$('#txttotal').val(formatNumber(importe).replace(',', ''));
	$('#div_total_entrada').html(formatNumber(importe, '$'));
	$('#CLV_BENEFI').val(clv_benefi);
	
	PresupuestoBeneficiarioContrato(clv_benefi,cve_contrato);
	
}
//Manda a cargar la informacion del beneficiario del documento a DEVENGAR
function PresupuestoBeneficiarioContrato(clv_benefi,cve_contrato)
{
	ShowDelay("Recuperando información presupuestal");
	$('#trEntrada').hide();
	//buscamos el beneficiario
	if(clv_benefi!=''){
		controladorFacturasRemoto.getBeneficiarioFactura('CON', cve_contrato, {
			  callback:function(items){
							$('#div_beneficiario').html(items);
							 
		} 					   				
		,
			errorHandler:function(errorString, exception) { 
				jError(errorString,'Error');   
			}
		});	
	}
	
	/*Cargamos el presupuesto
	controladorFacturasRemoto.getPresupuestoDocumento('CON', cve_contrato, {
			  callback:function(items){
				$('#div_programa').html(items.N_PROGRAMA + ' - '+ items.PROGRAMA);
				$('#div_partida').html(items.CLV_PARTID + ' - '+items.PARTIDA);
				quitRow('listaPresupuesto');
				//getProyectosPartidasVales([{ID_PROYECTO:items.ID_PROYECTO, PROYECTOPARTIDA:items.N_PROGRAMA+" - "+ items.CLV_PARTID}]);
				appendNewRow('listaPresupuesto', 
						[Td('', centro , '', items.MES),
						 Td('', derecha , '', '<div style ="height:20px">'+formatNumber(items.AUTORIZADO, '$')+'</div>'),
						 Td('', derecha  , '', ((items.PRECOMPROMETIDO>0) ? '<a href="javascript:mostrarConsultaCompromiso('+items.ID_PROYECTO+', \''+items.N_PROGRAMA+'\', \''+items.CLV_PARTID + '\', '+items.PERIODO+',\'PRECOMPROMETIDO\''+')">': '')+formatNumber(items.PRECOMPROMETIDO, '$')+'</a>'),
						 Td('', derecha  , '', ((items.COMPROMETIDO>0) ? '<a href="javascript:mostrarConsultaCompromiso('+items.ID_PROYECTO+', \''+items.N_PROGRAMA+'\', \''+items.CLV_PARTID + '\', '+items.PERIODO+',\'COMPROMETIDO\''+')">': '')+formatNumber(items.COMPROMETIDO, '$')+'</a>'),
						 Td('', derecha  , '', ((items.DEVENGADO>0) ? '<a href="javascript:mostrarConsultaCompromiso('+items.ID_PROYECTO+', \''+items.N_PROGRAMA+'\', \''+items.CLV_PARTID + '\', '+items.PERIODO+',\'DEVENGADO\''+')">': '')+formatNumber(items.DEVENGADO, '$')+'</a>'),
						 Td('', derecha , '', ((items.EJERCIDO>0) ? '<a href="javascript:mostrarConsultaCompromiso('+items.ID_PROYECTO+', \''+items.N_PROGRAMA+'\', \''+items.CLV_PARTID + '\', '+items.PERIODO+',\'EJERCIDO\''+')">': '')+formatNumber(items.EJERCIDO, '$')+'</a>'),
				 		 Td('', derecha , '', formatNumber(items.DISPONIBLE, '$')+"&nbsp;")
						 
				]);
		} 					   				
		,
			errorHandler:function(errorString, exception) { 
				jError(errorString,'Error');   
			}
		});	
		*/
		//mostrarDetallesArchivos();	
		_closeDelay();
}



 function editarRetencion (idRetencion,idTipoRetencion,importe) {
 	$('#idRetencion').attr('value',idRetencion);
	$('#retencion').val(idTipoRetencion);
	if (importe < 0 )
	  importe=importe*-1;
	$('#importeRetencion').attr('value',importe);
 } 
 
 
 function limpiarRetencion () {
 	$('#idRetencion').val('');
	$('#importeRetencion').val('');
 }
 
 function limpiarRetenciones(){
	$('#idRetencion').val('');
	$('#retencion').val(0);	
	$('#importeRetencion').val('');
	$('#retencion').focus();
}
 
 function llenarTablaDeRetenciones() {
	 quitRow("listasRetenciones");

	 controladorFacturasRemoto.getRetenciones($('#CVE_FACTURA').val(), {
        callback:function(items) { 		
		jQuery.each(items,function(i) {
 		    pintaRetenciones( "listasRetenciones", i+1,this.CONS,this.CLV_RETENC,this.RETENCION,this.IMPORTE);
        });
				  
        } 					   				
        ,
        errorHandler:function(errorString, exception) { 
			swal('llenarTablaDeRetenciones',errorString, 'error');
        }
    },async=false ); 

 }
 
   function pintaRetenciones( table, consecutivo,idRetencion,idTipoRetencion,retencion,importe){
 	var tabla = document.getElementById( table ).tBodies[0];
 	var row =   document.createElement( "TR" );    
    var htmlEdit = "<img src=\"../../imagenes/page_white_edit.png\" style='cursor: pointer;' alt=\"Editar registro\" width=\"16\" height=\"16\" border=\"0\" onClick='editarRetencion("+idRetencion+",\""+idTipoRetencion+"\","+importe+")' >"; 	
    var htmlCheck = "<input type='checkbox' name='clavesRetencion' id='clavesRetencion' value='"+idRetencion+"' >";
	row.appendChild( Td("",centro,"",htmlCheck) );
	row.appendChild( Td(retencion,izquierda) );
	row.appendChild( Td(formatNumber(importe,"$"),derecha) );
	row.appendChild( Td("",centro,"",htmlEdit) );
	tabla.appendChild( row );
 }
 
 function guardarRetencion(){
  
    if($('#retencion').val()=="") {swal('','El tipo de Retención no es válido','warning'); return false;}
    if($('#importeRetencion').val()=="") {swal('','El Importe de la Retención no es válido','warning'); return false;}
	
    
    swal({
		  title: 'Es seguro?',
		  text: '¿Confirma que desea eliminar la retención?',
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonText: 'Sí, Eliminar!',
		  cancelButtonText: 'No, abortar!',
		  timer: 4000,
		  showLoaderOnConfirm: true,
		  preConfirm: function(email) {
			    return new Promise(function(resolve, reject) {
			      setTimeout(function() {
			          resolve();
			          controladorFacturasRemoto.guardarRetencion( $('#idRetencion').val(),$('#retencion').val(),$('#importeRetencion').val(),$('#CVE_FACTURA').val(), {
							callback:function(items) {
								
								setTimeout(function(){
									llenarTablaDeRetenciones();
									limpiarRetencion();	
									swal("Retención guardada con éxito");
								}, 2000);
							} 					   				
							,
							errorHandler:function(errorString, exception) { 
								swal('',"Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador",'error');          
							}
						});  //termina el llamado al controlador
			        }
			      , 2000);
			    });
			  },
			  allowOutsideClick: false
			
		}).then((result) => {
			  if (result.value  ) {
			  } else if (result.dismiss === swal.DismissReason.cancel) {
			 		swal('Cancelado','Proceso cancelado','error')
			  }
		});
}
 
 
 function eliminarRetencion(){
	  
	 var checkRetenciones = [];
	 $('input[name=clavesRetencion]:checked').each(function() {checkRetenciones.push($(this).val()); });
     
     if (checkRetenciones.length>0){
		 swal({
			  title: 'Es seguro?',
			  text: '¿Confirma que desea eliminar la retención?',
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonText: 'Sí, Eliminar!',
			  cancelButtonText: 'No, abortar!',
			  timer: 4000,
			  showLoaderOnConfirm: true,
			  preConfirm: function(email) {
				    return new Promise(function(resolve, reject) {
				      setTimeout(function() {
				          resolve();
				          controladorFacturasRemoto.eliminarRetenciones(checkRetenciones,$('#CVE_FACTURA').val(), {
								callback:function(items) {
									
									setTimeout(function(){
									    swal("Retencion(es) eliminada(s) con éxito");
									    llenarTablaDeRetenciones();
									  }, 2000);
								} 					   				
								,
								errorHandler:function(errorString, exception) { 
									swal('',"Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador",'error');          
								}
							});  //termina el llamado al controlador
				        }
				      , 2000);
				    });
				  },
				  allowOutsideClick: false
				
			}).then((result) => {
				  if (result.value  ) {
				  } else if (result.dismiss === swal.DismissReason.cancel) {
				 		swal('Cancelado','Proceso cancelado','error')
				  }
			});
	 }	     
     else 
    	swal('','Es necesario que seleccione un elemento de la lista', 'warning');
}

function subirArchivo(){
	if($('#archivo').attr('value')==''||$('#CVE_FACTURA').val()==null|| $('#CVE_FACTURA').val()==0)
		return false;
	ShowDelay("Subiendo archivo al servidor");
	$('#frmEntrada').submit();
}

function showRequest(formData, jqForm, options) { 
    return true; 
} 
 
function showResponse(data)  { 
 	if(data.mensaje){
		CloseDelay("Archivo guardado con éxito");
		mostrarDetallesArchivos();
		document.location = "captura_factura.action?CVE_FACTURA="+$('#CVE_FACTURA').val();
		$('#archivo').attr('value','');
	}
	else{
		_closeDelay();
		jError("No se ha podido cargar el archivo por algunas de las siguientes razones: <br>*Solo se permite un archivo por factura<br>*El nombre del archivo es muy largo<br>*El nombre del archivo contiene caracteres no válidos<br>*Formato de archivo incorrecto", "Error");
	}
} 


function mostrarDetallesArchivos(){
	var cve_factura = $('#CVE_FACTURA').val();
	quitRow("listasArchivo");
	controladorFacturasRemoto.getArchivosFactura(cve_factura, {
						callback:function(items) {
								jQuery.each(items,function(i){
									pintaTablaDetallesArchivos(this);
								});
					} 
					,
					errorHandler:function(errorString, exception) { 
						jError(errorString,"Error");          
					}
	});
}

function pintaTablaDetallesArchivos(m){
	 var htmlRemove = "<img src=\"../../imagenes/cross.png\" style='cursor: pointer;' alt=\"Eliminar\" width=\"16\" height=\"16\" border=\"0\" onClick=\"eliminarArchivo("+m.ID_ARCHIVO+")\" >";
	appendNewRow("listasArchivo", [Td('', izquierda , '', '<div style="height:20px">&nbsp;<a href="../'+m.RUTA+'['+m.ID_ARCHIVO+'] '+m.NOMBRE+'" target="_blank">['+m.ID_ARCHIVO+'] '+m.NOMBRE+'</a></div>'),
						 Td('', centro , '', parseInt(parseInt(m.TAMANO)/1024)+' kb'),
						 Td('', centro , '', m.EXT),
						 Td('', centro , '', htmlRemove)
				]);
}

function eliminarArchivo(idArchivo){
	swal({
		  title: 'Es seguro?',
		  text: '¿Confirma que desea eliminar el archivo?',
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
			          controladorFacturasRemoto.eliminarArchivoFactura(idArchivo,{
							callback:function(items) {
								
								setTimeout(function(){
								    swal("Archivos eliminado con éxito!");
								    mostrarDetallesArchivos();
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
}



function getValeDocumento(idVale, num_vale, disponible, comprobado){
	$('#trEntrada').hide();
	$('#CVE_DOC').val(idVale);
	$('#txtdocumento').val(num_vale);
	//$('#txtdisponiblevale').attr('value', formatNumber(parseFloat(disponible),'$'));
	//$('#txtcomprobadovale').attr('value',  formatNumber(parseFloat(comprobado),'$'));
	//$('#fila_disponibleVale').show();
	$('#txttotal').val(formatNumber(comprobado).replace(',', ''));
	$('#div_total_entrada').html(formatNumber(comprobado, '$'));
	
	muestraPresupuesto();
	//_closeDelay();
	
}



function deleteDocumento()
{
	$('#txtdocumento').val('');
	$('#ID_ENTRADA').val(0);
	$('#CVE_DOC').val(0);
	$('#ID_ENTRADA').val(0);
	$('#CLV_BENEFI').val('');
	$('#div_num_entrada').html("");
	$('#div_total_entrada').html("");
	$('#div_beneficiario').html("");
	$('#div_programa').html("");
	$('#div_partida').html("");
	$('#trEntrada').show();
	$('#txtiva').val('');
	$('#txtsubtotal').val('');
	$('#txttotal').val('');
	//quitRow('listaPresupuesto');
}

function costumFunction(){
	cargarBeneficiarioyPresupuestoVale();
}

function cargarBeneficiarioyPresupuestoVale()
{
	if($('#cbotipodocumento').val()==3)
		if($('#CVE_DOC').val()!=''&&$('#CVE_DOC').val()!='0')
			if($('#ID_PROYECTO').val()!=''&&$('#ID_PROYECTO').val()!='0')
				if($('#CLV_PARTID').val()!=''&&$('#CLV_PARTID').val()!='0')
				{
					$('#trEntrada').hide();
					//buscamos el beneficiario
						controladorFacturasRemoto.getBeneficiarioFactura('VAL', $('#CVE_DOC').val(), {
							  callback:function(items){
											$('#div_beneficiario').html(items);
											 
						} 					   				
						,
							errorHandler:function(errorString, exception) { 
								jError(errorString,'Error');   
							}
						});	
						
							/*Cargamos el presupuesto
							controladorFacturasRemoto.getPresupuestoDocumento('VAL', $('#CVE_DOC').val(), {
									  callback:function(items){
										$('#div_programa').html(items.N_PROGRAMA + ' - '+ items.PROGRAMA);
										$('#div_partida').html(items.CLV_PARTID + ' - '+items.PARTIDA);
										$('#ID_PROYECTO').attr('value', items.ID_PROYECTO);
										$('#CLV_PARTID').attr('value', items.CLV_PARTID);
										//getProyectosPartidasVales([{ ID_PROYECTO:items.ID_PROYECTO , PROYECTOPARTIDA:items.N_PROGRAMA+" - "+ items.CLV_PARTID}]);
										quitRow('listaPresupuesto');
										appendNewRow('listaPresupuesto', 
												[Td('', centro , '', items.MES),
												 Td('', derecha , '', '<div style ="height:20px">'+formatNumber(items.AUTORIZADO, '$')+'</div>'),
												 Td('', derecha  , '', ((items.PRECOMPROMETIDO>0) ? '<a href="javascript:mostrarConsultaCompromiso('+items.ID_PROYECTO+', \''+items.N_PROGRAMA+'\', \''+items.CLV_PARTID + '\', '+items.PERIODO+',\'PRECOMPROMETIDO\''+')">': '')+formatNumber(items.PRECOMPROMETIDO, '$')+'</a>'),
												 Td('', derecha  , '', ((items.COMPROMETIDO>0) ? '<a href="javascript:mostrarConsultaCompromiso('+items.ID_PROYECTO+', \''+items.N_PROGRAMA+'\', \''+items.CLV_PARTID + '\', '+items.PERIODO+',\'COMPROMETIDO\''+')">': '')+formatNumber(items.COMPROMETIDO, '$')+'</a>'),
												 Td('', derecha  , '', ((items.DEVENGADO>0) ? '<a href="javascript:mostrarConsultaCompromiso('+items.ID_PROYECTO+', \''+items.N_PROGRAMA+'\', \''+items.CLV_PARTID + '\', '+items.PERIODO+',\'DEVENGADO\''+')">': '')+formatNumber(items.DEVENGADO, '$')+'</a>'),
												 Td('', derecha , '', ((items.EJERCIDO>0) ? '<a href="javascript:mostrarConsultaCompromiso('+items.ID_PROYECTO+', \''+items.N_PROGRAMA+'\', \''+items.CLV_PARTID + '\', '+items.PERIODO+',\'EJERCIDO\''+')">': '')+formatNumber(items.EJERCIDO, '$')+'</a>'),
												 Td('', derecha , '', formatNumber(items.DISPONIBLE, '$')+"&nbsp;")
												 
										]);
										
								} 					   				
								,
									errorHandler:function(errorString, exception) { 
										jError(errorString,'Error');   
									}
								});*/
				}
				
}

function regresaEntrada(num_ped, cve_ped, folio, ID_ENTRADA, clv_benefi, iva, subtotal, importeEntrada){
	deleteDocumento();
	$('#trEntrada').show();
	$('#txtdocumento').val(num_ped);
	$('#ID_ENTRADA').val(ID_ENTRADA);
	$('#CVE_DOC').val(cve_ped);
	$('#ID_ENTRADA').val(ID_ENTRADA);
	$('#CLV_BENEFI').val(clv_benefi);
	$('#div_num_entrada').html(folio);
	$('#txtiva').val(formatNumber(iva).replace(',', ''));
	$('#txtsubtotal').val(formatNumber(subtotal).replace(',', ''));
	$('#txttotal').val(formatNumber(importeEntrada).replace(',', ''));
	$('#div_total_entrada').html(formatNumber(importeEntrada, '$'));
	cargarBeneficiarioyPresupuestoPedidos(clv_benefi, cve_ped);
	$('#txtfecha').focus();
	$.alerts._hide();
}

function cargarBeneficiarioyPresupuestoPedidos(clv_benefi, cve_ped)
{
	ShowDelay("Recuperando información presupuestal");
	$('#trEntrada').show();
	//buscamos el beneficiario
	if(clv_benefi!=''){
		controladorFacturasRemoto.getBeneficiarioFactura('PED', cve_ped, {
			  callback:function(items){
							$('#div_beneficiario').html(items);
							 
		} 					   				
		,
			errorHandler:function(errorString, exception) { 
				jError(errorString,'Error');   
			}
		});	
	}
	/*Cargamos el presupuesto
	controladorFacturasRemoto.getPresupuestoDocumento('PED', cve_ped, {
			  callback:function(items){
				$('#div_programa').html(items.N_PROGRAMA + ' - '+ items.PROGRAMA);
				$('#div_partida').html(items.CLV_PARTID + ' - '+items.PARTIDA);
				$('#ID_PROYECTO').attr('value', items.ID_PROYECTO);
				$('#CLV_PARTID').attr('value', items.CLV_PARTID);
				//getProyectosPartidasVales([{ ID_PROYECTO:items.ID_PROYECTO , PROYECTOPARTIDA:items.N_PROGRAMA+" - "+ items.CLV_PARTID}]);
				quitRow('listaPresupuesto');
				appendNewRow('listaPresupuesto', 
						[Td('', centro , '', items.MES),
						 Td('', derecha , '', '<div style ="height:20px">'+formatNumber(items.AUTORIZADO, '$')+'</div>'),
						 Td('', derecha  , '', ((items.PRECOMPROMETIDO>0) ? '<a href="javascript:mostrarConsultaCompromiso('+items.ID_PROYECTO+', \''+items.N_PROGRAMA+'\', \''+items.CLV_PARTID + '\', '+items.PERIODO+',\'PRECOMPROMETIDO\''+')">': '')+formatNumber(items.PRECOMPROMETIDO, '$')+'</a>'),
						 Td('', derecha  , '', ((items.COMPROMETIDO>0) ? '<a href="javascript:mostrarConsultaCompromiso('+items.ID_PROYECTO+', \''+items.N_PROGRAMA+'\', \''+items.CLV_PARTID + '\', '+items.PERIODO+',\'COMPROMETIDO\''+')">': '')+formatNumber(items.COMPROMETIDO, '$')+'</a>'),
						 Td('', derecha  , '', ((items.DEVENGADO>0) ? '<a href="javascript:mostrarConsultaCompromiso('+items.ID_PROYECTO+', \''+items.N_PROGRAMA+'\', \''+items.CLV_PARTID + '\', '+items.PERIODO+',\'DEVENGADO\''+')">': '')+formatNumber(items.DEVENGADO, '$')+'</a>'),
						 Td('', derecha , '', ((items.EJERCIDO>0) ? '<a href="javascript:mostrarConsultaCompromiso('+items.ID_PROYECTO+', \''+items.N_PROGRAMA+'\', \''+items.CLV_PARTID + '\', '+items.PERIODO+',\'EJERCIDO\''+')">': '')+formatNumber(items.EJERCIDO, '$')+'</a>'),
				 		 Td('', derecha , '', formatNumber(items.DISPONIBLE, '$')+"&nbsp;")
						 
				]);
		} 					   				
		,
			errorHandler:function(errorString, exception) { 
				jError(errorString,'Error');   
			}
		});	
		*/
		//mostrarDetallesArchivos();
		_closeDelay();
}

function regresarOSOTFactura(num_req, cve_req, clv_benefi, total)
{
	deleteDocumento();
	$('#trEntrada').hide();
	$('#txtdocumento').val(num_req);
	$('#ID_ENTRADA').val(0);
	$('#CVE_DOC').val(cve_req);
	$('#ID_ENTRADA').val(0);
	$('#CLV_BENEFI').val(clv_benefi);
	$('#div_num_entrada').html("");
	$('#div_total_entrada').html(formatNumber(total, '$'));
	$('#txttotal').val(formatNumber(total).replace(',', ''));
	cargarBeneficiarioyPresupuestoOSOT(clv_benefi, cve_req);
		
	$('#txtfecha').focus();
	$.alerts._hide();
}

function cargarBeneficiarioyPresupuestoOSOT(clv_benefi, cve_req){
	ShowDelay("Recuperando información presupuestal");
	$('#trEntrada').hide();
	//buscamos el beneficiario
	if(clv_benefi!=''){
		controladorFacturasRemoto.getBeneficiarioFactura('REQ', cve_req, {
			  callback:function(items){
							$('#div_beneficiario').html(items);
							 
		} 					   				
		,
			errorHandler:function(errorString, exception) { 
				jError(errorString,'Error');   
			}
		});	
		
		//mostrarDetallesArchivos();
	}
	
	/*Cargamos el presupuesto
	controladorFacturasRemoto.getPresupuestoDocumento('REQ', cve_req, {
			  callback:function(items){
				$('#div_programa').html(items.N_PROGRAMA + ' - '+ items.PROGRAMA);
				$('#div_partida').html(items.CLV_PARTID + ' - '+items.PARTIDA);
				$('#ID_PROYECTO').attr('value', items.ID_PROYECTO);
				$('#CLV_PARTID').attr('value', items.CLV_PARTID);
				quitRow('listaPresupuesto');
				//getProyectosPartidasVales([{ ID_PROYECTO:items.ID_PROYECTO , PROYECTOPARTIDA:items.N_PROGRAMA+" - "+ items.CLV_PARTID}]);
				appendNewRow('listaPresupuesto', 
						[Td('', centro , '', items.MES),
						 Td('', derecha , '', '<div style ="height:20px">'+formatNumber(items.AUTORIZADO, '$')+'</div>'),
						 Td('', derecha  , '', ((items.PRECOMPROMETIDO>0) ? '<a href="javascript:mostrarConsultaCompromiso('+items.ID_PROYECTO+', \''+items.N_PROGRAMA+'\', \''+items.CLV_PARTID + '\', '+items.PERIODO+',\'PRECOMPROMETIDO\''+')">': '')+formatNumber(items.PRECOMPROMETIDO, '$')+'</a>'),
						 Td('', derecha  , '', ((items.COMPROMETIDO>0) ? '<a href="javascript:mostrarConsultaCompromiso('+items.ID_PROYECTO+', \''+items.N_PROGRAMA+'\', \''+items.CLV_PARTID + '\', '+items.PERIODO+',\'COMPROMETIDO\''+')">': '')+formatNumber(items.COMPROMETIDO, '$')+'</a>'),
						 Td('', derecha  , '', ((items.DEVENGADO>0) ? '<a href="javascript:mostrarConsultaCompromiso('+items.ID_PROYECTO+', \''+items.N_PROGRAMA+'\', \''+items.CLV_PARTID + '\', '+items.PERIODO+',\'DEVENGADO\''+')">': '')+formatNumber(items.DEVENGADO, '$')+'</a>'),
						 Td('', derecha , '', ((items.EJERCIDO>0) ? '<a href="javascript:mostrarConsultaCompromiso('+items.ID_PROYECTO+', \''+items.N_PROGRAMA+'\', \''+items.CLV_PARTID + '\', '+items.PERIODO+',\'EJERCIDO\''+')">': '')+formatNumber(items.EJERCIDO, '$')+'</a>'),
				 		 Td('', derecha , '', formatNumber(items.DISPONIBLE, '$')+"&nbsp;")
						 
				]);
		} 					   				
		,
			errorHandler:function(errorString, exception) { 
				jError(errorString,'Error');   
			}
		});	
		*/
		
		_closeDelay();
}
/*
function guardarFactura()
{
		var v = validarDetalles();
		if(v) return false;
	
		var cve_factura = $('#CVE_FACTURA').val();
		var cve_doc = $('#CVE_DOC').val();
		var tipo_doc = $('#cbotipodocumento').val();
		var idDependencia =  $('#cbodependencia').val();
		var idTipoFactura = $('#cbotipoFactura').val();
		var clv_benefi = $('#CLV_BENEFI').val();
		var idEntrada = $('#ID_ENTRADA').val();
		var idProyecto = 0;//$('#ID_PROYECTO').val();
		var clv_partid = '';//$('#CLV_PARTID').val();
		var num_fact = $('#txtnumfactura').val();
		var iva = $('#txtiva').val(); // Corregir el IVA..
		var subtotal = $('#txtsubtotal').val();
		var total = $('#txttotal').val();
		var observacion = $('#txtobservacion').val();
		var fecha_doc = $('#txtfecha').val();
		subtotal = subtotal.replace(',', "");
		
		jConfirm('¿Confirma que desea guardar la factura?','Guardar', function(r){
			if(r){
				
				controladorFacturasRemoto.guardarFactura(cve_factura, tipo_doc, cve_doc, idTipoFactura, idDependencia, idProyecto, clv_partid, clv_benefi, idEntrada, num_fact, iva, subtotal, total,  observacion, fecha_doc, {
					  callback:function(items){
							$('#CVE_FACTURA').attr('value',items);
							subirArchivo();
							desabilitarControles();;	
							$('#tabuladores').tabs('enable',1);
							tipoFacturasDeductivas();
							cargarDetallePresupuestalDoc($('#CVE_FACTURA').val());
							$('#tr_file').show();
							CloseDelay('Factura guardada con éxito');
							
					} 					   				
					,
					errorHandler:function(errorString, exception) { 
						jError('La operacion de guardado no se ha podido completar correctamente: '+errorString,'Error');   
						return false;
					}
				});
			}																			   
	});
}*/

/*funcion para validar los detalles de los conceptos*/
function validarDetalles(){

	if($('#cbotipodocumento').selectpicker('val')==''||$('#cbotipodocumento').selectpicker('val')==0) {swal('','Es necesesario seleccionar el tipo de documento para cargar a la factura','warning'); return true;}
	if($('#cboSearch').selectpicker('val')==''&& $('#cbotipodocumento').selectpicker('val')=='1'){swal('','Es necesesario seleccionar un beneficiario','warning'); return true;}
	if( 
		($('#CVE_DOC').val()==''||$('#CVE_DOC').val()==0) && ( $('#cbotipodocumento').selectpicker('val')!='1')
		
		) {swal('','Es necesario selecionar un documento de Pedido, OS/OT, o Contrato para continuar', 'warning'); return true;}
	
	if($('#txtfecha').val()=='') {swal('','La facha de la factura no es válida', 'warning'); return true;}
	if($('#txtnumfactura').val()=='') {swal('','El número de la factura no es valido', 'warning'); return true;}
}

function guardarFactura(){
	
	var valida = validarDetalles();
	
	if(valida) return false;

	var cve_factura = $('#CVE_FACTURA').val();
	var cve_doc = $('#CVE_DOC').val();
	var idTipoFactura = $('#cbotipodocumento').selectpicker('val');
	var idDependencia =  $('#cbUnidad').selectpicker('val');
	var clv_benefi = $('#cboSearch').selectpicker('val');
	var idEntrada = $('#ID_ENTRADA').val();
	var idProyecto = 0;
	var clv_partid = '';
	var num_fact = $('#txtnumfactura').val();
	var iva = $('#txtiva').val(); 
	var subtotal = $('#txtsubtotal').val();
	var total = $('#txttotal').val();
	var observacion = $('#txtobservacion').val();
	var fecha_doc = $('#txtfecha').val();
	subtotal = subtotal.replace(',', "");

	if (idTipoFactura==3){
		tipo_doc = "CVE_PED";
		var clv_benefi = $('#CLV_BENEFI').val();
		alert('Factura tipo Pedidos: ') + tipo_doc;
	}
	if (idTipoFactura==4){
		tipo_doc = "CVE_REQ";
		var clv_benefi = $('#CLV_BENEFI').val();
	}
	if (idTipoFactura==6){
		tipo_doc = "CVE_CONTRATO";
		var clv_benefi = $('#CLV_BENEFI').val();
	}
	if (idTipoFactura==1){
		tipo_doc = 5;
		var clv_benefi = $('#cboSearch').selectpicker('val');
	}
	if (clv_benefi==''){swal('','El beneficiario no es válido', 'warning'); return true;}
	
	swal({
			  title: 'Es seguro?',
			  text: '¿Confirma que desea cerrar el Devengado?',
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
				          controladorFacturasRemoto.guardarFactura(cve_factura, tipo_doc, cve_doc, idTipoFactura, idDependencia, idProyecto, clv_partid, clv_benefi, idEntrada, num_fact, iva, subtotal, total,  observacion, fecha_doc, {
								callback:function(items) {
									
									$('#CVE_FACTURA').val(items);
									subirArchivo();
									desabilitarControles();;	
									tipoFacturas();
									cargarDetallePresupuestalDoc($('#CVE_FACTURA').val());
									//$('#tr_file').show();
									setTimeout(function(){
									    swal("Factura guardada con éxito!");
									   
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
	
	 	
}

function cargarDetallePresupuestalDoc(cve_factura)
{
	
	controladorFacturasRemoto.cargarDetallePresupuestal(cve_factura, {
					  callback:function(items)
					  {
						  dwr.util.removeAllOptions("cboproyectopartida");
						  dwr.util.addOptions('cboproyectopartida',{ 0:'Seleccione'});
						  jQuery.each(items,function(i) {
							getProyectosPartidasDetalles([{ ID_PROYECTO:this.ID_PROYECTO+","+this.N_PROGRAMA+","+ this.CLV_PARTID, PROYECTOPARTIDA:this.N_PROGRAMA+" - "+ this.CLV_PARTID + " = " + formatNumber (this.MONTO) }]);
						  });
					  } 					   				
					,
					errorHandler:function(errorString, exception) { 
						swal('','La operacion de guardado no se ha podido completar correctamente: '+errorString,'error');   
						return false;
					}
				});
	
}

/*funcion para cerrar el documento*/
function cerrarDocumento(){
	
	if(!cerrar) {swal('','Es necesario que exista al menos un concepto de contrato para realizar esta operación','warning'); return false;}
	
	if($('#TOTAL_CONCEPTOS').val()=='0') {
			swal('','No se puede cerrar la factura si no existe por lo menos un lote en el detalle','error'); 
		return false;
	}
	swal('contiene un parametro');
    swal({
		  title: 'Es seguro?',
		  text: '¿Confirma que desea cerrar el Devengado?',
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonText: 'Sí, gaurdar!',
		  cancelButtonText: 'No, abortar!',
		  cancelButtonColor: '#d33',
		  focusConfirm: true,
		  showLoaderOnConfirm: true,
		  preConfirm: function(email) {
			    return new Promise(function(resolve, reject) {
			      setTimeout(function() {
			          resolve();
			          controladorFacturasRemoto.cerrarFactura($('#CVE_FACTURA').val(),{
			        	  callback:function(items) {
								$('#cmdcerrar').prop('disabled',true);
								$('#cmdguardar').prop('disabled',true);
								$('#cmdcerrar').prop('disabled',true);
								document.location='captura_factura.action';
								setTimeout(function(){
								    swal("Factura cerrada con éxito!");
								   },2000);
								},
									errorHandler:function(errorString, exception) { 
									swal('',"Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador",'error');          
								}
						});  
			        }, 2000);//cierra el  setTimeout de la nueva promesa
			    });
			  },
			  allowOutsideClick: false
			
		}).then((result) => {
			  
		  if (result.value  ) {
			  console.log('que realiza aqui');
		  } else if (result.dismiss === swal.DismissReason.cancel) {
			  		swal('Cancelado','Proceso cancelado','error')
		  }
		});
	
}


function desabilitarControles()
{
	$('#txtnumfactura').prop('disabled', true);
	$('#cbotipodocumento').prop('disabled', true);
}


