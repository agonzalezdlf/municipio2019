<!--<%@ page contentType="text/html;charset=utf-8"  %>-->
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE html>
<html>
<head>
<title>Capturar Factura</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">


<script type="text/javascript" src="../../include/js/jquery-2.1.3.min.js"></script>
<script type="text/javascript" src="../../include/js/bootstrap-3.3.7.js"></script>
<script type="text/javascript" src="../../include/js/jquery.form.js"></script>
<script type="text/javascript" src="../../dwr/interface/controladorFacturasRemoto.js?x=<%=System.currentTimeMillis()%>"> </script>
<script type="text/javascript" src="../../dwr/engine.js"> </script>
<script type="text/javascript" src="../../dwr/util.js"> </script>
<script type="text/javascript" src="../../dwr/interface/controladorProyectoPartida.js?x=<%=System.currentTimeMillis()%>"> </script>
<script type="text/javascript" src="captura_factura.js?x=<%=System.currentTimeMillis()%>"></script>
<script type="text/javascript" src="../../include/js/presupuesto/presupuesto.js?x=<%=System.currentTimeMillis()%>"></script>
<script type="text/javascript" src="../../include/js/sweetalert2/7.0/sweetalert2.all.js"></script>
<script type="text/javascript" src="../../include/js/sweetalert2/7.0/core-js-2.4.1.js"></script>
<script type="text/javascript" src="../../include/js/toolSam.js?x=<%=System.currentTimeMillis()%>"></script> 
<script type="text/javascript" src="../../include/js/fileinput.min.js"></script>
<link rel="stylesheet" href="../../include/css/bootstrap-3.3.7.css" type="text/css">
<link rel="stylesheet" href="../../include/css/bootstrap2.css" type="text/css"/>
<link rel="stylesheet" href="../../include/css/style-tabs.css" type="text/css"/>
<link rel="stylesheet" href="../../include/css/fileinput.min.css" type="text/css"/>
<link rel="stylesheet" href="../../include/css/boostrap-select/dist/css/bootstrap-select.css" type="text/css">
<script type="text/javascript" src="../../include/css/boostrap-select/dist/js/bootstrap-select.js"></script>
<script type="text/javascript" src="../../include/css/bootstrap-datetimepicker-master/js/moment-with-locales-2.9.0.js"></script>
<link rel="stylesheet" href="../../include/css/bootstrap-datetimepicker-master/css/bootstrap-datetimepicker-4.15.35.css" type="text/css">
<script type="text/javascript" src="../../include/css/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker-4.15.35.js"></script>
<link rel="stylesheet" href="../../include/js/sweetalert2/7.0/sweetalert2.min.css" type="text/css">
<link rel="stylesheet" href="../../include/css/style-tabs.css" type="text/css"/>
<script type="text/javascript" src="../../include/js/jquery-impromptu.2.3.js"></script>
<script type="text/javascript" src="../../dwr/interface/autocompleteDiversosRemoto.js"> </script>
<script type="text/javascript" src="../../include/js/autocomplete/autompleteVarios.js"></script>
<script type="text/javascript" src="../../include/js/otros/productos.js"></script>

<style type="text/css">
a:link {
	text-decoration: none;
	color: #06C;
}
a:visited {
	text-decoration: none;
}
a:hover {
	text-decoration: underline;
}
a:active {
	text-decoration: none;
}
</style>

</head>
<body>

	<h1 class="h1-encabezado">Facturas - Captura de nueva factura</h1>
 
<form method="post" enctype="multipart/form-data" name="frmEntrada" id="frmEntrada" >


    
       <div class="col-sm-12">
            <div class="panel with-nav-tabs panel-primary">
                <div class="panel-heading">
                        <ul class="nav nav-tabs">
                            <li class="active"><a href="#tab1primary" data-toggle="tab">Encabezado</a></li>
                            <li><a href="#tab2primary" data-toggle="tab">Movimientos</a></li>
                            <li><a href="#tab3primary" data-toggle="tab">Retenciones</a></li>
                            <li><a href="#tab4primary" data-toggle="tab">Vales</a></li>
                        </ul>
                </div>
                <div class="panel-body">
                    <div class="tab-content">
                        <div class="tab-pane fade in active" id="tab1primary">
                        	<form class="form-horizontal">
    	 	 		 		 <input type="hidden" id="CVE_FACTURA" name="CVE_FACTURA"  value="${factura.CVE_FACTURA}"/>
    	 	 		 		<!-- Unidad administrativa-->
    	 	 		 		<div class="row">
    	 	 		 			<div class="form-group">
									<div class="col-sm-2 col-md-offset-1 control-label">Unidad administrativa:</div>
									<div class="col-md-4">	
									    <sec:authorize ifNotGranted="ROLE_Sam_PRIVILEGIOS_VER_TODAS_LAS_UNIDADES">
							      			<c:out value="${nombreUnidad}"/><input type="hidden" name="cbUnidad" id="cbUnidad" value='<c:out value="${idUnidad}"/>' />
							      		</sec:authorize>
							       		<sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_VER_TODAS_LAS_UNIDADES">
							       			<select name="cbUnidad" class="selectpicker form-control input-sm m-b" data-live-search="true" id="cbUnidad">
							            		<c:forEach items="${unidadesAdmiva}" var="item" varStatus="status">                  
							              			<option value="<c:out value="${item.ID}"/>" 
							              			<c:if test="${item.ID==idUnidad}"> selected </c:if> >
							             			<c:out value="${item.DEPENDENCIA}"/></option>
							           			</c:forEach>
							          		</select>
							        	</sec:authorize>
							        </div>
							        <div class="form-group col-sm-6">&nbsp;</div>
     							</div>
    	 	 		 		</div>
    	 	 		 		
							<!-- Documento anterior-->
		                    <div class="row">
		                      <div class="form-group">
		                        <div class="control-label col-sm-3">*A partir de presupuesto:</div>
		                        <div class="col-sm-3 form-group">
		                            <select name="cbotipodocumento" class="selectpicker form-control input-sm m-b" id="cbotipodocumento" style="width:100%">
		                             	 <option value="0">[Seleccione]</option>
          								 <c:forEach items="${tipoDocumentosFAC}" var="item" varStatus="status"> 
          								 	<option value='<c:out value="${item.ID_TIPO_FAC}"/>' 
							                <c:if test='${item.ID_TIPO_FAC==factura.ID_TIPO}'> selected </c:if>>
							                <c:out value='${item.DESCRIPCION}'/>
							                </option>
						                </c:forEach>
		                            </select>
		                        </div>
		                        <div class="form-group col-sm-6">&nbsp;</div>
		                      </div>
		                    </div>
		                    <!-- Fin Documento anterior-->
		                    <input name="CVE_DOC" type="hidden" id="CVE_DOC" value="${factura.CVE_PED}${factura.CVE_REQ}${factura.CVE_CONTRATO}"/> 
					        <input name="CLV_BENEFI" type="hidden" id="CLV_BENEFI" value="${factura.CLV_BENEFI}"/>
					        <input name="ID_ENTRADA" type="hidden" id="ID_ENTRADA" value="<c:out value='${factura.ID_ENTRADA}'/>"/>
					        <input name="ID_PROYECTO" type="hidden" id="ID_PROYECTO" value="${factura.ID_PROYECTO}"/>
					        <input name="CLV_PARTID" type="hidden" id="CLV_PARTID" value="${factura.CLV_PARTID}"/>
		                    <!--Número de documento-->
		                    <div id="ndocumento">
			                <div class="row">
			                    <div class="form-group">
			                        <div class="control-label col-sm-3 ">*Número de documento:</div>
			                        <div class="form-group col-sm-2">
			                            <div class="input-group">
											<input type="text" class="form-control" placeholder="Documento" name="txtdocumento" id="txtdocumento" onBlur="upperCase(this)" value="${factura.NUM_REQ}${factura.NUM_PED}${factura.NUM_VALE}${factura.NUM_CONTRATO}" >
											<div class="input-group-btn">
											    <button class="btn btn-info" type="button" id="img_movimiento"><i class="glyphicon glyphicon-search"  ></i></button>
											    <button class="btn btn-danger" type="button" id="img_detele"><i class="glyphicon glyphicon-remove"  ></i></button>
											</div>
										</div>
			                        </div>
			                    </div>
			                </div>
			                </div>
			                <!--Número de Entrada-->
			                <div id="nentrada">
				            <div class="row">
				            	<div class="form-group">
				                	<div class="control-label col-sm-3 ">&nbsp;*N&uacute;mero de entrada:</div>
				                    	<div class="col-sm-2">
											<div id="div_num_entrada" align="left">${factura.FOLIO_ENTRADA}</div>
										</div>
								</div>
				           </div>
				           </div>
			                <!--Total factura-->
				            <div class="row">
				            	<div class="form-group">
				                	<div class="control-label col-sm-3 ">Total documento:</div>
				                    	<div class="col-sm-2">
											<div id="div_total_entrada" align="left">$<fmt:formatNumber value="${factura.TOTAL_DOC}"  pattern="#,###,###,##0.00" /></div>
										</div>
								</div>
				           </div>
			               <!--Beneficiario -->
			               
		                   <div class="row">
		                   <div class="form-group">
		                    	<div class="control-label col-sm-3 ">Prestador del servicio:</div>
		                    		<div id="div_beneficiario" align="left">${factura.NCOMERCIA}</div>
		                        	<div class="form-group col-sm-3" id="div_benaficiarioFijo">
		                        		<select class="selectpicker form-control input-sm" data-live-search="true" style="width:100%" id="cboSearch" name="cboSearch" title="Seleccione un Beneficiario...">
									   		<c:forEach items="${beneficiarios}" var="item" varStatus="status">
								      		<option value='<c:out value="${item.CLV_BENEFI}"/>'
								   	 			<c:if test='${item.CLV_BENEFI==factura.CLV_BENEFI}'>selected</c:if>><c:out value='${item.NCOMERCIA}'/>
								      		</option>
											</c:forEach>    
										</select>
										<input type="hidden" id="CVE_BENEFI" value="<c:out value='${factura.CLV_BENEFI}'/>"/>
									</div>	  
							</div>
		                  	</div>
		                  	
				            <!--Fecha devengado-->
				            <div class="row">
				            	<div class="form-group">
				                	<div class="control-label col-sm-3 ">Fecha devengado:</div>
				                    	<div class="col-sm-2">
											<fmt:formatDate pattern="dd/MM/yyyy" value="${FECHA_DEVENGADO}" />
										</div>
										
				                </div>
				           </div>
				           <!--Fecha recepción-->
				            <div class="row">
				            	<div class="form-group" style="padding-bottom:15px;padding-top: 10px;">
				                	<div class="control-label col-sm-3 ">*Fecha recepción:</div>
				                    	<div class="col-sm-2">
											<input type="text" id="txtfecha"  name="txtfecha" class="form-control sm" style="width:100px" maxlength="10" value="${factura.FECHA_DOCUMENTO}" />
										</div>
								</div>
				           </div>
				           <!--Número factura-->
				           <div class="row">
				            	<div class="form-group" style="padding-bottom:15px;padding-top: 10px;">
				                	<div class="control-label col-sm-3 ">&nbsp;*N&uacute;mero de Factura:</div>
				                    	<div class="col-sm-2">
				                    		<input name="txtnumfactura" type="text" class="form-control sm" onBlur="upperCase(this)" id="txtnumfactura" maxlength="20" style="width:170px" value="<c:out value='${factura.NUM_FACTURA}'/>" />
										</div>
								</div>
				           </div>
				           <!--Notas-->
				           <div class="row">
				            	<div class="form-group" style="padding-bottom:15px;padding-top: 10px;">
				                	<div class="control-label col-sm-3 ">&nbsp;Notas:</div>
				                    	<div class="col-sm-2">
				                    		<textarea name="txtobservacion" cols="70" rows="3" style="width:400px" class="form-control sm" onBlur="upperCase(this)" id="txtobservacion"><c:out value='${factura.NOTAS}'/></textarea>
				                    	</div>
								</div>
				           </div>
				           <!--XML-->
				           <div class="row" style="padding-bottom:15px;padding-top: 10px;">
				            	<div class="form-group">
				                	<div class="control-label col-sm-3 ">&nbsp;Archivo:</div>
				                    	<div class="col-sm-2">
				                    		<input type="file" class="input-file" id="archivo" name="archivo" style="width:445px" />
										</div>
								</div>
						   </div>
				           <div class="row">
				           		<div class="form-group" style="padding-bottom:15px;padding-top: 10px;">
									<div class="col-sm-6 col-sm-offset-3" >
										<table width="80%" class="listasDetalles table table-hover" id="listasArchivo">
								        <thead>
								          <tr >
								            <th width="59%" height="20"  align="center">Archivo</th>
								            <th width="16%"  align="center">Tamaño</th>
								            <th width="14%"  align="center">Tipo</th>
								            <th width="6%"  align="center">&nbsp;</th>
								          </tr>
								        </thead>
								        <tbody>
								        </tbody>
								    	</table>
								    </div>
							    </div>
				           </div>
				           <!--XML-->
				           <div class="row">
				            	<div class="form-group">
				                	<div class="control-label col-sm-3 "></div>
				                    	<div class="col-sm-2">
				                    		<input name="cmdnuevo" id="cmdnuevo" type="button" class="btn btn-primary" value="Nuevo">
            								<input name="cmdcerrar" id="cmdcerrar" type="button" class="btn btn-danger" disabled="disabled"    value="Cerrar">
            								<input name="cmdguardar" id="cmdguardar" type="button" class="btn btn-success" value="Guardar">
										</div>
								</div>
								
				           </div>
    	 	 		 	</form>
                        </div>
                        <div class="tab-pane fade" id="tab2primary">
                        	<form class="form-horizontal">
					 			<!-- Unidad administrativa-->
	    	 	 		 		<div class="row">
	    	 	 		 			<div class="form-group">
										<div class="col-sm-2 col-md-offset-1 control-label">Presupuesto de la Unidad</div>
										<div class="col-md-4">	
										    <sec:authorize ifNotGranted="ROLE_Sam_PRIVILEGIOS_VER_TODAS_LAS_UNIDADES">
								      			<c:out value="${nombreUnidad}"/><input type="hidden" name="cbUnidad2" id="cbUnidad2" value='<c:out value="${idUnidad}"/>' />
								      		</sec:authorize>
								       		<sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_VER_TODAS_LAS_UNIDADES">
								       			<select name="cbUnidad2" class="selectpicker form-control input-sm m-b" data-live-search="true" id="cbUnidad2">
								            		<c:forEach items="${unidadesAdmiva}" var="item" varStatus="status">                  
								              			<option value="<c:out value="${item.ID}"/>" 
								              			<c:if test="${item.ID==idUnidad}"> selected </c:if> >
								             			<c:out value="${item.DEPENDENCIA}"/></option>
								           			</c:forEach>
								          		</select>
								        	</sec:authorize>
								        </div>
								        <div class="form-group col-sm-6">&nbsp;</div>
	     							</div>
	    	 	 		 		</div>
	    	 	 		 		  <!--Mes presupuesto-->
				                  <div class="row">
				                    <div class="form-group">
				                        <label class="col-sm-2 col-md-offset-1 control-label" for="cbomeses">*Mes:</label>
										<div class="col-md-4">
											<div class="input-group">
												<select name="cbomeses" class="form-control" name="cbomes" id="cbomes">
											       	<option value="0">[Seleccione]</option>
											            <c:forEach items="${mesesActivos}" var="item" varStatus="status">
											         <option value="<c:out value='${item.ID_MES}'/>" >
											            <c:out value="${item.DESCRIPCION}"/>
											         </option>
											            </c:forEach>
												</select>
												
				    						</div>		
										</div><!-- cierra el col-sm-2 del cbomeses -->
									</div>
				                  </div>
				                  <!--Programa, Partida tr_ProgramaPartidaPresupuesto-->
				                  <div id="input_ProgramaPartidaPresupuesto">
				                  <div class="row" style="border-bottom:15px !important;">
				                    <div class="form-group">
				                        <div class="control-label col-sm-3 ">*Programa:</div>
				                         <div class="col-sm-2">
				                         		<input type="hidden" id="ID_PROYECTO" value="0"/>
												<input placeholder="Proyecto" type="text" class="form-control sm" value='' name="txtproyecto" id="txtproyecto" maxlength="6" style="margin-bottom: 8px;"/>
											</div>
											<label class="control-label col-sm-1" for="txtproyecto">*Partida:</label>
											<div class="col-sm-2">
												<div class="input-group">
													<input type="text" class="form-control" placeholder="Partida" name="txtpartida" id="txtpartida" value="" >
													<div class="input-group-btn">
											    		<button class="btn btn-info" type="button" id="img_presupuesto" onclick="muestraPresupuesto()"><i class="glyphicon glyphicon-search"  ></i></button>
											    	</div>
												</div>
											</div>
				                     </div>
				                  </div>
				                  </div>
				                  <!--Select Proyecto/Partida tr_ProyectoPartida-->
				                  <div id="cbo_ProyectoPartida">
				                  <div class="row">
				                    <div class="form-group">
				                    	<div class="col-sm-2 col-md-offset-1 control-label">*Programa/Partida:</div>
				                       	<div class="col-md-4">
											<div class="input-group">
												<select name="cboproyectopartida" class="form-control" id="cboproyectopartida" style="width:445px">
								                    <c:forEach items="${ProyectoPartida}" var="item" varStatus="status">
								                      <option value="<c:out value='${item.ID_PROYECTO}'/>,<c:out value='${item.N_PROGRAMA}'/>,<c:out value='${item.CLV_PARTID}'/>" >
								                        [<c:out value='${item.ID_PROYECTO}'/>]<c:out value='${item.N_PROGRAMA}'/> - <c:out value='${item.CLV_PARTID}'/>
								                      </option>
								                    </c:forEach>
								                 </select>
											</div>		
										</div>
									</div>
				                  </div>
				                  </div>
				                  <!--Termina Select Proyecto/Partida-->
				                  <!--Presupuesto, Disponible-->
				                  <div class="row">
				                    <div class="form-group">
				                        <div class="control-label col-sm-3 ">Presupuesto:</div>
				                      		<div class="col-sm-2">
												<input type="text" placeholder="Presupuesto" name="txtpresupuesto" id="txtpresupuesto" class="form-control sm" disabled="disabled" style="margin-bottom: 8px;" />
											</div>
											<label class="control-label col-sm-1" for="txtdisponible">*Disponible:</label>
											<div class="col-sm-2">
												<input type="text" placeholder="Disponible" id="txtdisponible" data-disponible="" name="txtdisponible" class="form-control sm" disabled="disabled" />
											</div>
				                    </div>
				                  </div>
				                  <!--Observaciones-->
				                  <div class="row">
				                    <div class="form-group">
				                        <div class="control-label col-sm-3 ">Observaciones:</div>
				                      		<div class="col-sm-2">
												<textarea name="txtdetalle" id="txtdetalle" cols="80" rows="4" wrap="virtual" class="form-control sm" maxlength="500" style="width:445px"></textarea>
											</div>
										</div>
				                  </div>
				                  <!--Observaciones-->
				                  <div class="row">
				                    <div class="form-group">
				                        <div class="control-label col-sm-3 ">Importe:</div>
				                      		<div class="col-sm-2">
												<input name="txtimporteDet" type="text" class="form-control sm" id="txtimporteDet" onkeypress="return keyNumbero(event); " />
                      							<input type="hidden" id="ID_DETALLE" value="0"/>
                    							<input type="hidden" id="IMPORTE_TOTAL" value="0"/>
											</div>
										</div>
				                  </div>
				                  <!--Observaciones-->
				                  <div class="row">
				                    <div class="form-group">
				                        <div class="control-label col-sm-3 "></div>
				                      		<div class="col-sm-2">
												<input name="cmdagregar" id="cmdagregar" title="Limpia valores para continuar con nuevo Vale." type="button" class="btn btn-success" value="Agregar">
												<input name="cmdnuevoconcepto" id="cmdnuevoconcepto" onClick="limpiar()" title="Limpia valores para continuar con nuevo Vale." type="button" class="btn btn-primary" value="Nuevo">
											</div>
										</div>
				                  </div>
				                  <!--Observaciones-->
				                  <div class="row">
				                    <div class="form-group">
				                        <div class="control-label col-sm-3 "></div>
				                      		<div class="col-sm-6">
												<table width="100%" border="0"  align="center" class="table table-hover" id="listaDetalles">
								                  <thead>
								                    <tr >
								                      <th width="4%" height="20"  align="center"><img src="../../imagenes/cross.png" width="16" height="16" onclick="eliminarDetalles()" style='cursor: pointer;' /></th>
								                      <th width="28%"  align="center">Unidad Administrativa</th>
								                      <th width="31%"  align="center">Notas</th>
								                      <th width="12%"  align="center">Programa</th>
								                      <th width="10%" align="center">Partida<input type="hidden" id="TOTAL_CONCEPTOS" value="0"></th>
								                      <th width="12%"  align="center">Importe</th>
								                      <th width="3%"  align="center">&nbsp;</th>
								                    </tr>
								                  </thead>
								                  <tbody>
								                  </tbody>
								                </table>
											</div>
										</div>
				                  </div>
				                   <!--Observaciones-->
				                  <div class="row">
				                    <div class="form-group">
				                        <div class="control-label col-sm-1 col-md-offset-7 ">IVA:</div>
				                      		<div class="col-sm-2">
												<input name="txtiva" type="text" class="form-control sm" id="txtiva" maxlength="20" style="width:140px" value="<fmt:formatNumber value='${factura.IVA}' pattern='##########.00' />"/>
											</div>
										</div>
				                  </div>
				                    <!--Presupuesto, Disponible-->
				                  <div class="row">
				                    <div class="form-group">
				                        <div class="control-label col-sm-1 col-md-offset-5"></div>
				                      		<div class="col-sm-1">
												<input name="cmdguardar2" id="cmdguardar2" type="button" class="btn btn-success" value="Guardar">
											</div>
											<label class="control-label col-sm-1" for="txtdisponible">Subtotal:</label>
											<div class="col-sm-2">
												<input name="txtsubtotal" type="text" class="form-control sm" id="txtsubtotal" maxlength="10" style="width:140px" value="<fmt:formatNumber value='${factura.SUBTOTAL}' pattern='##########.00' />"/>
											</div>
				                    </div>
				                  </div>
				                  <div class="row">
				                    <div class="form-group">
				                        <div class="control-label col-sm-1 col-md-offset-7 ">Total:</div>
				                      		<div class="col-sm-2">
												<div id="div_total">0.00</div>
											</div>
										</div>
				                  </div>
					 		</form>
                        </div>
                        <div class="tab-pane fade" id="tab3primary">
                        	<form class="form-horizontal">
                        		<!--Observaciones-->
				                <div class="row">
				                	<div class="form-group">
				                    	<div class="control-label col-sm-3 ">*Retencion:</div>
				                      	<div class="col-sm-2">
											<select name="retencion" class="form-control sm" id="retencion" style="width:500px">
									          <c:forEach items="${tipoRetenciones}" var="item" varStatus="status">
									            <option value="<c:out value='${item.CLV_RETENC}'/>">
									              <c:out value="${item.RETENCION}"/>
									              </option>
									          </c:forEach>
									        </select>
									        <input type="hidden" name="idRetencion" id="idRetencion">
										</div>
									</div>
				                 </div>
				                 <!--Observaciones-->
				                <div class="row">
				                	<div class="form-group">
				                    	<div class="control-label col-sm-3 ">*Importe:</div>
				                      	<div class="col-sm-2">
											<input name="importeRetencion" type="text" class="form-control sm" id="importeRetencion" onkeypress="return keyNumbero( event );">
										</div>
									</div>
				                 </div>
				                  <!--Observaciones-->
				                <div class="row">
				                	<div class="form-group">
				                    	<div class="control-label col-sm-3 "></div>
				                      	<div class="col-sm-2">
											<input name="cmdNuevaRetencion" id="cmdNuevaRetencion" type="button" class="btn btn-primary" value="Nueva Retención">
											<input name="cmdGuardarRetencion" id="cmdGuardarRetencion" type="button" class="btn btn-success" value="Guardar Retención">
										</div>
									</div>
				                 </div>
				                  <!--Observaciones-->
				                <div class="row">
				                	<div class="form-group">
				                    	<div class="control-label col-sm-3 "></div>
				                      	<div class="col-sm-6">
											<table width="100%" border="0"  align="center" cellpadding="0" cellspacing="0" class="listasDetalles table table-hover" id="listasRetenciones">
									        <thead>
									          <tr >
									            <th width="3%" height="20"><img src="../../imagenes/cross.png" width="16" height="16" onClick="eliminarRetencion()" style='cursor: pointer;'></th>
									            <th width="67%"  align="center">Retención</th>
									            <th width="23%" align="center">Importe</th>
									            <th width="7%" align="center"></th>
									          </tr>
									        </thead>
									        <tbody>
									        </tbody>
									      </table>
										</div>
									</div>
				                 </div>
				                 
                        	</form>
                        </div>
                        <div class="tab-pane fade" id="tab4primary">
							<!--Proyecto del Vale-->
			                <div class="row">
			                	<div class="form-group">
			                    	<div class="control-label col-sm-3 ">*Proyecto Cuenta:</div>
			                      	<div class="col-sm-2">
										<select name="cboproyectocuenta" class="form-control sm" id="cboproyectocuenta" onChange="cargarVales(0)" style="width:222px">
               							</select>
               							<p id="demo"></p>
               							<input type="hidden" name="idVale" id="idVale">
                  						<input type="hidden" name="claveVale" id="claveVale">
                  						<input type="hidden" name="importeAntVale" id="importeAntVale" value="0">
									</div>
								</div>
			                 </div>
			                 <!--Número del vale-->
			                <div class="row">
			                	<div class="form-group" style="padding-bottom:15px;padding-top: 10px;">
			                    	<div class="control-label col-sm-3 ">*Número de Vale:</div>
			                      	<div class="col-sm-2">
										<select name="cboVales" class="form-control sm" id="cboVales"  style="width:222px">
                    					</select>
               							
									</div>
								</div>
			                 </div>
			                 <!--Importe del vale-->
			                 <div class="row">
			                	<div class="form-group" style="padding-bottom:15px;padding-top: 10px;">
			                    	<div class="control-label col-sm-3 ">*Importe:</div>
			                      	<div class="col-sm-2">
										<input name="txtimporteVale" type="text" class="form-control sm" id="txtimporteVale" onkeypress=" return keyNumbero( event );"  style="width:222px">
               							
									</div>
								</div>
			                 </div>
			                  <div class="row">
			                	<div class="form-group" style="padding-bottom:15px;padding-top: 10px;">
			                    	<div class="control-label col-sm-3 "></div>
			                      	<div class="col-sm-2">
										<input name="cmdNuevoVale" id="cmdNuevoVale" onClick="lipiarVale();" type="button" class="btn btn-primary" value="Nuevo Vale">
               							<input name="cmdGuardarVale" id="cmdGuardarVale" onClick="guardarVale();" type="button" class="btn btn-success" value="Guardar Vale">
									</div>
								</div>
			                 </div>
			                  <div class="row">
			                	<div class="form-group" style="padding-bottom:15px;padding-top: 10px;">
			                    	<div class="control-label col-sm-3 "></div>
			                      	<div class="col-sm-6">
										<table width="100%" class="listasDetalles table table-hover" id="listasVales">
								           <thead>
								             <tr >
								               <th width="7%" height="20"  align="center"><img src="../../imagenes/cross.png" alt="" width="16" height="16" onClick="eliminarVales()" style="cursor:pointer"></th>
								               <th width="20%"  align="center">Proyecto</th>
								               <th width="21%" align="center">Partida</th>
								               <th width="22%"  align="center">Numero Vale</th>
								               <th width="22%"  align="center">Importe Comprobado</th>
								               <th width="8%"  align="center">&nbsp;</th>
								               </tr>
								             </thead>
								           <tbody>
								             </tbody>
            							</table>
									</div>
								</div>
			                 </div>
			                 
						</div>
                        
                    </div>
                </div>
            </div>
        </div>
	




</form>
</body>
</html>
