/**
Descripcion: Codigo controlador para la pagina beneficiario.jsp
*/
/**
*Al iniciar la pagina carga los eventos a los controles del formulario
*/
 var index ='';
$(document).ready(function() {  
	
	$('select').selectpicker();
	$('#municipal').hide();//
	$('#cmdcerrar').on('click', function(){
		window.parent.swal.close();
	});
  	$('#cmdguardar').click(function(event){guardar();});
  	$('#fechbaja').datetimepicker({
		format: 'DD/MM/YYYY',
		//defaultDate: new Date()
	});
  	$('#fechalta').datetimepicker({
		format: 'DD/MM/YYYY',
	});
  	$('#fechmod').datetimepicker({
		format: 'DD/MM/YYYY',
	});
   	$('#tipo').on('change',function(event){//El metodo on asigna uno o mas controladores de eventos para los elementos seleccionados.
		DatosBeneficiarios();
	});
  	
  	$('.selectpicker').selectpicker();
   	$('#fecha_sat').datetimepicker({
  		format: 'DD/MM/YYYY',
  	});
  	
  	//El metodo on asigna uno o mas controladores de eventos para los elementos seleccionados.
    $('#tipoBenefi').on('change',function(event){
 	   cambioTipoBeneficiario();
 	   return false;
 	 
    });
    
    $("#persfis").hide();
    $("#persfis2").hide();
    cambioTipoBeneficiario();
   
    var count= 0;
   
   // $('#cborubro').on('changed.bs.select',function(e, clickedIndex, newValue, oldValue) {
    $('#cborubro').on('change',function() {
    	index= $('#cborubro').selectpicker('val').toString();
    	console.log(index);
    });
           
    /*funciones*/
	 if( ($('#idProveedor').val()!=0) ){
		 
		 llenarTablaDeRubros();
	 	 var clv_benefi=$('#idProveedor').val();
	 	 editarBeneficiario(clv_benefi);
	 	 $("#tabsrubro").removeClass("disabled");
	 	 $("#tabsanexos").removeClass("disabled");
	 }
	 
	 $('#btnNuevoRubro').on('click', function(){
			
	 });
	 $('#btnGuardarRubro').on('click', function(){
		 guardarRubro();
	 });
	 
	 $(".nav li.disabled a").click(function() {
		  return false;
		});
});


function cambioTipoBeneficiario(){
		
	if ($('#tipoBenefi').val()==='PF' ){
		
		 $("#persfis").show();
		 $("#persfis2").show();
		 $("#otros").hide();
	}else if ($('#tipoBenefi').val()!='PF'){
		$("#persfis").hide();
		 $("#persfis2").hide();
		 $("#otros").show();
	}
}
function cerrarmodal(){

	window.parent.swal.close();
	
}

function DatosBeneficiarios(){
	
	var tipoBeneficiario = $('#tipo').val();
	
	/*Retorna si vale cero*/
	if(tipoBeneficiario=='0') return false;
	
}

function limpiar(){
			
	 		 $('#idProveedor').val('');
	 		 $('#clave').val('');			 			 
			 $('#razonSocial').val('');
			 $('#responsable').val('');
			 $('#responsable2').val('');
			 $('#rfc').val('');
			 $('#curp').val('');
			 $('#telefono').val('');
			 $('#tipo').val('');
			 $('#calle').val('');
			 $('#colonia').val('');
			 $('#ciudad').val('');
			 $('#estado').val('');
			 $('#cp').val('');
			 $('#banco').val('');
			 $('#idBanco').val('');
			 $('#noCuenta').val('');
			 $('#clabeb').val('');
			 $('#tipoCuenta').val('');
			 $('#beneficiarioPadre').val('');
			 $('#idBeneficiarioPadre').val('');
			 $('#fecha_altab').val('');
			 $('#fecha_bajab').val('');
			 $('#vigencia').prop('checked',true);
			 quitRow("beneficiariosHijos");
			 $('#tr_hijos').hide();				 
			
}


function verificarBanco() {
	if ($('#banco').value=="") {
	   $('#idBanco').val('');
	   $('#noCuenta').val('');
	   $('#tipoCuenta').val('');
	}
}
//Implementar la funcion valida.............. 2018
function valida(){
	if(clabeb.length<18){
		alert('La clabe debe contener 18 digitos');
		return false;
	}
}


function restaFechas2 (f1,f2){
	
	var aFecha1 = f1.split('/');
	var aFecha2 = f2.split('/');
	var fFecha1 = Date.UTC(aFecha1[2],aFecha1[1]-1,aFecha1[0]); 
	var fFecha2 = Date.UTC(aFecha2[2],aFecha2[1]-1,aFecha2[0]); 
	var dif = fFecha2 - fFecha1;
	var dias = Math.floor(dif / (1000 * 60 * 60 * 24)); 
	return dias;
}

function guardar(){	
		
	alert('El beneficiario es: ' +$('#idProveedor').val());
	alert('El beneficiario es: ' +$('#idBenefi').val());
	var clave= $('#idBenefi').val();
	
	var giro =$('#cbogiro').selectpicker('val');
	var cboPadron =$('#cbopadron').selectpicker('val');
	$('select[name=cborubro]').val(1);
	$('.selectpicker').selectpicker('refresh');
	 
	 var error="";
				 			 
	 var razonSocial=$('#razonSocial').val();
	 var razonComercial=$('#razonComercial').val();
	 var email=$('#txtemail').val();
	 var rfc=$('#rfc').val();
	 var curp=$('#txtcurp').val();
	 var telefono=$('#telefono').val();
	 var tipo=$('#tipoBenefi').val();
	 var calle=$('#calle').val();
	 var colonia=$('#colonia').val();
	 var localidad=$('#txtlocalidad').val();
	 var num_int=$('#txtnumint').val();
	 var num_ext=$('#txtnumext').val();
	 var ciudad=$('#ciudad').val();
	 var estado=$('#estado').val();
	 var cp=$('#cp').val();
	 var idBanco=$('#cbobanco').val();
	 var noCuenta=$('#noCuenta').val();
	 var clabeb=$('#clabeb').val();
	 var tipoCuenta=$('#tipoCuenta').val();
	 var idBeneficiarioPadre=$('#idBeneficiarioPadre').val();
	 var fecha_sat=$('#fechaSAT').val();
	 var fecha_altab=$('#fecha_altab').val();
	 var fecha_bajab=$('#fecha_bajab').val();
	 var fecha_modifica=$('#fecha_modifica').val();
	 var ap_paterno =$('#appaterno').val();
	 var ap_materno =$('#apmaterno').val();
	 var nombre=$('#txtnombre').val();
	 var ppmc=$('#txtPPMC').val();
	 var rcomercia=$('#razonComercial').val();
	 var id_vialidad=$('#cbovialidad').val();
	 if ( tipo=="0") {swal('Oops...','El Tipo de beneficiario no es válido!','warning'); return false;}
	 if ( fecha_altab=="") {swal('Oops...','La fecha de alta no es válida!','warning'); return false;}
	 if ( fecha_bajab=="") {swal('Oops...','La fecha de baja no es válida!','warning'); return false;}
	 
	 if ( rfc=="")  {swal('','El RFC no es válido','warning'); return false;}
	 if ( calle=="") {swal('','La Calle no es válida', 'warning'); return false;}
	 if ( colonia=="")  {swal('','La Colonia no es válida', 'warning'); return false;}
	 if ( estado=="")  {swal('','El Estado no es válido', 'warning'); return false;}
	 if ( ciudad=="")  {swal('','La Ciudad no es válida', 'warning'); return false;}
	 if ( cp=="")  {swal('','El Codigo postal no es válido', 'warning'); return false;}
	 if ( noCuenta=="") {swal('','La Cuenta debe ser capturada.', 'warning'); return false;}
	 if ( clabeb=="") {swal('','La Cuenta debe ser capturada.', 'warning'); return false;}
	 if (clabeb.length!=18){swal('','La CLABE debe contener 18 digitos.','warning');return false;}
	 
	 if(tipo!="PF"){
		 
		 if ( razonSocial=="")  {swal('','La Razón Social no es válida', 'warning'); return false;}
		 if ( tipo=="0")  {swal('','El tipo del padrón no es válido', 'warning'); return false;}
			 
	 }
	 else 
	 {
		 razonSocial = nombre + ' ' + ap_paterno+' '+ ap_materno; 
	 }
	
	 var vigencia=restaFechas2(fecha_altab,fecha_bajab);
	
	 if ($('#chkstatus').is(':checked'))	
		   estatus='1';	
	 console.log('Mando actualizar el beneiciario: ' +clave);
	swal({
		  title: 'Es seguro?',
		  text: '¿Confirma que desea guardar la informacion del beneficiario?',
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonText: 'Sí, gaurdar!',
		  cancelButtonText: 'No, abortar!'
		}).then((result) => {
		  if (result.value  ) {
			 
			  swal({
				  title: 'Guardando',
				  type: 'success',
				  timer: 4000,
				  onOpen: () => {
				    swal.showLoading()
				  }
				}).then((result) => {
				  if (
				   
				    result.dismiss === swal.DismissReason.timer
				  ) {
					  // AP_PATERNO= ?, AP_MATERNO= ?, NOMBRE= ?, FECHA_SAT= ?, NUM_INTERIOR= ?, PPMC= ?, NUM_EXTERIOR= ?, LOCALIDAD= ? , PTIPO= ?" +  " WHERE ID_BENEFICIARIO= ?"  
					  controladorBeneficiarioRemoto.guardarBeneficiario(clave,razonSocial,razonComercial,email, rfc, curp, telefono, tipo, calle, colonia, ciudad, estado, cp, idBanco, noCuenta, tipoCuenta, idBeneficiarioPadre, vigencia, estatus, clabeb, fecha_altab, fecha_bajab,
							  ap_paterno, ap_materno, nombre, fecha_sat, ppmc, num_int, num_ext, localidad, cboPadron, giro,fecha_modifica,id_vialidad,{
						  	 callback:function(items) {
								 //$('#idProveedor').val(items);
								 window.parent.cambiarVariable(razonSocial);
								 swal("Good job!", "Beneficiario Guardado con éxito!", "success");
								 
								 cerrarmodal();
								 limpiar();
								 //buscarBeneficiario();
												
				 		     }	
							,errorHandler:function(errorString, exception) { 
								swal('',errorString, 'error'); 
							}
						});	
				   
				  }
				})
		  
		  } else if (result.dismiss === swal.DismissReason.cancel) {
		    swal(
		      'Cancelado',
		      'El beneficiario no se guardo',
		      'error'
		    )
		  }
		})
}

 function buscarBeneficiario() {
	 console.log('Entro a la funcion buscarBeneficiario');
	 alert('Entro a buscarBeneficiario');
	 if($('#razonSocial').val()==''){sawl('','El nombre del beneficiario es un campo requerido, escriba un nombre válido','warning'); return false;}
	 quitRow("beneficiarios");
	 var idBene;
	 ShowDelay('Buscando Beneficiario','');
	controladorBeneficiarioRemoto.getBeneficiarios($('#razonSocial').val(), {
        callback:function(items) { 		
            jQuery.each(items,function(i) {
				_closeDelay();
			   idBene=this.ID_PROVEEDOR;
			 var domicilio = this.DOMIFISCAL+" "+this.COLONIA+" "+this.CIUDAD +" "+ this.ESTADO;
 		     pintaTabla( "beneficiarios", i+1 ,this.ID_PROVEEDOR,this.NCOMERCIA,this.RFC,domicilio,this.TIPOBENEFI,this.VIGENCIA);
 		     
        }); 					   						
            if (items.STATUS==1)
          	  $('#estatus').prop('checked',true);
            
			if (items.length > 0 ){ 
			  limpiar();
			  if (items.length!=1)
			   $('#formaBusqueda').show();
			    else {
				$('#formaBusqueda').hide();
			   editar(idBene);
				}
			  
			}
			else 
			      $('#formaBusqueda').hide();
        } 					   				
        ,
        errorHandler:function(errorString, exception) { 
           swal('',"Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador",'error');      
        }
    }); 

 }

function pintaTabla( table, consecutivo,id,nombre,rfc,domicilio,tipo,vigencia){

 	var tabla = document.getElementById( table ).tBodies[0];
 	var row =   document.createElement( "TR" );
    var htmlCheck = "<input type='checkbox' name='claves' id='claves' value='"+id+"' >";
    var htmlEdit = "<img src=\"../../imagenes/page_white_edit.png\" style='cursor: pointer;' alt=\"Editar registro\" width=\"16\" height=\"16\" border=\"0\" onClick=\"editar("+id+")\" >"; 		
	if (table !='beneficiariosHijos')
	  row.appendChild( Td("",centro,"",htmlCheck) );
	else
   	   	row.appendChild( Td(consecutivo,centro,"","") );
		row.appendChild( Td(nombre,"","","") );	  
		row.appendChild( Td(rfc,centro,"","") );	  
		row.appendChild( Td(domicilio,izquierda,"","") );
		row.appendChild( Td(tipo,centro,"","") );
		row.appendChild( Td(vigencia,centro,"","") );
	if (table !='beneficiariosHijos')
    row.appendChild( Td("",centro,"",htmlEdit) );	
	tabla.appendChild( row );
 }
 
 
 
 function buscarBeneficiarioHijos() {
	 console.log('Entro a la funcion buscarBeneficiarioHijos');
	 alert('Entro aqui buscarBeneficiarioHijos');
	 quitRow("beneficiariosHijos");
	controladorBeneficiarioRemoto.getBeneficiariosHijos($('#clave').val(), {
        callback:function(items) { 		
            jQuery.each(items,function(i) {
		     var domicilio = this.DOMIFISCAL+" "+this.COLONIA+" "+this.CIUDAD +" "+ this.ESTADO;
 		     pintaTabla( "beneficiariosHijos", i+1 ,this.ID_PROVEEDOR,this.NCOMERCIA,this.RFC,domicilio,this.FECHA_ALTA,this.FECHA_BAJA,this.TIPOBENEFI,this.VIGENCIA);
        }); 					   						
			if (items.length > 0 ) 
			   $('#tr_hijos').show();
			else {
			   $('#tr_hijos').hide();			    
			}
        } 					   				
        ,
        errorHandler:function(errorString, exception) { 
           swal('',"Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador",'error');      
        }
    }); 

 }

 function editarBeneficiario(clv_benefi) {
	 console.log('Entro a la editarBeneficiario');
	 
	 controladorBeneficiarioRemoto.getBeneficiario(clv_benefi,{
        callback:function(items) { 		
        	 $('#idProveedor').val(items.ID_PROVEEDOR);
			 console.log('El Status: ' +items.STATUS);
			 console.log('El Estatus: ' +items.ESTATUS);
			 $('#fecha_modifica').val(items.FECHA_MODIFICADA);
			 if (items.STATUS=='1'){
		    		$('#chkstatus').prop('checked',true);
		    	}
		    					 
			    else
			        $('#chkstatus').prop('checked',false); 
			
        },
        errorHandler:function(errorString, exception) { 
	        swal('Carga edición','Fallo la operacion:<br>Error:: ' + errorString + '-message:: ' + exception.message + '-JavaClass:: ' + exception.javaClassName + '.<br>Consulte a su administrador','warning');
	    }	
    }); 
 }	


 
 
  function eliminar(){
	  var checkBeneficiarios = [];
     $('input[name=claves]:checked').each(function() {checkBeneficiarios.push($(this).val());	 });	 
	 if (checkBeneficiarios.length > 0 ) {
	 ShowDelay('Eliminando movimientos de beneficiario','');
	 
     controladorBeneficiarioRemoto.eliminarBenificiario(checkBeneficiarios, {
        callback:function(items) {
		   CloseDelay("Se eliminaron satisfactoriamente los movimientos", 2000, function(){
			   	buscarBeneficiario();
			});
		   
        } 					   				
        ,
        errorHandler:function(errorString, exception) { 
		jError("Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");    
        }
    }); } else 
	    jInformation("Es necesario que seleccione un elemento de la lista");

 }
  
  function limpiarRubro(){
		$('#cborubro').selectpicker('val','');
		$('#cborubro').selectpicker('refresh')
	}
	function guardarRubro(){
		
		clv_benefi= $('#idBenefi').val();
		id_rubro = $('#cborubro').selectpicker('val');
		alert('El rubro que se agisnara es: ' +id_rubro + "|" + "Al beneficiario: " +id_rubro);
		if( (id_rubro=='0') || (id_rubro=='' || (id_rubro == null)) ) {
			swal('','El Rubro no es válido','error'); 
			return false;
		}
		
		swal({
			  title: 'Guardar',
			  text: 'Asignar rubro al beneficiario',
			  type: 'info',
			  showCancelButton: true,
			  showLoaderOnConfirm: true,
			  confirmButtonText:'Asignar',
			  cancelButtonText:'Cancelar',
			  preConfirm: function() {
			    return new Promise(function(resolve, reject) {
			    	setTimeout(function() {
			        	controladorBeneficiarioRemoto.guardaRubroBenefi(clv_benefi, id_rubro, {
							callback:function(items) {
								$('#idProveedor').val(items);
								limpiarRubro();
								llenarTablaDeRubros();
							}, //Cierra 	callback				   				
							errorHandler:function(errorString, exception) { 
								swal("Fallo la operacion:<br>Error::",+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador",'error');          
							}
					});  //termina el llamado al controlador
			        	resolve();
			        }, 2500);
			    });
			  },
			}).then(function(result) {
				 if (result.value  ) {
					  swal({title:'Rubro guardado con éxito!!',showConfirmButton: false,timer:1000,type:"success"});
				  } else if (result.dismiss === swal.DismissReason.cancel) {
				 		swal('Cancelado','Proceso cancelado','error')
				  }
			})
	}

	function llenarTablaDeRubros() {
		quitRow("listaRubros");
		clv_benefi= $('#idBenefi').val();
		controladorBeneficiarioRemoto.getTodosRubrosBeneficiario(clv_benefi, {
		    callback:function(items) { 		
				jQuery.each(items,function(i) {
				    pintaRubros( "listaRubros", i+1,this.CLV_RUBRO,this.DESCRIPCION,this.STATUS);
				});
			},
		    errorHandler:function(errorString, exception) { 
		    	swal('Oops...',errorString,'error');
		    }
		},async=false ); 

	}

	function pintaRubros( table, consecutivo,CLV_RUBRO,descripcion,status){
		
	 	var tabla = document.getElementById( table ).tBodies[0];
	 	var row =   document.createElement( "TR" );    
	    var htmlEdit = "<img src=\"../../imagenes/page_white_edit.png\" style='cursor: pointer;' alt=\"Editar registro\" width=\"16\" height=\"16\" border=\"0\" onClick='cambiarStatusRubro("+CLV_RUBRO+",\""+descripcion+"\")' >"; 	
	    var htmlCheck = "<input type='checkbox' name='clavesRubros' id='clavesRubros' value='"+CLV_RUBRO+"' >";
		row.appendChild( Td("",centro,"",htmlCheck) );
		row.appendChild( Td(consecutivo,izquierda) );
		row.appendChild( Td(CLV_RUBRO,izquierda) );
		row.appendChild( Td(descripcion,izquierda) );
		row.appendChild( Td(status,izquierda) );
		row.appendChild( Td("",centro,"",htmlEdit) );
		tabla.appendChild( row );
	 }

	function eliminarRubros (){
		clv_benefi= $('#idBenefi').val();
		var checkRubros = [];
	    $('input[name=clavesRubros]:checked').each(function() {checkRubros.push($(this).val());	 });
	    if (clv_benefi==''){
	    	swal('El beneficiario no es correcto');
	    	return false;
	    }
	    	
	    
	    if ( checkRubros.length > 0 ) {
	    	
	    	swal({
	  		  title: 'Eliminar',
	  		  text: 'Confirma que desea eliminar el rubro del beneficiario',
	  		  type: 'info',
	  		  showCancelButton: true,
	  		  showLoaderOnConfirm: true,
	  		  confirmButtonText:'Eliminar',
	  		  cancelButtonText:'Abortar',
	  		  preConfirm: function() {
	  		    return new Promise(function(resolve, reject) {
	  		    	setTimeout(function() {
	  		    		console.log('claves de rubros: ' +checkRubros);
	  		    		alert('Al beneficiario: ' + clv_benefi +', Se eliminan los siguientes rubros: ' +checkRubros);
	  		        	controladorBeneficiarioRemoto.eliminarRubros(checkRubros, clv_benefi, {
	  						callback:function(items) {
	  						 llenarTablaDeRubros();
	  						}, //Cierra 	callback				   				
	  						errorHandler:function(errorString, exception) { 
	  							swal("Fallo la operacion:<br>Error::",+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador",'error');          
	  						}
	  		        	}); //termina el llamado al controlador
	  		        	resolve();
	  		        }, 2500);
	  		    });
	  		  },
	  		}).then(function(result) {
	  			 if (result.value  ) {
	  				  swal({title:'Rubro(s) eliminados con éxito!!',showConfirmButton: false,timer:1000,type:"success"});
	  			  } else if (result.dismiss === swal.DismissReason.cancel) {
	  			 		swal('Cancelado','Proceso cancelado','error')
	  			  }
	  		})
	    } else 
		   	swal('Oops...','Es necesario que seleccione un elemento de la lista','error');	
		
		
	}
	function cambiarStatusRubro (){
		
	}
	
	