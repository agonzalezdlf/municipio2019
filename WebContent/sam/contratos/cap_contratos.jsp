<%@ page contentType="text/html;charset=utf-8"  %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<script type="text/javascript" src="../../include/js/jquery-2.1.3.min.js"></script>
<script type="text/javascript" src="../../include/js/bootstrap-3.3.7.js"></script>
<script type="text/javascript" src="../../include/js/jquery.form.js"></script>
<script type="text/javascript" src="../../include/js/sweetalert2/7.0/sweetalert2.all.js"></script>
<script type="text/javascript" src="../../include/js/sweetalert2/7.0/core-js-2.4.1.js"></script>

    <script type="text/javascript" src="../../include/js/toolSam.js?x=<%=System.currentTimeMillis()%>"></script>
    <script type="text/javascript" src="../../include/js/presupuesto/presupuesto.js?x=<%=System.currentTimeMillis()%>"></script>
    <script type="text/javascript" src="../../dwr/interface/ControladorContratosRemoto.js"> </script>
	<script type="text/javascript" src="../../dwr/interface/controladorProyectoPartida.js"> </script>
    <script type="text/javascript" src="../../dwr/interface/autocompleteDiversosRemoto.js"> </script>   
    <script type="text/javascript" src="../../dwr/engine.js"> </script>
    <script type="text/javascript" src="cap_contratos.js?x=<%=System.currentTimeMillis()%>"></script>
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
<!--  
	<link rel="stylesheet" href="../../include/css/estilosam.css" type="text/css">
    <link rel="stylesheet" href="../../include/js/componentes/jquery.alerts.css" type="text/css">
      <link rel="stylesheet" href="../../include/js/sweetalert2/7.0/sweetalert2.min.css" type="text/css">
      
	<script type="text/javascript" src="../../include/js/jquery-1.3.2.min.js"></script>
    <script type="text/javascript" src="../../include/js/jquery-impromptu.2.3.js"></script>
    <script type="text/javascript" src="../../include/js/jquery.form.js"></script>
    <script type="text/javascript" src="../../include/js/componentes/jquery.alerts.js"></script>
    <script type="text/javascript" src="../../include/js/autocomplete/jquery.autocomplete.js"></script>
    <script type="text/javascript" src="../../include/js/autocomplete/autompleteVarios.js"></script> 

    <script type="text/javascript" src="../../include/js/jquery-ui-1.7.3.custom.min.js"></script>
    
   
    
    <script type="text/javascript" src="../../include/js/jquery.maxlength.js"></script>
    <script type="text/javascript" src="../../include/js/jquery.bestupper.min.js"></script>

    <script type="text/javascript" src="../../include/js/otros/productos.js"></script>
    <script type="text/javascript" src="../../include/js/sweetalert2/7.0/sweetalert2.all.js"></script>
    <link rel="stylesheet" href="../../include/css/css/css3-buttons.css" type="text/css" media="screen">
    <link rel="stylesheet" href="../../include/css/tiptip.css" type="text/css"  media="screen">
    <script src="../../include/css/jquery.tiptip.js"></script>

    <link rel="stylesheet" href="../../include/css/black-tie/jquery-ui-1.7.3.custom.css" type="text/css" />
    <link rel="stylesheet" href="../../include/js/autocomplete/jquery.autocomplete.css" type="text/css" />
    <link rel="stylesheet" href="../../include/js/jquery.tabs/jquery.tabs.css" type="text/css" media="print, projection, screen">-->
   	<!--
   	<link rel="stylesheet" href="../../include/css/boostrap-select/dist/css/bootstrap-select.css" type="text/css">
	<script type="text/javascript" src="../../include/css/boostrap-select/dist/js/bootstrap-select.js"></script> 
	<script type="text/javascript" src="../../include/css/bootstrap-datetimepicker-master/js/moment-with-locales-2.9.0.js"></script>
	<link rel="stylesheet" href="../../include/css/bootstrap-datetimepicker-master/css/bootstrap-datetimepicker-4.15.35.css" type="text/css">
	<script type="text/javascript" src="../../include/css/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker-4.15.35.js"></script>
   	 -->
	
    <!-- Additional IE/Win specific style sheet (Conditional Comments) -->
    <!--[if lte IE 7]>
    <link rel="stylesheet" href="../../include/js/jquery.tabs/jquery.tabs-ie.css" type="text/css" media="projection, screen">
    <![endif]-->
    <style type="text/css"> 
        @import url("../../include/css/calendar/calendar-win2k-cold-1.css"); 
    a:link {
	color: #00F;
	text-decoration: none;
}
a:visited {
	text-decoration: none;
	color: #603;
}
a:hover {
	text-decoration: underline;
}
a:active {
	text-decoration: none;
}
.disable{
	opacity: .5;
    cursor: not-allowed;
}
    </style>
<title>Contratos - Captura de Contrato</title>

</head>

<body>

<form name="forma" id="forma"  method="post" enctype="multipart/form-data">
<input type="hidden" name="clavePedido" id="clavePedido"  value="">

<h1 class="h1-encabezado">&nbsp;Contrato - Captura de Contrato</h1>
<c:out value='${modelo.NUM_REQ}'/>


	<div class="col-sm-12" id="tabuladores">
		<div class="panel with-nav-tabs panel-primary">
			<div class="panel-heading">
            	<ul class="nav nav-tabs">
                	<li class="active"><a href="#tab1primary" data-toggle="tab">Información general</a></li>
                    <li><a href="#tab2primary" data-toggle="tab">Conceptos</a></li>
                </ul>
            </div>
             <div class="panel-body">
             	 <div class="tab-content">
             	 	<div class="tab-pane fade in active" id="tab1primary">
             	 		<strong>Nota:</strong> La información marcada con (*) es requerida. 
             	 		<input type="hidden" id="CVE_CONTRATO"  name="CVE_CONTRATO" value="<c:out value='${cve_contrato}'/>"/>
             	 		<!-- Informacion general-->
             	 		<div class="form-horizontal">
             	 			<!-- Unidad administrativa-->
    	 	 		 		<div class="row">
    	 	 		 			<div class="form-group">
									<div class="control-label col-sm-3 control-label">Unidad administrativa:</div>
									<div class="form-group col-md-4">	
									    <sec:authorize ifNotGranted="ROLE_Sam_PRIVILEGIOS_VER_TODAS_LAS_UNIDADES">
							      			<c:out value="${nombreUnidad}"/><input type="hidden" name="cbUnidad" id="cbUnidad" value='<c:out value="${idUnidad}"/>' />
							      		</sec:authorize>
							       		<sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_VER_TODAS_LAS_UNIDADES">
							       			<select name="cbUnidad" class="selectpicker form-control input-sm m-b" data-live-search="true" id="cbUnidad">
							            		<option value="0">[Seleccione]</option>
							            		<c:forEach items="${unidadesAdmiva}" var="item" varStatus="status">                  
							              			<option value="<c:out value="${item.ID}"/>" 
							              			<c:if test="${item.ID==idUnidad}"> selected </c:if> >
							             			<c:out value="${item.DEPENDENCIA}"/></option>
							           			</c:forEach>
							          		</select>
							        	</sec:authorize>
							        </div>
							     </div>
    	 	 		 		</div>
    	 	 		 		<!-- Tipo Contrato-->
		                    <div class="row">
		                      <div class="form-group">
		                        <div class="control-label col-sm-3">*Tipo de Contrato:</div>
		                        <div class="form-group col-sm-3">
		                            <select name="cbotipocontrato" class="selectpicker form-control input-sm m-b" id="cbotipocontrato" style="width:195px">
				                      <option value="0">[Seleccione]</option>
				                      <c:forEach items="${tipoContratos}" var="item">
				                        <option value='<c:out value="${item.ID_TIPO}"/>' <c:if test='${item.ID_TIPO==Contrato.ID_TIPO}'> selected </c:if>>
				                          <c:out value='${item.DESCRIPCION}'/>
				                        </option>
				                      </c:forEach>
				                    </select>
		                        </div>
		                      </div>
		                    </div>
		                    <!-- Numero Contrato-->
    	 	 		 		<div class="row">
			                    <div class="form-group">
			                        <div class="control-label col-sm-3 ">*No. Contrato:</div>
			                        <div class="form-group col-sm-2">
			                            <input type="text" class="form-control" placeholder="Numero Contrato" name="txtnumcontrato" id="txtnumcontrato" onBlur="upperCase(this)" value="${Contrato.NUM_CONTRATO}"/>
									</div>
			                    </div>
			                </div>
		                    <!-- Tipo de Gasto-->
		                    <div class="row">
		                      <div class="form-group">
		                        <div class="control-label col-sm-3">*Tipo de gasto:</div>
		                        <div class="form-group col-sm-5">
		                            <select name="tipoGasto" class="selectpicker form-control input-sm m-b" data-live-search="true" id="tipoGasto" style="width:400px">
				                      <option value="0">[Seleccione]</option>
				                        <c:forEach items="${tipoGastos}" var="item" varStatus="status">
				                          <option value="<c:out value='${item.ID}'/>" <c:if test='${item.ID==Contrato.ID_RECURSO}'> selected </c:if>>
				                            <c:out value="${item.RECURSO}"/>
				                          </option>
				                        </c:forEach>
				                      </select>
		                        </div>
		                      </div>
		                    </div>
		                   <!--Beneficiario -->
			               <div class="row">
		                   <div class="form-group">
		                    	<div class="control-label col-sm-3 ">Prestador del servicio:</div>
		                    	<div id="div_beneficiario" align="left">${Contrato.NCOMERCIA}</div>
		                        <div class="form-group col-sm-3" id="div_benaficiarioFijo">
		                        <select name="xBeneficiario" class="selectpicker form-control input-sm m-b" data-live-search="true" id="xBeneficiario" style="width:100%">
			                              <option value="0">[Seleccione]</option>
			                              <c:forEach items="${beneficiarios}" var="item" varStatus="status">
			                                    <option value='<c:out value="${item.CLV_BENEFI}"/>'
			                                    <c:if test='${item.CLV_BENEFI==xBeneficiario}'>selected</c:if>><c:out value='${item.NCOMERCIA}'/>
			                              </c:forEach>
			                            </select>
								<input type="hidden" id="CVE_BENEFI" value="0" />
								</div>	  
							</div>
		                  	</div>
		                  	<!--Documento Contratando-->
		                  	<div class="row" id="doctol">
			                    <div class="form-group ">
			                        <div class="control-label col-sm-3 ">*Número de documento:</div>
			                        <div class="form-group col-sm-2">
			                            <div class="input-group">
											<input type="text" class="form-control" placeholder="Documento" name="txtdocumento" id="txtdocumento" onBlur="upperCase(this)" value="${Contrato.NUM_DOC}" >
											<div class="input-group-btn">
												<button class="btn btn-info" id="img_producto" name="img_producto" onClick="muestraDocumento()"><i class="glyphicon glyphicon-search"></i></button>
											    <button class="btn btn-danger" type="button"><i class="glyphicon glyphicon-remove" id="img_detele" ></i></button>
											    <input name="CVE_DOC" type="hidden"  id="CVE_DOC" size="8" maxlength="6" readonly="true" value="${Contrato.CVE_DOC}" />
											</div>
										</div>
			                        </div>
			                    </div>
			                </div>
			                
			                <!--Fecha inicial y final-->
			                  <div class="row">
			                    <div class="form-group">
			                        <div class="control-label col-sm-3 ">*Fecha Inicial:&nbsp;</div>
			                        <div class="form-group col-sm-2">
			                           	<input type="text" placeholder="Fecha Inicial" id="txtfechainicial" name="txtfechainicial"  maxlength="15" value='<c:out value="${Contrato.FECHA_INICIO}"/>' class="form-control sm" style="text-align:center; width:130px;margin-bottom: 8px;"/>
			                        </div>
									<div class="col-sm-2">
										<input type="text" placeholder="Fecha Termino" id="txtfechatermino" name="txtfechatermino" class="form-control sm" maxlength="15" value="${Contrato.FECHA_TERMINO}" style="text-align:center; width:130px" />
									</div>
								 </div>
			                  </div> 
			                <!-- Tiempo de entrega -->
    	 	 		 		<div class="row">
			                    <div class="form-group">
			                        <div class="control-label col-sm-3 ">Tiempo de entrega:</div>
			                        <div class="form-group col-sm-2">
			                            <input type="text" class="form-control" placeholder="Tiempo de entrega" name="txttiempoentrega" id="txttiempoentrega" onBlur="upperCase(this)" value="${Contrato.TIEMPO_ENTREGA}"/>
									</div>
			                    </div>
			                </div>
			                <!-- Tiempo de entrega -->
    	 	 		 		<div class="row">
			                    <div class="form-group">
			                        <div class="control-label col-sm-3 ">Oficio Autorización:</div>
			                        <div class="form-group col-sm-2">
			                            <input type="text" class="form-control" placeholder="Oficio Autorización" name="txtnumoficio" id="txtnumoficio" onBlur="upperCase(this)" value="${Contrato.OFICIO_AUT}"/>
									</div>
			                    </div>
			                </div>
			                <!-- Anticipo -->
    	 	 		 		<div class="row">
			                    <div class="form-group">
			                        <div class="control-label col-sm-3 ">Anticipo:</div>
			                        <div class="form-group col-sm-2">
			                            <input type="text" class="form-control" placeholder="Anticipo" name="txtanticipo" id="txtanticipo" onBlur="upperCase(this)" onkeypress="return keyNumbero(event); " value="<fmt:formatNumber value='${Contrato.ANTICIPO}'  pattern='#########0.00' />"/>
									</div>
			                    </div>
			                </div>
			                <!-- Concepto -->
    	 	 		 		<div class="row">
			                    <div class="form-group">
			                        <div class="control-label col-sm-3 ">*Concepto:</div>
			                        <div class="form-group col-sm-2">
			                            <textarea class="form-control" rows=4 placeholder="Concepto" name="txtdescripcion" id="txtdescripcion" style="width:400px" onBlur="upperCase(this)">${Contrato.DESCRIPCION}</textarea>
									</div>
			                    </div>
			                </div>
			                <!--XML-->
				           <div class="row" style="padding-bottom:15px;padding-top: 10px;">
				            	<div class="form-group">
				                	<div class="control-label col-sm-3 ">&nbsp;Archivo:</div>
				                    	<div class="form-group col-sm-2">
				                    		<input type="file" class="input-file" id="archivo" name="archivo" style="width:445px" />
										</div>
								</div>
						   </div>
						   <!--Archivos-->
						   <div class="row">
				           		<div class="form-group" style="padding-bottom:15px;padding-top: 10px;">
									<div class="col-sm-6 col-sm-offset-3" >
									      <table width="80%" border="0"  align="left" cellpadding="0" cellspacing="0" class="listasDetalles table table-hover" id="listasArchivo">
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
				           <!--Botones-->
				            <div class="row">
				            	<div class="form-group">
				                	<div class="control-label col-sm-3 "></div>
				                    	<div class="col-sm-2">
				                    		<input name="cmdnuevo" id="cmdnuevo" type="button" class="btn btn-primary" value="Nuevo">
            								<input name="cmdcerrar" id="cmdcerrar" disabled="disabled" type="button" class="btn btn-danger" disabled="disabled" value="Cerrar">
            								<input name="cmdguardar" id="cmdguardar" type="button" class="btn btn-success" value="Guardar">
										</div>
								</div>
								
				           </div>
             	 		</div>
             	 		<!--Cierra Informacion general-->
             	 	</div>
             	 	<div class="tab-pane fade" id="tab2primary">
	             	 	<form class="form-horizontal">
	             	 		<!-- Unidad administrativa-->
    	 	 		 		<div class="row">
    	 	 		 			<div class="form-group">
									<div class="control-label col-sm-3 control-label">Presupuesto de la Unidad:</div>
									<div class="form-group col-md-4">	
									    <sec:authorize ifNotGranted="ROLE_Sam_PRIVILEGIOS_VER_TODAS_LAS_UNIDADES">
							      			<c:out value="${nombreUnidad}"/><input type="hidden" name="cbUnidad2" id="cbUnidad2" value='<c:out value="${idUnidad}"/>' />
							      		</sec:authorize>
							       		<sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_VER_TODAS_LAS_UNIDADES">
							       			<select name="cbUnidad2" class="selectpicker form-control input-sm m-b" data-live-search="true" id="cbUnidad2">
							            		<option value="0">[Seleccione]</option>
							            		<c:forEach items="${unidadesAdmiva}" var="item" varStatus="status">                  
							              			<option value="<c:out value="${item.ID}"/>" 
							              			<c:if test="${item.ID==idUnidad}"> selected </c:if> >
							             			<c:out value="${item.DEPENDENCIA}"/></option>
							           			</c:forEach>
							          		</select>
							        	</sec:authorize>
							        </div>
							     </div>
    	 	 		 		</div>
    	 	 		 		<!-- Periodo -->
    	 	 		 		<div class="row">
    	 	 		 			<div class="form-group">
									<div class="control-label col-sm-3 control-label">Mes:</div>
									<div class="form-group col-md-4">	
									    <select name="cbomes" class="selectpicker form-control input-sm m-b" data-live-search="true" id="cbomes" style="width:155px">
							                 	<option value="0">[Seleccione]</option>
							                 	<c:forEach items="${mesesActivos}" var="item" varStatus="status">
							                   	<option value="<c:out value='${item.ID_MES}'/>" >
							                     <c:out value="${item.DESCRIPCION}"/>
							                   </option>
							                 </c:forEach>
							                 </select>
							        </div>
							     </div>
    	 	 		 		</div>
    	 	 		 		<!--Programa, Partida-->
                           	<div class="row" style="border-bottom:15px !important;">
		                    	<div class="form-group">
		                        	<div class="control-label col-sm-3 ">*Proyecto:</div>
		                         	<div class="form-group col-sm-2">
										<input placeholder="Proyecto" type="text" class="form-control sm" name="txtproyecto" id="txtproyecto" maxlength="4" style="margin-bottom: 8px;"/>
										<input type="hidden" id="ID_PROYECTO" value="0"/>
									</div>
									<label class="control-label col-sm-1" for="txtproyecto">*Partida:</label>
									<div class="col-sm-2">
										<div class="input-group">
										<div class="input-group-btn">
											<input placeholder="Partida" type="text" id="txtpartida" name="txtpartida" class="form-control sm" maxlength="5"  onKeyPress=" return keyNumbero( event );"/>
											<input type="hidden" id="CLV_PARTID" value="0"/>
											<button type="button" class="btn btn-info" id="cmdpresupuesto" onClick="muestraPresupuesto()" name="cmdpresupuesto">
		      								<span class="glyphicon glyphicon-search"></span>
		      								
		    							</button>
		    							</div>
									</div>
									</div>
								</div>
		                  </div> 
				          <!--Presupuesto, Disponible-->
		                  <div class="row">
		                    <div class="form-group">
		                        <div class="control-label col-sm-3 ">Presupuesto:</div>
		                      		<div class="form-group col-sm-2">
		                      			<input type="text" placeholder="Presupuesto" name="txtpresupuesto" id="txtpresupuesto" class="form-control sm" disabled="disabled" style="margin-bottom: 8px;" />
									</div>
									<label class="control-label col-sm-1" for="txtfecha">*Disponible:</label>
									<div class="form-group col-sm-2">
										<input type="text" placeholder="Disponible" id="txtdisponible" data-disponible="" name="txtdisponible" class="form-control sm" disabled="disabled" />
									</div>
		                    </div>
		                  </div>
		                   <!-- Importe -->
		                  <div class="row">
		                    <div class="form-group">
		                        <div class="control-label col-sm-3 ">Importe:</div>
		                      		<div class="form-group col-sm-2">
		                      			<input name="txtimporte" type="text" class="form-control sm" id="txtimporte" onkeypress="return keyNumbero(event); " />
                    					<input type="hidden" id="ID_DETALLE" value="0"/>
                  						<input type="hidden" id="IMPORTE_TOTAL" value="0"/>
									</div>
								</div>
		                  </div>
		                  <!-- Btns -->
		                  <div class="row">
		                    <div class="form-group">
		                        <div class="control-label col-sm-3 "></div>
		                      		<div class="form-group col-sm-2">
		                      			<input name="cmdagregar" id="cmdagregar" title="Limpia valores para continuar con nuevo Vale." type="button" class="btn btn-success" value="Agregar">
										<input name="cmdnuevoconcepto" id="cmdnuevoconcepto" type="button" class="btn btn-primary" value="Nuevo">
									</div>
								</div>
		                  </div>
		                  <div class="row">
		           				<div class="form-group">
		           					<div class="form-group col-sm-5 col-sm-offset-3">
		           						<table width="80%" border="0"  align="left" cellpadding="0" cellspacing="0" class="listas" id="listaConceptos">
									      <thead>
									        <tr >
									          <th width="6%" height="20"  align="center"><img src="../../imagenes/cross.png" width="16" height="16" onclick="eliminarConcepto()" style='cursor: pointer;' /></th>
									          <th width="38%"  align="center">Unidad Administrativa</th>
									          <th width="15%"  align="center">Periodo</th>
									          <th width="14%"  align="center">Programa</th>
									          <th width="13%" align="center">Partida</th>
									          <th width="14%"  align="center">Importe</th>
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
             	 </div>
             </div>
		</div>
	</div>
  

  
</form>
</body>
</html>