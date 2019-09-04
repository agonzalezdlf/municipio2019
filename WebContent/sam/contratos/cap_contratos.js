var cerrar = false; 
var valparameters = 6;
$(document).ready(function() {
	
	var options = { 
        beforeSubmit:  showRequest,  
        success:       showResponse, 
        url:       '_subirArchivo.action?CVE_CONTRATO='+$('#CVE_CONTRATO').attr('value'),
        type:      'post', 
        dataType:  'json'
    }; 
	$('#forma').submit(function(){
		$(this).ajaxSubmit(options);
		return false;
	});
	
	$('#cto_obra').hide();
	$('#doctol').hide();
	 
   /*----------------------   Fechas por rango  ----------------------------*/
   $('#txtfechainicial').datetimepicker({
		format: 'DD/MM/YYYY',
		//minDate: new Date(),	
		
	});
		
	$('#txtfechatermino').datetimepicker({
		format: 'DD/MM/YYYY',
		//minDate: new Date(),
	    //useCurrent: false //Important! See issue #1075
	});
	$('#txtfechainicial').on('dp.change', function (e) {
	    $('#txtfechatermino').data('DateTimePicker').minDate(e.date);
	});
	$('#txtfechatermino').on('dp.change', function (e) {
	    $('#txtfechainicial').data('DateTimePicker').maxDate(e.date);
	});
	/*****************************************************************************/
	
	$('#cmdguardar').on('click',function(event){
		guardaContrato2();
	 });
	$('#cmdcerrar').on('click',function(event){
		cierraContrato();
	 });
	$('#cmdnuevoconcepto').on('click',function(event){
		nuevoConcepto();
	 });
	$('#cmdnuevo').on('click',function(event){
		nuevoContrato();
	 });
	$('#cmdagregar').on('click',function(event){
		agregarConcepto();
	 });
	$('#cmdpresupuesto').on('click',function(event){
		muestraPresupuesto();
	});
	$('#img_docto').on('click',function(event){
		muestraDocumento();
		return false;
	});
	$('#img_detele').on('click',function(event){
		nuevoTipoContrato();
		return false;
	});
		
	$('#cbotipocontrato').on('change',function(event){//El metodo on asigna uno o mas controladores de eventos para los elementos seleccionados.
		tipoContratos();
	});
	
	$('#txtnumreq').keypress(function(event){if (event.keyCode == '13'){tipoContratos();}}); //muestraDocumento
	
	 //Configura los tabuladores
	 
	 $('#txtproyecto').blur(function(event){__getPresupuesto($('#ID_PROYECTO').val(),$('#txtproyecto').val(),$('#txtpartida').val(), $('#cbomes').val(),  'txtpresupuesto','txtdisponible','');});
	 $('#txtpartida').blur(function(event){__getPresupuesto($('#ID_PROYECTO').val(),$('#txtproyecto').val(),$('#txtpartida').val(), $('#cbomes').val(),  'txtpresupuesto','txtdisponible','');});
	
		 
	 //if($('#txtnumreq').val()!='') cargarOS($('#CVE_REQ').val());
	 
	 $('#detalle').addClass("disabledTab");
	 
	 if($('#CVE_CONTRATO').val()!='0') {
		 $('#detalle').removeClass("disabledTab");
		 
		 if ($('#cbotipocontrato').val()==13 ||$('#cbotipocontrato').val()==7 || $('#cbotipocontrato').val()==3 || $('#cbotipocontrato').val()==1)
			 $('#doctol').show();
		 getConceptos();
		 mostrarDetallesArchivos();
		 
		 
	 }
	 
	 $('#ui-datepicker-div').hide();
	 $('#cbotipocontrato').change(function(event){
		 ValidarTipoContrato();
	 });
	  
	 if ($('#CVE_CONTRATO').val()!=0&&$('#CVE_CONTRATO').val()!='')
			$('#cmdcerrar').prop('disabled','');
		
});

	//Setea el tipo de contrato, para eliminar datos cargados
	function nuevoTipoContrato(){
		$('#cbotipocontrato').prop('disabled',false);
		$('#cbotipocontrato').selectpicker('val','');
		$('#cbotipocontrato').selectpicker('refresh');
		$('#txtdocumento').val('');
		$('#beneficiarioxdocto').hide();
		$('#div_benaficiarioFijo').show();
		$('#xBeneficiario').prop('disabled',false);
		$('#xBeneficiario').selectpicker('val','');
		$('#xBeneficiario').selectpicker('refresh');
		
		
	}
	
	//Demo para habilitar el boton de guardar al llenar todos los campos de validacion 
	function validar(){
	  var validado = true;
	  elementos = document.getElementsByClassName("inputFormu");
	  for( i=0; i<elementos.length; i++){
	    if(elementos[i].value == "" || elementos[i].value == null){
	    	validado = false
	    }
	  }
	  if(validado){
		  document.getElementById("cmdguardar").disabled = false;
	  }else{
	     document.getElementById("cmdguardar").disabled = true;
	  //Salta un alert cada vez que escribes y hay un campo vacio
	  //alert("Hay campos vacios")   
	  }
	}

	//return false;
	
/****************Para ocultar un boton cerrar si no exista movimientos en el detalle de la tabla maestra****************************/
function tabladetalles(){
	var numFilas = $('#listaConceptos > tbody > tr').length;
	var nFilas = $("#listaConceptos tr").length;
	var filas = $("#listaConceptos tbody tr").length;
	var yea=document.getElementById("listaConceptos").rows.length;
	var rowCount = $('#listaConceptos tr:last').index();
		
	if (numFilas< 1){
				cmdcerrar.style.visibility  = 'visible'; 
				$('#cmdcerrar').removeClass("btn_disable");
				
	}else
		{
			cmdcerrar.style.display = 'none'; // No ocupa espacio hidden
			
			
		}
}

function subirArchivo(){
	if($('#archivo').val()==''||$('#CVE_CONTRATO').val()==null|| $('#CVE_CONTRATO').val()==0)
		return false;
	swal("Subiendo archivo al servidor");
	$('#forma').submit();
}

function showRequest(formData, jqForm, options) { 
    return true; 
} 
 
function showResponse(data)  { 
 	if(data.mensaje){
		CloseDelay("Archivo guardado con éxito");
		mostrarDetallesArchivos();
		mostrarcerrar()
		//document.location = "cap_contratos.action?cve_contrato="+$('#CVE_CONTRATO').val();
		$('#archivo').attr('value','');
	}
	else{
		_closeDelay();
		swal("No se ha podido cargar el archivo por algunas de las siguientes razones: <br>*Solo se permite un archivo por factura<br>*El nombre del archivo es muy largo<br>*El nombre del archivo contiene caracteres no vÃ¡lidos<br>*Formato de archivo incorrecto", "Error");
	}
}

function mostrarDetallesArchivos(){
	var cve_factura = $('#CVE_CONTRATO').val();
	quitRow("listasArchivo");
	ControladorContratosRemoto.getArchivosContrato(cve_factura, {
						callback:function(items) {
								jQuery.each(items,function(i){
									pintaTablaDetallesArchivos(this);
								});
					} 
					,
					errorHandler:function(errorString, exception) { 
						swal(errorString,"error");          
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
		  title: 'Confirma que desea eliminar el archivo',
		  //text: 'Submit to run ajax request',
		  type: 'info',
		  showCancelButton: true,
		  showLoaderOnConfirm: true,
		  preConfirm: function() {
		    return new Promise(function(resolve, reject) {
		    	ControladorContratosRemoto.eliminarArchivoContrato(idArchivo,{
					callback:function(map) {
						CloseDelay("Archivos eliminado con éxito");
						mostrarDetallesArchivos();
					},
					errorHandler:function(errorString, exception) { 
											swal(errorString,'error');          
					}
		    	});
		      setTimeout(function() {
		        resolve();
		      }, 2000);
		    });
		  },
		}).then((result) => {
			if (!result.dismiss) {
				swal({title:'Archivos eliminado con éxito!!',showConfirmButton: false,timer:1000,type:"success"});
			}
		})
}
 

function ValidarTipoContrato()
{
	var tipo = $('#cbotipocontrato').val();

	if(tipo == 7)
	{
		$('#tr_programa').hide();
		$('#tr_presupuesto').hide();
		$('#tr_importe').hide();
	}
	else
	{
		$('#tr_programa').show();
		$('#tr_presupuesto').show();
		$('#tr_importe').show();
	}
}

function nuevoContrato(){
	document.location = "cap_contratos.action";
}
/***********************************************************************************************************************/
function agregarConcepto(){
		
	if ($('#txtproyecto').val()=="") {swal('El proyecto de concepto no es válido'); return false;};
    if ($('#txtpartida').val()=="") {swal('La partida del concepto no es válido'); return false;}
    if ($('#cbomes').val()=="") {swal('El mes del presupuesto no es válido'); return false;}
	if ($('#txtimporte').val()=="") {swal('El importe del concepto no es válido'); return false;}
	
		
	num=$('#txtpartida').val().charAt(0); 
	if(num==1) {
		swal('','Capitúlo 1000,<br><strong>Se encuentra COMPROMETIDO</strong>','error');
		return false;
	} 
	if ($('#ID_PROYECTO').val()==0){
		muestraPresupuesto();
		return false;
	}
			
	swal({title: 'Guardando concepto', onOpen: function () { swal.showLoading()}});
	ControladorContratosRemoto.guardarConcepto($('#ID_DETALLE').val(), $('#CVE_CONTRATO').val(), $('#ID_PROYECTO').val(),$('#txtpartida').val(), $('#cbomes').val(), $('#txtimporte').val(),{
	  callback:function(items) {
				setTimeout(function () {
					getConceptos();
					nuevoConcepto();
					swal('Concepto guardado con exito'),
				      swal.close()
				    }, 2000)
		},
		errorHandler:function(errorString, exception) { 
			swal(errorString, 'Error');     
		}
	});
	
}
/*funcion para mostrar el listado del presupuesto*/
function muestraPresupuesto(){
	
	var id_proyecto = $('#ID_PROYECTO').val();
	var proyecto = $('#txtproyecto').val();
	var partida = $('#txtpartida').val();
	var idUnidad = $('#cbUnidad2').val();
	var mes = $('#cbomes').val();
	var tgasto = $('#tipoGasto').val();
		
	if(mes==0) {swal('','Seleccione un periodo presupuestal válido','warning'); return false;}
	
	if($('#txtproyecto').val()==''||$('#txtproyecto').val()==null||$('#txtpartida').val()==''||$('#txtpartida').val()==null){
		$('#ID_PROYECTO').val('0');
	}
		
	if(idUnidad==null||idUnidad=="") idUnidad = 0;
		
	__listadoPresupuesto(id_proyecto,proyecto,partida,mes, tgasto , idUnidad);
}

/*------------------------------------ Revisar el cierre del contratos --------------------------------------------------*/
function cierraContrato(){
		
	if(!cerrar) {swal('','Es necesario que exista al menos un concepto de contrato para realizar esta operación','warning'); return false;}
	
	var cve_contrato = $('#CVE_CONTRATO').val();
	
	 swal({
		  title: 'Eliminar conceptos?',
		  type: 'info',
		  showCancelButton: true,
		  showLoaderOnConfirm: true,
		  allowOutsideClick: false,
		  confirmButtonText: 'Sí, eliminar',
		  cancelButtonText:'No, abortar',
		  preConfirm: function() {
			 return new Promise(function(resolve, reject) {
				 setTimeout(function() {
					 resolve();
					 ControladorContratosRemoto.cerrarContrato(cve_contrato, {
							callback:function(items) {
								$('#cmdcerrar').prop('disabled', true);
								//getReporteContrato($('#CVE_CONTRATO').attr('value'));
								document.location='lista_contratos.action'; 
							},errorHandler:function(errorString, exception) { 
								swal(errorString,'error');          
							}
					});
				 }, 2000);//Cierra el setTimeout
			});//ciera el Promise
		  },//Cierra el preConfirm
		}).then(function (result) {
			    if (result.value) {
		        	swal({title:'Contrato cerrado con éxito!!',allowOutsideClick: false,showConfirmButton: false,timer:1000,type:"success"});
		        }else
		        	swal({title:'Abortado!!!',text:'Proceso abortado, no realizó ningun cambio',allowOutsideClick: false,showConfirmButton: false,timer:1000,type:"info"});
		  
		})
}

function _validate(){
	
	if($('#cbUnidad').val()==0) {swal('','La Unidad Administrativa no es válida','warning');return false;}
	if($('#cbotipocontrato').val()==0){swal('','El tipo de contrato no es válido','warning'); return false;}
	if($('#txtnumcontrato').val()=='') {swal('','El número de contrato no es válido','warning'); return false;}
	if($('#tipoGasto').val()==0) {swal('','El tipo de gasto no es válido', 'warning'); return false;}
	if($('#xBeneficiario').val()==0) {swal('','El nombre del Proveedor no es válido', 'warning'); return false;}
	
	//Si es de obra valida datos especificos de fechas por los plazos de las obras...
	if ( $('#cbotipocontrato').val()==1 ){
		if($('#txtfechainicial').val()=='') {swal('','La fecha inicial no es válida','warning'); return false;} 
		if($('#txtfechatermino').val()=='') {swal('','La fecha de termino no es válida','warning'); return false;}
		if($('#txtnumoficio').val()=='') {swal('','El oficio de autorización no es válido', 'warning'); return false;}
	}
	if($('#txtdescripcion').val()==''){swal('','La descripcion del contrato no es válida','warning'); return false;}
	
	return true;
	
}
//
function guardaContrato2(){
	
	var valida = _validate();
	var id_contrato = $('#CVE_CONTRATO').val();
	if($('#CVE_DOC').val()==null) $('#CVE_DOC').val(0);
	
	if (valida) {
		
		swal({
			  title: 'Es seguro?',
			  text: '¿Confirma que desea guardar el contrato?',
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonText: 'Sí, gaurdar!',
			  cancelButtonText: 'No, abortar!',
			  showLoaderOnConfirm: true,
			  allowOutsideClick: false,
			  preConfirm: function(email) {
				    return new Promise(function(resolve, reject) {
				      setTimeout(function() {
				        if (email === 'taken@example.com') {
				          reject('');
				        } else {
				          resolve();
				          ControladorContratosRemoto.guardarContrato(id_contrato, $('#cbUnidad').val(), $('#txtnumcontrato').val(), $('#txtfechainicial').val(), $('#txtfechatermino').val(), $('#txtnumoficio').val(), $('#txttiempoentrega').val(), $('#cbotipocontrato').selectpicker('val'), $('#txtdescripcion').val(), $('#txtanticipo').val(), $('#tipoGasto').selectpicker('val'), $('#xBeneficiario').selectpicker('val'), $('#CVE_DOC').val(), {
								callback:function(items) {
									$('#detalle').removeClass("disabledTab");
									$('#CVE_CONTRATO').val(items);
									//$('#tabuladores').tabs('enable',1);
									getConceptos();
									subirArchivo();
								},
								errorHandler:function(errorString, exception) { 
									swal('Oops 2...',"Fallo la operacion:<br>"+"<strong>"+errorString+"</strong>"+"<br>message:"+"<br>Consulte a su administrador");          
									return false;
								}
							});  
				        }
				      }, 2000);
				    });
				  },
				  allowOutsideClick: false
				
			}).then((result) => {
				  
			  if (result.value  ) {
					swal({title:"Contrato guardado con exito!",allowOutsideClick: false,showConfirmButton: false,timer:1000,type: 'success',});
			  } else if (result.dismiss === swal.DismissReason.cancel) {
				  		swal('Cancelado','Proceso cancelado','error')
			  }
			});
	}
	
	
	 	
}

//Selecciona el tipo de contrato para mostrar las opciones de captura segun la selección 2019/04/15...... 
function tipoContratos(){
		
var tContrato=$('#cbotipocontrato').selectpicker('val');
	
	if (tContrato==1)
		
		$('#cto_obra').show();
	
	else
		
		$('#cto_obra').hide();
	
	if($('#cbotipocontrato').val()==0){swal('','Es necesario seleccionar el tipo de contrato','warning'); return false;}
	
	/*Retorna si vale cero*/
	if($('#TOTAL_CONCEPTOS').val()>'1'){
		//alert('Total de detalles: ' +$('#TOTAL_CONCEPTOS').val());
		
		$('#cbotipocontrato').prop('disabled', true);
		swal('','No se puede cambiar el tipo de documento, debe eliminar el detalle primero','error');
		return false;
	}
	
	$('#doctol').hide();
	
	switch(tContrato){
	
		case "7"://Adquisicion
			$('#doctol').show();
		break;
		
		case "1"://OBRAS
			$('#doctol').show();
			
		break;
		
		case "13"://Vales
			$('#doctol').show();
		break;
		
		case "3"://OSuOT
			$('#doctol').show();
		break;
	}
	
}

function muestraDocumento(){

	//cbUnidad
	$('#doctol').show();
	var clv_benefi = $('#xBeneficiario').selectpicker('val');
	if(clv_benefi=='') $('#CLV_BENEFI').selectpicker('val','');
	
	var num_req = $('#txtdocumento').val();
	var idDependencia = $('#cbUnidad').val();
		
	
	if(idDependencia==0||idDependencia=="") {swal('','Es necesario seleccionar la Unidad Administrativa para listar los documentos','warning'); return false;}
	if($('#cbotipocontrato').val()==0){swal('','Es necesario seleccionar el tipo de contrato','warning'); return false;}

	/*Retorna si vale cero*/
	if(cbotipocontrato=='0') return false;
		
	if ($('#cbotipocontrato').val()==7){ //Adquisicion - Pedidos
		$('#doctol').show();
		swal({
				  title: 'Listado de Pedidos',
				  text: 'Seleccione pedido a contratar',
				  html:
					  '<iframe width="650" height="400" name="consultaPedido" id="consultaPedido" frameborder="0" src="../../sam/consultas/muestra_pedidos_contratos.action?idDependencia='+idDependencia+'"></iframe>',
				  width: 800,
				  padding: 10,
				  animation: false,
				  confirmButtonText: 'Cerrar'
			})
	}
	
	if ($('#cbotipocontrato').val()==13) //VALE
	{
		$('#doctol').show();
		
		swal({
			  title: 'Listado de Vales',
			  text: 'Seleccione vale a comprobar',
			  html:
				  '<iframe width="750" height="350" name="ventanaVales" id="ventanaVales" frameborder="0" src="../../sam/consultas/muestraVales_tipo_contratos.action?idVale='+$('#CVE_DOC').val()+'&idDependencia='+idDependencia+'&clv_benefi='+clv_benefi+'"></iframe>',
			  width: 800,
			  padding: 10,
			  animation: false,
			  confirmButtonText: 'Cerrar'
			})
		
	}																																											//id_vale,num_vale,clv_benefi, comprobado,por_comprobar
		
	if ($('#cbotipocontrato').val()==3){
		
		$('#doctol').show();
		swal({
			  title: 'Listado de O.S. y O.T.',
			  text: 'Seleccione OS u OT a contratar',
			  html:
				  '<iframe width="800" height="400" name="DocumentoContrato" id="DocumentoContrato" frameborder="0" src="../../sam/consultas/muestra_os_contratos.action?num_req='+num_req+'&idDependencia='+idDependencia+'&clv_benefi='+clv_benefi+'"></iframe>',
			  width: 800,
			  padding: 10,
			  animation: false,
			  confirmButtonText: 'Cerrar'
			})
			
	}
		
		
}
function cargarOS(cve_req, num_doc, proveedor, clv_benefi){
	$('#CVE_DOC').val(cve_req);
	$('#txtdocumento').val(num_doc);
	$('#xBeneficiario').selectpicker('val',clv_benefi);
	$('#xBeneficiario').prop('disabled',true);
	$('#xBeneficiario').selectpicker('refresh');
	$('#beneficiarioxdocto').show();
	$('#div_benaficiarioFijo').hide();
	$('#cbotipocontrato').prop('disabled',true);
	$('#cbotipocontrato').selectpicker('refresh');
	var benefireturn =$('#xBeneficiario option:selected').text();
	$('#beneficiarioxdocto').html(benefireturn);
	swal.close();
}

function regresaPedido(cve_ped, num_ped, clv_benefi){
	
	$('#beneficiarioxdocto').show();
	$('#CVE_DOC').val(cve_ped);
	$('#txtdocumento').val(num_ped);
	$('#xBeneficiario').selectpicker('val',clv_benefi);
	$('#xBeneficiario').prop('disabled',true);
	$('#xBeneficiario').selectpicker('refresh');
	$('#cbotipocontrato').prop('disabled',true);
	$('#cbotipocontrato').selectpicker('refresh');
	var benefireturn =$('#xBeneficiario option:selected').text();
	$('#beneficiarioxdocto').html(benefireturn);
	swal.close();
}

/*------ Retorna los vales desde la vista muestraVales_tipo_contratos para cargarlos desde el presupuesto ------*/
function regresaVale(id_vale,num_vale,clv_benefi, comprobado,por_comprobar){
	$('#txtdocumento').val(num_vale);
	$('#CVE_DOC').val(id_vale);
	swal.close();
} 

function buscarBeneficiario(clv_benefi){
	alert('Este es el beneficiario que llevamos: ' +clv_benefi);
	ControladorContratosRemoto.getBeneficiarioContrato(clv_benefi,{
	  callback:function(items) {
				$('#txtbeneficiario').val(getHTML(items));
		} 					   				
		,
		errorHandler:function(errorString, exception) { 
			swal('',errorString, 'error');     
		}
	});
	
}
function getConceptos(){
	quitRow("listaConceptos");
	ControladorContratosRemoto.getConceptosContrato($('#CVE_CONTRATO').attr('value'), {
						   callback:function(items) { 
						   			
						   		if(items.length>0) {
									$('#cbotipocontrato').prop('disabled', true);
									$('#tipoGasto').prop('disabled', true);
									$('#cmdcerrar').prop('disabled', false);
									//$('#cmdcerrar').prop('disabled',true);
									cerrar = true;
									tabladetalles();
								}
								else{
									
									$('#cbotipocontrato').prop('disabled', false);
									$('#tipoGasto').prop('disabled', false);
									$('#cmdcerrar').prop('disabled', true);
									cerrar = false;
									
								}
						   		jQuery.each(items,function(i){
										pintarDetalles('listaConceptos', this);
								});
						   }
	});
}

/*funcion para pintar las filas de los subtotales*/
function pintarDetalles(table, obj){
	/*Primera fila*/
		var htmlCheck = "<input type='checkbox' name='chkConcepto' id='chkConcepto' value='"+obj.ID_DETALLE_COMPROMISO+"'>";
		appendNewRow(table,[ Td('', centro, '', '<div style ="height:18px">'+htmlCheck+"</div>"),
							 Td('', izquierda  , '', obj.DEPENDENCIA),
							 Td('', centro, '', obj.DESC_PERIODO),
							 Td('', centro, '', obj.N_PROGRAMA),
							 Td('', centro, '', obj.CLV_PARTID),
							 Td('', derecha, '', "$"+formatNumber(getHTML(obj.IMPORTE)))
						  ]);
}


function eliminarConcepto()
{
	 var checkMovimientos = [];
	 $('input[name=chkConcepto]:checked').each(function() { checkMovimientos.push($(this).val());});	
	 if (checkMovimientos.length>0){
		 
		 swal({
			  title: 'Eliminar conceptos?',
			  type: 'info',
			  showCancelButton: true,
			  showLoaderOnConfirm: true,
			  allowOutsideClick: false,
			  confirmButtonText: 'Sí, eliminar',
			  cancelButtonText:'No, abortar',
			  preConfirm: function() {
				 return new Promise(function(resolve, reject) {
					 setTimeout(function() {
						 resolve();
						 var numFilas = $('#listaConceptos > tbody > tr').length;
						 
						 ControladorContratosRemoto.eliminarConceptos($('#CVE_CONTRATO').val(), checkMovimientos, {
								callback:function(items) {
										if (items< 1){
											$('#cmdcerrar').addClass("btn_disable");
											$("#detalle").addClass("disabled");
										}
										nuevoConcepto(); 	
										getConceptos();
										
								},errorHandler:function(errorString, exception) { 
									swal(errorString,'error');          
								}
						});
					 }, 2000);
					 //swal({title:'Documentos eliminados con exito!!',showConfirmButton: false,timer:1000,type:"success"});
				});
			  },
			}).then(function (result) {
				    if (result.value) {
			        	swal({title:'Concluido con exito!!!!',allowOutsideClick: false,showConfirmButton: false,timer:1000,type:"success"});
			        }else
			        	swal({title:'Abortado!!!',text:'Proceso abortado, no realizó ningun cambio',allowOutsideClick: false,showConfirmButton: false,timer:1000,type:"info"});
			  
			})
	} 
	else 
	    swal('','Es necesario que seleccione por lo menos un concepto del listado', 'info');
}

function nuevoConcepto()
{
	$('#txtproyecto').val('');
	$('#ID_PROYECTO').val('');
	$('#txtpartida').val('');
	$('#txtpresupuesto').val('');
	$('#txtdisponible').val('');
	$('#txtimporte').val('');
}



/*Metodo para mostrar el reporte PDF del pedido*/
function getReportePedido(clavePed) {
	$('#clavePedido').attr('value',clavePed);
	$('#forma').attr('target',"impresion");
	$('#forma').submit();
	$('#forma').attr('target',"");
}

//Agregado por Abraham Gonzalez el 27-06-2017 para comprobacion de vales desde contratos ------------------
function costumFunction(){
	cargarBeneficiarioyPresupuestoVale();
}

function cargarBeneficiarioyPresupuestoVale()
{
	if($('#cbotipocontrato').val()==13)
		if($('#CVE_DOC').val()!=''&&$('#CVE_DOC').val()!='0')
			if($('#ID_PROYECTO').val()!=''&&$('#ID_PROYECTO').val()!='0')
				if($('#CLV_PARTID').val()!=''&&$('#CLV_PARTID').val()!='0')
				{
					//$('#trEntrada').hide();
					//buscamos el beneficiario
					ControladorContratosRemoto.getBeneficiarioContratos('VAL', $('#CVE_DOC').val(), {
							
							  callback:function(items){
											$('#txtbeneficiario').val()(items);
											 
						} 					   				
						,
							errorHandler:function(errorString, exception) { 
								jError(errorString,'Error');   
							}
						});	
						
				}
				
}